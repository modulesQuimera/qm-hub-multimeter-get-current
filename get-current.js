module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function getCurrentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.mapeamento = config.mapeamento
        this.channel_number = config.channel_number
        this.AC_mode = config.AC_mode === "true" ? true : false,
        this.scale = config.scale;
        this.compare_select = config.compare_select;
        // this.equalTo = config.equalTo;
        this.maxValue = config.maxValue;
        this.minValue = config.minValue;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            var _compare = {};
            // if (node.compare_select == "equalTo") {
            //     _compare = {
            //         current_value: {"==": (!isNaN(parseFloat(node.equalTo)))? parseFloat(node.equalTo):node.equalTo }
            //     }
            // }
            if (node.compare_select == "interval") {
                _compare = {
                    current: {">=": parseFloat(node.minValue), "<=": parseFloat(node.maxValue)}
                }
            }
            if (node.compare_select == "maxValue") {
                _compare = {
                    current: {">=": null, "<=": parseFloat(node.maxValue)}
                }
            }
            if (node.compare_select == "minValue") {
                _compare = {
                    current: {">=": parseFloat(node.minValue), "<=": null}
                }
            }

            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "multimeter_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "get_current",
                channel_number: parseInt(node.channel_number),
                AC_mode: node.AC_mode ,
                scale: parseFloat(node.scale),
                compare: _compare,
                get_output: {},
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("get-current", getCurrentNode);

    // RED.httpAdmin.get("/getCurrent",function(req,res) {
    //     // console.log(mapeamentoNode)
    //     if(mapeamentoNode){
    //         res.json([
    //             {value:mapeamentoNode.valuePort1, label: "IAPW - " + mapeamentoNode.labelPort1, hasValue:false},
    //             {value:mapeamentoNode.valuePort2, label: "IBPW - " + mapeamentoNode.labelPort2, hasValue:false},
    //             {value:mapeamentoNode.valuePort3, label: "ICPW - " + mapeamentoNode.labelPort3, hasValue:false},
    //             {value:mapeamentoNode.valuePort4, label: "INPW - " + mapeamentoNode.labelPort4, hasValue:false},
    //         ])
    //     }
    //     else{
    //         res.json([
    //             {label:"IAPW - ", value: "0", hasValue:false},
    //             {label:"IBPW - ", value: "1", hasValue:false},
    //             {label:"ICPW - ", value: "2", hasValue:false},
    //             {label:"INPW - ", value: "3", hasValue:false},
    //         ])
    //     }
    // });
}
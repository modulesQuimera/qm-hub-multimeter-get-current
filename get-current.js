module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function getCurrentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this
        this.mapeamento = config.mapeamento
        node.channel_number = config.channel_number
        node.AC_mode = config.AC_mode === "true" ? true : false,
        node.scale = config.scale
        // this.websocket = config.websocket;
        // this.websocketConfig = RED.nodes.getNode(this.websocket);
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "multimeter_modular_V1.0",
                slot: 1,
                method: "get_current",
                channel_number: parseInt(node.channel_number),
                AC_mode: node.AC_mode ,
                scale: parseFloat(node.scale) 
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            // msg.payload = command
            send(msg)
        });
    }
    RED.nodes.registerType("get-current", getCurrentNode);

    RED.httpAdmin.get("/getCurrent",function(req,res) {
        // console.log(mapeamentoNode)
        if(mapeamentoNode){
            res.json([
                {value:mapeamentoNode.valuePort1, label: "IAPW - " + mapeamentoNode.labelPort1, hasValue:false},
                {value:mapeamentoNode.valuePort2, label: "IBPW - " + mapeamentoNode.labelPort2, hasValue:false},
                {value:mapeamentoNode.valuePort3, label: "ICPW - " + mapeamentoNode.labelPort3, hasValue:false},
                {value:mapeamentoNode.valuePort4, label: "INPW - " + mapeamentoNode.labelPort4, hasValue:false},
            ])
        }
        else{
            res.json([
                {label:"IAPW - ", value: "0", hasValue:false},
                {label:"IBPW - ", value: "1", hasValue:false},
                {label:"ICPW - ", value: "2", hasValue:false},
                {label:"INPW - ", value: "3", hasValue:false},
            ])
        }
    });
}
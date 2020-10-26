module.exports = function(RED) {

    // "use strict";
    var mapeamentoNode;

    function multipleGetCurrent(self, file, slot, currentMode){
        for(var t=0; t<self.qtdGetCurrent; t++){
            var _compare_n = {};
            if (self.compare_select_n[t] == "interval") {
                _compare_n = {
                    current: {">=": parseFloat(self.minValue_n[t]), "<=": parseFloat(self.maxValue_n[t])}
                };
            }
            if (self.compare_select_n[t] == "maxValue") {
                _compare_n = {
                    current: {">=": null, "<=": parseFloat(self.maxValue_n[t])}
                };
            }
            if (self.compare_select_n[t] == "minValue") {
                _compare_n = {
                    current: {">=": parseFloat(self.minValue_n[t]), "<=": null}
                };
            }

            var Scale = 30;
            if((self.maxValue_n[t]/self.gain_n[t]) <= 12) Scale = 12;

            var command_n={
                type: "multimeter_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "get_current",
                channel_number: parseInt(self.channel_number_n[t]),
                AC_mode: self.AC_mode_n[t] === "true" ? true : false ,
                scale: Scale,
                gain: parseFloat(self.gain_n[t]),
                compare: _compare_n,
                get_output: {},
            }
            
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }


    function getCurrentNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.channel_number = config.channel_number
        this.AC_mode = config.AC_mode === "true" ? true : false,
        this.gain = config.gain;
        this.compare_select = config.compare_select;
        // this.equalTo = config.equalTo;
        this.maxValue = config.maxValue;
        this.minValue = config.minValue;

        this.qtdGetCurrent = config.qtdGetCurrent;
        this.AC_mode_n=[]; this.channel_number_n=[]; this.gain_n=[]; this.compare_select_n=[]; this.maxValue_n=[]; this.minValue_n=[];
        this.AC_mode_n.push(config.AC_mode1); this.channel_number_n.push(config.channel_number1); this.gain_n.push(config.gain1); this.compare_select_n.push(config.compare_select1); this.maxValue_n.push(config.maxValue1); this.minValue_n.push(config.minValue1);
        this.AC_mode_n.push(config.AC_mode2); this.channel_number_n.push(config.channel_number2); this.gain_n.push(config.gain2); this.compare_select_n.push(config.compare_select2); this.maxValue_n.push(config.maxValue2); this.minValue_n.push(config.minValue2);
        this.AC_mode_n.push(config.AC_mode3); this.channel_number_n.push(config.channel_number3); this.gain_n.push(config.gain3); this.compare_select_n.push(config.compare_select3); this.maxValue_n.push(config.maxValue3); this.minValue_n.push(config.minValue3);
        this.AC_mode_n.push(config.AC_mode4); this.channel_number_n.push(config.channel_number4); this.gain_n.push(config.gain4); this.compare_select_n.push(config.compare_select4); this.maxValue_n.push(config.maxValue4); this.minValue_n.push(config.minValue4);
        this.AC_mode_n.push(config.AC_mode5); this.channel_number_n.push(config.channel_number5); this.gain_n.push(config.gain5); this.compare_select_n.push(config.compare_select5); this.maxValue_n.push(config.maxValue5); this.minValue_n.push(config.minValue5);
        this.AC_mode_n.push(config.AC_mode6); this.channel_number_n.push(config.channel_number6); this.gain_n.push(config.gain6); this.compare_select_n.push(config.compare_select6); this.maxValue_n.push(config.maxValue6); this.minValue_n.push(config.minValue6);
        this.AC_mode_n.push(config.AC_mode7); this.channel_number_n.push(config.channel_number7); this.gain_n.push(config.gain7); this.compare_select_n.push(config.compare_select7); this.maxValue_n.push(config.maxValue7); this.minValue_n.push(config.minValue7);
        this.AC_mode_n.push(config.AC_mode8); this.channel_number_n.push(config.channel_number8); this.gain_n.push(config.gain8); this.compare_select_n.push(config.compare_select8); this.maxValue_n.push(config.maxValue8); this.minValue_n.push(config.minValue8);
        this.AC_mode_n.push(config.AC_mode9); this.channel_number_n.push(config.channel_number9); this.gain_n.push(config.gain9); this.compare_select_n.push(config.compare_select9); this.maxValue_n.push(config.maxValue9); this.minValue_n.push(config.minValue9);
        this.AC_mode_n.push(config.AC_mode10); this.channel_number_n.push(config.channel_number10); this.gain_n.push(config.gain10); this.compare_select_n.push(config.compare_select10); this.maxValue_n.push(config.maxValue10); this.minValue_n.push(config.minValue10);
        this.AC_mode_n.push(config.AC_mode11); this.channel_number_n.push(config.channel_number11); this.gain_n.push(config.gain11); this.compare_select_n.push(config.compare_select11); this.maxValue_n.push(config.maxValue11); this.minValue_n.push(config.minValue11);
        this.AC_mode_n.push(config.AC_mode12); this.channel_number_n.push(config.channel_number12); this.gain_n.push(config.gain12); this.compare_select_n.push(config.compare_select12); this.maxValue_n.push(config.maxValue12); this.minValue_n.push(config.minValue12);
        this.AC_mode_n.push(config.AC_mode13); this.channel_number_n.push(config.channel_number13); this.gain_n.push(config.gain13); this.compare_select_n.push(config.compare_select13); this.maxValue_n.push(config.maxValue13); this.minValue_n.push(config.minValue13);
        this.AC_mode_n.push(config.AC_mode14); this.channel_number_n.push(config.channel_number14); this.gain_n.push(config.gain14); this.compare_select_n.push(config.compare_select14); this.maxValue_n.push(config.maxValue14); this.minValue_n.push(config.minValue14);
        this.AC_mode_n.push(config.AC_mode15); this.channel_number_n.push(config.channel_number15); this.gain_n.push(config.gain15); this.compare_select_n.push(config.compare_select15); this.maxValue_n.push(config.maxValue15); this.minValue_n.push(config.minValue15);
        this.AC_mode_n.push(config.AC_mode16); this.channel_number_n.push(config.channel_number16); this.gain_n.push(config.gain16); this.compare_select_n.push(config.compare_select16); this.maxValue_n.push(config.maxValue16); this.minValue_n.push(config.minValue16);
        this.AC_mode_n.push(config.AC_mode17); this.channel_number_n.push(config.channel_number17); this.gain_n.push(config.gain17); this.compare_select_n.push(config.compare_select17); this.maxValue_n.push(config.maxValue17); this.minValue_n.push(config.minValue17);
        this.AC_mode_n.push(config.AC_mode18); this.channel_number_n.push(config.channel_number18); this.gain_n.push(config.gain18); this.compare_select_n.push(config.compare_select18); this.maxValue_n.push(config.maxValue18); this.minValue_n.push(config.minValue18);
        this.AC_mode_n.push(config.AC_mode19); this.channel_number_n.push(config.channel_number19); this.gain_n.push(config.gain19); this.compare_select_n.push(config.compare_select19); this.maxValue_n.push(config.maxValue19); this.minValue_n.push(config.minValue19);
        this.AC_mode_n.push(config.AC_mode20); this.channel_number_n.push(config.channel_number20); this.gain_n.push(config.gain20); this.compare_select_n.push(config.compare_select20); this.maxValue_n.push(config.maxValue20); this.minValue_n.push(config.minValue20);
        this.AC_mode_n.push(config.AC_mode21); this.channel_number_n.push(config.channel_number21); this.gain_n.push(config.gain21); this.compare_select_n.push(config.compare_select21); this.maxValue_n.push(config.maxValue21); this.minValue_n.push(config.minValue21);
        this.AC_mode_n.push(config.AC_mode22); this.channel_number_n.push(config.channel_number22); this.gain_n.push(config.gain22); this.compare_select_n.push(config.compare_select22); this.maxValue_n.push(config.maxValue22); this.minValue_n.push(config.minValue22);
        this.AC_mode_n.push(config.AC_mode23); this.channel_number_n.push(config.channel_number23); this.gain_n.push(config.gain23); this.compare_select_n.push(config.compare_select23); this.maxValue_n.push(config.maxValue23); this.minValue_n.push(config.minValue23);
        this.AC_mode_n.push(config.AC_mode24); this.channel_number_n.push(config.channel_number24); this.gain_n.push(config.gain24); this.compare_select_n.push(config.compare_select24); this.maxValue_n.push(config.maxValue24); this.minValue_n.push(config.minValue24);
  

        var node = this;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            var _compare = {};
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

            var Scale = 30;
            if((node.maxValue/node.gain) <= 12) Scale = 12;
            
            var command = {
                type: "multimeter_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                method: "get_current",
                channel_number: parseInt(node.channel_number),
                AC_mode: node.AC_mode ,
                scale: Scale,
                gain: parseFloat(node.gain),
                compare: _compare,
                get_output: {},
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                    file = multipleGetCurrent(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleGetCurrent(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleGetCurrent(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleGetCurrent(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("get-current", getCurrentNode);
}
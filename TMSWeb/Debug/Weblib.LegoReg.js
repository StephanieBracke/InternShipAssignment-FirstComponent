rtl.module("Weblib.LegoReg",["System","WEBLib.DesignIntf","Weblib.Lego"],function () {
  "use strict";
  var $mod = this;
  this.Register = function () {
    pas["WEBLib.DesignIntf"].RegisterComponents("LegoBrick",[pas["Weblib.Lego"].TLegoBrick],null);
  };
});
//# sourceMappingURL=Weblib.LegoReg.js.map

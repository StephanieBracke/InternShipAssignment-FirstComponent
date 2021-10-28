rtl.module("Weblib.Lego",["System","Classes","WEBLib.Controls","Web"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TLegoBrick",pas["WEBLib.Controls"].TCustomControl,function () {
    this.$init = function () {
      pas["WEBLib.Controls"].TCustomControl.$init.call(this);
      this.FButton = null;
    };
    this.$final = function () {
      this.FButton = undefined;
      pas["WEBLib.Controls"].TCustomControl.$final.call(this);
    };
    this.HandleLoginClick = function (Event) {
      var Result = false;
      Result = true;
      return Result;
    };
    this.CreateElement = function () {
      var Result = null;
      Result = document.createElement("DIV");
      this.FButton = document.createElement("BUTTON");
      Result.appendChild(this.FButton);
      return Result;
    };
    this.BindEvents = function () {
      this.FButton.addEventListener("click",rtl.createCallback(this,"HandleLoginClick"));
    };
    rtl.addIntf(this,pas.System.IUnknown);
  });
});
//# sourceMappingURL=Weblib.Lego.js.map

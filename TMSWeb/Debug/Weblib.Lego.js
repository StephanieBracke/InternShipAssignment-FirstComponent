rtl.module("Weblib.Lego",["System","Classes","SysUtils","Types","WEBLib.Controls","WEBLib.StdCtrls","WEBLib.Graphics","WEBLib.Dialogs","Web"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TLegoBrick",pas["WEBLib.Controls"].TCustomControl,function () {
    this.$init = function () {
      pas["WEBLib.Controls"].TCustomControl.$init.call(this);
      this.FOnBuild = null;
      this.FCaptionLabel = "";
      this.FBorderColor$1 = 0;
      this.FButton = null;
      this.FCaption$1 = null;
      this.FPadding = 0;
      this.FMargin = 0;
      this.FCreated = false;
    };
    this.$final = function () {
      this.FOnBuild = undefined;
      this.FButton = undefined;
      this.FCaption$1 = undefined;
      pas["WEBLib.Controls"].TCustomControl.$final.call(this);
    };
    this.HandleBuildClick = function (Event) {
      var Result = false;
      Result = true;
      this.DoBuild();
      return Result;
    };
    this.SetBorderColor$1 = function (Value) {
      if (this.FBorderColor$1 !== Value) {
        this.FBorderColor$1 = Value;
        this.UpdateElementVisual();
      };
    };
    this.SetMargin = function (Value) {
      if (this.FMargin !== Value) {
        this.FMargin = Value;
        this.UpdateElementVisual();
      };
    };
    this.SetPadding = function (Value) {
      if (this.FPadding !== Value) {
        this.FPadding = Value;
        this.UpdateElementVisual();
      };
    };
    this.DoBuild = function () {
      if (this.FOnBuild != null) this.FOnBuild(this);
    };
    this.CreateElement = function () {
      var Result = null;
      var br = null;
      this.FCreated = true;
      Result = document.createElement("SPAN");
      this.FCaption$1 = document.createElement("DIV");
      Result.appendChild(this.FCaption$1);
      br = document.createElement("BR");
      Result.appendChild(br);
      this.FButton = document.createElement("BUTTON");
      this.FButton.setAttribute("id",this.FName + "btnId");
      Result.appendChild(this.FButton);
      this.FButton.innerHTML = "Build";
      return Result;
    };
    this.UpdateElementVisual = function () {
      var strpadding = "";
      var strmargin = "";
      pas["WEBLib.Controls"].TCustomControl.UpdateElementVisual.call(this);
      if (this.GetElementHandle() != null) {
        strpadding = pas.SysUtils.IntToStr(this.FPadding) + "px";
        strmargin = pas.SysUtils.IntToStr(this.FMargin) + "px";
        this.GetElementHandle().style.setProperty("border","solid 5px " + pas["WEBLib.Graphics"].ColorToHTML(this.FBorderColor$1));
        this.GetElementHandle().style.setProperty("padding",strpadding);
        this.FButton.style.setProperty("float","center");
      };
    };
    this.UpdateElementData = function () {
      pas["WEBLib.Controls"].TControl.UpdateElementData.call(this);
      this.FCaption$1.innerHTML = this.FCaptionLabel;
    };
    this.BindEvents = function () {
      var s = "";
      pas["WEBLib.Controls"].TCustomControl.BindEvents.call(this);
      if (this.FCreated) {
        this.FButton.addEventListener("click",rtl.createCallback(this,"HandleBuildClick"));
        this.FCreated = false;
      } else {
        s = this.GetID() + "btnId";
        this.FButton = document.getElementById(s);
        this.FButton.addEventListener("click",rtl.createCallback(this,"HandleBuildClick"));
      };
    };
    this.UnbindEvents = function () {
      pas["WEBLib.Controls"].TControl.UnbindEvents.call(this);
      this.FButton.removeEventListener("click",rtl.createCallback(this,"HandleBuildClick"));
    };
    this.CreateInitialize = function () {
      pas["WEBLib.Controls"].TCustomControl.CreateInitialize.call(this);
      this.SetColor(16711935);
      this.FCaptionLabel = "Build With Bricks";
      this.FBorderColor$1 = 15780518;
      this.FPadding = 5;
      this.FMargin = 10;
      this.SetHeight(150);
      this.SetWidth(150);
    };
    rtl.addIntf(this,pas.System.IUnknown);
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas["WEBLib.Controls"].$rtti["TAlign"],"FAlign","SetAlign",{Default: pas["WEBLib.Controls"].TAlign.alNone});
    $r.addProperty("AlignWithMargins",2,rtl.boolean,"FAlignWithMargins","SetAlignWithMargins",{Default: false});
    $r.addProperty("Anchors",2,pas["WEBLib.Controls"].$rtti["TAnchors"],"FAnchors","SetAnchors",{Default: rtl.createSet(pas["WEBLib.Controls"].TAnchorKind.akLeft,pas["WEBLib.Controls"].TAnchorKind.akTop)});
    $r.addProperty("BorderColor",2,pas["WEBLib.Graphics"].$rtti["TColor"],"FBorderColor$1","SetBorderColor$1");
    $r.addProperty("ElementFont",2,pas["WEBLib.Controls"].$rtti["TElementFont"],"FElementFont","SetElementFont",{Default: pas["WEBLib.Controls"].TElementFont.efProperty});
    $r.addProperty("ElementID",3,pas["WEBLib.Controls"].$rtti["TElementID"],"GetID","SetID");
    $r.addProperty("ElementPosition",2,pas["WEBLib.Controls"].$rtti["TElementPosition"],"FElementPosition","SetElementPosition",{Default: pas["WEBLib.Controls"].TElementPosition.epAbsolute});
    $r.addProperty("Margin",2,rtl.longint,"FMargin","SetMargin");
    $r.addProperty("Padding",2,rtl.longint,"FPadding","SetPadding");
    $r.addProperty("OnBuild",0,pas["WEBLib.Controls"].$rtti["TNotifyEvent"],"FOnBuild","FOnBuild");
  });
  rtl.createClass(this,"TLoginPanel",this.TLegoBrick,function () {
    rtl.addIntf(this,pas.System.IUnknown);
  });
});
//# sourceMappingURL=Weblib.Lego.js.map

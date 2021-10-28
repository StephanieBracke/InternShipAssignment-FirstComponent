rtl.module("SysUtils",["System","RTLConsts","JS"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.FreeAndNil = function (Obj) {
    var o = null;
    o = Obj.get();
    if (o === null) return;
    Obj.set(null);
    o.$destroy("Destroy");
  };
  this.$rtti.$ProcVar("TProcedure",{procsig: rtl.newTIProcSig([])});
  this.FloatRecDigits = 19;
  rtl.recNewT(this,"TFloatRec",function () {
    this.Exponent = 0;
    this.Negative = false;
    this.$new = function () {
      var r = Object.create(this);
      r.Digits = rtl.arraySetLength(null,"",19);
      return r;
    };
    this.$eq = function (b) {
      return (this.Exponent === b.Exponent) && (this.Negative === b.Negative) && rtl.arrayEq(this.Digits,b.Digits);
    };
    this.$assign = function (s) {
      this.Exponent = s.Exponent;
      this.Negative = s.Negative;
      this.Digits = s.Digits.slice(0);
      return this;
    };
    var $r = $mod.$rtti.$Record("TFloatRec",{});
    $r.addField("Exponent",rtl.longint);
    $r.addField("Negative",rtl.boolean);
    $mod.$rtti.$StaticArray("TFloatRec.Digits$a",{dims: [19], eltype: rtl.char});
    $r.addField("Digits",$mod.$rtti["TFloatRec.Digits$a"]);
  });
  this.TEndian = {"0": "Little", Little: 0, "1": "Big", Big: 1};
  this.$rtti.$Enum("TEndian",{minvalue: 0, maxvalue: 1, ordtype: 1, enumtype: this.TEndian});
  this.$rtti.$StaticArray("TByteArray",{dims: [32768], eltype: rtl.byte});
  this.$rtti.$StaticArray("TWordArray",{dims: [16384], eltype: rtl.word});
  this.$rtti.$DynArray("TBytes",{eltype: rtl.byte});
  this.$rtti.$DynArray("TStringArray",{eltype: rtl.string});
  this.$rtti.$StaticArray("TMonthNameArray",{dims: [12], eltype: rtl.string});
  this.$rtti.$StaticArray("TDayTable",{dims: [12], eltype: rtl.word});
  this.$rtti.$StaticArray("TWeekNameArray",{dims: [7], eltype: rtl.string});
  this.$rtti.$StaticArray("TDayNames",{dims: [7], eltype: rtl.string});
  rtl.createClass(this,"Exception",pas.System.TObject,function () {
    this.LogMessageOnCreate = false;
    this.$init = function () {
      pas.System.TObject.$init.call(this);
      this.fMessage = "";
      this.FJSError = null;
      this.fHelpContext = 0;
    };
    this.$final = function () {
      this.FJSError = undefined;
      pas.System.TObject.$final.call(this);
    };
    this.Create$1 = function (Msg) {
      this.fMessage = Msg;
      this.FJSError = new Error(Msg);
      if (this.LogMessageOnCreate) pas.System.Writeln("Created exception ",this.$classname," with message: ",Msg);
      return this;
    };
    this.CreateFmt = function (Msg, Args) {
      this.Create$1($mod.Format(Msg,Args));
      return this;
    };
    this.CreateHelp = function (Msg, AHelpContext) {
      this.Create$1(Msg);
      this.fHelpContext = AHelpContext;
      return this;
    };
    this.CreateFmtHelp = function (Msg, Args, AHelpContext) {
      this.Create$1($mod.Format(Msg,Args));
      this.fHelpContext = AHelpContext;
      return this;
    };
    this.ToString = function () {
      var Result = "";
      Result = this.$classname + ": " + this.fMessage;
      return Result;
    };
  });
  this.$rtti.$ClassRef("ExceptClass",{instancetype: this.$rtti["Exception"]});
  rtl.createClass(this,"EExternal",this.Exception,function () {
  });
  rtl.createClass(this,"EMathError",this.EExternal,function () {
  });
  rtl.createClass(this,"EInvalidOp",this.EMathError,function () {
  });
  rtl.createClass(this,"EZeroDivide",this.EMathError,function () {
  });
  rtl.createClass(this,"EOverflow",this.EMathError,function () {
  });
  rtl.createClass(this,"EUnderflow",this.EMathError,function () {
  });
  rtl.createClass(this,"EAbort",this.Exception,function () {
  });
  rtl.createClass(this,"EInvalidCast",this.Exception,function () {
  });
  rtl.createClass(this,"EAssertionFailed",this.Exception,function () {
  });
  rtl.createClass(this,"EObjectCheck",this.Exception,function () {
  });
  rtl.createClass(this,"EConvertError",this.Exception,function () {
  });
  rtl.createClass(this,"EFormatError",this.Exception,function () {
  });
  rtl.createClass(this,"EIntError",this.EExternal,function () {
  });
  rtl.createClass(this,"EDivByZero",this.EIntError,function () {
  });
  rtl.createClass(this,"ERangeError",this.EIntError,function () {
  });
  rtl.createClass(this,"EIntOverflow",this.EIntError,function () {
  });
  rtl.createClass(this,"EInOutError",this.Exception,function () {
    this.$init = function () {
      $mod.Exception.$init.call(this);
      this.ErrorCode = 0;
    };
  });
  rtl.createClass(this,"EHeapMemoryError",this.Exception,function () {
  });
  rtl.createClass(this,"EExternalException",this.EExternal,function () {
  });
  rtl.createClass(this,"EInvalidPointer",this.EHeapMemoryError,function () {
  });
  rtl.createClass(this,"EOutOfMemory",this.EHeapMemoryError,function () {
  });
  rtl.createClass(this,"EVariantError",this.Exception,function () {
    this.$init = function () {
      $mod.Exception.$init.call(this);
      this.ErrCode = 0;
    };
    this.CreateCode = function (Code) {
      this.ErrCode = Code;
      return this;
    };
  });
  rtl.createClass(this,"EAccessViolation",this.EExternal,function () {
  });
  rtl.createClass(this,"EBusError",this.EAccessViolation,function () {
  });
  rtl.createClass(this,"EPrivilege",this.EExternal,function () {
  });
  rtl.createClass(this,"EStackOverflow",this.EExternal,function () {
  });
  rtl.createClass(this,"EControlC",this.EExternal,function () {
  });
  rtl.createClass(this,"EAbstractError",this.Exception,function () {
  });
  rtl.createClass(this,"EPropReadOnly",this.Exception,function () {
  });
  rtl.createClass(this,"EPropWriteOnly",this.Exception,function () {
  });
  rtl.createClass(this,"EIntfCastError",this.Exception,function () {
  });
  rtl.createClass(this,"EInvalidContainer",this.Exception,function () {
  });
  rtl.createClass(this,"EInvalidInsert",this.Exception,function () {
  });
  rtl.createClass(this,"EPackageError",this.Exception,function () {
  });
  rtl.createClass(this,"EOSError",this.Exception,function () {
    this.$init = function () {
      $mod.Exception.$init.call(this);
      this.ErrorCode = 0;
    };
  });
  rtl.createClass(this,"ESafecallException",this.Exception,function () {
  });
  rtl.createClass(this,"ENoThreadSupport",this.Exception,function () {
  });
  rtl.createClass(this,"ENoWideStringSupport",this.Exception,function () {
  });
  rtl.createClass(this,"ENotImplemented",this.Exception,function () {
  });
  rtl.createClass(this,"EArgumentException",this.Exception,function () {
  });
  rtl.createClass(this,"EArgumentOutOfRangeException",this.EArgumentException,function () {
  });
  rtl.createClass(this,"EArgumentNilException",this.EArgumentException,function () {
  });
  rtl.createClass(this,"EPathTooLongException",this.Exception,function () {
  });
  rtl.createClass(this,"ENotSupportedException",this.Exception,function () {
  });
  rtl.createClass(this,"EDirectoryNotFoundException",this.Exception,function () {
  });
  rtl.createClass(this,"EFileNotFoundException",this.Exception,function () {
  });
  rtl.createClass(this,"EPathNotFoundException",this.Exception,function () {
  });
  rtl.createClass(this,"ENoConstructException",this.Exception,function () {
  });
  this.EmptyStr = "";
  this.EmptyWideStr = "";
  this.HexDisplayPrefix = "$";
  this.LeadBytes = {};
  this.CharInSet = function (Ch, CSet) {
    var Result = false;
    var I = 0;
    Result = false;
    I = rtl.length(CSet) - 1;
    while (!Result && (I >= 0)) {
      Result = Ch === CSet[I];
      I -= 1;
    };
    return Result;
  };
  this.LeftStr = function (S, Count) {
    return (Count>0) ? S.substr(0,Count) : "";
  };
  this.RightStr = function (S, Count) {
    var l = S.length;
    return (Count<1) ? "" : ( Count>=l ? S : S.substr(l-Count));
  };
  this.Trim = function (S) {
    return S.replace(/^[\s\uFEFF\xA0\x00-\x1f]+/,'').replace(/[\s\uFEFF\xA0\x00-\x1f]+$/,'');
  };
  this.TrimLeft = function (S) {
    return S.replace(/^[\s\uFEFF\xA0\x00-\x1f]+/,'');
  };
  this.TrimRight = function (S) {
    return S.replace(/[\s\uFEFF\xA0\x00-\x1f]+$/,'');
  };
  this.UpperCase = function (s) {
    return s.toUpperCase();
  };
  this.LowerCase = function (s) {
    return s.toLowerCase();
  };
  this.CompareStr = function (s1, s2) {
    var l1 = s1.length;
    var l2 = s2.length;
    if (l1<=l2){
      var s = s2.substr(0,l1);
      if (s1<s){ return -1;
      } else if (s1>s){ return 1;
      } else { return l1<l2 ? -1 : 0; };
    } else {
      var s = s1.substr(0,l2);
      if (s<s2){ return -1;
      } else { return 1; };
    };
  };
  this.SameStr = function (s1, s2) {
    return s1 == s2;
  };
  this.CompareText = function (s1, s2) {
    var l1 = s1.toLowerCase();
    var l2 = s2.toLowerCase();
    if (l1>l2){ return 1;
    } else if (l1<l2){ return -1;
    } else { return 0; };
  };
  this.SameText = function (s1, s2) {
    return s1.toLowerCase() == s2.toLowerCase();
  };
  this.AnsiCompareText = function (s1, s2) {
    return s1.localeCompare(s2);
  };
  this.AnsiSameText = function (s1, s2) {
    return s1.toLowerCase() == s2.toLowerCase();
  };
  this.AnsiCompareStr = function (s1, s2) {
    var Result = 0;
    Result = $mod.CompareText(s1,s2);
    return Result;
  };
  this.AppendStr = function (Dest, S) {
    Dest.set(Dest.get() + S);
  };
  this.Format = function (Fmt, Args) {
    var Result = "";
    var ChPos = 0;
    var OldPos = 0;
    var ArgPos = 0;
    var DoArg = 0;
    var Len = 0;
    var Hs = "";
    var ToAdd = "";
    var Index = 0;
    var Width = 0;
    var Prec = 0;
    var Left = false;
    var Fchar = "";
    var vq = 0;
    function ReadFormat() {
      var Result = "";
      var Value = 0;
      function ReadInteger() {
        var Code = 0;
        var ArgN = 0;
        if (Value !== -1) return;
        OldPos = ChPos;
        while ((ChPos <= Len) && (Fmt.charAt(ChPos - 1) <= "9") && (Fmt.charAt(ChPos - 1) >= "0")) ChPos += 1;
        if (ChPos > Len) $impl.DoFormatError(1,Fmt);
        if (Fmt.charAt(ChPos - 1) === "*") {
          if (Index === 255) {
            ArgN = ArgPos}
           else {
            ArgN = Index;
            Index += 1;
          };
          if ((ChPos > OldPos) || (ArgN > (rtl.length(Args) - 1))) $impl.DoFormatError(1,Fmt);
          ArgPos = ArgN + 1;
          if (rtl.isNumber(Args[ArgN]) && pas.JS.isInteger(Args[ArgN])) {
            Value = rtl.trunc(Args[ArgN])}
           else $impl.DoFormatError(1,Fmt);
          ChPos += 1;
        } else {
          if (OldPos < ChPos) {
            pas.System.val(pas.System.Copy(Fmt,OldPos,ChPos - OldPos),{get: function () {
                return Value;
              }, set: function (v) {
                Value = v;
              }},{get: function () {
                return Code;
              }, set: function (v) {
                Code = v;
              }});
            if (Code > 0) $impl.DoFormatError(1,Fmt);
          } else Value = -1;
        };
      };
      function ReadIndex() {
        if (Fmt.charAt(ChPos - 1) !== ":") {
          ReadInteger()}
         else Value = 0;
        if (Fmt.charAt(ChPos - 1) === ":") {
          if (Value === -1) $impl.DoFormatError(2,Fmt);
          Index = Value;
          Value = -1;
          ChPos += 1;
        };
      };
      function ReadLeft() {
        if (Fmt.charAt(ChPos - 1) === "-") {
          Left = true;
          ChPos += 1;
        } else Left = false;
      };
      function ReadWidth() {
        ReadInteger();
        if (Value !== -1) {
          Width = Value;
          Value = -1;
        };
      };
      function ReadPrec() {
        if (Fmt.charAt(ChPos - 1) === ".") {
          ChPos += 1;
          ReadInteger();
          if (Value === -1) Value = 0;
          Prec = Value;
        };
      };
      Index = 255;
      Width = -1;
      Prec = -1;
      Value = -1;
      ChPos += 1;
      if (Fmt.charAt(ChPos - 1) === "%") {
        Result = "%";
        return Result;
      };
      ReadIndex();
      ReadLeft();
      ReadWidth();
      ReadPrec();
      Result = pas.System.upcase(Fmt.charAt(ChPos - 1));
      return Result;
    };
    function Checkarg(AT, err) {
      var Result = false;
      Result = false;
      if (Index === 255) {
        DoArg = ArgPos}
       else DoArg = Index;
      ArgPos = DoArg + 1;
      if ((DoArg > (rtl.length(Args) - 1)) || (pas.JS.GetValueType(Args[DoArg]) !== AT)) {
        if (err) $impl.DoFormatError(3,Fmt);
        ArgPos -= 1;
        return Result;
      };
      Result = true;
      return Result;
    };
    Result = "";
    Len = Fmt.length;
    ChPos = 1;
    OldPos = 1;
    ArgPos = 0;
    while (ChPos <= Len) {
      while ((ChPos <= Len) && (Fmt.charAt(ChPos - 1) !== "%")) ChPos += 1;
      if (ChPos > OldPos) Result = Result + pas.System.Copy(Fmt,OldPos,ChPos - OldPos);
      if (ChPos < Len) {
        Fchar = ReadFormat();
        var $tmp = Fchar;
        if ($tmp === "D") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          ToAdd = $mod.IntToStr(rtl.trunc(Args[DoArg]));
          Width = Math.abs(Width);
          Index = Prec - ToAdd.length;
          if (ToAdd.charAt(0) !== "-") {
            ToAdd = pas.System.StringOfChar("0",Index) + ToAdd}
           else pas.System.Insert(pas.System.StringOfChar("0",Index + 1),{get: function () {
              return ToAdd;
            }, set: function (v) {
              ToAdd = v;
            }},2);
        } else if ($tmp === "U") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          if (rtl.trunc(Args[DoArg]) < 0) $impl.DoFormatError(3,Fmt);
          ToAdd = $mod.IntToStr(rtl.trunc(Args[DoArg]));
          Width = Math.abs(Width);
          Index = Prec - ToAdd.length;
          ToAdd = pas.System.StringOfChar("0",Index) + ToAdd;
        } else if ($tmp === "E") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) ToAdd = $mod.FloatToStrF(rtl.getNumber(Args[DoArg]),$mod.TFloatFormat.ffFixed,9999,Prec);
        } else if ($tmp === "F") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) ToAdd = $mod.FloatToStrF(rtl.getNumber(Args[DoArg]),$mod.TFloatFormat.ffFixed,9999,Prec);
        } else if ($tmp === "G") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) ToAdd = $mod.FloatToStrF(rtl.getNumber(Args[DoArg]),$mod.TFloatFormat.ffGeneral,Prec,3);
        } else if ($tmp === "N") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) ToAdd = $mod.FloatToStrF(rtl.getNumber(Args[DoArg]),$mod.TFloatFormat.ffNumber,9999,Prec);
        } else if ($tmp === "M") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) ToAdd = $mod.FloatToStrF(rtl.getNumber(Args[DoArg]),$mod.TFloatFormat.ffCurrency,9999,Prec);
        } else if ($tmp === "S") {
          Checkarg(pas.JS.TJSValueType.jvtString,true);
          Hs = "" + Args[DoArg];
          Index = Hs.length;
          if ((Prec !== -1) && (Index > Prec)) Index = Prec;
          ToAdd = pas.System.Copy(Hs,1,Index);
        } else if ($tmp === "P") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          ToAdd = $mod.IntToHex(rtl.trunc(Args[DoArg]),31);
        } else if ($tmp === "X") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          vq = rtl.trunc(Args[DoArg]);
          Index = 31;
          if (Prec > Index) {
            ToAdd = $mod.IntToHex(vq,Index)}
           else {
            Index = 1;
            while ((rtl.shl(1,Index * 4) <= vq) && (Index < 16)) Index += 1;
            if (Index > Prec) Prec = Index;
            ToAdd = $mod.IntToHex(vq,Prec);
          };
        } else if ($tmp === "%") ToAdd = "%";
        if (Width !== -1) if (ToAdd.length < Width) if (!Left) {
          ToAdd = pas.System.StringOfChar(" ",Width - ToAdd.length) + ToAdd}
         else ToAdd = ToAdd + pas.System.StringOfChar(" ",Width - ToAdd.length);
        Result = Result + ToAdd;
      };
      ChPos += 1;
      OldPos = ChPos;
    };
    return Result;
  };
  this.BytesOf = function (AVal) {
    var Result = [];
    var I = 0;
    Result = rtl.arraySetLength(Result,0,AVal.length);
    for (var $l = 0, $end = AVal.length - 1; $l <= $end; $l++) {
      I = $l;
      Result[I] = AVal.charCodeAt((I + 1) - 1);
    };
    return Result;
  };
  this.StringOf = function (ABytes) {
    var Result = "";
    var I = 0;
    Result = "";
    for (var $l = 0, $end = rtl.length(ABytes) - 1; $l <= $end; $l++) {
      I = $l;
      Result = Result + String.fromCharCode(ABytes[I]);
    };
    return Result;
  };
  this.LocaleCompare = function (s1, s2, locales) {
    return s1.localeCompare(s2,locales) == 0;
  };
  this.NormalizeStr = function (S, Norm) {
    return S.normalize(Norm);
  };
  var Alpha = rtl.createSet(null,65,90,null,97,122,95);
  var AlphaNum = rtl.unionSet(Alpha,rtl.createSet(null,48,57));
  var Dot = ".";
  this.IsValidIdent = function (Ident, AllowDots, StrictDots) {
    var Result = false;
    var First = false;
    var I = 0;
    var Len = 0;
    Len = Ident.length;
    if (Len < 1) return false;
    First = true;
    Result = false;
    I = 1;
    while (I <= Len) {
      if (First) {
        if (!(Ident.charCodeAt(I - 1) in Alpha)) return Result;
        First = false;
      } else if (AllowDots && (Ident.charAt(I - 1) === Dot)) {
        if (StrictDots) {
          if (I >= Len) return Result;
          First = true;
        };
      } else if (!(Ident.charCodeAt(I - 1) in AlphaNum)) return Result;
      I = I + 1;
    };
    Result = true;
    return Result;
  };
  this.TStringReplaceFlag = {"0": "rfReplaceAll", rfReplaceAll: 0, "1": "rfIgnoreCase", rfIgnoreCase: 1};
  this.$rtti.$Enum("TStringReplaceFlag",{minvalue: 0, maxvalue: 1, ordtype: 1, enumtype: this.TStringReplaceFlag});
  this.$rtti.$Set("TStringReplaceFlags",{comptype: this.$rtti["TStringReplaceFlag"]});
  this.StringReplace = function (aOriginal, aSearch, aReplace, Flags) {
    var Result = "";
    var REFlags = "";
    var REString = "";
    REFlags = "";
    if ($mod.TStringReplaceFlag.rfReplaceAll in Flags) REFlags = "g";
    if ($mod.TStringReplaceFlag.rfIgnoreCase in Flags) REFlags = REFlags + "i";
    REString = aSearch.replace(new RegExp($impl.RESpecials,"g"),"\\$1");
    Result = aOriginal.replace(new RegExp(REString,REFlags),aReplace);
    return Result;
  };
  this.QuoteString = function (aOriginal, AQuote) {
    var Result = "";
    Result = AQuote + $mod.StringReplace(aOriginal,AQuote,AQuote + AQuote,rtl.createSet($mod.TStringReplaceFlag.rfReplaceAll)) + AQuote;
    return Result;
  };
  this.QuotedStr = function (s, QuoteChar) {
    var Result = "";
    Result = $mod.QuoteString(s,QuoteChar);
    return Result;
  };
  this.DeQuoteString = function (aQuoted, AQuote) {
    var Result = "";
    var i = 0;
    Result = aQuoted;
    if (Result.substr(0,1) !== AQuote) return Result;
    Result = Result.slice(1);
    i = 1;
    while (i <= Result.length) {
      if (Result.charAt(i - 1) === AQuote) {
        if ((i === Result.length) || (Result.charAt((i + 1) - 1) !== AQuote)) {
          Result = Result.slice(0,i - 1);
          return Result;
        } else Result = Result.slice(0,i - 1) + Result.slice(i);
      } else i += 1;
    };
    return Result;
  };
  this.LastDelimiter = function (Delimiters, S) {
    var Result = 0;
    Result = S.length;
    while ((Result > 0) && (pas.System.Pos(S.charAt(Result - 1),Delimiters) === 0)) Result -= 1;
    return Result;
  };
  this.IsDelimiter = function (Delimiters, S, Index) {
    var Result = false;
    Result = false;
    if ((Index > 0) && (Index <= S.length)) Result = pas.System.Pos(S.charAt(Index - 1),Delimiters) !== 0;
    return Result;
  };
  this.AdjustLineBreaks = function (S) {
    var Result = "";
    Result = $mod.AdjustLineBreaks$1(S,pas.System.DefaultTextLineBreakStyle);
    return Result;
  };
  this.AdjustLineBreaks$1 = function (S, Style) {
    var Result = "";
    var I = 0;
    var L = 0;
    var Res = "";
    function Add(C) {
      Res = Res + C;
    };
    I = 0;
    L = S.length;
    Result = "";
    while (I <= L) {
      var $tmp = S.charAt(I - 1);
      if ($tmp === "\n") {
        if (Style in rtl.createSet(pas.System.TTextLineBreakStyle.tlbsCRLF,pas.System.TTextLineBreakStyle.tlbsCR)) Add("\r");
        if (Style === pas.System.TTextLineBreakStyle.tlbsCRLF) Add("\n");
        I += 1;
      } else if ($tmp === "\r") {
        if (Style === pas.System.TTextLineBreakStyle.tlbsCRLF) Add("\r");
        Add("\n");
        I += 1;
        if (S.charAt(I - 1) === "\n") I += 1;
      } else {
        Add(S.charAt(I - 1));
        I += 1;
      };
    };
    Result = Res;
    return Result;
  };
  var Quotes = rtl.createSet(39,34);
  this.WrapText = function (Line, BreakStr, BreakChars, MaxCol) {
    var Result = "";
    var L = "";
    var C = "";
    var LQ = "";
    var BC = "";
    var P = 0;
    var BLen = 0;
    var Len = 0;
    var HB = false;
    var IBC = false;
    Result = "";
    L = Line;
    BLen = BreakStr.length;
    if (BLen > 0) {
      BC = BreakStr.charAt(0)}
     else BC = "\x00";
    Len = L.length;
    while (Len > 0) {
      P = 1;
      LQ = "\x00";
      HB = false;
      IBC = false;
      while ((P <= Len) && ((P <= MaxCol) || !IBC) && ((LQ !== "\x00") || !HB)) {
        C = L.charAt(P - 1);
        if (C === LQ) {
          LQ = "\x00"}
         else if (C.charCodeAt() in Quotes) LQ = C;
        if (LQ !== "\x00") {
          P += 1}
         else {
          HB = (C === BC) && (BreakStr === pas.System.Copy(L,P,BLen));
          if (HB) {
            P += BLen}
           else {
            if (P >= MaxCol) IBC = $mod.CharInSet(C,BreakChars);
            P += 1;
          };
        };
      };
      Result = Result + pas.System.Copy(L,1,P - 1);
      pas.System.Delete({get: function () {
          return L;
        }, set: function (v) {
          L = v;
        }},1,P - 1);
      Len = L.length;
      if ((Len > 0) && !HB) Result = Result + BreakStr;
    };
    return Result;
  };
  this.WrapText$1 = function (Line, MaxCol) {
    var Result = "";
    Result = $mod.WrapText(Line,pas.System.sLineBreak,[" ","-","\t"],MaxCol);
    return Result;
  };
  this.IntToStr = function (Value) {
    var Result = "";
    Result = "" + Value;
    return Result;
  };
  this.UIntToStr = function (Value) {
    var Result = "";
    Result = "" + Value;
    return Result;
  };
  this.TryStrToInt = function (S, res) {
    var Result = false;
    var NI = 0;
    Result = $mod.TryStrToInt$1(S,{get: function () {
        return NI;
      }, set: function (v) {
        NI = v;
      }});
    if (Result) res.set(NI);
    return Result;
  };
  this.TryStrToInt$1 = function (S, res) {
    var Result = false;
    var Radix = 10;
    var N = "";
    var J = undefined;
    N = S;
    if ((pas.System.Pos($mod.DecimalSeparator,N) !== 0) || (pas.System.Pos(".",N) !== 0)) return false;
    var $tmp = pas.System.Copy(N,1,1);
    if ($tmp === "$") {
      Radix = 16}
     else if ($tmp === "&") {
      Radix = 8}
     else if ($tmp === "%") Radix = 2;
    if ((Radix !== 16) && (pas.System.Pos("e",$mod.LowerCase(N)) !== 0)) return false;
    if (Radix !== 10) pas.System.Delete({get: function () {
        return N;
      }, set: function (v) {
        N = v;
      }},1,1);
    J = parseInt(N,Radix);
    Result = !isNaN(J);
    if (Result) res.set(rtl.trunc(J));
    return Result;
  };
  this.StrToIntDef = function (S, aDef) {
    var Result = 0;
    var R = 0;
    if ($mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }})) {
      Result = R}
     else Result = aDef;
    return Result;
  };
  this.StrToIntDef$1 = function (S, aDef) {
    var Result = 0;
    var R = 0;
    if ($mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }})) {
      Result = R}
     else Result = aDef;
    return Result;
  };
  this.StrToInt = function (S) {
    var Result = 0;
    var R = 0;
    if (!$mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidInteger"),[S]]);
    Result = R;
    return Result;
  };
  this.StrToNativeInt = function (S) {
    var Result = 0;
    if (!$mod.TryStrToInt$1(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidInteger"),[S]]);
    return Result;
  };
  this.StrToInt64 = function (S) {
    var Result = 0;
    var N = 0;
    if (!$mod.TryStrToInt$1(S,{get: function () {
        return N;
      }, set: function (v) {
        N = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidInteger"),[S]]);
    Result = N;
    return Result;
  };
  this.StrToInt64Def = function (S, ADefault) {
    var Result = 0;
    if (!$mod.TryStrToInt64(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = ADefault;
    return Result;
  };
  this.TryStrToInt64 = function (S, res) {
    var Result = false;
    var R = 0;
    Result = $mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }});
    if (Result) res.set(R);
    return Result;
  };
  this.StrToQWord = function (S) {
    var Result = 0;
    var N = 0;
    if (!$mod.TryStrToInt$1(S,{get: function () {
        return N;
      }, set: function (v) {
        N = v;
      }}) || (N < 0)) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidInteger"),[S]]);
    Result = N;
    return Result;
  };
  this.StrToQWordDef = function (S, ADefault) {
    var Result = 0;
    if (!$mod.TryStrToQWord(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = ADefault;
    return Result;
  };
  this.TryStrToQWord = function (S, res) {
    var Result = false;
    var R = 0;
    Result = $mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }}) && (R >= 0);
    if (Result) res.set(R);
    return Result;
  };
  this.StrToUInt64 = function (S) {
    var Result = 0;
    var N = 0;
    if (!$mod.TryStrToInt$1(S,{get: function () {
        return N;
      }, set: function (v) {
        N = v;
      }}) || (N < 0)) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidInteger"),[S]]);
    Result = N;
    return Result;
  };
  this.StrToUInt64Def = function (S, ADefault) {
    var Result = 0;
    if (!$mod.TryStrToUInt64(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = ADefault;
    return Result;
  };
  this.TryStrToUInt64 = function (S, res) {
    var Result = false;
    var R = 0;
    Result = $mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }}) && (R >= 0);
    if (Result) res.set(R);
    return Result;
  };
  this.StrToDWord = function (S) {
    var Result = 0;
    if (!$mod.TryStrToDWord(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidInteger"),[S]]);
    return Result;
  };
  this.StrToDWordDef = function (S, ADefault) {
    var Result = 0;
    if (!$mod.TryStrToDWord(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = ADefault;
    return Result;
  };
  this.TryStrToDWord = function (S, res) {
    var Result = false;
    var R = 0;
    Result = $mod.TryStrToInt$1(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }}) && (R >= 0) && (R <= 0xFFFFFFFF);
    if (Result) res.set(R);
    return Result;
  };
  this.IntToHex = function (Value, Digits) {
    var Result = "";
    Result = "";
    if (Value < 0) if (Value<0) Value = 0xFFFFFFFF + Value + 1;
    Result=Value.toString(16);
    Result = $mod.UpperCase(Result);
    while (Result.length < Digits) Result = "0" + Result;
    return Result;
  };
  this.MaxCurrency = 900719925474.0991;
  this.MinCurrency = -900719925474.0991;
  this.TFloatFormat = {"0": "ffFixed", ffFixed: 0, "1": "ffGeneral", ffGeneral: 1, "2": "ffExponent", ffExponent: 2, "3": "ffNumber", ffNumber: 3, "4": "ffCurrency", ffCurrency: 4};
  this.$rtti.$Enum("TFloatFormat",{minvalue: 0, maxvalue: 4, ordtype: 1, enumtype: this.TFloatFormat});
  var Rounds = "123456789:";
  this.FloatToDecimal = function (Value, Precision, Decimals) {
    var Result = $mod.TFloatRec.$new();
    var Buffer = "";
    var InfNan = "";
    var OutPos = 0;
    var error = 0;
    var N = 0;
    var L = 0;
    var C = 0;
    var GotNonZeroBeforeDot = false;
    var BeforeDot = false;
    Result.Negative = false;
    Result.Exponent = 0;
    for (C = 0; C <= 19; C++) Result.Digits[C] = "0";
    if (Value === 0) return Result;
    Buffer=Value.toPrecision(21); // Double precision;
    N = 1;
    L = Buffer.length;
    while (Buffer.charAt(N - 1) === " ") N += 1;
    Result.Negative = Buffer.charAt(N - 1) === "-";
    if (Result.Negative) {
      N += 1}
     else if (Buffer.charAt(N - 1) === "+") N += 1;
    if (L >= (N + 2)) {
      InfNan = pas.System.Copy(Buffer,N,3);
      if (InfNan === "Inf") {
        Result.Digits[0] = "\x00";
        Result.Exponent = 32767;
        return Result;
      };
      if (InfNan === "Nan") {
        Result.Digits[0] = "\x00";
        Result.Exponent = -32768;
        return Result;
      };
    };
    OutPos = 0;
    Result.Exponent = 0;
    BeforeDot = true;
    GotNonZeroBeforeDot = false;
    while ((L >= N) && (Buffer.charAt(N - 1) !== "E")) {
      if (Buffer.charAt(N - 1) === ".") {
        BeforeDot = false}
       else {
        if (BeforeDot) {
          Result.Exponent += 1;
          Result.Digits[OutPos] = Buffer.charAt(N - 1);
          if (Buffer.charAt(N - 1) !== "0") GotNonZeroBeforeDot = true;
        } else Result.Digits[OutPos] = Buffer.charAt(N - 1);
        OutPos += 1;
      };
      N += 1;
    };
    N += 1;
    if (N <= L) {
      pas.System.val$6(pas.System.Copy(Buffer,N,(L - N) + 1),{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }},{get: function () {
          return error;
        }, set: function (v) {
          error = v;
        }});
      Result.Exponent += C;
    };
    N = OutPos;
    L = 19;
    while (N < L) {
      Result.Digits[N] = "0";
      N += 1;
    };
    if ((Decimals + Result.Exponent) < Precision) {
      N = Decimals + Result.Exponent}
     else N = Precision;
    if (N >= L) N = L - 1;
    if (N === 0) {
      if (Result.Digits[0] >= "5") {
        Result.Digits[0] = "1";
        Result.Digits[1] = "\x00";
        Result.Exponent += 1;
      } else Result.Digits[0] = "\x00";
    } else if (N > 0) {
      if (Result.Digits[N] >= "5") {
        do {
          Result.Digits[N] = "\x00";
          N -= 1;
          Result.Digits[N] = Rounds.charAt(($mod.StrToInt(Result.Digits[N]) + 1) - 1);
        } while (!((N === 0) || (Result.Digits[N] < ":")));
        if (Result.Digits[0] === ":") {
          Result.Digits[0] = "1";
          Result.Exponent += 1;
        };
      } else {
        Result.Digits[N] = "0";
        while ((N > -1) && (Result.Digits[N] === "0")) {
          Result.Digits[N] = "\x00";
          N -= 1;
        };
      };
    } else Result.Digits[0] = "\x00";
    if ((Result.Digits[0] === "\x00") && !GotNonZeroBeforeDot) {
      Result.Exponent = 0;
      Result.Negative = false;
    };
    return Result;
  };
  this.FloatToStr = function (Value) {
    var Result = "";
    Result = $mod.FloatToStrF(Value,$mod.TFloatFormat.ffGeneral,15,0);
    return Result;
  };
  this.FloatToStrF = function (Value, format, Precision, Digits) {
    var Result = "";
    var DS = "";
    DS = $mod.DecimalSeparator;
    var $tmp = format;
    if ($tmp === $mod.TFloatFormat.ffGeneral) {
      Result = $impl.FormatGeneralFloat(Value,Precision,DS)}
     else if ($tmp === $mod.TFloatFormat.ffExponent) {
      Result = $impl.FormatExponentFloat(Value,Precision,Digits,DS)}
     else if ($tmp === $mod.TFloatFormat.ffFixed) {
      Result = $impl.FormatFixedFloat(Value,Digits,DS)}
     else if ($tmp === $mod.TFloatFormat.ffNumber) {
      Result = $impl.FormatNumberFloat(Value,Digits,DS,$mod.ThousandSeparator)}
     else if ($tmp === $mod.TFloatFormat.ffCurrency) Result = $impl.FormatNumberCurrency(Value * 10000,Digits,DS,$mod.ThousandSeparator);
    if ((format !== $mod.TFloatFormat.ffCurrency) && (Result.length > 1) && (Result.charAt(0) === "-")) $impl.RemoveLeadingNegativeSign({get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},DS);
    return Result;
  };
  this.TryStrToFloat = function (S, res) {
    var Result = false;
    Result = $mod.TryStrToFloat$1(S,res);
    return Result;
  };
  this.TryStrToFloat$1 = function (S, res) {
    var Result = false;
    var J = undefined;
    var N = "";
    N = S;
    if ($mod.ThousandSeparator !== "") N = $mod.StringReplace(N,$mod.ThousandSeparator,"",rtl.createSet($mod.TStringReplaceFlag.rfReplaceAll));
    if ($mod.DecimalSeparator !== ".") N = $mod.StringReplace(N,$mod.DecimalSeparator,".",{});
    J = parseFloat(N);
    Result = !isNaN(J);
    if (Result) res.set(rtl.getNumber(J));
    return Result;
  };
  this.StrToFloatDef = function (S, aDef) {
    var Result = 0.0;
    if (!$mod.TryStrToFloat$1(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = aDef;
    return Result;
  };
  this.StrToFloat = function (S) {
    var Result = 0.0;
    if (!$mod.TryStrToFloat$1(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidFloat"),[S]]);
    return Result;
  };
  var MaxPrecision = 18;
  this.FormatFloat = function (Fmt, aValue) {
    var Result = "";
    var E = 0.0;
    var FV = $mod.TFloatRec.$new();
    var Section = "";
    var SectionLength = 0;
    var ThousandSep = false;
    var IsScientific = false;
    var DecimalPos = 0;
    var FirstDigit = 0;
    var LastDigit = 0;
    var RequestedDigits = 0;
    var ExpSize = 0;
    var Available = 0;
    var Current = 0;
    var PadZeroes = 0;
    var DistToDecimal = 0;
    function InitVars() {
      E = aValue;
      Section = "";
      SectionLength = 0;
      ThousandSep = false;
      IsScientific = false;
      DecimalPos = 0;
      FirstDigit = 2147483647;
      LastDigit = 0;
      RequestedDigits = 0;
      ExpSize = 0;
      Available = -1;
    };
    function ToResult(AChar) {
      Result = Result + AChar;
    };
    function AddToResult(AStr) {
      Result = Result + AStr;
    };
    function WriteDigit(ADigit) {
      if (ADigit === "\x00") return;
      DistToDecimal -= 1;
      if (DistToDecimal === -1) {
        AddToResult($mod.DecimalSeparator);
        ToResult(ADigit);
      } else {
        ToResult(ADigit);
        if (ThousandSep && ((DistToDecimal % 3) === 0) && (DistToDecimal > 1)) AddToResult($mod.ThousandSeparator);
      };
    };
    function GetDigit() {
      var Result = "";
      Result = "\x00";
      if (Current <= Available) {
        Result = FV.Digits[Current];
        Current += 1;
      } else if (DistToDecimal <= LastDigit) {
        DistToDecimal -= 1}
       else Result = "0";
      return Result;
    };
    function CopyDigit() {
      if (PadZeroes === 0) {
        WriteDigit(GetDigit())}
       else if (PadZeroes < 0) {
        PadZeroes += 1;
        if (DistToDecimal <= FirstDigit) {
          WriteDigit("0")}
         else DistToDecimal -= 1;
      } else {
        while (PadZeroes > 0) {
          WriteDigit(GetDigit());
          PadZeroes -= 1;
        };
        WriteDigit(GetDigit());
      };
    };
    function GetSections(SP) {
      var Result = 0;
      var FL = 0;
      var i = 0;
      var C = "";
      var Q = "";
      var inQuote = false;
      Result = 1;
      SP.get()[1] = -1;
      SP.get()[2] = -1;
      SP.get()[3] = -1;
      inQuote = false;
      Q = "\x00";
      i = 1;
      FL = Fmt.length;
      while (i <= FL) {
        C = Fmt.charAt(i - 1);
        var $tmp = C;
        if ($tmp === ";") {
          if (!inQuote) {
            if (Result > 3) throw $mod.Exception.$create("Create$1",["Invalid float format"]);
            SP.get()[Result] = i + 1;
            Result += 1;
          };
        } else if (($tmp === '"') || ($tmp === "'")) {
          if (inQuote) {
            inQuote = C !== Q}
           else {
            inQuote = true;
            Q = C;
          };
        };
        i += 1;
      };
      if (SP.get()[Result] === -1) SP.get()[Result] = FL + 1;
      return Result;
    };
    function AnalyzeFormat() {
      var I = 0;
      var Len = 0;
      var Q = "";
      var C = "";
      var InQuote = false;
      Len = Section.length;
      I = 1;
      InQuote = false;
      Q = "\x00";
      while (I <= Len) {
        C = Section.charAt(I - 1);
        if (C.charCodeAt() in rtl.createSet(34,39)) {
          if (InQuote) {
            InQuote = C !== Q}
           else {
            InQuote = true;
            Q = C;
          };
        } else if (!InQuote) {
          var $tmp = C;
          if ($tmp === ".") {
            if (DecimalPos === 0) DecimalPos = RequestedDigits + 1}
           else if ($tmp === ",") {
            ThousandSep = $mod.ThousandSeparator !== "\x00"}
           else if (($tmp === "e") || ($tmp === "E")) {
            I += 1;
            if (I < Len) {
              C = Section.charAt(I - 1);
              IsScientific = C.charCodeAt() in rtl.createSet(45,43);
              if (IsScientific) while ((I < Len) && (Section.charAt((I + 1) - 1) === "0")) {
                ExpSize += 1;
                I += 1;
              };
              if (ExpSize > 4) ExpSize = 4;
            };
          } else if ($tmp === "#") {
            RequestedDigits += 1}
           else if ($tmp === "0") {
            if (RequestedDigits < FirstDigit) FirstDigit = RequestedDigits + 1;
            RequestedDigits += 1;
            LastDigit = RequestedDigits + 1;
          };
        };
        I += 1;
      };
      if (DecimalPos === 0) DecimalPos = RequestedDigits + 1;
      LastDigit = DecimalPos - LastDigit;
      if (LastDigit > 0) LastDigit = 0;
      FirstDigit = DecimalPos - FirstDigit;
      if (FirstDigit < 0) FirstDigit = 0;
    };
    function ValueOutSideScope() {
      var Result = false;
      Result = ((FV.Exponent >= 18) && !IsScientific) || (FV.Exponent === 0x7FF) || (FV.Exponent === 0x800);
      return Result;
    };
    function CalcRunVars() {
      var D = 0;
      var P = 0;
      if (IsScientific) {
        P = RequestedDigits;
        D = 9999;
      } else {
        P = 18;
        D = (RequestedDigits - DecimalPos) + 1;
      };
      FV.$assign($mod.FloatToDecimal(aValue,P,D));
      DistToDecimal = DecimalPos - 1;
      if (IsScientific) {
        PadZeroes = 0}
       else {
        PadZeroes = FV.Exponent - (DecimalPos - 1);
        if (PadZeroes >= 0) DistToDecimal = FV.Exponent;
      };
      Available = -1;
      while ((Available < 18) && (FV.Digits[Available + 1] !== "\x00")) Available += 1;
    };
    function FormatExponent(ASign, aExponent) {
      var Result = "";
      Result = $mod.IntToStr(aExponent);
      Result = pas.System.StringOfChar("0",ExpSize - Result.length) + Result;
      if (aExponent < 0) {
        Result = "-" + Result}
       else if ((aExponent > 0) && (ASign === "+")) Result = ASign + Result;
      return Result;
    };
    var I = 0;
    var S = 0;
    var C = "";
    var Q = "";
    var PA = [];
    var InLiteral = false;
    PA = rtl.arraySetLength(PA,0,4);
    Result = "";
    InitVars();
    if (E > 0) {
      S = 1}
     else if (E < 0) {
      S = 2}
     else S = 3;
    PA[0] = 0;
    I = GetSections({get: function () {
        return PA;
      }, set: function (v) {
        PA = v;
      }});
    if ((I < S) || ((PA[S] - PA[S - 1]) === 0)) S = 1;
    SectionLength = PA[S] - PA[S - 1] - 1;
    Section = pas.System.Copy(Fmt,PA[S - 1] + 1,SectionLength);
    Section = rtl.strSetLength(Section,SectionLength);
    AnalyzeFormat();
    CalcRunVars();
    if ((SectionLength === 0) || ValueOutSideScope()) {
      Section=E.toPrecision(15);
      Result = Section;
    };
    I = 1;
    Current = 0;
    Q = " ";
    InLiteral = false;
    if (FV.Negative && (S === 1)) ToResult("-");
    while (I <= SectionLength) {
      C = Section.charAt(I - 1);
      if (C.charCodeAt() in rtl.createSet(34,39)) {
        if (InLiteral) {
          InLiteral = C !== Q}
         else {
          InLiteral = true;
          Q = C;
        };
      } else if (InLiteral) {
        ToResult(C)}
       else {
        var $tmp = C;
        if (($tmp === "0") || ($tmp === "#")) {
          CopyDigit()}
         else if (($tmp === ".") || ($tmp === ",")) {}
        else if (($tmp === "e") || ($tmp === "E")) {
          ToResult(C);
          I += 1;
          if (I <= Section.length) {
            C = Section.charAt(I - 1);
            if (C.charCodeAt() in rtl.createSet(43,45)) {
              AddToResult(FormatExponent(C,(FV.Exponent - DecimalPos) + 1));
              while ((I < SectionLength) && (Section.charAt((I + 1) - 1) === "0")) I += 1;
            };
          };
        } else {
          ToResult(C);
        };
      };
      I += 1;
    };
    return Result;
  };
  this.SwapEndian = function (W) {
    var Result = 0;
    Result = ((W & 0xFF) << 8) | ((W >>> 8) & 0xFF);
    return Result;
  };
  this.SwapEndian$1 = function (C) {
    var Result = 0;
    Result = rtl.lw(rtl.lw(rtl.lw(rtl.lw((C & 0xFF) << 24) | rtl.lw((C & 0xFF00) << 8)) | (rtl.lw(C >>> 8) & 0xFF00)) | (rtl.lw(C >>> 24) & 0xFF));
    return Result;
  };
  this.$rtti.$DynArray("FalseBoolStrs$a",{eltype: rtl.string});
  this.TrueBoolStrs = [];
  this.FalseBoolStrs = [];
  this.StrToBool = function (S) {
    var Result = false;
    if (!$mod.TryStrToBool(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidBoolean"),[S]]);
    return Result;
  };
  this.BoolToStr = function (B, UseBoolStrs) {
    var Result = "";
    if (UseBoolStrs) {
      $impl.CheckBoolStrs();
      if (B) {
        Result = $mod.TrueBoolStrs[0]}
       else Result = $mod.FalseBoolStrs[0];
    } else if (B) {
      Result = "-1"}
     else Result = "0";
    return Result;
  };
  this.BoolToStr$1 = function (B, TrueS, FalseS) {
    var Result = "";
    if (B) {
      Result = TrueS}
     else Result = FalseS;
    return Result;
  };
  this.StrToBoolDef = function (S, Default) {
    var Result = false;
    if (!$mod.TryStrToBool(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = Default;
    return Result;
  };
  this.TryStrToBool = function (S, Value) {
    var Result = false;
    var Temp = "";
    var I = 0;
    var D = 0.0;
    var Code = 0;
    Temp = $mod.UpperCase(S);
    pas.System.val$8(Temp,{get: function () {
        return D;
      }, set: function (v) {
        D = v;
      }},{get: function () {
        return Code;
      }, set: function (v) {
        Code = v;
      }});
    Result = true;
    if (Code === 0) {
      Value.set(D !== 0.0)}
     else {
      $impl.CheckBoolStrs();
      for (var $l = 0, $end = rtl.length($mod.TrueBoolStrs) - 1; $l <= $end; $l++) {
        I = $l;
        if (Temp === $mod.UpperCase($mod.TrueBoolStrs[I])) {
          Value.set(true);
          return Result;
        };
      };
      for (var $l1 = 0, $end1 = rtl.length($mod.FalseBoolStrs) - 1; $l1 <= $end1; $l1++) {
        I = $l1;
        if (Temp === $mod.UpperCase($mod.FalseBoolStrs[I])) {
          Value.set(false);
          return Result;
        };
      };
      Result = false;
    };
    return Result;
  };
  this.ConfigExtension = ".cfg";
  this.SysConfigDir = "";
  this.$rtti.$ProcVar("TOnGetEnvironmentVariable",{procsig: rtl.newTIProcSig([["EnvVar",rtl.string,2]],rtl.string)});
  this.$rtti.$ProcVar("TOnGetEnvironmentString",{procsig: rtl.newTIProcSig([["Index",rtl.longint]],rtl.string)});
  this.$rtti.$ProcVar("TOnGetEnvironmentVariableCount",{procsig: rtl.newTIProcSig([],rtl.longint)});
  this.$rtti.$ProcVar("TShowExceptionHandler",{procsig: rtl.newTIProcSig([["Msg",rtl.string,2]])});
  this.$rtti.$RefToProcVar("TUncaughtPascalExceptionHandler",{procsig: rtl.newTIProcSig([["aObject",pas.System.$rtti["TObject"]]])});
  this.$rtti.$RefToProcVar("TUncaughtJSExceptionHandler",{procsig: rtl.newTIProcSig([["aObject",pas.JS.$rtti["TJSObject"]]])});
  this.OnGetEnvironmentVariable = null;
  this.OnGetEnvironmentString = null;
  this.OnGetEnvironmentVariableCount = null;
  this.OnShowException = null;
  this.SetOnUnCaughtExceptionHandler = function (aValue) {
    var Result = null;
    Result = $impl.OnPascalException;
    $impl.OnPascalException = aValue;
    $mod.HookUncaughtExceptions();
    return Result;
  };
  this.SetOnUnCaughtExceptionHandler$1 = function (aValue) {
    var Result = null;
    Result = $impl.OnJSException;
    $impl.OnJSException = aValue;
    $mod.HookUncaughtExceptions();
    return Result;
  };
  this.HookUncaughtExceptions = function () {
    rtl.onUncaughtException = $impl.RTLExceptionHook;
    rtl.showUncaughtExceptions = true;
  };
  this.GetEnvironmentVariable = function (EnvVar) {
    var Result = "";
    if ($mod.OnGetEnvironmentVariable != null) {
      Result = $mod.OnGetEnvironmentVariable(EnvVar)}
     else Result = "";
    return Result;
  };
  this.GetEnvironmentVariableCount = function () {
    var Result = 0;
    if ($mod.OnGetEnvironmentVariableCount != null) {
      Result = $mod.OnGetEnvironmentVariableCount()}
     else Result = 0;
    return Result;
  };
  this.GetEnvironmentString = function (Index) {
    var Result = "";
    if ($mod.OnGetEnvironmentString != null) {
      Result = $mod.OnGetEnvironmentString(Index)}
     else Result = "";
    return Result;
  };
  this.ShowException = function (ExceptObject, ExceptAddr) {
    var S = "";
    S = rtl.getResStr($mod,"SApplicationException") + ExceptObject.$classname;
    if ($mod.Exception.isPrototypeOf(ExceptObject)) S = S + " : " + ExceptObject.fMessage;
    $impl.DoShowException(S);
    if (ExceptAddr === null) ;
  };
  this.Abort = function () {
    throw $mod.EAbort.$create("Create$1",[rtl.getResStr($mod,"SAbortError")]);
  };
  this.TEventType = {"0": "etCustom", etCustom: 0, "1": "etInfo", etInfo: 1, "2": "etWarning", etWarning: 2, "3": "etError", etError: 3, "4": "etDebug", etDebug: 4};
  this.$rtti.$Enum("TEventType",{minvalue: 0, maxvalue: 4, ordtype: 1, enumtype: this.TEventType});
  this.$rtti.$Set("TEventTypes",{comptype: this.$rtti["TEventType"]});
  rtl.recNewT(this,"TSystemTime",function () {
    this.Year = 0;
    this.Month = 0;
    this.Day = 0;
    this.DayOfWeek = 0;
    this.Hour = 0;
    this.Minute = 0;
    this.Second = 0;
    this.MilliSecond = 0;
    this.$eq = function (b) {
      return (this.Year === b.Year) && (this.Month === b.Month) && (this.Day === b.Day) && (this.DayOfWeek === b.DayOfWeek) && (this.Hour === b.Hour) && (this.Minute === b.Minute) && (this.Second === b.Second) && (this.MilliSecond === b.MilliSecond);
    };
    this.$assign = function (s) {
      this.Year = s.Year;
      this.Month = s.Month;
      this.Day = s.Day;
      this.DayOfWeek = s.DayOfWeek;
      this.Hour = s.Hour;
      this.Minute = s.Minute;
      this.Second = s.Second;
      this.MilliSecond = s.MilliSecond;
      return this;
    };
    var $r = $mod.$rtti.$Record("TSystemTime",{});
    $r.addField("Year",rtl.word);
    $r.addField("Month",rtl.word);
    $r.addField("Day",rtl.word);
    $r.addField("DayOfWeek",rtl.word);
    $r.addField("Hour",rtl.word);
    $r.addField("Minute",rtl.word);
    $r.addField("Second",rtl.word);
    $r.addField("MilliSecond",rtl.word);
  });
  rtl.recNewT(this,"TTimeStamp",function () {
    this.Time = 0;
    this.Date = 0;
    this.$eq = function (b) {
      return (this.Time === b.Time) && (this.Date === b.Date);
    };
    this.$assign = function (s) {
      this.Time = s.Time;
      this.Date = s.Date;
      return this;
    };
    var $r = $mod.$rtti.$Record("TTimeStamp",{});
    $r.addField("Time",rtl.longint);
    $r.addField("Date",rtl.longint);
  });
  this.TimeSeparator = ":";
  this.DateSeparator = "-";
  this.ShortDateFormat = "yyyy-mm-dd";
  this.LongDateFormat = "ddd, yyyy-mm-dd";
  this.ShortTimeFormat = "hh:nn";
  this.LongTimeFormat = "hh:nn:ss";
  this.DecimalSeparator = ".";
  this.ThousandSeparator = ",";
  this.TimeAMString = "AM";
  this.TimePMString = "PM";
  this.HoursPerDay = 24;
  this.MinsPerHour = 60;
  this.SecsPerMin = 60;
  this.MSecsPerSec = 1000;
  this.MinsPerDay = 24 * 60;
  this.SecsPerDay = 1440 * 60;
  this.MSecsPerDay = 86400 * 1000;
  this.MaxDateTime = 2958465.99999999;
  this.MinDateTime = -693593.99999999;
  this.JulianEpoch = -2415018.5;
  this.UnixEpoch = -2415018.5 + 2440587.5;
  this.DateDelta = 693594;
  this.UnixDateDelta = 25569;
  this.MonthDays$a$clone = function (a) {
    var r = [];
    for (var i = 0; i < 2; i++) r.push(a[i].slice(0));
    return r;
  };
  this.$rtti.$StaticArray("MonthDays$a",{dims: [2,12], eltype: rtl.word});
  this.MonthDays = [[31,28,31,30,31,30,31,31,30,31,30,31],[31,29,31,30,31,30,31,31,30,31,30,31]];
  this.ShortMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  this.LongMonthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  this.ShortDayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  this.LongDayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  rtl.createClass(this,"TFormatSettings",pas.System.TObject,function () {
    this.GetCurrencyDecimals = function () {
      var Result = 0;
      Result = $mod.CurrencyDecimals;
      return Result;
    };
    this.GetCurrencyFormat = function () {
      var Result = 0;
      Result = $mod.CurrencyFormat;
      return Result;
    };
    this.GetCurrencyString = function () {
      var Result = "";
      Result = $mod.CurrencyString;
      return Result;
    };
    this.GetDateSeparator = function () {
      var Result = "";
      Result = $mod.DateSeparator;
      return Result;
    };
    this.GetDecimalSeparator = function () {
      var Result = "";
      Result = $mod.DecimalSeparator;
      return Result;
    };
    this.GetLongDateFormat = function () {
      var Result = "";
      Result = $mod.LongDateFormat;
      return Result;
    };
    this.GetLongDayNames = function () {
      var Result = rtl.arraySetLength(null,"",7);
      Result = $mod.LongDayNames;
      return Result;
    };
    this.GetLongMonthNames = function () {
      var Result = rtl.arraySetLength(null,"",12);
      Result = $mod.LongMonthNames;
      return Result;
    };
    this.GetLongTimeFormat = function () {
      var Result = "";
      Result = $mod.LongTimeFormat;
      return Result;
    };
    this.GetNegCurrFormat = function () {
      var Result = 0;
      Result = $mod.NegCurrFormat;
      return Result;
    };
    this.GetShortDateFormat = function () {
      var Result = "";
      Result = $mod.ShortDateFormat;
      return Result;
    };
    this.GetShortDayNames = function () {
      var Result = rtl.arraySetLength(null,"",7);
      Result = $mod.ShortDayNames;
      return Result;
    };
    this.GetShortMonthNames = function () {
      var Result = rtl.arraySetLength(null,"",12);
      Result = $mod.ShortMonthNames;
      return Result;
    };
    this.GetShortTimeFormat = function () {
      var Result = "";
      Result = $mod.ShortTimeFormat;
      return Result;
    };
    this.GetThousandSeparator = function () {
      var Result = "";
      Result = $mod.ThousandSeparator;
      return Result;
    };
    this.GetTimeAMString = function () {
      var Result = "";
      Result = $mod.TimeAMString;
      return Result;
    };
    this.GetTimePMString = function () {
      var Result = "";
      Result = $mod.TimePMString;
      return Result;
    };
    this.GetTimeSeparator = function () {
      var Result = "";
      Result = $mod.TimeSeparator;
      return Result;
    };
    this.SetCurrencyFormat = function (AValue) {
      $mod.CurrencyFormat = AValue;
    };
    this.SetCurrencyString = function (AValue) {
      $mod.CurrencyString = AValue;
    };
    this.SetDateSeparator = function (Value) {
      $mod.DateSeparator = Value;
    };
    this.SetDecimalSeparator = function (Value) {
      $mod.DecimalSeparator = Value;
    };
    this.SetLongDateFormat = function (Value) {
      $mod.LongDateFormat = Value;
    };
    this.SetLongDayNames = function (AValue) {
      $mod.LongDayNames = AValue.slice(0);
    };
    this.SetLongMonthNames = function (AValue) {
      $mod.LongMonthNames = AValue.slice(0);
    };
    this.SetLongTimeFormat = function (Value) {
      $mod.LongTimeFormat = Value;
    };
    this.SetNegCurrFormat = function (AValue) {
      $mod.NegCurrFormat = AValue;
    };
    this.SetShortDateFormat = function (Value) {
      $mod.ShortDateFormat = Value;
    };
    this.SetShortDayNames = function (AValue) {
      $mod.ShortDayNames = AValue.slice(0);
    };
    this.SetShortMonthNames = function (AValue) {
      $mod.ShortMonthNames = AValue.slice(0);
    };
    this.SetShortTimeFormat = function (Value) {
      $mod.ShortTimeFormat = Value;
    };
    this.SetCurrencyDecimals = function (AValue) {
      $mod.CurrencyDecimals = AValue;
    };
    this.SetThousandSeparator = function (Value) {
      $mod.ThousandSeparator = Value;
    };
    this.SetTimeAMString = function (Value) {
      $mod.TimeAMString = Value;
    };
    this.SetTimePMString = function (Value) {
      $mod.TimePMString = Value;
    };
    this.SetTimeSeparator = function (Value) {
      $mod.TimeSeparator = Value;
    };
  });
  this.FormatSettings = null;
  this.TwoDigitYearCenturyWindow = 50;
  this.DateTimeToJSDate = function (aDateTime) {
    var Result = null;
    var Y = 0;
    var M = 0;
    var D = 0;
    var h = 0;
    var n = 0;
    var s = 0;
    var z = 0;
    $mod.DecodeDate(pas.System.Trunc(aDateTime),{get: function () {
        return Y;
      }, set: function (v) {
        Y = v;
      }},{get: function () {
        return M;
      }, set: function (v) {
        M = v;
      }},{get: function () {
        return D;
      }, set: function (v) {
        D = v;
      }});
    $mod.DecodeTime(pas.System.Frac(aDateTime),{get: function () {
        return h;
      }, set: function (v) {
        h = v;
      }},{get: function () {
        return n;
      }, set: function (v) {
        n = v;
      }},{get: function () {
        return s;
      }, set: function (v) {
        s = v;
      }},{get: function () {
        return z;
      }, set: function (v) {
        z = v;
      }});
    Result = new Date(Y,M - 1,D,h,n,s,z);
    return Result;
  };
  this.JSDateToDateTime = function (aDate) {
    var Result = 0.0;
    Result = $mod.EncodeDate(aDate.getFullYear(),aDate.getMonth() + 1,aDate.getDate()) + $mod.EncodeTime(aDate.getHours(),aDate.getMinutes(),aDate.getSeconds(),aDate.getMilliseconds());
    return Result;
  };
  this.DateTimeToTimeStamp = function (DateTime) {
    var Result = $mod.TTimeStamp.$new();
    var D = 0.0;
    D = DateTime * 86400000;
    if (D < 0) {
      D = D - 0.5}
     else D = D + 0.5;
    Result.Time = pas.System.Trunc(Math.abs(pas.System.Trunc(D)) % 86400000);
    Result.Date = 693594 + rtl.trunc(pas.System.Trunc(D) / 86400000);
    return Result;
  };
  this.TimeStampToDateTime = function (TimeStamp) {
    var Result = 0.0;
    Result = $mod.ComposeDateTime(TimeStamp.Date - 693594,TimeStamp.Time / 86400000);
    return Result;
  };
  this.MSecsToTimeStamp = function (MSecs) {
    var Result = $mod.TTimeStamp.$new();
    Result.Date = pas.System.Trunc(MSecs / 86400000);
    MSecs = MSecs - (Result.Date * 86400000);
    Result.Time = Math.round(MSecs);
    return Result;
  };
  this.TimeStampToMSecs = function (TimeStamp) {
    var Result = 0;
    Result = TimeStamp.Time + (TimeStamp.Date * 86400000);
    return Result;
  };
  this.TryEncodeDate = function (Year, Month, Day, date) {
    var Result = false;
    var c = 0;
    var ya = 0;
    Result = (Year > 0) && (Year < 10000) && (Month >= 1) && (Month <= 12) && (Day > 0) && (Day <= $mod.MonthDays[+$mod.IsLeapYear(Year)][Month - 1]);
    if (Result) {
      if (Month > 2) {
        Month -= 3}
       else {
        Month += 9;
        Year -= 1;
      };
      c = rtl.trunc(Year / 100);
      ya = Year - (100 * c);
      date.set(((146097 * c) >>> 2) + ((1461 * ya) >>> 2) + rtl.trunc(((153 * Month) + 2) / 5) + Day);
      date.set(date.get() - 693900);
    };
    return Result;
  };
  this.TryEncodeTime = function (Hour, Min, Sec, MSec, Time) {
    var Result = false;
    Result = (Hour < 24) && (Min < 60) && (Sec < 60) && (MSec < 1000);
    if (Result) Time.set(((Hour * 3600000) + (Min * 60000) + (Sec * 1000) + MSec) / 86400000);
    return Result;
  };
  this.EncodeDate = function (Year, Month, Day) {
    var Result = 0.0;
    if (!$mod.TryEncodeDate(Year,Month,Day,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",["%s-%s-%s is not a valid date specification",[$mod.IntToStr(Year),$mod.IntToStr(Month),$mod.IntToStr(Day)]]);
    return Result;
  };
  this.EncodeTime = function (Hour, Minute, Second, MilliSecond) {
    var Result = 0.0;
    if (!$mod.TryEncodeTime(Hour,Minute,Second,MilliSecond,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",["%s:%s:%s.%s is not a valid time specification",[$mod.IntToStr(Hour),$mod.IntToStr(Minute),$mod.IntToStr(Second),$mod.IntToStr(MilliSecond)]]);
    return Result;
  };
  this.ComposeDateTime = function (date, Time) {
    var Result = 0.0;
    if (date < 0) {
      Result = pas.System.Trunc(date) - Math.abs(pas.System.Frac(Time))}
     else Result = pas.System.Trunc(date) + Math.abs(pas.System.Frac(Time));
    return Result;
  };
  this.DecodeDate = function (date, Year, Month, Day) {
    var ly = 0;
    var ld = 0;
    var lm = 0;
    var j = 0;
    if (date <= -693594) {
      Year.set(0);
      Month.set(0);
      Day.set(0);
    } else {
      if (date > 0) {
        date = date + (1 / (86400000 * 2))}
       else date = date - (1 / (86400000 * 2));
      if (date > $mod.MaxDateTime) date = $mod.MaxDateTime;
      j = rtl.shl(pas.System.Trunc(date) + 693900,2) - 1;
      ly = rtl.trunc(j / 146097);
      j = j - (146097 * ly);
      ld = rtl.lw(j >>> 2);
      j = rtl.trunc((rtl.lw(ld << 2) + 3) / 1461);
      ld = rtl.lw(((rtl.lw(ld << 2) + 7) - (1461 * j)) >>> 2);
      lm = rtl.trunc(((5 * ld) - 3) / 153);
      ld = rtl.trunc((((5 * ld) + 2) - (153 * lm)) / 5);
      ly = (100 * ly) + j;
      if (lm < 10) {
        lm += 3}
       else {
        lm -= 9;
        ly += 1;
      };
      Year.set(ly);
      Month.set(lm);
      Day.set(ld);
    };
  };
  this.DecodeDateFully = function (DateTime, Year, Month, Day, DOW) {
    var Result = false;
    $mod.DecodeDate(DateTime,Year,Month,Day);
    DOW.set($mod.DayOfWeek(DateTime));
    Result = $mod.IsLeapYear(Year.get());
    return Result;
  };
  this.DecodeTime = function (Time, Hour, Minute, Second, MilliSecond) {
    var l = 0;
    l = $mod.DateTimeToTimeStamp(Time).Time;
    Hour.set(rtl.trunc(l / 3600000));
    l = l % 3600000;
    Minute.set(rtl.trunc(l / 60000));
    l = l % 60000;
    Second.set(rtl.trunc(l / 1000));
    l = l % 1000;
    MilliSecond.set(l);
  };
  this.DateTimeToSystemTime = function (DateTime, SystemTime) {
    $mod.DecodeDateFully(DateTime,{p: SystemTime, get: function () {
        return this.p.Year;
      }, set: function (v) {
        this.p.Year = v;
      }},{p: SystemTime, get: function () {
        return this.p.Month;
      }, set: function (v) {
        this.p.Month = v;
      }},{p: SystemTime, get: function () {
        return this.p.Day;
      }, set: function (v) {
        this.p.Day = v;
      }},{p: SystemTime, get: function () {
        return this.p.DayOfWeek;
      }, set: function (v) {
        this.p.DayOfWeek = v;
      }});
    $mod.DecodeTime(DateTime,{p: SystemTime, get: function () {
        return this.p.Hour;
      }, set: function (v) {
        this.p.Hour = v;
      }},{p: SystemTime, get: function () {
        return this.p.Minute;
      }, set: function (v) {
        this.p.Minute = v;
      }},{p: SystemTime, get: function () {
        return this.p.Second;
      }, set: function (v) {
        this.p.Second = v;
      }},{p: SystemTime, get: function () {
        return this.p.MilliSecond;
      }, set: function (v) {
        this.p.MilliSecond = v;
      }});
    SystemTime.DayOfWeek -= 1;
  };
  this.SystemTimeToDateTime = function (SystemTime) {
    var Result = 0.0;
    Result = $mod.ComposeDateTime($impl.DoEncodeDate(SystemTime.Year,SystemTime.Month,SystemTime.Day),$impl.DoEncodeTime(SystemTime.Hour,SystemTime.Minute,SystemTime.Second,SystemTime.MilliSecond));
    return Result;
  };
  this.DayOfWeek = function (DateTime) {
    var Result = 0;
    Result = 1 + ((pas.System.Trunc(DateTime) - 1) % 7);
    if (Result <= 0) Result += 7;
    return Result;
  };
  this.Date = function () {
    var Result = 0.0;
    Result = pas.System.Trunc($mod.Now());
    return Result;
  };
  this.Time = function () {
    var Result = 0.0;
    Result = $mod.Now() - $mod.Date();
    return Result;
  };
  this.Now = function () {
    var Result = 0.0;
    Result = $mod.JSDateToDateTime(new Date());
    return Result;
  };
  this.IncMonth = function (DateTime, NumberOfMonths) {
    var Result = 0.0;
    var Year = 0;
    var Month = 0;
    var Day = 0;
    $mod.DecodeDate(DateTime,{get: function () {
        return Year;
      }, set: function (v) {
        Year = v;
      }},{get: function () {
        return Month;
      }, set: function (v) {
        Month = v;
      }},{get: function () {
        return Day;
      }, set: function (v) {
        Day = v;
      }});
    $mod.IncAMonth({get: function () {
        return Year;
      }, set: function (v) {
        Year = v;
      }},{get: function () {
        return Month;
      }, set: function (v) {
        Month = v;
      }},{get: function () {
        return Day;
      }, set: function (v) {
        Day = v;
      }},NumberOfMonths);
    Result = $mod.ComposeDateTime($impl.DoEncodeDate(Year,Month,Day),DateTime);
    return Result;
  };
  this.IncAMonth = function (Year, Month, Day, NumberOfMonths) {
    var TempMonth = 0;
    var S = 0;
    if (NumberOfMonths >= 0) {
      S = 1}
     else S = -1;
    Year.set(Year.get() + rtl.trunc(NumberOfMonths / 12));
    TempMonth = (Month.get() + (NumberOfMonths % 12)) - 1;
    if ((TempMonth > 11) || (TempMonth < 0)) {
      TempMonth -= S * 12;
      Year.set(Year.get() + S);
    };
    Month.set(TempMonth + 1);
    if (Day.get() > $mod.MonthDays[+$mod.IsLeapYear(Year.get())][Month.get() - 1]) Day.set($mod.MonthDays[+$mod.IsLeapYear(Year.get())][Month.get() - 1]);
  };
  this.IsLeapYear = function (Year) {
    var Result = false;
    Result = ((Year % 4) === 0) && (((Year % 100) !== 0) || ((Year % 400) === 0));
    return Result;
  };
  this.DateToStr = function (date) {
    var Result = "";
    Result = $mod.FormatDateTime("ddddd",date);
    return Result;
  };
  this.TimeToStr = function (Time) {
    var Result = "";
    Result = $mod.FormatDateTime("tt",Time);
    return Result;
  };
  this.DateTimeToStr = function (DateTime, ForceTimeIfZero) {
    var Result = "";
    Result = $mod.FormatDateTime($impl.DateTimeToStrFormat[+ForceTimeIfZero],DateTime);
    return Result;
  };
  this.StrToDate = function (S) {
    var Result = 0.0;
    Result = $mod.StrToDate$2(S,$mod.ShortDateFormat,"\x00");
    return Result;
  };
  this.StrToDate$1 = function (S, separator) {
    var Result = 0.0;
    Result = $mod.StrToDate$2(S,$mod.ShortDateFormat,separator);
    return Result;
  };
  this.StrToDate$2 = function (S, useformat, separator) {
    var Result = 0.0;
    var MSg = "";
    Result = $impl.IntStrToDate({get: function () {
        return MSg;
      }, set: function (v) {
        MSg = v;
      }},S,useformat,separator);
    if (MSg !== "") throw $mod.EConvertError.$create("Create$1",[MSg]);
    return Result;
  };
  this.StrToTime = function (S) {
    var Result = 0.0;
    Result = $mod.StrToTime$1(S,$mod.TimeSeparator);
    return Result;
  };
  this.StrToTime$1 = function (S, separator) {
    var Result = 0.0;
    var Msg = "";
    Result = $impl.IntStrToTime({get: function () {
        return Msg;
      }, set: function (v) {
        Msg = v;
      }},S,S.length,separator);
    if (Msg !== "") throw $mod.EConvertError.$create("Create$1",[Msg]);
    return Result;
  };
  this.StrToDateTime = function (S) {
    var Result = 0.0;
    var TimeStr = "";
    var DateStr = "";
    var PartsFound = 0;
    PartsFound = $impl.SplitDateTimeStr(S,{get: function () {
        return DateStr;
      }, set: function (v) {
        DateStr = v;
      }},{get: function () {
        return TimeStr;
      }, set: function (v) {
        TimeStr = v;
      }});
    var $tmp = PartsFound;
    if ($tmp === 0) {
      Result = $mod.StrToDate("")}
     else if ($tmp === 1) {
      if (DateStr.length > 0) {
        Result = $mod.StrToDate$2(DateStr,$mod.ShortDateFormat,$mod.DateSeparator)}
       else Result = $mod.StrToTime(TimeStr)}
     else if ($tmp === 2) Result = $mod.ComposeDateTime($mod.StrToDate$2(DateStr,$mod.ShortDateFormat,$mod.DateSeparator),$mod.StrToTime(TimeStr));
    return Result;
  };
  this.FormatDateTime = function (FormatStr, DateTime) {
    var Result = "";
    function StoreStr(APos, Len) {
      Result = Result + pas.System.Copy(FormatStr,APos,Len);
    };
    function StoreString(AStr) {
      Result = Result + AStr;
    };
    function StoreInt(Value, Digits) {
      var S = "";
      S = $mod.IntToStr(Value);
      while (S.length < Digits) S = "0" + S;
      StoreString(S);
    };
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var DayOfWeek = 0;
    var Hour = 0;
    var Minute = 0;
    var Second = 0;
    var MilliSecond = 0;
    function StoreFormat(FormatStr, Nesting, TimeFlag) {
      var Token = "";
      var lastformattoken = "";
      var prevlasttoken = "";
      var Count = 0;
      var Clock12 = false;
      var tmp = 0;
      var isInterval = false;
      var P = 0;
      var FormatCurrent = 0;
      var FormatEnd = 0;
      if (Nesting > 1) return;
      FormatCurrent = 1;
      FormatEnd = FormatStr.length;
      Clock12 = false;
      isInterval = false;
      P = 1;
      while (P <= FormatEnd) {
        Token = FormatStr.charAt(P - 1);
        var $tmp = Token;
        if (($tmp === "'") || ($tmp === '"')) {
          P += 1;
          while ((P < FormatEnd) && (FormatStr.charAt(P - 1) !== Token)) P += 1;
        } else if (($tmp === "A") || ($tmp === "a")) {
          if (($mod.CompareText(pas.System.Copy(FormatStr,P,3),"A\/P") === 0) || ($mod.CompareText(pas.System.Copy(FormatStr,P,4),"AMPM") === 0) || ($mod.CompareText(pas.System.Copy(FormatStr,P,5),"AM\/PM") === 0)) {
            Clock12 = true;
            break;
          };
        };
        P += 1;
      };
      Token = "ÿ";
      lastformattoken = " ";
      prevlasttoken = "H";
      while (FormatCurrent <= FormatEnd) {
        Token = $mod.UpperCase(FormatStr.charAt(FormatCurrent - 1)).charAt(0);
        Count = 1;
        P = FormatCurrent + 1;
        var $tmp1 = Token;
        if (($tmp1 === "'") || ($tmp1 === '"')) {
          while ((P < FormatEnd) && (FormatStr.charAt(P - 1) !== Token)) P += 1;
          P += 1;
          Count = P - FormatCurrent;
          StoreStr(FormatCurrent + 1,Count - 2);
        } else if ($tmp1 === "A") {
          if ($mod.CompareText(pas.System.Copy(FormatStr,FormatCurrent,4),"AMPM") === 0) {
            Count = 4;
            if (Hour < 12) {
              StoreString($mod.TimeAMString)}
             else StoreString($mod.TimePMString);
          } else if ($mod.CompareText(pas.System.Copy(FormatStr,FormatCurrent,5),"AM\/PM") === 0) {
            Count = 5;
            if (Hour < 12) {
              StoreStr(FormatCurrent,2)}
             else StoreStr(FormatCurrent + 3,2);
          } else if ($mod.CompareText(pas.System.Copy(FormatStr,FormatCurrent,3),"A\/P") === 0) {
            Count = 3;
            if (Hour < 12) {
              StoreStr(FormatCurrent,1)}
             else StoreStr(FormatCurrent + 2,1);
          } else throw $mod.EConvertError.$create("Create$1",["Illegal character in format string"]);
        } else if ($tmp1 === "\/") {
          StoreString($mod.DateSeparator);
        } else if ($tmp1 === ":") {
          StoreString($mod.TimeSeparator)}
         else if (($tmp1 === " ") || ($tmp1 === "C") || ($tmp1 === "D") || ($tmp1 === "H") || ($tmp1 === "M") || ($tmp1 === "N") || ($tmp1 === "S") || ($tmp1 === "T") || ($tmp1 === "Y") || ($tmp1 === "Z") || ($tmp1 === "F")) {
          while ((P <= FormatEnd) && ($mod.UpperCase(FormatStr.charAt(P - 1)) === Token)) P += 1;
          Count = P - FormatCurrent;
          var $tmp2 = Token;
          if ($tmp2 === " ") {
            StoreStr(FormatCurrent,Count)}
           else if ($tmp2 === "Y") {
            if (Count > 2) {
              StoreInt(Year,4)}
             else StoreInt(Year % 100,2);
          } else if ($tmp2 === "M") {
            if (isInterval && ((prevlasttoken === "H") || TimeFlag)) {
              StoreInt(Minute + ((Hour + (pas.System.Trunc(Math.abs(DateTime)) * 24)) * 60),0)}
             else if ((lastformattoken === "H") || TimeFlag) {
              if (Count === 1) {
                StoreInt(Minute,0)}
               else StoreInt(Minute,2);
            } else {
              var $tmp3 = Count;
              if ($tmp3 === 1) {
                StoreInt(Month,0)}
               else if ($tmp3 === 2) {
                StoreInt(Month,2)}
               else if ($tmp3 === 3) {
                StoreString($mod.ShortMonthNames[Month - 1])}
               else {
                StoreString($mod.LongMonthNames[Month - 1]);
              };
            };
          } else if ($tmp2 === "D") {
            var $tmp4 = Count;
            if ($tmp4 === 1) {
              StoreInt(Day,0)}
             else if ($tmp4 === 2) {
              StoreInt(Day,2)}
             else if ($tmp4 === 3) {
              StoreString($mod.ShortDayNames[DayOfWeek])}
             else if ($tmp4 === 4) {
              StoreString($mod.LongDayNames[DayOfWeek])}
             else if ($tmp4 === 5) {
              StoreFormat($mod.ShortDateFormat,Nesting + 1,false)}
             else {
              StoreFormat($mod.LongDateFormat,Nesting + 1,false);
            };
          } else if ($tmp2 === "H") {
            if (isInterval) {
              StoreInt(Hour + (pas.System.Trunc(Math.abs(DateTime)) * 24),0)}
             else if (Clock12) {
              tmp = Hour % 12;
              if (tmp === 0) tmp = 12;
              if (Count === 1) {
                StoreInt(tmp,0)}
               else StoreInt(tmp,2);
            } else {
              if (Count === 1) {
                StoreInt(Hour,0)}
               else StoreInt(Hour,2);
            }}
           else if ($tmp2 === "N") {
            if (isInterval) {
              StoreInt(Minute + ((Hour + (pas.System.Trunc(Math.abs(DateTime)) * 24)) * 60),0)}
             else if (Count === 1) {
              StoreInt(Minute,0)}
             else StoreInt(Minute,2)}
           else if ($tmp2 === "S") {
            if (isInterval) {
              StoreInt(Second + ((Minute + ((Hour + (pas.System.Trunc(Math.abs(DateTime)) * 24)) * 60)) * 60),0)}
             else if (Count === 1) {
              StoreInt(Second,0)}
             else StoreInt(Second,2)}
           else if ($tmp2 === "Z") {
            if (Count === 1) {
              StoreInt(MilliSecond,0)}
             else StoreInt(MilliSecond,3)}
           else if ($tmp2 === "T") {
            if (Count === 1) {
              StoreFormat($mod.ShortTimeFormat,Nesting + 1,true)}
             else StoreFormat($mod.LongTimeFormat,Nesting + 1,true)}
           else if ($tmp2 === "C") {
            StoreFormat($mod.ShortDateFormat,Nesting + 1,false);
            if ((Hour !== 0) || (Minute !== 0) || (Second !== 0)) {
              StoreString(" ");
              StoreFormat($mod.LongTimeFormat,Nesting + 1,true);
            };
          } else if ($tmp2 === "F") {
            StoreFormat($mod.ShortDateFormat,Nesting + 1,false);
            StoreString(" ");
            StoreFormat($mod.LongTimeFormat,Nesting + 1,true);
          };
          prevlasttoken = lastformattoken;
          lastformattoken = Token;
        } else {
          StoreString(Token);
        };
        FormatCurrent += Count;
      };
    };
    $mod.DecodeDateFully(DateTime,{get: function () {
        return Year;
      }, set: function (v) {
        Year = v;
      }},{get: function () {
        return Month;
      }, set: function (v) {
        Month = v;
      }},{get: function () {
        return Day;
      }, set: function (v) {
        Day = v;
      }},{get: function () {
        return DayOfWeek;
      }, set: function (v) {
        DayOfWeek = v;
      }});
    $mod.DecodeTime(DateTime,{get: function () {
        return Hour;
      }, set: function (v) {
        Hour = v;
      }},{get: function () {
        return Minute;
      }, set: function (v) {
        Minute = v;
      }},{get: function () {
        return Second;
      }, set: function (v) {
        Second = v;
      }},{get: function () {
        return MilliSecond;
      }, set: function (v) {
        MilliSecond = v;
      }});
    if (FormatStr !== "") {
      StoreFormat(FormatStr,0,false)}
     else StoreFormat("C",0,false);
    return Result;
  };
  this.TryStrToDate = function (S, Value) {
    var Result = false;
    Result = $mod.TryStrToDate$2(S,Value,$mod.ShortDateFormat,"\x00");
    return Result;
  };
  this.TryStrToDate$1 = function (S, Value, separator) {
    var Result = false;
    Result = $mod.TryStrToDate$2(S,Value,$mod.ShortDateFormat,separator);
    return Result;
  };
  this.TryStrToDate$2 = function (S, Value, useformat, separator) {
    var Result = false;
    var Msg = "";
    Result = S.length !== 0;
    if (Result) {
      Value.set($impl.IntStrToDate({get: function () {
          return Msg;
        }, set: function (v) {
          Msg = v;
        }},S,useformat,separator));
      Result = Msg === "";
    };
    return Result;
  };
  this.TryStrToTime = function (S, Value) {
    var Result = false;
    Result = $mod.TryStrToTime$1(S,Value,"\x00");
    return Result;
  };
  this.TryStrToTime$1 = function (S, Value, separator) {
    var Result = false;
    var Msg = "";
    Result = S.length !== 0;
    if (Result) {
      Value.set($impl.IntStrToTime({get: function () {
          return Msg;
        }, set: function (v) {
          Msg = v;
        }},S,S.length,separator));
      Result = Msg === "";
    };
    return Result;
  };
  this.TryStrToDateTime = function (S, Value) {
    var Result = false;
    var I = 0;
    var dtdate = 0.0;
    var dttime = 0.0;
    Result = false;
    I = pas.System.Pos($mod.TimeSeparator,S);
    if (I > 0) {
      while ((I > 0) && (S.charAt(I - 1) !== " ")) I -= 1;
      if (I > 0) {
        if (!$mod.TryStrToDate(pas.System.Copy(S,1,I - 1),{get: function () {
            return dtdate;
          }, set: function (v) {
            dtdate = v;
          }})) return Result;
        if (!$mod.TryStrToTime(pas.System.Copy(S,I + 1,S.length - I),{get: function () {
            return dttime;
          }, set: function (v) {
            dttime = v;
          }})) return Result;
        Value.set($mod.ComposeDateTime(dtdate,dttime));
        Result = true;
      } else Result = $mod.TryStrToTime(S,Value);
    } else Result = $mod.TryStrToDate(S,Value);
    return Result;
  };
  this.StrToDateDef = function (S, Defvalue) {
    var Result = 0.0;
    Result = $mod.StrToDateDef$1(S,Defvalue,"\x00");
    return Result;
  };
  this.StrToDateDef$1 = function (S, Defvalue, separator) {
    var Result = 0.0;
    if (!$mod.TryStrToDate$1(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},separator)) Result = Defvalue;
    return Result;
  };
  this.StrToTimeDef = function (S, Defvalue) {
    var Result = 0.0;
    Result = $mod.StrToTimeDef$1(S,Defvalue,"\x00");
    return Result;
  };
  this.StrToTimeDef$1 = function (S, Defvalue, separator) {
    var Result = 0.0;
    if (!$mod.TryStrToTime$1(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},separator)) Result = Defvalue;
    return Result;
  };
  this.StrToDateTimeDef = function (S, Defvalue) {
    var Result = 0.0;
    if (!$mod.TryStrToDateTime(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) Result = Defvalue;
    return Result;
  };
  this.CurrentYear = function () {
    var Result = 0;
    Result = (new Date()).getFullYear();
    return Result;
  };
  this.ReplaceTime = function (dati, NewTime) {
    dati.set($mod.ComposeDateTime(dati.get(),NewTime));
  };
  this.ReplaceDate = function (DateTime, NewDate) {
    var tmp = 0.0;
    tmp = NewDate;
    $mod.ReplaceTime({get: function () {
        return tmp;
      }, set: function (v) {
        tmp = v;
      }},DateTime.get());
    DateTime.set(tmp);
  };
  this.FloatToDateTime = function (Value) {
    var Result = 0.0;
    if ((Value < $mod.MinDateTime) || (Value > $mod.MaxDateTime)) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidDateTime"),[$mod.FloatToStr(Value)]]);
    Result = Value;
    return Result;
  };
  this.CurrencyFormat = 0;
  this.NegCurrFormat = 0;
  this.CurrencyDecimals = 2;
  this.CurrencyString = "$";
  this.FloattoCurr = function (Value) {
    var Result = 0;
    if (!$mod.TryFloatToCurr(Value,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidCurrency"),[$mod.FloatToStr(Value)]]);
    return Result;
  };
  this.TryFloatToCurr = function (Value, AResult) {
    var Result = false;
    Result = ((Value * 10000) >= $mod.MinCurrency) && ((Value * 10000) <= $mod.MaxCurrency);
    if (Result) AResult.set(rtl.trunc(Value * 10000));
    return Result;
  };
  this.CurrToStr = function (Value) {
    var Result = "";
    Result = $mod.FloatToStrF(Value / 10000,$mod.TFloatFormat.ffGeneral,-1,0);
    return Result;
  };
  this.StrToCurr = function (S) {
    var Result = 0;
    if (!$mod.TryStrToCurr(S,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }})) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidCurrency"),[S]]);
    return Result;
  };
  this.TryStrToCurr = function (S, Value) {
    var Result = false;
    var D = 0.0;
    Result = $mod.TryStrToFloat$1(S,{get: function () {
        return D;
      }, set: function (v) {
        D = v;
      }});
    if (Result) Value.set(rtl.trunc(D * 10000));
    return Result;
  };
  this.StrToCurrDef = function (S, Default) {
    var Result = 0;
    var R = 0;
    if ($mod.TryStrToCurr(S,{get: function () {
        return R;
      }, set: function (v) {
        R = v;
      }})) {
      Result = R}
     else Result = Default;
    return Result;
  };
  this.$rtti.$DynArray("TPathStrArray",{eltype: rtl.string});
  this.ChangeFileExt = function (FileName, Extension) {
    var Result = "";
    var i = 0;
    var EndSep = {};
    var SOF = false;
    i = FileName.length;
    EndSep = rtl.unionSet(rtl.unionSet(pas.System.AllowDirectorySeparators,pas.System.AllowDriveSeparators),rtl.createSet(pas.System.ExtensionSeparator.charCodeAt()));
    while ((i > 0) && !(FileName.charCodeAt(i - 1) in EndSep)) i -= 1;
    if ((i === 0) || (FileName.charAt(i - 1) !== pas.System.ExtensionSeparator)) {
      i = FileName.length + 1}
     else {
      SOF = (i === 1) || (FileName.charCodeAt(i - 1 - 1) in pas.System.AllowDirectorySeparators);
      if (SOF && !pas.System.FirstDotAtFileNameStartIsExtension) i = FileName.length + 1;
    };
    Result = pas.System.Copy(FileName,1,i - 1) + Extension;
    return Result;
  };
  this.ExtractFilePath = function (FileName) {
    var Result = "";
    var i = 0;
    var EndSep = {};
    i = FileName.length;
    EndSep = rtl.unionSet(pas.System.AllowDirectorySeparators,pas.System.AllowDriveSeparators);
    while ((i > 0) && !$impl.CharInSet$1(FileName.charAt(i - 1),EndSep)) i -= 1;
    if (i > 0) {
      Result = pas.System.Copy(FileName,1,i)}
     else Result = "";
    return Result;
  };
  this.ExtractFileDrive = function (FileName) {
    var Result = "";
    var i = 0;
    var l = 0;
    Result = "";
    l = FileName.length;
    if (l < 2) return Result;
    if ($impl.CharInSet$1(FileName.charAt(1),pas.System.AllowDriveSeparators)) {
      Result = pas.System.Copy(FileName,1,2)}
     else if ($impl.CharInSet$1(FileName.charAt(0),pas.System.AllowDirectorySeparators) && $impl.CharInSet$1(FileName.charAt(1),pas.System.AllowDirectorySeparators)) {
      i = 2;
      while ((i < l) && !$impl.CharInSet$1(FileName.charAt((i + 1) - 1),pas.System.AllowDirectorySeparators)) i += 1;
      i += 1;
      while ((i < l) && !$impl.CharInSet$1(FileName.charAt((i + 1) - 1),pas.System.AllowDirectorySeparators)) i += 1;
      Result = pas.System.Copy(FileName,1,i);
    };
    return Result;
  };
  this.ExtractFileName = function (FileName) {
    var Result = "";
    var i = 0;
    var EndSep = {};
    i = FileName.length;
    EndSep = rtl.unionSet(pas.System.AllowDirectorySeparators,pas.System.AllowDriveSeparators);
    while ((i > 0) && !$impl.CharInSet$1(FileName.charAt(i - 1),EndSep)) i -= 1;
    Result = pas.System.Copy(FileName,i + 1,2147483647);
    return Result;
  };
  this.ExtractFileExt = function (FileName) {
    var Result = "";
    var i = 0;
    var EndSep = {};
    var SOF = false;
    Result = "";
    i = FileName.length;
    EndSep = rtl.unionSet(rtl.unionSet(pas.System.AllowDirectorySeparators,pas.System.AllowDriveSeparators),rtl.createSet(pas.System.ExtensionSeparator.charCodeAt()));
    while ((i > 0) && !$impl.CharInSet$1(FileName.charAt(i - 1),EndSep)) i -= 1;
    if ((i > 0) && (FileName.charAt(i - 1) === pas.System.ExtensionSeparator)) {
      SOF = (i === 1) || (FileName.charCodeAt(i - 1 - 1) in pas.System.AllowDirectorySeparators);
      if (!SOF || pas.System.FirstDotAtFileNameStartIsExtension) Result = pas.System.Copy(FileName,i,2147483647);
    } else Result = "";
    return Result;
  };
  this.ExtractFileDir = function (FileName) {
    var Result = "";
    var i = 0;
    var EndSep = {};
    i = FileName.length;
    EndSep = rtl.unionSet(pas.System.AllowDirectorySeparators,pas.System.AllowDriveSeparators);
    while ((i > 0) && !$impl.CharInSet$1(FileName.charAt(i - 1),EndSep)) i -= 1;
    if ((i > 1) && $impl.CharInSet$1(FileName.charAt(i - 1),pas.System.AllowDirectorySeparators) && !$impl.CharInSet$1(FileName.charAt(i - 1 - 1),EndSep)) i -= 1;
    Result = pas.System.Copy(FileName,1,i);
    return Result;
  };
  this.ExtractRelativepath = function (BaseName, DestName) {
    var Result = "";
    var OneLevelBack = "";
    var Source = "";
    var Dest = "";
    var Sc = 0;
    var Dc = 0;
    var I = 0;
    var J = 0;
    var SD = [];
    var DD = [];
    OneLevelBack = ".." + pas.System.PathDelim;
    if ($mod.UpperCase($mod.ExtractFileDrive(BaseName)) !== $mod.UpperCase($mod.ExtractFileDrive(DestName))) {
      Result = DestName;
      return Result;
    };
    Source = $mod.ExcludeTrailingPathDelimiter($mod.ExtractFilePath(BaseName));
    Dest = $mod.ExcludeTrailingPathDelimiter($mod.ExtractFilePath(DestName));
    SD = $mod.GetDirs(Source);
    Sc = rtl.length(SD);
    DD = $mod.GetDirs(Dest);
    Dc = rtl.length(SD);
    I = 0;
    while ((I < Dc) && (I < Sc)) {
      if ($mod.SameText(DD[I],SD[I])) {
        I += 1}
       else break;
    };
    Result = "";
    for (var $l = I, $end = Sc; $l <= $end; $l++) {
      J = $l;
      Result = Result + OneLevelBack;
    };
    for (var $l1 = I, $end1 = Dc; $l1 <= $end1; $l1++) {
      J = $l1;
      Result = Result + DD[J] + pas.System.PathDelim;
    };
    Result = Result + $mod.ExtractFileName(DestName);
    return Result;
  };
  this.IncludeTrailingPathDelimiter = function (Path) {
    var Result = "";
    var l = 0;
    Result = Path;
    l = Result.length;
    if ((l === 0) || !$impl.CharInSet$1(Result.charAt(l - 1),pas.System.AllowDirectorySeparators)) Result = Result + pas.System.PathDelim;
    return Result;
  };
  this.ExcludeTrailingPathDelimiter = function (Path) {
    var Result = "";
    var L = 0;
    L = Path.length;
    if ((L > 0) && $impl.CharInSet$1(Path.charAt(L - 1),pas.System.AllowDirectorySeparators)) L -= 1;
    Result = pas.System.Copy(Path,1,L);
    return Result;
  };
  this.IncludeLeadingPathDelimiter = function (Path) {
    var Result = "";
    var l = 0;
    Result = Path;
    l = Result.length;
    if ((l === 0) || !$impl.CharInSet$1(Result.charAt(0),pas.System.AllowDirectorySeparators)) Result = pas.System.PathDelim + Result;
    return Result;
  };
  this.ExcludeLeadingPathDelimiter = function (Path) {
    var Result = "";
    var L = 0;
    Result = Path;
    L = Result.length;
    if ((L > 0) && $impl.CharInSet$1(Result.charAt(0),pas.System.AllowDirectorySeparators)) pas.System.Delete({get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},1,1);
    return Result;
  };
  this.IsPathDelimiter = function (Path, Index) {
    var Result = false;
    Result = (Index > 0) && (Index <= Path.length) && $impl.CharInSet$1(Path.charAt(Index - 1),pas.System.AllowDirectorySeparators);
    return Result;
  };
  this.SetDirSeparators = function (FileName) {
    var Result = "";
    var I = 0;
    Result = FileName;
    for (var $l = 1, $end = Result.length; $l <= $end; $l++) {
      I = $l;
      if ($impl.CharInSet$1(Result.charAt(I - 1),pas.System.AllowDirectorySeparators)) Result = rtl.setCharAt(Result,I - 1,pas.System.PathDelim);
    };
    return Result;
  };
  this.GetDirs = function (DirName) {
    var Result = [];
    var I = 0;
    var J = 0;
    var L = 0;
    var D = "";
    I = 1;
    J = 0;
    L = 0;
    Result = rtl.arraySetLength(Result,"",DirName.length);
    while (I <= DirName.length) {
      if ($impl.CharInSet$1(DirName.charAt(I - 1),pas.System.AllowDirectorySeparators)) {
        D = pas.System.Copy(DirName,J + 1,J - I);
        if (D !== "") {
          Result[L] = D;
          L += 1;
        };
        J = I;
      };
      I += 1;
    };
    Result = rtl.arraySetLength(Result,"",L);
    return Result;
  };
  this.ConcatPaths = function (Paths) {
    var Result = "";
    var I = 0;
    if (rtl.length(Paths) > 0) {
      Result = Paths[0];
      for (var $l = 1, $end = rtl.length(Paths) - 1; $l <= $end; $l++) {
        I = $l;
        Result = $mod.IncludeTrailingPathDelimiter(Result) + $mod.ExcludeLeadingPathDelimiter(Paths[I]);
      };
    } else Result = "";
    return Result;
  };
  this.GUID_NULL = pas.System.TGuid.$clone({D1: 0x00000000, D2: 0x0000, D3: 0x0000, D4: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]});
  this.Supports = function (Instance, AClass, Obj) {
    var Result = false;
    Result = (Instance !== null) && (Instance.QueryInterface(pas.System.IObjectInstance,Obj) === 0) && Obj.get().$class.InheritsFrom(AClass);
    return Result;
  };
  this.Supports$1 = function (Instance, IID, Intf) {
    var Result = false;
    Result = (Instance !== null) && (Instance.QueryInterface(IID,Intf) === 0);
    return Result;
  };
  this.Supports$2 = function (Instance, IID, Intf) {
    var Result = false;
    Result = (Instance !== null) && Instance.GetInterface(IID,Intf);
    return Result;
  };
  this.Supports$3 = function (Instance, IID, Intf) {
    var Result = false;
    Result = (Instance !== null) && Instance.GetInterfaceByStr(IID,Intf);
    return Result;
  };
  this.Supports$4 = function (Instance, AClass) {
    var Result = false;
    var Temp = null;
    Result = $mod.Supports(Instance,AClass,{get: function () {
        return Temp;
      }, set: function (v) {
        Temp = v;
      }});
    return Result;
  };
  this.Supports$5 = function (Instance, IID) {
    var Result = false;
    var Temp = null;
    try {
      Result = $mod.Supports$1(Instance,IID,{get: function () {
          return Temp;
        }, set: function (v) {
          Temp = v;
        }});
    } finally {
      rtl._Release(Temp);
    };
    return Result;
  };
  this.Supports$6 = function (Instance, IID) {
    var Result = false;
    var Temp = null;
    Result = $mod.Supports$2(Instance,IID,{get: function () {
        return Temp;
      }, set: function (v) {
        Temp = v;
      }});
    if (Temp && Temp.$kind==='com') Temp._Release();
    return Result;
  };
  this.Supports$7 = function (Instance, IID) {
    var Result = false;
    var Temp = null;
    Result = $mod.Supports$3(Instance,IID,{get: function () {
        return Temp;
      }, set: function (v) {
        Temp = v;
      }});
    if (Temp && Temp.$kind==='com') Temp._Release();
    return Result;
  };
  this.Supports$8 = function (AClass, IID) {
    var Result = false;
    var maps = undefined;
    if (AClass === null) return false;
    maps = AClass["$intfmaps"];
    if (!maps) return false;
    if (maps[$mod.GUIDToString(IID)]) return true;
    Result = false;
    return Result;
  };
  this.Supports$9 = function (AClass, IID) {
    var Result = false;
    var maps = undefined;
    if (AClass === null) return false;
    maps = AClass["$intfmaps"];
    if (!maps) return false;
    if (maps[$mod.UpperCase(IID)]) return true;
    Result = false;
    return Result;
  };
  this.TryStringToGUID = function (s, Guid) {
    var Result = false;
    var re = null;
    if (s.length !== 38) return false;
    re = new RegExp("^\\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\\}$");
    Result = re.test(s);
    if (!Result) {
      Guid.D1 = 0;
      return Result;
    };
    rtl.strToGUIDR(s,Guid);
    Result = true;
    return Result;
  };
  this.StringToGUID = function (S) {
    var Result = pas.System.TGuid.$new();
    if (!$mod.TryStringToGUID(S,Result)) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidGUID"),[S]]);
    return Result;
  };
  this.GUIDToString = function (guid) {
    var Result = "";
    Result = rtl.guidrToStr(guid);
    return Result;
  };
  this.IsEqualGUID = function (guid1, guid2) {
    var Result = false;
    var i = 0;
    if ((guid1.D1 !== guid2.D1) || (guid1.D2 !== guid2.D2) || (guid1.D3 !== guid2.D3)) return false;
    for (i = 0; i <= 7; i++) if (guid1.D4[i] !== guid2.D4[i]) return false;
    Result = true;
    return Result;
  };
  this.GuidCase = function (guid, List) {
    var Result = 0;
    for (var $l = rtl.length(List) - 1; $l >= 0; $l--) {
      Result = $l;
      if ($mod.IsEqualGUID(guid,List[Result])) return Result;
    };
    Result = -1;
    return Result;
  };
  this.CreateGUID = function (GUID) {
    var Result = 0;
    function R(B) {
      var Result = 0;
      var v = 0;
      v = pas.System.Random(256);
      while (B > 1) {
        v = (v * 256) + pas.System.Random(256);
        B -= 1;
      };
      Result = v;
      return Result;
    };
    var I = 0;
    Result = 0;
    GUID.D1 = R(4);
    GUID.D2 = R(2);
    GUID.D3 = R(2);
    for (I = 0; I <= 7; I++) GUID.D4[I] = R(1);
    return Result;
  };
  this.EncodeHTMLEntities = function (S) {
    var Result = "";
    Result = "";
    if (S === "") return Result;
    return S.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
    return Result;
  };
  this.$rtti.$DynArray("TCharArray",{eltype: rtl.char});
  this.$rtti.$Int("TByteBitIndex",{minvalue: 0, maxvalue: 7, ordtype: 1});
  this.$rtti.$Int("TShortIntBitIndex",{minvalue: 0, maxvalue: 7, ordtype: 1});
  this.$rtti.$Int("TWordBitIndex",{minvalue: 0, maxvalue: 15, ordtype: 1});
  this.$rtti.$Int("TSmallIntBitIndex",{minvalue: 0, maxvalue: 15, ordtype: 1});
  this.$rtti.$Int("TCardinalBitIndex",{minvalue: 0, maxvalue: 31, ordtype: 1});
  this.$rtti.$Int("TIntegerBitIndex",{minvalue: 0, maxvalue: 31, ordtype: 1});
  this.$rtti.$Int("TQwordBitIndex",{minvalue: 0, maxvalue: 52, ordtype: 1});
  this.$rtti.$Int("TInt64BitIndex",{minvalue: 0, maxvalue: 52, ordtype: 1});
  this.$rtti.$Int("TNativeIntBitIndex",{minvalue: 0, maxvalue: 52, ordtype: 1});
  this.$rtti.$Int("TNativeUIntBitIndex",{minvalue: 0, maxvalue: 52, ordtype: 1});
  this.CPUEndian = this.TEndian.Big;
  rtl.createHelper(this,"TGuidHelper",null,function () {
    this.Create = function (Src, BigEndian) {
      var Result = pas.System.TGuid.$new();
      Result.$assign(Src);
      if (!BigEndian) {
        Result.D1 = $mod.SwapEndian$1(Result.D1);
        Result.D2 = $mod.SwapEndian(Result.D2);
        Result.D3 = $mod.SwapEndian(Result.D3);
      };
      return Result;
    };
    this.Create$1 = function (Buf, AStartIndex, BigEndian) {
      var Result = pas.System.TGuid.$new();
      var A = 0;
      var B = 0;
      var C = 0;
      var V = null;
      V = new DataView(Buf);
      if (BigEndian) {
        A = V.getUint32(AStartIndex);
        B = V.getUint16(AStartIndex + 4);
        C = V.getUint16(AStartIndex + 6);
      } else {
        A = $mod.SwapEndian$1(V.getUint32(AStartIndex));
        B = $mod.SwapEndian(V.getUint16(AStartIndex + 4));
        C = $mod.SwapEndian(V.getUint16(AStartIndex + 6));
      };
      Result.$assign($mod.TGuidHelper.Create$7(A,B,C,V.getUint8(AStartIndex + 8),V.getUint8(AStartIndex + 9),V.getUint8(AStartIndex + 10),V.getUint8(AStartIndex + 11),V.getUint8(AStartIndex + 12),V.getUint8(AStartIndex + 13),V.getUint8(AStartIndex + 14),V.getUint8(AStartIndex + 15)));
      return Result;
    };
    this.Create$2 = function (Data, AStartIndex, BigEndian) {
      var Result = pas.System.TGuid.$new();
      var D = null;
      if ((rtl.length(Data) - AStartIndex) < 16) throw $mod.EArgumentException.$create("CreateFmt",["The length of a GUID array must be at least %d",[]]);
      D = Uint8Array.from(Data);
      Result.$assign($mod.TGuidHelper.Create$1(D.buffer,AStartIndex,BigEndian));
      return Result;
    };
    this.Create$3 = function (B, DataEndian) {
      var Result = pas.System.TGuid.$new();
      Result.$assign($mod.TGuidHelper.Create$4(B,0,DataEndian));
      return Result;
    };
    this.Create$4 = function (B, AStartIndex, DataEndian) {
      var Result = pas.System.TGuid.$new();
      if ((rtl.length(B) - AStartIndex) < 16) throw $mod.EArgumentException.$create("CreateFmt",["The length of a GUID array must be at least %d",[]]);
      Result.$assign($mod.TGuidHelper.Create$2(B,AStartIndex,DataEndian === $mod.TEndian.Big));
      return Result;
    };
    this.Create$5 = function (S) {
      var Result = pas.System.TGuid.$new();
      Result.$assign($mod.StringToGUID(S));
      return Result;
    };
    this.Create$6 = function (A, B, C, D) {
      var Result = pas.System.TGuid.$new();
      if (rtl.length(D) !== 8) throw $mod.EArgumentException.$create("CreateFmt",["The length of a GUID array must be %d",[]]);
      Result.$assign($mod.TGuidHelper.Create$7(A >>> 0,B & 65535,C & 65535,D[0],D[1],D[2],D[3],D[4],D[5],D[6],D[7]));
      return Result;
    };
    this.Create$7 = function (A, B, C, D, E, F, G, H, I, J, K) {
      var Result = pas.System.TGuid.$new();
      Result.D1 = A;
      Result.D2 = B;
      Result.D3 = C;
      Result.D4[0] = D;
      Result.D4[1] = E;
      Result.D4[2] = F;
      Result.D4[3] = G;
      Result.D4[4] = H;
      Result.D4[5] = I;
      Result.D4[6] = J;
      Result.D4[7] = K;
      return Result;
    };
    this.NewGuid = function () {
      var Result = pas.System.TGuid.$new();
      $mod.CreateGUID(Result);
      return Result;
    };
    this.ToByteArray = function (DataEndian) {
      var Result = [];
      var D = null;
      var V = null;
      var I = 0;
      D = new Uint8Array(16);
      V = new DataView(D.buffer);
      V.setUint32(0,this.D1,DataEndian === $mod.TEndian.Little);
      V.setUint16(4,this.D2,DataEndian === $mod.TEndian.Little);
      V.setUint16(6,this.D3,DataEndian === $mod.TEndian.Little);
      for (I = 0; I <= 7; I++) V.setUint8(8 + I,this.D4[I]);
      Result = rtl.arraySetLength(Result,0,16);
      for (I = 0; I <= 15; I++) Result[I] = V.getUint8(I);
      return Result;
    };
    this.ToString = function (SkipBrackets) {
      var Result = "";
      Result = $mod.GUIDToString(this);
      if (SkipBrackets) Result = pas.System.Copy(Result,2,Result.length - 2);
      return Result;
    };
  });
  this.TStringSplitOptions = {"0": "None", None: 0, "1": "ExcludeEmpty", ExcludeEmpty: 1};
  this.$rtti.$Enum("TStringSplitOptions",{minvalue: 0, maxvalue: 1, ordtype: 1, enumtype: this.TStringSplitOptions});
  rtl.createHelper(this,"TStringHelper",null,function () {
    this.Empty = "";
    this.GetChar = function (AIndex) {
      var Result = "";
      Result = this.get().charAt((AIndex + 1) - 1);
      return Result;
    };
    this.GetLength = function () {
      var Result = 0;
      Result = this.get().length;
      return Result;
    };
    this.Compare = function (A, B) {
      var Result = 0;
      Result = $mod.TStringHelper.Compare$5(A,0,B,0,B.length,{});
      return Result;
    };
    this.Compare$1 = function (A, B, IgnoreCase) {
      var Result = 0;
      if (IgnoreCase) {
        Result = $mod.TStringHelper.Compare$2(A,B,rtl.createSet(pas.System.TCompareOption.coIgnoreCase))}
       else Result = $mod.TStringHelper.Compare$2(A,B,{});
      return Result;
    };
    this.Compare$2 = function (A, B, Options) {
      var Result = 0;
      Result = $mod.TStringHelper.Compare$5(A,0,B,0,B.length,rtl.refSet(Options));
      return Result;
    };
    this.Compare$3 = function (A, IndexA, B, IndexB, ALen) {
      var Result = 0;
      Result = $mod.TStringHelper.Compare$5(A,IndexA,B,IndexB,ALen,{});
      return Result;
    };
    this.Compare$4 = function (A, IndexA, B, IndexB, ALen, IgnoreCase) {
      var Result = 0;
      if (IgnoreCase) {
        Result = $mod.TStringHelper.Compare$5(A,IndexA,B,IndexB,ALen,rtl.createSet(pas.System.TCompareOption.coIgnoreCase))}
       else Result = $mod.TStringHelper.Compare$5(A,IndexA,B,IndexB,ALen,{});
      return Result;
    };
    this.Compare$5 = function (A, IndexA, B, IndexB, ALen, Options) {
      var Result = 0;
      var AL = "";
      var BL = "";
      AL = pas.System.Copy(A,IndexA + 1,ALen);
      BL = pas.System.Copy(B,IndexB + 1,ALen);
      if (pas.System.TCompareOption.coIgnoreCase in Options) {
        Result = $mod.TStringHelper.UpperCase(AL).localeCompare($mod.TStringHelper.UpperCase(BL))}
       else Result = AL.localeCompare(BL);
      return Result;
    };
    this.CompareOrdinal = function (A, B) {
      var Result = 0;
      var L = 0;
      L = B.length;
      if (L > A.length) L = A.length;
      Result = $mod.TStringHelper.CompareOrdinal$1(A,0,B,0,L);
      return Result;
    };
    this.CompareOrdinal$1 = function (A, IndexA, B, IndexB, ALen) {
      var Result = 0;
      var I = 0;
      var M = 0;
      M = A.length - IndexA;
      if (M > (B.length - IndexB)) M = B.length - IndexB;
      if (M > ALen) M = ALen;
      I = 0;
      Result = 0;
      while ((Result === 0) && (I < M)) {
        Result = A.charCodeAt(IndexA + I) - B.charCodeAt(IndexB + I);
        I += 1;
      };
      return Result;
    };
    this.CompareText = function (A, B) {
      var Result = 0;
      Result = $mod.CompareText(A,B);
      return Result;
    };
    this.Copy = function (Str) {
      var Result = "";
      Result = Str;
      return Result;
    };
    this.Create = function (AChar, ACount) {
      var Result = "";
      Result = pas.System.StringOfChar(AChar,ACount);
      return Result;
    };
    this.Create$1 = function (AValue) {
      var Result = "";
      Result = $mod.TStringHelper.Create$2(AValue,0,rtl.length(AValue));
      return Result;
    };
    this.Create$2 = function (AValue, StartIndex, ALen) {
      var Result = "";
      var I = 0;
      Result = rtl.strSetLength(Result,ALen);
      for (var $l = 1, $end = ALen; $l <= $end; $l++) {
        I = $l;
        Result = rtl.setCharAt(Result,I - 1,AValue[(StartIndex + I) - 1]);
      };
      return Result;
    };
    this.EndsText = function (ASubText, AText) {
      var Result = false;
      Result = (ASubText !== "") && ($mod.CompareText(pas.System.Copy(AText,(AText.length - ASubText.length) + 1,ASubText.length),ASubText) === 0);
      return Result;
    };
    this.Equals = function (a, b) {
      var Result = false;
      Result = a === b;
      return Result;
    };
    this.Format = function (AFormat, args) {
      var Result = "";
      Result = $mod.Format(AFormat,args);
      return Result;
    };
    this.IsNullOrEmpty = function (AValue) {
      var Result = false;
      Result = AValue.length === 0;
      return Result;
    };
    this.IsNullOrWhiteSpace = function (AValue) {
      var Result = false;
      Result = $mod.Trim(AValue).length === 0;
      return Result;
    };
    this.Join = function (Separator, Values) {
      var Result = "";
      Result = Values.join(Separator);
      return Result;
    };
    this.Join$1 = function (Separator, Values) {
      var Result = "";
      Result = Values.join(Separator);
      return Result;
    };
    this.Join$2 = function (Separator, Values, StartIndex, ACount) {
      var Result = "";
      var VLen = 0;
      VLen = rtl.length(Values) - 1;
      if ((ACount < 0) || ((StartIndex > 0) && (StartIndex > VLen))) throw $mod.ERangeError.$create("Create$1",[rtl.getResStr(pas.RTLConsts,"SRangeError")]);
      if ((ACount === 0) || (VLen < 0)) {
        Result = ""}
       else Result = Values.slice(StartIndex,StartIndex + ACount).join(Separator);
      return Result;
    };
    this.LowerCase = function (S) {
      var Result = "";
      Result = $mod.LowerCase(S);
      return Result;
    };
    this.Parse = function (AValue) {
      var Result = "";
      Result = $mod.BoolToStr(AValue,false);
      return Result;
    };
    this.Parse$1 = function (AValue) {
      var Result = "";
      Result = $mod.FloatToStr(AValue);
      return Result;
    };
    this.Parse$2 = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.Parse$3 = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.ToBoolean = function (S) {
      var Result = false;
      Result = $mod.StrToBool(S);
      return Result;
    };
    this.ToDouble = function (S) {
      var Result = 0.0;
      Result = $mod.StrToFloat(S);
      return Result;
    };
    this.ToExtended = function (S) {
      var Result = 0.0;
      Result = $mod.StrToFloat(S);
      return Result;
    };
    this.ToNativeInt = function (S) {
      var Result = 0;
      Result = $mod.StrToInt64(S);
      return Result;
    };
    this.ToInteger = function (S) {
      var Result = 0;
      Result = $mod.StrToInt(S);
      return Result;
    };
    this.UpperCase = function (S) {
      var Result = "";
      Result = $mod.UpperCase(S);
      return Result;
    };
    this.ToCharArray = function (S) {
      var Result = [];
      var I = 0;
      var Len = 0;
      Len = S.length;
      Result = rtl.arraySetLength(Result,"",Len);
      for (var $l = 1, $end = Len; $l <= $end; $l++) {
        I = $l;
        Result[I - 1] = S.charAt(I - 1);
      };
      return Result;
    };
    this.CompareTo = function (B) {
      var Result = 0;
      Result = $mod.TStringHelper.Compare(this.get(),B);
      return Result;
    };
    this.Contains = function (AValue) {
      var Result = false;
      Result = (AValue !== "") && (pas.System.Pos(AValue,this.get()) > 0);
      return Result;
    };
    this.CountChar = function (C) {
      var Result = 0;
      var S = "";
      Result = 0;
      for (var $in = this.get(), $l = 0, $end = $in.length - 1; $l <= $end; $l++) {
        S = $in.charAt($l);
        if (S === C) Result += 1;
      };
      return Result;
    };
    this.DeQuotedString = function () {
      var Result = "";
      Result = $mod.TStringHelper.DeQuotedString$1.call(this,"'");
      return Result;
    };
    this.DeQuotedString$1 = function (AQuoteChar) {
      var Result = "";
      var L = 0;
      var I = 0;
      var Res = [];
      var PS = 0;
      var PD = 0;
      var IsQuote = false;
      L = this.get().length;
      if ((L < 2) || !((this.get().charAt(0) === AQuoteChar) && (this.get().charAt(L - 1) === AQuoteChar))) return this.get();
      Res = rtl.arraySetLength(Res,"",L);
      IsQuote = false;
      PS = 2;
      PD = 1;
      for (var $l = 2, $end = L - 1; $l <= $end; $l++) {
        I = $l;
        if (this.get().charAt(PS - 1) === AQuoteChar) {
          IsQuote = !IsQuote;
          if (!IsQuote) {
            Result = rtl.setCharAt(Result,PD - 1,this.get().charAt(PS - 1));
            PD += 1;
          };
        } else {
          if (IsQuote) IsQuote = false;
          Result = rtl.setCharAt(Result,PD - 1,this.get().charAt(PS - 1));
          PD += 1;
        };
        PS += 1;
      };
      Result = rtl.strSetLength(Result,PD - 1);
      return Result;
    };
    this.EndsWith = function (AValue) {
      var Result = false;
      Result = $mod.TStringHelper.EndsWith$1.call(this,AValue,false);
      return Result;
    };
    this.EndsWith$1 = function (AValue, IgnoreCase) {
      var Result = false;
      var L = 0;
      var S = "";
      L = AValue.length;
      Result = L === 0;
      if (!Result) {
        S = pas.System.Copy(this.get(),($mod.TStringHelper.GetLength.call(this) - L) + 1,L);
        Result = S.length === L;
        if (Result) if (IgnoreCase) {
          Result = $mod.TStringHelper.CompareText(S,AValue) === 0}
         else Result = S === AValue;
      };
      return Result;
    };
    this.Equals$1 = function (AValue) {
      var Result = false;
      Result = this.get() === AValue;
      return Result;
    };
    this.Format$1 = function (args) {
      var Result = "";
      Result = $mod.Format(this.get(),args);
      return Result;
    };
    this.GetHashCode = function () {
      var Result = 0;
      var P = 0;
      var pmax = 0;
      var L = null;
      L = this.get();
      Result = 0;
      P = 1;
      pmax = $mod.TStringHelper.GetLength.call(this) + 1;
      while (P < pmax) {
        Result = rtl.xor(((Result << 5) - Result) >>> 0,L.charCodeAt(P));
        P += 1;
      };
      return Result;
    };
    this.IndexOf = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOf$4.call(this,AValue,0,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOf$1 = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOf$5.call(this,AValue,0,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOf$2 = function (AValue, StartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOf$4.call(this,AValue,StartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOf$3 = function (AValue, StartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOf$5.call(this,AValue,StartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOf$4 = function (AValue, StartIndex, ACount) {
      var Result = 0;
      var S = "";
      S = pas.System.Copy(this.get(),StartIndex + 1,ACount);
      Result = pas.System.Pos(AValue,S) - 1;
      if (Result !== -1) Result = Result + StartIndex;
      return Result;
    };
    this.IndexOf$5 = function (AValue, StartIndex, ACount) {
      var Result = 0;
      var S = "";
      S = pas.System.Copy(this.get(),StartIndex + 1,ACount);
      Result = pas.System.Pos(AValue,S) - 1;
      if (Result !== -1) Result = Result + StartIndex;
      return Result;
    };
    this.IndexOfUnQuoted = function (AValue, StartQuote, EndQuote, StartIndex) {
      var $Self = this;
      var Result = 0;
      var LV = 0;
      var S = "";
      function MatchAt(I) {
        var Result = false;
        var J = 0;
        J = 1;
        do {
          Result = S.charAt((I + J) - 1 - 1) === AValue.charAt(J - 1);
          J += 1;
        } while (!(!Result || (J > LV)));
        return Result;
      };
      var I = 0;
      var L = 0;
      var Q = 0;
      S = $Self.get();
      Result = -1;
      LV = AValue.length;
      L = ($mod.TStringHelper.GetLength.call($Self) - LV) + 1;
      if (L < 0) L = 0;
      I = StartIndex + 1;
      Q = 0;
      if (StartQuote === EndQuote) {
        while ((Result === -1) && (I <= L)) {
          if (S.charAt(I - 1) === StartQuote) Q = 1 - Q;
          if ((Q === 0) && MatchAt(I)) Result = I - 1;
          I += 1;
        };
      } else {
        while ((Result === -1) && (I <= L)) {
          if (S.charAt(I - 1) === StartQuote) {
            Q += 1}
           else if ((S.charAt(I - 1) === EndQuote) && (Q > 0)) Q -= 1;
          if ((Q === 0) && MatchAt(I)) Result = I - 1;
          I += 1;
        };
      };
      return Result;
    };
    this.IndexOfAny = function (AnyOf) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$1.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return AnyOf;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}));
      return Result;
    };
    this.IndexOfAny$1 = function (AnyOf) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$5.call(this,AnyOf,0,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOfAny$2 = function (AnyOf, StartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$3.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return AnyOf;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),StartIndex);
      return Result;
    };
    this.IndexOfAny$3 = function (AnyOf, StartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$5.call(this,AnyOf,StartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOfAny$4 = function (AnyOf, StartIndex, ACount) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$5.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return AnyOf;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),StartIndex,ACount);
      return Result;
    };
    this.IndexOfAny$5 = function (AnyOf, StartIndex, ACount) {
      var Result = 0;
      var i = 0;
      var L = 0;
      i = StartIndex + 1;
      L = (i + ACount) - 1;
      if (L > $mod.TStringHelper.GetLength.call(this)) L = $mod.TStringHelper.GetLength.call(this);
      Result = -1;
      while ((Result === -1) && (i <= L)) {
        if ($impl.HaveChar(this.get().charAt(i - 1),AnyOf)) Result = i - 1;
        i += 1;
      };
      return Result;
    };
    this.IndexOfAny$6 = function (AnyOf) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$8.call(this,AnyOf,0,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOfAny$7 = function (AnyOf, StartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAny$8.call(this,AnyOf,StartIndex,$mod.TStringHelper.GetLength.call(this) - StartIndex);
      return Result;
    };
    this.IndexOfAny$8 = function (AnyOf, StartIndex, ACount) {
      var Result = 0;
      var M = 0;
      Result = $mod.TStringHelper.IndexOfAny$9.call(this,AnyOf,StartIndex,ACount,{get: function () {
          return M;
        }, set: function (v) {
          M = v;
        }});
      return Result;
    };
    this.IndexOfAny$9 = function (AnyOf, StartIndex, ACount, AMatch) {
      var Result = 0;
      var L = 0;
      var I = 0;
      Result = -1;
      for (var $l = 0, $end = rtl.length(AnyOf) - 1; $l <= $end; $l++) {
        I = $l;
        L = $mod.TStringHelper.IndexOf$5.call(this,AnyOf[I],StartIndex,ACount);
        if ((L >= 0) && ((Result === -1) || (L < Result))) {
          Result = L;
          AMatch.set(I);
        };
      };
      return Result;
    };
    this.IndexOfAnyUnquoted = function (AnyOf, StartQuote, EndQuote) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAnyUnquoted$2.call(this,AnyOf,StartQuote,EndQuote,0,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOfAnyUnquoted$1 = function (AnyOf, StartQuote, EndQuote, StartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOfAnyUnquoted$2.call(this,AnyOf,StartQuote,EndQuote,StartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.IndexOfAnyUnquoted$2 = function (AnyOf, StartQuote, EndQuote, StartIndex, ACount) {
      var Result = 0;
      var I = 0;
      var L = 0;
      var Q = 0;
      Result = -1;
      L = (StartIndex + ACount) - 1;
      if (L > $mod.TStringHelper.GetLength.call(this)) L = $mod.TStringHelper.GetLength.call(this);
      I = StartIndex + 1;
      Q = 0;
      if (StartQuote === EndQuote) {
        while ((Result === -1) && (I <= L)) {
          if (this.get().charAt(I - 1) === StartQuote) Q = 1 - Q;
          if ((Q === 0) && $impl.HaveChar(this.get().charAt(I - 1),AnyOf)) Result = I - 1;
          I += 1;
        };
      } else {
        while ((Result === -1) && (I <= L)) {
          if (this.get().charAt(I - 1) === StartQuote) {
            Q += 1}
           else if ((this.get().charAt(I - 1) === EndQuote) && (Q > 0)) Q -= 1;
          if ((Q === 0) && $impl.HaveChar(this.get().charAt(I - 1),AnyOf)) Result = I - 1;
          I += 1;
        };
      };
      return Result;
    };
    this.IndexOfAnyUnquoted$3 = function (AnyOf, StartQuote, EndQuote, StartIndex, Matched) {
      var Result = 0;
      var L = 0;
      var I = 0;
      Result = -1;
      for (var $l = 0, $end = rtl.length(AnyOf) - 1; $l <= $end; $l++) {
        I = $l;
        L = $mod.TStringHelper.IndexOfUnQuoted.call(this,AnyOf[I],StartQuote,EndQuote,StartIndex);
        if ((L >= 0) && ((Result === -1) || (L < Result))) {
          Result = L;
          Matched.set(I);
        };
      };
      return Result;
    };
    this.Insert = function (StartIndex, AValue) {
      var Result = "";
      pas.System.Insert(AValue,this,StartIndex + 1);
      Result = this.get();
      return Result;
    };
    this.IsDelimiter = function (Delimiters, Index) {
      var Result = false;
      Result = $mod.IsDelimiter(Delimiters,this.get(),Index + 1);
      return Result;
    };
    this.IsEmpty = function () {
      var Result = false;
      Result = $mod.TStringHelper.GetLength.call(this) === 0;
      return Result;
    };
    this.LastDelimiter = function (Delims) {
      var Result = 0;
      Result = $mod.LastDelimiter(Delims,this.get()) - 1;
      return Result;
    };
    this.LastIndexOf = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.LastIndexOf$4.call(this,AValue,$mod.TStringHelper.GetLength.call(this) - 1,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.LastIndexOf$1 = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.LastIndexOf$5.call(this,AValue,$mod.TStringHelper.GetLength.call(this) - 1,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.LastIndexOf$2 = function (AValue, AStartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.LastIndexOf$4.call(this,AValue,AStartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.LastIndexOf$3 = function (AValue, AStartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.LastIndexOf$5.call(this,AValue,AStartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.LastIndexOf$4 = function (AValue, AStartIndex, ACount) {
      var Result = 0;
      var Min = 0;
      Result = AStartIndex + 1;
      Min = (Result - ACount) + 1;
      if (Min < 1) Min = 1;
      while ((Result >= Min) && (this.get().charAt(Result - 1) !== AValue)) Result -= 1;
      if (Result < Min) {
        Result = -1}
       else Result = Result - 1;
      return Result;
    };
    this.LastIndexOf$5 = function (AValue, AStartIndex, ACount) {
      var Result = 0;
      Result = this.get().lastIndexOf(AValue,AStartIndex);
      if ((AStartIndex - Result) > ACount) Result = -1;
      return Result;
    };
    this.LastIndexOfAny = function (AnyOf) {
      var Result = 0;
      Result = $mod.TStringHelper.LastIndexOfAny$2.call(this,AnyOf,$mod.TStringHelper.GetLength.call(this) - 1,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.LastIndexOfAny$1 = function (AnyOf, AStartIndex) {
      var Result = 0;
      Result = $mod.TStringHelper.LastIndexOfAny$2.call(this,AnyOf,AStartIndex,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.LastIndexOfAny$2 = function (AnyOf, AStartIndex, ACount) {
      var Result = 0;
      var Min = 0;
      Result = AStartIndex + 1;
      Min = (Result - ACount) + 1;
      if (Min < 1) Min = 1;
      while ((Result >= Min) && !$impl.HaveChar(this.get().charAt(Result - 1),AnyOf)) Result -= 1;
      if (Result < Min) {
        Result = -1}
       else Result = Result - 1;
      return Result;
    };
    this.PadLeft = function (ATotalWidth) {
      var Result = "";
      Result = $mod.TStringHelper.PadLeft$1.call(this,ATotalWidth," ");
      return Result;
    };
    this.PadLeft$1 = function (ATotalWidth, PaddingChar) {
      var Result = "";
      var L = 0;
      Result = this.get();
      L = ATotalWidth - $mod.TStringHelper.GetLength.call(this);
      if (L > 0) Result = pas.System.StringOfChar(PaddingChar,L) + Result;
      return Result;
    };
    this.PadRight = function (ATotalWidth) {
      var Result = "";
      Result = $mod.TStringHelper.PadRight$1.call(this,ATotalWidth," ");
      return Result;
    };
    this.PadRight$1 = function (ATotalWidth, PaddingChar) {
      var Result = "";
      var L = 0;
      Result = this.get();
      L = ATotalWidth - $mod.TStringHelper.GetLength.call(this);
      if (L > 0) Result = Result + pas.System.StringOfChar(PaddingChar,L);
      return Result;
    };
    this.QuotedString = function () {
      var Result = "";
      Result = $mod.QuotedStr(this.get(),"'");
      return Result;
    };
    this.QuotedString$1 = function (AQuoteChar) {
      var Result = "";
      Result = $mod.QuotedStr(this.get(),AQuoteChar);
      return Result;
    };
    this.Remove = function (StartIndex) {
      var Result = "";
      Result = $mod.TStringHelper.Remove$1.call(this,StartIndex,$mod.TStringHelper.GetLength.call(this) - StartIndex);
      return Result;
    };
    this.Remove$1 = function (StartIndex, ACount) {
      var Result = "";
      Result = this.get();
      pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},StartIndex + 1,ACount);
      return Result;
    };
    this.Replace = function (OldChar, NewChar) {
      var Result = "";
      Result = $mod.TStringHelper.Replace$1.call(this,OldChar,NewChar,rtl.createSet($mod.TStringReplaceFlag.rfReplaceAll));
      return Result;
    };
    this.Replace$1 = function (OldChar, NewChar, ReplaceFlags) {
      var Result = "";
      Result = $mod.StringReplace(this.get(),OldChar,NewChar,rtl.refSet(ReplaceFlags));
      return Result;
    };
    this.Replace$2 = function (OldValue, NewValue) {
      var Result = "";
      Result = $mod.TStringHelper.Replace$3.call(this,OldValue,NewValue,rtl.createSet($mod.TStringReplaceFlag.rfReplaceAll));
      return Result;
    };
    this.Replace$3 = function (OldValue, NewValue, ReplaceFlags) {
      var Result = "";
      Result = $mod.StringReplace(this.get(),OldValue,NewValue,rtl.refSet(ReplaceFlags));
      return Result;
    };
    this.Split = function (Separators) {
      var Result = [];
      Result = $mod.TStringHelper.Split$1.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}));
      return Result;
    };
    this.Split$1 = function (Separators) {
      var Result = [];
      Result = $mod.TStringHelper.Split$21.call(this,Separators,"\x00","\x00",$mod.TStringHelper.GetLength.call(this) + 1,$mod.TStringSplitOptions.None);
      return Result;
    };
    this.Split$2 = function (Separators, ACount) {
      var Result = [];
      Result = $mod.TStringHelper.Split$3.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),ACount);
      return Result;
    };
    this.Split$3 = function (Separators, ACount) {
      var Result = [];
      Result = $mod.TStringHelper.Split$21.call(this,Separators,"\x00","\x00",ACount,$mod.TStringSplitOptions.None);
      return Result;
    };
    this.Split$4 = function (Separators, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$5.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),Options);
      return Result;
    };
    this.Split$5 = function (Separators, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$7.call(this,Separators,$mod.TStringHelper.GetLength.call(this) + 1,Options);
      return Result;
    };
    this.Split$6 = function (Separators, ACount, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$7.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),ACount,Options);
      return Result;
    };
    this.Split$7 = function (Separators, ACount, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$21.call(this,Separators,"\x00","\x00",ACount,Options);
      return Result;
    };
    this.Split$8 = function (Separators) {
      var Result = [];
      Result = $mod.TStringHelper.Split$9.call(this,Separators,$mod.TStringHelper.GetLength.call(this) + 1);
      return Result;
    };
    this.Split$9 = function (Separators, ACount) {
      var Result = [];
      Result = $mod.TStringHelper.Split$11.call(this,Separators,ACount,$mod.TStringSplitOptions.None);
      return Result;
    };
    this.Split$10 = function (Separators, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$11.call(this,Separators,$mod.TStringHelper.GetLength.call(this) + 1,Options);
      return Result;
    };
    this.Split$11 = function (Separators, ACount, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$26.call(this,Separators,"\x00","\x00",ACount,Options);
      return Result;
    };
    this.Split$12 = function (Separators, AQuote) {
      var Result = [];
      Result = $mod.TStringHelper.Split$13.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),AQuote);
      return Result;
    };
    this.Split$13 = function (Separators, AQuote) {
      var Result = [];
      Result = $mod.TStringHelper.Split$15.call(this,Separators,AQuote,AQuote);
      return Result;
    };
    this.Split$14 = function (Separators, AQuoteStart, AQuoteEnd) {
      var Result = [];
      Result = $mod.TStringHelper.Split$15.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),AQuoteStart,AQuoteEnd);
      return Result;
    };
    this.Split$15 = function (Separators, AQuoteStart, AQuoteEnd) {
      var Result = [];
      Result = $mod.TStringHelper.Split$17.call(this,Separators,AQuoteStart,AQuoteEnd,$mod.TStringSplitOptions.None);
      return Result;
    };
    this.Split$16 = function (Separators, AQuoteStart, AQuoteEnd, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$17.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),AQuoteStart,AQuoteEnd,Options);
      return Result;
    };
    this.Split$17 = function (Separators, AQuoteStart, AQuoteEnd, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$21.call(this,Separators,AQuoteStart,AQuoteEnd,$mod.TStringHelper.GetLength.call(this) + 1,Options);
      return Result;
    };
    this.Split$18 = function (Separators, AQuoteStart, AQuoteEnd, ACount) {
      var Result = [];
      Result = $mod.TStringHelper.Split$19.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),AQuoteStart,AQuoteEnd,ACount);
      return Result;
    };
    this.Split$19 = function (Separators, AQuoteStart, AQuoteEnd, ACount) {
      var Result = [];
      Result = $mod.TStringHelper.Split$21.call(this,Separators,AQuoteStart,AQuoteEnd,ACount,$mod.TStringSplitOptions.None);
      return Result;
    };
    this.Split$20 = function (Separators, AQuoteStart, AQuoteEnd, ACount, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$21.call(this,$mod.TStringHelper.ToCharArray$1.call({get: function () {
          return Separators;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}),AQuoteStart,AQuoteEnd,ACount,Options);
      return Result;
    };
    var BlockSize = 10;
    this.Split$21 = function (Separators, AQuoteStart, AQuoteEnd, ACount, Options) {
      var $Self = this;
      var Result = [];
      var S = "";
      function NextSep(StartIndex) {
        var Result = 0;
        if (AQuoteStart !== "\x00") {
          Result = $mod.TStringHelper.IndexOfAnyUnquoted$1.call({get: function () {
              return S;
            }, set: function (v) {
              S = v;
            }},Separators,AQuoteStart,AQuoteEnd,StartIndex)}
         else Result = $mod.TStringHelper.IndexOfAny$3.call({get: function () {
            return S;
          }, set: function (v) {
            S = v;
          }},Separators,StartIndex);
        return Result;
      };
      function MaybeGrow(Curlen) {
        if (rtl.length(Result) <= Curlen) Result = rtl.arraySetLength(Result,"",rtl.length(Result) + 10);
      };
      var Sep = 0;
      var LastSep = 0;
      var Len = 0;
      var T = "";
      S = $Self.get();
      Result = rtl.arraySetLength(Result,"",10);
      Len = 0;
      LastSep = 0;
      Sep = NextSep(0);
      while ((Sep !== -1) && ((ACount === 0) || (Len < ACount))) {
        T = $mod.TStringHelper.Substring$1.call($Self,LastSep,Sep - LastSep);
        if ((T !== "") || !($mod.TStringSplitOptions.ExcludeEmpty === Options)) {
          MaybeGrow(Len);
          Result[Len] = T;
          Len += 1;
        };
        LastSep = Sep + 1;
        Sep = NextSep(LastSep);
      };
      if ((LastSep <= $mod.TStringHelper.GetLength.call($Self)) && ((ACount === 0) || (Len < ACount))) {
        T = $mod.TStringHelper.Substring.call($Self,LastSep);
        if ((T !== "") || !($mod.TStringSplitOptions.ExcludeEmpty === Options)) {
          MaybeGrow(Len);
          Result[Len] = T;
          Len += 1;
        };
      };
      Result = rtl.arraySetLength(Result,"",Len);
      return Result;
    };
    this.Split$22 = function (Separators, AQuote) {
      var Result = [];
      Result = $mod.TStringHelper.Split$23.call(this,Separators,AQuote,AQuote);
      return Result;
    };
    this.Split$23 = function (Separators, AQuoteStart, AQuoteEnd) {
      var Result = [];
      Result = $mod.TStringHelper.Split$26.call(this,Separators,AQuoteStart,AQuoteEnd,$mod.TStringHelper.GetLength.call(this) + 1,$mod.TStringSplitOptions.None);
      return Result;
    };
    this.Split$24 = function (Separators, AQuoteStart, AQuoteEnd, Options) {
      var Result = [];
      Result = $mod.TStringHelper.Split$26.call(this,Separators,AQuoteStart,AQuoteEnd,$mod.TStringHelper.GetLength.call(this) + 1,Options);
      return Result;
    };
    this.Split$25 = function (Separators, AQuoteStart, AQuoteEnd, ACount) {
      var Result = [];
      Result = $mod.TStringHelper.Split$26.call(this,Separators,AQuoteStart,AQuoteEnd,ACount,$mod.TStringSplitOptions.None);
      return Result;
    };
    var BlockSize$1 = 10;
    this.Split$26 = function (Separators, AQuoteStart, AQuoteEnd, ACount, Options) {
      var $Self = this;
      var Result = [];
      var S = "";
      function NextSep(StartIndex, Match) {
        var Result = 0;
        if (AQuoteStart !== "\x00") {
          Result = $mod.TStringHelper.IndexOfAnyUnquoted$3.call({get: function () {
              return S;
            }, set: function (v) {
              S = v;
            }},Separators,AQuoteStart,AQuoteEnd,StartIndex,Match)}
         else Result = $mod.TStringHelper.IndexOfAny$9.call({get: function () {
            return S;
          }, set: function (v) {
            S = v;
          }},Separators,StartIndex,$mod.TStringHelper.GetLength.call($Self),Match);
        return Result;
      };
      function MaybeGrow(Curlen) {
        if (rtl.length(Result) <= Curlen) Result = rtl.arraySetLength(Result,"",rtl.length(Result) + 10);
      };
      var Sep = 0;
      var LastSep = 0;
      var Len = 0;
      var Match = 0;
      var T = "";
      S = $Self.get();
      Result = rtl.arraySetLength(Result,"",10);
      Len = 0;
      LastSep = 0;
      Sep = NextSep(0,{get: function () {
          return Match;
        }, set: function (v) {
          Match = v;
        }});
      while ((Sep !== -1) && ((ACount === 0) || (Len < ACount))) {
        T = $mod.TStringHelper.Substring$1.call($Self,LastSep,Sep - LastSep);
        if ((T !== "") || !($mod.TStringSplitOptions.ExcludeEmpty === Options)) {
          MaybeGrow(Len);
          Result[Len] = T;
          Len += 1;
        };
        LastSep = Sep + Separators[Match].length;
        Sep = NextSep(LastSep,{get: function () {
            return Match;
          }, set: function (v) {
            Match = v;
          }});
      };
      if ((LastSep <= $mod.TStringHelper.GetLength.call($Self)) && ((ACount === 0) || (Len < ACount))) {
        T = $mod.TStringHelper.Substring.call($Self,LastSep);
        if ((T !== "") || !($mod.TStringSplitOptions.ExcludeEmpty === Options)) {
          MaybeGrow(Len);
          Result[Len] = T;
          Len += 1;
        };
      };
      Result = rtl.arraySetLength(Result,"",Len);
      return Result;
    };
    this.StartsWith = function (AValue) {
      var Result = false;
      Result = $mod.TStringHelper.StartsWith$1.call(this,AValue,false);
      return Result;
    };
    this.StartsWith$1 = function (AValue, IgnoreCase) {
      var Result = false;
      var L = 0;
      var S = "";
      L = AValue.length;
      Result = L <= 0;
      if (!Result) {
        S = pas.System.Copy(this.get(),1,L);
        Result = S.length === L;
        if (Result) if (IgnoreCase) {
          Result = $mod.SameText(S,AValue)}
         else Result = $mod.SameStr(S,AValue);
      };
      return Result;
    };
    this.Substring = function (AStartIndex) {
      var Result = "";
      Result = $mod.TStringHelper.Substring$1.call(this,AStartIndex,$mod.TStringHelper.GetLength.call(this) - AStartIndex);
      return Result;
    };
    this.Substring$1 = function (AStartIndex, ALen) {
      var Result = "";
      Result = pas.System.Copy(this.get(),AStartIndex + 1,ALen);
      return Result;
    };
    this.ToBoolean$1 = function () {
      var Result = false;
      Result = $mod.StrToBool(this.get());
      return Result;
    };
    this.ToInteger$1 = function () {
      var Result = 0;
      Result = $mod.StrToInt(this.get());
      return Result;
    };
    this.ToNativeInt$1 = function () {
      var Result = 0;
      Result = $mod.StrToNativeInt(this.get());
      return Result;
    };
    this.ToDouble$1 = function () {
      var Result = 0.0;
      Result = $mod.StrToFloat(this.get());
      return Result;
    };
    this.ToExtended$1 = function () {
      var Result = 0.0;
      Result = $mod.StrToFloat(this.get());
      return Result;
    };
    this.ToCharArray$1 = function () {
      var Result = [];
      Result = $mod.TStringHelper.ToCharArray$2.call(this,0,$mod.TStringHelper.GetLength.call(this));
      return Result;
    };
    this.ToCharArray$2 = function (AStartIndex, ALen) {
      var Result = [];
      var I = 0;
      Result = rtl.arraySetLength(Result,"",ALen);
      for (var $l = 0, $end = ALen - 1; $l <= $end; $l++) {
        I = $l;
        Result[I] = this.get().charAt((AStartIndex + I + 1) - 1);
      };
      return Result;
    };
    this.ToLower = function () {
      var Result = "";
      Result = $mod.TStringHelper.LowerCase(this.get());
      return Result;
    };
    this.ToLowerInvariant = function () {
      var Result = "";
      Result = $mod.TStringHelper.LowerCase(this.get());
      return Result;
    };
    this.ToUpper = function () {
      var Result = "";
      Result = $mod.TStringHelper.UpperCase(this.get());
      return Result;
    };
    this.ToUpperInvariant = function () {
      var Result = "";
      Result = $mod.TStringHelper.UpperCase(this.get());
      return Result;
    };
    this.Trim = function () {
      var Result = "";
      Result = $mod.Trim(this.get());
      return Result;
    };
    this.TrimLeft = function () {
      var Result = "";
      Result = $mod.TrimLeft(this.get());
      return Result;
    };
    this.TrimRight = function () {
      var Result = "";
      Result = $mod.TrimRight(this.get());
      return Result;
    };
    this.Trim$1 = function (ATrimChars) {
      var Result = "";
      Result = $mod.TStringHelper.TrimRight$1.call({a: $mod.TStringHelper.TrimLeft$1.call(this,ATrimChars), get: function () {
          return this.a;
        }, set: function (v) {
          this.a = v;
        }},ATrimChars);
      return Result;
    };
    this.TrimLeft$1 = function (ATrimChars) {
      var Result = "";
      var I = 0;
      var Len = 0;
      I = 1;
      Len = $mod.TStringHelper.GetLength.call(this);
      while ((I <= Len) && $impl.HaveChar(this.get().charAt(I - 1),ATrimChars)) I += 1;
      if (I === 1) {
        Result = this.get()}
       else if (I > Len) {
        Result = ""}
       else Result = pas.System.Copy(this.get(),I,(Len - I) + 1);
      return Result;
    };
    this.TrimRight$1 = function (ATrimChars) {
      var Result = "";
      var I = 0;
      var Len = 0;
      Len = $mod.TStringHelper.GetLength.call(this);
      I = Len;
      while ((I >= 1) && $impl.HaveChar(this.get().charAt(I - 1),ATrimChars)) I -= 1;
      if (I < 1) {
        Result = ""}
       else if (I === Len) {
        Result = this.get()}
       else Result = pas.System.Copy(this.get(),1,I);
      return Result;
    };
    this.TrimEnd = function (ATrimChars) {
      var Result = "";
      Result = $mod.TStringHelper.TrimRight$1.call(this,ATrimChars);
      return Result;
    };
    this.TrimStart = function (ATrimChars) {
      var Result = "";
      Result = $mod.TStringHelper.TrimLeft$1.call(this,ATrimChars);
      return Result;
    };
  });
  rtl.createHelper(this,"TDoubleHelper",null,function () {
    this.Epsilon = 4.9406564584124654418e-324;
    this.MaxValue = 1.7976931348623157081e+308;
    this.MinValue = -1.7976931348623157081e+308;
    this.GetB = function (AIndex) {
      var Result = 0;
      var F = null;
      var B = null;
      F = new Float64Array(1);
      B = new Uint8Array(F.buffer);
      F[0] = this.get();
      Result = B[AIndex];
      return Result;
    };
    this.GetW = function (AIndex) {
      var Result = 0;
      var F = null;
      var W = null;
      F = new Float64Array(1);
      W = new Uint16Array(F.buffer);
      F[0] = this.get();
      Result = W[AIndex];
      return Result;
    };
    this.GetE = function () {
      var Result = 0;
      Result = $impl.FloatToParts(this.get()).exp;
      return Result;
    };
    this.GetF = function () {
      var Result = 0;
      Result = 0;
      $impl.NotImplemented("GetF");
      return Result;
    };
    this.GetS = function () {
      var Result = false;
      Result = $impl.FloatToParts(this.get()).sign;
      return Result;
    };
    this.SetS = function (aValue) {
      var F = null;
      var B = null;
      F = new Float64Array(1);
      B = new Uint8Array(F.buffer);
      F[0] = this.get();
      if (aValue) {
        B[7] = B[7] | (1 >>> 7)}
       else B[7] = B[7] & ~(1 >>> 7);
      this.set(F[0]);
    };
    this.SetB = function (AIndex, AValue) {
      var F = null;
      var B = null;
      if (AIndex >= 8) throw $mod.ERangeError.$create("Create$1",[rtl.getResStr(pas.RTLConsts,"SRangeError")]);
      F = new Float64Array(1);
      B = new Uint8Array(F.buffer);
      F[0] = this.get();
      B[AIndex] = AValue;
      this.set(F[0]);
    };
    this.SetW = function (AIndex, AValue) {
      var F = null;
      var W = null;
      if (AIndex >= 4) throw $mod.ERangeError.$create("Create$1",[rtl.getResStr(pas.RTLConsts,"SRangeError")]);
      F = new Float64Array(1);
      W = new Uint16Array(F.buffer);
      F[0] = this.get();
      W[AIndex] = AValue;
      this.set(F[0]);
    };
    this.IsInfinity = function (AValue) {
      var Result = false;
      Result = !isFinite(AValue);
      return Result;
    };
    this.IsNan = function (AValue) {
      var Result = false;
      Result = isNaN(AValue);
      return Result;
    };
    this.IsNegativeInfinity = function (AValue) {
      var Result = false;
      return (AValue=Number.NEGATIVE_INFINITY);
      Result = AValue === 0;
      return Result;
    };
    this.IsPositiveInfinity = function (AValue) {
      var Result = false;
      return (AValue=Number.POSITIVE_INFINITY);
      Result = AValue === 0;
      return Result;
    };
    this.Parse = function (AString) {
      var Result = 0.0;
      Result = $mod.StrToFloat(AString);
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.FloatToStr(AValue);
      return Result;
    };
    this.ToString$1 = function (AValue, AFormat, APrecision, ADigits) {
      var Result = "";
      Result = $mod.FloatToStrF(AValue,AFormat,APrecision,ADigits);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      Result = $mod.TryStrToFloat$1(AString,AValue);
      return Result;
    };
    this.BuildUp = function (ASignFlag, AMantissa, AExponent) {
      $impl.NotImplemented("BuildUp");
      if (ASignFlag && (AMantissa > 0) && (AExponent < 0)) return;
    };
    this.Exponent = function () {
      var Result = 0;
      Result = $impl.FloatToParts(this.get()).exp;
      return Result;
    };
    this.Fraction = function () {
      var Result = 0.0;
      Result = pas.System.Frac(this.get());
      return Result;
    };
    this.IsInfinity$1 = function () {
      var Result = false;
      Result = $mod.TDoubleHelper.IsInfinity(this.get());
      return Result;
    };
    this.IsNan$1 = function () {
      var Result = false;
      Result = $mod.TDoubleHelper.IsNan(this.get());
      return Result;
    };
    this.IsNegativeInfinity$1 = function () {
      var Result = false;
      Result = $mod.TDoubleHelper.IsNegativeInfinity(this.get());
      return Result;
    };
    this.IsPositiveInfinity$1 = function () {
      var Result = false;
      Result = $mod.TDoubleHelper.IsPositiveInfinity(this.get());
      return Result;
    };
    this.Mantissa = function () {
      var Result = 0;
      Result = pas.System.Trunc($impl.FloatToParts(this.get()).mantissa);
      return Result;
    };
    this.ToString$2 = function (AFormat, APrecision, ADigits) {
      var Result = "";
      Result = $mod.FloatToStrF(this.get(),AFormat,APrecision,ADigits);
      return Result;
    };
    this.ToString$3 = function () {
      var Result = "";
      Result = $mod.FloatToStr(this.get());
      return Result;
    };
  });
  rtl.createHelper(this,"TByteHelper",null,function () {
    this.MaxValue = 255;
    this.MinValue = 0;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 1;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$3(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TByteHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      Result = $mod.IntToHex(this.get(),AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.IntToHex(this.get(),$mod.TByteHelper.Size() * 2);
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(this.get() | (1 << Index));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(this.get() & ~(1 << Index));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(this.get() ^ (1 << Index));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = (this.get() & (1 << Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TShortIntHelper",null,function () {
    this.MaxValue = 127;
    this.MinValue = -128;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 1;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$2(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TShortIntHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      var B = 0;
      var U = null;
      var S = null;
      if (this.get() >= 0) {
        B = this.get()}
       else {
        S = new Int8Array(1);
        S[0] = this.get();
        U = new Uint8Array(S);
        B = U[0];
        if (AMinDigits > 2) B = 0xFF00 + B;
      };
      Result = $mod.IntToHex(B,AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.TShortIntHelper.ToHexString.call(this,$mod.TShortIntHelper.Size() * 2);
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(this.get() | (1 << Index));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(this.get() & ~(1 << Index));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(this.get() ^ (1 << Index));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = (this.get() & (1 << Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TSmallIntHelper",null,function () {
    this.MaxValue = 32767;
    this.MinValue = -32768;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 2;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$4(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TSmallIntHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function () {
      var Result = "";
      Result = $mod.TSmallIntHelper.ToHexString$1.call(this,$mod.TSmallIntHelper.Size() * 2);
      return Result;
    };
    this.ToHexString$1 = function (AMinDigits) {
      var Result = "";
      var B = 0;
      var U = null;
      var S = null;
      if (this.get() >= 0) {
        B = this.get()}
       else {
        S = new Int16Array(1);
        S[0] = this.get();
        U = new Uint16Array(S);
        B = U[0];
        if (AMinDigits > 6) {
          B = 0xFFFF0000 + B}
         else if (AMinDigits > 4) B = 0xFF0000 + B;
      };
      Result = $mod.IntToHex(B,AMinDigits);
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(this.get() | (1 << Index));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(this.get() & ~(1 << Index));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(this.get() ^ (1 << Index));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = (this.get() & (1 << Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TWordHelper",null,function () {
    this.MaxValue = 65535;
    this.MinValue = 0;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 2;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$5(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TWordHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      Result = $mod.IntToHex(this.get(),AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.IntToHex(this.get(),$mod.TWordHelper.Size() * 2);
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(this.get() | (1 << Index));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(this.get() & ~(1 << Index));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(this.get() ^ (1 << Index));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = (this.get() & (1 << Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TCardinalHelper",null,function () {
    this.MaxValue = 4294967295;
    this.MinValue = 0;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 4;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$7(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TCardinalHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      Result = $mod.IntToHex(this.get(),AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.TCardinalHelper.ToHexString.call(this,$mod.TCardinalHelper.Size() * 2);
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(rtl.lw(this.get() | rtl.lw(1 << Index)));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(rtl.lw(this.get() & rtl.lw(~rtl.lw(1 << Index))));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(rtl.lw(this.get() ^ rtl.lw(1 << Index)));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = rtl.lw(this.get() & rtl.lw(1 << Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TIntegerHelper",null,function () {
    this.MaxValue = 2147483647;
    this.MinValue = -2147483648;
    this.Size = function () {
      var Result = 0;
      Result = 4;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$6(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TIntegerHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      var B = 0;
      var U = null;
      var S = null;
      if (this.get() >= 0) {
        B = this.get()}
       else {
        S = new Int32Array(1);
        S[0] = this.get();
        U = new Uint32Array(S);
        B = U[0];
      };
      Result = $mod.IntToHex(B,AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.TIntegerHelper.ToHexString.call(this,$mod.TIntegerHelper.Size() * 2);
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(this.get() | (1 << Index));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(this.get() & ~(1 << Index));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(this.get() ^ (1 << Index));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = (this.get() & (1 << Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TNativeIntHelper",null,function () {
    this.MaxValue = 9007199254740991;
    this.MinValue = -9007199254740991;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 7;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TNativeIntHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      Result = $mod.IntToHex(this.get(),AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.IntToHex(this.get(),$mod.TNativeIntHelper.Size() * 2);
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(rtl.or(this.get(),rtl.shl(1,Index)));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(rtl.and(this.get(),~rtl.shl(1,Index)));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(rtl.xor(this.get(),rtl.shl(1,Index)));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = rtl.and(this.get(),rtl.shl(1,Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TNativeUIntHelper",null,function () {
    this.MaxValue = 9007199254740991;
    this.MinValue = 0;
    this.Parse = function (AString) {
      var Result = 0;
      Result = $mod.StrToInt(AString);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 7;
      return Result;
    };
    this.ToString = function (AValue) {
      var Result = "";
      Result = $mod.IntToStr(AValue);
      return Result;
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      var C = 0;
      pas.System.val$1(AString,AValue,{get: function () {
          return C;
        }, set: function (v) {
          C = v;
        }});
      Result = C === 0;
      return Result;
    };
    this.ToBoolean = function () {
      var Result = false;
      Result = this.get() !== 0;
      return Result;
    };
    this.ToDouble = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToExtended = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToBinString = function () {
      var Result = "";
      Result = pas.System.binstr(this.get(),$mod.TNativeUIntHelper.Size() * 8);
      return Result;
    };
    this.ToHexString = function (AMinDigits) {
      var Result = "";
      Result = $mod.IntToHex(this.get(),AMinDigits);
      return Result;
    };
    this.ToHexString$1 = function () {
      var Result = "";
      Result = $mod.IntToHex(this.get(),$mod.TNativeUIntHelper.Size() * 2);
      return Result;
    };
    this.ToSingle = function () {
      var Result = 0.0;
      Result = this.get();
      return Result;
    };
    this.ToString$1 = function () {
      var Result = "";
      Result = $mod.IntToStr(this.get());
      return Result;
    };
    this.SetBit = function (Index) {
      var Result = 0;
      this.set(rtl.or(this.get(),rtl.shl(1,Index)));
      Result = this.get();
      return Result;
    };
    this.ClearBit = function (Index) {
      var Result = 0;
      this.set(rtl.and(this.get(),~rtl.shl(1,Index)));
      Result = this.get();
      return Result;
    };
    this.ToggleBit = function (Index) {
      var Result = 0;
      this.set(rtl.xor(this.get(),rtl.shl(1,Index)));
      Result = this.get();
      return Result;
    };
    this.TestBit = function (Index) {
      var Result = false;
      Result = rtl.and(this.get(),rtl.shl(1,Index)) !== 0;
      return Result;
    };
  });
  rtl.createHelper(this,"TBooleanHelper",null,function () {
    this.Parse = function (S) {
      var Result = false;
      Result = $mod.StrToBool(S);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 1;
      return Result;
    };
    this.ToString = function (AValue, UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(AValue,UseBoolStrs);
      return Result;
    };
    this.TryToParse = function (S, AValue) {
      var Result = false;
      Result = $mod.TryStrToBool(S,AValue);
      return Result;
    };
    this.ToInteger = function () {
      var Result = 0;
      Result = (this.get() ? 1 : 0);
      return Result;
    };
    this.ToString$1 = function (UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(this.get(),UseBoolStrs);
      return Result;
    };
  });
  rtl.createHelper(this,"TByteBoolHelper",null,function () {
    this.Parse = function (S) {
      var Result = false;
      Result = $mod.StrToBool(S);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 1;
      return Result;
    };
    this.ToString = function (AValue, UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(AValue,UseBoolStrs);
      return Result;
    };
    this.TryToParse = function (S, AValue) {
      var Result = false;
      Result = $mod.TryStrToBool(S,AValue);
      return Result;
    };
    this.ToInteger = function () {
      var Result = 0;
      Result = (this.get() ? 1 : 0);
      return Result;
    };
    this.ToString$1 = function (UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(this.get(),UseBoolStrs);
      return Result;
    };
  });
  rtl.createHelper(this,"TWordBoolHelper",null,function () {
    this.Parse = function (S) {
      var Result = false;
      Result = $mod.StrToBool(S);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 2;
      return Result;
    };
    this.ToString = function (AValue, UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(AValue,UseBoolStrs);
      return Result;
    };
    this.TryToParse = function (S, AValue) {
      var Result = false;
      Result = $mod.TryStrToBool(S,AValue);
      return Result;
    };
    this.ToInteger = function () {
      var Result = 0;
      Result = (this.get() ? 1 : 0);
      return Result;
    };
    this.ToString$1 = function (UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(this.get(),UseBoolStrs);
      return Result;
    };
  });
  rtl.createHelper(this,"TLongBoolHelper",null,function () {
    this.Parse = function (S) {
      var Result = false;
      Result = $mod.StrToBool(S);
      return Result;
    };
    this.Size = function () {
      var Result = 0;
      Result = 4;
      return Result;
    };
    this.ToString = function (AValue, UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(AValue,UseBoolStrs);
      return Result;
    };
    this.TryToParse = function (S, AValue) {
      var Result = false;
      Result = $mod.TryStrToBool(S,AValue);
      return Result;
    };
    this.ToInteger = function () {
      var Result = 0;
      Result = (this.get() ? 1 : 0);
      return Result;
    };
    this.ToString$1 = function (UseBoolStrs) {
      var Result = "";
      Result = $mod.BoolToStr(this.get(),UseBoolStrs);
      return Result;
    };
  });
  $mod.$implcode = function () {
    $impl.DoShowException = function (S) {
      if ($mod.OnShowException != null) {
        $mod.OnShowException(S)}
       else {
        window.alert(S);
      };
    };
    $mod.$rtti.$ProcVar("TRTLExceptionHandler",{procsig: rtl.newTIProcSig([["aError",rtl.jsvalue]])});
    $impl.OnPascalException = null;
    $impl.OnJSException = null;
    $impl.RTLExceptionHook = function (aError) {
      var S = "";
      if (pas.JS.isClassInstance(aError)) {
        if ($impl.OnPascalException != null) {
          $impl.OnPascalException(rtl.getObject(aError))}
         else $mod.ShowException(rtl.getObject(aError),null);
      } else if (rtl.isObject(aError)) {
        if ($impl.OnJSException != null) {
          $impl.OnJSException(aError)}
         else {
          if (aError.hasOwnProperty("message")) {
            S = rtl.getResStr($mod,"SErrUnknownExceptionType") + ("" + aError["message"])}
           else S = rtl.getResStr($mod,"SErrUnknownExceptionType") + aError.toString();
          $impl.DoShowException(S);
        };
      } else {
        S = rtl.getResStr($mod,"SErrUnknownExceptionType") + ("" + aError);
        $impl.DoShowException(S);
      };
    };
    $mod.$rtti.$Set("TCharSet",{comptype: rtl.char});
    $impl.CharInSet$1 = function (Ch, CSet) {
      var Result = false;
      Result = Ch.charCodeAt() in CSet;
      return Result;
    };
    $impl.CheckBoolStrs = function () {
      if (rtl.length($mod.TrueBoolStrs) === 0) {
        $mod.TrueBoolStrs = rtl.arraySetLength($mod.TrueBoolStrs,"",1);
        $mod.TrueBoolStrs[0] = "True";
      };
      if (rtl.length($mod.FalseBoolStrs) === 0) {
        $mod.FalseBoolStrs = rtl.arraySetLength($mod.FalseBoolStrs,"",1);
        $mod.FalseBoolStrs[0] = "False";
      };
    };
    $impl.feInvalidFormat = 1;
    $impl.feMissingArgument = 2;
    $impl.feInvalidArgIndex = 3;
    $impl.DoFormatError = function (ErrCode, fmt) {
      var $tmp = ErrCode;
      if ($tmp === 1) {
        throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidFormat"),[fmt]])}
       else if ($tmp === 2) {
        throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SArgumentMissing"),[fmt]])}
       else if ($tmp === 3) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidArgIndex"),[fmt]]);
    };
    $impl.maxdigits = 15;
    $impl.ReplaceDecimalSep = function (S, DS) {
      var Result = "";
      var P = 0;
      P = pas.System.Pos(".",S);
      if (P > 0) {
        Result = pas.System.Copy(S,1,P - 1) + DS + pas.System.Copy(S,P + 1,S.length - P)}
       else Result = S;
      return Result;
    };
    $impl.FormatGeneralFloat = function (Value, Precision, DS) {
      var Result = "";
      var P = 0;
      var PE = 0;
      var Q = 0;
      var Exponent = 0;
      if ((Precision === -1) || (Precision > 15)) Precision = 15;
      Result = rtl.floatToStr(Value,Precision + 7);
      Result = $mod.TrimLeft(Result);
      P = pas.System.Pos(".",Result);
      if (P === 0) return Result;
      PE = pas.System.Pos("E",Result);
      if (PE === 0) {
        Result = $impl.ReplaceDecimalSep(Result,DS);
        return Result;
      };
      Q = PE + 2;
      Exponent = 0;
      while (Q <= Result.length) {
        Exponent = ((Exponent * 10) + Result.charCodeAt(Q - 1)) - 48;
        Q += 1;
      };
      if (Result.charAt((PE + 1) - 1) === "-") Exponent = -Exponent;
      if (((P + Exponent) < PE) && (Exponent > -6)) {
        Result = rtl.strSetLength(Result,PE - 1);
        if (Exponent >= 0) {
          for (var $l = 0, $end = Exponent - 1; $l <= $end; $l++) {
            Q = $l;
            Result = rtl.setCharAt(Result,P - 1,Result.charAt((P + 1) - 1));
            P += 1;
          };
          Result = rtl.setCharAt(Result,P - 1,".");
          P = 1;
          if (Result.charAt(P - 1) === "-") P += 1;
          while ((Result.charAt(P - 1) === "0") && (P < Result.length) && (pas.System.Copy(Result,P + 1,DS.length) !== DS)) pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},P,1);
        } else {
          pas.System.Insert(pas.System.Copy("00000",1,-Exponent),{get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},P - 1);
          Result = rtl.setCharAt(Result,P - Exponent - 1,Result.charAt(P - Exponent - 1 - 1));
          Result = rtl.setCharAt(Result,P - 1,".");
          if (Exponent !== -1) Result = rtl.setCharAt(Result,P - Exponent - 1 - 1,"0");
        };
        Q = Result.length;
        while ((Q > 0) && (Result.charAt(Q - 1) === "0")) Q -= 1;
        if (Result.charAt(Q - 1) === ".") Q -= 1;
        if ((Q === 0) || ((Q === 1) && (Result.charAt(0) === "-"))) {
          Result = "0"}
         else Result = rtl.strSetLength(Result,Q);
      } else {
        while (Result.charAt(PE - 1 - 1) === "0") {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},PE - 1,1);
          PE -= 1;
        };
        if (Result.charAt(PE - 1 - 1) === DS) {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},PE - 1,1);
          PE -= 1;
        };
        if (Result.charAt((PE + 1) - 1) === "+") {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},PE + 1,1)}
         else PE += 1;
        while (Result.charAt((PE + 1) - 1) === "0") pas.System.Delete({get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},PE + 1,1);
      };
      Result = $impl.ReplaceDecimalSep(Result,DS);
      return Result;
    };
    $impl.FormatExponentFloat = function (Value, Precision, Digits, DS) {
      var Result = "";
      var P = 0;
      DS = $mod.DecimalSeparator;
      if ((Precision === -1) || (Precision > 15)) Precision = 15;
      Result = rtl.floatToStr(Value,Precision + 7);
      while (Result.charAt(0) === " ") pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      P = pas.System.Pos("E",Result);
      if (P === 0) {
        Result = $impl.ReplaceDecimalSep(Result,DS);
        return Result;
      };
      P += 2;
      if (Digits > 4) Digits = 4;
      Digits = (Result.length - P - Digits) + 1;
      if (Digits < 0) {
        pas.System.Insert(pas.System.Copy("0000",1,-Digits),{get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},P)}
       else while ((Digits > 0) && (Result.charAt(P - 1) === "0")) {
        pas.System.Delete({get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},P,1);
        if (P > Result.length) {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},P - 2,2);
          break;
        };
        Digits -= 1;
      };
      Result = $impl.ReplaceDecimalSep(Result,DS);
      return Result;
    };
    $impl.FormatFixedFloat = function (Value, Digits, DS) {
      var Result = "";
      if (Digits === -1) {
        Digits = 2}
       else if (Digits > 18) Digits = 18;
      Result = rtl.floatToStr(Value,0,Digits);
      if ((Result !== "") && (Result.charAt(0) === " ")) pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      Result = $impl.ReplaceDecimalSep(Result,DS);
      return Result;
    };
    $impl.FormatNumberFloat = function (Value, Digits, DS, TS) {
      var Result = "";
      var P = 0;
      if (Digits === -1) {
        Digits = 2}
       else if (Digits > 15) Digits = 15;
      Result = rtl.floatToStr(Value,0,Digits);
      if ((Result !== "") && (Result.charAt(0) === " ")) pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      P = pas.System.Pos(".",Result);
      if (P <= 0) P = Result.length + 1;
      Result = $impl.ReplaceDecimalSep(Result,DS);
      P -= 3;
      if ((TS !== "") && (TS !== "\x00")) while (P > 1) {
        if (Result.charAt(P - 1 - 1) !== "-") pas.System.Insert(TS,{get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},P);
        P -= 3;
      };
      return Result;
    };
    $impl.RemoveLeadingNegativeSign = function (AValue, DS) {
      var Result = false;
      var i = 0;
      var TS = "";
      var StartPos = 0;
      Result = false;
      StartPos = 2;
      TS = $mod.ThousandSeparator;
      for (var $l = StartPos, $end = AValue.get().length; $l <= $end; $l++) {
        i = $l;
        Result = (AValue.get().charCodeAt(i - 1) in rtl.createSet(48,DS.charCodeAt(),69,43)) || (AValue.get().charAt(i - 1) === TS);
        if (!Result) break;
      };
      if (Result && (AValue.get().charAt(0) === "-")) pas.System.Delete(AValue,1,1);
      return Result;
    };
    $impl.FormatNumberCurrency = function (Value, Digits, DS, TS) {
      var Result = "";
      var Negative = false;
      var P = 0;
      if (Digits === -1) {
        Digits = $mod.CurrencyDecimals}
       else if (Digits > 18) Digits = 18;
      Result = rtl.floatToStr(Value / 10000,0,Digits);
      Negative = Result.charAt(0) === "-";
      if (Negative) pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      P = pas.System.Pos(".",Result);
      if (TS !== "") {
        if (P !== 0) {
          Result = $impl.ReplaceDecimalSep(Result,DS)}
         else P = Result.length + 1;
        P -= 3;
        while (P > 1) {
          pas.System.Insert(TS,{get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},P);
          P -= 3;
        };
      };
      if (Negative) $impl.RemoveLeadingNegativeSign({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},DS);
      if (!Negative) {
        var $tmp = $mod.CurrencyFormat;
        if ($tmp === 0) {
          Result = $mod.CurrencyString + Result}
         else if ($tmp === 1) {
          Result = Result + $mod.CurrencyString}
         else if ($tmp === 2) {
          Result = $mod.CurrencyString + " " + Result}
         else if ($tmp === 3) Result = Result + " " + $mod.CurrencyString;
      } else {
        var $tmp1 = $mod.NegCurrFormat;
        if ($tmp1 === 0) {
          Result = "(" + $mod.CurrencyString + Result + ")"}
         else if ($tmp1 === 1) {
          Result = "-" + $mod.CurrencyString + Result}
         else if ($tmp1 === 2) {
          Result = $mod.CurrencyString + "-" + Result}
         else if ($tmp1 === 3) {
          Result = $mod.CurrencyString + Result + "-"}
         else if ($tmp1 === 4) {
          Result = "(" + Result + $mod.CurrencyString + ")"}
         else if ($tmp1 === 5) {
          Result = "-" + Result + $mod.CurrencyString}
         else if ($tmp1 === 6) {
          Result = Result + "-" + $mod.CurrencyString}
         else if ($tmp1 === 7) {
          Result = Result + $mod.CurrencyString + "-"}
         else if ($tmp1 === 8) {
          Result = "-" + Result + " " + $mod.CurrencyString}
         else if ($tmp1 === 9) {
          Result = "-" + $mod.CurrencyString + " " + Result}
         else if ($tmp1 === 10) {
          Result = Result + " " + $mod.CurrencyString + "-"}
         else if ($tmp1 === 11) {
          Result = $mod.CurrencyString + " " + Result + "-"}
         else if ($tmp1 === 12) {
          Result = $mod.CurrencyString + " " + "-" + Result}
         else if ($tmp1 === 13) {
          Result = Result + "-" + " " + $mod.CurrencyString}
         else if ($tmp1 === 14) {
          Result = "(" + $mod.CurrencyString + " " + Result + ")"}
         else if ($tmp1 === 15) Result = "(" + Result + " " + $mod.CurrencyString + ")";
      };
      return Result;
    };
    $impl.RESpecials = "([\\$\\+\\[\\]\\(\\)\\\\\\.\\*\\^])";
    $impl.DoEncodeDate = function (Year, Month, Day) {
      var Result = 0;
      var D = 0.0;
      if ($mod.TryEncodeDate(Year,Month,Day,{get: function () {
          return D;
        }, set: function (v) {
          D = v;
        }})) {
        Result = pas.System.Trunc(D)}
       else Result = 0;
      return Result;
    };
    $impl.DoEncodeTime = function (Hour, Minute, Second, MilliSecond) {
      var Result = 0.0;
      if (!$mod.TryEncodeTime(Hour,Minute,Second,MilliSecond,{get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }})) Result = 0;
      return Result;
    };
    $mod.$rtti.$StaticArray("DateTimeToStrFormat$a",{dims: [2], eltype: rtl.string});
    $impl.DateTimeToStrFormat = ["c","f"];
    var WhiteSpace = " \b\t\n\f\r";
    var Digits = "0123456789";
    $impl.IntStrToDate = function (ErrorMsg, S, useformat, separator) {
      var Result = 0.0;
      function FixErrorMsg(errmarg) {
        ErrorMsg.set($mod.Format(rtl.getResStr(pas.RTLConsts,"SInvalidDateFormat"),[errmarg]));
      };
      var df = "";
      var d = 0;
      var m = 0;
      var y = 0;
      var ly = 0;
      var ld = 0;
      var lm = 0;
      var n = 0;
      var i = 0;
      var len = 0;
      var c = 0;
      var dp = 0;
      var mp = 0;
      var yp = 0;
      var which = 0;
      var s1 = "";
      var values = [];
      var YearMoreThenTwoDigits = false;
      values = rtl.arraySetLength(values,0,4);
      Result = 0;
      len = S.length;
      ErrorMsg.set("");
      while ((len > 0) && (pas.System.Pos(S.charAt(len - 1),WhiteSpace) > 0)) len -= 1;
      if (len === 0) {
        FixErrorMsg(S);
        return Result;
      };
      YearMoreThenTwoDigits = false;
      if (separator === "\x00") if ($mod.DateSeparator !== "\x00") {
        separator = $mod.DateSeparator}
       else separator = "-";
      df = $mod.UpperCase(useformat);
      yp = 0;
      mp = 0;
      dp = 0;
      which = 0;
      i = 0;
      while ((i < df.length) && (which < 3)) {
        i += 1;
        var $tmp = df.charAt(i - 1);
        if ($tmp === "Y") {
          if (yp === 0) {
            which += 1;
            yp = which;
          }}
         else if ($tmp === "M") {
          if (mp === 0) {
            which += 1;
            mp = which;
          }}
         else if ($tmp === "D") if (dp === 0) {
          which += 1;
          dp = which;
        };
      };
      for (i = 1; i <= 3; i++) values[i] = 0;
      s1 = "";
      n = 0;
      for (var $l = 1, $end = len; $l <= $end; $l++) {
        i = $l;
        if (pas.System.Pos(S.charAt(i - 1),Digits) > 0) s1 = s1 + S.charAt(i - 1);
        if ((separator !== " ") && (S.charAt(i - 1) === " ")) continue;
        if ((S.charAt(i - 1) === separator) || ((i === len) && (pas.System.Pos(S.charAt(i - 1),Digits) > 0))) {
          n += 1;
          if (n > 3) {
            FixErrorMsg(S);
            return Result;
          };
          if ((n === yp) && (s1.length > 2)) YearMoreThenTwoDigits = true;
          pas.System.val$6(s1,{a: n, p: values, get: function () {
              return this.p[this.a];
            }, set: function (v) {
              this.p[this.a] = v;
            }},{get: function () {
              return c;
            }, set: function (v) {
              c = v;
            }});
          if (c !== 0) {
            FixErrorMsg(S);
            return Result;
          };
          s1 = "";
        } else if (pas.System.Pos(S.charAt(i - 1),Digits) === 0) {
          FixErrorMsg(S);
          return Result;
        };
      };
      if ((which < 3) && (n > which)) {
        FixErrorMsg(S);
        return Result;
      };
      $mod.DecodeDate($mod.Date(),{get: function () {
          return ly;
        }, set: function (v) {
          ly = v;
        }},{get: function () {
          return lm;
        }, set: function (v) {
          lm = v;
        }},{get: function () {
          return ld;
        }, set: function (v) {
          ld = v;
        }});
      if (n === 3) {
        y = values[yp];
        m = values[mp];
        d = values[dp];
      } else {
        y = ly;
        if (n < 2) {
          d = values[1];
          m = lm;
        } else if (dp < mp) {
          d = values[1];
          m = values[2];
        } else {
          d = values[2];
          m = values[1];
        };
      };
      if ((y >= 0) && (y < 100) && !YearMoreThenTwoDigits) {
        ly = ly - $mod.TwoDigitYearCenturyWindow;
        y += rtl.trunc(ly / 100) * 100;
        if (($mod.TwoDigitYearCenturyWindow > 0) && (y < ly)) y += 100;
      };
      if (!$mod.TryEncodeDate(y,m,d,{get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }})) ErrorMsg.set(rtl.getResStr(pas.RTLConsts,"SErrInvalidDate"));
      return Result;
    };
    var AMPM_None = 0;
    var AMPM_AM = 1;
    var AMPM_PM = 2;
    var tiHour = 0;
    var tiMin = 1;
    var tiSec = 2;
    var tiMSec = 3;
    var Digits$1 = "0123456789";
    $impl.IntStrToTime = function (ErrorMsg, S, Len, separator) {
      var Result = 0.0;
      var AmPm = 0;
      var TimeValues = [];
      function SplitElements(TimeValues, AmPm) {
        var Result = false;
        var Cur = 0;
        var Offset = 0;
        var ElemLen = 0;
        var Err = 0;
        var TimeIndex = 0;
        var FirstSignificantDigit = 0;
        var Value = 0;
        var DigitPending = false;
        var MSecPending = false;
        var AmPmStr = "";
        var CurChar = "";
        var I = 0;
        var allowedchars = "";
        Result = false;
        AmPm.set(0);
        MSecPending = false;
        TimeIndex = 0;
        for (I = 0; I <= 3; I++) TimeValues.get()[I] = 0;
        Cur = 1;
        while ((Cur < Len) && (S.charAt(Cur - 1) === " ")) Cur += 1;
        Offset = Cur;
        if ((Cur > (Len - 1)) || (S.charAt(Cur - 1) === separator) || (S.charAt(Cur - 1) === $mod.DecimalSeparator)) {
          return Result;
        };
        DigitPending = pas.System.Pos(S.charAt(Cur - 1),Digits$1) > 0;
        while (Cur <= Len) {
          CurChar = S.charAt(Cur - 1);
          if (pas.System.Pos(CurChar,Digits$1) > 0) {
            if (!DigitPending || (TimeIndex > 3)) {
              return Result;
            };
            Offset = Cur;
            if (CurChar !== "0") {
              FirstSignificantDigit = Offset}
             else FirstSignificantDigit = -1;
            while ((Cur < Len) && (pas.System.Pos(S.charAt((Cur + 1) - 1),Digits$1) > 0)) {
              if ((FirstSignificantDigit === -1) && (S.charAt(Cur - 1) !== "0")) FirstSignificantDigit = Cur;
              Cur += 1;
            };
            if (FirstSignificantDigit === -1) FirstSignificantDigit = Cur;
            ElemLen = (1 + Cur) - FirstSignificantDigit;
            if ((ElemLen <= 2) || ((ElemLen <= 3) && (TimeIndex === 3))) {
              pas.System.val$6(pas.System.Copy(S,FirstSignificantDigit,ElemLen),{get: function () {
                  return Value;
                }, set: function (v) {
                  Value = v;
                }},{get: function () {
                  return Err;
                }, set: function (v) {
                  Err = v;
                }});
              TimeValues.get()[TimeIndex] = Value;
              TimeIndex += 1;
              DigitPending = false;
            } else {
              return Result;
            };
          } else if (CurChar === " ") {}
          else if (CurChar === separator) {
            if (DigitPending || (TimeIndex > 2)) {
              return Result;
            };
            DigitPending = true;
            MSecPending = false;
          } else if (CurChar === $mod.DecimalSeparator) {
            if (DigitPending || MSecPending || (TimeIndex !== 3)) {
              return Result;
            };
            DigitPending = true;
            MSecPending = true;
          } else {
            if ((AmPm.get() !== 0) || DigitPending) {
              return Result;
            };
            Offset = Cur;
            allowedchars = $mod.DecimalSeparator + " ";
            if (separator !== "\x00") allowedchars = allowedchars + separator;
            while ((Cur < Len) && (pas.System.Pos(S.charAt((Cur + 1) - 1),allowedchars) === 0) && (pas.System.Pos(S.charAt((Cur + 1) - 1),Digits$1) === 0)) Cur += 1;
            ElemLen = (1 + Cur) - Offset;
            AmPmStr = pas.System.Copy(S,Offset,ElemLen);
            if ($mod.CompareText(AmPmStr,$mod.TimeAMString) === 0) {
              AmPm.set(1)}
             else if ($mod.CompareText(AmPmStr,$mod.TimePMString) === 0) {
              AmPm.set(2)}
             else if ($mod.CompareText(AmPmStr,"AM") === 0) {
              AmPm.set(1)}
             else if ($mod.CompareText(AmPmStr,"PM") === 0) {
              AmPm.set(2)}
             else {
              return Result;
            };
            if (TimeIndex === 0) {
              DigitPending = true;
            } else {
              TimeIndex = 3 + 1;
              DigitPending = false;
            };
          };
          Cur += 1;
        };
        if ((TimeIndex === 0) || ((AmPm.get() !== 0) && ((TimeValues.get()[0] > 12) || (TimeValues.get()[0] === 0))) || DigitPending) return Result;
        Result = true;
        return Result;
      };
      TimeValues = rtl.arraySetLength(TimeValues,0,4);
      if (separator === "\x00") if ($mod.TimeSeparator !== "\x00") {
        separator = $mod.TimeSeparator}
       else separator = ":";
      AmPm = 0;
      if (!SplitElements({get: function () {
          return TimeValues;
        }, set: function (v) {
          TimeValues = v;
        }},{get: function () {
          return AmPm;
        }, set: function (v) {
          AmPm = v;
        }})) {
        ErrorMsg.set($mod.Format(rtl.getResStr(pas.RTLConsts,"SErrInvalidTimeFormat"),[S]));
        return Result;
      };
      if ((AmPm === 2) && (TimeValues[0] !== 12)) {
        TimeValues[0] += 12}
       else if ((AmPm === 1) && (TimeValues[0] === 12)) TimeValues[0] = 0;
      if (!$mod.TryEncodeTime(TimeValues[0],TimeValues[1],TimeValues[2],TimeValues[3],{get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }})) ErrorMsg.set($mod.Format(rtl.getResStr(pas.RTLConsts,"SErrInvalidTimeFormat"),[S]));
      return Result;
    };
    var WhiteSpace$1 = "\t\n\r ";
    $impl.SplitDateTimeStr = function (DateTimeStr, DateStr, TimeStr) {
      var Result = 0;
      var p = 0;
      var DummyDT = 0.0;
      Result = 0;
      DateStr.set("");
      TimeStr.set("");
      DateTimeStr = $mod.Trim(DateTimeStr);
      if (DateTimeStr.length === 0) return Result;
      if (($mod.DateSeparator === " ") && ($mod.TimeSeparator === " ") && (pas.System.Pos(" ",DateTimeStr) > 0)) {
        DateStr.set(DateTimeStr);
        return 1;
      };
      p = 1;
      if ($mod.DateSeparator !== " ") {
        while ((p < DateTimeStr.length) && !(pas.System.Pos(DateTimeStr.charAt((p + 1) - 1),WhiteSpace$1) > 0)) p += 1;
      } else {
        p = pas.System.Pos($mod.TimeSeparator,DateTimeStr);
        if (p !== 0) do {
          p -= 1;
        } while (!((p === 0) || (pas.System.Pos(DateTimeStr.charAt(p - 1),WhiteSpace$1) > 0)));
      };
      if (p === 0) p = DateTimeStr.length;
      DateStr.set(pas.System.Copy(DateTimeStr,1,p));
      TimeStr.set($mod.Trim(pas.System.Copy(DateTimeStr,p + 1,100)));
      if (TimeStr.get().length !== 0) {
        Result = 2}
       else {
        Result = 1;
        if ((($mod.DateSeparator !== $mod.TimeSeparator) && (pas.System.Pos($mod.TimeSeparator,DateStr.get()) > 0)) || (($mod.DateSeparator === $mod.TimeSeparator) && !$mod.TryStrToDate(DateStr.get(),{get: function () {
            return DummyDT;
          }, set: function (v) {
            DummyDT = v;
          }}))) {
          TimeStr.set(DateStr.get());
          DateStr.set("");
        };
      };
      return Result;
    };
    $impl.NotImplemented = function (S) {
      throw $mod.Exception.$create("Create$1",["Not yet implemented : " + S]);
    };
    $impl.HaveChar = function (AChar, AList) {
      var Result = false;
      var I = 0;
      I = 0;
      Result = false;
      while (!Result && (I < rtl.length(AList))) {
        Result = AList[I] === AChar;
        I += 1;
      };
      return Result;
    };
    rtl.recNewT($impl,"TFloatParts",function () {
      this.sign = false;
      this.exp = 0;
      this.mantissa = 0.0;
      this.$eq = function (b) {
        return (this.sign === b.sign) && (this.exp === b.exp) && (this.mantissa === b.mantissa);
      };
      this.$assign = function (s) {
        this.sign = s.sign;
        this.exp = s.exp;
        this.mantissa = s.mantissa;
        return this;
      };
      var $r = $mod.$rtti.$Record("TFloatParts",{});
      $r.addField("sign",rtl.boolean);
      $r.addField("exp",rtl.longint);
      $r.addField("mantissa",rtl.double);
    });
    $impl.FloatToParts = function (aValue) {
      var Result = $impl.TFloatParts.$new();
      var F = null;
      var B = null;
      F = new Float64Array(1);
      B = new Uint8Array(F.buffer);
      F[0] = aValue;
      Result.sign = (B[7] >>> 7) === 0;
      Result.exp = (((B[7] & 0x7f) << 4) | (B[6] >>> 4)) - 0x3ff;
      B[3] = 0x3F;
      B[6] = B[6] | 0xF0;
      Result.mantissa = F[0];
      return Result;
    };
    $mod.$resourcestrings = {SAbortError: {org: "Operation aborted"}, SApplicationException: {org: "Application raised an exception: "}, SErrUnknownExceptionType: {org: "Caught unknown exception type : "}};
  };
  $mod.$init = function () {
    (function () {
      $mod.FormatSettings = $mod.TFormatSettings.$create("Create");
    })();
  };
},[]);
//# sourceMappingURL=sysutils.js.map

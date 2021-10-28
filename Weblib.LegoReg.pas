unit Weblib.LegoReg;
//Component library

interface

uses
weblib.DesignIntf, Weblib.Lego;

procedure Register;

implementation

//Register is neccessary to build a package for the component that can be shown in the toolpalette
procedure Register;
begin
  RegisterComponents('LegoBrick', [TLegoBrick]);
end;

end.
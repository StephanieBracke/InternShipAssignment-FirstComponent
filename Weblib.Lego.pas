unit Weblib.Lego;
//Core Source

interface

uses
Classes, SysUtils, Types, WEBLib.Controls, WEBLib.StdCtrls, WEBLib.Graphics, WEBLib.Dialogs, Web;

//TCustomControl is my tabula rasa
//A blank canvas that would make Bob Ross jealous
//There are no mistakes, only happy accidents.
type
    TLegoBrick = class(TCustomControl)

// My private variables & methods here
private
    FOnBuild: TNotifyEvent;
    FCaptionLabel: string;
    FBorderColor: TColor;
    FButton: TJSHTMLElement;
    FCaption: TJSHTMLElement;
    FPadding: integer;
    FMargin: integer;
    FCreated: boolean;
    function HandleBuildClick(Event: TJSMouseEvent): Boolean; virtual;
    procedure SetBorderColor(const Value: TColor); reintroduce;
    procedure SetMargin(const Value: integer);
    procedure SetPadding(const Value: integer);

// My protected methods here
protected
    procedure DoBuild; virtual;
    function CreateElement: TJSElement; override;
    procedure UpdateElementVisual; override;
    procedure UpdateElementData; override;
    procedure BindEvents; override;
    procedure UnbindEvents; override;

// My public methods here
public
    procedure CreateInitialize; override;

// My published properties and events here
published
    property Align;
    property AlignWithMargins;
    property Anchors;
    property BorderColor: TColor read FBorderColor write SetBorderColor;
    property ElementFont;
    property ElementID;
    property ElementPosition;
    property Margin: integer read FMargin write SetMargin;
    property Padding: integer read FPadding write SetPadding;
    property OnBuild: TNotifyEvent read FOnBuild write FOnBuild;

end;

  TWebLoginPanel = class(TLegoBrick);

//This is where the magic happens
implementation

procedure TLegoBrick.BindEvents;
var
  s: string;
begin
  inherited;

  if FCreated then
  begin
    FButton.addEventListener('click', @HandleBuildClick);
    FCreated := false;
  end
  else
  begin
    s := GetID + 'btnId';
    FButton := TJSHTMLElement(document.getElementById(s));
    FButton.addEventListener('click', @HandleBuildClick);
  end;
end;

function TLegoBrick.CreateElement: TJSElement;
var
  br: TJSElement;
begin
  FCreated := true;
  Result := document.createElement('SPAN');

  FCaption := TJSHTMLElement(document.createElement('DIV'));

  Result.appendChild(FCaption);

  br := document.createElement('BR');
  Result.appendChild(br);

  FButton := TJSHTMLElement(document.createElement('BUTTON'));
  FButton['id'] := Name + 'btnId';
  Result.appendChild(FButton);
  FButton.innerHTML := 'Build';

end;

procedure TLegoBrick.CreateInitialize;
begin
  inherited;
  Color := clFuchsia;
  FCaptionLabel := 'Build With Bricks';
  FBorderColor := clSkyBlue;
  FPadding := 5;
  FMargin := 10;
  Height := 150;
  Width := 150;
end;

procedure TLegoBrick.DoBuild;
begin
  if Assigned(OnBuild) then
    OnBuild(Self);
end;

function TLegoBrick.HandleBuildClick(Event: TJSMouseEvent): Boolean;
begin
  Result := true;
  DoBuild;
end;

procedure TLegoBrick.SetBorderColor(const Value: TColor);
begin
  if (FBorderColor <> Value) then
  begin
    FBorderColor := Value;
    UpdateElementVisual;
  end;
end;

procedure TLegoBrick.SetMargin(const Value: integer);
begin
  if (FMargin <> Value) then
  begin
    FMargin := Value;
    UpdateElementVisual;
  end;
end;

procedure TLegoBrick.SetPadding(const Value: integer);
begin
  if (FPadding <> Value) then
  begin
    FPadding := Value;
    UpdateElementVisual;
  end;
end;

procedure TLegoBrick.UnbindEvents;
begin
  inherited;
  FButton.removeEventListener('click',@HandleBuildClick);
end;

procedure TLegoBrick.UpdateElementData;
begin
  inherited;
  FCaption.innerHTML := FCaptionLabel;
end;

procedure TLegoBrick.UpdateElementVisual;
var
  strpadding,strmargin: string;
begin
  inherited;
  if Assigned(ElementHandle) then
  begin
    strpadding := IntToStr(Padding)+'px';
    strmargin := IntToStr(Margin)+'px';

      ElementHandle.style.setProperty('border', 'solid 5px '+ColorToHTML(BorderColor));
      ElementHandle.style.setProperty('padding',strPadding);

    FButton.style.setProperty('float','center');
  end;
end;

end.

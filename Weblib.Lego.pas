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
    FCreated: boolean;
    function HandleBuildClick(Event: TJSMouseEvent): Boolean; virtual;
    procedure SetBorderColor(const Value: TColor); reintroduce;
    procedure SetPadding(const Value: integer);

// My protected methods here
protected
    procedure DoBuild; virtual;
    function CreateElement: TJSElement; override;
    procedure UpdateElementVisual; override;
    procedure UpdateElementData; override;
    procedure BindEvents; override;

// My public methods here
public
    procedure CreateInitialize; override;

// My published properties and events here
published
    property Align;
    property Anchors;
    property BorderColor: TColor read FBorderColor write SetBorderColor;
    property ElementFont;
    property ElementID;
    property ElementPosition;
    property Padding: integer read FPadding write SetPadding;
    property OnBuild: TNotifyEvent read FOnBuild write FOnBuild;

end;

//This is where the magic happens
implementation

//Eventbinding, so clicking a button makes sense
procedure TLegoBrick.BindEvents;
begin
    FButton.addEventListener('click', @HandleBuildClick);
end;

//This literally creates the SPAN, that hold the div for the title and our button
function TLegoBrick.CreateElement: TJSElement;
var
  br: TJSElement;
begin
  FCreated := true;
  Result := document.createElement('SPAN');

  //My baby needs a title
  FCaption := TJSHTMLElement(document.createElement('DIV'));

  Result.appendChild(FCaption);

  //Let's get some spacing between our caption and button
  br := document.createElement('BR');
  Result.appendChild(br);

  //Time to add the button, give it an ID and perhaps some text
  FButton := TJSHTMLElement(document.createElement('BUTTON'));
  FButton['id'] := Name + 'btnId';
  Result.appendChild(FButton);
  FButton.innerHTML := 'Build';

end;

//Specify the look here
procedure TLegoBrick.CreateInitialize;
begin
  inherited;

  //Creativity is intelligence having fun
  FCaptionLabel := 'Build With Bricks';

  //Can you guess my favorite color?
  Color := clSkyBlue;
  FBorderColor := clWebDeepskyblue;

  FPadding := 30;

  //Be there or be square
  Height := 150;
  Width := 150;
end;

//Makes sure something happens when the button is clicked
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

procedure TLegoBrick.SetPadding(const Value: integer);
begin
  if (FPadding <> Value) then
  begin
    FPadding := Value;
    UpdateElementVisual;
  end;
end;

procedure TLegoBrick.UpdateElementData;
begin
  inherited;
  FCaption.innerHTML := FCaptionLabel;
end;

procedure TLegoBrick.UpdateElementVisual;
var
  strpadding: string;
begin
  inherited;
  if Assigned(ElementHandle) then
  begin
    strpadding := IntToStr(Padding)+'px';

    ElementHandle.style.setProperty('border', 'solid 5px '+ColorToHTML(BorderColor));
    ElementHandle.style.setProperty('padding',strPadding);

    FButton.style.setProperty('float','right');
  end;
end;

end.

unit Weblib.Lego;
//Core Source

interface

uses
Classes, WEBLib.Controls, Web;

//TCustomControl is my tabula rasa
//A blank canvas that would make Bob Ross jealous
//There are no mistakes, only happy accidents.
type
    TLegoBrick = Class(TCustomControl)

// My private variables & methods here
private
FButton: TJSHTMLElement;
function HandleLoginClick(Event: TJSMouseEvent): Boolean; virtual;

// My protected methods here
protected
function CreateElement: TJSElement; override;
procedure BindEvents; override;

// My public methods here
public

// My published properties and events here
published


end;

//This is where the magic happens
implementation


procedure TLegoBrick.BindEvents;
begin

FButton.addEventListener('click', @HandleLoginClick);

end;

//Override the CreateElement function to create an HTML DIV element
function TLegoBrick.CreateElement: TJSElement;
 begin
    Result := document.createElement('DIV'); 
    FButton := TJSHTMLElement(document.createElement('BUTTON'));
    Result.appendChild(FButton);
 end;

function TLegoBrick.HandleLoginClick(Event: TJSMouseEvent): Boolean;
begin
  Result := true;
end;



end.
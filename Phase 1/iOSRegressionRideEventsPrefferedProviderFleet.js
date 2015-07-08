//From I'm Ready To Go!/Pick Me Up Later
var target = UIATarget.localTarget();
var window = target.frontMostApp().mainWindow();

//Book a Ride
window.buttons()[2].tap();
window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
target.frontMostApp().mainWindow().searchBars()[0].searchBars()[0].tap();
target.frontMostApp().mainWindow().tableViews()[1].tapWithOptions({tapOffset:{x:0.64, y:0.07}});

//From Fleet selection
while (!window.staticTexts()["Fleet Selection"]){
    //do nothing
}
window.tableViews()[1].cells()["Alexandria Yellow Cab"].tap();
window.buttons()["Book Ride"].tap();
window.buttons()["Confirm"].tap();
target.delay(1);
window.buttons()["Got it"].tap();


//Make current fleet preferred provider
window.buttons()["Settings"].tap();
window.tableViews()[0].cells()["Add Preferred Provider"].tap();
if (window.staticTexts()["Add Preferred Provider"].isValid()){
    UIALogger.logPass("Confirmation popup displayed");
}
else{
    UIALogger.logFail("No confirmation popup displayed");
}
window.buttons()["Yes"].tap();

//Check to see if P.P. status persists
window.buttons()["Settings"].tap();
window.tableViews()[0].cells()["Preferred Providers"].tap();
if (window.tableViews()[0].cells()["Alexandria Yellow Cab"].isValid()){
    UIALogger.logPass("AYC properly saved as a preferred provider");
}
else{
    UIALogger.logFail("Not displaying AYC as a preferred provider");
}
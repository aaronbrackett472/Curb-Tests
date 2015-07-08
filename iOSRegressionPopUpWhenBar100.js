
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

//book a ride
window.buttons()[2].tap();
target.delay(2);
target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
window.searchBars()[0].tap();
window.searchBars()[0].setValue("5904 Richmond Highway, Alexandria, Virginia");
app.keyboard().typeString("\n");
while (!window.staticTexts()["Fleet Selection"].isValid()){
    //Wait for fleets to be found
}
window.tableViews()[1].cells()["Alexandria Yellow Cab"].tap();
target.delay(2);
window.buttons()["Book Ride"].tap();
window.buttons()["Confirm"].tap();
while (!window.buttons()["Got it"].isValid()){
    //wait for app to load
}
window.buttons()["Got it"].tap();

//Wait around for the bar to fill
target.delay(270);

//Check the popup
if (window.staticTexts()["Cancel Ride"].isValid() || 
    window.staticTexts()["We're Sorry"].isValid()){
    UIALogger.logPass("Cancel Ride screen popped up at the right time");
}
else{
    UIALogger.logFail("Cancel screen did not appear");
}
if (window.buttons()["Cancel Ride"].isValid() &&
    window.buttons()["Keep Looking"].isValid()){
    UIALogger.logPass("Buttons for cancelling/keep looking displayed properly");
}
else{
    UIALogger.logFail("Buttons did not display properly");
}

//Check out these cancel rides options
window.buttons()[4].tap();//There are two "cancel rides", this is the one we want
window.buttons()["Other..."].tap();
window.scrollViews()[0].textViews()[0].tap();
app.keyboard().typeString("UI Automated testing cancel options\n");
window.scrollViews()[0].buttons()["Submit"].tap();
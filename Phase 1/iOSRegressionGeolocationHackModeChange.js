//From I'm Ready to Go/Pick Me Up later
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

//Go into hack mode
window.buttons()[3].tap()//hidden hm button
window.scrollViews()[0].textFields()[0].setValue("2ez2btru");
window.scrollViews()[0].buttons()["Enter Hack Mode"].tap();

//Open up the location screen
window.buttons()["Settings"].tap();
window.tableViews()[0].cells()["Location"].tap();

//Choose NY
window.tableViews()[0].cells()["New York - Manhattan"].tap();
window.buttons()["Close"].tap();
window.buttons()["Close Menu"].tap();
if (window.images()["curb_menu_bg"].isValid()){
    UIALogger.logPass("Correctly displayed opening screen after hacking location");
}
else{
    UIALogger.logFail("'Did not display opening screen properly after hacking location");
}

//Verify location meaningfully changed
window.buttons()[2].tap();
window.logElementTree();
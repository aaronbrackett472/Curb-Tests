
var target = UIATarget.localTarget();
var window = target.frontMostApp().mainWindow();

//Ready to go
window.buttons()[2].tap()
if (window.navigationBars()[0].staticTexts()["Pickup Location"].isValid()){
    UIALogger.logPass("Pickup location screen displayed properly");
}
else{
    UIALogger.logFail("Failed to display pickup location screen");
}

//Selecting an address
window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
window.buttons()["Search for Location. Double Tap to start searching"].doubleTap();
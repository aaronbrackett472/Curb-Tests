
var target = UIATarget.localTarget();
var window = target.frontMostApp().mainWindow();

//Ready to go
window.buttons()[2].tap()
if (window.staticTexts()["Pickup Location"].isValid()){
    UIALogger.logPass("Pickup location screen displayed properly");
}
else{
    UIALogger.logFail("Failed to display pickup location screen");
}

//Selecting an address
window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
//target.tapWithOptions({x:50, y:50});
window.buttons()["Search For Location, Double Tap to start searching"].tap();
target.frontMostApp().mainWindow().searchBars()[0].searchBars()[0].tap();
target.frontMostApp().mainWindow().tableViews()[1].cells()[0].tap();
target.frontMostApp().mainWindow().tableViews()[1].cells()[0].tap();
//target.tap({x:349.50, y:346.00});
target.frontMostApp().mainWindow().tableViews()[1].cells()["Add New Card"].tap();
target.frontMostApp().mainWindow().elements()[7].tapWithOptions({tapOffset:{x:0.63, y:0.49}});
target.frontMostApp().mainWindow().buttons()["Book Ride"].tap();
target.frontMostApp().mainWindow().buttons()["Confirm"].tap();
target.frontMostApp().mainWindow().buttons()["Got it"].tap();
target.frontMostApp().mainWindow().buttons()["Settings"].tap();
target.frontMostApp().mainWindow().tableViews()[0].tapWithOptions({tapOffset:{x:0.83, y:0.79}});
target.frontMostApp().mainWindow().buttons()["Yes"].tap();
target.frontMostApp().mainWindow().buttons()["Already have an account? Sign in!"].tap();
target.frontMostApp().mainWindow().textFields()[0].textFields()[0].tap();
target.frontMostApp().mainWindow().buttons()["Sign In"].tap();
target.frontMostApp().mainWindow().buttons()["Settings"].tap();
target.frontMostApp().mainWindow().tableViews()[0].tapWithOptions({tapOffset:{x:0.78, y:0.13}});

                                    
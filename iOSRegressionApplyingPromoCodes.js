//From Ready to Go/Pick Me Up Later
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

//Go to Settings
window.buttons()["Settings"].tap();

//Go to Promos and credits
window.tableViews()[0].cells()["Promos & Credits"].tap();

//Test to see if keyboard opens with no credits
if (app.keyboard().isValid()){
    UIALogger.logPass("Keyboard was open upon entering page with no credits");
}
else{
    UIALogger.logFail("Keyboard was not open when opening P&C page");
}

var promoField = window.scrollViews()[0].textFields().firstWithValueForKey("Enter promo code", "value");

//Enter in incorrect Promo Code
promoField.setValue("thisshouldnotwork");
app.windows()[2].buttons()["Apply code"].tap();
if (window.scrollViews()[0].textFields().firstWithValueForKey("Invalid code","value").isValid()){
    UIALogger.logPass("Invalid code properly handled");
}
else{
    UIALogger.logFail("Did not display Invalid code in the text field");
}
window.scrollViews()[0].buttons()["curb icon x sml"].tap();

//Enter in the correct Promo Code
promoField.setValue("wiltest");
target.frontMostApp().windows()[2].buttons()["Apply code"].tap();
window.buttons()[2].tap();//I think this button is "Ok", haven't tested yet
if (window.scrollViews()[0].textFields()[0].value() == "Success" &&
    window.scrollViews()[0].staticTexts()["$80.00"].isValid()){
    UIALogger.logPass("Total credits and success displayed");
}
else{
    UIALogger.logFail("Total amount of credits is incorrect or not being displayed");
}
var latestRedemption = window.scrollViews()[0].tableViews()[0].cells()[0];
if (latestRedemption.staticTexts()["$80.00"].isValid() &&
    latestRedemption.staticTexts()["This is a Dev Test Code that will make you rich"].isValid()){
    UIALogger.logPass("Redemption displaying accurately in promo history");
}
else{
    UIALogger.logFail("Latest redemption is not the one just completed");
}
    


var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

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
target.delay(1);//loading options
window.tableViews()[1].cells()[0].tap();
while (!window.staticTexts()["Fleet Selection"].isValid()){
    //Wait for fleets to be found
}
UIALogger.logPass("Correctly displayed Fleet Selection screen");

//Select Alexandria Yellow Cab
window.tableViews()[1].cells()["Alexandria Yellow Cab"].tap();
if (window.staticTexts()["Confirmation"].isValid()){
    UIALogger.logPass("Confirmation screen displayed");
}
else{
    UIALogger.logFail("Did not display confirmation screen");
}
if (window.elements()["PICK-UP Location: 5904 Richmond Hwy\n Alexandria VA"] &&
    window.elements()["Pickup time: Now"] &&
    window.elements()["Fleet: Alexandria Yellow Cab"]){
    UIALogger.logPass("Confirmation Details are correct");
}
else{
    UIALogger.logFail("Detail(s) on the confirmation page incorrect");
}

//Select the Payment arrow
window.images()["curb_forward_icon"].tap();

/* If you have a credit card on file, you should be taken to the credit card screen
 * But if not, you'll be taken directly to add a credit card. 
 */

app.keyboard().typeString("378282246310005");//Valid Amex Card Data from Wiki
app.keyboard().typeString("722");//Random expiration date
app.keyboard().typeString("4325");//Random CVV
app.keyboard().typeString("22303");//AVA zip code

if (window.staticTexts()["AMEX - 0005 + Applicable Fees"].isValid()){
    UIALogger.logPass("Credit card is now the form of payment");
}
else{
    UIALogger.logFail("Payment method did not change to the new credit card");
}

//Log out log back in
window.buttons()["Settings"].tap();
window.tableViews()[0].cells()["Logout"].tap();
window.buttons()["Yes"].tap();
var email = "curbautotests@gmail.com";
var pass = "aaaaaa";
window.staticTexts()["Sign in!"].tap();
window.textFields()[0].setValue(email);
window.secureTextFields()[0].setValue(pass);
window.buttons()["Sign In"].tap();

//Check if card persists
window.buttons()["Settings"].tap();
window.tableViews()[0].cells()["Credit Cards"].tap();

window.logElementTree();

if (window.tableViews()[0].cells()["Card 1 of 2: AMEX ending in: 0005"].isValid()){
    UIALogger.logPass("Credit card infor persisted after logging out and then back in");
}
else{
    UIALogger.logFail(" Previously entered credit card now gone");
}
                                    
//From I'm Ready to Go Pick me up later
var target = UIATarget.localTarget();
var window = target.frontMostApp().mainWindow();

//Ready to go
window.buttons()[2].tap();
target.delay(1);

//Search DCA
window.searchBars()[0].setValue("DCA");
target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
target.frontMostApp().mainWindow().searchBars()[0].searchBars()[0].tap();
target.frontMostApp().keyboard().typeString("\n");

//Tap pick me up here
target.tap({x:209.00, y:335.00});//For some reason, this has no element attached to it

//Check for terms
if (window.buttons()["Term A, 1st Curb"].isValid() &&
    //window.buttons()["Term B, Door 4, 2nd Curb"].isValid() && //commented out because curb isnt capitalized
    window.buttons()["Term C, Door 11, 2nd Curb"].isValid()){
    UIALogger.logPass("Properly displayed choices for terminals");
}
else{
    UIALogger.logFail("Terminals missing or incorrect");
}

//Check confirmation screen
window.buttons()["Term A, 1st Curb"].tap();
if (window.staticTexts()["Confirmation"].isValid()){
    UIALogger.logPass("Went to confirmation screen after choosing a terminal");
}
else{
    UIALogger.logFail("Did not go to confirmation screen after choosing a terminal");
}
if (window.elements()["PICK-UP Location: Term A, 1st Curb \n 1 Aviation Circle, Arlington VA"].isValid()){
    UIALogger.logPass("Correct address displayed");
}
else{
    UIALogger.logFail("Address for airport terminal not right");
}
//From "I'm Ready to Go/Pick Me Up Later"

//Get the window element
var target = UIATarget.localTarget();

var window = target.frontMostApp().mainWindow();

//Go to settings
window.buttons()[1].tap();

//Go to profile
window.tableViews()[0].cells()["Profile"].tap();


//Settings fields
var nameField = window.tableViews()[0].cells()[0].textFields()[0];
var emailField = window.tableViews()[0].cells()[1].textFields()[0];
var phoneField = window.tableViews()[0].cells()[2].textFields()[0];

//Get current values
var currName = nameField.value();
var currEmail = emailField.value();
var currPhone = parseInt(phoneField.value());

//Change Values
var newName = currName + "a";
nameField.setValue(newName);
var newEmail = "a" + currEmail;
emailField.setValue(newEmail);
if (currPhone == 9999999999){
    var newPhone = currPhone-1;
}
else{
    var newPhone = currPhone+1;
}
phoneField.setValue(newPhone);


//Check values
function checkValues(){
    //name
    if (nameField.value() == newName){
       UIALogger.logPass("Name updated successfully");
    }
    else if(nameField.value() == currName){
        UIALogger.logFail("Name failed to change");
    }
    else{
        UIALogger.logFail("Name changed in unexpected ways");
    }
    //email
    if (emailField.value() == newEmail){
        UIALogger.logPass("Email updated successfully");
    }
    else if(emailField.value() == currEmail){
        UIALogger.logFail("Email failed to change");
    }
    else{
        UIALogger.logFail("Email changed in unexpected ways");
    }
    //phone
    if (phoneField.value() == newPhone){
        UIALogger.logPass("Phone updated successfully");
    }
    else if(phoneField.value() == currPhone){
        UIALogger.logFail("Phone failed to change");
    }
    else{
       UIALogger.logFail("Phone changed in unexpected ways");
    }
}
checkValues();

//Save settings
var saveButton = window.buttons()["Done Editing"];
saveButton.tap();

//Back and go back in

target.delay(1);//wait for the page to reload
window = target.frontMostApp().mainWindow();//Because of refresh, need to reacquire window
var backButton = window.buttons()["Back"];
backButton.tap();
window.tableViews()[0].cells()["Profile"].tap();
checkValues();
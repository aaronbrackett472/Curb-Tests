//From Curb signin/signup screen
var target = UIATarget.localTarget();
var window = target.frontMostApp().mainWindow();

//Go to Sign-In screen
window.buttons()["Sign In"].tap();

//Go to Reset Password
window.buttons()["Reset Password"].tap();

//Test a fake account
target.delay(1);
window.textFields()[0].setValue("shouldntwork");
target.frontMostApp().logElementTree();
window.buttons()["Reset Password"].tap();
if (window.staticTexts()["Invalid Email"]){
    UIALogger.logPass("Correctly handled invalid email");
}
else{
    UIALogger.logFail("No 'Invalid Email' message for an improperly formatted email");
}
window.buttons()[4].tap();

//This is a gmail I set up specifically to test all email features. Emails are not set up to 
//be sent yet, however 
window.textFields()[0].setValue("curbautotests@gmail.com");
window.buttons()["Reset Password"].tap();
if (window.staticTexts()["Password has been reset"]){
    UIALogger.logPass("Messaged user when email was 'sent'");
}
else{
    UIALogger.logFail("No message to user when password should have been 'sent'");
}
window.buttons()[4].tap();
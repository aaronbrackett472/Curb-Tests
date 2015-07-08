//From Signin/signup
var target = UIATarget.localTarget();
var window = target.frontMostApp().mainWindow();

//Starting from step 5
var pageIndicator = window.pageIndicators()[0];

for (var i = 0; i < pageIndicator.pageCount()-1; i++){
    window.logElementTree();
    UIALogger.logMessage("Current Page: " + pageIndicator.pageIndex());
    if (pageIndicator.pageIndex() != i){
        UIALogger.logFail("Page of Index: "+ i + "failed to load/scroll properly");
    }
    else{
        UIALogger.logPass("Page of Index:" + i + "worked correctly");
    }
    target.delay(1);
    window.scrollViews()[0].scrollRight();
    target.delay(.5);
}

//backwards
for (var i = pageIndicator.pageCount()-1; i > 0; i--){
    window.logElementTree();
    UIALogger.logMessage("Current Page: " + pageIndicator.pageIndex());
    if (pageIndicator.pageIndex() != i){
        UIALogger.logFail("Page of Index: "+ i + "failed to load/scroll properly");
    }
    else{
        UIALogger.logPass("Page of Index:" + i + "worked correctly");
    }
    target.delay(1);
    window.scrollViews()[0].scrollLeft();
    target.delay(.5);
}    

//Go to sign-up screen
window.buttons()["Sign Up"].tap();

//Test a bunch of cases for functionality. Done in a certain order to do error hierarchy

window.logElementTree();
function create(){
    window.scrollViews()[0].buttons()["Create Account"].tap();
}
function closeKeyboard(){
    target.frontMostApp().windows()[2].toolbar().buttons()["Done"].tap();
}

//Case 1: No first name (although everything is blank)
create();
var displayText1 = window.textViews()[0].value();
var expectedText1 = "First Name is required.";
if (displayText1 == expectedText1){
    UIALogger.logPass("Correctly handled missing first name");
}
else if (displayText1 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText1 + "' but displayed '" + displayText1 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 2: No last name (Just First name put in)
window.scrollViews()[0].textFields().firstWithValueForKey("First Name", "value").setValue("Automated");
closeKeyboard();
create();
var displayText2 = window.textViews()[0].value();
var expectedText2 = "Last Name is required.";
if (displayText2 == expectedText2){
    UIALogger.logPass("Correctly handled missing last name");
}
else if (displayText2 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText2 + "' but displayed '" + displayText2 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 3: No phone (First/Last name entered)
window.scrollViews()[0].textFields().firstWithValueForKey("Last Name", "value").setValue("Test");
closeKeyboard();
create();
var displayText3 = window.textViews()[0].value();
var expectedText3 = "Phone Number is required.";
if (displayText3 == expectedText3){
    UIALogger.logPass("Correctly handled missing phone number");
}
else if (displayText3 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText3 + "' but displayed '" + displayText3 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 4: Mobile Number invalid (too short) (First/Last entered, phone field tapped but empty)
create();
var displayText4 = window.textViews()[0].value();
var expectedText4 = "The Phone number you entered is invalid.";
if (displayText4 == expectedText4){
    UIALogger.logPass("Correctly handled invalid phone number");
}
else if (displayText4 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText4 + "' but displayed '" + displayText4 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 5: No email (Everything entered but email and pass)
window.scrollViews()[0].textFields().firstWithValueForKey("+1 ","value").tap();
target.frontMostApp().keyboard().typeString("5555555555");
closeKeyboard();
create();
var displayText5 = window.textViews()[0].value();
var expectedText5 = "Email Address is required.";
if (displayText5 == expectedText5){
    UIALogger.logPass("Correctly handled missing email address");
}
else if (displayText5 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText5 + "' but displayed '" + displayText5 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 6:Invalid Email (No @ sign)
window.scrollViews()[0].textFields().firstWithValueForKey("Email", "value").setValue("test");
closeKeyboard();
create();
var displayText6 = window.textViews()[0].value();
var expectedText6 = "The e-mail you entered is invalid.";
if (displayText6 == expectedText6){
    UIALogger.logPass("Correctly handled invalid email");
}
else if (displayText6 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText6 + "' but displayed '" + displayText6 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 7: Password too short (No pass, but everything else)
window.scrollViews()[0].textFields().firstWithValueForKey("test", "value").setValue("test@gmail.com");
closeKeyboard();
create();
var displayText7 = window.textViews()[0].value();
var expectedText7 = "Password must be at least 6 characters"
if (displayText7 == expectedText7){
    UIALogger.logPass("Correctly handled missing password");
}
else if (displayText7 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText7 + "' but displayed '" + displayText7 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Case 8: Email Already Used
window.scrollViews()[0].secureTextFields()[0].setValue("aaaaaa");
closeKeyboard();
create();
var displayText8 = window.textViews()[0].value();
var expectedText8 = "Would you like to try and login with your email?";
if (displayText8 == expectedText8){
    UIALogger.logPass("Correctly handled already used email");
}
else if (displayText8 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText8 + "' but displayed '" + displayText8 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

//Need to get a unique email
var oldEmail = "test@gmail.com";
while (true){
    var newEmail = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++){
        newEmail += alphabet.charAt(Math.floor(Math.random()*alphabet.length));
    }
    newEmail += "@gmail.com";
    window.scrollViews()[0].textFields().firstWithValueForKey(oldEmail, "value").setValue(newEmail);
    closeKeyboard();
    create();
    var displayText9 = window.textViews()[0].value();
    if (displayText9 != expectedText8){
        break;
    }
    window.buttons()[3].tap();
    oldEmail = newEmail;
}

//Case 9: Already used phone number
var expectedText9 = "Would you like to try and login with your phone number?";
if (displayText9 == expectedText9){
    UIALogger.logPass("Correctly handled already used phone number");
}
else if (displayText9 != null){
    UIALogger.logFail("Text displayed is incorrect. Expected '" + expectedText9 + "' but displayed '" + displayText9 + "'");
}
else{
    UIALogger.logFail("No error text was displayed");
}
window.buttons()[3].tap();

/* At some point, might want to add in additional code to find a unique phone number and create 
 * an account with it. But without checking server side to see if the account was created, I do 
 * not know if it would be worth it to merely check that creating accounts takes you to the right screen
 */

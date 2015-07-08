//From sign-in/sign-up
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

//Go to sign up screen
window.buttons()["Sign Up"].tap();

//Get a unique email to use
function getRandomEmail(){
    var email = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++){
        email += alphabet.charAt(Math.floor(Math.random()*alphabet.length));
    }
    email += "@gmail.com";
    return email;
}
var randomEmail = getRandomEmail();
var randomNumber = String(Math.floor((Math.random()*8888888888)+1111111111));

window.scrollViews()[0].textFields().firstWithValueForKey("First Name", "value").setValue("Card");
window.scrollViews()[0].textFields().firstWithValueForKey("Last Name", "value").setValue("Test");
window.scrollViews()[0].textFields().firstWithValueForKey("Mobile","value").tap();
target.delay(.5);
app.keyboard().typeString(randomNumber);
window.scrollViews()[0].textFields().firstWithValueForKey("Email", "value").setValue(randomEmail);
window.scrollViews()[0].secureTextFields()[0].setValue("aaaaaa");

//Do some checking here to see if you need to get another email

window.scrollViews()[0].buttons()["Create Account"].tap();
target.delay(1);

//Put in some credit card info
app.keyboard().typeString("4111111111111111");//Visa Valid Card Number from Wiki
app.keyboard().typeString("317");//Random Expiration Date
app.keyboard().typeString("940");//Random CVV
app.keyboard().typeString("22303");//AVA zipcode

//Check if card persists 
window.buttons()["Settings"].tap();
window.tableViews()[0].cells()["Credit Cards"].tap();
target.delay(1);//wait a little for card to load
if (window.tableViews()[0].cells()["Card 1 of 2: VISA ending in: 1111"].isValid()){
    UIALogger.logPass("Credit card from registering persists");
}
else{
    UIALogger.logFail("Not displaying credit card entered upon registering");
}

//Adding credit card through the normal cc page
window.logElementTree();
window.tableViews()[0].cells()["Add New Card"].tap();

app.keyboard().typeString("5555555555554444");//Mastercard Valid Card Number from Wiki
app.keyboard().typeString("424");//Random Expiration Date
app.keyboard().typeString("132");//Random CVV
app.keyboard().typeString("22303");//AVA zipcode


//Check if card persists 
if (window.tableViews()[0].cells()["Card 2 of 3: MC ending in: 4444"].isValid()){
    UIALogger.logPass("Credit card from settings persists");
}
else{
    UIALogger.logFail("Not displaying credit card added on CC page");
}

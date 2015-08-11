//Get those variables
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

//Copy and pasting in the other scripts, js has no import
function testUserInputsCase1(){
    //From Signin/signup

    //Starting from step 5
    var pageIndicator = window.pageIndicators()[0];

    for (var i = 0; i < pageIndicator.pageCount()-1; i++){
        if (pageIndicator.pageIndex() != i){
            UIALogger.logFail("Page of Index: "+ i + " failed to load/scroll properly");
        }
        else{
            UIALogger.logPass("Page of Index: " + i + " worked correctly");
        }
        target.delay(1);
        window.scrollViews()[0].scrollRight();
        target.delay(.5);
    }

    //backwards
    for (var i = pageIndicator.pageCount()-1; i > 0; i--){
        if (pageIndicator.pageIndex() != i){
            UIALogger.logFail("Page of Index: "+ i + " failed to load/scroll properly");
        }
        else{
            UIALogger.logPass("Page of Index: " + i + " worked correctly");
        }
        target.delay(1);
        window.scrollViews()[0].scrollLeft();
        target.delay(.5);
    }    

    //Go to sign-up screen
    window.buttons()["Sign Up"].tap();

    //Test a bunch of cases for functionality. Done in a certain order to do error hierarchy

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

    //Case 4: Mobile Number invalid (too short) 
    window.scrollViews()[0].textFields().firstWithValueForKey("Mobile","value").tap();
    target.frontMostApp().keyboard().typeString("5");
    closeKeyboard();
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
    window.scrollViews()[0].textFields().firstWithValueForKey("5","value").tap();
    target.frontMostApp().keyboard().typeString("555555555");
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

    //To handle the "can we text you" alert
    UIATarget.onAlert = function onAlert(alert){
        alert.collectionViews()[0].cells()["YES"].tap();
        return true;
    }
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
}
function testUserInputsCase3(){
    //From "I'm Ready to Go/Pick Me Up Later"

    //Go to settings
    window.buttons()[1].tap();

    //Go to profile
    window.tableViews()[0].cells()["Profile"].tap();


    //Settings fields
    var nameField = window.tableViews()[0].cells()[0].textFields()[0];
    var lnameField = window.tableViews()[0].cells()[0].textFields()[1];
    var emailField = window.tableViews()[0].cells()[1].textFields()[0];
    var phoneField = window.tableViews()[0].cells()[2].textFields()[0];

    //Get current values
    var currName = nameField.value();
    var currLName = lnameField.value();
    var currEmail = emailField.value();
    var currPhone = parseInt(phoneField.value());

    //Change Values
    var newName = currName + "a";
    nameField.setValue(newName);
    var newLName = currLName + "a";
    lnameField.setValue(newLName);
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
        //first name
        if (nameField.value() == newName){
           UIALogger.logPass("First Name updated successfully");
        }
        else if(nameField.value() == currName){
            UIALogger.logFail("First Name failed to change");
        }
        else{
            UIALogger.logFail("First Name changed in unexpected ways");
        }
        //last name
        if (lnameField.value() == newLName){
            UIALogger.logPass("Last Name updated successfully");
        }
        else if(lnameField.value() == currLName){
            UIALogger.logFail("Last Name failed to change");
        }
        else{
            UIALogger.logFail("Last Name changed in unexpected ways");
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

    target.delay(3);//wait for the page to reload
    var backButton = window.buttons()["Back"];
    backButton.tap();
    window.tableViews()[0].cells()["Profile"].tap();
    checkValues();
}
function testUserInputsCase4(){
	//From Curb signin/signup screen

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
}
function testSettings(){
    //From the I'm Ready to Go/Pick Me Up Later

    //Go to Settings
    window.buttons()[1].tap();

    //Test the About Page
    window.tableViews()[0].cells()["About"].tap();
    var aboutPage = window.scrollViews()[0].webViews()[0];
    if (aboutPage.staticTexts()["Our Mission"].isValid() && aboutPage.links()["Contact"].isValid()){
        UIALogger.logPass("Believe to have loaded the about page correctly");
    }
    else{
        UIALogger.logFail("About page was not loaded correctly");
    }
    window.buttons()["Back"].tap();

    //Test the Terms of Use Page
    window.tableViews()[0].cells()["Terms of Use"].tap();
    var termsPage = window.scrollViews()[0].webViews()[0];
    if (termsPage.links()["gocurb.com"].isValid()){
        UIALogger.logPass("Believe to have loaded the terms of use correctly");
    }
    else{
        UIALogger.logFail("Did not load the terms of use correctly");
    }
    window.buttons()["Back"].tap();

    //Test the Support Page
    window.tableViews()[0].cells()["Support"].tap();
    var supportPage = window.scrollViews()[0].webViews()[0];
    if (supportPage.links()["I need help"].isValid() && supportPage.links()["I have feedback"].isValid()){
        UIALogger.logPass("Believe to have loaded the support page correctly");
    }
    else{
        UIALogger.logFail("Did not load the support page correctly");
    }
    window.buttons()["Back"].tap();

    //Test Earn Free Rides
    window.tableViews()[0].cells()["Earn Free Rides"].tap();
    var codeDisplay = window.staticTexts()[3].value();
    if (codeDisplay.search("Your Code:") != -1){
        UIALogger.logPass("Promo Code appears to be properly displayed");
    }
    else{
        UIALogger.logFail("Could not find promo code");
    }

    /* The below tests are written for a simulated iOS Device. As such, SMS, Twitter
     * and Facebook will all not work. Instead, the Automated Test checks for the correct
     * error message, and assumes that if that displays, then it would have worked if it 
     * had been connected to the various services
     */

    var expectedAlert = 0;//0 for none expected, 1 for sms, 2 for twitter, 3 for fb
    UIATarget.onAlert = function onAlert(alert){
        var title = alert.name();
        var message = alert.scrollViews()[0].staticTexts()[1].name();
        switch (expectedAlert){
            case 1:
                if (title == "SMS not supported"){
                    UIALogger.logPass("Proper alert for no sms, assumed working");
                }
                else{
                    UIALogger.logFail("Incorrect alert shown for no sms");
                }
                alert.collectionViews()[0].cells()[0].buttons()["Ok"].tap();
                return true;
                //expectedAlert = 0;
            case 2:
                if (message == "Please connect by going to your phone's Settings and tap Twitter to log in."){
                    UIALogger.logPass("Proper alert for no Twitter, assumed working");
                }
                else{
                    UIALogger.logFail("Incorrect alert shown for no Twitter");
                }
                alert.collectionViews()[0].cells()[0].buttons()["Ok"].tap();
                return true;
                //expectedAlert = 0;
            case 3:
                if (message == "Please connect by going to your phone's Settings and tap Facebook to log in."){
                    UIALogger.logPass("Proper alert for no Facebook, assumed working");
                }
                else{
                    UIALogger.logFail("Incorrect alert shown for no Facebook");
                }
                alert.collectionViews()[0].cells()[0].buttons()["Ok"].tap();
                return true;
                //expectedAlert = 0;
            default:
                UIALogger.logMessage("Got alert: " + title + " with message: " + message);
        }
        return false;
    }

    //SMS
    expectedAlert = 1;
    window.buttons()["TXT"].tap();
    target.delay(2);

    //Twitter
    expectedAlert = 2;
    window.buttons()["Twitter"].tap();
    target.delay(2);

    //Facebook
    expectedAlert = 3;
    window.buttons()["Facebook"].tap();
    target.delay(2);

    expectedAlert = 0;//Now that we are no longer expecting alerts

    //Email (should actually pull up message)
    window.buttons()["Mail"].tap();
    var subject = window.scrollViews()[0].textFields()["subjectField"].value();
    UIALogger.logMessage(subject);
    if (subject == "Here's $10 off your Curb Ride."){
        UIALogger.logPass("Email started with the correct subject");
    }
    else{
        UIALogger.logFail("Email either didn't come up or has wrong subject");
    }
    window.navigationBars()[0].buttons()["Cancel"].tap();
    target.frontMostApp().actionSheet().collectionViews()[0].cells()["Delete Draft"].tap();

    //iBeacon (Should get a message about activating Bluetooth
    window.buttons()["iBeacon"].tap();
    if (window.scrollViews()[0].staticTexts()["iBeacon"].isValid()){
        UIALogger.logPass("Correctly showed iBeacon information screen");
    }
    else{
        UIALogger.logFail("iBeacon info screen was not displayed properly");
    }
    window.buttons()["Activate"].tap();
    if (window.staticTexts()["iBeacon Failed to Start"].isValid()){
        UIALogger.logPass("Displayed bluetooth off error, functionality assumed working");
    }
    else{
        UIALogger.logFail("iBeacon error failed to display");
    }
    window.buttons()[4].tap();//Ok Button
}
function testGeoChange(){
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
    target.delay(1);
    if (window.searchBars()[0].value() === "67 E 11th St"){
        UIALogger.logPass("Location appears to have meaningfully changed");
    }
    else{
        UIALogger.logFail("Address not the expected default NY address");
    }
}
function testPreferredProviders(){
	//From I'm Ready To Go!/Pick Me Up Later

	//Book a Ride
	window.buttons()[2].tap();
    target.delay(5);
    while (window.searchBars()[0].value() !== "5904 Richmond Hwy, 22303"){
        window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
    }
	target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
	target.frontMostApp().mainWindow().searchBars()[0].searchBars()[0].tap();
	target.frontMostApp().mainWindow().tableViews()[1].tapWithOptions({tapOffset:{x:0.64, y:0.07}});

	//From Fleet selection
    var tries = 0//How many tries we try to ping the server
	while (!window.staticTexts()["Fleet Selection"].isValid()){
        //Wait for fleets to be found
        //in case it goes back to previous screen
        if (!window.activityIndicators()["In progress"].isValid()){
            tries++;//hit the server and failed
            if (tries >= 3){
                UIALogger.logFail("Client has failed 3 times to get a response from the server in confirming an address, failed to get to Fleet Selection screen");
                break;
            }
            window.searchBars()[0].searchBars()[0].tap();
            app.keyboard().typeString("\n");
        }
	}
	window.tableViews()[1].cells()["Alexandria Yellow Cab"].tap();
   	while (!window.staticTexts()["Confirmation"].isValid()){
        //do nothing
    } 
	window.buttons()["Book Ride"].tap();
    
    //Verify phone number
    /*window.tableViews()[0].cells()[2].textFields()[0].setValue("");
    window.tableViews()[0].cells()[2].textFields()[0].tap();
    app.keyboard().typeString("3018328979");//Aaron Brackett's personal number for now
    window.buttons()["Done Editing"].tap();
    target.delay(60);//Manually answer CURB
    window.buttons()["Back"].tap();*/
    
    //Confirm booking
    //window.buttons()["Book Ride"].tap();
    window.buttons()["Confirm"].tap();
    while (!window.buttons()["Got it"].isValid()){
        //wait for the next screen
    }
	window.buttons()["Got it"].tap();


	//Make current fleet preferred provider
	window.buttons()["Settings"].tap();
	window.tableViews()[0].cells()["Add Preferred Provider"].tap();
	if (window.staticTexts()["Add Preferred Provider"].isValid()){
	    UIALogger.logPass("Confirmation popup displayed");
	}
	else{
	    UIALogger.logFail("No confirmation popup displayed");
	}
	window.buttons()["Yes"].tap();

	//Check to see if P.P. status persists
	window.buttons()["Settings"].tap();
	window.tableViews()[0].cells()["Preferred Providers"].tap();
	if (window.tableViews()[0].cells()["Alexandria Yellow Cab"].isValid()){
	    UIALogger.logPass("AYC properly saved as a preferred provider");
	}
	else{
	    UIALogger.logFail("Not displaying AYC as a preferred provider");
	}
}
function testAddCC1(email){
    //Ready to go
    window.buttons()[2].tap()
    target.delay(2);
    if (window.staticTexts()["Pickup Location"].isValid()){
        UIALogger.logPass("Pickup location screen displayed properly");
    }
    else{
        UIALogger.logFail("Failed to display pickup location screen");
    }

    //Selecting an address
    while (window.searchBars()[0].value() !== "5904 Richmond Hwy, 22303"){
        window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
    }
 
    window.buttons()["Search For Location, Double Tap to start searching"].tap();
    target.frontMostApp().mainWindow().searchBars()[0].searchBars()[0].tap();
    target.delay(1);//loading options
    window.tableViews()[1].cells()[0].tap();
    while (!window.staticTexts()["Fleet Selection"].isValid()){
        //Wait for fleets to be found
        //in case it goes back to previous screen
        if (!window.activityIndicators()["In progress"].isValid()){
            tries++;//hit the server and failed
            if (tries >= 3){
                UIALogger.logFail("Client has failed 3 times to get a response from the server in confirming an address, failed to get to Fleet Selection screen");
                break;
            }
            window.searchBars()[0].searchBars()[0].tap();
            app.keyboard().typeString("\n");
        }
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
    if (window.elements()["PICK-UP Location: 5904 Richmond Hwy \n Alexandria Virginia"].isValid() &&
        window.elements()["Pickup Time: Now"].isValid() &&
        window.elements()["Fleet: Alexandria Yellow Cab"].isValid()){
        UIALogger.logPass("Confirmation Details are correct");
    }
    else{
        UIALogger.logFail("Detail(s) on the confirmation page incorrect");
    }

    //Select the Payment arrow
    window.images()["curb_forward_icon"].tap();
    
    //Go to add credit card screen
    window.tableViews()[1].cells()["Add new payment method"].tap();



    app.keyboard().typeString("378282246310005");//Valid Amex Card Data from Wiki
    app.keyboard().typeString("722");//Random expiration date
    app.keyboard().typeString("4325");//Random CVV
    app.keyboard().typeString("22303");//AVA zip code

    if (window.staticTexts()["American Express - 0005 + Applicable Fees"].isValid()){
        UIALogger.logPass("Credit card is now the form of payment");
    }
    else{
        UIALogger.logFail("Payment method did not change to the new credit card");
    }
/*
    //Log out log back in
    window.buttons()["Settings"].tap();
    window.tableViews()[0].cells()["Logout"].tap();
    window.buttons()["Yes"].tap();
    var pass = "aaaaaa";
    window.staticTexts()["Sign in!"].tap();
    window.textFields()[0].setValue(email);
    window.secureTextFields()[0].setValue(pass);
    window.buttons()["Sign In"].tap();
*/
    // Book ride
    window.buttons()["Book Ride"].tap();
    window.buttons()["Confirm"].tap();
    window.buttons()["Got it"].tap();
    
    //Check if card persists
    window.buttons()["Settings"].tap();
    window.tableViews()[0].cells()["Credit Cards"].tap();
    target.delay(5)
    
    if (window.tableViews()[0].cells()["Card 3 of 3: American Express - 0005"].isValid()){
        UIALogger.logPass("Credit card info persisted after logging out and then back in");
    }
    else{
        UIALogger.logFail("Previously entered credit card now gone");
    }
}
function testAddCC2(){
    //From sign-in/sign-up

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
    function getRandomNumber(){
        var num = String(Math.floor((Math.random()*8888888)+1111111));
        return num;
    }
    var randomEmail = getRandomEmail();
    var randomNumber = getRandomNumber();

    window.scrollViews()[0].textFields().firstWithValueForKey("First Name", "value").setValue("Card");
    window.scrollViews()[0].textFields().firstWithValueForKey("Last Name", "value").setValue("Test");
    window.scrollViews()[0].textFields().firstWithValueForKey("Mobile","value").tap();
    target.delay(.5);
    app.keyboard().typeString("555" + randomNumber);
    window.scrollViews()[0].textFields().firstWithValueForKey("Email", "value").setValue(randomEmail);
    window.scrollViews()[0].secureTextFields()[0].setValue("aaaaaa");

    window.scrollViews()[0].buttons()["Create Account"].tap();
    target.delay(1);
    
    //Do some checking here to see if you need to get another email/phone
    if (window.staticTexts()["Email already registered"].isValid()){
        randomEmail = getRandomEmail();
        window.buttons()["No"].tap();
        window.scrollViews()[0].textFields().firstWithValueForKey("Email", "value").setValue(randomEmail);
        window.scrollViews()[0].buttons()["Create Account"].tap();
        target.delay(1);
    }
    else if (window.staticTexts()["Email already registered"].isValid()){
        randomNumber = getRandomNumber();
        window.buttons()["No"].tap();
        window.scrollViews()[0].textFields().firstWithValueForKey("Mobile","value").tap();
        target.delay(.5);
        app.keyboard().typeString("555" + randomNumber);
        window.scrollViews()[0].buttons()["Create Account"].tap();
        target.delay(1);
    }


    //Put in some credit card info
    app.keyboard().typeString("4242424242424242");//Visa Valid Card Number from Wiki
    app.keyboard().typeString("317");//Random Expiration Date
    app.keyboard().typeString("940");//Random CVV
    app.keyboard().typeString("22303");//AVA zipcode

    //Check if card persists 
    target.delay(2);
    window.buttons()["Settings"].tap();
    window.tableViews()[0].cells()["Credit Cards"].tap();
    target.delay(1);//wait a little for card to load
    window.logElementTree();
    target.delay(1);
    if (window.tableViews()[0].cells()["Card 1 of 1: Visa - 4242"].isValid()){
        UIALogger.logPass("Credit card from registering persists");
    }
    else{
        UIALogger.logFail("Not displaying credit card entered upon registering");
    }

    //Adding credit card through the normal cc page
    window.tableViews()[0].cells()["Add new payment method"].tap();

    var ccNumber = "5555555555554444";//Mastercard Valid Card Number from Wiki
    var expDate = "424";//Random Expiration Date
    var cvv = "132";//Random CVV
    var zipCode = "22303";//AVA zipcode
    app.keyboard().typeString(ccNumber + expDate + cvv + zipCode);


    //Check if card persists 
    window.logElementTree();
    target.delay(10);
    if (window.tableViews()[0].cells()["Card 2 of 2: MasterCard - 4444"].isValid()){
        UIALogger.logPass("Credit card from settings persists");
    }
    else{
        UIALogger.logFail("Not displaying credit card added on CC page");
    }
}
function testPayment(){
    //From I'm Ready to Go/Pick Me Up Later (in Hack Mode)

    //book a ride
    window.buttons()[2].tap();
    target.delay(2);
    target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
    while (window.searchBars()[0].value() !== "5904 Richmond Hwy, 22303"){
        window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
    }
    window.searchBars()[0].tap();
    app.keyboard().typeString("\n");
    while (!window.staticTexts()["Fleet Selection"].isValid()){
        //Wait for fleets to be found
        //in case it goes back to previous screen
        if (!window.activityIndicators()["In progress"].isValid()){
            tries++;//hit the server and failed
            if (tries >= 3){
                UIALogger.logFail("Client has failed 3 times to get a response from the server in confirming an address, failed to get to Fleet Selection screen");
                break;
            }
            window.searchBars()[0].searchBars()[0].tap();
            app.keyboard().typeString("\n");
        }
    }
    window.tableViews()[1].cells()["Alexandria Yellow Cab"].tap();
    target.delay(2);
    window.buttons()["Book Ride"].tap();
    window.buttons()["Confirm"].tap();
    while (!window.buttons()["Got it"].isValid()){
        //wait for app to load
    }
    window.buttons()["Got it"].tap();

    //Pick yourself up and meter on
    function advanceRide(){
        window.buttons()["Settings"].tap();
        window.tableViews()[0].cells()["Set Ride State"].tap();
        target.delay(1);
        target.frontMostApp().mainWindow().buttons()[1].tap();
    }
    advanceRide();//Assign Ride
    while (!window.staticTexts()["Your ride is on the way!"].isValid()){
        //Wait for ride to be assigned
    }
    advanceRide();//Meter on
    while (!window.elements()["Pay Now"].isVisible()){
        //wait for meter to actually turn on
    }

    //Pay and verify
    target.delay(1);
    window.elements()["Pay Now"].tap();
    window.buttons()["Got it"].tap()//this could be incorrect, dont know if i have time
    window.elements()["Pay Now"].tap();
    if (window.staticTexts()["Fare Amount"].isValid()){
        UIALogger.logPass("User is taken to payment screen");
    }
    else{
        UIALogger.logFail("User was not taken to payment screen after hitting pay now");
    }
    target.delay(5)
    app.keyboard().typeString("2200");
    window.buttons()["Next"].tap();
    if (window.staticTexts()["Your Payment"].isValid()){
        UIALogger.logPass("User taken to Your Payment screen after entering fare");
    }
    else{
        UIALogger.logFail("Your payment screen did not display after entering fare");
    }

    /* Helper Function: checkTotal
     * ---------------------------
     * Calculates the total cost based on the given fare and tip, subtractng out
     * the curb credits and checks to make sure its right. 
     */

    function checkTotal(){
        var fare = parseFloat(window.staticTexts()[2].name().replace('$',''));
        var tip = parseFloat(window.staticTexts()[4].name().replace('$',''));
        var docFee = parseFloat(window.staticTexts()[6].name().replace('$',''));
        var curbCredits = parseFloat(window.staticTexts()[9].name().replace('$',''));
        var total = parseFloat(window.staticTexts()[12].name().replace('$',''));
        var actualTotal = (fare+tip+docFee+curbCredits).toFixed(2);
        if (actualTotal == total){
            UIALogger.logPass("Total calculated correctly");
        }
        else{
            UIALogger.logFail("Total was not calculated correctly");
        }
    }


    //Changing tips
    var tipChooser = window.segmentedControls()[0].buttons();
    if (window.staticTexts()[4].name() == "$4.40"){
        UIALogger.logPass("Correct tip displayed for default tip of 20%");
    }
    else{
        UIALogger.logFail("Incorrect tip displayed for default (20%)");
    }
    checkTotal();
    tipChooser["15%"].tap();
    target.delay(1);
    if (window.staticTexts()[4].name() == "$3.30"){
        UIALogger.logPass("Correct tip displayed for 15%");
    }
    else{
        UIALogger.logFail("Incorrect tip displayed for 15%");
    }
    checkTotal();
    tipChooser["25%"].tap();
    target.delay(1);
    if (window.staticTexts()[4].name() == "$5.50"){
        UIALogger.logPass("Correct tip displayed for 25%");
    }
    else{
        UIALogger.logFail("Incorrect tip displayed for 25%");
    }
    checkTotal();
    tipChooser["Custom %"].tap();
    app.keyboard().typeString("00");
    window.buttons()["Apply"].tap();
    if (window.staticTexts()[4].name() == "$0.00"){
        UIALogger.logPass("Correct tip displayed for a custom tip of nothing");
    }
    else{
        UIALogger.logFail("Incorrect tip displayed for a custome tip of nothing");
    }
    checkTotal();

    //Pay
    window.buttons()["Pay Now"].tap()
    while (!window.staticTexts()["Receipt"].isValid()){
        //wait for reciept to load
    }

    //Check to see if info is correct
    if (//window.scrollViews()[0].scrollViews()[0].staticTexts()["$23.50 Credits Applied"].isValid() &&
        window.scrollViews()[0].scrollViews()[0].staticTexts()["Total charged to Credit Card - Visa ending in: 4242 was $0.00"].isValid()){
        UIALogger.logPass("Credits correctly applied, no charge");
    }
    else{
        UIALogger.logFail("Credits not correctly applied, there was a charge");
    }

    //Test out ratings/description
    window.scrollViews()[0].scrollViews()[0].buttons()["Five Stars"].tap();
    window.scrollViews()[0].scrollViews()[0].textViews()[0].tap();
    app.keyboard().typeString("good ride");

    //Change the rating
    window.scrollViews()[0].scrollViews()[0].buttons()["Four Stars"].tap();
    if (window.scrollViews()[0].scrollViews()[0].textViews()[0].value() == "good ride"){
        UIALogger.logPass("Description persists after changing rating to 4 stars");
    }
    else{
        UIALogger.logFail("Description changed after changing stars");
    }

    //Go to details and go back, reverify
    window.segmentedControls()[0].buttons()["DETAILS"].tap();
    window.segmentedControls()[0].buttons()["TOTAL"].tap();
    if (window.scrollViews()[0].scrollViews()[0].textViews()[0].value() == "good ride"){
        UIALogger.logPass("Description persists after changing to details and coming back");
    }
    else{
        UIALogger.logFail("Description changed after changing to details and come back");
    }
    if (window.scrollViews()[0].scrollViews()[0].staticTexts()["Good"].isValid()){
        UIALogger.logPass("Rating persists after changing to details and coming back");
    }
    else{
        UIALogger.logFail("Rating changed after changing to details and come back");
    }
    app.keyboard().typeString("\n");
    window.buttons()["Done"].tap();
}
function testApplyPromo(){
    //From Ready to Go/Pick Me Up Later

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
    while (app.windows()[2].buttons()["Working..."].isValid()){
        //wait for it to decide what to do witht the code
    }
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
    target.delay(2);
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
} 
function testProgressBar100(){
	//From I'm Ready to Go/Pick Me Up Later

	//book a ride
	window.buttons()[2].tap();
	target.delay(2);
	target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
	window.searchBars()[0].tap();
    while (window.searchBars()[0].value() !== "5904 Richmond Hwy, 22303"){
        window.searchBars()[0].setValue("5904 Richmond Hwy, 22303");
    }
	app.keyboard().typeString("\n");
	while (!window.staticTexts()["Fleet Selection"].isValid()){
        //Wait for fleets to be found
        //in case it goes back to previous screen
        var tries = 0;
        if (!window.activityIndicators()["In progress"].isValid()){
            tries++;//hit the server and failed
            if (tries >= 3){
                UIALogger.logFail("Client has failed 3 times to get a response from the server in confirming an address, failed to get to Fleet Selection screen");
                break;
            }
            window.searchBars()[0].searchBars()[0].tap();
            app.keyboard().typeString("\n");
        }
	}
	window.tableViews()[1].cells()["Alexandria Yellow Cab"].tap();
	target.delay(2);
	window.buttons()["Book Ride"].tap();
	window.buttons()["Confirm"].tap();
	while (!window.buttons()["Got it"].isValid()){
	    //wait for app to load
	}
	window.buttons()["Got it"].tap();

	//Wait around for the bar to fill
	target.delay(270);

	//Check the popup
	if (window.staticTexts()["Cancel Ride"].isValid() || 
	    window.staticTexts()["We're Sorry"].isValid()){
	    UIALogger.logPass("Cancel Ride screen popped up at the right time");
	}
	else{
	    UIALogger.logFail("Cancel screen did not appear");
	}
	if (window.buttons()["Cancel Ride"].isValid() &&
	    window.buttons()["Keep Looking"].isValid()){
	    UIALogger.logPass("Buttons for cancelling/keep looking displayed properly");
	}
	else{
	    UIALogger.logFail("Buttons did not display properly");
	}

	//Check out these cancel rides options
	window.buttons()[4].tap();//There are two "cancel rides", this is the one we want
	window.buttons()["Other..."].tap();
	window.scrollViews()[0].textViews()[0].setValue("UI Automated testing cancel options");
	window.scrollViews()[0].buttons()["Submit"].tap();
}
function testAirports(){
	//From I'm Ready to Go Pick me up later

	//Ready to go
	window.buttons()[2].tap();
	target.delay(2);

	//Search DCA
	window.searchBars()[0].setValue("DCA");
    target.delay(2);
	target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
	target.frontMostApp().mainWindow().searchBars()[0].searchBars()[0].tap();
	target.frontMostApp().keyboard().typeString("\n");

	//Tap pick me up here
    target.delay(3);
    target.tap({x:192.67, y:361.00});//For some reason, this has no element attached to it

	//Check for terms
	if (window.tableViews()[1].cells()["DCA - Term A, 1st Curb"].isValid() &&
	    window.tableViews()[1].cells()["DCA - Term B Door 6"].isValid() &&
	    window.tableViews()[1].cells()["DCA - Term C, Door 11, 2nd Curb"].isValid()){
	    UIALogger.logPass("Properly displayed choices for terminals");
	}
	else{
	    UIALogger.logFail("Terminals missing or incorrect");
	}

	//Check confirmation screen
	window.tableViews()[1].cells()["DCA - Term A, 1st Curb"].tap();
    target.delay(2);
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
}

//Other useful helper functions
function backToSISU(){
	window.buttons()["Back"].tap();
}
function backToIRTGPMUL(){
	window.buttons()["Back"].tap();
	window.buttons()["Close Menu"].tap();
}
function getEmail(){
	window.buttons()["Settings"].tap();
	window.tableViews()[0].cells()["Profile"].tap();
    target.delay(1);
	var rawEmail = window.tableViews()[0].cells()[1].name();
	var email = rawEmail.replace("email: ","");
	return email;
}

/* Helper Function: reset
 * -----------------------
 * Changes the number so that other accounts can use the number, deactivates hack mode
 * cancels the ride, and logs out of the account so that the test can be run again. 
 */
 
function reset(){
    window.buttons()["Settings"].tap();
    window.tableViews()[0].cells()["Deactivate Hack Mode"].tap();
    window.buttons()["Cancel Ride"].tap();
    window.buttons()[4].tap();
    window.buttons()["I got another ride"].tap();
    target.delay(10)
    window.buttons()["Settings"];
    window.tableViews()[0].cells()["Logout"];
    window.buttons()["Yes"].tap();
}

//a necessary evil
window.buttons()["Back"].tap();

//Run the Tests 

testUserInputsCase1();
backToSISU();
testUserInputsCase4();
backToSISU();
testAddCC2();
backToIRTGPMUL();
testUserInputsCase3();
backToIRTGPMUL();
testSettings();
backToIRTGPMUL();
testAirports();
target.delay(5);
window.buttons()["Back"].tap();
window.buttons()["Back"].tap();
testPreferredProviders();
window.buttons()["Edit"].tap();
window.tableViews()[0].cells()["Alexandria Yellow Cab"].buttons()["Delete Alexandria Yellow Cab, Tap to call (703) 549-2500"].tap();
window.tableViews()[0].cells()["Alexandria Yellow Cab"].buttons()["Delete"].tap();
window.buttons()["Delete"].tap();
backToIRTGPMUL();//which will now be the map screen
window.buttons()["Cancel Ride"].tap();
window.buttons()[4].tap();
window.buttons()["I got another ride"].tap();
target.delay(3);
testProgressBar100();
target.delay(5);
testGeoChange();
window.buttons()["Back"].tap();
testApplyPromo();
backToIRTGPMUL();
testPayment();
target.delay(2);
var email = getEmail();
backToIRTGPMUL();
testAddCC1(email);
backToIRTGPMUL();
reset();
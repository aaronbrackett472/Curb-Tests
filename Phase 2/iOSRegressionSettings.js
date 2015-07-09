function testSettings(){
    //From the I'm Ready to Go/Pick Me Up Later

    //Go to settings
    window.buttons()[1].tap();

    //Test the about page
    window.tableViews()[0].cells()["About"].tap();
    var aboutPage = window.scrollViews()[0].webViews()[0];
    if (aboutPage.staticTexts()["Our Mission"].isValid() && aboutPage.links()["Contact"].isValid()){
        UIALogger.logPass("Believe to have loaded the about page correctly");
    }
    else{
        UIALogger.logFail("About page was not loaded correctly");
    }
    window.buttons()["Back"].tap();

    //Test the Terms of Use page
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
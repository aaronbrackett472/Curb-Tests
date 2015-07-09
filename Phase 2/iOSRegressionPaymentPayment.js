function testPayment(){
    //From I'm Ready to Go/Pick Me Up Later (in Hack Mode)

    //book a ride
    window.buttons()[2].tap();
    target.delay(2);
    target.frontMostApp().mainWindow().buttons()["Search For Location, Double Tap to start searching"].tap();
    window.searchBars()[0].tap();
    window.searchBars()[0].setValue("5904 Richmond Highway, Alexandria, Virginia");
    app.keyboard().typeString("\n");
    while (!window.staticTexts()["Fleet Selection"].isValid()){
        //Wait for fleets to be found
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
    if (window.staticTexts()["Fare Amount"].isValid()){
        UIALogger.logPass("User is taken to payment screen");
    }
    else{
        UIALogger.logFail("User was not taken to payment screen after hitting pay now");
    }
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
    target.delay(2);
    if (window.staticTexts()["Receipt"].isValid()){
        UIALogger.logPass("User taken to receipt screen");
    }
    else{
        UIALogger.logFail("Receipt screen not properly displayed");
    }

    //Check to see if info is correct
    if (window.scrollViews()[0].scrollViews()[0].staticTexts()["$23.50 Credits Applied"].isValid() &&
        window.scrollViews()[0].scrollViews()[0].staticTexts()["Total charged to VISA - 1111 was $0.00"].isValid()){
        UIALogger.logPass("Credits correctly applied, no charge");
    }
    else{
        UIALogger.logFail("Credits not correctly applied, there was a charge");
    }

    //Test out ratings/description
    window.scrollViews()[0].scrollViews()[0].buttons()["Five Stars"].tap();
    window.scrollViews()[0].scrollViews()[0].textViews()[0].tap();
    app.keyboard().typeString("Had a pretty good ride! Waaaaaaaay better than uber!");

    //Change the rating
    window.scrollViews()[0].scrollViews()[0].buttons()["Four Stars"].tap();
    if (window.scrollViews()[0].scrollViews()[0].textViews()[0].value() == "Had a pretty good ride! Waaaaaaaay better than uber!"){
        UIALogger.logPass("Description persists after changing rating to 4 stars");
    }
    else{
        UIALogger.logFail("Description changed after changing stars");
    }

    //Go to details and go back, reverify
    window.segmentedControls()[0].buttons()["DETAILS"].tap();
    window.segmentedControls()[0].buttons()["TOTAL"].tap();
    if (window.scrollViews()[0].scrollViews()[0].textViews()[0].value() == "Had a pretty good ride! Waaaaaaaay better than uber!"){
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
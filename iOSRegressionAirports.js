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



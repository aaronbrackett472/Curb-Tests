//From I'm Ready To Go!/Pick Me Up Later
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

//Go to Settings
window.buttons()["Settings"].tap();

//Go to Credit Cards
window.tableViews()[0].cells()["Credit Cards"].tap();

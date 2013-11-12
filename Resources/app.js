// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var sitiPreferitiWin = Titanium.UI.createWindow({
	title : 'Tab 1',
	backgroundColor : '#fff'
});
var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'Siti Preferiti',
	window : sitiPreferitiWin
});

var sitiPreferiti = [{title: "La Repubblica", indirizzo: "http://www.repubblica.it", hasDetail:true },
{title: "Google", indirizzo: "http://www.google.it", hasDetail:true },
{title: "La Sicilia", indirizzo: "http://www.lasicilia.it", hasDetail:true }];

var sitiPreferitiTV = Ti.UI.createTableView({
	data: sitiPreferiti
});

sitiPreferitiWin.add(sitiPreferitiTV);

var sitoDetailWindow = Ti.UI.createWindow();
var sitoWebView = Ti.UI.createWebView();

sitoDetailWindow.add(sitoWebView);

sitiPreferitiTV.addEventListener('click', function(e) {
	sitoWebView.url = e.rowData.indirizzo;
	sitoDetailWindow.title = e.rowData.title;
	tab1.open(sitoDetailWindow);
});



//
// create controls tab and root window
//
var localiPreferitiWin = Titanium.UI.createWindow({
	title : 'Tab 2',
	backgroundColor : '#fff'
});
var tab2 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Locali Preferiti',
	window : localiPreferitiWin
});

var localiPreferiti = [
	{title: "Taki", lat: 41.909495, longi: 12.473688, tel: "+39063201750", hasChild: true},
	{title: "Mucca Bischera", lat: 41.956682, longi: 12.566986, tel: "+39068209 82040", hasChild: true}
];

var detailMapWindow = Ti.UI.createWindow();
var detailMapView = Ti.Map.createView({
	region: {
		latitude:41.912497,
		longitude:12.528534,
		latitudeDelta: 0.2,
		longitudeDelta: 0.2
	},
	regionFit: true,
	userLocation: true,
	animate: true
});

detailMapWindow.add(detailMapView);

var localiPreferitiTV = Ti.UI.createTableView({
	data: localiPreferiti
});

localiPreferitiWin.add(localiPreferitiTV);

var ann = Ti.Map.createAnnotation({
	animate: true,
	pincolor: Ti.Map.ANNOTATION_GREEN
});


localiPreferitiTV.addEventListener('click', function(e) {
	ann.longitude = e.rowData.longi;
	ann.latitude = e.rowData.lat;
	ann.title = e.rowData.title;
	ann.subtitle = e.rowData.tel;
	//ann.telefono = e.rowData.tel;
	detailMapView.addAnnotation(ann);
	tab2.open(detailMapWindow);
});

detailMapView.addEventListener('click', function(e) {
	Ti.Platform.openURL("tel:" +e.annotation.subtitle);
	alert("sto chiamando il " + e.annotation.subtitle);
	
});

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

// open tab group
tabGroup.open();

function roster_fill_color(category) {

	// Helper function to find out what color a point in the roster tab should be by accepting a category

	switch (category) {
		case "Religious Associations 宗教":
			return "#a6cee3"
			break;
		case "Geographical Clan Associations 地缘":
			return "#1f78b4"
			break;
		case "Multifunctional Associations 综合":
			return "#b2df8a"
			break;
		case "Female Youth Assications 青年妇女":
			return "#33a02c"
			break;
		case "Cultural Education Assiciations 文教":
			return "#fb9a99"
			break;
		case "Sports Associations 体育联谊":
			return "#e31a1c"
			break;
		case "Charitable Associations 慈善福利":
			return "#fdbf6f"
			break;
		case "Independent Secondary School 独立中学":
			return "#ff7f00"
			break;
		case "Geneological Clan Associations 血缘":
			return "#cab2d6"
			break;
		case "Vocational Associations 业缘":
			return "#6a3d9a"
			break;
		default:
			return "#ffffff"
	}
}

var mini = true;

function toggleSidebar() {
	if (mini) {
		$(".sidebar").css("width", "400px")
		this.mini = false;
	} else {
		$(".sidebar").css("width", "95px")
		this.mini = true;
	}
}

// Init map
var map = L.map('map', {
	preferCanvas: true
}).setView([4.2, 108.00], 6)

L.tileLayer('https://api.mapbox.com/styles/v1/shgis-kennethdean/ckj4dgeskcfpi19qm1bd2tu23/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// init renderer
var renderer = L.canvas({
	padding: 0.5
});

roster_layers = L.layerGroup().addTo(map)

// Load the roster dataset
$.getJSON("./json/MHGIS Masterlist.json", function (data) {

	// Iterate through each point...
	data.forEach(function (item, index) {

		// Load popup to a buffer variable
		var popup_text = "<p>" + item.Name_EN + "</p><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

		UID = item["UID"]

		// Draw the point and attach the popup text
		latlng = [item.latitude, item.longitude]
		var pointer = L.circleMarker(latlng, {
			renderer: renderer,
			radius: 5,
			fillColor: roster_fill_color(item.Category),
			fillOpacity: 0.7,
			weight: 1,
			color: "#000000",
			opacity: 0.3
		}).bindPopup(popup_text, {
			maxWidth: 300,
			closeOnClick: false,
			keepInView: true
		})
		roster_layers.addLayer(pointer)
	})
})

// Load leaflet sidebar
var sidebar = L.control.sidebar({
	autopan: true, // whether to maintain the centered map point when opening the sidebar
	closeButton: true, // whether t add a close button to the panes
	container: 'leaflet-sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
	position: 'left', // left or right
}).addTo(map);

// Load filter page territory checboxes
$.getJSON("./json/MYterritories.json", function (data) {
	for (var row in data) {


		var htmlhead = "<li><details>"
		var summary = "<summary><input class='filter' id='" + data[row]["state_code"] + "' type='checkbox' checked>" + data[row]["state_name"] + "</summary>"
		var terrhead = "<ul>"

		var terrbody = ""

		for (var terr in data[row]["territories"]) {
			var terrentry = "<li><input class='filter' id='" + data[row]["territories"][terr]["code"] + "' type='checkbox' checked>" + data[row]["territories"][terr]["territory_name"] + "</li>"
			terrbody = terrbody + terrentry
		}
		var terrend = "</ul>"
		var htmlend = "</li></details>"

		$(".filter_states").append(htmlhead + summary + terrhead + terrbody + terrend + htmlend)
	}
})

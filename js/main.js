var map = L.map('map', {
	preferCanvas: true
}).setView([4.2, 108.00], 6)

L.tileLayer('https://api.mapbox.com/styles/v1/shgis-kennethdean/ckj4dgeskcfpi19qm1bd2tu23/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Filter
var roster_buffer = {}

// Load points as circle markers

roster_layers = L.layerGroup()

function filter_state(key, operation) {
	// Helper function to identify what entries to fade out (de-selected). Takes three arguments; Firstly, "key" is the field you want to filter. "Operation" has two options: "1" removes items from the list (i.e. un-fades points) and "2" add items to the list (i.e. fades out points)

	// Input validation
	valid_inputs_state = ["Johor", "Kedah", "Kelantan", "Malacca", "NegeriSembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "独立中学", "Sarawak", "Selangor", "Terengganu", "KualaLumpur", "Labuan", "Putrajaya"];

	valid_inputs_category = ["宗教", "地缘", "综合", "青年妇女", "文教", "体育联谊", "慈善福利", "独立中学", "血缘", "业缘"];

	category = ""

	if (valid_inputs_state.includes(key)) {
		category = "Region"
	} else if (valid_inputs_category.includes(key)) {
		category = "Category"
	} else {
		console.error("Entry '", key, "' is invalid");
		return 1;
	}

	if (operation == 1) {
		$.getJSON("./json/MHGIS Masterlist.json", function (data) {
			data.forEach(function (entry, index) {
				if (entry[category] == key) {

					if (roster_buffer[entry["UID"]] > 1) {
						roster_buffer[entry["UID"]] = roster_buffer[entry["UID"]] - 1
					} else if (roster_buffer[entry["UID"]] == 1) {
						delete roster_buffer[entry["UID"]]
					}
				}
			})
		})
	} else if (operation == 2) {
		$.getJSON("./json/MHGIS Masterlist.json", function (data) {
			data.forEach(function (entry, index) {
				if (entry[category] == key) {

					if (entry["UID"] in roster_buffer) {
						roster_buffer[entry["UID"]] = roster_buffer[entry["UID"]] + 1
					} else {
						roster_buffer[entry["UID"]] = 1
					}
				}
			})
		})
	}
}

roster_layers = L.layerGroup().addTo(map)

function load_roster(renderer) {

	$.getJSON("./json/MHGIS Masterlist.json", function (data) {

		roster_layers.clearLayers()
		data.forEach(function (item, index) {

			var text_string = "<h2>" + item.Name_EN + "</h2><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"


			if (!(roster_buffer[item["UID"]] > 0)) {
				latlng = [item.latitude, item.longitude]
				item["UID"] = L.circleMarker(latlng, {
					renderer: renderer,
					radius: 5,
					fillColor: "#fbb4ae",
					weight: 1,
					color: "#000000",
					opacity: 0.2
				}).bindPopup(text_string, {
					maxWidth: 300,
					closeOnClick: false,
					keepInView: true
				})
				roster_layers.addLayer(item["UID"])
			}
		})
	})
}

$(document).ready(function () {

	//Open sidebar to intro page
	var sidebar = L.control.sidebar({
		autopan: true, // whether to maintain the centered map point when opening the sidebar
		closeButton: true, // whether t add a close button to the panes
		container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
		position: 'left', // left or right
	}).addTo(map);

	sidebar.open('home');

	var renderer = L.canvas({
		padding: 0.5
	});

	//load layers
	load_roster(renderer);
	sidebar.on('content', function (e) {

		console.log(e.id)
		if (e.id == "home") {
			map.addLayer(roster_layers)

		} else if (e.id == "roster") {
			load_roster(renderer)
		}
	})
	// Collaspe button
	$('span.collapse').on('click', function () {
		$(this).parent().find('ul').slideToggle();
	});

	$("input").change(function () {
		if ($(this).is(":checked")) {
			filter_state($(this).attr('id'), 1)
		} else {
			filter_state($(this).attr('id'), 2)
		}
	})

	$("#filter").on('click', function () {
		load_roster(renderer)
	})

})

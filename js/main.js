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
highlight_layer = L.layerGroup().addTo(map)
roster_database = {}



function load_default(renderer) {
	// init map to default state

	$.getJSON("./json/MHGIS Masterlist.json", function (data) {

		roster_layers.clearLayers()
		highlight_layer.clearLayers()
		$("#cardsCont").empty()

		data.forEach(function (item, index) {

			var popup_text = "<h2>" + item.Name_EN + "</h2><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			UID = item["UID"]

			if (!(roster_buffer[item["UID"]] > 0)) {
				latlng = [item.latitude, item.longitude]
				var pointer = item["UID"]
				pointer = L.circleMarker(latlng, {
					renderer: renderer,
					radius: 5,
					fillColor: "#fbb4ae",
					weight: 1,
					color: "#000000",
					opacity: 0.2
				}).bindPopup(popup_text, {
					maxWidth: 300,
					closeOnClick: false,
					keepInView: true
				})
				roster_layers.addLayer(pointer)
			}

			var card_text = "<div class='card' id='" + UID + "'> <ul>" + "<li>" + item.Name_EN + "</li><li>" + item.Name_CH + "</li><li>" + item.Name_ML + "</li><li>Location: " + item.Location + "</li><li>State: " + item.Region + "</li><li> Category: " + item.Category + "</li><li> Source page number" + item.PageNumber + "</li></ul></div>"

			$("#cardsCont").append(card_text)
		})
	})
}


function roster_fill_color(category) {
	switch (category) {
		case "宗教":
			return "#a6cee3"
			break;
		case "地缘":
			return "#1f78b4"
			break;
		case "综合":
			return "#b2df8a"
			break;
		case "青年妇女":
			return "#33a02c"
			break;
		case "文教":
			return "#fb9a99"
			break;
		case "体育联谊":
			return "#e31a1c"
			break;
		case "慈善福利":
			return "#fdbf6f"
			break;
		case "独立中学":
			return "#ff7f00"
			break;
		case "血缘":
			return "#cab2d6"
			break;
		case "业缘":
			return "#6a3d9a"
			break;
		default:
			return "#ffffff"
	}
}

function load_roster(renderer, color) {
	// Function to load selected roster

	$.getJSON("./json/MHGIS Masterlist.json", function (data) {

		roster_layers.clearLayers()
		highlight_layer.clearLayers()
		$("#cardsCont").empty()

		data.forEach(function (item, index) {

			var popup_text = "<h2>" + item.Name_EN + "</h2><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			UID = item["UID"]

			if (!(roster_buffer[item["UID"]] > 0)) {
				latlng = [item.latitude, item.longitude]
				var pointer = item["UID"]
				pointer = L.circleMarker(latlng, {
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
			}

			var card_text = "<div class='card' id='" + UID + "'> <ul>" + "<li>" + item.Name_EN + "</li><li>" + item.Name_CH + "</li><li>" + item.Name_ML + "</li><li>Location: " + item.Location + "</li><li>State: " + item.Region + "</li><li> Category: " + item.Category + "</li><li> Source page number" + item.PageNumber + "</li></ul></div>"

			$("#cardsCont").append(card_text)
		})

		// Selecting points from cards
		var active_card = $(".card")

		$(".card").on('click', function () {
			highlight_layer.clearLayers()
			active_card.css("background-color", "#fff3cb")
			active_card = $(this)
			active_card.css("background-color", "#ff7671")

			var id = active_card.attr("id")
			data.forEach(function (item) {

				var popup_text = "<h2>" + item.Name_EN + "</h2><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"


				if (item["UID"] == id) {
					latlng = [item.latitude, item.longitude]
					var point = L.circleMarker(latlng, {
						renderer: renderer,
						radius: 10,
						fillColor: "#fff500",
						fillOpacity: 1,
						weight: 3,
						color: "#ff0e0e",
						opacity: 1
					}).bindPopup(popup_text, {
						maxWidth: 300,
						closeOnClick: false,
						keepInView: true
					})

					map.flyTo(latlng, 13)

					highlight_layer.addLayer(point)
				}
			})
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
	load_default(renderer);
	sidebar.on('content', function (e) {

		console.log(e.id)
		if (e.id == "home") {
			load_default(renderer)

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

	// Filter button
	$("#filter").on('click', function () {
		load_roster(renderer)
	})
})

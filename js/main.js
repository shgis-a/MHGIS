faded_buffer = {}

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

					if (faded_buffer[entry["UID"]] > 1) {
						faded_buffer[entry["UID"]] = faded_buffer[entry["UID"]] - 1
					} else if (faded_buffer[entry["UID"]] == 1) {
						delete faded_buffer[entry["UID"]]
					}
				}
			})
		})
	} else if (operation == 2) {
		$.getJSON("./json/MHGIS Masterlist.json", function (data) {
			data.forEach(function (entry, index) {
				if (entry[category] == key) {

					if (entry["UID"] in faded_buffer) {
						faded_buffer[entry["UID"]] = faded_buffer[entry["UID"]] + 1
					} else {
						faded_buffer[entry["UID"]] = 1
					}
				}
			})
			
			console.log(map)
		})
	}
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/shgis-kennethdean/ckj4dgeskcfpi19qm1bd2tu23', // stylesheet location
	center: [109.455, 4.109], // starting position [lng, lat]
	zoom: 5 // starting zoom
});

map.on('click', function (e) {
	var features = map.queryRenderedFeatures(e.point, {
		layers: ['mhgis-base'] // replace this with the name of the layer
	});

	if (!features.length) {
		return;
	}

	console.log(features)
	var feature = features[0];

	var popup = new mapboxgl.Popup({
			offset: [0, -15]
		})
		.setLngLat(feature.geometry.coordinates)
		.setHTML('<div class="popup"><h3>' + feature.properties.Name_CH + '</h3><h4>' + feature.properties.Name_ML + '</h4><h4>' + feature.properties.Name_EN + '</h4><ul><li>' + 'State: ' + feature.properties.Region + '</li><li>' + 'Category: ' + feature.properties.Category + '</li><li>' + 'Address: ' + feature.properties.Location + '</li><li>' + 'Source: 《马来西亚华团总名册》pg.' + feature.properties.PageNumber + '</li></ul></div>')
		.addTo(map);
});

// Collaspe button
$('span.collapse').on('click', function () {
	$(this).parent().find('ul').slideToggle();
});

$(document).ready(function () {
	$("input").change(function () {


		if ($(this).is(":checked")) {
			filter_state($(this).attr('id'), 1)
		} else {
			filter_state($(this).attr('id'), 2)
		}
	})
})

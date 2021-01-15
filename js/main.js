var map = L.map('map', {
	preferCanvas: true
}).setView([4.2, 108.00], 6)

all_layers = L.layerGroup()

L.tileLayer('https://api.mapbox.com/styles/v1/shgis-kennethdean/ckj4dgeskcfpi19qm1bd2tu23/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hnaXMta2VubmV0aGRlYW4iLCJhIjoiY2tqMTBpOHl0MDI0YzJ5c2IzOHMyM2V4eCJ9.DFNMWEGdVJkBh9mS2OkrbA', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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

	// Load points as circle markers
	$.getJSON("./json/MHGIS Masterlist.json", function (data) {
		data.forEach(function (item, index) {

			latlng = [item.latitude, item.longitude]
			item["UID"] = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#fbb4ae",
				weight: 1,
				color: "#000000",
				opacity: 0.2
			}).addTo(map).on("click", function () {
				console.log(item)
			})

			all_layers.addLayer(item["UID"])
		})
	})

	sidebar.on('content', function (e) {

		console.log(e.id)
		if (e.id == "home") {
			map.addLayer(all_layers)

		} else if (e.id == "roster") {
			map.removeLayer(all_layers)
		}
	})
})

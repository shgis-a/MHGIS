function intervalAnimation(map, layers) {
	var layersVar = layers._layers
	var keys = Object.keys(layersVar);
	var selectedLayer = layersVar[keys[Math.floor(keys.length * Math.random())]]
	selectedLayer.openPopup();
	map.flyTo(selectedLayer._latlng, 10)

}

$(document).ready(function () {
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

	// Init shared layers
	var layers = L.layerGroup().addTo(map)

	// Load the associations dataset
	$.getJSON("./json/MHGIS Masterlist.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<p>Dataset: Associations</p><p>" + item.Name_EN + "</p><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.latitude, item.longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#377eb8",
				weight: 1,
				color: "#000000",
				opacity: 0.3
			}).bindPopup(popup_text, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: false
			})

			// Add the point to the layer group
			layers.addLayer(pointer)
		})
	})

	// Load the temples dataset
	$.getJSON("./json/temple_georefed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<p>Dataset: Temples</p><p>" + item.Name + "</p><p><b>Notes: </b>" + item.Notes + "</p>" + "</p><p><b>State: </b>" + item.State + "</p><p><b>Address: </b>" + item.Address + "</p>"

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.Latitude, item.Longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#ff7f00",
				weight: 1,
				color: "#000000",
				opacity: 0.3
			}).bindPopup(popup_text, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: false
			})

			// Add the point to the layer group
			layers.addLayer(pointer)
		})
	})

	// Animation every 4 seconds
	const interval = setInterval(function () {
		intervalAnimation(map, layers);
	}, 4000);

})

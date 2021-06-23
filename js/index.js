function intervalAnimation(map, layers) {
	var layersVar = layers._layers
	var keys = Object.keys(layersVar);
	var selectedLayer = layersVar[keys[Math.floor(keys.length * Math.random())]]
	selectedLayer.openPopup();
	map.flyTo(selectedLayer._latlng, 13, {
		animate: true,
		duration: 1.5
	})

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
	$.getJSON("./json/MHGIS Masterlist_processed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<p>Dataset: Associations</p><p>" + item.Name_EN + "</p><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.Latitude, item.Longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#66c2a5",
				fillOpacity: 0.5,
				weight: 1,
				color: "#000000"
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
	$.getJSON("./json/merged_temples.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var html_const = "<p>Dataset: Temples</p><ul>"
			var sources_const = "<li><b>Sources</b>:<ul>"

			var sources = {
				"old": "MHGIS Research(1)",
				"old2": "MHGIS Research(2)",
				"a": "马来西亚华文铭刻萃编-傅吾康",
				"b": "马来西亚华团总名册",
				"c": "一庙一路网站",
				"d": "《走进巴生庙宇》",
				"e": "NUS",
				"f": "马校 RA",
				"g": "马来西亚神庙文化（已不存在）",
				"h": "福建会馆出版物"
			}

			Object.entries(item).forEach(function (line) {
				if (line[0].substring(0, 6) == "source") {
					if (line[1] == "TRUE") {
						sources_const = sources_const + "<li>" + sources[line[0].slice(7)] + "</li>"
					}
				} else if (line[1] != "" && line[1] != null) {

					var line_const = "<li><b>" + line[0] + "</b>: " + line[1] + "</li>"
					html_const = html_const + line_const
				}
			})

			html_const = html_const + sources_const + "</li>"

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.latitude, item.longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#fc8d62",
				fillOpacity: 0.5,
				weight: 1,
				color: "#000000",
				opacity: 1
			}).bindPopup(html_const, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: false
			})

			// Add the point to the layer group
			layers.addLayer(pointer)
		})
	})

	// Load new villages
	$.getJSON("./json/new_village_processed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<p>Dataset: New Villages</p><ul>"
			var popup_suffix = "</ul>"

			var UID = 0

			Object.entries(item).forEach(function (line) {
				var line_buffer = "<li><b>" + line[0] + "</b>: " + line[1] + "</li>"
				popup_text = popup_text + line_buffer
			})

			popup_text = popup_text + popup_suffix

			UID = UID + 1

			// Draw the point and attach the popup text
			latlng = [item.lat, item.lng]
			var pointer = UID
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#8da0cb",
				fillOpacity: 0.5,
				weight: 1,
				color: "#000000",
				opacity: 1
			}).bindPopup(popup_text, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: false
			})

			// Add the point to the layer group
			layers.addLayer(pointer)
		})
	})
})

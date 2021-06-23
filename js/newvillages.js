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

function loadSidebarInfo(dataPoint) {
	sidebar.open('info')

	var html_const = ""

	Object.entries(dataPoint).forEach(function (line) {

		if (line[0].substring(0, 6) == "source") {
			if (line[1] == "TRUE") {
				sources_const = sources_const + "<li>" + sources[line[0].slice(7)] + "</li>"
			}
		} else if (line[1] != "" && line[1] != null) {

			var line_const = "<li><b>" + line[0] + "</b>:" + line[1] + "</li>"
			html_const = html_const + line_const
		}
	})

	html_const = html_const + "</li>"

	$(".point_details").empty().append(html_const)
}

function loadPoints(filtered_terri, filtered_cat) {
	// Function to load roster layer when changing tab to "temple"

	const loaded_points = []

	temple_layers.clearLayers()
	highlight_layers.clearLayers()
	$("#cardsContRoster").empty()
	$("#cardsContTemple").empty()

	// Load the temple dataset
	var x = $.getJSON("./json/new_village_processed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (dataPoint, index) {

			var UID = dataPoint["UID"],
				photos_color = (!!dataPoint["no_img"]) ? "#a65628" : "#377eb8";
			// Draw the point and attach the popup text
			latlng = [dataPoint.lat, dataPoint.lng]
			var pointer = dataPoint["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: photos_color,
				fillOpacity: 0.7,
				weight: 1,
				color: "#000000",
				opacity: 0.7
			}).on("click", function () {
				loadSidebarInfo(dataPoint);
			});


			loaded_points.push(dataPoint)

			// Add the point to the layer group
			temple_layers.addLayer(pointer)
		})

		fuseLoad(loaded_points)
	})
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

temple_layers = L.layerGroup().addTo(map)
highlight_layers = L.layerGroup().addTo(map)
selected_layers = L.layerGroup().addTo(map)

// Load the roster dataset
shownUID = loadPoints([], [])

// Load leaflet sidebar
var sidebar = L.control.sidebar({
	autopan: true, // whether to maintain the centered map point when opening the sidebar
	closeButton: true, // whether t add a close button to the panes
	container: 'leaflet-sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
	position: 'left', // left or right
}).addTo(map);


// Search
var active_card = $(".card")

function fuseLoad(shownUID) {

	var keys = []

	Object.entries(shownUID[0]).forEach(function (line) {

		if (line[0] == "Name_MY" || line[0] == "Name_ZH" || line[0] == "State_ZH" || line[0] == "State_MY") {
			keys.push({
				name: line[0],
				weight: 1
			})
		} else if (line[0].substring(0, 6) != "source" && line[0] != "latlng" && line[0] != "lat" && line[0] != "lng") {
			keys.push({
				name: line[0],
				weight: 0.5
			})
		}
	})


	const options = {
		shouldSort: true,
		tokenize: true,
		matchAllTokens: true,
		includeScore: true,
		includeMatches: true,
		threshold: 0.3,
		minMatchCharLength: 3,
		// Search in `author` and in `tags` array
		keys: keys
	}
	const fuse = new Fuse(shownUID, options)

	// Change the pattern
	const pattern = ""

	$('#searchbox').on('input', function (e) {

		$(".cards-cont").empty()
		highlight_layers.clearLayers()
		const output = fuse.search($(this).val())

		var string = output.length + " result(s) found"

		$(".results-found").empty().append(string)

		output.forEach(function (e) {
			var dataPoint = e.item

			// TODO: highlight matches
			var matchIndexes = e.matches

			var sources_html = "<div class='card' lat='" + dataPoint.lat + "' lon='" + dataPoint.lng + "' id='" + dataPoint.UID + "'> <ul>"

			Object.entries(dataPoint).forEach(function (line) {
				if (line[0].substring(0, 6) != "source" && line[0] != "latlng" && line[0] != "lat" && line[0] != "lng") {

					var line = "<li><b>" + line[0] + "</b>:" + line[1] + "</li>"
					sources_html = sources_html + line
				}
			})

			sources_html = sources_html + "</ul></div>"


			// Add the card to the document
			$(".cards-cont").append(sources_html)

			latlng = [dataPoint.lat, dataPoint.lng]
			var pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 6,
				fillColor: "#fff500",
				fillOpacity: 1,
				weight: 2,
				color: "#ff0000",
				opacity: 1
			}).on("click", function () {
				loadSidebarInfo(dataPoint)
			});
			highlight_layers.addLayer(pointer)
		})
		// Selecting points from cards

		// Zoom to point and highlight point if a card is clicked.
		$(".card").on('click', function () {
			// Change beackground color of active card
			active_card.removeClass("active-card")
			active_card = $(this)
			active_card.addClass("active-card")

			map.flyTo([active_card.attr("lat"), active_card.attr("lon") - 0.01], 15)
		})
	})
}

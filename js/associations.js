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


var active_card = $(".card")

function fuseLoad(shownUID) {

	const options = {
		shouldSort: true,
		tokenize: true,
		matchAllTokens: true,
		includeScore: true,
		includeMatches: true,
		threshold: 0.3,
		minMatchCharLength: 3,
		// Search in `author` and in `tags` array
		keys: [{
				name: 'Name_CH',
				weight: 1
					},
			{
				name: 'Name_ML',
				weight: 1
					},
			{
				name: 'Name_EN',
				weight: 1
					},
			{
				name: "Location",
				weight: 0.5
					},
			{
				name: "Region",
				weight: 1.5
					},
			{
				name: "Category",
				weight: 0.5
					},
			{
				name: "PageNumber",
				weight: 0.3
					},
			{
				name: "UID",
				weight: 0.5
			}]
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
			var item = e.item

			// TODO: highlight matches
			var matchIndexes = e.matches

			matchIndexes.forEach(function (e) {})

			// Write card text for visible points
			var card_text = "<div class='card' lat='" + item.Latitude + "' lon='" + item.Longitude + "' id='" + item.UID + "'> <ul>" + "<li>" + item.Name_EN + "</li><li>" + item.Name_CH + "</li><li>" + item.Name_ML + "</li><li>Location: " + item.Location + "</li><li>State: " + item.Region + "</li><li> Category: " + item.Category + "</li><li> Source page number: " + item.PageNumber + "</li></ul></div>"

			// Add the card to the document
			$(".cards-cont").append(card_text)

			var popup_text = "<p>" + item.Name_EN + "</p><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			latlng = [item.Latitude, item.Longitude]
			var pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 6,
				fillColor: "#fff500",
				fillOpacity: 1,
				weight: 2,
				color: "#ff0000",
				opacity: 1
			}).bindPopup(popup_text, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: true
			})
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

			var id = active_card.attr("id")

		})
	})
}

var shownUID = []

function loadPoints(filtered_terri, filtered_cat) {

	var shownBuffer = []
	$(".cards-cont").empty()

	$.getJSON("./json/MHGIS Masterlist_processed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			if (!(filtered_terri.includes(item["ADM2_PCODE"])) && !(filtered_cat.includes(item["Category"]))) {

				// Load popup to a buffer variable
				var popup_text = "<p>" + item.Name_EN + "</p><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

				UID = item["UID"]

				// Draw the point and attach the popup text
				latlng = [item.Latitude, item.Longitude]
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
				shownBuffer.push(item)
			}
		})
		fuseLoad(shownBuffer)
		return shownBuffer
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

roster_layers = L.layerGroup().addTo(map)
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

// Load filter page territory checboxes
$.getJSON("./json/MYterritories.json", function (data) {
	for (var row in data) {
		var htmlhead = "<li><details>"
		var summary = "<summary><input class='state-filter' id='" + data[row]["code"] + "' type='checkbox' checked>" + data[row]["state_name"] + "</summary>"
		var terrhead = "<ul>"
		var terrbody = ""
		for (var terr in data[row]["territories"]) {
			var terrentry = "<li><input class='terr-filter' id='" + data[row]["territories"][terr]["code"] + "' type='checkbox' checked>" + data[row]["territories"][terr]["territory_name"] + "</li>"
			terrbody = terrbody + terrentry
		}
		var terrend = "</ul>"
		var htmlend = "</li></details>"
		$(".filter_states").append(htmlhead + summary + terrhead + terrbody + terrend + htmlend)
	}

	// Intemediate checkboxes
	$('input[type="checkbox"]').change(function (e) {
		checked = $(this).prop("checked")
		container = $(this).parent()

		if (container.is("li")) {
			var siblings = container.siblings()

			function checkSiblings(el) {

				all = true;

				var parent = el.parent().parent()
				el.siblings().each(function () {
					let returnValue = all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
					return returnValue;

				})

				if (all && checked) {

					parent.children("summary").children('input[type="checkbox"]').prop({
						indeterminate: false,
						checked: checked
					});

				} else if (all && !checked) {
					parent.children("summary").children('input[type="checkbox"]').prop({
						indeterminate: false,
						checked: checked
					});
				} else {
					parent.children("summary").children('input[type="checkbox"]').prop({
						indeterminate: true,
						checked: false
					});
				}
			}

			checkSiblings(container)
		} else if (container.is("summary")) {
			var parent = $(this).parent().parent()
			if (checked) {
				parent.children("ul").children("li").each(function (el) {
					$(this).children('input[type="checkbox"]').prop({
						indeterminate: false,
						checked: checked
					})
				})
			} else {
				parent.children("ul").children("li").each(function (el) {
					$(this).children('input[type="checkbox"]').prop({
						indeterminate: false,
						checked: false
					})
				})
			}
		}
	})

	$('#filter-button').click(function () {
		roster_layers.clearLayers()

		var filtered_terri = [],
			filtered_cat = [],
			cat_dic = {
				"宗教": "Religious Associations 宗教",
				"地缘": "Geographical Clan Associations 地缘",
				"综合": "Multifunctional Associations 综合",
				"青年妇女": "Female Youth Assications 青年妇女",
				"文教": "Cultural Education Assiciations 文教",
				"体育联谊": "Sports Associations 体育联谊",
				"慈善福利": "Charitable Associations 慈善福利",
				"独立中学": "Independent Secondary School 独立中学",
				"血缘": "Geneological Clan Associations 血缘",
				"业缘": "Vocational Associations 业缘"
			}

		$(".terr-filter:checkbox:not(:checked)").each(function () {
			filtered_terri.push($(this).attr("id"))
		})

		$(".cat-filter:checkbox:not(:checked)").each(function () {
			filtered_cat.push(cat_dic[$(this).attr("id")])
		})
		// Load the roster dataset
		shownUID = loadPoints(filtered_terri, filtered_cat)
	})
})

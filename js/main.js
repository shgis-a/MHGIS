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
highlight_layer = L.layerGroup().addTo(map)

function load_default() {
	// Function which loads the map layers under "home" tab

	// Clear all layers and cards
	roster_layers.clearLayers()
	highlight_layer.clearLayers()
	temple_layers.clearLayers()
	highlight_layer.clearLayers()
	$("#cardsContRoster").empty()


	// Load the roster dataset
	$.getJSON("./json/MHGIS Masterlist.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<h2>" + item.Name_EN + "</h2><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.latitude, item.longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#66c2a5",
				weight: 1,
				color: "#000000",
				opacity: 0.3
			}).bindPopup(popup_text, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: true
			})

			// Add the point to the layer group
			roster_layers.addLayer(pointer)
		})
	})

	// Load the temple dataset
	$.getJSON("./json/temple_georefed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<h2>" + item.Name + "</h2><p><b>Notes: </b>" + item.Notes + "</p>" + "</p><p><b>State: </b>" + item.State + "</p><p><b>Address: </b>" + item.Address + "</p>"

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.Latitude, item.Longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#fc8d62",
				weight: 1,
				color: "#000000",
				opacity: 0.3
			}).bindPopup(popup_text, {
				maxWidth: 300,
				closeOnClick: false,
				keepInView: true
			})

			// Add the point to the layer group
			temple_layers.addLayer(pointer)
		})
	})
}

function load_roster() {
	// Function to load roster layer when changing tab to "roster"

	// This allows the collaspe buttons to work
	$('span.collapse').on('click', function () {
		$(this).parent().find('ul').slideToggle();
	});

	// If there is change in the filter form, update the filter buffer
	$("input").change(function () {
		if ($(this).is(":checked")) {
			filter_state($(this).attr('id'), 1)
		} else {
			filter_state($(this).attr('id'), 2)
		}
	})

	// This allows the filter button to work.
	$("#filter").on('click', function () {
		load_roster(renderer)
	})

	// Load the roster dataset
	$.getJSON("./json/MHGIS Masterlist.json", function (data) {

		// Clear all layers and cards
		temple_layers.clearLayers()
		roster_layers.clearLayers()
		highlight_layer.clearLayers()
		$("#cardsContRoster").empty()
		$("#cardsContTemple").empty()

		// Iterate through each point...
		data.forEach(function (item, index) {

			// Load popup to a buffer variable
			var popup_text = "<h2>" + item.Name_EN + "</h2><p>" + item.Name_CH + "</p><p>" + item.Name_ML + "</p>" + "<p><b>Location: </b>" + item.Location + "</p><p><b>State: </b>" + item.Region + "</p>" + "</p><p><b>Category: </b>" + item.Category + "</p>" + "<p> <b>Source page number: </b>" + item.PageNumber + "</p>"

			UID = item["UID"]

			// Check if the point needs to be filtered out
			if (!(roster_buffer[item["UID"]] > 0)) {

				// Draw the point and attach the popup text
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

			// Write card text for visible points
			var card_text = "<div class='card' id='" + UID + "'> <ul>" + "<li>" + item.Name_EN + "</li><li>" + item.Name_CH + "</li><li>" + item.Name_ML + "</li><li>Location: " + item.Location + "</li><li>State: " + item.Region + "</li><li> Category: " + item.Category + "</li><li> Source page number: " + item.PageNumber + "</li></ul></div>"

			// Add the card to the document
			$("#cardsContRoster").append(card_text)
		})

		// Selecting points from cards
		var active_card = $(".card")

		// Zoom to point and highlight point if a card is clicked.
		$(".card").on('click', function () {
			highlight_layer.clearLayers()

			// Change beackground color of active card
			active_card.css("background-color", "#fff3cb")
			active_card = $(this)
			active_card.css("background-color", "#ff7671")

			var id = active_card.attr("id")

			// Iterate through data to find selected point
			data.forEach(function (item) {
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
					})

					// Fly to point
					map.flyTo(latlng, 13)

					// Highlight point
					highlight_layer.addLayer(point)
				}
			})
		})
	})
}

// Roster tab helper functions below here

var roster_buffer = {}
roster_layers = L.layerGroup().addTo(map)
roster_database = {}

function filter_state(key, operation) {
	// Helper function to identify what entries to fade out by updating roster_buffer. Takes three arguments; Firstly, "key" is the field you want to filter. "Operation" has two options: "1" removes items from the list (i.e. un-fades points) and "2" add items to the list (i.e. fades out points)

	// Input validation
	valid_inputs_state = ["Johor", "Kedah", "Kelantan", "Malacca", "NegeriSembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "独立中学", "Sarawak", "Selangor", "Terengganu", "KualaLumpur", "Labuan", "Putrajaya"];

	valid_inputs_category = ["宗教", "地缘", "综合", "青年妇女", "文教", "体育联谊", "慈善福利", "独立中学", "血缘", "业缘"];

	category = ""

	// Check if the key's category (and later use the category to tell if we need to filter a point)
	if (valid_inputs_state.includes(key)) {
		category = "Region"
	} else if (valid_inputs_category.includes(key)) {
		category = "Category"
	} else {
		console.error("Entry '", key, "' is invalid");
		return 1;
	}

	if (operation == 1) {
		// Operation 1 happens when someone checks a previously unchecked box. The following code removes points from roster_layers, allowing them to be shown on the map
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
		// Operation 2 happens when someone unchecks a previously checked box. The following code add points to roster_layers, allowing them to be shown on the map
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

function roster_fill_color(category) {

	// Helper function to find out what color a point in the roster tab should be by accepting a category

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

function load_temple() {
	// Function to load roster layer when changing tab to "temple"

	temple_layers.clearLayers()
	roster_layers.clearLayers()
	highlight_layer.clearLayers()
	$("#cardsContRoster").empty()
	$("#cardsContTemple").empty()

	// Load the temple dataset
	$.getJSON("./json/temple_georefed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (item, index) {

			UID = item["UID"]

			// Draw the point and attach the popup text
			latlng = [item.Latitude, item.Longitude]
			var pointer = item["UID"]
			pointer = L.circleMarker(latlng, {
				renderer: renderer,
				radius: 5,
				fillColor: "#fc8d62",
				weight: 1,
				color: "#000000",
				opacity: 0.3
			})

			// Add the point to the layer group
			temple_layers.addLayer(pointer)

			var img_text = ""
			if (item.img == "Yes") {
				img_text = "<li class='img_text' num='" + item.no_img + "'><b>There are images assocaited with this temple. Click here to view them.</b></li>"
			}


			// Write card text for visible points
			var card_text = "<div class='card' id='" + UID + "'> <ul>" + "<li>" + item.Name + "</li><li>Notes: " + item.Notes + "</li><li>State: " + item.State + "</li><li>Address:" + item.Address + "</li>" + img_text + "</ul><div class='gallery'></div></div>"

			// Add the card to the document
			$("#cardsContTemple").append(card_text)
		})

		$(".img_text").click(function () {

			$(".gallery").empty()

			var uid = $(this).parent().parent().attr('id')
			var gallery = $(this).parent().parent().find(".gallery")
			var num_img = $(this).attr("num")

			for (var i = 1; i <= num_img; i++) {

				var formattedNumber = ("0" + i).slice(-2);

				var dir = "./" + "temple_img" + "/" + uid + "/" + formattedNumber + ".jpg"

				htmlcode = "<div class='image row'><div class='img-wrapper'><a href='" + dir + "'><img src='" + dir + "'><div class='img-overlay'><i class='fa fa-plus-circle' aria-hidden='true'></i></div></a></div></div>"

				gallery.append(htmlcode)
			}

			// gallery lightbox
			// Gallery image hover
			$(".img-wrapper").hover(
				function () {
					$(this).find(".img-overlay").animate({
						opacity: 1
					}, 600);
				},
				function () {
					$(this).find(".img-overlay").animate({
						opacity: 0
					}, 600);
				}
			);

			// Lightbox
			var $overlay = $('<div id="overlay"></div>');
			var $image = $("<img>");
			var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
			var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
			var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

			// Add overlay
			$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
			gallery.after($overlay);

			// Hide overlay on default
			$overlay.hide();

			// When an image is clicked
			$(".img-overlay").click(function (event) {
				// Prevents default behavior
				event.preventDefault();

				// Adds href attribute to variable
				var imageLocation = $(this).parent().attr("href");
				// Add the image src to $image
				$image.attr("src", imageLocation);
				// Fade in the overlay
				$overlay.fadeIn("slow");
			});

			// When the overlay is clicked
			$overlay.click(function () {
				// Fade out the overlay
				$(this).fadeOut("slow");
			});

			// keyboard navigation
			$(document).keydown(function (e) {
				if (e.keyCode == 37) {
					// Left
					$prevButton.click()
				} else if (e.keyCode == 39) {
					// Right
					$nextButton.click()
				} else if (e.keyCode == 27) {
					$exitButton.click()
				}
			})

			// When next button is clicked
			$nextButton.click(function (event) {
				// Hide the current image
				$("#overlay img").hide();
				// Overlay image location
				var $currentImgSrc = $("#overlay img").attr("src");
				// Image with matching location of the overlay image
				var $currentImg = $(".gallery img[src='" + $currentImgSrc + "']");
				// Finds the next image
				var $nextImg = $($currentImg.closest(".image").next().find("img"));
				// All of the images in the gallery
				var $images = $(".gallery img");
				// If there is a next image
				if ($nextImg.length > 0) {
					// Fade in the next image
					$("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
				} else {
					// Otherwise fade in the first image
					$("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
				}
				// Prevents overlay from being hidden
				event.stopPropagation();
			});

			// When previous button is clicked
			$prevButton.click(function (event) {
				// Hide the current image
				$("#overlay img").hide();
				// Overlay image location
				var $currentImgSrc = $("#overlay img").attr("src");
				// Image with matching location of the overlay image
				var $currentImg = $('#gallery img[src="' + $currentImgSrc + '"]');
				// Finds the next image
				var $nextImg = $($currentImg.closest(".image").prev().find("img"));
				// Fade in the next image
				$("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
				// Prevents overlay from being hidden
				event.stopPropagation();
			});

			// When the exit button is clicked
			$exitButton.click(function () {
				// Fade out the overlay
				$("#overlay").fadeOut("slow");
			});
		})

		// Selecting points from cards
		var active_card = $(".card")

		// Zoom to point and highlight point if a card is clicked.
		$(".card").on('click', function () {
			highlight_layer.clearLayers()

			// Change beackground color of active card
			active_card.css("background-color", "#fff3cb")
			active_card = $(this)
			active_card.css("background-color", "#ff7671")

			var id = active_card.attr("id")

			// Iterate through data to find selected point
			data.forEach(function (item) {
				if (item["UID"] == id) {
					latlng = [item.Latitude, item.Longitude]
					var point = L.circleMarker(latlng, {
						renderer: renderer,
						radius: 10,
						fillColor: "#fff500",
						fillOpacity: 1,
						weight: 3,
						color: "#ff0e0e",
						opacity: 1
					})

					// Fly to point
					map.flyTo(latlng, 13)

					// Highlight point
					highlight_layer.addLayer(point)
				}
			})
		})
	})
}


// Temple tab helper functions below here

temple_layers = L.layerGroup().addTo(map)
$(document).ready(function () {

	//Open sidebar to intro page
	var sidebar = L.control.sidebar({
		autopan: true, // whether to maintain the centered map point when opening the sidebar
		closeButton: true, // whether t add a close button to the panes
		container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
		position: 'left', // left or right
	}).addTo(map);

	// Default tab: home
	sidebar.open('home');

	// Load default layer
	load_default();

	// Change layers on tab change
	sidebar.on('content', function (e) {
		if (e.id == "home") {
			load_default()
		} else if (e.id == "roster") {
			load_roster()
		} else if (e.id == "temple") {
			load_temple()
		}
	})

})

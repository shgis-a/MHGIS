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

function loadPoints(filtered_terri, filtered_cat) {
	// Function to load roster layer when changing tab to "temple"

	temple_layers.clearLayers()
	highlight_layers.clearLayers()
	$("#cardsContRoster").empty()
	$("#cardsContTemple").empty()

	// Load the temple dataset
	$.getJSON("./json/temple_georefed.json", function (data) {

		// Iterate through each point...
		data.forEach(function (dataPoint, index) {
			var UID = dataPoint["UID"],
				photos_color = (dataPoint["img"] === "Yes") ? "#a65628" : "#377eb8";
			// Draw the point and attach the popup text
			latlng = [dataPoint.Latitude, dataPoint.Longitude]
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
				sidebar.open('info')

				$(".det_name").empty().append(dataPoint.Name)
				$(".det_notes").empty().append(dataPoint.Notes)
				$(".det_address").empty().append(dataPoint.Address)
				$(".det_states").empty().append(dataPoint.States)
				$(".det_uid").empty().append(dataPoint.UID)

				$(".gallery").empty()

				if (dataPoint.img == "No") {
					$(".gallery").append("<p>There are no images associated with this temple.</p>")
				} else if (dataPoint.img == "Yes") {
					$(".gallery").empty()

					for (var i = 1; i <= dataPoint.no_img; i++) {

						var formattedNumber = ("0" + i).slice(-2);

						var dir = "./" + "temple_img" + "/" + dataPoint.UID + "/" + formattedNumber + ".jpg"

						var htmlcode = "<div class='image row'><div class='img-wrapper'><a href='" + dir + "'><img src='" + dir + "'><div class='img-overlay'><i class='fa fa-plus-circle' aria-hidden='true'></i></div></a></div></div>"

						console.log(htmlcode)
						$(".gallery").append(htmlcode)
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
						$(".gallery").after($overlay);

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
					}
				}
			});

			// Add the point to the layer group
			temple_layers.addLayer(pointer)
		})
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

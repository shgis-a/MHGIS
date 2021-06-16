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

	html_const = html_const + sources_const + "</li>"

	$(".point_details").empty().append(html_const)

	$(".gallery").empty()

	if (!dataPoint["no_img"]) {
		$(".gallery").append("<p>There are no images associated with this temple.</p>")
	} else {
		$(".gallery").empty()

		for (var i = 1; i <= dataPoint.no_img; i++) {

			var formattedNumber = ("0" + i).slice(-2);

			var dir = "./" + "temple_img" + "/" + dataPoint.UID + "/" + formattedNumber + ".jpg"

			var htmlcode = "<div class='image row'><div class='img-wrapper'><a href='" + dir + "'><img src='" + dir + "'><div class='img-overlay'><i class='fa fa-plus-circle' aria-hidden='true'></i></div></a></div></div>"

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
}

function loadPoints(filtered_terri, filtered_cat) {
	// Function to load roster layer when changing tab to "temple"

	const loaded_points = []

	temple_layers.clearLayers()
	highlight_layers.clearLayers()
	$("#cardsContRoster").empty()
	$("#cardsContTemple").empty()

	// Load the temple dataset
	var x = $.getJSON("./json/merged_temples.json", function (data) {

		// Iterate through each point...
		data.forEach(function (dataPoint, index) {

			var UID = dataPoint["UID"],
				photos_color = (!!dataPoint["no_img"]) ? "#a65628" : "#377eb8";
			// Draw the point and attach the popup text
			latlng = [dataPoint.latitude, dataPoint.longitude]
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

		if (line[0] == "Name_EN" || line[0] == "Name_ZH" || line[0] == "state") {
			keys.push({
				name: line[0],
				weight: 1
			})
		} else if (line[0].substring(0, 6) != "source" && line[0] != "UID" && line[0] != "no_img" && line[0] != "latitude" && line[0] != "longitude") {
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

			var sources_html = "<div class='card' lat='" + dataPoint.latitude + "' lon='" + dataPoint.longitude + "' id='" + dataPoint.UID + "'> <ul>"

			Object.entries(dataPoint).forEach(function (line) {
				if (line[0].substring(0, 6) != "source" && line[1] != "" && line[1] != null) {

					var line = "<li><b>" + line[0] + "</b>:" + line[1] + "</li>"
					sources_html = sources_html + line
				}
			})

			sources_html = sources_html + "</ul></div>"


			// Add the card to the document
			$(".cards-cont").append(sources_html)

			latlng = [dataPoint.latitude, dataPoint.longitude]
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

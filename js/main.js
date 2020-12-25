mapboxgl.accessToken = 'pk.eyJ1IjoidmlyZ2lsd3h3IiwiYSI6ImNqYmhrN25rZTNoNWgyeHBlNnY0N3Z6dDAifQ.KCzg-gN0vwIeQNoQyjWVXg';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/virgilwxw/ckj19rpil9fi119qoffnqc4a9', // stylesheet location
	center: [109.455, 4.109], // starting position [lng, lat]
	zoom: 5 // starting zoom
});

map.on('load', function () {
	// add source and layer for museums
	map.addSource('museums', {
		type: 'vector',
		url: 'mapbox://ckj18l6z22f2m2anqasqrd2o3'
	});
});

map.on('click', function (e) {
	var features = map.queryRenderedFeatures(e.point, {
		layers: ['mhgis-masterlist'] // replace this with the name of the layer
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
		.setHTML('<div class="popup"><h3>' + feature.properties.Name_CH + '</h3><h4>' + feature.properties.Name_ML + '</h4><h4>' + feature.properties.Name_EN + '</h4><ul><li>' + 'State: ' + feature.properties.Region + '</li><li>' + 'Category: ' + feature.properties.Category + '</li><li>' + 'Address: ' + feature.properties.Location + '</li><li>' + 'Source: ' + feature.properties.PageNumber + '</li></ul></div>')
		.addTo(map);
});

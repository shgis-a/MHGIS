// Function to generate popup
function popup(feature, layer) {
    var properties = layer.feature.properties
    layer.bindPopup("<h2>" + properties.Name_EN + "</h2><h3>" + properties.Name_CH + "</h3><h3>" + properties.Name_ML + "</h3>" + "<p><b>Location: </b>" + properties.Location + "</p><p><b>State: </b>" + properties.Region +"</p><p><b>Page Number: </b>" + properties.PageNumber + "</p>")
}

// Initialise map
var mainmap = L.map('mapcont').setView([4.2, 108.00], 6);

// Load basemap
var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mainmap);

var icon1 = L.icon({
    iconUrl: './img/icon1.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon2 = L.icon({
    iconUrl: './img/icon2.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon3 = L.icon({
    iconUrl: './img/icon3.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon4 = L.icon({
    iconUrl: './img/icon4.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon5 = L.icon({
    iconUrl: './img/icon5.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon6 = L.icon({
    iconUrl: './img/icon6.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon7 = L.icon({
    iconUrl: './img/icon7.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon8 = L.icon({
    iconUrl: './img/icon8.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon9 = L.icon({
    iconUrl: './img/icon9.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});
var icon10 = L.icon({
    iconUrl: './img/icon10.png',
    iconSize: [20, 35],
    iconAnchor: [10, 37],
    popupAnchor: [0, -28]
});

var cishanfuli = new L.GeoJSON.AJAX(sourcepath.concat("cishanfuli.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon1
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var diyuan = new L.GeoJSON.AJAX(sourcepath.concat("diyuan.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon2
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var tiyulianyi = new L.GeoJSON.AJAX(sourcepath.concat("tiyulianyi.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon3
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var wenjiao = new L.GeoJSON.AJAX(sourcepath.concat("wenjiao.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon4
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var xueyuan = new L.GeoJSON.AJAX(sourcepath.concat("xueyuan.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon5
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var yeyuan = new L.GeoJSON.AJAX(sourcepath.concat("yeyuan.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon6
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var zonghe = new L.GeoJSON.AJAX(sourcepath.concat("zonghe.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon7
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var zongjiao = new L.GeoJSON.AJAX(sourcepath.concat("zongjiao.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon8
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var dulizhongxue = new L.GeoJSON.AJAX(sourcepath.concat("dulizhongxue.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon9
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)
var qingniaofunu = new L.GeoJSON.AJAX(sourcepath.concat("qingniaofunu.geojson"), {
    pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: icon10
        }); //options object for Marker
    },
    onEachFeature: popup
}).addTo(mainmap)

var baseMaps = [{
    groupName: "Base maps",
    expanded: true,
    layers: {
        "OpenStreetMap": streetmap
    }
    }]
var overlays = [{
    groupName: "State data",
    expanded: true,
    layers: {
        "慈善福利 <img src='./img/icon1.png', class='markerThumbnail'>": cishanfuli,
        "地缘 <img src='./img/icon2.png', class='markerThumbnail'>": diyuan,
        "体育联谊 <img src='./img/icon3.png', class='markerThumbnail'>": tiyulianyi,
        "文教 <img src='./img/icon4.png', class='markerThumbnail'>": wenjiao,
        "血缘 <img src='./img/icon5.png', class='markerThumbnail'>": xueyuan,
        "业缘 <img src='./img/icon6.png', class='markerThumbnail'>": yeyuan,
        "综合 <img src='./img/icon8.png', class='markerThumbnail'>": zonghe,
        "宗教 <img src='./img/icon9.png', class='markerThumbnail'>": zongjiao,
        "独立中学 <img src='./img/icon10.png', class='markerThumbnail'>": dulizhongxue
    }
}]

var options = {
    container_width: "300px",
    container_maxHeight: "700px",
    group_maxHeight: "250px",
    groupCheckboxes: true,
    removeOutsideVisibleBounds: true,
    collapsed: false
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
mainmap.addControl(control);


$(document).ready(function () {
    mainmap.invalidateSize()
})

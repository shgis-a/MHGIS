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

// Load GeoJSON file
<<<<<<< HEAD
var points = new L.GeoJSON.AJAX("./json/myhg_master.geojson")
=======
var Alliance_Polygons_Studied = new L.GeoJSON.AJAX("./json/myhg_master.geojson").addTo(mainmap)
>>>>>>> parent of 90f61e6... data now shows up as popups



function clickFunction(feature, latlng) {
    feature.on("click", function (event) {

        var properties = event.layer.feature.properties

        var text_string = "<h2>" + properties.Name_EN + "</h2><h3>" + properties.Name_CH + "</h3><h3>" + properties.Name_ML + "</h3>" + "<p><b>Location: </b>" + properties.Location + "</p><p><b>State: </b>" + properties.Region + "</p>"

        console.log(event.layer.feature.properties)
        var popup = L.popup({
                maxHeight: 500,
                maxWidth: 600,
                closeOnClick: false,
                keepInView: true
            })
            .setLatLng(event.latlng)
            .setContent(text_string)
            .openOn(mainmap);
    })
}

// Load Layers
var baseMaps = [
]

var villages_new = new L.GeoJSON.AJAX("./json/Villages_new.geojson")
var towns_new = new L.GeoJSON.AJAX("./json/TownsNEW.geojson")
var temples_new = new L.GeoJSON.AJAX("./json/Temples_new.geojson")

var TRG_csfl = new L.GeoJSON.AJAX("./json/Terengganu/cishanfuli.geojson", {
    pointToLayer: function (feature, latlng) {
        console.log(feature)

        feature.on("click", function (event) {

            var properties = event.layer.feature.properties

            var text_string = "<h2>" + properties.Name_EN + "</h2><h3>" + properties.Name_CH + "</h3><h3>" + properties.Name_ML + "</h3>" + "<p><b>Location: </b>" + properties.Location + "</p><p><b>State: </b>" + properties.Region + "</p>"

            console.log(event.layer.feature.properties)
            var popup = L.popup({
                    maxHeight: 500,
                    maxWidth: 600,
                    closeOnClick: false,
                    keepInView: true
                })
                .setLatLng(event.latlng)
                .setContent(text_string)
                .openOn(mainmap);
        })

    }
}).addTo(mainmap)
var TRG_dy = new L.GeoJSON.AJAX("./json/Terengganu/diyuan.geojson").addTo(mainmap)
var TRG_tyly = new L.GeoJSON.AJAX("./json/Terengganu/tiyulianyi.geojson").addTo(mainmap)
var TRG_wj = new L.GeoJSON.AJAX("./json/Terengganu/wenjiao.geojson").addTo(mainmap)
var TRG_xy = new L.GeoJSON.AJAX("./json/Terengganu/xueyuan.geojson").addTo(mainmap)
var TRG_yy = new L.GeoJSON.AJAX("./json/Terengganu/yeyuan.geojson").addTo(mainmap)
var TRG_zh = new L.GeoJSON.AJAX("./json/Terengganu/zonghe.geojson").addTo(mainmap)
var TRG_zj = new L.GeoJSON.AJAX("./json/Terengganu/zongjiao.geojson").addTo(mainmap)

var SGR_csfl = new L.GeoJSON.AJAX("./json/Selangor/cishanfuli.geojson").addTo(mainmap)
var SGR_dy = new L.GeoJSON.AJAX("./json/Selangor/diyuan.geojson").addTo(mainmap)
var SGR_tyly = new L.GeoJSON.AJAX("./json/Selangor/tiyulianyi.geojson").addTo(mainmap)
var SGR_wj = new L.GeoJSON.AJAX("./json/Selangor/wenjiao.geojson").addTo(mainmap)
var SGR_xy = new L.GeoJSON.AJAX("./json/Selangor/xueyuan.geojson").addTo(mainmap)
var SGR_yy = new L.GeoJSON.AJAX("./json/Selangor/yeyuan.geojson").addTo(mainmap)
var SGR_zh = new L.GeoJSON.AJAX("./json/Selangor/zonghe.geojson").addTo(mainmap)
var SGR_zj = new L.GeoJSON.AJAX("./json/Selangor/zongjiao.geojson").addTo(mainmap)

var SWK_csfl = new L.GeoJSON.AJAX("./json/Sarawak/cishanfuli.geojson").addTo(mainmap)
var SWK_dy = new L.GeoJSON.AJAX("./json/Sarawak/diyuan.geojson").addTo(mainmap)
var SWK_dlzx = new L.GeoJSON.AJAX("./json/Sarawak/dulizhongxue.geojson").addTo(mainmap)
var SWK_qnfn = new L.GeoJSON.AJAX("./json/Sarawak/qingnianfunu.geojson").addTo(mainmap)
var SWK_tyly = new L.GeoJSON.AJAX("./json/Sarawak/tiyulianyi.geojson").addTo(mainmap)
var SWK_wj = new L.GeoJSON.AJAX("./json/Sarawak/wenjiao.geojson").addTo(mainmap)
var SWK_xy = new L.GeoJSON.AJAX("./json/Sarawak/xueyuan.geojson").addTo(mainmap)
var SWK_yy = new L.GeoJSON.AJAX("./json/Sarawak/yeyuan.geojson").addTo(mainmap)
var SWK_zh = new L.GeoJSON.AJAX("./json/Sarawak/zonghe.geojson").addTo(mainmap)
var SWK_zj = new L.GeoJSON.AJAX("./json/Sarawak/zongjiao.geojson").addTo(mainmap)

var SBH_csfl = new L.GeoJSON.AJAX("./json/Sabah/cishanfuli.geojson").addTo(mainmap)
var SBH_dy = new L.GeoJSON.AJAX("./json/Sabah/diyuan.geojson").addTo(mainmap)
var SBH_dlzx = new L.GeoJSON.AJAX("./json/Sabah/dulizhongxue.geojson").addTo(mainmap)
var SBH_qnfn = new L.GeoJSON.AJAX("./json/Sabah/qingniaofunu.geojson").addTo(mainmap)
var SBH_tyly = new L.GeoJSON.AJAX("./json/Sabah/tiyulianyi.geojson").addTo(mainmap)
var SBH_wj = new L.GeoJSON.AJAX("./json/Sabah/wenjiao.geojson").addTo(mainmap)
var SBH_xy = new L.GeoJSON.AJAX("./json/Sabah/xueyuan.geojson").addTo(mainmap)
var SBH_yy = new L.GeoJSON.AJAX("./json/Sabah/yeyuan.geojson").addTo(mainmap)
var SBH_zh = new L.GeoJSON.AJAX("./json/Sabah/zonghe.geojson").addTo(mainmap)
var SBH_zj = new L.GeoJSON.AJAX("./json/Sabah/zongjiao.geojson").addTo(mainmap)

var PLS_csfl = new L.GeoJSON.AJAX("./json/Perlis/cishanfuli.geojson").addTo(mainmap)
var PLS_dy = new L.GeoJSON.AJAX("./json/Perlis/diyuan.geojson").addTo(mainmap)
var PLS_qnfn = new L.GeoJSON.AJAX("./json/Perlis/qingniaofunu.geojson").addTo(mainmap)
var PLS_tyly = new L.GeoJSON.AJAX("./json/Perlis/tiyulianyi.geojson").addTo(mainmap)
var PLS_wj = new L.GeoJSON.AJAX("./json/Perlis/wenjiao.geojson").addTo(mainmap)
var PLS_xy = new L.GeoJSON.AJAX("./json/Perlis/xueyuan.geojson").addTo(mainmap)
var PLS_yy = new L.GeoJSON.AJAX("./json/Perlis/yeyuan.geojson").addTo(mainmap)
var PLS_zh = new L.GeoJSON.AJAX("./json/Perlis/zonghe.geojson").addTo(mainmap)
var PLS_zj = new L.GeoJSON.AJAX("./json/Perlis/zongjiao.geojson").addTo(mainmap)

var PRK_csfl = new L.GeoJSON.AJAX("./json/Perak/cishanfuli.geojson").addTo(mainmap)
var PRK_dy = new L.GeoJSON.AJAX("./json/Perak/diyuan.geojson").addTo(mainmap)
var PRK_dlzx = new L.GeoJSON.AJAX("./json/Perak/dulizhongxue.geojson").addTo(mainmap)
var PRK_qnfn = new L.GeoJSON.AJAX("./json/Perak/qingniaofunu.geojson").addTo(mainmap)
var PRK_tyly = new L.GeoJSON.AJAX("./json/Perak/tiyulianyi.geojson").addTo(mainmap)
var PRK_wj = new L.GeoJSON.AJAX("./json/Perak/wenjiao.geojson").addTo(mainmap)
var PRK_xy = new L.GeoJSON.AJAX("./json/Perak/xueyuan.geojson").addTo(mainmap)
var PRK_yy = new L.GeoJSON.AJAX("./json/Perak/yeyuan.geojson").addTo(mainmap)
var PRK_zh = new L.GeoJSON.AJAX("./json/Perak/zonghe.geojson").addTo(mainmap)
var PRK_zj = new L.GeoJSON.AJAX("./json/Perak/zongjiao.geojson").addTo(mainmap)

var PNG_csfl = new L.GeoJSON.AJAX("./json/Penang/cishanfuli.geojson").addTo(mainmap)
var PNG_dy = new L.GeoJSON.AJAX("./json/Penang/diyuan.geojson").addTo(mainmap)
var PNG_dlzx = new L.GeoJSON.AJAX("./json/Penang/dulizhongxue.geojson").addTo(mainmap)
var PNG_qnfn = new L.GeoJSON.AJAX("./json/Penang/qingniaofunu.geojson").addTo(mainmap)
var PNG_tyly = new L.GeoJSON.AJAX("./json/Penang/tiyulianyi.geojson").addTo(mainmap)
var PNG_wj = new L.GeoJSON.AJAX("./json/Penang/wenjiao.geojson").addTo(mainmap)
var PNG_xy = new L.GeoJSON.AJAX("./json/Penang/xueyuan.geojson").addTo(mainmap)
var PNG_yy = new L.GeoJSON.AJAX("./json/Penang/yeyuan.geojson").addTo(mainmap)
var PNG_zh = new L.GeoJSON.AJAX("./json/Penang/zonghe.geojson").addTo(mainmap)
var PNG_zj = new L.GeoJSON.AJAX("./json/Penang/zongjiao.geojson").addTo(mainmap)

var PHG_csfl = new L.GeoJSON.AJAX("./json/Pahang/cishanfuli.geojson").addTo(mainmap)
var PHG_dy = new L.GeoJSON.AJAX("./json/Pahang/diyuan.geojson").addTo(mainmap)
var PHG_qnfn = new L.GeoJSON.AJAX("./json/Pahang/qingniaofunu.geojson").addTo(mainmap)
var PHG_tyly = new L.GeoJSON.AJAX("./json/Pahang/tiyulianyi.geojson").addTo(mainmap)
var PHG_wj = new L.GeoJSON.AJAX("./json/Pahang/wenjiao.geojson").addTo(mainmap)
var PHG_xy = new L.GeoJSON.AJAX("./json/Pahang/xueyuan.geojson").addTo(mainmap)
var PHG_yy = new L.GeoJSON.AJAX("./json/Pahang/yeyuan.geojson").addTo(mainmap)
var PHG_zh = new L.GeoJSON.AJAX("./json/Pahang/zonghe.geojson").addTo(mainmap)
var PHG_zj = new L.GeoJSON.AJAX("./json/Pahang/zongjiao.geojson").addTo(mainmap)

var NSN_csfl = new L.GeoJSON.AJAX("./json/Negeri Sembilan/cishanfuli.geojson").addTo(mainmap)
var NSN_dy = new L.GeoJSON.AJAX("./json/Negeri Sembilan/diyuan.geojson").addTo(mainmap)
var NSN_dlzx = new L.GeoJSON.AJAX("./json/Negeri Sembilan/dulizhongxue.geojson").addTo(mainmap)
var NSN_qnfn = new L.GeoJSON.AJAX("./json/Negeri Sembilan/qingniaofunu.geojson").addTo(mainmap)
var NSN_tyly = new L.GeoJSON.AJAX("./json/Negeri Sembilan/tiyulianyi.geojson").addTo(mainmap)
var NSN_wj = new L.GeoJSON.AJAX("./json/Negeri Sembilan/wenjiao.geojson").addTo(mainmap)
var NSN_xy = new L.GeoJSON.AJAX("./json/Negeri Sembilan/xueyuan.geojson").addTo(mainmap)
var NSN_yy = new L.GeoJSON.AJAX("./json/Negeri Sembilan/yeyuan.geojson").addTo(mainmap)
var NSN_zh = new L.GeoJSON.AJAX("./json/Negeri Sembilan/zonghe.geojson").addTo(mainmap)
var NSN_zj = new L.GeoJSON.AJAX("./json/Negeri Sembilan/zongjiao.geojson").addTo(mainmap)

var MLK_dlzx = new L.GeoJSON.AJAX("./json/Melaka/dulizhongxue.geojson").addTo(mainmap)

var KUL_dlzx = new L.GeoJSON.AJAX("./json/Kuala Lumpur/dulizhongxue.geojson").addTo(mainmap)

var KTN_csfl = new L.GeoJSON.AJAX("./json/Kelantan/cishanfuli.geojson").addTo(mainmap)
var KTN_dy = new L.GeoJSON.AJAX("./json/Kelantan/diyuan.geojson").addTo(mainmap)
var KTN_dlzx = new L.GeoJSON.AJAX("./json/Kelantan/dulizhongxue.geojson").addTo(mainmap)
var KTN_tyly = new L.GeoJSON.AJAX("./json/Kelantan/tiyulianyi.geojson").addTo(mainmap)
var KTN_wj = new L.GeoJSON.AJAX("./json/Kelantan/wenjiao.geojson").addTo(mainmap)
var KTN_xy = new L.GeoJSON.AJAX("./json/Kelantan/xueyuan.geojson").addTo(mainmap)
var KTN_yy = new L.GeoJSON.AJAX("./json/Kelantan/yeyuan.geojson").addTo(mainmap)
var KTN_zh = new L.GeoJSON.AJAX("./json/Kelantan/zonghe.geojson").addTo(mainmap)
var KTN_zj = new L.GeoJSON.AJAX("./json/Kelantan/zongjiao.geojson").addTo(mainmap)

var KDH_csfl = new L.GeoJSON.AJAX("./json/Kedah/cishanfuli.geojson").addTo(mainmap)
var KDH_dy = new L.GeoJSON.AJAX("./json/Kedah/diyuan.geojson").addTo(mainmap)
var KDH_dlzx = new L.GeoJSON.AJAX("./json/Kedah/dulizhongxue.geojson").addTo(mainmap)
var KDH_qnfn = new L.GeoJSON.AJAX("./json/Kedah/qingniaofunu.geojson").addTo(mainmap)
var KDH_tyly = new L.GeoJSON.AJAX("./json/Kedah/tiyulianyi.geojson").addTo(mainmap)
var KDH_wj = new L.GeoJSON.AJAX("./json/Kedah/wenjiao.geojson").addTo(mainmap)
var KDH_xy = new L.GeoJSON.AJAX("./json/Kedah/xueyuan.geojson").addTo(mainmap)
var KDH_yy = new L.GeoJSON.AJAX("./json/Kedah/yeyuan.geojson").addTo(mainmap)
var KDH_zh = new L.GeoJSON.AJAX("./json/Kedah/zonghe.geojson").addTo(mainmap)
var KDH_zj = new L.GeoJSON.AJAX("./json/Kedah/zongjiao.geojson").addTo(mainmap)

var JHR_csfl = new L.GeoJSON.AJAX("./json/Johor/cishanfuli.geojson").addTo(mainmap)
var JHR_dy = new L.GeoJSON.AJAX("./json/Johor/diyuan.geojson").addTo(mainmap)
var JHR_dlzx = new L.GeoJSON.AJAX("./json/Johor/dulizhongxue.geojson").addTo(mainmap)
var JHR_qnfn = new L.GeoJSON.AJAX("./json/Johor/qingniaofunu.geojson").addTo(mainmap)
var JHR_tyly = new L.GeoJSON.AJAX("./json/Johor/tiyulianyi.geojson").addTo(mainmap)
var JHR_wj = new L.GeoJSON.AJAX("./json/Johor/wenjiao.geojson").addTo(mainmap)
var JHR_xy = new L.GeoJSON.AJAX("./json/Johor/xueyuan.geojson").addTo(mainmap)
var JHR_yy = new L.GeoJSON.AJAX("./json/Johor/yeyuan.geojson").addTo(mainmap)
var JHR_zh = new L.GeoJSON.AJAX("./json/Johor/zonghe.geojson").addTo(mainmap)
var JHR_zj = new L.GeoJSON.AJAX("./json/Johor/zongjiao.geojson").addTo(mainmap)


var overlays = [
    {
        groupName: "Terengganu",
        expanded: true,
        layers: {
            "慈善福利": TRG_csfl,
            "地缘": TRG_dy,
            "体育联谊": TRG_tyly,
            "文教": TRG_wj,
            "血缘": TRG_xy,
            "业缘": TRG_yy,
            "综合": TRG_zh,
            "宗教": TRG_zj
        }
    },
    {
        groupName: "Selangor",
        expanded: false,
        layers: {
            "慈善福利": SGR_csfl,
            "地缘": SGR_dy,
            "体育联谊": SGR_tyly,
            "文教": SGR_wj,
            "血缘": SGR_xy,
            "业缘": SGR_yy,
            "综合": SGR_zh,
            "宗教": SGR_zj
        }
    },
    {
        groupName: "Sarawak",
        expanded: false,
        layers: {
            "慈善福利": SWK_csfl,
            "地缘": SWK_dy,
            "独立中学": SWK_dlzx,
            "青年妇女": SWK_qnfn,
            "体育联谊": SWK_tyly,
            "文教": SWK_wj,
            "血缘": SWK_xy,
            "业缘": SWK_yy,
            "综合": SWK_zh,
            "宗教": SWK_zj
        }
    },
    {
        groupName: "Sabah",
        expanded: false,
        layers: {
            "慈善福利": SBH_csfl,
            "地缘": SBH_dy,
            "独立中学": SBH_dlzx,
            "青年妇女": SBH_qnfn,
            "体育联谊": SBH_tyly,
            "文教": SBH_wj,
            "血缘": SBH_xy,
            "业缘": SBH_yy,
            "综合": SBH_zh,
            "宗教": SBH_zj
        }
    },
    {
        groupName: "Perlis",
        expanded: false,
        layers: {
            "慈善福利": PLS_csfl,
            "地缘": PLS_dy,
            "青年妇女": PLS_qnfn,
            "体育联谊": PLS_tyly,
            "文教": PLS_wj,
            "血缘": PLS_xy,
            "业缘": PLS_yy,
            "综合": PLS_zh,
            "宗教": PLS_zj
        }
    },
    {
        groupName: "Perak",
        expanded: false,
        layers: {
            "慈善福利": PRK_csfl,
            "地缘": PRK_dy,
            "独立中学": PRK_dlzx,
            "青年妇女": PRK_qnfn,
            "体育联谊": PRK_tyly,
            "文教": PRK_wj,
            "血缘": PRK_xy,
            "业缘": PRK_yy,
            "综合": PRK_zh,
            "宗教": PRK_zj
        }
    },
    {
        groupName: "Penang",
        expanded: false,
        layers: {
            "慈善福利": PNG_csfl,
            "地缘": PNG_dy,
            "独立中学": PNG_dlzx,
            "青年妇女": PNG_qnfn,
            "体育联谊": PNG_tyly,
            "文教": PNG_wj,
            "血缘": PNG_xy,
            "业缘": PNG_yy,
            "综合": PNG_zh,
            "宗教": PNG_zj
        }
    },
    {
        groupName: "Pahang",
        expanded: false,
        layers: {
            "慈善福利": PHG_csfl,
            "地缘": PHG_dy,
            "青年妇女": PHG_qnfn,
            "体育联谊": PHG_tyly,
            "文教": PHG_wj,
            "血缘": PHG_xy,
            "业缘": PHG_yy,
            "综合": PHG_zh,
            "宗教": PHG_zj
        }
    },
    {
        groupName: "Negeri Sembilan",
        expanded: false,
        layers: {
            "慈善福利": NSN_csfl,
            "地缘": NSN_dy,
            "独立中学": NSN_dlzx,
            "青年妇女": NSN_qnfn,
            "体育联谊": NSN_tyly,
            "文教": NSN_wj,
            "血缘": NSN_xy,
            "业缘": NSN_yy,
            "综合": NSN_zh,
            "宗教": NSN_zj
        }
    },
    {
        groupName: "Melaka",
        expanded: false,
        layers: {
            "独立中学": MLK_dlzx
        }
    },
    {
        groupName: "Kuala Lumpur",
        expanded: false,
        layers: {
            "独立中学": KUL_dlzx
        }
    },
    {
        groupName: "Kelantan",
        expanded: false,
        layers: {
            "慈善福利": KTN_csfl,
            "地缘": KTN_dy,
            "独立中学": KTN_dlzx,
            "体育联谊": KTN_tyly,
            "文教": KTN_wj,
            "血缘": KTN_xy,
            "业缘": KTN_yy,
            "综合": KTN_zh,
            "宗教": KTN_zj
        }
    },
    {
        groupName: "Kedah",
        expanded: false,
        layers: {
            "慈善福利": KDH_csfl,
            "地缘": KDH_dy,
            "独立中学": KDH_dlzx,
            "体育联谊": KDH_tyly,
            "文教": KDH_wj,
            "血缘": KDH_xy,
            "业缘": KDH_yy,
            "综合": KDH_zh,
            "宗教": KDH_zj
        }
    },
    {
        groupName: "Johor",
        expanded: false,
        layers: {
            "慈善福利": JHR_csfl,
            "地缘": JHR_dy,
            "独立中学": JHR_dlzx,
            "青年妇女": JHR_qnfn,
            "体育联谊": JHR_tyly,
            "文教": JHR_wj,
            "血缘": JHR_xy,
            "业缘": JHR_yy,
            "综合": JHR_zh,
            "宗教": JHR_zj
        }
    },
    {
        groupName: "Misc",
        expanded: true,
        layers: {
            "Villages_new": villages_new,
            "towns_new": towns_new,
            "temples_new": temples_new
        }
    }
]

var options = {
    container_width: "300px",
    container_maxHeight: "700px",
    group_maxHeight: "250px",
    groupCheckboxes: true
};


var control = L.Control.styledLayerControl(baseMaps, overlays, options);
mainmap.addControl(control);

$(document).ready(function () {
    mainmap.invalidateSize()

})

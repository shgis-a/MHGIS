d3.xml("./img/Blank_malaysia_map.svg")
    .then(data => {
        d3.select("#svg").node().append(data.documentElement);
        $("#MalaysianStates").children().each(function (i) {
            if ($(this).is("path")) {
                // if there is only one path

                $(this).mouseover(function () {
                    $(this).css({
                        "fill": "#ff9797",
                        "stroke": "#000000",
                        "stroke-width": "2px"
                    })
                }).mouseout(function () {
                    $(this).css({
                        "fill": "#c8c8c8",
                        "stroke": "none",
                        "stroke-width": "1px"
                    })
                }).click(function () {
                    var abbrv = $(this).attr("id");
                    window.location.href = "./".concat(abbrv).concat(".html");
                    return false;
                })
            } else if ($(this).is("g")) {
                // if it is a svg group
                $(this).mouseover(function () {
                    $(this).children().each(function (i) {
                        $(this).css({
                            "fill": "#ff9797",
                            "stroke": "#000000",
                            "stroke-width": "2px"
                        })
                    })
                }).mouseout(function () {
                    $(this).children().each(function (i) {
                        $(this).css({
                            "fill": "#c8c8c8",
                            "stroke": "none",
                            "stroke-width": "1px"
                        })
                    })
                }).click(function () {
                    var abbrv = $(this).attr("id");
                    window.location.href = "./".concat(abbrv).concat(".html");
                    return false;
                })
            } else {
                throw "svg map is wrongly formatted."
            }
        })
    });

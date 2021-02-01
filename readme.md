# The MHGIS Project

*Originally developer and the one writing this: Reuben X. Wang (Reubenwxw@gmail.com)*

## 1. Introduction/ General Observations
- This project uses Leaflet because Leaflet is easy to use, open source, and extremely modifiable.
- This project is also designed to be modular; each new dataset can be added on as a new tab without modifying pre-existing data sets.
- Put simply, each time a tab is clicked on, the map is wiped clean allowing for a new slate of data and interactions to be activated.
- The key breakthrough of this project - **this is important** - is the loading of points as a layer group with a single renderer as opposed to loading them as discrete DOM objects. Although convinient, Leaflet's built-in GeoJSON loader uses the latter - initial versions of the website using the built-in GeoJSON loaders were extremely slow. This current version loads points one-by-one by submitting LatLng coordinates into the renderer to be drawn as circle markers. One drawback is that we can only display data points as dots - no pictures as map symbology.
- In all instances, the color of map symbology is dervied from [ColorBrewer 2](https://colorbrewer2.org/) Colorbrewer 2 is an academic project to research and provide the most accessible and best use-cases for map coloring. This is necessary to avoid giving the impression to users that different points are ordinal or continuous as opposed to categorical variables.

## 2. Data sources
- 2.1 The current version loads data through jquery AJAX calls on JSON files in the ```/json``` directory. There are two source files at the moment, which are:
	1.  ``` MHGIS Masterlist.JSON ``` which contains the points derived from the book "马来西亚华团总名册" (Roster of Malaysian Chinese Associations).
	2. ``` temple_georefed.json ``` which contains the points relating to the dataset of temples in Johor and Melaka. 
- 2.2 The original code used to process these two files can be found in the ```/workfile``` directory. The main code is in the ``` Data processor.ipynb ``` file, which you'll need Jupyter Notebook to open. In this file, there are a number of code blocks:
	1. The first few are outdated QGIS scripts. These were originally used to divide the data points into discrete .geojson files by the geographical boundaries of state and by categories. I kept the code here for future reference.
	2. The next few scripts (the first in this series is indicated by the comment ``` # Geocoding temples ```) is the code used to geocode temple addresses, and should be easily adaptable for any new data sets.  Geocoding refers to the conversion of addresses to LatLng Coordinates. Do note a few things here:
		- You'll need to get a Google Maps API key for this to work. I left it out for security purposes as Google API calls cost money per run, and I don't want people stealing my API key off github.
		- You'll need to edit the addresses to improve your chances of getting the write LatLng. Primarily, this involves making sure the state and country is included in every address to be geocoded.
		
## 3. The code itself

### 3.1 The "Home" Tab
- The Home tab is relatively straightforward in function. It loads every data source, iterates through them, and adds each data point onto the map one-by-one. The only differences across data sets is the color of the circle markers to be drawn unto the map. There is little interactivity to the map other than popups when you click on points

### 3.2 The "Roster" Tab
- The Roster tab only loads data points from the roster data source (see part 2.1) but colors each point by the category they are in. The color of each category can be changed with the helper function ```roster_fill_color```.
- This tab also allows users to manually check the boxes of what data points they want to see on the map. This is done via this system:
	1. Upon entering the tab, the function ```load_roster()``` is run.
	2. Inside this function is the following code:
		```
		$("input").change(function () {
			if ($(this).is(":checked")) {
				filter_state($(this).attr('id'), 1)
			} else {
				filter_state($(this).attr('id'), 2)
			}
		})
		```
		- This code block initiates a listener for any changes in the checkbox form in the sidebar of the website.
		- This code block calls the `filter_state` function.
	3. The `filter_state` Helper function to identify what entries to fade out by updating roster_buffer. Takes three arguments; Firstly, "key" is the field you want to filter. "Operation" has two options: "1" removes items from the list (i.e. un-fades points) and "2" add items to the list (i.e. fades out points)
		- Let me elaborate. Let's say the Johor checkbox is unchecked. The above codeblock will thus call the following `filter_state(Johor, 2)`. `filter_state` will then initiate its `2` operation.
		- The function will first identify whether `Johor` is a region or a category. Once `Johor` is identified as a region, `filter_state` will iterate through every data point in the data set.
		- If it finds a data point has the region of `Johor`, it will run the following code:
		```
		if (entry["UID"] in roster_buffer) {
						roster_buffer[entry["UID"]] = roster_buffer[entry["UID"]] + 1
					} else {
						roster_buffer[entry["UID"]] = 1
					}
		```
		- The global variable `roster_buffer` will then look something like this:
		```
		{2544: 1, 2545: 1, 2546: 1, 2547: 1, 2548: 1, 2549: 1, 2550: 1, 2551: 1, 2552: 1, 2553: 1, 2554: 1, 2555: 1, 2556: 1, 2557: 1, 2558: 1, 2559: 1, 2560: 1, 2561: 1, 2562: 1, 2563: 1, 2564: 1, 2565: 1, 2566: 1, 2567: 1, 2568: 1, 2569: 1, 2570: 1, 2571: 1, 2572: 1, 2573: 1, 2574: 1, 2575: 1, 2576: 1, 2577: 1, 2578: 1, 2579: 1, 2580: 1, 2581: 1, 2582: 1, 2583: 1, 2584: 1, 2585: 1, 2586: 1, 2587: 1, 2588: 1, 2589: 1, 2590: 1, 2591: 1, 2592: 1, 2593: 1, 2594: 1, 2595: 1, 2596: 1, 2597: 1, 2598: 1, 2599: 1, 2600: 1, 2601: 1, 2602: 1, 2603: 1, 2604: 1, 2605: 1, 2606: 1, 2607: 1, 2608: 1, 2609: 1, 2610: 1, 2611: 1, 2612: 1, 2613: 1, 2614: 1, 2615: 1, 2616: 1, 2617: 1, 2618: 1, 2619: 1, 2620: 1, 2621: 1, 2622: 1, 2623: 1, 2624: 1, 2625: 1, 2626: 1, 2627: 1, 2628: 1, 2629: 1, 2630: 1, 2631: 1, 2632: 1, 2633: 1, 2634: 1, 2635: 1, 2636: 1, 2637: 1, 2638: 1, 2639: 1, 2640: 1, 2641: 1, 2642: 1, 2643: 1, …}
		```
		- Every point with the region of `Johor` will have their `UID` added as a key in `roster_buffer`.
	4. The user then clicks "filter", The following code block from the `load_roster` function would have already added a listerner event to the click.
	```
	// This allows the filter button to work.
	$("#filter").on('click', function () {
		load_roster(renderer)
	})
	```
	5. This means the map will be purged of all data points and the data will be loaded again. This time, however, the line `if (!(roster_buffer[item["UID"]] > 0))` in `load_roster` will kick in. Entries whose UID are keys in `roster_buffer` will not be loaded. Points in Johor are thus not loaded.
- The reverse happens when the user re-checks a checkbox; say the user re-checks the `Johor` checkbox. Operation 1 of `filter_state` will then remove the UID of `Johor` points from `roster_buffer`. Clicking on filter once again will allow points in `Johor` to be re-loaded into the map.
- What if, however, the user de-selects both `Johor` and `Religious Associations` (`宗教`)? In that case, Religious Associations in Johor will have the value of `2` in `roster_buffer` on account of being added to on two occasions, once when Johor is unchecked and once when Religious Associations are unchecked.
- So as long the value of a UID in `roster_buffer` is above zero, it will not be rendered onto the map when the filter key is selected.
- This system allows us to filter multiple conditionals.


$.getJSON("./MHGIS Masterlist.json", function (data) {
	const options = {
		shouldSort: true,
		tokenize: true,
		matchAllTokens: true,
		includeScore: true,
		includeMatches: true,
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
				name: "Country",
				weight: 0.01
					},
			{
				name: "UID",
				weight: 0.5
			}]
	}

	console.log(data)

	const fuse = new Fuse(data, options)

	// Change the pattern
	const pattern = ""

	$('#searchbox').on('input', function (e) {
		const output = fuse.search($(this).val())
		console.log($(this).val())
		console.log(output)
	});
})

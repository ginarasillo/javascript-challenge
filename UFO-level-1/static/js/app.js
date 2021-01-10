// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbl = d3.select("#ufo-table")
var tbody = tbl.select("tbody")

var columns = Object.keys(tableData[0])

var dateField = d3.select("#datetimeField")
var searchButton = d3.select("#filter-btn")

var populate = (data) => {

	data.forEach(sighting => {
		var row = tbody.append("tr")
		columns.forEach(column => row.append("td").text(sighting[column])
		)
	});
}

populate(tableData)

searchButton.on("click", () =>{
    d3.event.preventDefault()
    var dt = dateField.property("value").trim()

    var filteredData = data.filter(data => data.datetime === dt)

    // Clear html table
    tbody.html("");

    if (filteredData.length > 0){
        populate(filteredData)
    } else{
        console.log("No results found")
        tbody.append("tr").append("td").attr("colspan", columns.length).text("No sightings found!!")
    }

})
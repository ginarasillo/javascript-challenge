// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbl = d3.select("#ufo-table")
var tbody = tbl.select("tbody")

var columns = Object.keys(tableData[0])

var dateField = d3.select("#datetimeField")
var cityField = d3.select("#cityField")
var searchButton = d3.select("#filter-btn")
var clearButton = d3.select("#clear-btn")

d3.select("#cityField").selectAll("option")
    .data(d3.map(data, d => { return d.city }).keys().sort())
    .enter()
    .append("option")
    .text(d => {return d})
    .attr("value",d => {return d})

var populate = (data) => {
    // Clear html table
    tbody.html("");
	data.forEach(sighting => {
		var row = tbody.append("tr")
		columns.forEach(column => row.append("td").text(sighting[column])
		)
	});
}

populate(tableData)

searchButton.on("click", () =>{
    d3.event.preventDefault()

    // Get filter values
    var dt = dateField.property("value").trim()
    var cityNode = cityField.node()
    var city = cityNode.options[cityNode.selectedIndex].value
   
    var filteredData = data.filter(data => {
        // Filter depending on the values provided
        var dateFilter = true
        var cityFilter = true
        if (dt && dt !== ""){
            dateFilter = data.datetime === dt 
        }
        if (city && city !== ""){
            cityFilter = data.city === city
        }
        return dateFilter && cityFilter
        
    })

    if (filteredData.length > 0){
        populate(filteredData)
    } else{
        // Clear html table
        tbody.html("");
        tbody.append("tr").append("td").attr("colspan", columns.length).text("No sightings found!!")
    }

})

clearButton.on("click", () =>{
    d3.event.preventDefault()
    dateField.value = ""
    cityField.value = ""
    populate(data)
})
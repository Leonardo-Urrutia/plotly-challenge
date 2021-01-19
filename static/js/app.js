d3.select("#selDataset").on("change", optionChanged)


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

d3.json("../samples.json").then((importedData) => {
    var data = importedData;
    selectBox = d3.select("#selDataset")

    importedData.names.forEach(name => {
        selectBox.append("option").text(name).attr("value", name)
    })

    // console.log(data);
    // console.log(data.metadata[0].id);
    // console.log(data.samples);

});

function optionChanged() {
    // d3.event.preventDefault();

    d3.json("../samples.json").then((importedData) => {

        var dropdownMenu = d3.select("#selDataset");
        var idLookup = dropdownMenu.property("value");
        var data = importedData;
        var demoInfo = d3.select("#sample-metadata");

        console.log(idLookup);
        var filteredData = data.metadata.filter(person => person.id == idLookup);
        console.log(filteredData);

        // filteredData.forEach((person) => {
        //     console.log(person)
        //     Object.entries(person).forEach(([key, value]) => {
        //         demoInfo.append("p").text(`${key}: ${value}`)
        //     })
        // })
        demoInfo.html("");

        Object.entries(filteredData[0]).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
        });

    });



}
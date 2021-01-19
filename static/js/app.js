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
        var barVis = d3.select("#bar");


        console.log(idLookup);
        var filteredMetadata = data.metadata.filter(person => person.id == idLookup);
        // console.log(filteredMetadata);


        var filteredSampleData = data.samples.filter(person => person.id == idLookup);

        topBacteriaId = filteredSampleData[0].otu_ids.slice(0, 10).reverse();
        topBacteriaValues = filteredSampleData[0].sample_values.slice(0,10).reverse();


        demoInfo.html("");

        Object.entries(filteredMetadata[0]).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
        });

        var topOtuData = [{
            x: topBacteriaValues,
            y: topBacteriaId.map(bact => "OTU " + bact),
            text: topBacteriaId.map(bact => "OTU " + bact),
            name: "OTU",
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar", topOtuData)

    });



}
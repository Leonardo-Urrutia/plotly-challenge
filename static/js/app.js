


// function to initiate the data to html page
function init() {
    optionChanged()
    
}


//event handlers action to update graphs and data onto page
function optionChanged() {
    // d3.event.preventDefault();

    d3.json("samples.json").then((importedData) => {
        var data = importedData;
        d3.select("#selDataset").on("change", optionChanged)
        var dropdownMenu = d3.select("#selDataset");
        
        data.names.forEach(name => {
            dropdownMenu.append("option").text(name).attr("value", name)
        })

        var idLookup = dropdownMenu.property("value");
        


        //Creating filtered data from dropdown selection
        var filteredMetadata = data.metadata.filter(person => person.id == idLookup);
        var filteredSampleData = data.samples.filter(person => person.id == idLookup);

        
        console.log(filteredSampleData);

        // Data for Bar Graph
        var topBacteriaId = filteredSampleData[0].otu_ids.slice(0, 10).reverse();
        var topBacteriaValues = filteredSampleData[0].sample_values.slice(0,10).reverse();
        var topBacteriaLabels = filteredSampleData[0].otu_labels.slice(0,10).reverse();

        // Data for Bubble Chart
        var bacteriaID = filteredSampleData[0].otu_ids
        var bacteriaValues = filteredSampleData[0].sample_values
        var bacteriaLabels = filteredSampleData[0].otu_labels

        // Data for Gauge
        var bbWashFreq = filteredMetadata[0].wfreq

        // Demodraphic Info Table
        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");

        Object.entries(filteredMetadata[0]).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
        });

        var topOtuData = [{
            x: topBacteriaValues,
            y: topBacteriaId.map(bact => "OTU " + bact),
            text: topBacteriaLabels,
            name: "OTU",
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar", topOtuData)


        // Bubble Chart
        var bubbleData = [{
            y: bacteriaValues,
            x: bacteriaID,
            text: bacteriaLabels,
            mode: 'markers',
            marker: {
                color: bacteriaID,
                size: bacteriaValues
            }
        }];
        var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 1200
        };
        Plotly.newPlot('bubble', bubbleData, layout);

        // Gauge
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: bbWashFreq,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number+delta",
                delta: { reference: 0 },
                gauge: {
                    axis: { range: [null, 9]},
                    steps: [
                        { range: [0, 1], color: "white" },
                        { range: [1, 2], color: "darkcyan" },
                        { range: [2, 3], color: "cyan" },
                        { range: [3, 4], color: "burlywood" },
                        { range: [4, 5], color: "coral" },
                        { range: [5, 6], color: "yellow" },
                        { range: [6, 7], color: "green" },
                        { range: [7, 8], color: "blue" },
                        { range: [8, 9], color: "purple" },
                    ],
                    threshold: {
                        line: { color: "purple", width: 4 },
                        thickness: 0.75,
                        value: 4
                    }
                }
            }
        ];
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    });
}

init()
#target photoshop

// Function to write data to CSV
function writeToCSV(filePath, data) {
    var file = new File(filePath);
    var isNewFile = !file.exists;
    file.open("a"); // Open file for appending
    if (isNewFile) {
        file.writeln("Filename,L,a,b"); // Write CSV header if it's a new file
    }
    file.writeln(data.join(",")); // Write the data
    file.close();
}

// Function to round Lab values to match manual sampling
function roundLabValues(labColor) {
    return {
        l: Math.round(labColor.l),
        a: Math.round(labColor.a),
        b: Math.round(labColor.b)
    };
}

// Function to process a single image
function processImage(filePath) {
    var file = new File(filePath);
    var doc = open(file);

    // Define the coordinates
    var x = 2;
    var y = 2;

    // Create a sample at the given coordinates
    var sampleColor = doc.colorSamplers.add([x, y]);

    // Get the Lab color values
    var labColor = sampleColor.color.lab;

    // Round the Lab color values
    var roundedLabColor = roundLabValues(labColor);

    // Clean up by removing the color sampler
    sampleColor.remove();

    // Prepare the data for CSV
    var filename = doc.name;
    var data = [filename, roundedLabColor.l, roundedLabColor.a, roundedLabColor.b];

    // Define the CSV file path
    var csvFilePath = "colors.csv";

    // Write the data to CSV
    writeToCSV(csvFilePath, data);

    // Close the document
    doc.close(SaveOptions.DONOTSAVECHANGES);
}

// Define the folder path
var folderPath = "croppedimages";

// Get the folder
var folder = new Folder(folderPath);

// Get all files in the folder
var files = folder.getFiles(function (file) {
    return file instanceof File && file.name.match(/\.(jpe?g|png|webp|tiff?|bmp|gif)$/i);
});

// Process each file
for (var i = 0; i < files.length; i++) {
    processImage(files[i].fsName);
}

alert("Lab values for all images have been written to Labvalues.csv");

const fs = require('fs');
const { encodeAcb } = require('@atesgoral/acb');

// Specify the path to your JSON file containing the ACB data
const jsonFilePath = 'output.json'; // Update with your file path

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const acbData = JSON.parse(data);

        // Validate the ACB data
        const isValid = validateAcbData(acbData);
        if (!isValid) {
            console.error('Invalid ACB data. Please check the color entries.');
            return;
        }

        // Encode ACB data
        const acbBuffer = Buffer.concat([...encodeAcb(acbData)]);

        // Write the ACB buffer to a file
        fs.writeFileSync('Pantone Solid Coated 2024 V5.acb', acbBuffer);

        console.log('ACB file generated successfully: Pantone Solid Coated 2024.acb');
    } catch (error) {
        console.error('Error parsing JSON or encoding to ACB:', error);
    }
});

// Function to validate the ACB data
function validateAcbData(data) {
    if (!data.colors || !Array.isArray(data.colors)) {
        return false;
    }

    for (const color of data.colors) {
        if (!color.name || !color.code || color.code.length === 0 || !Array.isArray(color.components) || color.components.length !== 3) {
            console.error('Invalid color entry:', color);
            return false;
        }
    }

    return true;
}

# unofficial-pantone-solid-coated-2024-v5
unofficial acb file with 3219 colors

# Example Pantone Color Processing Workflow

This repository contains the scripts and instructions for processing Pantone color images, extracting color data, and creating an ACB file for Adobe applications.

## Files Included

- `generate-webplinks-powershell.txt`: PowerShell script to generate web links.
- `webplinks.txt`: A text file containing generated web links.
- `Labcolors.jsx`: JavaScript file for extracting Lab colors in Photoshop.
- `createjsonfromcsv-powershell.txt`: PowerShell script to create a JSON file from a CSV.
- `encode-acb.js`: Node.js script to encode a JSON file into an ACB file.
- `Pantone Solid Coated 2024 V5.acb`: The final ACB file.

## Workflow

### Step 1: Generate Web Links

1. Run the `generate-webplinks-powershell.txt` script in PowerShell to generate web links.
2. The links will be saved in the `webplinks.txt` file.

### Step 2: Download Images

1. Use `wget` to download the images from the valid links in `webplinks.txt`.
2. Save the downloaded images in the `croppedimages` directory.

### Step 3: Process Images in Photoshop

1. Use Photoshop to manipulate the images in the `croppedimages` directory to get normalized pixels.
2. Run the `Labcolors.jsx` script on the `croppedimages` folder to extract the colors and save them in `colors.csv`.

### Step 4: Create JSON from CSV

1. Run the `createjsonfromcsv-powershell.txt` script in PowerShell to convert `colors.csv` to `output.json`.

    ```powershell
    .\createjsonfromcsv-powershell.txt
    ```

### Step 5: Validate JSON

1. Validate the `output.json` file online using [JSON Formatter](https://jsonformatter.curiousconcept.com/#).
2. Download the corrected file and rename it to `output.json`.
3. Place the `output.json` file in the same directory as `encode-acb.js`.

### Step 6: Generate ACB File

1. Run the `encode-acb.js` script in PowerShell to generate the ACB file.

    ```powershell
    node encode-acb.js
    ```

2. The resulting ACB file will be named `Pantone Solid Coated 2024 V5.acb`.

## Notes

- Ensure you have the necessary permissions and software installed to run the scripts (PowerShell, Photoshop, Node.js, wget).
- Follow the steps carefully to ensure proper processing and generation of the ACB file.

## License

n/a

# unofficial-pantone-solid-coated-2024-v5
unofficial acb file with 3219 colors

# Example Pantone Color Processing Workflow

This repository contains the scripts and instructions for processing Pantone color images, extracting color data, and creating an ACB file for Adobe applications.

## Files Included

- `generate-webplinks-powershell.txt`: PowerShell script to generate web links.
- `webplinks.txt`: A text file containing generated web links.
- `Labcolors.jsx`: JavaScript file for extracting Lab colors in Photoshop.
- `createjsonfromcsv-powershell.txt`: PowerShell script to create a JSON file from a CSV.
- `encode-acb.js`: Node.js script to encode a JSON file into an ACB file, pulled from https://github.com/atesgoral/acb
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
(Put everything from this repo in same directory https://github.com/atesgoral/acb)
1. Run the `encode-acb.js` script in PowerShell to generate the ACB file.

    ```powershell
    node encode-acb.js
    ```

2. The resulting ACB file will be named `Pantone Solid Coated 2024 V5.acb`.

## Notes

- Ensure you have the necessary permissions and software installed to run the scripts (PowerShell, Photoshop, Node.js, wget).
- Follow the steps carefully to ensure proper processing and generation of the ACB file.

# Extra

If you want rgb or hex values intead of Lab, use this imagemagick to process a directory of images, sort their histograms by the most occurring color, and save the filename and the most occurring color to a CSV file. Do whatever with the csv after. This can be repurposed for many different things like base64 encoding pms values into a portable html5 file or other things. 

## Requirements

- [ImageMagick](https://imagemagick.org) installed and the path to `magick.exe` correctly set.
- PowerShell

## Usage

1. **Set Paths**:
   - Update the `$magickPath`, `$imagesDirectory`, and `$outputCsv` variables in the script to point to your actual directories and files.

2. **Run the Script**:
   - Save the script to a `.ps1` file.
   - Open PowerShell with administrative privileges.
   - Run the script:
     ```powershell
     .\path\to\your\script.ps1
     ```

3. **Script Explanation**:
   - **Set Paths**:
     - `$magickPath`: Path to ImageMagick executable.
     - `$imagesDirectory`: Directory containing your images.
     - `$outputCsv`: Path to the output CSV file.
   - **Clear and Initialize CSV File**:
     - Clears the content of the CSV file if it exists and adds a header row.
   - **Get Image Files**:
     - Retrieves all `.webp` files from the specified directory.
   - **Process Each Image**:
     - For each image, execute the ImageMagick command to get the color histogram.
     - Sort the histogram by the most occurring color and select the top entry.
     - Extract the hex value of the most occurring color.
   - **Write to CSV**:
     - Writes the filename and the most occurring color to the CSV file.
   - **Completion Message**:
     - Prints a message indicating that the process is complete and the results are saved.

## PowerShell Script

```powershell
# Define the path to your ImageMagick executable
$magickPath = "C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"

# Define the path to the directory containing the images
$imagesDirectory = "C:\path\to\your\croppedimages"

# Define the path to the output CSV file
$outputCsv = "C:\path\to\output\histogramsort.csv"

# Ensure the output CSV file is empty
Clear-Content $outputCsv

# Add header to the CSV file
Add-Content -Path $outputCsv -Value "Filename,MostOccurringColor"

# Get all image files in the directory
$imageFiles = Get-ChildItem -Path $imagesDirectory -Filter *.webp

foreach ($imageFile in $imageFiles) {
    # Get the full path to the image file
    $imagePath = $imageFile.FullName

    # Execute ImageMagick command to get color histogram information
    $output = & $magickPath convert $imagePath -colors 5 -depth 8 -format "%c" histogram:info: | Sort-Object -Descending | Select-Object -First 1

    # Extract the most occurring color
    $mostOccurringColor = $output -match "#[0-9A-Fa-f]{6}" | Out-Null; $matches[0]

    # Write the filename and most occurring color to the CSV file
    Add-Content -Path $outputCsv -Value "$($imageFile.Name),$mostOccurringColor"
}

# Output completion message
Write-Output "Histogram sorting completed. Results saved to $outputCsv"




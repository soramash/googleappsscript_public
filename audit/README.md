
# Google Slides Text Mosaic Script

This project is a Google Apps Script that randomly mosaics text in a Google Slides presentation. It replaces each character with a mosaic string based on a specified probability, creating a visual effect and helping to protect privacy.

# mosaicingForGoogleSlide.gs

## Features

- **Random Replacement:**  
  Each character is replaced with a mosaic string based on a specified replacement rate (e.g., 70%).

- **Text Style Adjustment:**  
  After the replacement, the script applies a specified font size to the text.

- **Error Handling:**  
  The script uses try/catch blocks to safely skip shapes that do not contain any text, ensuring uninterrupted execution.

## Prerequisites

- **Google Slides:**  
  You need a Google Slides presentation where you want to apply the mosaic effect.

- **Google Apps Script:**  
  Access to the [Google Apps Script Editor](https://script.google.com/) is required.

## Installation and Execution

1. **Open Your Presentation:**  
   Open the target presentation in Google Slides.

2. **Launch the Apps Script Editor:**  
   From the menu, select **"Extensions" > "Apps Script"** to open the script editor.

3. **Paste the Code:**  
   Create a new project and paste the following code:

   ```javascript
   function replaceAllTextWithMosaic() {
     var presentation = SlidesApp.getActivePresentation();
     var slides = presentation.getSlides();
     var mosaicChar = '▓▓';     // Mosaic string
     var replacementRate = 0.7; // Replacement rate (70%)
     var fontSize = 8;          // Font size (points)

     for (var i = 0; i < slides.length; i++) {
       var pageElements = slides[i].getPageElements();
       for (var j = 0; j < pageElements.length; j++) {
         // Process only if the page element is a shape
         if (pageElements[j].getPageElementType() == SlidesApp.PageElementType.SHAPE) {
           var shape = pageElements[j].asShape();
           try {
             // Retrieve the text; if the shape does not contain text, an exception may be thrown
             var textRange = shape.getText();
             var originalText = textRange.asString();
             // Skip processing if the text is empty
             if (originalText === '') {
               continue;
             }
             var mosaicText = '';
             // Decide for each character whether to replace it with the mosaic character
             for (var k = 0; k < originalText.length; k++) {
               if (Math.random() < replacementRate) {
                 mosaicText += mosaicChar;
               } else {
                 mosaicText += originalText[k];
               }
             }
             // Update the text with the mosaic version
             textRange.setText(mosaicText);
             // Change the text style (font size)
             var textStyle = textRange.getTextStyle();
             if (textStyle) {
               textStyle.setFontSize(fontSize);
             }
           } catch(e) {
             // Skip elements without text to avoid errors
             Logger.log("Skipping element without text: " + e);
           }
         }
       }
     }
   }
   ```

4. **Run the Script:**  
   Click the "Run" button at the top of the editor to execute the script. The first time you run it, you will be prompted to grant the necessary permissions to your Google account.

## Customization

- **Changing the Mosaic Character:**  
  Modify the `mosaicChar` variable to change the mosaic string.

- **Adjusting the Replacement Rate:**  
  Change the `replacementRate` variable (a value between 0 and 1) to set the probability of replacement (e.g., 0.7 means a 70% chance for each character).

- **Changing the Font Size:**  
  Adjust the `fontSize` variable to set the font size (in points) of the replaced text.


---

# mosaicingRangeOfSheets.gs
## Usage
Select Cells:
Highlight the range of cells containing the text you want to transform.

Choose a Mosaic Option:
Click on Custom Menu and select one of the following options:

Mosaicking (Random): Applies the group-based mosaic effect.
Mosaicking (Middle): Preserves the first two characters and mosaics the rest.
Mosaicking (Full Random): Replaces every character with a random mosaic symbol.
View the Transformation:
The selected cells will be updated immediately with the chosen mosaic transformation.

## Customization
Mosaic Symbols:
Modify the symbols array to change the set of characters used for the mosaic effect.

Transformation Logic:
Adjust the logic inside randomizeString, replaceInGroupsOfFour, or the anonymous function in replaceWithSymbolsFromMiddle if you wish to change how the text is processed.

Menu Items:
You can add or modify menu items in the onOpen function to incorporate additional transformations or features.



## Notes

- **Shapes Without Text:**  
  The script safely skips any shapes that do not contain text by using try/catch blocks.

- **Irreversible Changes:**  
  Once the text is replaced with mosaic characters, the original text cannot be recovered. It is recommended to back up your presentation before running the script.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

This script is an example of a custom Google Apps Script. Contributions, improvements, and suggestions are welcome; feel free to open issues or submit pull requests.
```





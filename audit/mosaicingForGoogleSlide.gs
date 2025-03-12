function replaceAllTextWithMosaic() {
  var presentation = SlidesApp.getActivePresentation();
  var slides = presentation.getSlides();
  var mosaicChars = ['▒', '░', '▓', '▆']; // Array of mosaic characters to use randomly
  var replacementRate = 0.7;

  for (var i = 0; i < slides.length; i++) {
    var pageElements = slides[i].getPageElements();
    for (var j = 0; j < pageElements.length; j++) {
      // Process only if the page element is a shape
      if (pageElements[j].getPageElementType() == SlidesApp.PageElementType.SHAPE) {
        var shape = pageElements[j].asShape();
        try {
          var textRange = shape.getText();
          var originalText = textRange.asString();

          // Skip if the string is empty or contains only whitespace
          if (!originalText || originalText.trim() === "") {
            continue;
          }

          var mosaicText = '';
          for (var k = 0; k < originalText.length; k++) {
            var char = originalText[k];
            // Replace with mosaic if the character is alphanumeric and random chance
            if (char.match(/[0-9a-zA-Z]/) && Math.random() < replacementRate) {
              // Select a random mosaic character
              var randomMosaicChar = mosaicChars[Math.floor(Math.random() * mosaicChars.length)];
              mosaicText += randomMosaicChar;
            } else {
              mosaicText += char;
            }
          }

          textRange.setText(mosaicText);
          var textStyle = textRange.getTextStyle();
          if (textStyle) {
            // Set the font size to the original font size
            var originalFontSize = textStyle.getFontSize();
            textStyle.setFontSize(originalFontSize);
          }
        } catch(e) {
          // Skip elements that do not contain text
        }
      }
    }
  }
}

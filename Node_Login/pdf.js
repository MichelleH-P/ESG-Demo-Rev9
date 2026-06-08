const pdfKit = require('pdfkit');
const fs = require('fs');
const doc = new pdfDocument();

const pdfDocument = new pdfkit;
//save the pdf file in root directory

pdfDocument.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
doc
  .font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('Uploads/placeholder.jpg', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });

doc.fontSize(20).text('Data Report');

// Finalize PDF file
doc.end();
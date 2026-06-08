// function generatePDF(name, country) {
//     console.log("name and country passed"); 

//     const doc = new PDFDocument();
//     const stream = doc.pipe(blobStream());

//     doc.fontSize(20).text('User Data Report');
//     doc.fontSize(12).text(`Name: ${name}`);
//     doc.text(`Country: ${country}`);
//     doc.text(`Generated Time: ${new Date().toLocaleString()}`);

//     doc.end();
//     stream.on('finish', function() {
//         const url = stream.toBlobURL('application/pdf');
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'Data-Report.pdf';
//         a.click();
//     });
// }
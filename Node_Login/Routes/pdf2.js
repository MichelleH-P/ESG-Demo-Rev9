function generatePDF2(name, country, timezone, unitname, imgData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // //standard variables
    // var boldFont = doc.setFontStyle('bold'),
    // normalFont = doc.setFontStyle('normal');


    // // Set Font
    // doc.setFontStyle('bold');
    // doc.setFontSize(10);
    // doc.text(lhbdex, 100, 130);
    // doc.setFontSize(9);
    // doc.setFontStyle('normal');

    doc.text(80, 80, 'User Data Report');
    doc.text(20, 90, `Name: ${name} [no last name]`);
    doc.text(20, 100, `Country: ${country}`);
    doc.text(20, 110, `Generated at: ${new Date().toLocaleString()}`);
        doc.text(125, 110, `Timezone: ${timezone}`);
    doc.text(20, 120, `Unitname: ${unitname}`);

    if (imgData) {
        // Add image to PDF
        doc.addImage(imgData, 'JPEG', 150, 10, 50, 50); // Adjust the image size and position as needed
    } 

    doc.save('Data-Report.pdf');
}

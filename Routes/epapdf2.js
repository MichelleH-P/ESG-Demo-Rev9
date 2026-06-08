function generatePDF2(name, company, timezone, unitname, imgData, table, tableData) {
    // Initialize the new document
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Print the first page header
    if (imgData) {
        // Add image to PDF
        doc.addImage(imgData, 'JPEG', 10, 10, 50, 20);
        // doc.save('Data-Report.pdf');
        console.log('photo 2 loaded');
    } 

    doc.text(170, 15, 'Page 1');

    // Print the cover page text
    doc.text(80, 40, 'User Data Report');
    doc.text(20, 50, `Name: ${name}`);
    if (company) {
        doc.text(20, 60, `Company: ${company}`);
    }
    doc.text(20, 70, `Generated at: ${new Date().toLocaleString()}`);
        doc.text(125, 70, `Timezone: ${timezone}`);
    doc.text(20, 80, `Unitname: ${unitname}`);

    doc.addPage();

    // Print the second page header
    if (imgData) {
        // Add image to PDF
        doc.addImage(imgData, 'JPEG', 10, 10, 50, 20);
        // doc.save('Data-Report.pdf');
        console.log('photo 2 loaded');
    } 

    doc.text(170, 15, 'Page 2');

    // Print the MOXA table
    // const tablearray = Object.entries(table);
    // // document.addEventListener("DOMContentLoaded", function() {
    // console.log('table loading......');
    // // Add table data
    //     let yPosition = 30;
    //     tablearray.forEach(row => {
    //         doc.text(row.join('  '), 10, yPosition);
    //         // doc.text(100, yPosition, 'nu uh');
    //         // console.log('table cell');
    //         yPosition += 10;
    //     });
    //     console.log('table loaded');
    // // });

    doc.text(90, 40, 'EPA Table');

    var rows = table.querySelectorAll('tr');

    // Initialize starting point for the PDF
    let yPosition = 50;
    
    // Loop through the rows and add to PDF
    rows.forEach(row => {
        console.log('loading table.....');
        let cells = row.querySelectorAll('td, th');
        let rowData = [];
        
        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });
        
        doc.text(rowData.join('  '), 20, yPosition);
        yPosition += 10;
    });
    console.log('table loaded');

    doc.addPage();
    doc.text(170, 15, 'Page 3');
    doc.text(90, 40, 'Dummy Table');
    console.log('autotable loading.....');
    console.log(tableData);
    // const table = Array.from(tableRows);
    // Add table to PDF
    doc.autoTable({
        head: [tableData.headers],
        body: tableData.rows,
        theme: 'grid', // Adds border around the table
        tableWidth: 'wrap',
        columnWidth: 'wrap',
          // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
        // margin: { top: 10 },
        // pageBreak: 'auto'|'avoid'|'always',
        // // rowPageBreak: 'auto'|'avoid' = 'auto',
        styles: { 
            fontSize: 10,
            cellWidth: 'wrap'
        },
        startY: 50
    });
    if (table != null) {
        console.log('autotable loaded');
    };


    doc.save('Data-Report.pdf');
    console.log('document complete');
}

// function generatePDF2(name, company, timezone, unitname, imgData) {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.text(80, 80, 'User Data Report');
//     doc.text(20, 90, `Name: ${name} [no last name]`);
//     doc.text(20, 100, `Company: ${company}`);
//     doc.text(20, 110, `Generated at: ${new Date().toLocaleString()}`);
//         doc.text(125, 110, `Timezone: ${timezone}`);
//     doc.text(20, 120, `Unitname: ${unitname}`);

//     if (imgData) {
//         // Add image to PDF
//         doc.addImage(imgData, 'JPEG', 150, 10, 50, 50); // Adjust the image size and position as needed
//     } 

//     if (imgData) {
//         // Add image to PDF
//         const img = new Image();
//         console.log('loading photo.........');
//         img.src = imgData;
//         img.onload = function() {
//             const imgWidth = 50;
//             const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio
//             doc.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
//             doc.save('Data-Report.pdf');
//         };
//         console.log('photo loaded');
//     } 

    
// }

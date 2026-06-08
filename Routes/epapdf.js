function generatePDF8(name, company, timezone, unitname, imgData, table) {
    // Initialize the new document
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    console.log('generatePDF8');

    // Print the first page header
    if (imgData) {
        console.log('loading photo.....');
        // Add image to PDF
        doc.addImage(imgData, 'JPEG', 10, 10, 50, 0); // Height set to auto (0) to maintain aspect ratio
        // doc.save('Data-Report.pdf');
        console.log('photo 1 loaded');
    } 

    doc.setFontSize(12);

    // Print the cover page text
    doc.setFontSize(14);
    doc.text(80, 40, 'User Data Report');
    doc.setFontSize(12);
    doc.text(20, 50, `Name: ${name}`);
    if (company) {
        doc.text(20, 60, `Company: ${company}`);
    }
    doc.text(20, 70, `Generated at: ${new Date().toLocaleString()}`);
        doc.text(125, 70, `Timezone: ${timezone}`);
    doc.text(20, 80, `Unitname: ${unitname}`);

    doc.addPage();

    doc.setFontSize(14);
    doc.text(90, 30, 'EPA Table');
    doc.setFontSize(12);
    console.log('autotable loading.....');
    console.log(table);

    // Add table to PDF
    // Store the table into an array for autoTable
    var rows = table.querySelectorAll('tr');
    // const rows = table.getElementsByTagName('tr');

    // console.dir('table properties');
    // console.dir(table);
    console.log('rows');
    console.log(rows);
    console.log('table');
    console.log(table);
    console.log('array');
    const tableArray = [];
    for (let row of rows) {
        const cells = row.querySelectorAll('td, th'); // Include headers if any
        const rowArray = [];
        
        for (let cell of cells) {
          rowArray.push(cell.innerText);
        }
        if (rowArray.length > 0) { // Only push non-empty rows
          tableArray.push(rowArray);
        }
    };
    // Store the table data for PDF creation
    window.tableArray = tableArray;
    console.log(tableArray);
    // Display an error if tables are not found or processed
    if (!tableArray || !table){
        console.error("Table not Found!");
        return
    }
    // Initialize the table from HTML
    // doc.autoTable({ html: tableArray });
    doc.autoTable({
        startY: 40,
        head: [tableArray[0]],      // First row as headers
        body: tableArray.slice(1),  // Remaining rows as body
        theme: 'grid', // Adds border around the table
        // tableWidth: 'wrap',
        // columnWidth: 6,
          // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
        // margin: { left: 20 },
        margin: { top: 30 },
        // rowPageBreak: 'auto',  // avoid the plugin will only split a row onto multiple pages if row height is larger than page height.
        // pageBreak: 'avoid',   // If set to avoid the plugin will only split a table onto multiple pages if table height is larger than page height.
        styles: { 
            fontSize: 10,
            cellWidth: 18
        },
        columnStyles: {
            0: {cellWidth: 24},
            1: {cellWidth: 26},
        },
        horizontalPageBreak: true,   // split/break the table into multiple pages if the given table width exceeds the page width
        horizontalPageBreakRepeat: 1,
        // cellWidth: 10,
    });

    if (tableArray != null) {
        console.log('autotable loaded');
    };

    // Get the number of pages
    const pageCount = doc.internal.getNumberOfPages();
    // Add page numbers for each page
    for(var i =1; i <= pageCount; i++) {
        // Go to page i
        doc.setPage(i);
        // Print the page numbers
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), 210-50, 15, null, null);

        if (imgData) {
            // Redraw name and image
            doc.addImage(imgData, 'JPEG', 10, 10, 50, 0);
        };
    }
    

    doc.save('Data-Report.pdf');
    console.log('document complete');
}


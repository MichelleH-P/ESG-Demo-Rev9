function handleSubmit8(selectedTable) {
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const timezone = document.getElementById('timezone').value;
    const unitname = document.getElementById('unitname').value;
    // const selectedTable = document.getElementById('selectedTable').value;
    const photo = document.getElementById('photo').files[0];
    console.log('handleSubmit8');

    console.log("Name: " + name + ", Selected Table: " + selectedTable);

    const displayArea = document.getElementById('displayTables');
    displayArea.innerHTML = ''; // Clear previous tables
  
    // Access tables in the iframes
    const iframe1 = document.getElementById('page1').contentWindow.document;
    const iframe2 = document.getElementById('page2').contentWindow.document;
    const iframe3 = document.getElementById('page3').contentWindow.document;
    const iframe4 = document.getElementById('page4').contentWindow.document;
    const iframe5 = document.getElementById('page5').contentWindow.document;

    // Pass the selected table
    let table = [];
    if (unitname == "MIG-1") {
        table = iframe1.getElementById('MIG-1');    // Table ID in `page1.html`
        console.log('table 1 selected');
    } else if (unitname == "MIG-2") {
        table = iframe2.getElementById('MIG-2');    // Table ID in `page2.html`
        console.log('table 2 selected');
    } else if (unitname == "MIG-3") {
        table = iframe3.getElementById('MIG-3');    // Table ID in `page3.html`
        console.log('table 3 selected');
    } else if (unitname == "MIG-4") {
        table = iframe4.getElementById('MIG-4');    // Table ID in `page4.html`
        console.log('table 4 selected');
    } else if (unitname == "MIG-5") {
        table = iframe5.getElementById('MIG-5');    // Table ID in `page5.html`

        console.log('table 5 selected');
    }

    // Store the table data for PDF creation
    window.table = table;

    // You can add code here to pass the data to the server or process the PDF generation
    // For now, it just logs the result.

    console.log('table passed');

    if (company || photo) {
        console.log('company or photo accepted');
        if (company && photo) {
            console.log('company and photo processed');
            const reader = new FileReader();
            reader.onload = function(event) {
            const imgData = event.target.result;
            // Pass the variables to the PDF generating function
            generatePDF8(name, company, timezone, unitname, imgData, table);
            };
            reader.readAsDataURL(photo);
        } else if (company) {
            console.log('company processed');
            // Pass the variables to the PDF generating function
            generatePDF8(name, company, timezone, unitname, null, table);
        } else if (photo) {
            console.log('photo processed');
            const reader = new FileReader();
            reader.onload = function(event) {
            const imgData = event.target.result;
            // Pass the variables to the PDF generating function
            generatePDF8(name, null, timezone, unitname, imgData, table);
            };
            reader.readAsDataURL(photo);
        } 
    } else {
        console.log('missing company and photo');
        // table = table1;
        console.log(table);
        // Pass the variables to the PDF generating function
        generatePDF8(name, null, timezone, unitname, null, table);  // No photo provided
    }
  }
  
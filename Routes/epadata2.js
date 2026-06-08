function submitData2() {
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const timezone = document.getElementById('timezone').value;
    const unitname = document.getElementById('unitname').value;
    const photo = document.getElementById('photo').files[0];
    // const table = [];

    // Get table data
    const table = document.getElementById('dummytable');
    const rows = table.querySelectorAll('tr');
    let tableData = [];

    rows.forEach(row => {
        let rowData = [];
        let cells = row.querySelectorAll('td, th');
        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });
        tableData.push(rowData);
    });

    //dummy
    // Store the table data for PDF creation
    window.tableData = tableData;



    console.log('table passed');

    if (company || photo) {
        console.log('company or photo accepted');
        if (company && photo) {
            console.log('company and photo processed');
            const reader = new FileReader();
            reader.onload = function(event) {
            const imgData = event.target.result;
            generatePDF2(name, company, timezone, unitname, imgData, table, tableData);
            };
            reader.readAsDataURL(photo);
        } else if (company) {
            console.log('company processed');
            generatePDF2(name, company, timezone, unitname, null, table, tableData);
        } else if (photo) {
            console.log('photo processed');
            const reader = new FileReader();
            reader.onload = function(event) {
            const imgData = event.target.result;
            generatePDF2(name, null, timezone, unitname, imgData, table, tableData);
            };
            reader.readAsDataURL(photo);
        } 
    } else {
        console.log('missing company and photo');

        console.log(table);

        generatePDF2(name, null, timezone, unitname, null, table, tableData);  // No photo provided
    }
}

// function submitData2() {
//     const name = document.getElementById('name').value;
//     const company = document.getElementById('company').value;
//     const timezone = document.getElementById('timezone').value;
//     const unitname = document.getElementById('unitname').value;
//     const photo = document.getElementById('photo').files[0];

//     if (photo) {
//         const reader = new FileReader();
//         reader.onload = function(event) {
//             const imgData = event.target.result;
//             generatePDF2(name, company, timezone, unitname, imgData);
//         };
//         reader.readAsDataURL(photo);
//     } else {
//         generatePDF2(name, company, timezone, unitname, null);  // No photo provided
//     }
// }

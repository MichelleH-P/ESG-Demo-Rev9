// const createthPDF = require('pdfkit');
// const path = require('path');
 
function createsPDF() {
    // button clicked
    console.log("button clicked");
   
    //check if all fields are entered
    if(document.getElementById("name").value == "" || document.getElementById("country").value == "") {
        alert("Please enter all fields");
    }
 
    else {
        // // Create PDF document
        // const doc = new createsPDF();
        // const pdfPath = path.join(__dirname, 'Data-Report.pdf');
        // doc.pipe(fs.createWriteStream(pdfPath));
       
        //create the jspdf document
        var doc = new jsPDF();
        // const doc = new createthPDF();
        // const pdfPath = path.join(__dirname, 'Data-Report.pdf');
 
        //input
        var name = document.getElementById('name').value,
            country = document.getElementById('country').value;

        // Add user information
        doc.fontSize(20).text('Data Report');
        // doc.text(document.getElementById("name").value, 10, 10);
        // doc.text(document.getElementById("country").value, 25, 25);   

        // document.text(name, 25, 25);
        // document.text(country, 25, 25);   
 
        // save the file
        doc.save("Data-Report.pdf");

        console.log("document saved");
    }
}
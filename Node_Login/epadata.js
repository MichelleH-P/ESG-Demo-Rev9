function submitData() {
    console.log("button clicked"); 
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;
    generatePDF(name, country);
}
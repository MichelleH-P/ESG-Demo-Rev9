function submitData2() {
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;
    const timezone = document.getElementById('timezone').value;
    const unitname = document.getElementById('unitname').value;
    const photo = document.getElementById('photo').files[0];

    if (photo) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgData = event.target.result;
            generatePDF2(name, country, timezone, unitname, imgData);
        };
        reader.readAsDataURL(photo);
    } else {
        generatePDF2(name, country, timezone, unitname, null);  // No photo provided
    }
}

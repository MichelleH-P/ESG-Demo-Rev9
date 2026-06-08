function createsPDF() {
    const name = document.getElementById('name').value;
    const timezone = document.getElementById('timezone').value;
    const unitname = document.getElementById('unitname').value;
    const fileInput = document.getElementById('picture');
    const file = fileInput.files[0] || null;

    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());

    doc.fontSize(20).text('Data Report');
    doc.fontSize(12).text(`Name: ${name}`);
    doc.text(`Time Zone: ${timezone}`);
    doc.text(`Unit Name: ${unitname}`);
    doc.text(`Generated Time: ${new Date().toLocaleString()}`);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgData = event.target.result;
            doc.image(imgData, { width: 150 });
            addTableAndFinish(doc);
        };
        reader.readAsDataURL(file);
    } else {
        doc.image('/Uploads/placeholder.jpg', { width: 150 });
        addTableAndFinish(doc);
    }

    function addTableAndFinish(doc) {
        doc.addPage();
        doc.fontSize(16).text('Sample Table');
        doc.fontSize(12).text('Row 1: Data 1');
        doc.text('Row 2: Data 2');
        
        doc.end();
        stream.on('finish', function() {
            const url = stream.toBlobURL('application/pdf');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Data-Report.pdf';
            a.click();
        });
    }
}
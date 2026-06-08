document.getElementById('myButton').addEventListener('click', function() {
    const message = this.dataset.message;
    alert(message);
});
// var animalContainer = document.getElementById("animal-info");
// // Define the .ejs button element
// var btn = document.getElementById("btn");

// // Event when button is clicked

// btn.addEventListener("click", function() {
//     var ourRequest = new XMLHttpRequest();

//     // Get data from a server
//     ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
//     // What should happen when the data is loaded
//     ourRequest.onload = function() {
//         // console.log(ourRequest.responseText);
//         // Ensure array variable is not read as a text string
//         var ourData = JSON.parse(ourRequest.responseText);
//         // console.log(ourData[0]);
//         renderHTML(ourData);
//     };
//     // Send the request
//     ourRequest.send(); 
// });

// // Function that adds mor html to the page
// function renderHTML(data) {
//     // parameter data can be called with "data"
    
//     // // Prints string when called
//     // animalContainer.insertAdjacentHTML('beforeend', 'testing123');

//     // Passes & prints variable through string when called
//     // var htmlString = "this is a test";
//     // animalContainer.insertAdjacentHTML('beforeend', htmlString);
    
//     console.log('data call works');

//     var htmlString = "";
//     var brace = "oops";

//     // print each object in the array
//     for (i = 0; i < data.length; i++) {
//         htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat " + ".</p>";
//         console.log('string works');
//         // animalContainer.insertAdjacentHTML('beforeend', htmlString);
//     }
// }

// // // Send data to a server
// // ourRequest.open('Post');


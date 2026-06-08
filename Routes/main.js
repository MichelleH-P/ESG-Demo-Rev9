// Increase the page number of the URL
var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
// Define the .ejs button element
var btn = document.getElementById("btn");

// Event when button is clicked
btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  // Get data from a server, where the pages are incremented
  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
  // What should happen when the data is loaded
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      // Ensure array variable is not read as a text string
        var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
        // Error handling : ensure the request has been recieved
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  // error handling: anonymous function detects whether the link will fail
  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  // Send the AJAX request
  ourRequest.send();

  // Increment the page until the 3rd page
  pageCounter++;
  if (pageCounter > 3) {
    // Hide the button when the last html is posted
    btn.classList.add("hide-me");
  }
});

// Function that adds mor html to the page
function renderHTML(data) {
  var htmlString = "";

  for (i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
    
    // find the likes array in the foods property
    for (ii = 0; ii < data[i].foods.likes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += " and " + data[i].foods.likes[ii];
      }
    }

    htmlString += ' and dislikes ';

    // find the dislikes array in the foods property
    for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += " and " + data[i].foods.dislikes[ii];
      }
    }

    htmlString += '.</p>';

  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
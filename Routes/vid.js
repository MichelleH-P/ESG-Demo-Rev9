// An object(variable)
var myCat = {
    "name": "Meowsalot",
    "species": "cat",
    "favFood": "tuna"
}
// myCat.favFood

// Variable array
var myFavColors = ["blue", "green", "purple"];
// myFavColors[0]

// Array of objects
var thePets = [
    {
      "name": "Meowsy",
      "species" : "cat",
      "foods": {
        "likes": ["tuna", "catnip"],
        "dislikes": ["ham", "zucchini"]
      }
    },
    {
      "name": "Barky",
      "species" : "dog",
      "foods": {
        "likes": ["bones", "carrots"],
        "dislikes": ["tuna"]
      }
    },
    {
      "name": "Purrpaws",
      "species" : "cat",
      "foods": {
        "likes": ["mice"],
        "dislikes": ["cookies"]
      }
    }
];
// thePets[0].name

module.exports = { thePets, myFavColors };
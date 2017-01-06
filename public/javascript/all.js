// Code here handles what how the page displays all of the characters
// It pings the server. The server then pings the database and displays all of the characters.

// make a get request to our api to grab every Service Request
$.get("/api", function(data) {

  // for each Service Request that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // create a parent div for the oncoming elements
    var requestSection = $("<div>");
    // add a class to this div: 'Request'
    requestSection.addClass("request");
    // add an id to the request-well- to mark which request it is
    requestSection.attr("id", "request-well-" + i);
    // append the request to the request-well
    $("#request-well").append(requestSection);

    // Now add all of our Service Request data to the well we just placed on the page

    // make the name an h2,
    $("#request-well-" + i).append("<h2>" + data[i].name + "</h2>");
      // the Email an h3,
    $("#request-well-" + i).append("<h3>Email: " + data[i].Email + "</h3>");
    // the Address an h3,
    $("#request-well-" + i).append("<h3>Address: " + data[i].address + "</h3>");
    // and the Number of Bedrooms an h3.
    $("#request-well-" + i).append("<h3>Number Of Bedrooms: " + data[i].numberOfBedrooms + "</h3>");
        // the Number Of Bathrooms an h3,
    $("#request-well-" + i).append("<h3>Number Of Bathrooms: " + data[i].numberofBathrooms + "</h3>");
    // the Floors an h3,
    $("#request-well-" + i).append("<h3>Floors: " + data[i].floors + "</h3>");
    // and the Window Cleaning an h3.
    $("#request-well-" + i).append("<h3>Window Cleaning: " + data[i].windowCleaning + "</h3>");
        // and the Kitchen an h3.
    $("#request-well-" + i).append("<h3>Kitchen: " + data[i].kitchen + "</h3>");
        // and the Laundry an h3.
    $("#request-well-" + i).append("<h3>Laundry: " + data[i].laundry + "</h3>");
  }
});

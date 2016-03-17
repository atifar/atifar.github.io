/**
 * Created by Ati on 8/28/15.
 */

function populateGallery() {
    // Loop over images 1-60 in the images folder
    for (var i = 1; i < 61; i++) {
        // Build the image file path
        var imageNumber = i.toString();
        if (imageNumber.length == 1) {
            imageNumber = "0" + imageNumber;
        }
        var imagePath = "images/pdxcg_" + imageNumber + ".jpg";

        // Grab the section that holds the image gallery
        $('#gallery').append('<li><img src =""/></li>');
        $('#gallery li:last img').attr('src', imagePath);

    }

    $('#gallery').on('click', function (e) {
        showLargeImage(e);
    });

    //console.log($largeImageDiv.first()[0]);
    $('div > img').on('click', function (e) {
        e.stopPropagation();
    });

    $('#image_show').on('click', function (e) {
        removeLargeImage(e);
    });
}

// Event handler - click on image in gallery
function showLargeImage(e) {
        var imagePath = e.target.attributes.src.value;

        $('#image_show img').attr('src', imagePath);
        $('#image_show').addClass('display_img').removeClass('display_none');

        // Stop event propagation
        e.stopPropagation();
}

// Event handler - click anywhere on page to remove large preview
function removeLargeImage(e) {
    // Hide large preview
    $('#image_show').addClass('display_none').removeClass('display_img');
}

$(function () {
    // Fetch the name for sessionStorage, which would be set by the join page
    var validName = sessionStorage.getItem("name");

// If a valid name was fetched above, update the gallery tagline with the
// name from the join page.
    if (validName != null) {
        var taglineText = $('.tagline').text();
        $('.tagline').text(taglineText.replace("tiffany", validName));
    }

    populateGallery();
});

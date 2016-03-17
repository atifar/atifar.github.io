/**
 * Created by Ati on 8/27/15.
 */

// Jumbotron picture set to rotate through - image file paths
var jumboPics = [
    "pdxcg_01.jpg",
    "pdxcg_02.jpg",
    "pdxcg_03.jpg",
    "pdxcg_04.jpg",
    "pdxcg_05.jpg",
    "pdxcg_06.jpg",
    "pdxcg_07.jpg",
    "pdxcg_08.jpg",
    "pdxcg_09.jpg",
    "pdxcg_10.jpg"
];

// Starting picture index
var jumboPicIdx = 4;

// Grab the jumbotron element
var $jumbotronDiv = $('div#jumbotron');

function jumbotronRotatePic() {
    // Update the array index
    jumboPicIdx = (jumboPicIdx + 1) % jumboPics.length;

    // Build image file URL
    var picUrl = "url(images/" + jumboPics[jumboPicIdx] + ")";

    // Update the background picture
    $jumbotronDiv.css('backgroundImage', picUrl);
}

// Rotate through first ten images in the jumbotron, switching images every
// 20 seconds.
$(function() {
    setInterval(function() {
        jumbotronRotatePic();
    }, 5000);
});

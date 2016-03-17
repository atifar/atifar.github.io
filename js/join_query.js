/**
 * Created by Ati on 8/27/15.
 */

$(function () {
    // Add an 'action' attribute to load the gallery page upon form submission
    //$('#signup').attr('action', 'gallery.html');
    // Add listener to catch form submission
    $('#signup').submit(function(e) {
        validateInput(e);
    });
});

function validateInput(e) {
    var nameRE = /^([a-zA-Z ]+)$/;
    var usernameRE = /^([a-zA-Z_]+)$/;
    var emailRE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    var name = $('#signup input:eq(0)').val();
    var username = $('#signup input:eq(1)').val();
    var email = $('#signup input:eq(2)').val();

    // Prevent the form post operation
    e.preventDefault();

    // Remove any previous popups
    $('.popup').remove();

    // Catch validation failure condition
    var valid = true;

    // Validate name - at least one alphabetic character (case insensitive)
    if (!nameRE.test(name)) {
        // Create a new message paragraph
        $('#signup input:eq(0)').after('<p class="popup">Name must consist only of  letters and spaces.</p>');
        // Make the text inside message box red and smaller
        $('.popup').css({
            'fontSize': '0.6em',
            'color': 'red'
        });
        valid = false;
    }

    // Validate username - at least one alphabetic character (case insensitive)
    if (!usernameRE.test(username)) {
        // Create a new message paragraph
        $('#signup input:eq(1)').after('<p class="popup">Username may only consist of letters and undrescore.</p>');
        // Make the text inside message box red and smaller
        $('.popup').css({
            'fontSize': '0.6em',
            'color': 'red'
        });
        valid = false;
    }

    // Validate email
    if (!emailRE.test(email)) {
        // Create a new message paragraph
        $('#signup input:eq(2)').after('<p class="popup">Email must be of proper form.</p>');
        // Make the text inside message box red and smaller
        $('.popup').css({
            'fontSize': '0.6em',
            'color': 'red'
        });
        valid = false;
    }

    // When all fields are valid, store name to use on gallery page and load
    // the gallery page
    if (valid) {
        sessionStorage.setItem('name', name);
        location.href = "gallery_query.html";
    }
}

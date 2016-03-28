'use strict';
// Post to and get forum entries from a Google spreadsheet

$(function() {
  // URL of Google Apps Script that implements the read/write access to the spreadsheet
  var url = 'https://script.google.com/macros/s/AKfycbxaXwjNMyX-s0i2hbncXKTWWjU63lptK3NyWcllShDAwkEbsZp6/exec';

  // Cache the form and its input controls
  var $form = $('#new_post_form');
  var $inputs = $form.find("input, textarea, button");

  // Disable form controls for the duration of the AJAX GET request
  $inputs.prop("disabled", true);

  // Grab the posts section
  var $posts = $('#posts');

  // Display message about loading posts
  $posts.append('<p id="message">Please wait! Posts are loading.</p>');

  // Fetch all stored forum posts using AJAX upon page load
  $.getJSON(
    url,
    function(data) {
      // Remove message from posts section
      $("#message").remove();

      $.each(data.posts, function(idx, post) {
          // Buils a section for each post
          var $titlePar = $('<p class="title"></p>').text(post.title);
          var $bodyPar = $('<p class="body"></p>').text(post.body);
          var $post = $('<section class="entry"></section>').append($titlePar, $bodyPar);

          // Insert the section into the DOM
          $posts.append($post);
      });  // end each
    })  // end success
    .always(function() {
      // Reenable inputs; move focus to new title
      $inputs.prop("disabled", false);
      $('#new_title').focus();
  }); // end get

  // Post new forum post using AJAX
  $form.submit(function(e) {
    // Prevent default posting of the form
    e.preventDefault();

    // Serialize the form data
    var serializedPost = $form.serialize();

    // Disable form controls for the duration of the AJAX request
    $inputs.prop("disabled", true);

    // Make the AJAX post request
    $.post(url, serializedPost, function(response) {
      // Log message to the console
      console.log("AJAX POST call returned successfully.");
    })  // end success
      .done(function(data) {
        // Log response data to the console
        console.log("Response data: " + data);
      })  // end success
      .fail(function(jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        console.error(
          "AJAX call error: " +
          textStatus, errorThrown
        );
      })  // end failure
      .always(function() {
        // Reenable inputs
        $inputs.prop("disabled", false);

        // Reload the page to fetch all currently stored posts.
        location.reload();
    }); //end post
  }); // end submit
}); // end document ready

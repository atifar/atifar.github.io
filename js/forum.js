'use strict';
// Post to and get forum entries from a Google spreadsheet

$(function() {
  // URL of Google Apps Script that implements the read/write access to the spreadsheet
  var url = 'https://script.google.com/macros/s/AKfycbxaXwjNMyX-s0i2hbncXKTWWjU63lptK3NyWcllShDAwkEbsZp6/exec';

  // Cache the form and its input controls
  var $form = $('#new_post_form');
  var $inputs = $form.find("input, textarea");
  var $addButton = $('#add_new_post');
  var $title = $('#new_title');
  var $body = $('#new_body');
  // Defer delete button caching until after they exists.
  var $delButtons;

  // Delete a forum post
  var deletePost = function() {
    // Copy the span that contains timestamp of the post to delete
    var timeStampSpanContents = $(this).parent().clone().text();
    // Throw away the trailing "Delete" to get the timestamp
    var timeStamp = timeStampSpanContents.replace("Delete", "");
    // Disable controls prior to the AJAX call
    $delButtons.prop("disabled", true);

    // Make the AJAX call
    $.ajax({
      type: "POST",
      url: url,
      data: {http_delete: true, timestamp: timeStamp}
      })
        .done(function() {
          console.log("Deleted post.");
        }) // end succes
        .always(function() {
          // Reload the page to fetch all currently stored posts.
          location.reload();
    }); // end ajax()
  }

  // Set up listener for keyboard input
  $inputs.keyup(function validateFormFieldsNotBlank() {
    // Invalid input if either title or body is blank
    var invalid_post = ($title.val() === "" || $body.val() === "");
    // Enable add post button only on valid input
    $addButton.prop("disabled", invalid_post);
  });  // end $inputs listener

  // Disable form controls for the duration of the AJAX GET request
  $inputs.prop("disabled", true);
  $addButton.prop("disabled", true);

  // Grab the posts section and display message about loading posts
  var $posts = $('#posts');
  $posts.append('<p id="message">Loading...</p>');

  // Fetch all stored forum posts using AJAX upon page load
  $.getJSON(
    url,
    function(data) {
      if(data.posts.length > 0) {
        // Remove message from posts section
        $("#message").remove();

        $.each(data.posts, function(idx, post) {
          // Build a section for each post
          var $titlePar = $('<p class="title"></p>').text(post.title);
          var $timeStamp = $('<span></span>').text(post.timestamp);
          var $deleteButton = $('<button class="delete">Delete</button>');
          var $bodyPar = $('<p class="body"></p>').text(post.body);
          var $post = $('<li></li>').append($titlePar, $bodyPar);
          // Insert the delete button, timestamp then the title paragraph
          $timeStamp.append($deleteButton);
          $titlePar.append($timeStamp);
          $posts.append($post);
          // Bind a click handler to the delete button
          $deleteButton.on("click", deletePost);
        });  // end each
      } else {
        $("#message").text("No forum posts were found. Feel free to create some above! :D");
      }
    })  // end success
    .always(function() {
      // Select disable buttons
      $delButtons = $('.delete');
      // Reenable form controls; move focus to new title
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
    $addButton.prop("disabled", true);
    $delButtons.prop("disabled", true);

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
        // Reload the page to fetch all currently stored posts.
        location.reload();
      }); // end post
  }); // end submit
}); // end document ready

'use strict';
// Post to and get forum entries from a Google spreadsheet

$(function() {

  $.get('https://spreadsheets.google.com/feeds/list/1ntmcFZk4R0Owmez5eKc0bcu_PftAKwWyXDWTqmypPgI/default/public/values?alt=json-in-script', function(data){
    var entries = data.feed.entry;
    // Loop through the forum entries
    for (var i=0; i < entries.length; i++) {
      $('main').append('<setion class="post"><p class="title"></p><p class="body"></p></section>');
      var title = entries[i].gsx$posttitle["$t"];
      var body = entries[i].gsx$postbody["$t"];
      $('.post:last p.title').append(title);
      $('.post:last p.body').append(body);
    };
  }, 'jsonp');

  function sendNewPost(e) {
    var new_title = $('#new_title').val();
    var new_body = $('#new_body').val();
    var send_data = {
      "entry_434124687": new_title,
      "entry_1823097801": new_body
    };
    var jqxr = $.post('https://docs.google.com/forms/d/1blH7mM6udvlyJ0SrPmbXoNPZg8XCqDQaxHTPrK0HQbA/formResponse', send_data, function() {
      ;
    }).always( function() {
      location.reload(true);
    });
  }

  $('#new_post_form').on('submit', function(e) {
    e.preventDefault();
    sendNewPost(e);
  });

});

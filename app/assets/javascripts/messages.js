$(function() {
  function messagesHTML(message){
    var imageURL = ""
    if (message.image){
      imageURL = `<img class="lower-message__image" src= ${message.image} >`
      var html =
        `<div class="message">
          <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
            <div class="lower-message">
            <p class="lower-message__content">
              ${message.text}
            </p>
              ${imageURL}
        </div>
      </div>`
      return html;
    } else {
      var html =
        `<div class="message">
         <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
         </div>
         <div class="upper-message__date">
            ${message.date}
         </div>
         </div>
         <div class="lower-message">
          <p class="lower-message__content">
            ${message.text}
          </p>
         </div>
        </div>`
    return html;
   };
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = messagesHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('#new_message').on("submit", function(){
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500, 'swing');
      });
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
});

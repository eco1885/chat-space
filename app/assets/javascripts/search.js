$(function() {
  function usersHTML(user){
    var html =
    `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
    </div>`
    $('#user-search-result').append(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var reg = new RegExp(input);

    if (input !== ""){
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          if (user.name.match(reg)){
            var html = usersHTML(user)
          }
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索失敗');
    })
    }
    else {
      $('#user-search-result').empty();
    }
  });
});

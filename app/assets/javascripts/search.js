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

//ユーザー追加機能
$(function(){

  function chatMember(user_id,user_name){
    var memberHTML =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value=${user_id}>
        <p class='chat-group-user__name'>${user_name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      $("#chat-group-user-22").append(memberHTML)
  }

    $("#user-search-result").on("click", ".chat-group-user__btn--add", function(){
      var user_id = $(this).data("user-id");
      var user_name = $(this).data("user-name")
      $(this).parent().remove();
      chatMember(user_id,user_name)
    });

  $(function() {
    $(".chat-group-user").on("click", ".chat-group-user__btn--remove", function() {
      console.log(this)
    var user_id = $(this).data("user-id");
    $(this).parent().remove();
    });
  });
});

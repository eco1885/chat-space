json.id         @message.id
json.text       @message.content
json.image      @message.image_url
json.user_name  @message.user.name
json.date       simple_time(@message[:created_at])

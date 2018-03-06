json.array! @new_message do |message|
  json.id         message.id
  json.user_name  message.user.name
  json.text       message.content
  json.image      message.image_url
  json.date       simple_time(message[:created_at])
end

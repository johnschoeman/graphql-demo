json.extract! chirp, :id, :body, :author_id, :like_count
json.author do 
  json.id chirp.author.id
  json.username chirp.author.username
end
json.liked_by_current_user !!chirp.likes.find_by(user_id: current_user.id)

user = User.find(comment.user_id)
if user.rating(comment.work_id)
  json.rating user.rating(comment.work_id).rating
else
  json.rating "none"
end

json.id comment.id
json.username user.username

if (comment.parent_comment_id)
  json.parent_comment_id comment.parent_comment_id
else
  json.parent_comment_id "none"
end

json.depth comment.depth

json.content comment.content
json.time_ago time_ago_in_words(comment.created_at)
json.created_at comment.created_at

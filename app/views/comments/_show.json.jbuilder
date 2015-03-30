user = User.find(comment.user_id)

if comment.chapter_id == nil
  if user.rating(comment.work_id, nil)
    json.rating user.rating(comment.work_id, nil).rating
  else
    json.rating "none"
  end
else
  if user.rating(nil, comment.chapter_id)
    json.rating user.rating(nil, comment.chapter_id).rating
  else
    json.rating "none"
  end
end

json.id comment.id
json.username user.username
json.user_id user.id

if (comment.parent_comment_id)
  json.parent_comment_id comment.parent_comment_id
else
  json.parent_comment_id "none"
end

json.depth comment.depth

json.content comment.content
json.time_ago time_ago_in_words(comment.created_at)
json.created_at comment.created_at

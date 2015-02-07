json.extract! @work, :id, :name, :author, :link, :description, :created_at, :length
json.created_at_string @work.created_at.strftime("%B %d, %Y")
json.average_rating @work.average_rating
json.ratings @work.ratings.length
if current_user && current_user.rating(@work.id)
  json.user_rating current_user.rating(@work.id).rating
else
  json.user_rating "none"
end

json.num_comments @work.comments.length

json.comments @comments do |comment|
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
end

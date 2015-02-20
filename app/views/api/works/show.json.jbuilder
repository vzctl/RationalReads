json.extract! @work, :id, :name, :author, :link, :description, :created_at, :length
json.created_at_string @work.created_at.strftime("%B %d, %Y")
json.average_rating @work.average_rating
json.ratings @work.ratings.length
if current_user && current_user.rating(@work.id, nil)
  json.user_rating current_user.rating(@work.id, nil).rating
else
  json.user_rating "none"
end

json.num_comments @work.comments.length

json.comments @comments do |comment|
  json.partial! './comments/show', comment: comment
end

json.chapters @chapters do |chapter|
  json.id chapter.id
  json.number chapter.number
  json.avg_rating chapter.average_rating
end

json.tags @work.tag_names

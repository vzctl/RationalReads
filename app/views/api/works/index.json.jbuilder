json.array! @works do |work|
  json.extract! work, :id, :name, :author, :link, :description, :created_at, :length
  json.created_at_string work.created_at.strftime("%B %d, %Y")
  json.time_ago time_ago_in_words(work.created_at)
  json.average_rating work.average_rating
  json.ratings work.ratings.length
  if current_user && current_user.rating(work.id)
    json.user_rating current_user.rating(work.id).rating
  else
    json.user_rating "none"
  end

  json.num_comments work.comments.length
end

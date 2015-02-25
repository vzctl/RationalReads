json.pages @pages

json.works @works do |work|
  json.extract! work, :id, :name, :author, :link, :description, :created_at, :length
  json.created_at_string work.created_at.strftime("%b %d, %Y")
  json.time_ago time_ago_in_words(work.created_at)
  json.average_rating work.average_rating
  json.ratings work.ratings.length
  if current_user && current_user.rating(work.id, nil)
    json.user_rating current_user.rating(work.id, nil).rating
  else
    json.user_rating "none"
  end

  json.num_comments work.comments.length

  json.tags work.tag_names
  # json.bayesian_average work.bayesian_rating(@average_votes, @average_average_rating)
end

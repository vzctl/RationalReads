json.extract! @work, :id, :name, :author, :link, :description
json.average_rating @work.average_rating
json.ratings @work.ratings.length
if current_user && current_user.rating(@work.id)
  json.user_rating current_user.rating(@work.id).rating
else
  json.user_rating "none"
end

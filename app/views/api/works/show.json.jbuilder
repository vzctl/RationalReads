json.extract! @work, :id, :name, :author, :link, :description
json.average_rating @work.average_rating
json.ratings work.ratings.length

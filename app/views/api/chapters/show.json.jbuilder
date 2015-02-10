json.extract! @chapter, :id, :work_id, :created_at

json.work_title @chapter.work.name

json.created_at_string @chapter.created_at.strftime("%B %d, %Y")
json.time_ago time_ago_in_words(@chapter.created_at)

json.average_rating @chapter.average_rating
json.ratings @chapter.ratings.length

json.num_comments @chapter.comments.length

json.comments @comments do |comment|
  json.partial! './comments/show', comment: comment
end

class Comment < ActiveRecord::Base
  validates :user_id, :work_id, :content, presence: true

  belongs_to :work

  has_many(
    :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )

  belongs_to(
    :parent_comment,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )

  def depth
    depth = 0
    comment = self
    while true
      if comment.parent_comment_id == nil
        break
      else
       depth += 1
       comment = Comment.find(comment.parent_comment_id)
     end
   end

   depth
 end

end

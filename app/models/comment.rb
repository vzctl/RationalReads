class Comment < ActiveRecord::Base
  validates :user_id, :content, presence: true
  validate :any_present?

  belongs_to :work
  belongs_to :chapter
  belongs_to :user

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

 def any_present?
   if %w(work_id chapter_id).all?{|attr| self[attr].blank?}
     errors.add :base, "Comment not attached to a work or chapter."
   end
 end

end

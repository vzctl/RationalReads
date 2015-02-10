class Rating < ActiveRecord::Base
  validates :user_id, :rating, presence: true
  validate :any_present?

  belongs_to :user
  belongs_to :work
  belongs_to :chapter

  def generate_data(work, type, parent_type)
    rating_data = {}
    rating_data[:average_rating] = work.average_rating
    rating_data[:ratings] = work.ratings.length
    if parent_type == "chapter"
      rating_data[:id] = self.chapter_id
    else
      rating_data[:id] = self.work_id
    end
    rating_data[:type] = type
    rating_data
  end

  def any_present?
    if %w(work_id chapter_id).all?{|attr| self[attr].blank?}
      errors.add :base, "Error message"
    end
  end

end

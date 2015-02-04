class Rating < ActiveRecord::Base
  validates :user_id, :work_id, :rating, presence: true

  belongs_to :user
  belongs_to :work

  def generate_data(work, type)
    rating_data = {}
    rating_data[:average_rating] = work.average_rating
    rating_data[:ratings] = work.ratings.length
    rating_data[:id] = self.work_id
    rating_data[:type] = type
    rating_data
  end

end

class Rating < ActiveRecord::Base
  validates :user_id, :work_id, :rating, presence: true

  belongs_to :user
  belongs_to :work
end

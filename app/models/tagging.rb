class Tagging < ActiveRecord::Base
  validates :work_id, :tag_id, presence: true

  belongs_to :tag
  belongs_to :work
end

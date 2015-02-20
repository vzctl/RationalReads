class Tagging < ActiveRecord::Base
  validates :work_id, :tag_id, presence: true

  belongs_to :tag
  belongs_to :work

  def self.save_tags (tags, work_id)
    tags.each do |tag|
      tag_id = Tag.find_by_name(tag).id
      Tagging.create({tag_id: tag_id, work_id: work_id})
    end
  end

end

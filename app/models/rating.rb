class Rating < ActiveRecord::Base
  validates :user_id, :rating, presence: true
  validate :any_present?

  belongs_to :user
  belongs_to :work
  belongs_to :chapter

  after_save :update_summary_data

  def self.find_rating(user, params)
    if params["work_id"] == nil
      user_id, chapter_id = user.id, params["chapter_id"]
      rating = Rating.where("user_id = ? AND chapter_id = ?", user_id, chapter_id)[0]
      rated_item = Chapter.find_by_id(chapter_id)
      item_type = "chapter"
    else
      user_id, work_id = user.id, params["work_id"]
      rating = Rating.where("user_id = ? AND work_id = ?", user_id, work_id)[0]
      rated_item = Work.find_by_id(work_id)
      item_type = "work"
    end
    [rating, rated_item, item_type]
  end

  def update_summary_data
    if chapter_id.nil?
      work = Work.find_by_id(work_id)
      work.update_average_and_counts
      #order is important here - bayesian average has to be calculated second
      work.update_bayesian_average
      work.save
    end
  end

  def response(rated_item, type, parent_type)
    rating_data = {}

    if parent_type == "chapter"
      rating_data[:updated_average_rating] = rated_item.average_rating
    else
      rating_data[:updated_bayesian_rating] = rated_item.bayesian_average
      rating_data[:updated_average_rating] = rated_item.average_rating
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

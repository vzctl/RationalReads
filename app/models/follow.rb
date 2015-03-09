class Follow < ActiveRecord::Base
  validates :user_id, :work_id, presence: true
  validate :doesnt_exist

  belongs_to :work
  belongs_to :user

  def doesnt_exist
    @follow = Follow.find_by_work_id_and_user_id(self.work_id, self.user_id)
    
    if !@follow.nil?
      errors.add(:base, "You're already following this work!")
    end
  end
end

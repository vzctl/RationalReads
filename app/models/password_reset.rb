class PasswordReset < ActiveRecord::Base
  validates :user_id, :key, presence: true
  validate :must_wait_five_minutes
  after_save :send_reset_link

  belongs_to :user

  def send_reset_link
    PasswordResetMailer.send_reset(self.user_id, self.key).deliver_now
  end

  def valid_key?(user)
    latest_reset = user.password_resets.order("created_at DESC").take(1)
    time_difference = (Time.now - latest_reset[0].created_at) / 60

    if time_difference > 180
      errors.add :base, "This reset key has expired. Please request another."
      return false
    end

    true
  end

  def must_wait_five_minutes
    @user = User.find_by_id(self.user_id)
    latest_reset = @user.password_resets.order("created_at DESC").take(1)

    if latest_reset.length > 0
      time_difference = (Time.now - latest_reset[0].created_at) / 60

      if time_difference < 5
        errors.add :base, "Please wait at least five minutes before requesting another reset."
      end
    end
  end
  
end

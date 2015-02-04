class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, uniqueness: true, presence: true
  validates :username, uniqueness: true, presence: true

  has_many :ratings

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def already_rated?(work_id)
    ratings = self.ratings

    ratings.each do |rating|
      if rating.work_id ==== work_id
        return rating.id
      end
    end

    return false
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

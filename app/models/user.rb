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

  def rating(work_id, chapter_id)
    if work_id == nil
      id = chapter_id
    else
      id = work_id
    end

    ratings = self.ratings

    ratings.each do |rating|
      if rating.work_id == id || rating.chapter_id == id
        return Rating.find(rating.id)
      end
    end

    nil
  end

  def recommended_works
    slope_one = SlopeOne.new
    slope_one.insert(all_rating_data)
    recommendations = slope_one.predict(user_ratings)
    sorted_slope_one_results = recommendations.sort_by { |key, value| value }
    works = Work.order("bayesian_average", Work.all)
    sorted_recommendations(sorted_slope_one_results, works)
  end

  def sorted_recommendations(sorted, works)
    ordered_predictions = []

    sorted.each do |work, predicted_sore|
      ordered_predictions << Work.find(work)
    end

    unread((ordered_predictions + works).uniq)
  end

  def unread(works)
    new_works = []
    read_works = read

    works.each do |work|
      unless read_works.include?(work.id)
        new_works << work
      end
    end
    
    new_works
  end

  def read
    read_works = []

    self.ratings.each do |rating|
      read_works << rating.work_id
    end

    read_works
  end

  def user_ratings
    user_data = {}
    self.ratings.each do |rating|
      user_data[rating.work_id] = rating.rating
    end

    user_data
  end

  def all_rating_data
    all_user_data = {}

    User.all.each do |user|
      user_data = {}
      user.ratings.each do |rating|
        user_data[rating.work_id] = rating.rating
      end
      all_user_data[user.id] = user_data
    end

    all_user_data
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

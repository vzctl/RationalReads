class Work < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :author, :link, :description, :length, presence: true

  has_many :ratings
  has_many :comments
  has_many :chapters
  has_many :taggings
  has_many :tags, through: :taggings
  
  def average_rating
    ratings = self.ratings

    if ratings.length == 0
      return 0
    end

    sum = 0
    ratings.each do | rating |
     sum += rating.rating
   end

   full_rating = sum.to_f / ratings.length
   rounded_rating = (full_rating * 100).round / 100.0

   rounded_rating
 end

end

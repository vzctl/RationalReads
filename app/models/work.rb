class Work < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :author, :link, :description, presence: true

  has_many :ratings

  def average_rating
    ratings = self.ratings()

    if ratings.length == 0
      return 0
    end

    sum = 0
    ratings.each do | rating |
     sum += rating.rating
   end

   sum.to_f / ratings.length
 end

end

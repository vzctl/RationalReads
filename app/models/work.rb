class Work < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :author, :link, :description, :length, presence: true

  has_many :ratings
  has_many :comments
  has_many :chapters
  has_many :taggings
  has_many :tags, through: :taggings

  def self.populate_bayesian_averages
    votes = Rating.all.length
    works = Work.rated_works
    average_votes = votes.to_f / works
    average_average_rating = Rating.all.map { |rating| rating.rating}.reduce(:+) / works

    Work.all.each do |work|
      work.bayesian_average = work.bayesian_rating(average_votes, average_average_rating)
      work.save
    end
  end

  def self.rated_works
    Rating.all.map { |rating| rating.work_id}.uniq.length
  end

  def self.filtered (filters)
    works = Work.all
    filtered_works = works

    unless filters === nil
      filters.each do |filter|
        valid_works = []
        filtered_works.each do |work|
          if work.tag_names.include?(filter)
            valid_works.push(work)
          end
        end

        filtered_works = valid_works
      end
    end

    filtered_works
  end

  def self.page(page, works)
    works[page.to_i*10-10...page.to_i*10]
  end

  def self.order (order, works)
    case order
    when "comments"
      works.sort { |a, b| b.comments.length <=> a.comments.length }
    when "length"
      works.sort do |a, b|
        b.length_sort_val <=> a.length_sort_val
      end
    when "name"
      works.sort { |a, b| a.name.downcase <=> b.name.downcase }
    when ""
      works
    when nil
      works
    else
      works.sort { |a, b| b.send(order) <=> a.send(order) }
    end
  end

  def length_sort_val
    case self.length
    when "Epic"
      3
    when "Long"
      2
    when "Medium"
      1
    when "Short"
      0
    end
  end

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

 def bayesian_rating (average_votes, average_average_rating)
   number_of_ratings = self.ratings.count
   return 0 if number_of_ratings == 0
   top = average_average_rating * average_votes + self.average_rating * number_of_ratings
   bottom = number_of_ratings + average_votes
   (top / bottom * 100).round / 100.0
 end

 def tag_names
   self.tags.map{ |tag| tag.name }
 end

 def update_bayesian_average
   votes = Rating.all.length
   works = Work.rated_works
   average_votes = votes.to_f / works
   average_average_rating = Rating.all.map { |rating| rating.rating}.reduce(:+) / works

   self.bayesian_average = bayesian_rating(average_votes, average_average_rating)
   self.save
 end
end

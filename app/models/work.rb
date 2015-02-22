class Work < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :author, :link, :description, :length, presence: true

  has_many :ratings
  has_many :comments
  has_many :chapters
  has_many :taggings
  has_many :tags, through: :taggings

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
    works[page.to_i*10-10..page.to_i*10]
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

 def tag_names
   self.tags.map{ |tag| tag.name }
 end

end

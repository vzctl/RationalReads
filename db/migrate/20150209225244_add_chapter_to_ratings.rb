class AddChapterToRatings < ActiveRecord::Migration
  def change
    add_column :ratings, :chapter_id, :integer, index: true
  end
end

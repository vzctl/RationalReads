class AddAverageRatingToWork < ActiveRecord::Migration
  def change
    add_column :works, :average_rating, :integer, null: false, default: 0
  end
end

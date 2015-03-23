class ChangeAverageRatingToFloat < ActiveRecord::Migration
  def change
    change_column :works, :average_rating, :float
  end
end

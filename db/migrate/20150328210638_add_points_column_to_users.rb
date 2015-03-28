class AddPointsColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :points, :integer, null: false, default: 0
  end
end

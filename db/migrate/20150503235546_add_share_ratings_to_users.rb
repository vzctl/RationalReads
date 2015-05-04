class AddShareRatingsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :display_ratings, :boolean, default: true
  end
end

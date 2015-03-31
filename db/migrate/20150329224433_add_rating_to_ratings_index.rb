class AddRatingToRatingsIndex < ActiveRecord::Migration
  def change
    add_index :ratings, [:user_id, :rating], name: "index_ratings_by_user"
    remove_index :ratings, name: "index_ratings_on_user_id"
  end
end

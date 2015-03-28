class AddUserIdToWorks < ActiveRecord::Migration
  def change
    add_column :works, :user_id, :integer
  end
end

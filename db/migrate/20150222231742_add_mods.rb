class AddMods < ActiveRecord::Migration
  def change
    add_column :users, :moderator, :integer
  end
end

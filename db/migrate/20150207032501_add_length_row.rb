class AddLengthRow < ActiveRecord::Migration
  def change
    add_column :works, :length, :string
  end
end

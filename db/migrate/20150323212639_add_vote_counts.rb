class AddVoteCounts < ActiveRecord::Migration
  def change
    add_column :works, :ones, :integer, null: false, default: 0
    add_column :works, :twos, :integer, null: false, default: 0
    add_column :works, :threes, :integer, null: false, default: 0
    add_column :works, :fours, :integer, null: false, default: 0
    add_column :works, :fives, :integer, null: false, default: 0
  end
end

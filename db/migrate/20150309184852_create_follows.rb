class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :user_id, null: false, index: true
      t.integer :work_id, null: false, index: true
      
      t.timestamps null: false
    end
  end
end

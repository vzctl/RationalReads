class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :user_id, null: false, index: true
      t.integer :work_id, null: false, index: true
      t.integer :rating, null: false

      t.timestamps null: false
    end
  end
end

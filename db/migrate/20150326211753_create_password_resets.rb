class CreatePasswordResets < ActiveRecord::Migration
  def change
    create_table :password_resets do |t|
      t.integer :user_id, null: false
      t.string :key, null: false
      
      t.timestamps null: false
    end
  end
end

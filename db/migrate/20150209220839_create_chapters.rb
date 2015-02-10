class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.integer :work_id, null: false, index: true
      t.integer :number, null: false, index: true
      t.string :link, null: false
      
      t.timestamps null: false
    end
  end
end

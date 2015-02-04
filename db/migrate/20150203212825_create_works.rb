class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.string :name, null: false
      t.string :author, null: false
      t.string :link, null: false
      t.string :description, null: false
      
      t.timestamps null: false
    end
  end
end

class AddTagsAndTaggings < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name, null: false, index: true

      t.timestamps null: false
    end

    create_table :taggings do |t|
      t.integer :work_id, index: true
      t.integer :tag_id, index: true

      t.timestamps null: false
    end
  end
end

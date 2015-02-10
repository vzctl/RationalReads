class AddChapterColumnToComments < ActiveRecord::Migration
  def change
    add_column :comments, :chapter_id, :integer, index: true
  end
end

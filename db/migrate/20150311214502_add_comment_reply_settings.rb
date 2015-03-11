class AddCommentReplySettings < ActiveRecord::Migration
  def change
    add_column :users, :get_comment_replies, :boolean, default: false
  end
end

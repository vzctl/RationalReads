class CommentsController < ApplicationController
  before_action :require_login

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render :partial => "show", locals: {comment: @comment}
    else
      render json: @comment.errors.full_messages, status: 406
    end
  end

  def update
  end

  private

  def comment_params
    params.require(:comment).permit(:work_id, :user_id, :content, :parent_comment_id)
  end
end

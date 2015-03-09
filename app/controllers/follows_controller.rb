class FollowsController < ApplicationController
  before_action :require_login

  def show
    work_id = params[:id]
    user_id = current_user.id
    @follow = Follow.find_by_work_id_and_user_id(work_id, user_id)

    if @follow.nil?
      render json: {status: "None"}, status: 406
    else
      render json: @follow
    end
  end

  def create
    @follow = Follow.new(follow_params)
    @follow.user_id = current_user.id

    if @follow.save
      render json: @follow
    else
      render json: @follow.errors.full_messages, status: 406
    end
  end

  def destroy
    @follow = Follow.find(params[:id])

    if @follow.destroy
      render :json => "success"
    else
      render json: @follow.errors.full_messages, status: 406
    end
  end
  private

    def follow_params
      params.require(:follow).permit(:work_id, :user_id, :follow_status)
    end
end

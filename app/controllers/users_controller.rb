class UsersController < ApplicationController
  def show
    @user = User.find params[:id]
    @ratings = @user.ratings.
      where("work_id IS NOT NULL").
      includes(:work => :tags).
      order("rating desc").
      paginate(page: params[:page], per_page: 20)
  end

  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def index
    @users = User.where("points > 0").
      order("points DESC").
      limit(200).
      pluck(:username, :points, :id)
    render json: @users
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end

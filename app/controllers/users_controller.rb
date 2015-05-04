class UsersController < ApplicationController
  def show
    @user = User.find params[:id]

    if @user.display_ratings?
      @ratings = @user.ratings.
        where("work_id IS NOT NULL").
        includes(:work => :tags).
        order("rating desc").
        paginate(page: params[:page], per_page: 10)
      render 'show'
    else
      render 'noshow'
    end
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

  def edit
    if signed_in? && current_user.id == params[:id].to_i
      @display_ratings = current_user.display_ratings?
      render 'edit'
    else
      redirect_to root_url
    end
  end

  def update
    if user_params[:show_ratings] == "yes"
      current_user.display_ratings = true
    else
      current_user.display_ratings = false
    end

    current_user.save
    redirect_to(:back)
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
    params.require(:user).permit(:email, :username, :password, :show_ratings)
  end
end

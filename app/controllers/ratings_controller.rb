class RatingsController < ApplicationController
  wrap_parameters :rating_data, include: [:work_id, :rating]
  before_action :require_login

  def create
    @rating = Rating.new(rating_params)
    @rating.user_id = current_user.id

    rating = current_user.already_rated?(@rating.work_id)
    if (rating)
      @rating = Rating.find(rating)
      if @rating.update(rating_params)
        render json: @rating, status: 200
      else
        render json: @rating.errors.full_messages, status: 422
      end
    else
      if @rating.save
        render json: @rating, status: 200
      else
        render json: @rating.errors.full_messages, status: 422
      end
    end
  end

  def require_login
    unless signed_in?
      render json: "You must be logged in to rate works."
    end
  end

  private

  def rating_params
    params.require(:rating_data).permit(:work_id, :rating)
  end

end

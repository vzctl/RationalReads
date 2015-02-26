class RatingsController < ApplicationController
  wrap_parameters :rating_data, include: [:work_id, :rating, :chapter_id]
  before_action :require_login

  def create
    if rating_params["work_id"] == nil
      @rating =  current_user.rating(nil, rating_params["chapter_id"])
      rating_parent = Chapter.find(rating_params["chapter_id"])
      parent_type = "chapter"
    else
      @rating = current_user.rating(rating_params["work_id"], nil)
      rating_parent = Work.find(rating_params["work_id"])
      parent_type = "work"
    end

    if @rating
      if @rating.update(rating_params)
        rating_parent.update_bayesian_average if parent_type == "work"
        rating_data = @rating.generate_data(rating_parent, "update", parent_type)
        render json: rating_data, status: 200
      else
        render json: @rating.errors.full_messages, status: 406
      end
    else
      @rating = Rating.new(rating_params)
      @rating.user_id = current_user.id

      if @rating.save
        rating_parent.update_bayesian_average if parent_type == "work"
        rating_data = @rating.generate_data(rating_parent, "create", parent_type)
        render json: rating_data, status: 200
      else
        render json: @rating.errors.full_messages, status: 406
      end
    end
  end

  private

  def rating_params
    params.require(:rating_data).permit(:work_id, :rating, :chapter_id)
  end

end

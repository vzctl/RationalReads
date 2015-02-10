class RatingsController < ApplicationController
  wrap_parameters :rating_data, include: [:work_id, :rating]
  before_action :require_login

  def create
    @rating = current_user.rating(rating_params["work_id"])
    @work = Work.find(rating_params["work_id"])

    if @rating
      if @rating.update(rating_params)
        rating_data = @rating.generate_data(@work, "update")
        render json: rating_data, status: 200
      else
        render json: @rating.errors.full_messages, status: 406
      end
    else
      @rating = Rating.new(rating_params)
      @rating.user_id = current_user.id

      if @rating.save
        rating_data = @rating.generate_data(@work, "create")
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

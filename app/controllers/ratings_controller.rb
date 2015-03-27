class RatingsController < ApplicationController
  wrap_parameters :rating_data, include: [:work_id, :rating, :chapter_id]
  before_action :require_login

  def create
    @rating, @rated_item, @item_type = Rating.find_rating(current_user, rating_params)

    if @rating.nil?
      @rating = Rating.new(rating_params)
      @rating.user_id = current_user.id

      if @rating.save
        response = @rating.response(@rated_item, "create", @item_type)
        render json: response, status: 200
      else
        render json: @rating.errors.full_messages, status: 406
      end
    else
      update
    end
  end

  # gets called from create action above, not directly through url
  def update
    if @rating.update({rating: rating_params["rating"]})
      response = @rating.response(@rated_item, "update", @item_type)
      render json: response, status: 200
    else
      render json: @rating.errors.full_messages, status: 406
    end
  end

  private

  def rating_params
    params.require(:rating_data).permit(:work_id, :rating, :chapter_id)
  end

end

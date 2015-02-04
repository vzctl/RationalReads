class RatingsController < ApplicationController
  def create
    @rating = Rating.new(rating_params)
    @rating.user_id = current_user.id

    if @rating.save
      render text: "win"
    else
      flash.now[:errors] = @rating.errors.full_messages
      render text: "fail"
    end
  end

  private

  def rating_params
    params.require(:work).permit(:work_id, :rating)
  end

end

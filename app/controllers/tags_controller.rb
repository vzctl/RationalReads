class TagsController < ApplicationController
  def new
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      redirect_to root_url
    else
      flash.now[:errors] = @tag.errors.full_messages
      render :new
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end

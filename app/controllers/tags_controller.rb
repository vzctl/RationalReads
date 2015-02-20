class TagsController < ApplicationController
  def new
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render :new
    else
      flash.now[:errors] = @tag.errors.full_messages
      render :new
    end
  end

  def index
    @tags = Tag.all
    render json: @tags
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end

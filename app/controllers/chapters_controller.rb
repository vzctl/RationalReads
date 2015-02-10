class ChaptersController < ApplicationController

  def create
    @chapter = Chapter.new(chapter_params);

    if @chapter.save
      render json: @chapter
    else
      render json: @chapter.errors.full_messages, status: 406
    end
  end

  private

  def work_params
    params.require(:chapter).permit(:work_id, :number)
  end
end

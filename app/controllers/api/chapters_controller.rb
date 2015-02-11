module Api
  class ChaptersController < ApplicationController

    def create
      @chapter = Chapter.new(chapter_params);

      if @chapter.save
        render json: @chapter
      else
        render json: @chapter.errors.full_messages, status: 406
      end
    end

    def show
      @chapter = Chapter.find(params[:id])
      @comments = @chapter.comments

      render :show
    end

    def index
      @chapters = Chapter.all

      render :index
    end

    private

    def chapter_params
      params.require(:chapter).permit(:work_id, :number, :link)
    end
  end
end

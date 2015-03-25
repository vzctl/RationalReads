module Api
  class ChaptersController < ApplicationController

    def create
      @chapter = Chapter.new(chapter_params);

      if @chapter.save
        @chapter.send_notifications
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
      @chapters = Chapter.order("created_at DESC").take(20)
      @chapters = @chapters.uniq { |c| c.work_id }
      @chapters = @chapters[0..10]
      render :index
    end

    private

    def chapter_params
      params.require(:chapter).permit(:work_id, :number, :link)
    end
  end
end

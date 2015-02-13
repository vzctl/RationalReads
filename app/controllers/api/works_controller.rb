module Api
  class WorksController < ApplicationController
    def create
      @work = Work.new(work_params)
      
      if @work.save
        render json: @work
      else
        render json: @work.errors.full_messages, status: 406
      end
    end

    def show
      @work = Work.find(params[:id])
      @comments = @work.comments
      @chapters = @work.chapters

      render :show
    end

    def index
      @works = Work.all
      render :index
    end

    private

      def work_params
        params.require(:work).permit(:name, :author, :link, :description, :length)
      end
  end
end

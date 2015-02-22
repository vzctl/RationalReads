module Api
  class WorksController < ApplicationController
    def create
      @work = Work.new(work_params)
      @tags = params["taggings"]

      if @work.save
        Tagging.save_tags(@tags, @work.id)
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
      filtered_works = Work.filtered(params[:filters])
      sorted_works = Work.order("comments", filtered_works)
      # sorted_works = Work.order(params[:order], filtered_works)

      if params[:page] === nil
        @works = sorted_works
        @pages = (filtered_works.length / 10.0).ceil
      else
        @works = Work.page(params[:page]).per(10)
        @pages = (Work.all.length / 10.0).ceil
      end
    
      render :index
    end

    private

      def work_params
        params.require(:work).permit(:name, :author, :link, :description, :length)
      end
  end
end

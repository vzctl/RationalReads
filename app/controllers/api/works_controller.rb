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

    def update
      @work = Work.find(params[:id])
      @tags = params["taggings"]
      @work.update(work_params)

      if @work.save
        Tagging.update_tags(@tags, @work.id)
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
      # votes = Rating.all.length
      # works = Work.rated_works
      # @average_votes = votes.to_f / works
      # @average_average_rating = Rating.all.map { |rating| rating.rating}.reduce(:+) / works

      filtered_works = Work.filtered(params[:filters])
      sorted_works = Work.order(params[:order], filtered_works)

      if params[:page] === nil
        @works = sorted_works
        @pages = (filtered_works.length / 10.0).ceil
      else
        @works = Work.page(params[:page], sorted_works)
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

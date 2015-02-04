module Api
  class WorksController < ApplicationController
    def create
      @work = Work.new(work_params)

      if @work.save
        redirect_to work_url(@work)
      else
        flash.now[:errors] = @work.errors.full_messages
        render text: "fail"
      end
    end

    def show
      @work = Work.find(params[:id])
      render :show
    end

    def index
      @works = Work.all
      render :index
    end

    private

      def work_params
        params.require(:work).permit(:name, :author, :link, :description)
      end
  end
end

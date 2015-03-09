class EmailsController < ApplicationController
  protect_from_forgery :except => :create

  def create
    @to = params[:to]
    @subject  = params[:subject]
    @body = params[:body]

    NotificationMailer.send_mail(@to, @subject, @body).deliver_now

    render text: "Success"
  end
end

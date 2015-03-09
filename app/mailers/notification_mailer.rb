class NotificationMailer < ActionMailer::Base
  default from: "amitpamin@gmail.com"

  def send_mail (to, subject, body)
    @body = body
    mail(to: to, subject: subject)
  end
end

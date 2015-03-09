class NotificationMailer < ActionMailer::Base
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_mail (to, subject, body)
    @body = body
    mail(to: to, subject: subject)
  end
end

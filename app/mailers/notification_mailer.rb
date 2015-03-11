class NotificationMailer < ActionMailer::Base
  attr_reader :user, :chapter
  after_action :ensure_mail_called
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_update(user, chapter)
    @user = user
    @chapter = chapter
    subject = "#{chapter.work.name} Has Updated!"
    to = user.email
    mail(to: to, subject: subject) if qualified?
  end

  private

    def qualified?
      qualification = NotificationQualifier.new(:update, user)
      qualification.chapter = chapter
      qualification.run_checks
      qualification.qualified?
    end

    def ensure_mail_called
      mail.perform_deliveries = true
    end
end

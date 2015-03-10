class NotificationMailer < ActionMailer::Base
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_update(user, chapter)
    if self.qualified?(user, chapter)
      to = user.email
      subject = "#{chapter.work.name} has been updated."
      @chapter = chapter
      mail(to: to, subject: subject)
    end
  end

  def qualified?(user, chapter)
    qualification = NotificationQualifier.new(:update, user)
    qualification.chapter = chapter
    qualification.run_checks
    qualification.qualified?
  end
end

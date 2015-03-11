class NotificationMailer < ActionMailer::Base
  attr_reader :user, :chapter, :type
  attr_accessor :qualification
  after_action :ensure_mail_called
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_update(user, chapter)
    @type, @user = :update, user
    @chapter = chapter
    subject = "#{chapter.work.name} Has Updated!"
    to = user.email
    mail(to: to, subject: subject) if qualified?
  end

  def send_reply(user, parent_comment, child_comment)
    @type, @user = :reply, user
    @parent_comment, @child_comment = parent_comment, child_comment
    subject = "Your comment on Rational Reads has received a reply."
    to = user.email
    mail(to: to, subject: subject) if qualified?
  end

  private

    def qualified?
      @qualification = NotificationQualifier.new(type, user)
      set_qualification_data
      qualification.run_checks
      qualification.qualified?
    end

    def set_qualification_data
      if type == :update
        qualification.chapter = chapter
      else type == :reply
        qualification.parent_comment = @parent_comment
        qualification.child_comment = @child_comment
      end
    end

    def ensure_mail_called
      mail.perform_deliveries = true
    end
end

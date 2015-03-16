class NotificationMailer < ActionMailer::Base
  attr_reader :user, :chapter, :type, :parent_comment, :child_comment, :subject
  attr_accessor :qualification
  after_action :send_if_qualified
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_update(user, chapter)
    @type, @user = :update, user
    @chapter = chapter
    @subject = "#{chapter.work.name} Has Updated!"
  end

  def send_reply(user, parent_comment, child_comment)
    @type, @user = :reply, user
    @parent_comment, @child_comment = parent_comment, child_comment
    @subject = "Your comment on Rational Reads has received a reply"
  end

  private

    def send_if_qualified
      if qualified?
        mail(to: user.email, subject: subject)
      else
        mail.perform_deliveries = false
      end
    end

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
        qualification.parent_comment = parent_comment
        qualification.child_comment = child_comment
      end
    end

    def prevent_delivery
      mail.perform_deliveries = false
    end
end

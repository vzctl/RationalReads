class NotificationMailer < ActionMailer::Base
  attr_reader :user, :chapter, :type, :testing, :parent_comment, :child_comment
  attr_accessor :qualification
  before_action :prevent_delivery_if_test
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_update(user, chapter, testing = false)
    @type, @user, @testing = :update, user, testing
    @chapter = chapter
    subject = "#{chapter.work.name} Has Updated!"

    mail(to: user.email, subject: subject) if qualified?
  end

  def send_reply(user, parent_comment, child_comment, testing = false)
    @type, @user, @testing = :reply, user, testing
    @parent_comment, @child_comment = parent_comment, child_comment
    subject = "Your comment on Rational Reads has received a reply"

    mail(to: user.email, subject: subject) if qualified?
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
        qualification.parent_comment = parent_comment
        qualification.child_comment = child_comment
      end
    end

    def prevent_delivery_if_test
      mail.perform_deliveries = false if testing
    end
end

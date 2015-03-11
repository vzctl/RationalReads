class NotificationQualifier
  attr_accessor :chapter, :parent_comment, :child_comment
  attr_reader :type, :user, :qualified

  def initialize(type, user)
    @qualified = true
    @type = type
    @user = user
  end

  def qualified?
    qualified
  end

  def run_checks
    user_wants_email?
    if type == :update
      new_chapter_not_backlog?
      newest_chapter?
    elsif type == :reply
      fresh_reply?
      user_wants_reply?
    end
  end

  private

    def user_wants_email?
      not_qualified unless user.get_email
    end

    def new_chapter_not_backlog?
      latest_chapter_date = Chapter.maximum(:created_at).to_date
      current_date = Date.today

      not_qualified if (current_date - latest_chapter_date).to_i <= 1
    end

    def newest_chapter?
      latest_chapter_number = Chapter.maximum(:number)

      not_qualified if self.chapter.number < latest_chapter_number
    end

    def fresh_reply?
      reply_date = child_comment.created_at.to_date
      parent_comment_date = parent_comment.created_at.to_date

      not_qualified if (reply_date - parent_comment_date).to_i > 30
    end

    def user_wants_reply?
      not_qualified unless user.get_comment_replies
    end

    def not_qualified
      qualified = false
    end
end

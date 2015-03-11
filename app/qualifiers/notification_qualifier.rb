class NotificationQualifier
  attr_accessor :chapter, :parent_comment, :child_comment
  attr_reader :type, :qualified

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
      user_wants_reply?
      fresh_reply?
    end
  end

  private

    def user_wants_email?
      user.get_emails ? true : @qualified = false
    end

    def new_chapter_not_backlog?
      latest_chapter_date = Chapter.maximum(:created_at).to_date
      current_date = Date.today

      (current_date - latest_chapter_date).to_i > 1  ? true : @qualified = false
    end

    def newest_chapter?
      latest_chapter_number = Chapter.maximum(:number)

      self.chapter.number > latest_chapter_number ? true : @qualified = false
    end

    def
end

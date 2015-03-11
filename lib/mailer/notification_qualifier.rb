class NotificationQualifier
  attr_accessor :chapter
  attr_reader :type, :qualified

  def initialize(type, user)
    @qualified = true
    @type = type
    @user = user
  end

  def qualified?
    true
    # qualified
  end

  def run_checks
    if type == :update
      new_chapter_not_backlog?
      newest_chapter?
    end
  end

  private

    def new_chapter_not_backlog?
      latest_chapter_date = Chapter.maximum(:created_at).to_date
      current_date = Date.today

      (current_date - latest_chapter_date).to_i > 1  ? true : @qualified = false
    end

    def newest_chapter?
      latest_chapter_number = Chapter.maximum(:number)

      self.chapter.number > latest_chapter_number ? true : @qualified = false
    end
end

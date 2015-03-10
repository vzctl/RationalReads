class NotificationQualifier
  attr_accessor :chapter
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
    if type == :update
      self.overwhelmed?
      self.newest_chapter?
    end
  end

  def overwhelmed?
    chapters = self.chapter.work.chapters
    chapters = chapters.sort_by {|chapter| chapter.created_at}
    latest = chapters.last.created_at.to_date
    current = Date.today

    (current - latest).to_i > 1  ? true : @qualified = false
  end

  def newest_chapter?
    chapters = self.chapter.work.chapters
    chapters = chapters.sort_by {|chapter| chapter.number}

    self.chapter.number > chapters.last.number ? true : @qualified = false
  end
end

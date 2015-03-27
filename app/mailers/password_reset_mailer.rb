class PasswordResetMailer < ActionMailer::Base
  default from: 'Amit Amin <amit@rationalreads.com>'

  def send_reset(user_id, key)
    @user = User.find_by_id(user_id)
    @key = key
    @subject = "Your Password Reset Link for RationalReads"
    byebug
    mail(to: @user.email, subject: @subject)
  end

  private
end

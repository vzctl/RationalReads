class PasswordResetsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_email(params[:email])
    @password_reset = PasswordReset.new

    if @user
      @password_reset.key = SecureRandom.urlsafe_base64(16)
      @password_reset.user_id = @user.id
      if @password_reset.save
        flash[:errors] = ["Password reset link sent to your email."]
        redirect_to new_session_url
      else
        flash[:errors] = @password_reset.errors.full_messages
        redirect_to new_session_url status: 406
      end
    else
      flash.now[:errors] = ["Email not found."]
      render :new
    end
  end

  def use_reset_string(key = nil)
    @key = key || params[:key]
  end

  def reset
    @password_reset = PasswordReset.find_by_key(params[:key])

    if @password_reset.nil?
      flash[:errors] = ["Invalid reset key."]
      redirect_to new_session_url and return
    end

    @user = User.find_by_id(@password_reset.user_id)

    if @password_reset.valid?(@user)
      @user.password = params[:password]
      if @user.save
        flash[:errors] = ["Password changed."]
        redirect_to new_session_url
      else
        flash[:errors] = @user.errors.full_messages

        redirect_to password_resets_use_reset_string_url(:key => params[:key])
      end
    else
      flash[:errors] = @password_reset.errors.full_messages
      redirect_to new_session_url
    end
  end

end

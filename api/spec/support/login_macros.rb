module LoginMacros
  # 一般ユーザーのログイン状態を作成（devise用）
  def login_user(user)
    controller.stub(:authenticate_user!).and_return true
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end
end

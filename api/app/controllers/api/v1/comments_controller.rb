class Api::V1::CommentsController < ApiController
  def create
    comment = current_api_v1_user.comments.build(comment_params)
    if comment.save
      render json: comment, status: :ok
    else
      render json: { status: 500 }
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy!
    render json: { status: 200 }
  end

  private

    def comment_params
      params.require(:comment).permit(:user_id, :picture_id, :body)
    end
end

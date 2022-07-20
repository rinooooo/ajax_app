class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end


  def create
    post = Post.create(content: params[:content])
    render json:{ post: post}
    #↑redirect_toだとページが更新されるから、eachメソッドの@postsのデータも更新される（増える）
    # renderだとページ更新されないから、eachメソッドの@postsのデータはそのまま+挿入した投稿
    # →ページ更新したタイミングでeachメソッドの@postsデータも更新される
  end
end

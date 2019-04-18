class UsersController < ApplicationController

    def index
        users = User.all.sort
        render json: users
    end
    
    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    def create
        user = User.new(name: params[:name], username: params[:username])
        user.save
        render json: user
    end

    def update
        user = User.find_by(id: params[:id])
        user.update(name: params[:name], username: params[:username])
        render json: user
    end

    def destroy
        user = User.find_by(id: params[:id])
        user.destroy
        render json: {message: 'deleted'}
    end

end

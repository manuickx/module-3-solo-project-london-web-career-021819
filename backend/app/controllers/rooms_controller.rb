class RoomsController < ApplicationController

    def index
        rooms = Room.all
        render json: rooms
    end
    
    def show
        room = Room.find_by(id: params[:id])
        render json: room
    end

    def create
        room = Room.new(name: params[:name], image_url: params[:image_url], description: params[:description], user_id: params[:user_id])
        room.save
        render json: room
    end

    def destroy
        room = Room.find_by(id: params[:id])
        room.destroy
        render json: {message: "deleted"}
    end

end

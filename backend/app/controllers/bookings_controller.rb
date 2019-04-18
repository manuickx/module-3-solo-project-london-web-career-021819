class BookingsController < ApplicationController

    def index
        bookings = Booking.all
        render json: bookings
    end

    def create
        booking = Booking.new(user_id: params[:user_id], room_id: params[:room_id])
        booking.save
        render json: booking
    end

    def destroy
        booking = Booking.find_by(user_id: params[:user_id], room_id: params[:room_id])
        booking.destroy
        render json: {message: "deleted"}
    end


end

class BookingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :room_id, :room, :guest
end

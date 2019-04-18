class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :description, :guests, :bookings
  has_one :host
end

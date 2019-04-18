class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :rooms, :bookings
end

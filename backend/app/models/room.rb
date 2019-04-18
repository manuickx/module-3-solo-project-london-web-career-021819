class Room < ApplicationRecord
  belongs_to :host, class_name: "User", foreign_key: :user_id
  has_many :bookings
  has_many :guests, class_name: "User", through: :bookings
end

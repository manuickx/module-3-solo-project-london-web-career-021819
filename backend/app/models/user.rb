class User < ApplicationRecord
    has_many :rooms, as: :host
    has_many :bookings
    has_many :rooms, through: :bookings, as: :guest

    validates :name, :username, presence: true
    validates :username, uniqueness: true

end

class CreateRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :image_url
      t.text :description
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end

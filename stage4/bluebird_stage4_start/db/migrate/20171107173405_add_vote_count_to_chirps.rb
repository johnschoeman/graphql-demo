class AddVoteCountToChirps < ActiveRecord::Migration[5.1]
  def change
    add_column :chirps, :like_count, :integer, null: false, default: 0
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Chirp.destroy_all
Like.destroy_all

User.create(username: 'alice', email: 'alice', password: 'password')
User.create(username: 'bob', email: 'bob', password: 'password')

users = []
5.times do
  users << User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")
end

chirps = []
10.times do
  chirps << Chirp.create(body: Faker::Twitter.status[:text], author_id: users.sample.id)
end

20.times do
  Like.create(user_id: users.sample.id, chirp_id: chirps.sample.id)
end

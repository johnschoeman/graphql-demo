Types::ChirpType = GraphQL::ObjectType.define do
  name 'Chirp'

  field :id, !types.ID
  field :body, !types.String
  field :author_id, !types.Int
  field :likes, !types.Int, property: :count_of_likes
  field :liked_by_current_user, function: Resolvers::LikedByCurrentUser.new
end
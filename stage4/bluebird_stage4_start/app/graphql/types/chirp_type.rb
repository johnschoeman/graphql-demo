Types::ChirpType = GraphQL::ObjectType.define do
  name 'Chirp'

  field :id, !types.ID
  field :body, !types.String
  field :author_id, !types.Int
  field :like_count, !types.Int, property: :count_of_likes
  field :liked_by_current_user, function: Resolvers::LikedByCurrentUser.new

  field :likes, !types[Types::LikeType] do
    resolve ->(obj, args, ctx) {
      obj.likes
    }
  end
end
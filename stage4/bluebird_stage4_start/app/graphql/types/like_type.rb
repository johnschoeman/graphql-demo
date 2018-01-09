Types::LikeType = GraphQL::ObjectType.define do
  name 'Like'

  field :id, !types.Int
  field :user_id, !types.Int
  field :chirp_id, !types.Int
end
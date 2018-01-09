Types::UserType = GraphQL::ObjectType.define do
  name 'user'

  field :id, !types.ID
  field :username, !types.String
  field :email, !types.String
  field :chirps, !types[Types::ChirpType]
end
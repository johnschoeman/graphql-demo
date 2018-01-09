Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :allChirps, !types[Types::ChirpType] do
    resolve ->(obj, args, ctx) { 
      Chirp.order(created_at: :desc) 
    }
  end

  field :allLikes, !types[Types::LikeType] do
    resolve ->(obj, args, ctx) { Chirp.all }
  end

  field :allUsers, !types[Types::UserType] do
    resolve ->(obj, args, ctx) { User.all }
  end

  # TODO: remove me
  field :testField, types.String do
    description "An example field added by the generator"
    resolve ->(obj, args, ctx) {
      "Hello World!"
    }
  end
end

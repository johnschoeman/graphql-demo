class Resolvers::CreateChirp < GraphQL::Function
  argument :body, !types.String
  argument :author_id, !types.Int

  type Types::ChirpType

  def call(obj, args, ctx) 
    chirp = Chirp.new({
      body: args[:body],
      author_id: args[:author_id]
    })

    if chirp.save
      return chirp
    else
      return GraphQL::ExecutionError.new("Invalid Input: #{chirp.errors.full_messages.join(', ')}")
    end
  end
end

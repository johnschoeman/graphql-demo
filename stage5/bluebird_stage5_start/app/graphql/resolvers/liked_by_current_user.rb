class Resolvers::LikedByCurrentUser < GraphQL::Function
  type types.Boolean

  def call(obj, args, ctx) 
    return false unless ctx[:current_user]
    !!obj.likes.find_by(user_id: ctx[:current_user].id)
  end
end
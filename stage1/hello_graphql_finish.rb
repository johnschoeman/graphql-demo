require 'graphql'

QueryType = GraphQL::ObjectType.define do
  name 'Query'
  
  field :sayHello, !types.String do
    resolve ->(obj, args, ctx) do
      return "Hello World!"
    end
  end
end

HelloSchema = GraphQL::Schema.define do
  query QueryType
end

puts HelloSchema.execute('{ sayHello }').to_h

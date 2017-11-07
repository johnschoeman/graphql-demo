require 'graphql'

QueryType = GraphQL::ObjectType.define do
  name 'query'
  
  field :hello, !types.String do
    resolve ->(obj, args, ctx) do
      return "Hello World!"
    end
  end
end

Schema = GraphQL::Schema.define do
  query QueryType
end

puts Schema.execute('{ hello }').to_h

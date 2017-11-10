# Our First (ruby) GraphQL Server

Here we will walk through creating a very simple GraphQL server in ruby using the ruby gem: [graphql](https://github.com/rmosolgo/graphql-ruby)

Our server will return for us ```'Hello World!'``` when we send it a the query: ``` '{ sayHello }' ```

We will be using just ruby here and will integrate the concepts into a rails app starting in Stage 2.

The graphql gem will do the majority of the heavy lifting for us to implement a server following the GraphQL speficiation.  All we need to do to is four things:

1. Require the graphql gem.
2. Define a Type Object called QueryType.
3. Define a Schema Object with a query field of type QueryType.
4. Execute a query on our Schema.

### Step 1:
In your terminal install the graphql gem:
```bash
gem install graphql
```
Start a new file: hello_graphql.rb and require the graphql gem:

```ruby
# hello_graphql.rb
require 'graphql'
```

### Step 2:
The graphql gem provides for us a GraphQL::ObjectType class that has a method define { ... } mixed in which allows us to define new Types (which are instances of the GraphQL::ObjectType class) that we can use in our GraphQL Schema to structure or application data graph.

Let's define our QueryType Type:

```ruby
# hello_graphql.rb
QueryType = GraphQL::ObjectType.define do
  name 'Query'
end
```

This type currently only has a name defined.  We need to add some fields to this type object inorder to allow our server to fetch data for our queries.

Each field needs a corresponding resolver function. The server will call the resolver functions which are dictated by a request query.  The return values of these resolves will be return as response data.

```ruby
# hello_graphql.rb
QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :sayHello, !types.String do
    resolve -> (obj, args, ctx) { 'Hello World!' }
  end
```

### Step 3:

Let's define our Schema object.  Similar to types, the graphql gem provides us a way to create the schema using the define { ... } mehtod.

```ruby
# hello_grapql.rb
...
HelloSchema = GraphQL::Schema.define do
  query QueryType
end
```

### Step 4:

The schema we created in Step 3 has an execute function which takes a query and resovles it, returning a GraphQL::Query::Result instance, which we can convert to a hash by using #to_h.

```ruby
puts HelloSchema.execute('{ sayHello }').to_h
```

now we can run 

```ruby hello_graphql.rb``` 

and recieve the expected result: 

```{"data"=>{"sayHello"=>"Hello World!"}}```

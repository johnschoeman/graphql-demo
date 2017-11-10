# Rails + GraphQL

In this stage we will start with a basic twitter clone rails app with a RESTful API and convert a static endpoint to an equivelent dynamic GraphQL endpoint.

In Stage3 we will update our frontend client to utilize this new endpoint.

### Step 0:

Lets set up the app:

the app is configured with PostgreSQL, so make sure you have Postgre set up or convert the config files to the database of your choice.

Then run the following commands to setup the database:

```
rails db:create
rails db:setup
```

Let's install our node modules and set up our frontend build.  We'll be using webpack:

```
npm install
webpack --watch
```

open up a new terminal window and run 
```
rails s
```

open up localhost:3000 in your browser and verify the app is working correctly.

Signup or Login to navigate to ```/#/chrips```, we will be doing the majority of our work on this view.

We are now ready to begin our conversion to GraphQL.

### Step 1:

Add gem 'graphql' to the Gemfile

```ruby
#Gemfile
gem 'graphql'
```

And run ```bundle install``` in the terminal.

### Step 2:

Naviate to the app's root directory and run:
```
$ rails generate graphql:install
```

This will auto generate most of our required files.  You should see the following:

```
Running via Spring preloader in process 77990
      create  app/graphql/types
      create  app/graphql/types/.keep
      create  app/graphql/blue_bird_schema.rb
      create  app/graphql/types/query_type.rb
add_root_type  query
      create  app/graphql/mutations
      create  app/graphql/mutations/.keep
      create  app/graphql/types/mutation_type.rb
add_root_type  mutation
      create  app/controllers/graphql_controller.rb
       route  post "/graphql", to: "graphql#execute"
     gemfile  graphiql-rails
       route  graphiql-rails
Gemfile has been modified, make sure you `bundle install`
```

graphiql-rails was added to our Gemfile so let's run ```bundle install``` again.  This will mount the graphiql query editor tool for us.  You should be able to visit ```localhost:3000/graphiql``` and make queries in the editor.

### Step 3: Create a Chirp Type

Create a new file:

```ruby
#/app/graphql/types/chirp_type.rb
Types::ChirpType = GraphQL::ObjectType.define do
  name 'Chirp'

  field :id, !types.ID
  field :body, !types.String
  field :author_id, !types.Int

end
```

### Step 4: Create an entry point to our GraphQL server called allChirps

```ruby
#/app/graphql/types/query_type.rb

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :allChirps, !types[Types::ChirpType] do
    resolve ->(obj, args, ctx) { Chirp.all }
  end
end
```

### Step 5: Create a likes field for our Chirp Type

```ruby
#/app/graphql/types/chirp_type.rb
Types::ChirpType = GraphQL::ObjectType.define do
  name 'Chirp'

  field :id, !types.ID
  field :body, !types.String
  field :author_id, !types.Int
  field :likes, !types.Int, property: :like_count
end
```

### Step 6: Create a liked_by_current_user for our Chirp Type

```ruby
#/app/graphql/types/chirp_type.rb
Types::ChirpType = GraphQL::ObjectType.define do
  name 'Chirp'

  field :id, !types.ID
  field :body, !types.String
  field :author_id, !types.Int
  field :likes, !types.Int, property: :like_count
  field :liked_by_current_user, !types.Boolean do
      resolve ->(obj, args, ctx) do
        return false unless ctx[:current_user]
        !!obj.likes.find_by(user_id: ctx[:current_user].id)
      end
  end
end
```

Make current user available to the context object being passed to the resolvers

```ruby
#/app/controllers/graphql/graphql_controller.rb
...
  def execute
    ...
    context = {
      current_user: current_user
    }
    ...
  end
```

You should now be able to access the Graphql endpoint by visiting localhost:3000/graphiql and writing an allChirps query.
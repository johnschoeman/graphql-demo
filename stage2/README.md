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

### Step 1: Add the graphql Gem

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

A fair amout has happend here.  Take a moment to familiarize yourself with the generated code.  A few key points to note are:

1. GraphQL Schema 
- A schema has been initialized for you in a new folder called graphql/ along with a base query and a base mutation type.  These will serve as the entry points to our application-data-graph for all resquests to the server.

2. GraphQL Controller
- A graphql controller has been made to handle requests.  A rails app using graphql still follows the MVC design pattern, but now a single graphql controller can handle all of the data fetching from the database, instead of multiple controllers with multiple actions for each restful endpoint.  
- Basically the graphql controller will parse the relivant query and variables from the request headers, grab any relevant context (i.e. stateful information over multiple request/response cycles) and execute the request on the schema.
- It's good to note that using graphql to create a dynamic api endpoint does not preclude you from also using restful api endpoints, that is, you can still define model specific controllers and use them in conjunction with the graphql controller.

3. GraphQL Route
- A new route has been added to our routes.rb file: ```post "/graphql", to: "graphql#execute"```.  This will call our graphql controller action.

4. GraphiQL
- Note the 'i' in GraphiQl.
- Graphiql is a developement tool that we will be using to test our graphql requests.  

graphiql-rails was added to our Gemfile so let's run ```bundle install``` again.  This will mount the graphiql query editor tool for us and make it availble to request in our router by adding the following code: 

```ruby
  #/app/config/routest.rb
  ...
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  ...
```

You should be able to visit ```localhost:3000/graphiql``` and make queries in the editor after initializing the rails server.  Test that you can open the GraphiQL tool in your browser before preceeding.

### Step 3: Create a Chirp Type

Create a new file called chirp_type.rb and define a new object type to be used in creating respones from our graphql server:

(Note that the naming conventions must also be followed, similiar to other rails conventions.  If you where to call the file ```chirps_type.rb``` and the type ```Type::ChirpType``` this would cause an error during the execution of the query.)

```ruby
#/app/graphql/types/chirp_type.rb
Types::ChirpType = GraphQL::ObjectType.define do # 1)
  name 'Chirp'

  field :id, !types.Int  # 2)
  field :body, !types.String
  field :author_id, !types.Int
end
```

1) Here we are createing a new type called ChirpType under the Types name space using the GraphQL::ObjectType.define method as we did in stage 1.

2) There's a lot going on in this line.  Let's take a moment to break it down. 

Firstly, we are using a rails-like convention implemented in the graphql gem to create our resolver functions for the fields of ChirpType.  Given records from our Active Record ORM have the method Chirp#body, we can write the resolver: 

```ruby
  field :body, !types.String do
    resolve -> (obj, args, ctx) { obj.body }
  end
```

as: 

```ruby
  field :body, !types.String
```

(todo: explain a bit of the meta programming with the field function, the bang operator and the types object here)

Now we have a way of gathering chirps their data from our Chirp model.  Next we will use this type to make a field that will return chirps.

### Step 4: Create an entry point to our GraphQL server called allChirps

Modify the root query type with an ```allChrips``` field to make available chirp objects from our database.

```ruby
#/app/graphql/types/query_type.rb

Types::QueryType = GraphQL::ObjectType.define do 
  name 'Query'

  field :allChirps, !types[Types::ChirpType] do  # 1)
    resolve ->(obj, args, ctx) { Chirp.all }
  end
end
```

1) We would like our server to return an array of chirps arrays and since all resolver return values must be delcared, we must tell the graphql server that we want the ```allChirps``` field to return an array and that array's items will be of the ```ChirpType``` type. With the graphql ruby gem this is done with the ```types[ItemType]```.

Test that you make a query to your application with graphiql and recieve an array of all the chirps back:

```
query {
  allChirps {
    id
    body
  }
}
```

This query should return a json object similar to:
```
{
  "data": {
    "allChirps": [
      {
        "id": 4,
        "body": "Maiores nihil quo autem numquam placeat aliquam reprehenderit et."
      },
      ...
      {
        "id": 2,
        "body": "Amet incidunt sit asperiores unde impedit."
      }
    ]
  }
}
```

### Step 5: Create a likes field for our Chirp Type

We'd like to receive the number of likes each of our chirps has.  Our frontend is expecting the data to come under the parameter ```likes```.  Our model has a counter cache implemented under the name ```likes_count``` however.  We can map a field to a specific record attribute using a ```property: ``` key in our options hash.

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

Now we can access the number of likes for each chirp.  Test this data is coming through correctly using graphiql.

### Step 6: Create a liked_by_current_user for our Chirp Type

The last bit of information our frontend view requires is whether or not our current user likes a given chirp.  This will require the use of the context object provided to us by our graphql controller, typically refered to as ```ctx```, to access stateful information such as the current user.  The context operates similiary as ```session``` does in rails applications.  

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

We need to make the current user available to the context object being passed to the resolvers. Simply add it to the context.

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

Test that this information is being returned by the server correctly using graphiql.

That's it!  Our backend now has a graphql complient api which can return all the data we need to populate our chirps index view.

In the next stage we will implement queries on the frontend to take advantage of our new dynamic api.
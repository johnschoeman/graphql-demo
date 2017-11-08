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
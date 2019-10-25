# Pokedex Express App (with models and users)

For this exercise, we will abstract SQL queries into model files to declutter our controller files - effectively moving completely into an MVC (model view controller) framework.

We will also be introducing a Users table so users can create accounts on the app.

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `npm install` to install dependencies
3.  Create a new Postgres database by running `createdb pokemons -U <your_username>`
4.  Run `psql -U <your_username> -d pokemons -a -f tables.sql` - this will create 2 new tables for you - a `pokemons` table and `users` table in the database
5.  Seed data into the newly created `pokemons` table by running `psql -U <your_username> -d pokemons -a -f seed.sql` (Note: this will run 3 INSERT queries to seed 3 pokemons into the table.)
6.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
7.  Open `localhost:3000` on your browser and see the home page

## Deliverables

* Add in missing logic implementation in `controllers/pokemon.js` for `updateForm` and `update`
* Add in missing logic implementation in `controllers/user.js` for `login`
* Add a "Logout" button on home page that sends POST request to `/users/logout` to log out a user (hint: remember to remove cookies)
* Ensure that you can create a new user account
* Ensure that you can create a new pokemon

## Further

Add the ability for users to own newly created pokemons.

* Drop the database from earlier and implement a slightly different entity relationship - modify `tables.sql` to create a third table called `user_pokemons` that has a primary key `id`, and 2 foreign keys `pokemon_id` and `user_id`
* Modify the `pokemon/new.handlebars` file to accept a new field called "user_id"
* Modify the backend logic to assign any newly created pokemon to the specified user based on the value of the new `user_id` field
* Update the `user/user.handlebars` file to show all pokemons that a specified user owns (eg. `/users/1` should show the 1st user's account information _and_ names of pokemons that she owns)

## Notes

* Singular vs plural naming is important. For this exercise, let's assume that the plural of pokemon is pokemons...
* We have changed our table names to be plural. So user is now users table, and pokemon is now pokemons table.

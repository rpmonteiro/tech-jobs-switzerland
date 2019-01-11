# Tech Jobs Switzerland

## Architecture overview

- There is a server and a frontend module
- The server is a thin Typescript NodeJS app using Koa

  - The data is stored in Google's Firestore, and our NodeJS app just calls it and returns the result.
  - Payments and validations will happen here

- The frontend is written in Typescript and Preact. Preact is much like React (same syntax), but is a lot smaller in terms of final bundle size (the size of all the Javascript code being sent to the client)
  - The main focus is performance
  - The code is as simple and as explicit as possible - personal preference
  - The styles are in LESS and the CSS classes try to follow the BEM naming pattern

## Running the app

- Go into each of the folders (frontend / server) and follow the instructions there

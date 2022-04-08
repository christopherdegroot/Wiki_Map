Wiki Map
=========
Wiki Map is a web app that allows users to create custom maps which list multiple pins. The Wiki Map project taught me about working as part of a team and how to work in harmony with team mates through good communication, organized and clear Git commits, and comprehensive project planning.

## Final Product

Full demo of all component functions: browsing full list of maps, viewing maps with pins, favouriting maps, creating maps, adding pins.

!["Wiki-Map Demo"](https://github.com/christopherdegroot/Wiki_Map/blob/master/public/images/Wiki-Map-Demo.gif?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

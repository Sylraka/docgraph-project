# my-project-2024

## Frontend
use react-redux-toolkit
### start
with `npm start -d` in react-folder

## Database
use a mongodb community-server at localhost with possibility to migrate to mongodb atlas and any cloud-provider (maybe azure) in future
### start
- with `brew services start mongodb-community@7.0`anywhere
- with `mongosh` you can enter the environment, here you can get the SRV connection string with `db.getMongo()`
- using the GUI mongoDBCompass, use the connection string

## Middleware
use an express server with mongoose
### start
with `node server.js` in middleware-folder
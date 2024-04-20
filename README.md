<h1 align="center">
Pinterest Clone
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

Live Link: [Pinterest Clone MERN](https://pinterest-clone-mern.vercel.app/)

> Pinterest Clone: A MERN Stack Implementation

This project is a full-stack implementation of a Pinterest clone, built with the MERN stack (MongoDB, Express.js, React/Redux, Node.js).

## clone or download
```terminal
$ git clone https://github.com/Lakhaninawaz/pinterest-clone-mern.git
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build
$ npm run dev
```

## Server-side usage(PORT: 3000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ cd server
$ echo "DB_URI=YOUR_DB_URI" >> src/.env
$ echo "SECRET=YOUR_SESSION_SECRET" >> src/.env
$ echo "SECRET_KEY=YOUR_JWT_SECRET_KEY" >> src/.env
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```

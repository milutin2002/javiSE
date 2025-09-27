# javiSE

## Javisefront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## javiSE · Backend

Backend server for the **javiSE** application.  
Provides **REST API** endpoints (Express.js) and **real-time communication** (WebSocket).

---

### 🚀 Tech Stack

- Node.js
- Express.js
- WebSocket (`ws` or `socket.io`)
- dotenv for configuration
- (Optional) Database: MongoDB, PostgreSQL, MySQL, or Neo4j/Redis
- JWT authentication
- CORS for frontend access

---

### 📂 Project Structure

Backend/
│── src/
│ ├── server.js # Express + WebSocket entry point
│ ├── routes/ # REST routes
│ ├── controllers/ # Business logic
│ ├── websocket/ # WebSocket handlers
│ ├── middleware/ # Auth, error handling
│ ├── models/ # Database models
│ └── utils/ # Helpers
│
│── .env.example
│── package.json
│── README.md

### Setup and installation

cd javiSE/Aplikacija/Backend
npm install

### Configure environment

Create .env:

MONGO_USERNAME=username
MONGO_PASSWORD=mongo_password
JSON_SECRET=secretJWT

### Run backend Server

<pre><code>
node index.js
</code></pre>
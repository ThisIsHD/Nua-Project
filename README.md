# Nua Project

Nua Project is a full-stack web application that serves as a simple user management dashboard. It features a Node.js backend with an Express API connected to a MySQL database, and a responsive frontend built with Vue.js and the Vuetify 3 component framework. The application fetches user data from the `randomuser.me` external API, populates the database, and presents the data in an interactive table where users can be searched, filtered, and edited.

## Features

*   **Full-Stack Architecture:** Decoupled backend and frontend for modular development.
*   **RESTful Backend API:** Built with Node.js and Express for handling user data operations.
*   **Database Integration:** Uses MySQL to persist user information.
*   **External API Integration:** Fetches and stores 1000 user profiles from `randomuser.me`.
*   **Interactive UI:** A responsive and modern user interface built with Vue 3 and Vuetify 3.
*   **User Data Table:** Displays user information in a searchable, sortable, and paginated data table.
*   **In-Place Editing:** Allows for quick updates to user details (name, email, city) via a modal dialog.
*   **Modern Tooling:** Leverages Vite for a fast development experience and TypeScript for type safety.

## Tech Stack

*   **Backend:** Node.js, Express.js, MySQL2, Axios, Dotenv
*   **Frontend:** Vue 3, Vite, Vuetify 3, Pinia, TypeScript, SASS

## Getting Started

### Prerequisites

*   Node.js (v18.0 or later)
*   npm, yarn, or pnpm
*   A running MySQL server instance

### Database Setup

1.  Connect to your MySQL server.
2.  Create a new database for the project (e.g., `nua_project`).
3.  Execute the following SQL query to create the `users` table:

    ```sql
    CREATE TABLE users (
        uuid VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        city VARCHAR(255),
        UNIQUE (uuid)
    );
    ```

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a `.env` file and add your database credentials and server port:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=nua_project
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Since `nodemon` is a dependency, you can run the server using:
    ```bash
    npx nodemon server.js
    ```
5.  Wait for the console to log `MySQL connected!` and `Server running on port 3000`.
6.  To populate the database, send a `POST` request to the `/api/users/fetch` endpoint using a tool like Postman or `curl`:
    ```bash
    curl -X POST http://localhost:3000/api/users/fetch
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  To avoid conflicts with the backend server, ensure the frontend runs on a different port. Open `frontend/vite.config.mts` and set a unique port, for example:
    ```typescript
    // In frontend/vite.config.mts
    server: {
      port: 5173,
    },
    ```
3.  Create a `frontend/.env` file to specify the backend API URL. Ensure it points to your running backend server:
    ```env
    VITE_API_URL=http://localhost:3000
    ```
4.  Install the dependencies:
    ```bash
    npm install
    ```
5.  Start the frontend development server:
    ```bash
    npm run dev
    ```
6.  Open your browser and navigate to `http://localhost:5173` (or the port you configured).

## API Endpoints

The backend exposes the following API endpoints:

| Method | Endpoint             | Description                                                  |
| :----- | :------------------- | :----------------------------------------------------------- |
| `POST` | `/api/users/fetch`   | Fetches users from `randomuser.me` and saves them to the DB. |
| `GET`  | `/api/users`         | Retrieves all users from the database.                       |
| `PUT`  | `/api/users/:uuid`   | Updates the details for a specific user by their UUID.       |

# Real-Time Polling Application API

## Overview

This project is a robust backend service for a real-time polling application, built for the Move37 Ventures Backend Developer Challenge. The API allows users to create polls, vote on them, and see results update instantly via WebSockets. The architecture follows a professional, layered approach (Routes → Controllers → Services) for maintainability and scalability.

## ✨ Features

-   **User Management:** Create and retrieve users.
-   **Poll Management:** Create polls with multiple options and retrieve a list of all polls.
-   **Voting System:** Cast or update votes. The database schema enforces a "one vote per user, per poll" rule for data integrity.
-   **Real-Time Updates:** Uses WebSockets (Socket.IO) to broadcast live poll results to all connected clients the moment a vote is cast.

---

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Real-time Communication:** Socket.IO
-   **Password Hashing:** bcrypt.js

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
-   Node.js (v18 or later recommended)
-   npm (Node Package Manager)
-   PostgreSQL

---

## 🚀 Installation & Setup

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vikrampoonia/move37.git
    cd move37
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You can copy the example file:
    ```bash
    cp .env.example .env
    ```
    Then, edit the `.env` file with your PostgreSQL database connection URL:
    ```env
    DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
    PORT=3000
    ```

4.  **Run database migrations:**
    This command will create all the necessary tables in your database based on the Prisma schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start and be accessible at `http://localhost:3000`.

---

## 🧪 Testing the API with Postman

A Postman collection is provided to make testing all API endpoints simple and efficient.

### 1. Import the Collection
Click the button below to automatically import the collection into your Postman application.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://elements.getpostman.com/redirect?entityId=40196768-36cc9f1c-6ebe-4ba6-984d-021ecd5efc2b&entityType=collection)

### 2. Recommended Testing Workflow

To test the API's functionality, follow this sequence:

1.  **Create a User:** Go to the `Users` folder and run the `POST /api/users` request. Copy the `id` of the new user from the response body.
2.  **Create a Poll:** Go to the `Polls` folder and run the `POST /api/polls` request. You'll need to paste the `userId` you just copied into the request body. Copy the `id` of the new poll and the `id` of one of its options from the response.
3.  **Cast a Vote:** Go to the `Votes` folder and run the `POST /api/polls/:pollId/vote` request. Replace `:pollId` in the URL with your poll's ID. In the request body, paste the `userId` and `optionId` you copied.
4.  **Explore Other Endpoints:** You can now use the `GET` requests to retrieve all users, all polls, or a specific poll by its ID to see the results.

---

## ⚡ Testing Real-Time WebSocket Functionality

This is how you can see the live vote updates in action.

1.  **Ensure the server is running.**
2.  **Use Postman** to create a poll (if you haven't already) and copy its `pollId`.
3.  **Locate the `tester.html` file** in the project's root directory.
4.  **Open this file in two separate browser windows.** This simulates two different clients watching the poll.
5.  **In both browser windows,** paste the `pollId` into the input field and click the **"Watch Poll"** button. You should see a "Joined room" message in the log.
6.  **Go back to Postman** and use the **Cast a Vote** request to submit a vote for that poll.
7.  **Observe the browser windows.** The moment you send the request, the vote counts will update instantly and simultaneously in both windows, confirming that the real-time broadcast is working correctly.
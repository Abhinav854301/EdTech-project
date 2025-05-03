# EdTech Project (Replace with your actual project name)

A full-stack web application for an educational platform, featuring user authentication, course browsing, and potentially more features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

*   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
*   **Dynamic UI:** Navigation bar updates based on login status (shows user name and logout button when logged in).
*   **Protected Routes:** Backend routes secured using middleware to ensure only authenticated users can access certain data (e.g., user profile, enrolled courses).
*   **Course Browsing (Placeholder):** Basic API endpoints for fetching all courses (public) and user-specific courses (private).
*   **Smooth Scrolling & Active Navigation:** Enhanced frontend user experience.
*   *(Add any other features you have implemented or plan to implement)*

## Tech Stack

*   **Frontend:** HTML, CSS, JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose ODM)
*   **Authentication:** bcrypt.js (for password hashing), jsonwebtoken (for JWT)
*   **Middleware:** cors

## Project Structure
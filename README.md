# HealthGuardPro_Infosys_Internship_Oct2024_Team_02

Here we will track the health status of the user.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Frontend Components](#frontend-components)
7. [Styling](#styling)
8. [Testing](#testing)
9. [License](#license)

## Project Overview

HealthGuard Pro is a health tracking application that allows users to sign up, log in, and manage their health data. The application includes features such as password reset, OTP verification, and more.

## Project Structure

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Install the required dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/healthguardpro
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install the required dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm start
    ```

## Running the Application

1. Ensure MongoDB is running locally or that you have a valid connection string for MongoDB Atlas.
2. Start the backend server by running `npm run dev` in the `backend` directory.
3. Start the frontend server by running `npm start` in the `frontend` directory.
4. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

### User Registration

- **Endpoint**: `/api/signup`
- **Method**: POST
- **Description**: Registers a new user.
- **Request Body**:
    ```json
    {
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

### User Login

- **Endpoint**: `/api/login`
- **Method**: POST
- **Description**: Authenticates a user.
- **Request Body**:
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

### Password Reset

- **Endpoint**: `/api/forgot-password`
- **Method**: POST
- **Description**: Sends an OTP to the user's email for password reset.
- **Request Body**:
    ```json
    {
        "email": "john.doe@example.com"
    }
    ```

### Health Tracking

- **Endpoint**: `/api/quiz`
- **Method**: POST
- **Description**: Records user's health metrics
- **Request Body**:
    ```json
    {
        "userId": "user123",
        "PhysicalFitness": 75,
        "Nutrition": 56,
        "MentalWellness": 81,
        "BioMarkers": 96,
        "timestamp": "2024-02-20T10:00:00Z"
    }
    ```

### Health History

- **Endpoint**: `/api/scorehistory`
- **Method**: GET
- **Description**: Retrieves user's health history
- **Query Parameters**: `userId`, `startDate`, `endDate`

## Frontend Components

### Login Page

- **File**: `frontend/src/pages/login.js`
- **Description**: Renders the login form and handles user authentication.

### Signup Page

- **File**: `frontend/src/pages/signup.js`
- **Description**: Renders the signup form and handles user registration.

### Forgot Password Page

- **File**: `frontend/src/pages/forgotpassword.js`
- **Description**: Renders the forgot password form and handles OTP sending.

### OTP Verification Page

- **File**: `frontend/src/pages/otpverification.js`
- **Description**: Renders the OTP verification form and handles OTP validation.

### Reset Password Page

- **File**: `frontend/src/pages/resetpassword.js`
- **Description**: Renders the reset password form and handles password resetting.

### Health Dashboard

- **File**: `frontend/src/pages/dashboard.js`
- **Description**: Main dashboard showing health metrics and graphs

### Health Dashboard

- **File**: `frontend/src/pages/leaderboard.js`
- **Description**: A dynamic leaderboard displaying real-time user performance from health assessments

## Styling

The application uses CSS for styling. The styles are organized in the `frontend/src/styles` directory.

### Example Styles

- **Login Page Styles**: `frontend/src/styles/login.css`
- **Signup Page Styles**: `frontend/src/styles/signup.css`
- **Forgot Password Page Styles**: `frontend/src/styles/forgotpassword.css`
- **OTP Verification Page Styles**: `frontend/src/styles/otpverification.css`
- **Reset Password Page Styles**: `frontend/src/styles/resetpassword.css`
- **Dashboard Styles**: `frontend/src/styles/dashboard.css`
- **LeaderBoard Styles**: `frontend/src/styles/leaderboard.css`
  
## Testing

The project uses Jest and React Testing Library for testing.

### Running Tests

To run the tests, navigate to the `frontend` directory and run:

```sh
npm test
## License

This project is licensed under the MIT License.

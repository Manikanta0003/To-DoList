# Project README

## Overview
This repository contains a full-stack project with a React frontend and an Express backend. The frontend is built with Vite and served through Nginx in Docker, while the backend is an Express API using Node.js.

## Steps to Run Locally

### Option 1: Run with Docker Compose
1. Open a terminal in the repository root:
   ```bash
   cd "C:\Users\manin\OneDrive\Desktop\React"
   ```
2. Start the application:
   ```bash
   docker compose up --build
   ```
3. Access the app in your browser at:
   - Frontend: `http://localhost:5174`
   - Backend API: `http://localhost:5000`

### Option 2: Run Backend and Frontend Separately

#### Backend
1. Change to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
4. The backend listens on `http://localhost:5000`.

#### Frontend
1. Change to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `Frontend/.env` with the local API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend dev server:
   ```bash
   npm run dev
   ```
5. Open the app at `http://localhost:5174`.

## Docker Commands Used

- Build and run both services:
  ```bash
  docker compose up --build
  ```
- Run in detached mode:
  ```bash
  docker compose up -d --build
  ```
- Stop and remove containers:
  ```bash
  docker compose down
  ```
- View live logs:
  ```bash
  docker compose logs --tail=100
  ```
- View backend logs only:
  ```bash
  docker compose logs backend
  ```
- View frontend logs only:
  ```bash
  docker compose logs frontend
  ```

## Deployment Link
- Deployment link: `NOT DEPLOYED YET`

> If you have deployed this project, replace the above line with the actual URL.

## Render Deployment
This project includes a `render.yaml` configuration file for the backend service.

To deploy the backend on Render:
1. Connect the GitHub repository to Render.
2. Create a new web service and select this repository.
3. Use the `render.yaml` file to deploy the backend automatically.
4. In Render, configure these environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
5. Render will provide a public backend URL once deployment completes.

> Do not commit any secret values to the repository. Set secrets directly in Render's environment configuration.

## Architecture Explanation

This project is structured as two main services:

1. **Backend** (`Backend/`)
   - Built with Node.js and Express.
   - Uses `server.js` as the entry point.
   - Includes API routes for users, projects, tasks, and teams.
   - Uses `bcryptjs`, `jsonwebtoken`, `mongoose`, and `cors`.
   - Dockerfile creates a production-ready Node container exposing port `5000`.

2. **Frontend** (`Frontend/`)
   - Built with React and Vite.
   - Uses modern React router and component-based pages.
   - Environment variable `VITE_API_URL` points the frontend to the backend API.
   - Dockerfile builds the app and serves the static output with Nginx on port `80`.

3. **Docker Compose**
   - Orchestrates both backend and frontend services.
   - Maps frontend to `localhost:5174` and backend to `localhost:5000`.
   - Ensures the frontend starts after the backend via `depends_on`.
   - Passes `VITE_API_URL` build argument into the frontend image.

## Notes
- Keep sensitive data out of source control. The `Frontend/.env` file is local configuration and should not be committed if it contains private keys.
- If you set up a production deployment, update the `Deployment Link` section accordingly.

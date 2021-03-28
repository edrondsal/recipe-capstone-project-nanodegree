# CAPSTONE Project

## Recipe App

The objective is to start from scratch with the goal to construct the entire app: backend and frontend. The backend is developed as a Serverless backend using the techniques learned during the Nanodegree.

## Project Structure

For this Capstone project, a complete app is proposed

1. [`./backend/`](#Backend)
2. [`./frontend/`](#Frontend)

## About the Stack

### Backend

The `./backend` directory contains a full serverless with the following dependencies:

1. Serverless framework
2. DynamoDB for database
3. S3 for photo storages
4. Authentification with Auth0


### Frontend

The `./frontend` directory contains a complete express frontend to consume the data from the backend, developed with Webpack.
The `./frontend` was developed by reusing components developed in past Nanodegrees that I realized like: `Front-End Developer Nanodegree` and `Intermediate Javascript Nanodegree`


## Getting Started

First clone this github project: `git clone https://github.com/edrondsal/recipe-capstone-project-nanodegree.git`

Go to the front-end folder: `cd frontend`

Install dependencies: `npm install`

Then run webpack to create the distribution files: `npm run build-dev`

Finally start the express server: `npm run start`

Now the web app is available in the localhost:  `localhost:3000`

## Redploying Serverless backend

If you whish to redeploy the serverless backend:

Go to the front-end folder: `cd backend`

Install dependencies: `npm install`

deploy using serverless: `serverless deploy -v`




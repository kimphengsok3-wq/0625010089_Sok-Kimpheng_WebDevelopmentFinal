# Kimpheng Sok — Personal Portfolio Website

A full-stack personal portfolio website built for the Web Development Final Assessment at CamTech University.

**Live site:** _(add your deployed URL here after Phase 8)_
**Author:** Kimpheng Sok — Software Engineering, Year II, CamTech University

## Overview

This project showcases my skills, education, and 3 projects as a software engineering
student. It includes a working contact form and full CRUD (Create, Read, Update, Delete)
functionality for managing project data, backed by a real database.

## Tech Stack

- **Frontend:** React, Vite, CSS3
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas)
- **Deployment:** AWS

## Project Structure

```
├── Portfolio/    → React frontend
└── server/       → Express backend (REST API)
```

## Features

- Responsive design (desktop, tablet, mobile)
- About, Skills, Projects, Education, and Contact sections
- Projects are stored in MongoDB and fetched through a REST API
- Full CRUD support for projects (create, view, edit, delete)
- Contact form messages are saved to the database

## Running Locally

**1. Backend**
```
cd server
npm install
```
Create a `.env` file inside `server/` with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Then run:
```
npm start
```

**2. Frontend**
```
cd Portfolio
npm install
```
Create a `.env` file inside `Portfolio/` with:
```
VITE_API_URL=http://localhost:5000/api
```
Then run:
```
npm run dev
```

## API Endpoints

| Method | Endpoint             | Description             |
|--------|-----------------------|--------------------------|
| GET    | /api/projects          | Get all projects        |
| GET    | /api/projects/:id      | Get a single project    |
| POST   | /api/projects          | Create a new project    |
| PUT    | /api/projects/:id      | Update a project        |
| DELETE | /api/projects/:id      | Delete a project        |
| POST   | /api/contact           | Submit a contact message|

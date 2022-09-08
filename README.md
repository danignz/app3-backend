# Project's name REST API

## Description

This is a the backend repository for the React application `app's name`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:

```bash
npm install
```

## Scripts

- To start the project run:

```bash
npm run start
```

- To start the project in development mode, run:

```bash
npm run dev
```

- To seed the database, run:

```bash
npm run seed
```

---

## User stories (MVP)

- User can sign up and create and account
- User can login and log out
- When user access to the platform will discover a community of collaborators and tech projects

## User stories (Backlog)

- Members of a project can communicate by chat
- Platform users can write a review of a project

## Models

### User

Users in the database have the following properties:

```js
{
  "fullName": String,
  "email": String,
  "hashedPassword": String
}
```

---

## API endpoints and usage

| Action                      | Method   | Endpoint              | Req.body                      | Private/Public |
| ----------------------------| ---------| ----------------------| ----------------------------- | -------------- |
| SIGN UP user                | POST     | /api/v1/auth/signup   | { fullName, email, password } | Public         |
| LOG IN user                 | POST     | /api/v1/auth/login    | { email, password }           | Public         |
| GET logged in user          | GET      | /api/v1/auth/me       |                               | Private        |
|                             |          |                       |                               |                | 
| GET all projects            | GET      | /api/v1/projects      |                               | Private        |
| GET a single project        | GET      | /api/v1/projects/id   |                               | Private        |
| CREATE a project            | POST     | /api/v1/projects      | { }                           | Private        |
| DELETE a single project     | DELETE   | /api/v1/projects/id   |                               | Private        |
| UPDATE a single project     | PUT      | /api/v1/projects/id   | { }                           | Private        |
---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

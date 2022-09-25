# Iron Co-Workers REST API

## Description

This is a the backend repository for the React application Iron Co-Workers.

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
- User can edit their profile
- When user access to the platform will discover a community of collaborators and tech projects
- User can search and filter projects in recruiting or finished state
- User can check de details of a project
- User can create a project, becoming the team leader
- A team lead can update, delete and close their projects
- When a project is closed, it is added to the portfolio of all participants
- A normal user (known as a collaborator) can search for projects to enroll
- Collaborator can submit requests to be accepted into the project
- User and team lead can manage the requests through a board
- Team lead can accept or deny requests
- If the team lead accepts the request, the collaborator will be part of the team
- User can check their portfolio and also check the portfolio of the rest members

## User stories (Backlog)

- Members of a project can communicate by chat
- Platform users can write a review of a project

## Models

### User

Users in the database have the following properties:

```js
 {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required."],
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662751695/app3-project/profilepictures/profiledefault_c7ofd5.png",
    },
    profession: {
      type: String,
      enum: ["Web Developer", "UX/UI Designer", "Data Analyst", "Cybersecurity Analyst"],
      required: [true, "Profession is required"],
    },
    location: {
      type: String,
      enum: ["Amsterdam", "Barcelona", "Berlin", "Lisbon", "London", "Madrid", "Mexico City", "Miami", "Paris", "São Paulo", "Remote"],
      required: [true, "Location is required"],
    },
    headLine: {
      type: String,
    },
    about: {
      type: String,
    },
    contactInfo: {
      type: String,
    },
```

### Project

Projects in the database have the following properties:

```js
  {
    collaborators: [
      {
        rol: {
          type: String,
          enum: [
            "Web Developer",
            "UX/UI Designer",
            "Data Analyst",
            "Cybersecurity Analyst",
          ],
          required: [true, "Rol is required"],
        },
        quantity: {
          type: Number,
          default: 0,
        },
        users: {
          type: [Schema.Types.ObjectId],
          ref: "User",
        },
        _id: false,
      },
    ],
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    projectImage: {
      type: String,
      default: "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663150913/app3-project/projectspictures/defaultproject_zojuvf.png",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    projectUrl: {
      type: String,
    },
    onCampus: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },

```

### Request

Requests in the database have the following properties:

```js
 {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: ["Pending", "Denied", "Accepted"],
      default: "Pending",
    },
  },
```

### Review

Reviews in the database have the following properties:

```js
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
    },
    comment: {
      type: String,
    },
    puntuation: {
      type: Number,
      default: 0,
    },
  },
```

---

## API endpoints and usage

| Action                       | Method | Endpoint                     | Req.body                      | Access  |
| -----------------------------| ------ | -----------------------------| ----------------------------- | ------- |
| SIGN UP user                 | POST   | /api/v1/auth/signup          | { fullName, email, etc. }     | Public  |
| LOG IN user                  | POST   | /api/v1/auth/login           | { email, password }           | Public  |
| UPLOAD to Cloudinary userImg | POST   | /api/v1/auth/signup-upload   | form-file: { profileImage }   | Public  |
| GET logged in user           | GET    | /api/v1/auth/me              |                               | Private |
|                              |        |                              |                               |         |
| UPDATE user                  | PUT    | /api/v1/users/edit           | { fullName, email, etc. }     | Private |
| GET user enumValues          | GET    | /api/v1/users/enum-values    |                               | Public  |
| UPLOAD to Cloudinary userImg | POST   | /api/v1/users/edit-upload    | form-file: { profileImage }   | Private |
| GET fullData logged in user  | GET    | /api/v1/users/logged-in-user |                               | Private |
| GET single user              | GET    | /api/v1/users/id             |                               | Private |
|                              |        |                              |                               |         |
| GET all projects             | GET    | /api/v1/projects             |                               | Private |
| GET a single project         | GET    | /api/v1/projects/id          |                               | Private |
| CREATE a project             | POST   | /api/v1/projects             | { name, projectImage, etc. }  | Private |
| UPDATE a single project      | PUT    | /api/v1/projects/id          | { name, projectImage, etc. }  | Private |
| DELETE a single project      | DELETE | /api/v1/projects/id          |                               | Private |
| UPLOAD to Cloudinary projImg | POST   | /api/v1/projects/img-upload  | form-file: { projectImage }   | Private |
|                              |        |                              |                               |         |
| GET all requests             | GET    | /api/v1/requests             |                               | Private |
| GET a single request         | GET    | /api/v1/requests/id          |                               | Private |
| CREATE a request             | POST   | /api/v1/requests             |                               | Private |
| UPDATE a single request      | PUT    | /api/v1/requests/id          | { status }                    | Private |
| DELETE a single request      | DELETE | /api/v1/requests/id          |                               | Private |
|                              |        |                              |                               |         |
| GET all reviews              | GET    | /api/v1/reviews              |                               | Private |
| GET a single review          | GET    | /api/v1/reviews/id           |                               | Private |
| CREATE a review              | POST   | /api/v1/reviews              | { title, comment, puntuation }| Private |
| UPDATE a single review       | PUT    | /api/v1/reviews/id           | { title, comment, puntuation }| Private |
| DELETE a single review       | DELETE | /api/v1/reviews/id           |                               | Private |
---

## Useful links

- [Presentation slides](https://slides.com/danielgnz/iron-co-workers)
- [Frontend repository](https://github.com/danignz/app3-frontend)
- [Frontend deploy](https://iron-co-workers.netlify.app)
- [Deployed REST API](https://iron-co-workers.herokuapp.com/)

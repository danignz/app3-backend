require('dotenv').config();
const mongoose = require('mongoose');

const User = require("../models/User");

const users = [
  {
    email: "george1972@gmail.com",
    hashedPassword: "Ir0nHack5863",
    fullName: "George Ford",
    profileImage: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    profession: "Web Developer",
    location: "London",
    headLine: "Full Stack Web Developer\n[ JavaScript, HTML, CSS & Mongo, Express, React, Node ]",
    about: "Social, enthusiastic & curious Software Engineer with a love for moderating conversation & connecting people. As an Engineer, I always strive to keep learning and pushing myself in different areas (technical and non-technical), whether it's taking ownership of a project or hosting Lunch & Learn sessions.\n\nAs a former pro-athlete, I thrive with a challenge and never stop improving my skills. I'm passionate about a smooth design to development process and enjoy working with multiple tech stacks as well as being in creative sessions.\n\nChanged the course of my career from science to tech, realized I want to work creatively and in a fast-changing innovative environment.",
    contactInfo: "https://www.linkedin.com/in/georgeford\nhttps://twitter.com/gford88\nhttps://www.youtube.com/c/GeorgeFord",
    role: "user"
  },
  {
    email: "olgaadams@gmail.com",
    hashedPassword: "Ir0nHack5863",
    fullName: "Olga Adams",
    profileImage: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    profession: "UX/UI Designer",
    location: "Amsterdam",
    headLine: "Experience Designer at Tribal Worldwide Amsterdam",
    about: "I’m a Amsterdam-based UX designer with a passion for all aspects of design. I love to learn, improve, teach and refine to achieve the ultimate productive workflow.\n\nMy expertise lies in discovery, research & analysis, customer problem definition, design and build. Following a tried and tested proven path to producing beautiful, simple, thoughtful digital products that people need and find desirable. In doing so, I have been fortunate to work for some great companies from music agencies to ad tech leaders.",
    contactInfo: "https://www.linkedin.com/in/olgaadams\nhttps://twitter.com/olgaadams546",
    role: "user"
  },
  {
    email: "renatagomes@gmail.com",
    hashedPassword: "Ir0nHack5863",
    fullName: "Renata Gomes",
    profileImage: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Azure Data Integration Support Engineer",
    about: "I am a Data Analyst and Tech Project Manager at NASK (National Research Institute), with experience in other roles such as Trainer, Content Creator, and Webinar Facilitator. Last year’s Master’s Programme graduate in Artificial Intelligence and Deep Learning. Fully fluent in English, Spanish, Portuguese.\n\nSkills:\n- Azure Data Factory\n- Azure Synapse\n- Python\n- SQL\n- Tableau",
    contactInfo: "https://instagram.com/renatagomes\nhttps://www.linkedin.com/in/renatagomes\nhttps://twitter.com/renatagomes8",
    role: "user"
  },
  {
    email: "peterdubois@gmail.com",
    hashedPassword: "Ir0nHack5863",
    fullName: "Peter Dubois",
    profileImage: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    profession: "Cybersecurity Analyst",
    location: "Paris",
    headLine: "Cyber Security Analyst at Deloitte",
    about: "Cyber Security Analyst in the area of Application Security with experience in the management consulting industry.\n\nSkilled in Web Development technologies such as PHP, Java, Python and Javascript. My focus has been on performing risk assessment of the weakness in the applications and helping development teams implement Shift-left security policies.",
    contactInfo: "https://www.peterdubois.com\nhttps://www.linkedin.com/in/peterdubois\nhttps://twitter.com/peterdubois54",
    role: "user"
  },
]

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return User.insertMany(users);
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

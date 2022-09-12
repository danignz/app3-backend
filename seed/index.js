require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Project = require("../models/Project");
const Request = require("../models/Request");
const Review = require("../models/Review");

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("Ironhack1234", salt);

const users = [
  {
    email: "george1972@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "George Ford",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971302/app3-project/profilepictures/man1_b7lr4o.jpg",
    profession: "Web Developer",
    location: "London",
    headLine:
      "Full Stack Web Developer\n[ JavaScript, HTML, CSS & Mongo, Express, React, Node ]",
    about:
      "Social, enthusiastic & curious Software Engineer with a love for moderating conversation & connecting people. As an Engineer, I always strive to keep learning and pushing myself in different areas (technical and non-technical), whether it's taking ownership of a project or hosting Lunch & Learn sessions.\n\nAs a former pro-athlete, I thrive with a challenge and never stop improving my skills. I'm passionate about a smooth design to development process and enjoy working with multiple tech stacks as well as being in creative sessions.\n\nChanged the course of my career from science to tech, realized I want to work creatively and in a fast-changing innovative environment.",
    contactInfo:
      "https://www.linkedin.com/in/georgeford\nhttps://twitter.com/gford88\nhttps://www.youtube.com/c/GeorgeFord",
    role: "user",
  },
  {
    email: "christopher12@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Christopher Space",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971302/app3-project/profilepictures/man2_movpst.jpg",
    profession: "Web Developer",
    location: "Barcelona",
    headLine:
      "Front End Developer\n[ JavaScript, HTML, CSS & Mongo, Express, React, Node ]",
    about:
      "As a lifelong learner and creatively-inclined person, I have always had an interest in photography, web applications, and video editing. After high school, I decided to pursue those hobbies and enrolled in Miami-Dade’s Graphic Internet Technology program, where I learned to create materials for multimedia and web applications. There I developed an interest in creating web applications myself, and recently completed Ironhack’s 9 week boot camp to further develop my skills.\nTechnical Skills: ​JavaScript, React.js, Express.js, MongoDB, Node.js, HTML, CSS, SASS, AJAX, jQuery, Responsive Design, Bootstrap, Git, GitHub, WordPress.",
    contactInfo:
      "https://www.linkedin.com/in/christopher12\nhttps://twitter.com/christopher12\nhttps://www.youtube.com/c/ChristopherSpace",
    role: "user",
  },
  {
    email: "robertmitchell@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Robert Mitchell",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971300/app3-project/profilepictures/man3_ka8cjw.jpg",
    profession: "Web Developer",
    location: "Barcelona",
    headLine:
      "Experienced front end engineer and mobile developer based in Barcelona",
    about:
      "Passionate front-end developer with 10 years of experience designing and programming web applications, with a strong background in Agile Development with SCRUM.\nSpecialized in frontend development with solid knowledge of JavaScript, HTML5, CSS3, React JS, React Native, Electron and User Experience Design as well as comprehensive experience in back-end development mainly using PHP; with know-how of open source tools to develop on GNU/Linux environments.",
    contactInfo:
      "https://www.linkedin.com/in/robertmitchell\nhttps://twitter.com/robertmitchell\nhttps://www.youtube.com/c/RobertMitchell",
    role: "user",
  },
  {
    email: "markapple@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Mark Apple",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971300/app3-project/profilepictures/man4_kb4khy.jpg",
    profession: "Web Developer",
    location: "Madrid",
    headLine: "Frontend and Mobile developer",
    about:
      "Passion for open-source software, writing quality, scalable, semantic, accessible code. I'm a self-starter with great time management skills and the ability to adapt to changes quickly. Experience in agile methodology and working remotely.\n I value working in a team with other developers and can communicate complex ideas to non-tech clients. I love learning and experimenting with new technologies but never neglect the fundamentals. Passion for great UI/UX and building intuitive experiences.",
    contactInfo:
      "https://www.linkedin.com/in/markapple\nhttps://twitter.com/markapple12\nhttps://www.youtube.com/c/MarkApple",
    role: "user",
  },
  {
    email: "simongarner@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Simon Garner",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971300/app3-project/profilepictures/man5_vt9ll0.jpg",
    profession: "Web Developer",
    location: "Madrid",
    headLine:
      "Computer Science Engineer | Frontend Developer | Web Accessibility",
    about:
      "I am a Front End Developer with experience building and maintaining websites in the E-commerce industry. I have professional experience working with WordPress and Shopify. I also have experience working with the following technologies: HTML, CSS, JavaScript, SASS and Bootstrap.",
    contactInfo:
      "https://www.linkedin.com/in/simongarner\nhttps://twitter.com/simongarner\nhttps://www.youtube.com/c/SimonGarner",
    role: "user",
  },
  {
    email: "mariameyer@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Maria Meyer",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman1_mtnsj7.jpg",
    profession: "UX/UI Designer",
    location: "Berlin",
    headLine:
      "UX/UI Designer Profile, Graphic Designer\n- Sketch, Figma, Adobe Creative Suite, HTML & CSS",
    about:
      "Currently, I’m focusing on becoming a better Designer.\n\nI would like to expand my knowledge in the UX/UI field, collaborate with professional, lovely people, and find a safe, honest, work environment where I can feel that my job is meaningful.\n\nI like projects where the process begins with finding out user needs and solving their problems with good solutions. I hope I can improve my ability with these skills in a group environment.",
    contactInfo:
      "https://www.mariameyer.com\nhttps://www.linkedin.com/in/mariameyer\nhttps://twitter.com/mariameyer",
    role: "user",
  },
  {
    email: "olgaadams@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Olga Adams",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman2_ktus4j.jpg",
    profession: "UX/UI Designer",
    location: "Amsterdam",
    headLine: "Experience Designer at Tribal Worldwide Amsterdam",
    about:
      "I’m a Amsterdam-based UX designer with a passion for all aspects of design. I love to learn, improve, teach and refine to achieve the ultimate productive workflow.\n\nMy expertise lies in discovery, research & analysis, customer problem definition, design and build. Following a tried and tested proven path to producing beautiful, simple, thoughtful digital products that people need and find desirable. In doing so, I have been fortunate to work for some great companies from music agencies to ad tech leaders.",
    contactInfo:
      "https://www.linkedin.com/in/olgaadams\nhttps://twitter.com/olgaadams546",
    role: "user",
  },
  {
    email: "erikowen@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Erik Owen",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971300/app3-project/profilepictures/man6_bexb7l.jpg",
    profession: "UX/UI Designer",
    location: "Madrid",
    headLine: "UX Designer | UI Designer | Product Designer",
    about:
      "My training and experience has been related to hospitality, the management and organization of tourism enterprises, marketing, market and consumer research among others. It was always clear to me that I wanted to be a significant agent that had a relationship with the client and their satisfaction, so I decided to direct my path towards UX / UI design. This background enriches my vision when designing, and is the basis of all the projects I work on.",
    contactInfo:
      "https://www.linkedin.com/in/erikowen\nhttps://twitter.com/erikowen",
    role: "user",
  },
  {
    email: "emmamclaren@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Emma Mclaren",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman3_pjm5up.jpg",
    profession: "UX/UI Designer",
    location: "Madrid",
    headLine: "UX/UI designer at High Sky Tech",
    about:
      "After working in the audiovisual industry in Spain for several years I started my degree in History out of an interest to know the origin of culture topics. Once I finished my degree, I worked in a videogame studio, where I became interested in user experience design for first time. Because of this, I did the UX/UI bootcamp at Ironhack. Now I have deepened my knowledge in UX writing, design thinking and user psychology while I also open have consolidated my skills in graphic design, interface design and branding.\nI'm also interested in videogames, board games, RPG's and gamification, as well as any field that would integrate those passions with UX design would be perfect for me.",
    contactInfo:
      "https://www.linkedin.com/in/emmamclaren\nhttps://twitter.com/emmamclaren",
    role: "user",
  },
  {
    email: "selenerojas@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Selene Rojas",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman4_mhjlbb.jpg",
    profession: "UX/UI Designer",
    location: "Barcelona",
    headLine: "UX/UI Product Designer",
    about:
      "My experience has led me to carry out both internal and consulting projects with very different characteristics (for finance, health and electricity companies) and with very different objectives as well, but in all cases it has been necessary to redesign the entire UX and improve the UI (or directly make the UI new starting with the Design System)\nDue to this variety and complexity of the projects, it has been able to grow in many UX/UI environments early, organizing roadmaps, coordinating the needs with the client, presenting the work done...",
    contactInfo:
      "https://www.linkedin.com/in/selenerojas\nhttps://twitter.com/selenerojas",
    role: "user",
  },
  {
    email: "renatagomes@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Renata Gomes",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman5_yydrgt.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Azure Data Integration Support Engineer",
    about:
      "I am a Data Analyst and Tech Project Manager at NASK (National Research Institute), with experience in other roles such as Trainer, Content Creator, and Webinar Facilitator. Last year’s Master’s Programme graduate in Artificial Intelligence and Deep Learning. Fully fluent in English, Spanish, Portuguese.\n\nSkills:\n- Azure Data Factory\n- Azure Synapse\n- Python\n- SQL\n- Tableau",
    contactInfo:
      "https://instagram.com/renatagomes\nhttps://www.linkedin.com/in/renatagomes\nhttps://twitter.com/renatagomes8",
    role: "user",
  },
  {
    email: "joaooliveira@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Joao Oliveira",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971300/app3-project/profilepictures/man7_heak7i.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Data Analyst | Data Science | Electrical Engineer",
    about:
      "Ambitious and passionate professional with thirst for new knowledge. Organized, creative, hardworking, and highly motivated individual. Able to interact with people in a constructive, inventive, and professional manner. Proactive with strong leadership and relationship-building skills. Broad industry experience includes Data management, Healthcare, Research and Teaching.",
    contactInfo:
      "https://instagram.com/joaooliveira\nhttps://www.linkedin.com/in/joaooliveira\nhttps://twitter.com/joaooliveira",
    role: "user",
  },
  {
    email: "isabelmarques@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Isabel Marques",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman6_ymn0x4.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Corporate Data Office | Data Delivery Lead",
    about:
      "My interests are devoted to economics and more recently to data science.\n\nI am very curious about economics and the society in general since I was in high school. When I started my master's degree I started to care a lot about data. I am very eager to be data supported in my thinking but I do acknowledge that information is limited and that a correct decision about the methods to employ or the interpretation of the data are skills to master.",
    contactInfo:
      "https://instagram.com/isabelmarques\nhttps://www.linkedin.com/in/isabelmarques\nhttps://twitter.com/isabelmarques",
    role: "user",
  },
  {
    email: "mariawilliams@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Maria Williams",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman7_mgg0gd.jpg",
    profession: "Data Analyst",
    location: "London",
    headLine: "Data Analyst | Python, SQL, Tableau, Machine Learning",
    about:
      "Passionate about Business inteligence transforming data into insights to improve decisions. Focused on my goals and where I want to reach personally and professionally.\n\nI have a Degree on Computer Science and Business Management and I'm currently on a Data Analytics bootcamp which I managed to win a scholarship through hard work and self initiative. I believe that in this fast growing industry the most important thing to have is to be able to adapt to different languages and tools which are constantly changing.",
    contactInfo:
      "https://instagram.com/mariawilliams\nhttps://www.linkedin.com/in/mariawilliams\nhttps://twitter.com/mariawilliams",
    role: "user",
  },
  {
    email: "danielswodinan@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Daniel Swodinan",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971300/app3-project/profilepictures/man8_dfg6zn.jpg",
    profession: "Data Analyst",
    location: "London",
    headLine: "Area Product Onwer & Data Analyst at Meta",
    about:
      "I focus my work towards the achievement of an objective and effective work. My allies are: organization, responsibility, proactivity, persistency and communication.\n\nI am a challenge driven person, who’s keen on evolving, acquire new knowledge, and passionate by my work.\n\nI consider that I have a good team spirit, as I feel cooperating with others is always a time for sharing knowledge and help each other.",
    contactInfo:
      "https://instagram.com/danielswodinan\nhttps://www.linkedin.com/in/danielswodinan\nhttps://twitter.com/danielswodinan",
    role: "user",
  },
  {
    email: "peterdubois@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Peter Dubois",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man9_nboauh.jpg",
    profession: "Cybersecurity Analyst",
    location: "Paris",
    headLine: "Cyber Security Analyst at Deloitte",
    about:
      "Cyber Security Analyst in the area of Application Security with experience in the management consulting industry.\n\nSkilled in Web Development technologies such as PHP, Java, Python and Javascript. My focus has been on performing risk assessment of the weakness in the applications and helping development teams implement Shift-left security policies.",
    contactInfo:
      "https://www.peterdubois.com\nhttps://www.linkedin.com/in/peterdubois\nhttps://twitter.com/peterdubois54",
    role: "user",
  },
  {
    email: "ristolourani@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Risto Lourani",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man10_qdauda.jpg",
    profession: "Cybersecurity Analyst",
    location: "Barcelona",
    headLine: "Cyber Security Senior Consultant",
    about:
      "For the last few years I've been working intensively in the IT world, performing all kind of system, network and hardware projects. Cybersecurity is the last stage and the one that hook.js me up.\nIf I had to choose between money and learning. No doubt. I choose learning. Period.\nMindmaps freak, EDR Evasion learner, C2 soft lover and red teamer wannabe. btw 0x90 after work.\nLove challenges, team work, and I can't stop until I understand to the last bit of information about everything I do.\nRecently I have started working on soft skills.\nCommunication, active listening and precise words are key in teamwork.",
    contactInfo:
      "https://www.ristolourani.com\nhttps://www.linkedin.com/in/ristolourani\nhttps://twitter.com/ristolourani23",
    role: "user",
  },
  {
    email: "alexandragoutini@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Alexandra Goutini",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman8_jhzotw.jpg",
    profession: "Cybersecurity Analyst",
    location: "Berlin",
    headLine: "Cyber Security Detection Engineer at Philips Healthineers",
    about:
      "Thanks to the university I work in a methodical and organized way, with a great sense of responsibility and always attending to my obligations.\n\nI also have a great capacity for self-improvement; when I solve a problem, I keep studying it to find better results and things to learn from. I believe that the ability to improve is one of the most important qualities for any worker.\n\nMy aspirations are to become a great professional in the cybersecurity field and to never stop growing and learning. In the future, I hope to turn my hobby into my job.",
    contactInfo:
      "https://www.alexandragoutini.com\nhttps://www.linkedin.com/in/alexandragoutini\nhttps://twitter.com/alexandragoutini45",
    role: "user",
  },
  {
    email: "camilaluengo@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Camila Luengo",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman9_xkol1b.jpg",
    profession: "Cybersecurity Analyst",
    location: "Barcelona",
    headLine: "Cyber Security Analyst & Incident Response",
    about:
      "Every day, I protect sensitive information on thousands of people from hackers and cyberattacks to prevent cybercrimes and ensure the security of information systems.\n\nMy responsibilities are preventing data loss, assessing risks, training employees on network security issues, developing network recovery plans, recommending new security technologies, and minimizing service interruptions. I also have technical expertise, attention to details, problem solving orientation, good communication abilities, organization and teamwork. I stay updated on the latest trends in information security to not only keep where I work safe but also on the cutting edge.",
    contactInfo:
      "https://www.camilaluengo.com\nhttps://www.linkedin.com/in/camilaluengo\nhttps://twitter.com/camilaluengo45",
    role: "user",
  },
  {
    email: "michaelacolorado@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Michaela Colorado",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971327/app3-project/profilepictures/woman10_t5kyni.jpg",
    profession: "Cybersecurity Analyst",
    location: "Lisbon",
    headLine: "Cyber Security Analyst & Incident Response",
    about:
      "Ever since I was a child, I have been interested in the cyberspace field. Upon graduating in IT at Faculty of Sciences of the University of Lisbon I found the information security area to be thrillingly stimulating, captivating and a very good fit not only for my skills but also my interests. Furthermore, during my minor at Lisbon School of Economics & Management, I found that there is a strong interpendency between technology and management where the challenges of each overlap the other.\n\nIt is in this combination of technology and management where I can contribute the most, as I have the academic background and hard skills of a tech professional in addition to the interpersonal and communication skills required to thrive in a business environments.",
    contactInfo:
      "https://www.michaelacolorado.com\nhttps://www.linkedin.com/in/michaelacolorado\nhttps://twitter.com/michaelacolorado",
    role: "user",
  },
];

let allUsersID, allProjectsID;

mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => console.log(`Connected to ${x.connection.name}`))
  /* Clean all collections */
  .then(() => {
    return Review.deleteMany();
  })
  .then(() => {
    return Request.deleteMany();
  })
  .then(() => {
    return Project.deleteMany();
  })
  .then(() => {
    return User.deleteMany();
  })
  .then(() => {
    return User.insertMany(users);
  })
  .then((allUsers) => {
    allUsersID = allUsers.map((user) => {
      return user._id;
    });

    const projects = [
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 3,
            users: [allUsersID[1], allUsersID[2]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[5]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[11]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 3,
            users: [allUsersID[17]],
          },
        ],
        leader: allUsersID[0],
        name: "Food Ordering App",
        projectImage: "http://www.defaultImage.com",
        startDate: "2022-11-15",
        endDate: "2023-03-15",
        description:
          "The customer app helps the customer to access the online food ordering platforms, search for the right restaurant or the dish they want to order, place their orders and pay easily. There are many features you can implement in the app to make it easy and exciting to use.\n\n-Features: \n1. Push Notifications in On-Demand Food Ordering App\n2. Discount/Rewards, Cashback and Loyalty Programs\n3. Real-Time GPS Tracking of Food Delivery\n4. Social Media Integration",
        projectUrl: "https://food-order-app-nil.herokuapp.com/",
        onCampus: false,
        likes: 0,
        status: "Open",
      },
    ];
    return Project.insertMany(projects);
  })
  .then((allProjects) => {
    allProjectsID = allProjects.map((project) => {
      return project._id;
    });

    const requests = [
      {
        user: allUsersID[3],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[4],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[5],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[6],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[7],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[8],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[9],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[10],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[12],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[13],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[14],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[16],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[17],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[18],
        project: allProjectsID[0],
        status: "Pending",
      },
      {
        user: allUsersID[19],
        project: allProjectsID[0],
        status: "Denied",
      },
      {
        user: allUsersID[20],
        project: allProjectsID[0],
        status: "Accepted",
      },
    ];

    return Request.insertMany(requests);
  })
  .then(() => {
    const reviews = [
      {
        user: allUsersID[7],
        project: allProjectsID[0],
        title: "Very inspiring project",
        comment:
          "This project has inspired me to solve a problem with the user interface and reorder the main screen in my personal project.",
        puntuation: 5,
      },
      {
        user: allUsersID[14],
        project: allProjectsID[0],
        title: "Very good App, although with possible improvements",
        comment:
          "It would be nice to add an option so that users could chat with each other.",
        puntuation: 4,
      },
    ];

    return Review.insertMany(reviews);
  })
  .then(() => {
    console.log("Seed done 🌱");
  })
  .catch((e) => console.log(e))
  .finally(() => {
    console.log("Closing connection");
    mongoose.connection.close();
  });

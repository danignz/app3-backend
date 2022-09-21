require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Project = require("../models/Project");
const Request = require("../models/Request");
const Review = require("../models/Review");

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("test", salt);

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
      "https://www.linkedin.com/in/georgeford,https://twitter.com/gford88,https://www.youtube.com/c/GeorgeFord",
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
      "https://www.linkedin.com/in/christopher12,https://twitter.com/christopher12,https://www.youtube.com/c/ChristopherSpace",
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
      "https://www.linkedin.com/in/robertmitchell,https://twitter.com/robertmitchell,https://www.youtube.com/c/RobertMitchell",
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
      "https://www.linkedin.com/in/markapple,https://twitter.com/markapple12,https://www.youtube.com/c/MarkApple",
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
      "https://www.linkedin.com/in/simongarner,https://twitter.com/simongarner,https://www.youtube.com/c/SimonGarner",
  },
  {
    email: "williamscook@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Williams Cook",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man11_p5bsmc.jpg",
    profession: "Web Developer",
    location: "London",
    headLine:
      "Full Stack Web Developer\n[ JavaScript, HTML, CSS & Mongo, Express, React, Node ]",
    about:
      "Social, enthusiastic & curious Software Engineer with a love for moderating conversation & connecting people. As an Engineer, I always strive to keep learning and pushing myself in different areas (technical and non-technical), whether it's taking ownership of a project or hosting Lunch & Learn sessions.\n\nAs a former pro-athlete, I thrive with a challenge and never stop improving my skills. I'm passionate about a smooth design to development process and enjoy working with multiple tech stacks as well as being in creative sessions.\n\nChanged the course of my career from science to tech, realized I want to work creatively and in a fast-changing innovative environment.",
    contactInfo:
      "https://www.linkedin.com/in/williamscook,https://twitter.com/williamscook,https://www.youtube.com/c/WilliamsCook",
  },
  {
    email: "jonesbyrne@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Jones Byrne",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man12_mjiczh.jpg",
    profession: "Web Developer",
    location: "Barcelona",
    headLine:
      "Front End Developer\n[ JavaScript, HTML, CSS & Mongo, Express, React, Node ]",
    about:
      "As a lifelong learner and creatively-inclined person, I have always had an interest in photography, web applications, and video editing. After high school, I decided to pursue those hobbies and enrolled in Miami-Dade’s Graphic Internet Technology program, where I learned to create materials for multimedia and web applications. There I developed an interest in creating web applications myself, and recently completed Ironhack’s 9 week boot camp to further develop my skills.\nTechnical Skills: ​JavaScript, React.js, Express.js, MongoDB, Node.js, HTML, CSS, SASS, AJAX, jQuery, Responsive Design, Bootstrap, Git, GitHub, WordPress.",
    contactInfo:
      "https://www.linkedin.com/in/jonesbyrne,https://twitter.com/jonesbyrne,https://www.youtube.com/c/jonesbyrne",
  },
  {
    email: "daviesmiller@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Davies Miller",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man13_dnjqgk.jpg",
    profession: "Web Developer",
    location: "Barcelona",
    headLine:
      "Experienced front end engineer and mobile developer based in Barcelona",
    about:
      "Passionate front-end developer with 10 years of experience designing and programming web applications, with a strong background in Agile Development with SCRUM.\nSpecialized in frontend development with solid knowledge of JavaScript, HTML5, CSS3, React JS, React Native, Electron and User Experience Design as well as comprehensive experience in back-end development mainly using PHP; with know-how of open source tools to develop on GNU/Linux environments.",
    contactInfo:
      "https://www.linkedin.com/in/daviesmiller,https://twitter.com/daviesmiller,https://www.youtube.com/c/daviesmiller",
  },
  {
    email: "martinlee@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Martin Lee",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man14_rhisig.jpg",
    profession: "Web Developer",
    location: "Madrid",
    headLine: "Frontend and Mobile developer",
    about:
      "Passion for open-source software, writing quality, scalable, semantic, accessible code. I'm a self-starter with great time management skills and the ability to adapt to changes quickly. Experience in agile methodology and working remotely.\n I value working in a team with other developers and can communicate complex ideas to non-tech clients. I love learning and experimenting with new technologies but never neglect the fundamentals. Passion for great UI/UX and building intuitive experiences.",
    contactInfo:
      "https://www.linkedin.com/in/martinlee,https://twitter.com/martinlee,https://www.youtube.com/c/martinlee",
  },
  {
    email: "peteranderson@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Peter Anderson",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man15_lqzhfm.jpg",
    profession: "Web Developer",
    location: "Madrid",
    headLine:
      "Computer Science Engineer | Frontend Developer | Web Accessibility",
    about:
      "I am a Front End Developer with experience building and maintaining websites in the E-commerce industry. I have professional experience working with WordPress and Shopify. I also have experience working with the following technologies: HTML, CSS, JavaScript, SASS and Bootstrap.",
    contactInfo:
      "https://www.linkedin.com/in/peteranderson,https://twitter.com/peteranderson,https://www.youtube.com/c/peteranderson",
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
      "https://www.mariameyer.com,https://www.linkedin.com/in/mariameyer,https://twitter.com/mariameyer",
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
      "https://www.linkedin.com/in/olgaadams,https://twitter.com/olgaadams546",
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
      "https://www.linkedin.com/in/erikowen,https://twitter.com/erikowen",
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
      "https://www.linkedin.com/in/emmamclaren,https://twitter.com/emmamclaren",
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
      "https://www.linkedin.com/in/selenerojas,https://twitter.com/selenerojas",
  },
  {
    email: "daniellenormandia@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Danielle Normandia",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971328/app3-project/profilepictures/woman11_hvdse2.jpg",
    profession: "UX/UI Designer",
    location: "Berlin",
    headLine:
      "UX/UI Designer Profile, Graphic Designer\n- Sketch, Figma, Adobe Creative Suite, HTML & CSS",
    about:
      "Currently, I’m focusing on becoming a better Designer.\n\nI would like to expand my knowledge in the UX/UI field, collaborate with professional, lovely people, and find a safe, honest, work environment where I can feel that my job is meaningful.\n\nI like projects where the process begins with finding out user needs and solving their problems with good solutions. I hope I can improve my ability with these skills in a group environment.",
    contactInfo:
      "https://www.daniellenormandia.com,https://www.linkedin.com/in/daniellenormandia,https://twitter.com/daniellenormandia",
  },
  {
    email: "alissaallen@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Alissa Allen",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971326/app3-project/profilepictures/woman12_fbq4ml.jpg",
    profession: "UX/UI Designer",
    location: "Amsterdam",
    headLine: "Experience Designer at Tribal Worldwide Amsterdam",
    about:
      "I’m a Amsterdam-based UX designer with a passion for all aspects of design. I love to learn, improve, teach and refine to achieve the ultimate productive workflow.\n\nMy expertise lies in discovery, research & analysis, customer problem definition, design and build. Following a tried and tested proven path to producing beautiful, simple, thoughtful digital products that people need and find desirable. In doing so, I have been fortunate to work for some great companies from music agencies to ad tech leaders.",
    contactInfo:
      "https://www.linkedin.com/in/alissaallen,https://twitter.com/alissaallen",
  },
  {
    email: "mathiusstolhem@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Mathius Stolhem",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man16_ytyikn.jpg",
    profession: "UX/UI Designer",
    location: "Madrid",
    headLine: "UX Designer | UI Designer | Product Designer",
    about:
      "My training and experience has been related to hospitality, the management and organization of tourism enterprises, marketing, market and consumer research among others. It was always clear to me that I wanted to be a significant agent that had a relationship with the client and their satisfaction, so I decided to direct my path towards UX / UI design. This background enriches my vision when designing, and is the basis of all the projects I work on.",
    contactInfo:
      "https://www.linkedin.com/in/mathiusstolhem,https://twitter.com/mathiusstolhem",
  },
  {
    email: "clarawimblem@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Clara Wimblem",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971325/app3-project/profilepictures/woman13_nkanob.jpg",
    profession: "UX/UI Designer",
    location: "Madrid",
    headLine: "UX/UI designer at High Sky Tech",
    about:
      "After working in the audiovisual industry in Spain for several years I started my degree in History out of an interest to know the origin of culture topics. Once I finished my degree, I worked in a videogame studio, where I became interested in user experience design for first time. Because of this, I did the UX/UI bootcamp at Ironhack. Now I have deepened my knowledge in UX writing, design thinking and user psychology while I also open have consolidated my skills in graphic design, interface design and branding.\nI'm also interested in videogames, board games, RPG's and gamification, as well as any field that would integrate those passions with UX design would be perfect for me.",
    contactInfo:
      "https://www.linkedin.com/in/clarawimblem,https://twitter.com/clarawimblem",
  },
  {
    email: "sarayfrias@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Saray Frias",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971325/app3-project/profilepictures/woman14_nuh79n.jpg",
    profession: "UX/UI Designer",
    location: "Barcelona",
    headLine: "UX/UI Product Designer",
    about:
      "My experience has led me to carry out both internal and consulting projects with very different characteristics (for finance, health and electricity companies) and with very different objectives as well, but in all cases it has been necessary to redesign the entire UX and improve the UI (or directly make the UI new starting with the Design System)\nDue to this variety and complexity of the projects, it has been able to grow in many UX/UI environments early, organizing roadmaps, coordinating the needs with the client, presenting the work done...",
    contactInfo:
      "https://www.linkedin.com/in/sarayfrias,https://twitter.com/sarayfrias",
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
      "https://instagram.com/renatagomes,https://www.linkedin.com/in/renatagomes,https://twitter.com/renatagomes8",
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
      "https://instagram.com/joaooliveira,https://www.linkedin.com/in/joaooliveira,https://twitter.com/joaooliveira",
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
      "https://instagram.com/isabelmarques,https://www.linkedin.com/in/isabelmarques,https://twitter.com/isabelmarques",
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
      "https://instagram.com/mariawilliams,https://www.linkedin.com/in/mariawilliams,https://twitter.com/mariawilliams",
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
      "https://instagram.com/danielswodinan,https://www.linkedin.com/in/danielswodinan,https://twitter.com/danielswodinan",
  },
  {
    email: "alexaperez@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Alexa Perez",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971325/app3-project/profilepictures/woman15_rnfued.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Azure Data Integration Support Engineer",
    about:
      "I am a Data Analyst and Tech Project Manager at NASK (National Research Institute), with experience in other roles such as Trainer, Content Creator, and Webinar Facilitator. Last year’s Master’s Programme graduate in Artificial Intelligence and Deep Learning. Fully fluent in English, Spanish, Portuguese.\n\nSkills:\n- Azure Data Factory\n- Azure Synapse\n- Python\n- SQL\n- Tableau",
    contactInfo:
      "https://instagram.com/alexaperez,https://www.linkedin.com/in/alexaperez,https://twitter.com/alexaperez",
  },
  {
    email: "manelpelayo@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Manel Pelayo",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man17_rzzmov.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Data Analyst | Data Science | Electrical Engineer",
    about:
      "Ambitious and passionate professional with thirst for new knowledge. Organized, creative, hardworking, and highly motivated individual. Able to interact with people in a constructive, inventive, and professional manner. Proactive with strong leadership and relationship-building skills. Broad industry experience includes Data management, Healthcare, Research and Teaching.",
    contactInfo:
      "https://instagram.com/manelpelayo,https://www.linkedin.com/in/manelpelayo,https://twitter.com/manelpelayo",
  },
  {
    email: "martahuerta@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Marta Huerta",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971325/app3-project/profilepictures/woman16_hjvba5.jpg",
    profession: "Data Analyst",
    location: "Lisbon",
    headLine: "Corporate Data Office | Data Delivery Lead",
    about:
      "My interests are devoted to economics and more recently to data science.\n\nI am very curious about economics and the society in general since I was in high school. When I started my master's degree I started to care a lot about data. I am very eager to be data supported in my thinking but I do acknowledge that information is limited and that a correct decision about the methods to employ or the interpretation of the data are skills to master.",
    contactInfo:
      "https://instagram.com/martahuerta,https://www.linkedin.com/in/martahuerta,https://twitter.com/martahuerta",
  },
  {
    email: "soniawilson@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Sonia Wilson",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971325/app3-project/profilepictures/woman17_nfuhsq.jpg",
    profession: "Data Analyst",
    location: "London",
    headLine: "Data Analyst | Python, SQL, Tableau, Machine Learning",
    about:
      "Passionate about Business inteligence transforming data into insights to improve decisions. Focused on my goals and where I want to reach personally and professionally.\n\nI have a Degree on Computer Science and Business Management and I'm currently on a Data Analytics bootcamp which I managed to win a scholarship through hard work and self initiative. I believe that in this fast growing industry the most important thing to have is to be able to adapt to different languages and tools which are constantly changing.",
    contactInfo:
      "https://instagram.com/soniawilson,https://www.linkedin.com/in/soniawilson,https://twitter.com/soniawilson",
  },
  {
    email: "germansans@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "German Sans",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man18_pza2st.jpg",
    profession: "Data Analyst",
    location: "London",
    headLine: "Area Product Onwer & Data Analyst at Meta",
    about:
      "I focus my work towards the achievement of an objective and effective work. My allies are: organization, responsibility, proactivity, persistency and communication.\n\nI am a challenge driven person, who’s keen on evolving, acquire new knowledge, and passionate by my work.\n\nI consider that I have a good team spirit, as I feel cooperating with others is always a time for sharing knowledge and help each other.",
    contactInfo:
      "https://instagram.com/germansans,https://www.linkedin.com/in/germansans,https://twitter.com/germansans",
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
      "https://www.peterdubois.com,https://www.linkedin.com/in/peterdubois,https://twitter.com/peterdubois54",
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
      "https://www.ristolourani.com,https://www.linkedin.com/in/ristolourani,https://twitter.com/ristolourani23",
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
      "https://www.alexandragoutini.com,https://www.linkedin.com/in/alexandragoutini,https://twitter.com/alexandragoutini45",
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
      "https://www.camilaluengo.com,https://www.linkedin.com/in/camilaluengo,https://twitter.com/camilaluengo45",
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
      "https://www.michaelacolorado.com,https://www.linkedin.com/in/michaelacolorado,https://twitter.com/michaelacolorado",
  },
  {
    email: "maneldubois@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Manel Dubois",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man19_bxatfh.jpg",
    profession: "Cybersecurity Analyst",
    location: "Paris",
    headLine: "Cyber Security Analyst at Deloitte",
    about:
      "Cyber Security Analyst in the area of Application Security with experience in the management consulting industry.\n\nSkilled in Web Development technologies such as PHP, Java, Python and Javascript. My focus has been on performing risk assessment of the weakness in the applications and helping development teams implement Shift-left security policies.",
    contactInfo:
      "https://www.maneldubois.com,https://www.linkedin.com/in/maneldubois,https://twitter.com/maneldubois",
  },
  {
    email: "lazarocastillo@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Lazaro Castillo",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971301/app3-project/profilepictures/man20_zwmytn.jpg",
    profession: "Cybersecurity Analyst",
    location: "Barcelona",
    headLine: "Cyber Security Senior Consultant",
    about:
      "For the last few years I've been working intensively in the IT world, performing all kind of system, network and hardware projects. Cybersecurity is the last stage and the one that hook.js me up.\nIf I had to choose between money and learning. No doubt. I choose learning. Period.\nMindmaps freak, EDR Evasion learner, C2 soft lover and red teamer wannabe. btw 0x90 after work.\nLove challenges, team work, and I can't stop until I understand to the last bit of information about everything I do.\nRecently I have started working on soft skills.\nCommunication, active listening and precise words are key in teamwork.",
    contactInfo:
      "https://www.lazarocastillo.com,https://www.linkedin.com/in/lazarocastillo,https://twitter.com/lazarocastillo",
  },
  {
    email: "aleluna@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Ale Luna",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971326/app3-project/profilepictures/woman18_rwlpqw.jpg",
    profession: "Cybersecurity Analyst",
    location: "Berlin",
    headLine: "Cyber Security Detection Engineer at Philips Healthineers",
    about:
      "Thanks to the university I work in a methodical and organized way, with a great sense of responsibility and always attending to my obligations.\n\nI also have a great capacity for self-improvement; when I solve a problem, I keep studying it to find better results and things to learn from. I believe that the ability to improve is one of the most important qualities for any worker.\n\nMy aspirations are to become a great professional in the cybersecurity field and to never stop growing and learning. In the future, I hope to turn my hobby into my job.",
    contactInfo:
      "https://www.aleluna.com,https://www.linkedin.com/in/aleluna,https://twitter.com/aleluna",
  },
  {
    email: "juanadoe@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Juana Doe",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971326/app3-project/profilepictures/woman19_aisr6n.jpg",
    profession: "Cybersecurity Analyst",
    location: "Barcelona",
    headLine: "Cyber Security Analyst & Incident Response",
    about:
      "Every day, I protect sensitive information on thousands of people from hackers and cyberattacks to prevent cybercrimes and ensure the security of information systems.\n\nMy responsibilities are preventing data loss, assessing risks, training employees on network security issues, developing network recovery plans, recommending new security technologies, and minimizing service interruptions. I also have technical expertise, attention to details, problem solving orientation, good communication abilities, organization and teamwork. I stay updated on the latest trends in information security to not only keep where I work safe but also on the cutting edge.",
    contactInfo:
      "https://www.juanadoe.com,https://www.linkedin.com/in/juanadoe,https://twitter.com/juanadoe",
  },
  {
    email: "cristinagallargo@ironhack.com",
    hashedPassword: hashedPassword,
    fullName: "Cristina Gallargo",
    profileImage:
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662971326/app3-project/profilepictures/woman20_acdlh6.jpg",
    profession: "Cybersecurity Analyst",
    location: "Lisbon",
    headLine: "Cyber Security Analyst & Incident Response",
    about:
      "Ever since I was a child, I have been interested in the cyberspace field. Upon graduating in IT at Faculty of Sciences of the University of Lisbon I found the information security area to be thrillingly stimulating, captivating and a very good fit not only for my skills but also my interests. Furthermore, during my minor at Lisbon School of Economics & Management, I found that there is a strong interpendency between technology and management where the challenges of each overlap the other.\n\nIt is in this combination of technology and management where I can contribute the most, as I have the academic background and hard skills of a tech professional in addition to the interpersonal and communication skills required to thrive in a business environments.",
    contactInfo:
      "https://www.cristinagallargo.com,https://www.linkedin.com/in/cristinagallargo,https://twitter.com/cristinagallargo",
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
            users: [allUsersID[10], allUsersID[11], allUsersID[12]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[20]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 3,
            users: [allUsersID[30], allUsersID[31]],
          },
        ],
        leader: allUsersID[0],
        name: "Order Meal Delivery",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663760566/app3-project/projectspictures/0project_ooc0vo.png",
        startDate: "2022-11-15",
        endDate: "2023-06-15",
        description:
          "The customer app helps the customer to access the online food ordering platforms, search for the right restaurant or the dish they want to order, place their orders and pay easily. There are many features you can implement in the app to make it easy and exciting to use.\n\n-Features: \n1. Push Notifications in On-Demand Food Ordering App\n2. Discount/Rewards, Cashback and Loyalty Programs\n3. Real-Time GPS Tracking of Food Delivery\n4. Social Media Integration",
        projectUrl: "https:/www.meal-ordering.com/",
        onCampus: "No",
        status: "Open",
      },
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 2,
            users: [allUsersID[5], allUsersID[6]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[13], allUsersID[15], allUsersID[19]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[20], allUsersID[21]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 1,
            users: [allUsersID[39]],
          },
        ],
        leader: allUsersID[4],
        name: "Flava Music Events",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663148354/app3-project/projectspictures/1project_vmbme8.jpg",
        startDate: "2022-12-11",
        endDate: "2023-04-05",
        description:
          "This project was born with the idea of developing a social network application for users who love live events. \nThe user will be able to access discounts, know the local concert calendar in his area, and will be able to create a community of users with the same musical predirections. \nThe app will be available for responsive web, tablet and mobile.\n- Characteristics:\nUsage of Responsive Designs\nIntegrating offline usage\nImplementing cross-platform usability\nAn app which loads quickly",
        projectUrl: "https://flava-music-events.herokuapp.com/",
        onCampus: "Yes",
        status: "Closed",
      },
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 3,
            users: [allUsersID[8], allUsersID[9]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[15], allUsersID[18]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[23]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 2,
            users: [allUsersID[38]],
          },
        ],
        leader: allUsersID[10],
        name: "Top AudioBooks App",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663149176/app3-project/projectspictures/2project_fcddj9.png",
        startDate: "2022-10-05",
        endDate: "2023-07-01",
        description:
          "This project was born with the idea of developing an application so that freelance book producers can sell their products directly to users without using a publisher.\n- User flow:\n1-You open the app where you register your credentials with the app.\n2-After the registration, the app will ask about the genres of books that you would like to read such as horror, self-help, history, etc.\n3-Post selection of genres you will be presented with the main screen upon which all the books are laid in front of you in the audio formats. There is a various section of audiobooks and voice tracks that you can choose from.\n4-Some of the books are free to listen to, however, you need to buy a subscription to unlock most of the audiobooks.",
        projectUrl: "http:/www.top-audioBooks-app.com",
        onCampus: "Yes",
        status: "Open",
      },
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 3,
            users: [allUsersID[5], allUsersID[7], allUsersID[9]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[15], allUsersID[17], allUsersID[19]],
          },
          {
            rol: "Data Analyst",
            quantity: 3,
            users: [allUsersID[25], allUsersID[27], allUsersID[29]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 3,
            users: [allUsersID[35], allUsersID[37], allUsersID[39]],
          },
        ],
        leader: allUsersID[24],
        name: "My finances in my pocket",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663590982/app3-project/projectspictures/3project_ogsokn.jpg",
        startDate: "2022-11-21",
        endDate: "2023-06-15",
        description:
          "Let’s be honest! We all want to live in a world where our finances are managed judiciously and our money is being saved automatically. Earlier people used complex accounting systems, today’s world is way more simple because a finance app can save the day. Why worry when there is an app for everything?\n\n-Key financial app features:\n1.  Account integration\n2.  Security\n3.  Real time spending and tracking\n4.  Simplicity\n5.  Alerts and notifications",
        projectUrl: "https://my-finances-in-my-pocket.herokuapp.com/",
        onCampus: "No",
        status: "Closed",
      },
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 3,
            users: [allUsersID[3], allUsersID[9]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[14], allUsersID[16], allUsersID[18]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[23]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 2,
            users: [allUsersID[36]],
          },
        ],
        leader: allUsersID[31],
        name: "Hey Ya App!",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663761186/app3-project/projectspictures/4project_vimrdz.png",
        startDate: "2022-12-21",
        endDate: "2023-11-30",
        description:
          "Mobile app to connect individuals and social events.\n Hey Ya's is one of the hybrid event apps that centers around helping attendees customize their experience around personal preferences. Event attendees can log into their app before their event so that they can get a headstart on networking, one of the most important aspects of attending an event.\nHey Ya’s event management includes a dedicated social media timeline for your event that allows for photo sharing, messaging, likes, comments, and personal profiles.",
        projectUrl: "https:/www.hey-ya.com/",
        onCampus: "No",
        status: "Open",
      },
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 2,
            users: [allUsersID[2], allUsersID[8]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[10], allUsersID[12], allUsersID[16]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[23], allUsersID[29]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 1,
            users: [allUsersID[33]],
          },
        ],
        leader: allUsersID[25],
        name: "Fruits App",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663764758/app3-project/projectspictures/5project_axpxyq.png",
        startDate: "2022-09-22",
        endDate: "2023-10-05",
        description:
          "The seasonal Fruits Guide App serves as a pocket guide to seasonal food wherever you are! Think of it as your farmers’ market cheat sheet!\n By using the app, you’ll have all of our seasonality data available to you, even when you’re without an internet connection. Plus, you can set reminders so you'll never miss your favorite seasonal food again!\n The app includes links to our online primer filled with fun facts, great recipes and environmental impact data for each type of food!",
        projectUrl: "https://fruits.herokuapp.com/",
        onCampus: "No",
        status: "Closed",
      },
      {
        collaborators: [
          {
            rol: "Web Developer",
            quantity: 3,
            users: [allUsersID[2], allUsersID[8]],
          },
          {
            rol: "UX/UI Designer",
            quantity: 3,
            users: [allUsersID[12], allUsersID[16]],
          },
          {
            rol: "Data Analyst",
            quantity: 2,
            users: [allUsersID[28]],
          },
          {
            rol: "Cybersecurity Analyst",
            quantity: 2,
            users: [allUsersID[37]],
          },
        ],
        leader: allUsersID[17],
        name: "Finversity",
        projectImage:
          "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663764764/app3-project/projectspictures/6project_lbdkb5.png",
        startDate: "2023-03-01",
        endDate: "2024-07-01",
        description:
          "Let’s be honest! We all want to live in a world where our finances are managed judiciously and our money is being saved automatically. Earlier people used complex accounting systems, today’s world is way more simple because a finance app can save the day. Why worry when there is an app for everything?\n\n-Key financial app features:\n1.  Account integration\n2.  Security\n3.  Real time spending and tracking\n4.  Simplicity\n5.  Alerts and notifications",
        projectUrl: "http:/www.finversity-app.com",
        onCampus: "Yes",
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
      //Project 0
      {
        user: allUsersID[1],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[2],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[10],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[11],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[12],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[20],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[30],
        project: allProjectsID[0],
        status: "Accepted",
      },
      {
        user: allUsersID[31],
        project: allProjectsID[0],
        status: "Accepted",
      },
      //Project 1
      {
        user: allUsersID[5],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[6],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[13],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[15],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[19],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[20],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[21],
        project: allProjectsID[1],
        status: "Accepted",
      },
      {
        user: allUsersID[39],
        project: allProjectsID[1],
        status: "Accepted",
      },
      //Project 2
      {
        user: allUsersID[8],
        project: allProjectsID[2],
        status: "Accepted",
      },
      {
        user: allUsersID[9],
        project: allProjectsID[2],
        status: "Accepted",
      },
      {
        user: allUsersID[15],
        project: allProjectsID[2],
        status: "Accepted",
      },
      {
        user: allUsersID[18],
        project: allProjectsID[2],
        status: "Accepted",
      },
      {
        user: allUsersID[23],
        project: allProjectsID[2],
        status: "Accepted",
      },
      {
        user: allUsersID[38],
        project: allProjectsID[2],
        status: "Accepted",
      },
      //Project 3
      {
        user: allUsersID[5],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[7],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[9],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[15],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[17],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[19],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[25],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[27],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[29],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[35],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[37],
        project: allProjectsID[3],
        status: "Accepted",
      },
      {
        user: allUsersID[39],
        project: allProjectsID[3],
        status: "Accepted",
      },
      //Project 4
      {
        user: allUsersID[3],
        project: allProjectsID[4],
        status: "Accepted",
      },
      {
        user: allUsersID[9],
        project: allProjectsID[4],
        status: "Accepted",
      },
      {
        user: allUsersID[14],
        project: allProjectsID[4],
        status: "Accepted",
      },
      {
        user: allUsersID[16],
        project: allProjectsID[4],
        status: "Accepted",
      },
      {
        user: allUsersID[18],
        project: allProjectsID[4],
        status: "Accepted",
      },
      {
        user: allUsersID[23],
        project: allProjectsID[4],
        status: "Accepted",
      },
      {
        user: allUsersID[36],
        project: allProjectsID[4],
        status: "Accepted",
      },
      //Project 5
      {
        user: allUsersID[2],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[8],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[10],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[12],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[16],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[23],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[29],
        project: allProjectsID[5],
        status: "Accepted",
      },
      {
        user: allUsersID[33],
        project: allProjectsID[5],
        status: "Accepted",
      },
      //Project 5
      {
        user: allUsersID[2],
        project: allProjectsID[6],
        status: "Accepted",
      },
      {
        user: allUsersID[8],
        project: allProjectsID[6],
        status: "Accepted",
      },
      {
        user: allUsersID[12],
        project: allProjectsID[6],
        status: "Accepted",
      },
      {
        user: allUsersID[16],
        project: allProjectsID[6],
        status: "Accepted",
      },
      {
        user: allUsersID[28],
        project: allProjectsID[6],
        status: "Accepted",
      },
      {
        user: allUsersID[37],
        project: allProjectsID[6],
        status: "Accepted",
      },
    ];

    return Request.insertMany(requests);
  })
  .then(() => {
    const reviews = [
      {
        user: allUsersID[7],
        project: allProjectsID[1],
        title: "Very inspiring project",
        comment:
          "This project has inspired me to solve a problem with the user interface and reorder the main screen in my personal project.",
        puntuation: 5,
      },
      {
        user: allUsersID[14],
        project: allProjectsID[3],
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

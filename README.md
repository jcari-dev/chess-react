
<div align="center">

# PlayChess - React Frontend

----
⚠️ **Project Status: Sunsetted**  

This project is no longer actively maintained and the live deployment is no longer guaranteed to be functional.  

The repository remains available as a reference for features, architecture, and implementation details.  
----


# Legacy Site Here: https://jorgeschess.app/

👑 A dynamic, real-time chess experience for enthusiasts and strategists alike, powered by React and Django.

Play, strategize, and conquer. Are you ready to make your move?

[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](https://github.com/jcari-dev/chess-react/issues)
![GitHub last commit](https://img.shields.io/github/last-commit/jcari-dev/chess-react)
![GitHub stars](https://img.shields.io/github/stars/jcari-dev/chess-react?style=social)
![GitHub forks](https://img.shields.io/github/forks/jcari-dev/chess-react?style=social)

![image](https://github.com/jcari-dev/chess-react/assets/65676916/e91a5dfd-b1b8-475c-8e0d-d0f7f8d1c496)

</div>

## 🎯 Project Vision

PlayChess leverages the best of modern web technologies to bring you a seamless, real-time chess playing experience. With room-based multiplayer functionality, comprehensive move validation, and soon, AI-based opponents powered by Stockfish, PlayChess is more than just a game—it's my most technical personal project so far.

## 🚀 Features

- **Real-Time Multiplayer**: Create a room and challenge a friend or a foe with a unique URL.
- **Move Validation**: Ensures all moves adhere to official chess rules, with visual aids.
- **Move Scoring / Practice Mode**: If enabled uses the Stockfish engine to calculate the "goodness" of each move and provide a visual aid to indicate it.
    - ![image](https://github.com/jcari-dev/chess-react/assets/65676916/d70840e1-c8c2-4adc-9434-6bd237753317)
    - White Knight on G1 being selected and showing scores of possibles moves.

- **AI Opponents**: Practice your skills against AI with varying difficulty levels, powered by the formidable Stockfish engine.
    - Current difficulties:
    - ![image](https://github.com/jcari-dev/chess-react/assets/65676916/56d78074-c3e5-4cfb-832f-a3d41bb0cd27)

- **User registration**: Via OAuth and the supported social media connections! 
- **Match History**: Allows you to track your specific match history and display some match data.
    - ![image](https://github.com/jcari-dev/chess-react/assets/65676916/462a4892-1eb5-452b-9a96-7fd3138caad1)



## ✨ Demo

<div align="center">

### [Live Demo](https://chess-9a6ec.web.app/) 

**Playing against myself on localhost!**
![ezgif-3-58f2e31fe9](https://github.com/jcari-dev/chess-react/assets/65676916/a6d6f79b-caef-499b-8b69-fbfb5b0c5dae)

### Move Scoring
![image](https://github.com/jcari-dev/chess-react/assets/65676916/74df2ed1-872b-4f74-b583-33e2f33e760b)

</div>


## 🛠 Built With

### Frontend
- **React** and **[Chakra UI](https://chakra-ui.com/)** come together to create a responsive and visually appealing interface. React's efficiency pairs perfectly with Chakra UI's component library for rapid UI development.

### Backend
- **Django** provides the robust backend framework needed for secure API endpoints, smooth room management, and reliable user authentication, all while facilitating quick development.

### Database
- **PostgreSQL** My choice for its robustness, handling complex game states and user data with efficiency and reliability, perfectly scaling with our application's growth, also very nice integration with Django.

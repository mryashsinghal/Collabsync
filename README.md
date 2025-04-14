# CollabSync

CollabSync is a real-time collaboration platform enabling students from different colleges to discover, connect, and work together on projects seamlessly. Built with the MERN stack, it offers advanced project management, real-time discussions, and smart user discovery features based on tech stack and college filters.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Features
- **OAuth & Secure Authentication**: Sign up or log in using Google OAuth and secure JWT-based authentication.
- **Project Collaboration**: Create projects, explore existing projects, and request to join teams.
- **Advanced Search & Filter**: Discover users or projects by tech stack, college, or keyword.
- **Real-time Discussions**: Engage in project-specific chatrooms to collaborate with team members.
- **User Dashboard**: Manage your created projects, joined projects, and profile.

### Admin Features
- **Manage Projects & Users**: Track, update, and manage project and user details for better platform integrity.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit, Headless UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **Real-time Communication**: Socket.io

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mryashsinghal/CollabSync.git
   cd CollabSync
   ```

2. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set environment variables:**

Create a `.env` file inside the `backend` directory with:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **Run the application:**
```bash
# Backend
cd backend
npm start

# Frontend
cd ../frontend
npm start
```

5. **Access the app:**
Visit `http://localhost:5173` for frontend and `http://localhost:5000` for backend.

## Usage

### User Flow
1. Sign up / Login with Google OAuth.
2. Create or explore projects.
3. Apply to join projects or accept requests.
4. Collaborate through real-time discussions.
5. Explore and connect with users based on tech stack & college filters.

## Contributing

Contributions are welcome!  

1. Fork the repository.
2. Create your branch:  
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:  
```bash
git commit -m 'Add feature'
```
4. Push and open a Pull Request.

## License

This project is licensed under the MIT License.

---
```

# Keeper

Keeper is a full-stack website built on the MERN stack, serving as a CRUD application for managing day-to-day tasks. The platform offers features like task creation, viewing, editing, updating, and deletion once logged in. Users can also modify their profile information and customize the website's theme from the settings tab.

## Features

* Normal login and signup functionality
* Google sign-in
* Light mode - dark mode settings
* Customizable theme colors and text colors
* Profile editing and updating

## Getting Started

### Installation

To install the project locally:
   * Clone the repository:
     ```bash
     git clone https://github.com/gdsabarna353/keeper25.git
      ```
   * Navigate to the project directory and install frontend dependencies:
      ```bash
      cd server
      npm install
      ```
   * Navigate to the 'server' directory and install backend dependencies:
      ```bash
      cd server
      npm install
      ```
### Usage

To run the project locally:
   * Navigate to the project directory:
     ```bash
     cd keeper25
     ```
   * Run the frontend:
      ```bash
      npm start
      ```
   * Open your browser and go to http://localhost:3000
   * Open another terminal, navigate to the 'server' directory:
      ```bash
      cd server
      ```
   * Run the backend:
      ```bash
      nodemon server
      ```
   * Open your browser and go to http://localhost:8000

## Demonstration

* Backend deployed at: https://keeper25-backend.onrender.com
* Frontend deployed at: https://keeper25-frontend.netlify.app

## Contributing

Contributions are welcome! Please follow these guidelines:

* Fork the repository
* Create a new branch for your feature/bugfix: `git checkout -b feature-name`
* Commit your changes: `git commit -m 'Add feature'`
* Push to the branch: `git push origin feature-name`
* Open a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

This project utilizes the following third-party code or libraries:

* Multer and Cloudinary for image uploading and hosting
* bcrypt for signup and login security
* Passport.js for Google sign-in authentication

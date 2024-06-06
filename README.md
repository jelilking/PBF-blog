# Peak Body Fitness Blog

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [File Structure](#file-structure)
7. [Contributing](#contributing)


## Project Overview

Peak Body Fitness Blog is a web application designed for fitness enthusiasts to share and view fitness-related posts. The platform includes user authentication, the ability to create posts, and admin functionality to manage users.

## Features

- User authentication (sign up, login, logout)
- Admin functionality to manage users and posts
- Create, read, and display posts with images
- Responsive design for various screen sizes

## Technologies Used

- HTML, CSS (Materialize CSS framework)
- JavaScript
- Firebase (Authentication, Firestore, Storage)

## Setup and Installation

### Prerequisites

- Firebase project created and configured

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/peak-body-fitness-blog.git
   cd peak-body-fitness-blog
   ```

2. Set up Firebase:

   - Go to the Firebase Console and create a new project.
   - Enable Authentication, Firestore, and Storage.
   - Replace the Firebase configuration in `auth.js` with your Firebase project credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };
     ```

3. Open the project directory and start a local server (e.g., using VS Code Live Server or any other method you prefer).

## Usage

1. **User Authentication:**
   - Sign up as a new user.
   - Login with your email and password.

2. **Creating a Post:**
   - Only logged-in users with admin privileges can create posts.
   - Click on "Create Post", fill in the details, and submit.

3. **Admin Actions:**
   - Admins can make other users admins by entering their email in the admin form.
   - Admins can see the "Create Post" option.

## File Structure

```
├── index.html
├── scripts
│   ├── auth.js
│   └── index.js
├── styles
│   └── main.css (if any additional custom CSS is used)
└── img
    └── logo (1).png
```

- **index.html:** Main HTML file with structure and layout.
- **scripts/auth.js:** Handles Firebase authentication and Firestore operations.
- **scripts/index.js:** Handles UI updates and post rendering.
- **styles/main.css:** Additional custom styles (if any).
- **img/logo (1).png:** Logo image for the navbar.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


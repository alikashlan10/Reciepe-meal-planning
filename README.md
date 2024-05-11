# Reciepe meal planning

This API allows users to manage recipes, including creating, updating, deleting, liking, and commenting on recipes. It also includes user authentication and user management features like registration, login, updating user details, and following/unfollowing other users.

## Installation

1. Clone the repository:
   git clone <repository_url>

2. Install dependencies:
    npm install


3. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the following variables:
  ```
  PORT=<port_number>
  MONGODB_URI=<mongodb_connection_string>
  JWT_SECRET=<your_jwt_secret>
  ```

4. Start the server:
    npm start


## Usage

### Authentication

- Authentication is required to access most endpoints.
- Obtain an authentication token by logging in or signing up.

### Endpoints

#### User Authentication and Management

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login an existing user.
- `GET /api/users`: Get all users.
- `GET /api/users/:username`: Get a specific user profile.
- `PUT /api/users/:username`: Update user details.
- `DELETE /api/users/:userId`: Delete a user.
- `POST /api/users/follow`: Follow a user.
- `POST /api/users/unfollow/:unfollowId`: Unfollow a user.

#### Recipe Management

- `POST /api/recipes`: Create a new recipe.
- `GET /api/recipes`: Get all recipes.
- `GET /api/recipes/:id`: Get a specific recipe by ID.
- `GET /api/recipes/search/:query`: Search for recipes.
- `PUT /api/recipes/:id`: Update a recipe.
- `DELETE /api/recipes/:id`: Delete a recipe.
- `POST /api/recipes/like/:id`: Like a recipe.
- `POST /api/recipes/comment/:id`: Comment on a recipe.

## Environment Variables

- `PORT`: Port number for the server.
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT token generation.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs


   
   

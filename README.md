# TODO GAME

## Description
TODO GAME will eventually be a way for parents to incentivize their children by setting todos worth points upon completion. Children will then be able to redeem their points for rewards that their parents have set.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Front-End](#front-end)
- [Back-End](#back-end)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Any other dependencies
- Docker

### Back-End Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/Hcran18/todoGame.git
    ```
2. Navigate to the back-end directory:
    ```sh
    cd todogame/backend
    ```
3. Set up environment variables:
    - Create a `.env` file in the root of the back-end directory.
    - Add the necessary environment variables (e.g., database connection strings, API keys).
    - Set the environemnt varibles using docker
4. Run the back-end server:
    ```sh
    docker network create todo-game-network
    ```
    ```sh
    cd todogame/backend
    ```
    ```sh
    docker build -t todo-game-backend .
    ```
    ```sh
    docker run --name todobackend -d --network todo-game-network -p 8000:8000 todo-game-backend
    ```
5. Run the back-end database:
    ```sh
    docker build
    ```
    ```sh
    docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb --network todo-game-network -d mysql:latest
    ```

### Front-End Setup
1. Navigate to the front-end directory:
    ```sh
    cd todogame/frontend/todogame
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run the front-end development server:
    ```sh
    npm run dev
    ```

## Usage
Once the both the back end and front end are running you can register a user and start adding and completing todos as well as add and purchase items.

## API Endpoints
List and describe the API endpoints provided by your back-end service.
- POST /register/{user_id}/{user_name}
- POST /login/{user_name}
- PUT /update-user/{user_id}/{user_name}/{given_points}
- POST /create-todo/{todo_id}/{user_id}/{new_todo}/{given_points}
- GET /get-todos/{user_id}
- PUT /update-todo/{todo_id}/{user_id}/{new_todo}/{given_points}
- POST /create-item/{item_id}/{user_id}/{new_item}/{given_cost}
- GET /get-items/{user_id}
- PUT /update-item/{item_id}/{user_id}/{new_item}/{given_cost}
- DELETE /complete-todo/{todo_id}
- DELETE /purchase-item/{user_id}/{item_id}

## Front-End
Basic React front end. Currently allows users to register, login, add and complete todo's, and add and purchase items.

## Back-End
Back end has been built using Python and FastAPI it connects to a MySQL database running in the same Docker Network.

## Contributing
Feel free to make a pull request to fix any bugs or add new features.
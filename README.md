# Protasker - Task Management Platform for Business

Protasker is a task management platform designed to streamline business operations by providing an easy-to-use system for managing tasks, assigning responsibilities, and tracking progress. It is suitable for various types of businesses including catering, home repairs, and cleaning services.

## Features

- **Task Management**: Create, assign, and track tasks for employees.
- **Task Status**: View and update task statuses, such as "New", "In Process", and "Completed".
- **User Roles**: Manage different user roles such as Manager and Employee.
- **Calendar**: Visualize task deadlines and schedules with a built-in calendar.
- **Notifications**: Receive real-time notifications for task updates.
- **Task Details**: Add descriptions, deadlines, and progress updates for each task.

## Installation

### Prerequisites

To run this project locally, you need:

- **Node.js** and **npm** (Node Package Manager) installed on your machine.
- **PostgreSQL** database setup.

### Step-by-Step Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/aidokkaa/protasker.git
    ```

2. Navigate to the project folder:

    ```bash
    cd platform
    ```

3. Install dependencies for both the client and server:

    - For the **server** (backend):

        ```bash
        cd server
        npm install
        ```

    - For the **client** (frontend):

        ```bash
        cd my-app
        npm install
        ```

4. Configure your environment variables:
    - Set up your `.env` file for the backend and make sure to configure your database connection details.
    - For the frontend, ensure that your API URL is correctly set to the backend server.

5. Run the application:
    - Start the **server**:

        ```bash
        cd server
        npm run dev
        ```

    - Start the **client**:

        ```bash
        cd my-app
        npm start
        ```

6. Open the app in your browser at `http://localhost:3000` for the frontend, and the server will be running on your configured port.

## Usage

1. **Manager**:
   - Assign tasks to employees.
   - View and update task status.
   - Track tasks in the calendar.

2. **Employee**:
   - View tasks assigned to them.
   - Update the status of tasks they work on.
   - Upload images and documents related to tasks.

## Technologies Used

- **Frontend**: React, SCSS, Context
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **State Management**: Context API
- **Calendar**: React Calendar

## Future Features

- Real-time task notifications using WebSockets.
- Integrating additional user roles and permissions.
- More advanced reporting and analytics.
- Improvement of adaptive code.
- Add even more features.

## Contributing

We welcome contributions to Protasker! Please feel free to submit issues, fork the repository, and create pull requests.

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or suggestions, feel free to reach out to the repository owner:

- **Author**: Aida Sabyrova
- **GitHub**: [aidokkaa](https://github.com/aidokkaa)


# 📝 BlogAppAPI

A scalable and efficient **Blog Application API** built with **TypeScript** and **Nest.js**, utilizing a microservices architecture for modularity and maintainability.

---

## 🚀 Features

- **Microservices Architecture**: Decoupled services for **API Gateway** and **Post Management**.
- **TypeScript**: Leveraging static typing for improved code quality.
- **Dockerized Deployment**: Simplified containerization using Docker and Docker Compose.
- **RESTful API**: Clean and intuitive endpoints for seamless client interactions.
- **Scalability**: Designed to handle growing amounts of work or an expanding user base.
- **User Authentication**: Secure login and registration with Google Oauth & JWT authentication.
-  **Post Management**: Create, read, update, and delete blog posts.
-  **Centralized Database Access**: Uses PostgreSQL via TypeORM.
-  **Docker Support**: Secure login  Google authentication.



---

## 🛠️ Prerequisites

Ensure you have the following installed:

- [**Node.js**](https://nodejs.org/) (v20 or later)
- [**Nest.js**](https://nestjs.org/) 
- [**npm**](https://www.npmjs.com/) or [**Yarn**](https://yarnpkg.com/)
- [**Docker**](https://www.docker.com/) & [**Docker Compose**](https://docs.docker.com/compose/)
- [**PostgreSQL**](https://www.docker.com/)

---

## 🔧 Installation

1️⃣ Clone the Repository
   ```bash
   git clone https://github.com/mahi9632/BlogAppAPI.git
   cd BlogAppAPI
   ```

2️⃣ Install Dependencies
  ```bash
   cd blog-api-gateway
   yarn install

   cd blog-post-service
   yarn install
  ```

3️⃣ Configure Environment Variables

  ```bash
   PORT=5000
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=yourpassword
   DATABASE_NAME=blogdb
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID= googleClientID
   GOOGLE_CLIENT_SECRET= GgoogleSecreteId
   GOOGLE_CALLBACK_URL= authcallback
  ```

▶️ Running the Application

  ```bash
   cd blog-api-gateway
   yarn start

   cd blog-post-service
   yarn start
  ```

🐳 Running with Docker

  ```bash
   docker-compose -f docker-compose.yml build

   cd blog-post-service
   yarn start
  ```



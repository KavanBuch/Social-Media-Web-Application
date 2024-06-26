# Social Media Web Application - **Instander**

Welcome to **Instander**, a web-based social media application that offers a comprehensive suite of functionalities, including posting, liking, commenting, chatting, viewing, and searching for posts, among others. This guide provides an overview of the application's key features.

---

## Features

### Registering and Logging In
Register and log in to the app with robust validations both on the frontend and backend to ensure a seamless user experience.

![Register Page](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/9617f3b9-10ec-45d4-8ba1-9c4d7eedec40)
<br>
![Login Page](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/af7928bc-b6c1-4df0-8a1d-53573e804444)

### Home Page
View all posts on the landing page. Features include creating, editing, and deleting posts you own.

<img alt="home2" src="https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/ade48cb1-e6dd-48fd-a9cb-f945755cd4bc">

<br>

### Post Details Page
Explore detailed posts, make comments, and discover recommended posts based on the current post.

![Post Details Page](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/b73348e9-2e64-42ff-8e63-f9039a43f0d2)
<br>

### Profile Page
Update and customize your profile to better represent yourself on the platform.

![Profile Page](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/4cf9cbe2-0c0e-4c3a-abc6-445ec5bc753e)
<br>

### Create Channel Page
Create chat channels using the usernames of the people you want to include.

![Create Channel Page](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/99486145-9116-49d2-af20-7487f56e4a97)
<br>

### Messenger
Utilize chat functionality, including direct messaging and support for emojis and attachments. It also shows status like who has seen messages, who is online and who is typing.

![Messenger](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/c8d41074-0c8f-46f0-8446-cbb0edae01dd)
<br>

### Search Posts Based on Title and Tags
Search for posts using titles and tags to easily find content relevant to your interests.

![Search Posts](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/d61b0eb7-0e84-461d-95bc-b72d2e82b0dd)

### Logout

![image](https://github.com/KavanBuch/Social-Media-Web-Application/assets/75678658/8d3f2c63-b284-4f97-a119-c694050c7331)



---

## To view the live project, see the deployed app in about section.

## To Run the Project Locally

### Server Setup
```
cd server
npm install
npm run dev
```

### Client Setup
```
cd client
npm install
npm run dev
```

## Running the Project with Docker

Use Docker to run the project if you do not have the necessary software dependencies installed locally. Docker provides an isolated and consistent environment, ensuring the application functions correctly regardless of local configurations. Below are the steps to set up both the server and the client:

1. **Pull the Docker Image**:
   Download the Docker image for the server from Docker Hub:
   ```
   docker pull kavan02/instander-api
   docker run -p 80:80 kavan02/instander-api
   ```
   Download the Docker image for the client from Docker Hub:
   ```
   docker pull kavan02/instander
   docker run -p 3000:3000 kavan02/instander
   ```
2. In both cases, create .env file in server and client and use your corresponding variables.

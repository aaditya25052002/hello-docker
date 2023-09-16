# Dockerizing a Simple Node.js "Hello World" App and Deploying it on Microsoft Azure with CI/CD

Hey there! 👋 In this super casual guide, we're going to learn how to take a simple JavaScript "Hello World" program, containerize it with Docker, and then deploy it to Microsoft Azure. Along the way, we'll even set up Continuous Integration and Continuous Deployment (CI/CD) for our app. Let's dive right in!

## Prerequisites

Before we begin, make sure you have the following tools installed:

- [Docker](https://www.docker.com/)
- [Microsoft Azure](https://azure.microsoft.com/)
- A code editor of your choice (e.g., Visual Studio Code)

## Step 1: Create the Node.js App

Create a directory for your project and inside it, create an `app.js` file with the following content:

```javascript
const http = require('http');
const port = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Docker\n');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

This is a simple Node.js HTTP server that responds with "Hello Docker" when accessed.

## Step 2: Dockerize the App

Next, we'll Dockerize our app so it can run in a container. Create a file named `Dockerfile` (no file extension) in the same directory as your `app.js` with the following content:

```Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port our app will run on
EXPOSE 80

# Define the command to run your app
CMD ["node", "app.js"]
```

This Dockerfile tells Docker how to build our container image. It uses the official Node.js image, sets the working directory, installs dependencies, exposes port 80, and specifies the command to run our app.

## Step 3: Build and Run the Docker Container

Now, let's build and run our Docker container locally:

```bash
# Build the Docker image (don't forget the dot at the end)
docker build -t hello-docker .

# Run the Docker container
docker run -p 80:80 hello-docker
```

Your app should now be running locally in a Docker container.

## Step 4: Deploy to Microsoft Azure

Now, let's deploy our Docker container to Microsoft Azure:

1. Sign in to your [Azure portal](https://portal.azure.com/).

2. Click on "Create a resource" and search for "Container Instances." Click on it.

3. Fill in the necessary details:
   - **Subscription**: Choose your subscription.
   - **Resource group**: Create a new or select an existing one.
   - **Container name**: Give your container a unique name.
   - **Region**: Choose a region.
   - **Image Source**: Docker Hub.
   - **Image and tag**: Enter the name of your Docker image (e.g., `hello-docker`) and tag (e.g., `latest`).

4. Click "Next" to review and create the container instance. Once created, you'll see a public IP address associated with your container instance.

## Step 5: Implement CI/CD in Azure

Now, let's set up CI/CD in Azure to automatically deploy changes to our app:

1. Go to your Azure DevOps organization or create one if you don't have it.

2. Create a new project and navigate to "Pipelines."

3. Click on "New pipeline" and follow the steps to connect your code repository (e.g., GitHub, Azure Repos, Bitbucket).

4. Choose your repository and configure the pipeline. You can use a starter pipeline or create one from scratch. Make sure to specify that you want to deploy to Azure Container Instances.

5. Trigger your pipeline manually or set up automatic triggers on code changes.

## Step 6: Modify Your App (CI/CD Test)

Finally, let's make a change to our app and test the CI/CD pipeline:

1. Open your `app.js` file and modify the response text to something like:

   ```javascript
   res.end('Hello Docker with CI/CD!\n');
   ```

2. Commit and push this change to your code repository.

3. Watch your Azure DevOps pipeline automatically build and deploy the updated Docker container to Azure Container Instances.

And there you have it! You've successfully Dockerized a Node.js app, deployed it to Microsoft Azure, and set up CI/CD to automate deployments. Keep making changes to your app and enjoy watching the CI/CD magic in action!

Feel free to reach out if you have any questions. Happy coding! 🚀

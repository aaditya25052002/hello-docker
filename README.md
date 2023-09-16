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

## Step 3: Build and Push the Docker Image to Azure Container Registry (ACR)

Now, let's build and push our Docker container image to Azure Container Registry:

1. **Create an Azure Container Registry (ACR)**:

   - Go to your Azure portal.
   - Click on "Create a resource" and search for "Container Registry." Click on it.
   - Fill in the necessary details to create your registry.

2. **Build and Push the Docker Image**:

   ```bash
   # Sign in to your Azure account
   az login

   # Set the name of your ACR (replace 'your-acr-name' with your registry's name)
   ACR_NAME=your-acr-name

   # Log in to your ACR
   az acr login --name $ACR_NAME

   # Build the Docker image (don't forget the dot at the end)
   docker build -t $ACR_NAME.azurecr.io/hello-docker .

   # Push the Docker image to ACR
   docker push $ACR_NAME.azurecr.io/hello-docker
   ```

## Step 4: Create an Azure Web App and Deploy the Docker Container

Now, let's create an Azure Web App and deploy our Docker container:

1. **Create an Azure Web App**:

   - Go to your Azure portal.
   - Click on "Create a resource" and search for "Web App." Click on it.
   - Fill in the necessary details, and under "Container," select "Docker Container." Choose your ACR and image (e.g., `hello-docker`).

2. **Configure Continuous Deployment**:

   - In the Azure Web App, go to "Deployment Center."
   - Choose your source control provider (e.g., GitHub, Azure Repos) and follow the prompts to set up CI/CD using webhooks.

## Step 5: Modify Your App (CI/CD Test)

Finally, let's make a change to our app and test the CI/CD pipeline:

1. Open your `app.js` file and modify the response text to something like:

   ```javascript
   res.end('Hello Docker with CI/CD!\n');
   ```

2. Commit and push this change to your code repository.

3. Watch your Azure DevOps pipeline automatically build and deploy the updated Docker container to Azure Web App.

And there you have it! You've successfully Dockerized a Node.js app, deployed it to Azure using Azure Container Registry, and set up CI/CD with webhooks for automatic deployments. Keep making changes to your app and enjoy watching the CI/CD magic in action!

Feel free to reach out if you have any questions. Happy coding! 🚀

# Description
Web application component for a multistep web form.

# Architecture
- Deployed as a Docker container, repo must also have a Docker file
- Choose a base image from verified publishers
- User interface is built as a React app
- Add a base path "/multistepform" to React application
- Ensure nginx conf is also correctly using the base path
- Use REST/JSON APIs to connect to the backend
- Use an environment variable for the API base url
- Backend API code is built in a separate repo

# Web Application Style
- Modern minimalistic and simple
- Use light pastel shades
- Use only shades of blue

# Steps
- Read the requirements in the file "SPECIFICATIONS.md"
- Write a "PLAN.md" or update it as needed
- Write the backend API specifications in the "API-SPEC.md"
- Use latest OpenAPI standards when writing the API specifications
- Write the code
- Check for errors
- Fix errors
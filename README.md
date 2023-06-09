# Chatbot-Response-Endpoint
This is a simple ML Deployment using Flask framework. Load the Universal Sentence Encoder module, which has been pre-trained on a large corpus of text. Also, To efficiently store chatbot data, save the pre-encoded responses in a JSON format. Define routes and associate them with specific functions that will handle incoming requests and provide responses. These endpoints will allow users to interact with our chatbot and utilize the search bar.

## Getting started
### Run Locally
#### Clone the project

```bash
  git clone https://github.com/C23-DF02-DiskusAI-Dicoding-Indonesia/Chatbot-Response-Endpoint.git
```
#### Go to the project directory

```bash
  cd chatbot
```

#### Install the Required Packages
 Don't forget to activate the virtual enviroment first before running this command
```bash
  pip Install -r requirement.txt
```
This will take a while because of the large size of Tensorflow

#### Start the server

```bash
  python app.py
```
if you can't run that command, try this:
```bash
  flask run
```
Open a web browser and visit http://localhost:5000 to access the main page of your app.

## Screenshots

<img src="/chatbot/static/images/chatbot.png"></img>



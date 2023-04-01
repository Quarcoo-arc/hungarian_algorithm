# Hungarian Method Algorithm API

## Backend Setup
These are the steps to follow in order to get the backend up and running

- Change into the backend folder with `cd backend`

- Create and activate your virtual environment. The virual environment can be created with `(python3 | python | py3) -m venv {name of your environment} `. Whether to use python3, python or py3 is dependent on the python version and operating system in use.
Activation of virtual environment is done by running
`source {name of virtual environment}/bin/activate` for linux, and `{name of virtual environment}\Script\activate` for windows.

- Install all dependencies with `pip install -r requirements.txt`

- Start the server with `python api/main.py`. Server will listen on port 8000 by default.

- Visit `127.0.0.1:8000/docs` to see the API documentation

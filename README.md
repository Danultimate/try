# Descubre Seller WebApp

## Setup

## Installation

It is required to run with SSL (the certificade is in the ssl folder)
* For development in chrome: `chrome://flags/#allow-insecure-localhost`. More info [here](https://stackoverflow.com/a/15076602).
* `git clone <repository-url>` this repository

### Frontend
_@this-repo/frontend_
* `npm install`

### Backend
_@this-repo_
* `python3 -m venv /path/to/new/virtual/environment`
* `sourcer /path/to/new/virtual/environment/bin/activate`
* `pip install -r requirements.txt`
* Create a postgress user called descubre without password
* `python setupdb.py`

## Running / Development

* For the backend run: `python run.py`
* For the frontend, go to /frontend and run: `ember s`

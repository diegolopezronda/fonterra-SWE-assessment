# Cream Cheese Fermentation Explorer

This repository contains documentation about the pH trajectory over the 
fermentation of cream cheese.

The code can be extended to any other ODE model though. 

Each folder has their own README.md file with more information about its purpose 
and contents.

## Requirements 

* [python](https://www.python.org/downloads/) >= 3.12
* Node.js 26.4.0
* NPM 11.17.0

## Quick Start

```bash
./install.sh
```
Will install dependencies and start the following services:

* Jupyter Lab
* MLFlow
* Milko API
* Milko Frontend

You can also configure the API with `api/.env.local` before running the install 
script. More information about the API configuration can be found in the 
[Milko API documentation](./api/README.md) file.

You can also configure the Frontend with `frontend/.env.local` before running 
the install script. More information about the Frontend configuration can be 
found in the [Milko Frontend documentation](./frontend/README.md) file.

## Applications
You can find more information about each application in their respective 
`README.md` files:

* [Jupyter Lab and MLFlow](./models/README.md) - For data exploration and model development.
* [Milko API](./api/README.md) - For serving the model as an API.
* [Milko Frontend](./frontend/README.md) - For visualizing the model predictions.

## Business process 
This is the business process covered by this repository.

![Model Development BPMN Diagram](./bpmn/model-development.png)

> Read the full documentation about the business process in the [bpmn/README.md](./bpmn/README.md) file.

## Watch the tutorial

[![Watch the video](https://img.youtube.com/vi/wemZK0fFXjc/maxresdefault.jpg)](https://www.youtube.com/watch?v=wemZK0fFXjc)
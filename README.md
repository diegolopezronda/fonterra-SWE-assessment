# Cream Cheese Fermentation Explorer

This repository contains documentation about the pH trajectory over the 
fermentation of cream cheese.

The code can be extended to any other ODE model though. 

Each folder has their own README.md file with more information about its purpose 
and contents.

## Business process 
This is the business process covered by this repository.

![Model Development BPMN Diagram](./bpmn/model-development.png)

> Read the full documentation about the business process in the [bpmn/README.md](./bpmn/README.md) file.

## Requirements 

* [python](https://www.python.org/downloads/) >= 3.12

## Installation

Please run:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Applications 
You can enable applications on the terminal and visit them on your browser.

### Jupyter Lab
The contents of the `models` folder can be explored and executed using Jupyter 
Lab. To enable it, please run:

```bash
jupyter lab
```
Jupyter lab will be available at [http://localhost:8888/lab](http://localhost:8888/lab). 
Then you can navigate to the `models/cream_cheese_fermentation` folder and explore 
the different notebooks and files.

> More information about Jupyter Lab can be found [here](https://jupyter.org/).

### MLFlow
MLFlow is used to deploy the model and make it available for consumption. 
To enable it, please run:

```bash
mlflow ui
```
MLFlow will be available at [http://localhost:5000](http://localhost:5000) and 
the `mflow` folder will be used to store the models and their metadata.

#### Registering a model
The `/models/cream_cheese_fermentation/cream_cheese_fermentation_registry.ipynb` 
notebook contains the code to register a model in MLFlow. Please make sure that MLFlow is running before executing the notebook.

#### Publish a model
After registering a model in MLFlow, it can published to the MLFlow REST API, with 
the following command:

```bash
cd mlflow # from the root of the repo
MODEL_NAME="Cream_Cheese_Fermentation" # Your model name
PORT=8001 # The port to serve the model
VERSION_NUMBER=latest # The version number of the model to serve (can be a specific version number or "latest")
mlflow models serve -m "models:/$MODEL_NAME/$VERSION_NUMBER" --port $PORT --env-manager local
``` 
example (Cream Cheese Fermentation model):

```bash
mlflow models serve -m "models:/Cream_Cheese_Fermentation/latest" --port 8001 --env-manager local
```
#### Consuming a model
A published model can be consumed at `http://127.0.0.1:8001/invocations` (or 
the port you specified) using a POST request a payload.

Example (Cream Cheese Fermentation model):

```bash
curl -X POST http://127.0.0.1:8001/invocations \
     -H "Content-Type: application/json" \
     -d '{
       "dataframe_records": [
         {
           "y0": [10000000.0, 0.00001],
           "t_start": 0.0,
           "t_end": 12,
           "t_steps": 1000
         }
       ],
       "params": {
         "c1": 5,
         "c2": 12,
         "mu": 1.0,
         "q": -16
       }
     }'
```
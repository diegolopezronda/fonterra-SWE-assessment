# Models
This folder contains the model definitions for the project.

## Dependencies

* Python 3.12.0

## Installation

Deactivate any existing python virtual environment:

```bash
deactivate 
```

Setup a new virtual environment and install the dependencies:

```bash
cd models
python3 -m venv .venv --prompt "Milko Models"
source .venv/bin/activate
pip install -r requirements.txt
```

Start Jupyter Lab:

```bash
./start_jupyter.sh
```

You may be able to stop Jupyter later with:

```bash
./stop_jupyter.sh
```

Start MLFlow:

```bash
./start_mlflow.sh
```

You may be able to stop MLFlow later with:

```bash
./stop_mlflow.sh
```

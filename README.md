# Cream Cheese Fermentation Explorer

This repository contains documentation about the pH trajectory over the 
fermentation of cream cheese.

A python notebook is include to explore the system of equations that describe 
the fermentation process.

## Requirements 

* [python](https://www.python.org/downloads/) >= 3.12

## Installation

Please run:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Usage 
The model is implemented in the `integration.ipynb` notebook, which can be run 
using Jupyter Notebook or Jupyter Lab. To start the notebook server, run:

```bash
jupyter lab
```
The jupyter will be available at `http://localhost:8888` in your web browser. 
Once there, open the `integration.ipynb` notebook, and choose the kernel 
`Fonterra SWE` (it should be chosen automatically though).

>Learn more about how to use Jupyter Notebook Lab in their [official documentation](https://docs.jupyter.org/en/latest/).
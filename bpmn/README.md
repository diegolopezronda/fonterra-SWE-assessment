# Business Process

The suite of services and applications distributed in this repository are
designed to be used around a business process. This document describes that
business process in detail.

## Process Overview

![Model Development BPMN Diagram](model-development.png)

> This picture represents a BPMN 2.0 diagram. More information about how to read
> it can be found [here](https://camunda.com/bpmn/reference/).

## Process participants

### Roles

- **Scientist**: Senior expert. Able to come up with formulae, strong
  mathematical and scientific background. Able to code Jupyter notebooks, but
  struggling with any other higher programming requirement.
- **Data/AI Engineer**: Facilitates the deployment of the model and ensures that
  the model is production-ready. Has a strong background in data engineering and
  machine learning, and is able to work with the scientist to understand the
  model and its requirements.
- **Biochemical (BCh.) Engineer**: Process expert. They are at the forefront of the
  process and have a deep understanding of the biochemical processes involved.
  They work closely with the scientist to ensure that the model is accurate and
  reflects the real-world process. Has null background in programming, but is
  able to understand the model and its requirements.
- **Software (SW) Engineer**: Facilitates the deployment of all the software
  infrastructure and ensures that the parts of the system work cohesively. They
  are able to support any member of the team in order to improve the overall
  process.

### Systems

- **Jupyter Lab**: The main system used by the scientist to develop the model.
  It is a web-based interactive development environment that allows the
  scientist to write and execute code, visualize data, and document their work.
- **MLFlow**: The main system used by the data/AI engineer to deploy the model. It
  is an open-source platform that allows the data/AI engineer to manage the
  entire machine learning lifecycle, including experimentation, reproducibility,
  and deployment. In the process it's destructured into three main components:
  - _Python MLFlow_: The main component used by the data/AI engineer to register
    the model.
  - _MLFlow CLI_: A command-line interface for interacting with MLFlow. Used to
    publish the model to the MLFlow API.
  - _MLFlow API_: The main component used by the software engineer to deploy the
    model. It is a REST API that allows the software engineer to interact with
    MLFlow and deploy the model to production.
- **Milko**: The company application to consume the model. It is divided into 
  two main components:
  - _Milko Web_: The main component used by the biochemical engineer to interact
    with the model. It is a web application that allows the biochemical engineer 
    to explore different scenarios and visualize the results.
  - _Milko API_: The API that support the frontend and acts as a broker between 
    the Milko Web and the MLFlow API.

## Process Steps

| Step             | Type        | Description                                                           | Role             |
| ---------------- | ----------- | --------------------------------------------------------------------- | ---------------- |
| Need for a model | Start Event | The process start when the scientist identifies the need for a model. | Scientist        |
| Formulate model  | Task        | The scientist prepares the model in a Jupyter notebook.               | Scientist        |
| Register model   | Task        | The data/AI engineers registers the model in MLFlow.                  | Data/AI Engineer |
| Test model       | Task        | The scientist tests the model in MLFlow.                              | Scientist        |
| Model approved?  | Gateway     | Determines if the model can be published or needs polishing.          | Scientist        |
| Publish endpoint | Task        | An endpoint towards the model is published in MLFlow API.             | Data/AI Engineer |
| Consume model    | Task        | The model is consumed through an web application.                     | BCh. Engineer    |
| Opportunity\*    | Event       | While consuming the model, an improvement opportunity is identified.  | BCh. Engineer    |
| Need for a model | End event   | With customer feedback, the process can start again with a new model. | BCh. Engineer    |
| Need SW support  | Start Event | At any point, the SW Engineer can be called to support the process.   | SW Engineer      |
| End              | End event   | The process ends when finishing using the application.                | BCh. Engineer    |

> \* Improvement opportunity.

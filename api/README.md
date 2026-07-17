### API
The API is built with FastAPI, and it is the backend of the project. API is 
located in the `api` folder.

#### Requirements

* Python 3.12.0

#### Installation

##### Python environment

```bash
cd api #if your are in the repo root
python3 -m venv .env --prompt "Milko API"
source .env/bin/activate
pip install -r requirements.txt
```
##### Microsoft Azure Entra ID authentication
The API is protected with Entra ID authentication, so you will need to create an
Entra ID application and configure it to allow access to the API (see references).

After creating the application, you will need to set the following environment
variables in the `.env_var` file:

```bash
TENANT_ID=<your-entra-id-tenant-id>
APP_CLIENT_ID=<your-entra-id-client-id>
```

#### Execution

```bash
fastapi dev
```
Will be available at `http://localhost:8000`.
> You can also access the API documentation at `http://localhost:8000/docs`

# Milko API
The API is built with FastAPI, and it is the backend of the project.

## Dependencies

* Python 3.12.0

## Installation

Deactivate any existing python virtual environment:

```bash
deactivate 
```

Setup a new virtual environment and install the dependencies:

```bash
cd api 
python3 -m venv .venv --prompt "Milko API"
source .venv/bin/activate
pip install -r requirements.txt
```

Copy default environment variables to a new file:

```bash
cp env.local .env.local
```

### Environment variables
Environments variables can be configured in the `.env.local` file. a dummy 
`env.local` file is provided in the repository, and it can be used as a template 
for your own configuration.


#### Milko Frontend URL
The following environment variable can be set to configure the Milko Frontend URL:

```bash
FRONTEND_SOCKET_URL=<your-milko-frontend-url>
```

example:

```bash
FRONTEND_SOCKET_URL=http://localhost:3000
```
> Milko Frontend usually runs at `http://localhost:3000` in development.

#### Skip authentication
The following environment variable can be set to skip authentication for 
development purposes:

```bash
SKIP_AUTH=true
```
The API then will ignore the authentication and will allow any request to access the endpoints. The following environment variables will be ignored:

* TENANT_ID
* APP_CLIENT_ID

#### Microsoft Azure Entra ID authentication
The API is protected with Entra ID authentication, so you will need to create an
Entra ID application and configure it to allow access to the API.

After creating the application, you will need to set the following environment
variables in the `.env.local` file:

```bash
TENANT_ID=<your-entra-id-tenant-id>
APP_CLIENT_ID=<your-entra-id-client-id>
```
example:

```bash
TENANT_ID=b2c89a1f-4dff-4940-9fa1-eaa0211257ba
APP_CLIENT_ID=10a7d176-f7c2-49f0-b288-e5ed30ad8430
```

### Execution

```bash
fastapi dev
```
Will be available at `http://localhost:8000`.
> You can also access the API documentation at `http://localhost:8000/docs`

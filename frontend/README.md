# Milko Frontend
The frontend is built with React, and it is the user interface of the project.

## Dependencies

* Node.js 26.4.0
* NPM 11.17.0

## Installation
Install the dependencies:

```bash
cd frontend
npm install
```

Copy default environment variables to a new file:

```bash
cp env.local .env.local
```

### Environment variables
Environments variables can be configured in the `.env.local` file. a dummy 
`env.local` file is provided in the repository, and it can be used as a template 
for your own configuration.

#### Milko API URL
The following environment variable can be set to configure the Milko API URL:

```bash
MILKO_API_URL=<your-milko-api-url> 
```
example:

```bash
MILKO_API_URL=http://localhost:8000
```

> Milko API usually runs at `http://localhost:8000` in development.

#### Cheese Fermentation model URL
The following environment variable can be set to configure the Cheese Fermentation model URL:

```bash
CHEESE_FERMENTATION_MODEL_URL=<your-cheese-fermentation-model-url>
```

example:

```bash
CHEESE_FERMENTATION_MODEL_URL=/models/Cream_Cheese_Fermentation/latest
```

#### Skip authentication
The following environment variable can be set to skip authentication for 
development purposes:

```bash
SKIP_AUTH=true
```
The API then will ignore the authentication and will allow any request to access the endpoints. The following environment variables will be ignored:

* AUTH_MICROSOFT_ENTRA_ID_ID
* AUTH_MICROSOFT_ENTRA_ID_ISSUER
* AUTH_MICROSOFT_ENTRA_ID_SECRET
* AUTH_SECRET

#### Microsoft Azure Entra ID authentication
The API is protected with Entra ID authentication, so you will need to create an
Entra ID application and configure it to allow access to the API.

After creating the application, you will need to set the following environment
variables in the `.env.local` file:

```bash
AUTH_MICROSOFT_ENTRA_ID_ID=<your-entra-id-client-id>
AUTH_MICROSOFT_ENTRA_ID_ISSUER=<your-entra-id-issuer>
AUTH_MICROSOFT_ENTRA_ID_SECRET=<your-entra-id-client-secret>
```
example:

```bash
AUTH_MICROSOFT_ENTRA_ID_ID=e6d052aa-e7ed-467a-bcd7-6d4cfb001a76
AUTH_MICROSOFT_ENTRA_ID_SECRET=KBK78~eEheSZ_HpcdmAoA9@%bBVQBS90GtbsXcBT
AUTH_MICROSOFT_ENTRA_ID_ISSUER=https://login.microsoftonline.com/b56a0722-427f-4e5c-8869-5d9964372ff2/v2.0
```

You will also need to set a secret salt for the frontend authentication:

```bash
AUTH_SECRET=<your-secret>
```

Which can be created with the following command:

```bash
openssl rand -base64 64
```

example:

```bash
AUTH_SECRET=jJFQCaBTX0W2/u+Rnfzcgv3F0JuonrHO1mbCmWvZomD/rJfXLipkhyAQF+b9KXu8
LpkWiWepEK4KZYBsGzcDvA==
```

### Execution

```bash
npm run dev
```
Will be available at `http://localhost:3000`.

### Frontend
The frontend is built with React, and it is the user interface of the project. The frontend is located in the `frontend` folder.

#### Requirements
* Node.js >= 20.6.0

#### Installation

##### Next.js environment

```bash
cd frontend # if you are in the repo root
npm install
```
##### Microsoft Azure Entra ID authentication
The frontend is protected with Entra ID authentication, so you will need to 
create an Entra ID application and configure it to allow access to the frontend 
(see references). After creating the application, you will need to set the following environment variables in the `.env.local` file:

```bash
AUTH_MICROSOFT_ENTRA_ID_ID=<your-entra-id-client-id>
AUTH_MICROSOFT_ENTRA_ID_SECRET=<your-entra-id-client-secret>
AUTH_MICROSOFT_ENTRA_ID_ISSUER=<your-entra-id-issuer>
AUTH_SECRET=<your-secret>
```

You can generate a secret with the following command:

```bash
openssl rand -base64 64
```

##### Models
Please use `CREAM_CHEESE_FERMENTATION_MODEL` environment variable in `.env.local` to set your model endpoint. For example:

```bash
CREAM_CHEESE_FERMENTATION_MODEL=/models/Cream_Cheese_Fermentation/latest
```

#### Execution

```bash
npm run dev
```
Will be available at `http://localhost:3000`.

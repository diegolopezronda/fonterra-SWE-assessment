from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer
from pydantic_settings import BaseSettings
from fastapi_azure_auth.user import User
from fastapi.security import SecurityScopes
from fastapi import Request


class Settings(BaseSettings):
    TENANT_ID: str = "dummy"
    APP_CLIENT_ID: str = "dummy"
    FRONTEND_SOCKET_URL: str = "http://localhost:3000"
    MLFLOW_SOCKET_URL: str = "http://localhost:5000"
    SKIP_AUTH: str = "false"

    class Config:
        env_file = ".env.local"


settings = Settings()

MOCK_USER = User(
    aud=settings.APP_CLIENT_ID,
    iss="mock-issuer",
    iat=1234567890,
    nbf=1234567890,
    exp=9999999999,
    acr="1",
    aio="mock",
    amr=["pwd"],
    appid=settings.APP_CLIENT_ID,
    appidacr="1",
    family_name="Developer",
    given_name="Local",
    ipaddr="127.0.0.1",
    name="Local Developer",
    oid="00000000-0000-0000-0000-000000000000",
    rh="mock",
    roles=["analyst", "visitor"],
    scp="user_impersonation",
    sub="mock-subject",
    tid=settings.TENANT_ID,
    unique_name="dev@local",
    uti="mock",
    ver="2.0",
    claims={},
    access_token="mock-token",
)

azure_settings = {
    "app_client_id": settings.APP_CLIENT_ID,
    "tenant_id": settings.TENANT_ID,
    "scopes": {
        f"api://{settings.APP_CLIENT_ID}/access_as_user": "access_as_user",
    },
}

if settings.SKIP_AUTH == "true":

    class MockAzureScheme(SingleTenantAzureAuthorizationCodeBearer):
        async def __call__(
            self, request: Request, security_scopes: SecurityScopes
        ) -> User:
            return MOCK_USER

    azure_scheme = MockAzureScheme(**azure_settings)
else:
    azure_scheme = SingleTenantAzureAuthorizationCodeBearer(**azure_settings)

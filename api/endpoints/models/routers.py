from fastapi import APIRouter, Body, Depends, Path
from typing import Annotated
from fastapi_azure_auth.user import User
from .services import predict
from ..auth.utils import allow_roles
from fastapi.exceptions import HTTPException

router = APIRouter(
    prefix="/models",
    tags=["ODE Models"],
    responses={404: {"description": "Not found"}},
)


@router.post("/{name}/{version}", summary="Obtains the data point of the rate of change of the model, given its parameters")
def post_name_version(
    name: Annotated[str,Path(description="Model name", examples=["ode"])],
    version: Annotated[str,Path(description="Model version", examples=["1"])],
    parameters: Annotated[dict, Body(description="Model parameters")],
    user: User = Depends(allow_roles(["analyst"])),
):
    try:
        prediction = predict(name, version, parameters)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return prediction
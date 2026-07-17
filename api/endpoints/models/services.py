from typing import Any
import requests
import pandas as pd


def predict(name: str, version: str, parameters: dict) -> Any:
    """
    Find some mercy in your heart for this poor man with a baby. This should be a database call, but! the point is that we can find the model tied to their endpoint. So no matter how many models/versions we have, this method will
    do the job, as long you know what you want and you know it exists.
    """
    models = {
        "Cream_Cheese_Fermentation": {
            "latest": {"endpoint": "http://127.0.0.1:8001/invocations"}
        }
    }
    try:
        url = models[name][version]["endpoint"]
        resp = requests.post(url, json=parameters, timeout=5)
        resp.raise_for_status()
        response = resp.json()
        df = pd.DataFrame(response["predictions"])
        response["domains"] = {col: [df[col].min(), df[col].max()] for col in df.columns}
        return response
    except Exception as e:
        raise ValueError(f"Error while calling the model. Check your parameters")

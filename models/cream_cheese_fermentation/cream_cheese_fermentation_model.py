import mlflow.pyfunc
import numpy as np
import pandas as pd
from scipy.integrate import solve_ivp
from mlflow.models import set_model


class CreamCheeseFermentationModel(mlflow.pyfunc.PythonModel):
    '''
        This model allows to predict the behaviour of bacteria during the process of Cream Cheese Fermentation.
    '''

    def _system_equations(self, t, state, c1, c2, mu, q):
        X, p = state
        pH = -np.log10(np.maximum(p, 1e-14))
        sigma = 1.0 / (1.0 + np.exp(-c2 * (pH - c1)))

        dX_dt = mu * X * sigma
        dp_dt = (10**q) * X * sigma
        return [dX_dt, dp_dt]

    def predict(self, context, model_input, params=None):
        if isinstance(model_input, pd.DataFrame):
            data = model_input.to_dict(orient="records")[0]
        else:
            data = model_input

        y0 = data["y0"]
        t_start = data["t_start"]
        t_end = data["t_end"]
        t_steps = data.get("t_steps", 100)

        params = params or {}
        c1 = params.get("c1", 6.5)
        c2 = params.get("c2", 2.0)
        mu = params.get("mu", 0.4)
        q = params.get("q", -2.0)
        t_eval = np.linspace(t_start, t_end, t_steps)
        sol = solve_ivp(
            fun=self._system_equations,
            t_span=(t_start, t_end),
            y0=y0,
            t_eval=t_eval,
            args=(c1, c2, mu, q),
            method="RK45",
        )
        response = pd.DataFrame(sol.y.T, columns=["X", "p"])
        response.insert(0, "time", sol.t)
        response["pH"] = -np.log10(np.maximum(response["p"], 1e-14))
        response["sigma"] = 1.0 / (1.0 + np.exp(-c2 * (response["pH"] - c1)))

        return response


set_model(CreamCheeseFermentationModel())

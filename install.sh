#/bin/sh
PRIMARY="\033[1;32m"
SECONDARY="\033[33m"
RESET="\033[0m"
REPO_ROOT="$(pwd)"
PYTHON_VENV=".venv"
PYTHON_ACTIVATE="$PYTHON_VENV/bin/activate"
PYTHON_REQUIREMENTS="requirements.txt"
MLFLOW_ROOT="$REPO_ROOT/models"
MLFLOW_FOLDER="mlflow"
# MODELS
MODELS_FOLDER="$REPO_ROOT/models"
PYTHON_ENV_MODELS="Milko Models" 
# API
API_FOLDER="$REPO_ROOT/api"
PYTHON_ENV_API="Milko API"
# FRONTEND
FRONTEND_FOLDER="$REPO_ROOT/frontend"
# SETUP
# MODELS
cd $MODELS_FOLDER
python3 -m venv "$PYTHON_VENV" --prompt "$PYTHON_ENV_MODELS"
source $PYTHON_ACTIVATE
pip install -r $PYTHON_REQUIREMENTS
# Jupyter Lab
jupyter lab >/dev/null 2>&1 &
JUPYTER_PID=$!
# MLFlow
mkdir -p "$MLFLOW_ROOT/$MLFLOW_FOLDER"
cd "$MLFLOW_ROOT/$MLFLOW_FOLDER"
mlflow ui --backend-store-uri sqlite:///$MLFLOW_FOLDER/mlflow.db --default-artifact-root ./$MLFLOW_FOLDER/artifacts >/dev/null 2>&1 &
MLFLOW_PID=$!
deactivate
# API
cd $API_FOLDER
if [ ! -e ".env.local" ]; then
  cp env.local .env.local
fi
python3 -m venv "$PYTHON_VENV" --prompt "$PYTHON_ENV_API"
source $PYTHON_ACTIVATE
pip install -r $PYTHON_REQUIREMENTS
fastapi dev >/dev/null 2>&1 &
API_PID=$!
# FRONTEND
cd $FRONTEND_FOLDER
if [ ! -e ".env.local" ]; then
  cp env.local .env.local
fi
npm install
npm run dev >/dev/null 2>&1 &
FRONTEND_PID=$!
echo "${PRIMARY}Jupyter Lab is running on:$RESET"
echo "http://localhost:8888"
echo "${SECONDARY}stop it with:$RESET"
echo "kill $JUPYTER_PID"
echo "${PRIMARY}MLFlow is running on:$RESET"
echo "http://127.0.0.1:5000"
echo "${SECONDARY}stop it with:$RESET"
echo "kill $MLFLOW_PID"
echo "${PRIMARY}Milko API is running on:$RESET"
echo "http://localhost:8000"
echo "${SECONDARY}docs are available at:$RESET"
echo "http://localhost:8000/docs"
echo "${SECONDARY}stop it with:$RESET"
echo "kill $API_PID"
echo "${PRIMARY}Milko Frontend is running on:$RESET"
echo "http://localhost:3000"
echo "${SECONDARY}stop it with:$RESET"
echo "kill $FRONTEND_PID"
echo "Done"
exit 0
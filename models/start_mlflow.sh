#!/bin/sh
PRIMARY="\033[1;32m"
SECONDARY="\033[33m"
RESET="\033[0m"
command -v deactivate >/dev/null 2>&1 && deactivate
source .venv/bin/activate
MLFLOW_FOLDER="mlflow"
mkdir -p $MLFLOW_FOLDER
mlflow ui --backend-store-uri sqlite:///$MLFLOW_FOLDER/mlflow.db --default-artifact-root ./$MLFLOW_FOLDER/artifacts >/dev/null 2>&1 &
MLFLOW_PID=$!
echo "#!/bin/sh" > stop_mlflow.sh
echo "kill $MLFLOW_PID" >> stop_mlflow.sh
echo "echo 'MLFlow has been stopped.'" >> stop_mlflow.sh
chmod a+x stop_mlflow.sh
echo "${PRIMARY}MLFlow is running on:$RESET"
echo "http://127.0.0.1:5000"
echo "${SECONDARY}stop it with:$RESET"
echo "./stop_mlflow.sh"

#!/bin/sh
PRIMARY="\033[1;32m"
SECONDARY="\033[33m"
RESET="\033[0m"
command -v deactivate >/dev/null 2>&1 && deactivate
source .venv/bin/activate
jupyter lab >/dev/null 2>&1 & 
JUPYTER_PID=$!
echo "#!/bin/sh" > stop_jupyter.sh
echo "kill $JUPYTER_PID" >> stop_jupyter.sh
echo "echo 'Jupyter Lab has been stopped.'" >> stop_jupyter.sh
chmod a+x stop_jupyter.sh
echo "${PRIMARY}Jupyter Lab is running on:$RESET"
echo "http://localhost:8888"
echo "${SECONDARY}stop it with:$RESET"
echo "./stop_jupyter.sh"
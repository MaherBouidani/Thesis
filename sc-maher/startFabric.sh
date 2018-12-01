#!/bin/bash 
 GREEN='\033[1;32m'
 RESET='\033[0m'
 RED='\033[1;31m'
 
 function indent() {
  c='s/^/       /'
  case $(uname) in
    Darwin) sed -l "$c";;
    *)      sed -u "$c";;
  esac
}

function description ()
    {
        echo -e "${GREEN}=====================================================" | indent
        echo -e "${RESET}-----> $*" | indent
    }

#GG

function showStep(){

    echo -e "${RED}=====================================================" | indent
    echo -e "${RESET}-----> $*" | indent
    echo -e "${Green}=====================================================" | indent
}

description "Changing Directory to My fabric-dev-servers."

cd /Users/maherbouidani/fabric-dev-servers/fabric-dev-servers

showStep "Start Fabric"
export FABRIC_VERSION=hlfv11
./startFabric.sh

showStep "Fabric has Started"
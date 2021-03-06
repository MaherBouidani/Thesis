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
fucntion showStep()
{
    echo -e "${RED}=====================================================" | indent
    echo -e "${RESET}-----> $*" | indent
    echo -e "${Green}=====================================================" | indent
}
description "Changing Directory to My fabric-dev-servers."
cd /Users/maherbouidani/fabric-dev-servers/fabric-dev-servers

echo -e "Should Creat Peer Admin Card everytime running fabric after it has been teared down"
echo -e "Reference to my teardownFabric.sh"

showStep "create admin card"

./createPeerAdminCard.sh

showStep "admin card is created"
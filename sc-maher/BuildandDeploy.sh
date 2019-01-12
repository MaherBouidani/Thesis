#!/bin/bash

 YELLOW='\033[1;33m'
 RED='\033[1;31m'
 GREEN='\033[1;32m'
 RESET='\033[0m'

function indent() {
  c='s/^/       /'
  case $(uname) in
    Darwin) sed -l "$c";;
    *)      sed -u "$c";;
  esac
}

function showStep ()
    {
        echo -e "${YELLOW}=====================================================" | indent
        echo -e "${RESET}-----> $*" | indent
        echo -e "${RED}=====================================================${RESET}" | indent
    }

#Comment

function description ()
    {
        echo -e "${GREEN}=====================================================" | indent
        echo -e "${RESET}-----> $*" | indent
    }

showStep "Packaged into a deployable business network archive (.bna) file"

composer archive create -t dir -n .

description "Packaging sc-maher.bna in ./dist and sc-maher@0.0.1.bna "

showStep "Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer business network to be installed on the peer:"

composer network install --card PeerAdmin@hlfv1 --archiveFile uvic-maher@0.1.3.bna

showStep "Start the Hyperledger Fabric Network"
composer network start --networkName uvic-maher --networkVersion 0.1.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

description "networkadmin.card created "

showStep "To import the network administrator identity as a usable network card"
composer card import --file networkadmin.card

showStep "To check that the business network has been deployed successfully"
composer network ping --card admin@sc-maher


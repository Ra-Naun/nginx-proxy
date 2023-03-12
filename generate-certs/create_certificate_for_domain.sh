#!/usr/bin/env bash

if [ -z "$1" ]
then
  echo "Please supply a subdomain to create a certificate for";
  echo "e.g. www.mysite.com"
  exit;
fi

if [ ! -f rootCA.pem ]; then
  echo 'Please run "create_root_cert_and_key.sh" first, and try again!'
  exit;
fi
if [ ! -f v3.ext ]; then
  echo 'Please download the "v3.ext" file and try again!'
  exit;
fi

# Create a new private key if one doesnt exist, or use the xeisting one if it does
if [ -f server.key ]; then
  KEY_OPT="-key"
else
  KEY_OPT="-keyout"
fi

DOMAIN=$1
COMMON_NAME=${2:-*.$1}
SUBJECT="/C=CA/ST=None/L=NB/O=None/CN=$COMMON_NAME"
NUM_OF_DAYS=3650
openssl req -new -newkey rsa:2048 -sha256 -nodes $KEY_OPT server.key -subj "$SUBJECT" -out server.csr
cat v3.ext | sed s/%%DOMAIN%%/"$COMMON_NAME"/g > /tmp/__v3.ext
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days $NUM_OF_DAYS -sha256 -extfile /tmp/__v3.ext

# move output files to final filenames
mv server.csr "$DOMAIN.csr"
cp server.crt "$DOMAIN.crt"

# remove temp file
rm -f server.crt;

echo
echo "###########################################################################"
echo Done!
echo "###########################################################################"
echo "To use these files on your server, simply copy both $DOMAIN.csr and"
echo "server.key to your webserver, and use like so (Nginx, for example)"
echo
echo "    SSLCertificateFile    /generate-certs/site-certs/$DOMAIN.crt"
echo "    SSLCertificateFile    /generate-certs/site-certs/server.key"
First make sure you're on npm version 9.11.2 because anything farther than that doesn't work with noble. Make sure to test that >node-v == "9.11.2"

Then,
> npm install

After,
> npm run start

And in another terminal run this,
> curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4000/hello

And then see if the server has handled your adapter properly.

For Rasbpi:
1. Install "Dietpi" minimal rasbian distribution on pi.
2. After boot up, when in the pre-install config menu, go to advanced options and turn bluetooth on.
3. >sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
4. In order to run server without sudo: sudo setcap cap_net_raw+eip $(eval readlink -f \`which node\`)

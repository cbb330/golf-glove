First make sure you're on npm version 9.11.2 because anything farther than that doesn't work with noble.

Then,
> npm install

After,
> npm run start

And in another terminal run this,
> curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/scan

And then see if the server has handled your adapter properly.

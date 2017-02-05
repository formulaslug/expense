# Expense

## Getting Started
1. Go download `slack-auth` and `service-account.json` from #finance, and put
both files in your root project directory
2. If you haven't already, go download and install
[Node.js](https://nodejs.org/en/download/).
3. Open a new terminal window, and navigate to this project. Run `npm i`. It'll
take a bit to download all the dependencies, but once it's done, you'll be ready
to roll. Just let it do it's thing.
4. Run `npm run dev`. It might take a few seconds, but you should get a
`  app:bin:dev-server Server is now running at http://localhost:3000. +44ms`.
You're ready to start coding! To check the project out locally, open up
http://localhost:3000 in a browser.

## How to Deploy
1. Run `npm run deploy NODE_ENV=production`, and let that roll. Assuming you
have all of your dependencies installed through an `npm i`, and nothing is
broken, that should finish in under a minute or two.
2. If you haven't already downloaded them, install the Firebase CLI tools by
running `npm install -g firebase-tools`, followed by a `firebase login`
3. Deploy with `firebase deploy`

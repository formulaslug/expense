# expense
The #finance team's expense tracking tool.

## Getting Started
We use MongoDB and a REST API. Here's how to get that working:

1. Go download `slack-auth` and `service-account.json` from #finance, and put both files in your root project directory.
2. Install [Node JS](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/download-center?jmp=nav)
3. Start MongoDB `mongod -dbpath db` (or `./mongod` on mac, assuming you're in your `mongo/bin/` directory)

Then, in the app directory...
4. `npm install`
5. `node bin/www`

From there, you can access the app by going to `localhost:300`. Happy expensing!


## Understanding the Problem
The finance team has been tasked with tracking all of the value (cash and materials) moving in and out of the organization. To help us with that task, we’re building software to automate some of the tracking.

We’re starting with expenses. Currently, to expense an item, a team member has to fill out the [Payee Setup (204)](https://cbse.soe.ucsc.edu/sites/default/files/payee_setup_204_online_form_savable_021709.pdf) form, then fill out the [Direct Payment](https://financial.ucsc.edu/Financial_Affairs_Forms/Direct_Payment.pdf) form, which gets sent to multiple different people, and can take weeks (or months) to get a check back to the original purchaser. Additionally, the finance team doesn’t have any details from that purchase, which limits our ability to do analysis on our purchasing habits.

Expense is built to tackle that.

## Our Solution
![](http://i.imgur.com/kujhGsq.png)

We’ll make use of a Slack integration to quickly make available a form for users to fill out on the web. This form will collect all the necessary information for our finance team, while also filling out the Direct Payment form, and prepping it (and instructions) on how to get money back.

## Teamwork!
_Baiwen Huang_  
Working on the Google Sheets integration,

_Emmett Greenberg_ and _Wesley Smith_  
Working on the Slack integration,

_Micah Duron_ and _Alex Price_  
Working on plugging things into our web app, and building out the interface,

_William Xu_  
Working on our API, and connecting G-Sheets, Slack, and the interface


## Questions?
If you have questions, or want to join the project, reach out to _@alexprice_ on Slack. If you want to work on a specific part of the app, reach out to the folks who are already working on that part, and ask if you can help them! If you want to work on a new feature that isn’t here, or want to help the #finance team in other ways (budgeting, analysis, accounting) reach out to _@alexprice_ on Slack.

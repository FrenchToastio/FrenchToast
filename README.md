# FrenchToast.io
## Waffle.io Hackathon Challenge

### Intro
Welcome to our Hackathon submission! We hope you like what you say and appreciate the creatvitiy and aspirations of our features we attempted to implement or outlined here in this README

### Features

Our list of features we were able to get to 

```
1. Individual user view of board where assigned tasks to loged in user are sorted to the top of each column
2. Color gradient or labeling tasks that have not been worked on in a while and acquired 'rust'
3. Burn up graphm using C3
4. A neural network POC that would recommend weights to tasks and would adjust this recommendation given
some criteria (i.e. expected time to completetion vs actual time, Forsight weighting vs hindsight 
weighting, developer review of task difficulty, merge conflicts/revisions needed, ect..)
5. Notification for which tasks need attention/updates
```

List of features we didn't have time for but would love to see for Waffle.io

```
1. Daily Notifications for users to give updates in regards to assigned tasks - then post
those updates on cards themselves
2. Data visualization and metrics for (Actual Time vs Estimation Time, Time task
spends in particular states(in progress))
3. Anonymized voting system to determine task weight 
4. Tree visualization of tasks/project
5. Recommend tasks that have been in a certain state for too long to be broken down into an epic
6. Organize each user's dashboard to show tasks at the top of the column that are relevant
to them (i.e. display first all the ones assigned to them at the top)
```

### Tech Stack

We went with fullstack Javascript for quick development using React on the front end and Node.js + Express for our back end. For our real-time features we used smee.io for our webhooks to our github App and sockets.io for our realtime update of our client, C3 for our data visualization and charts, and Synaptic.js for constructing the neural network POC.

### Installation/Run instruction

1. Clone down this repo
2. npm install
3. npm run react-dev
4. npm run server-dev
5. cd into my-first-app
6. npm install
7. nodemon server.js
8. Enjoy!

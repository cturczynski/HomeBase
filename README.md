# HomeBase

HomeBase is a practice project that I made to work on my new React.js and Node.js skills, as well as brush back up on my Swift and iOS development skills. It was inspired by my time bartending this past year and the scheduling system we used for our schedules. The entire project is comprised of:
* __React web app__
* __Node backend__
* MySQL database
* iOS application

The iOS app can be found in my other repository [here](https://github.com/cturczynski/HomeBase-ios).

The Node backend serves API endpoints to both the React web app and the iOS app to access the database. This repository has the React web app component which was made with these functionality goals:
* Allow employees to view their weekly schedules, as well as the whole staff's schedule for the week
* Display all past shifts for an employee and the tips they made each shift
* Allow managers to edit the schedule and individual shifts of the employees
* Allow managers to add/remove/edit employees to the team roster

The Node backend has the API endpoints to access the database, namely to read/write the Employee and Shift objects, as needed by the frontends.

The Node backend is complete, as well as the iOS app. The React app is still in progress as the iOS app was prioritized.

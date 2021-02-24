# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).




/-------------------------------Dependencies-----------------------------------/

Dependencies for both server and react's app are inside "Scheduler/package.json"'. 
So, use 'npm install' in 'Scheduler-main' folder to install them. 
(Need to install 'node_modules' folder).

  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "cors": "^2.8.5",
    "exceljs": "^4.2.0",
    "express": "^4.17.1",
    "materialize-css": "^1.0.0-rc.2",
    "mongoose": "^5.11.17",
    "morgan": "^1.10.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.2",
    "web-vitals": "^1.0.1"
  }

//-------------------------------------------------------------------------------//





/---------------------------------Back-End----------------------------------------/

Back-End's creation with:
MongoDB + Mongoose and Nodejs + Express 
(MongoDB Cloud Site: https://cloud.mongodb.com/ )

Server's endpoints:

------------Skill's Router:----------------------

Get all skills
Method Get : url: http://localhost:8000/skills


Get Skills into .xlsx file and send them back
Method GET : url: http://localhost:8000/skills/excel


Post a new skill
Method POST : url: http://localhost:8000/skills


Post multiple skills
POST : url: http://localhost:8000/skills/many


Get Skill by using Route param ID
Method GET : url: http://localhost:8000/skills/:id


Delete a Skill based on Route param ID
Method DELETE : url: http://localhost:8000/skills/:id


Update a Skill based on Route param ID
Method UPDATE : url: http://localhost:8000/skills/:id/update


------------Employee's Router:----------------------

Get all employees
Method Get : url: http://localhost:8000/employees


Post a new employee
Method POST : url: http://localhost:8000/employees


Delete multiple employees
Method DELETE : url: http://localhost:8000/employees/manydelete


Get employee by using Route param ID
Method GET : url: http://localhost:8000/employees/:id


Delete a employee based on Route param ID
Method DELETE : url: http://localhost:8000/employees/:id


Update a employee based on Route param ID
Method UPDATE : url: http://localhost:8000/employees/:id/update

//----------------------------------------------------------------------------------//




/--------------------------------Front-End-------------------------------------------/

Front-End's creation with:
ReactJS + Materialize-css framework

Most of skill's Component are sfc components (+ hooks, Modern React xD). On the contrary, the branches that were created for the implementation of the employees, were made without hooks (old School state XD).


    
Issue:
At this time, i"m learning how to use Material-UI! But, for the requirements of
this Project i did not used Material-UI because i"m not that familiar with it yet. Instead 
i used Materialize-css framework. That results to occur some problems in the styling, like the
overflow problems that you can locate at skill's cards and inside input fields (p tags overflows ..).

//-----------------------------------------------------------------------------------//





/------------------------------How to run?--------------------------------------------/

Server: 
Open terminal in 'server' folder and use: $nodemon server

Front-end:
Open terminal in 'Scheduler' folder and use: $npm run start

//------------------------------------------------------------------------------------//





/-------------------------------Thoughts-----------------------------------------------/

//------------------------------------------------------------------------------------//

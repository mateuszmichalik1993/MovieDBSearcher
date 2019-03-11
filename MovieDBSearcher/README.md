# MovieDBSearcher
MovieDBSearcher requires node.js and npm. 
To install node.js and npm go to https://nodejs.org/en/download/, download and run installer;
To install project, please run following commands:
npm install
npm install --save themoviedb-javascript-library

To run project in developer mode use command:
npm start
Application will start on `http://localhost:4200/`
To run application in production mode on specific port use following scripts:
ng build --prod 
ng serve --prod --port <port_number> 
If port is not provided application will run on default port 4200.
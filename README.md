# IonTask

IonTask is a mobile first task PPC (Planned / Progress / Completed) app. Live demo: http://www.innosics.com/ion

Requirement:

1. node.js
2. Mongodb

IonTask uses Mongodb, Node.js, OAuth2, AngularJS.

How to run it:

1. Mongodb, the db user needs access to any database, such as a role of readWriteAnyDatabase, but here we create a root user is the most simple way:

  admin db:
  
    db.createUser(
     {
       user: "api",
       pwd: "password",
       roles: [ { role: "root", db: "admin"} ]
     }
    )
  
  We need at least client and one user with a space assigned in accounts db, insert records below into accoutns db:
    
    { "name" : "Innosics API v1.0", "clientId" : "AF0E16BFAFAA4A37916ECE25ECD420A2", "clientSecret" : "9793FBBE8FD84615B31D4E68FDD4063C"}
  
    { "username" : "admin@innosics.com", "hashedPassword" : "7cfbe50ec8cbe795ba3f613f039253cfe273cb49", "salt" : "cd018b72bfdb50d977b8d0e83d4a7463d9e4dba4f1afec64ce5a908b6a044330"}
    
    {"username": "admin@innosics.com", name: "Inno Admin", space: "ion", spaceName: "IonTask"}  

2. Install:
  
    npm install

3. Start the app:

    npm start

  Default port of app: 3000, login, admin@innosics.com/123456

4. Advance configuration

  Port: env.NODE_PORT or 3000
  
  DB: if you host the app in localhost or OpenShift, nothing to do, or, set following env:
  
  process.env.OPENSHIFT_MONGODB_DB_HOST = "db_host";
  process.env.OPENSHIFT_MONGODB_DB_PORT = "db_port";
  
5. Seperate web host:

  If web app seperated from the api service, modify following line in ion.module.js under web\modules:
  
  .value('apiProvider', '') // empty for local host
  
  

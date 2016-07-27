# ion
Ion is a mobile first task PPC app.

Requirement:

1. node.js
2. Mongodb

How to run it:

1. DB:

  admin db:
  
    db.createUser(
     {
       user: "api",
       pwd: "password",
       roles: [ { role: "root", db: "admin"} ]
     }
    )
  
  accounts db:
  
    { "username" : "admin@innosics.com", "hashedPassword" : "7cfbe50ec8cbe795ba3f613f039253cfe273cb49", "salt" : "cd018b72bfdb50d977b8d0e83d4a7463d9e4dba4f1afec64ce5a908b6a044330"}
    
    { "name" : "Innosics API v1.0", "clientId" : "AF0E16BFAFAA4A37916ECE25ECD420A2", "clientSecret" : "9793FBBE8FD84615B31D4E68FDD4063C"}
    
    {"username": "admin@innosics.com", name: "Inno Admin", space: "ion", spaceName: "IonTask"}  

3. Start the app:
    npm start

Default login, admin@innosics.com/123456


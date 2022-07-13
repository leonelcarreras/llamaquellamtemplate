const path = require("path");
const fs = require('fs');



const usersFilePath = path.join(__dirname, "../data/datosUsuarios.json");
const allUsers = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const bcryptjs = require ("bcryptjs");



const user = {



    findAllUsers: function(){

        return allUsers
    }

,
    userByid: function(id){

users = this.findAllUsers();
userFound = allUsers.find((user) => user.id === id )

        return userFound
    },
    


    userByField: function(field,text){

        users = this.findAllUsers();
        userFound = allUsers.find((user) => user[field] == text )
       
                return userFound
            },


    generateId: function(){
        users = this.findAllUsers();
        if (users.length > 0) { 
        userId = users[users.length - 1].id + 1 ;
    }

    else {userId = 1}

return userId
    }
 
,

     create: function(userData){

         let allUsers = this.findAllUsers();
         let newUser = {
              id : this.generateId(),
              ...userData          }

     allUsers.push(newUser);

       fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' '));
console.log(newUser);
       return newUser;
       
       }
,

deleteUser: function(id){

    users = this.findAllUsers();
    userDeleted = users.filter((user) => user.id !== id )

    fs.writeFileSync(usersFilePath, JSON.stringify(userDeleted, null, ' '));

    return userDeleted
        
        },

// editUser:function(id){

//     users = this.findAllUsers();
//     userToEdit = users.map((user) => 
//     if (user.id == id ) {


//     }

//     fs.writeFileSync(usersFilePath, JSON.stringify(userDeleted, null, ' '));

//     return true
        
        // },
       
     
}

 ;


module.exports = user
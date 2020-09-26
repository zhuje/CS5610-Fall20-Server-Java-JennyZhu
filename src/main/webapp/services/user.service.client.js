function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/jannunzi/users';
    var self = this;


    function createUser(user) {  }

    /*
    findAllUsers() -- retrieve information from a remote server
    to fetch all users in the server's database.
    fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users') // access the remote server
    .then(response => {  // asyncronously retrieve ('.then()') the JSON information ('response')
     response.json() // parse the JSON information from the remote server using '.json'
     */
    function findAllUsers() {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users')
            .then(response => response.json() )
    }

    function findUserById(userId) {  }
    function updateUser(userId, user) { }




    /*
     deleteUser(userId) -- deletes user from the remote server
     fetch(URL + userID, <optional JSON configuration>{}) // 'userID' specifies which user you want to delete
     // the optional JSON configuration allows you to DELETE rather than the default GET

     */
    function deleteUser(userId) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/' + userId, {
            method: 'DELETE'
        })

    }
}



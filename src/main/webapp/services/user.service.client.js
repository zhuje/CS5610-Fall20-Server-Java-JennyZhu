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
    to fetch all users in the server's database
     */
    function findAllUsers() {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users') // access the remote server
            .then(response => {  // asyncronously retrieve ('.then()') the JSON information ('response')
                // console.log(response)
                 response.json() // parse the JSON information from the remote server using '.json'
                })




    }

    function findUserById(userId) {  }
    function updateUser(userId, user) { }
    function deleteUser(userId) {  }
}



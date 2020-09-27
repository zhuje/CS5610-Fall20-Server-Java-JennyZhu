function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/zhuje/users';
    var self = this;

    // DEFAULT method is : GET
    function findAllUsers() {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/zhuje/users')
            .then(response => response.json())
    }

    // POST
    function createUser(user) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/zhuje/users', {
            method: 'POST', // adds new data
            body: JSON.stringify(user), // convert user objects to string
            headers: {
                'content-type': 'application/json'
            } // The section above will POST the newUser to the remote server
        })
            .then(response => response.json())  // then we'll come back from the remote server with a response and update our local cache
    }

    // TODO
    function findUserById(userId) {


    }

    // PUT
    function updateUser(userId, user) {
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/zhuje/users/${userId}`, {
            method: 'PUT', // Edits data
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    // DELETE
    function deleteUser(userId) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/' + userId, {
            method: 'DELETE'
        })
    }
}
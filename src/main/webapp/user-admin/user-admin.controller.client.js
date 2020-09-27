(function () { // encapsulate

    let users = [
        {
            username: 'alice',
            fName: 'Alice',
            lName: 'Wonderland',
            role: 'Faculty'
        },
        {
            username: 'bob',
            fName: 'Robert',
            lName: 'Marley'
        },
        {
            username: 'charlie',
            fName: 'Charlie',
            lName: 'Garcia'
        }
    ]

    let tbody
    let template
    let clone
    let $createBtn
    let $usernameFld, $firstNameFld, $lastNameFld, $roleFld
    const userService = new AdminUserServiceClient()

    const deleteUser1 = (event) => {
        const deleteBtn = $(event.currentTarget)
        // deleteBtn.parent().parent().parent().remove()
        deleteBtn.parents("tr.wbdv-template").remove()
        // console.log(deleteBtn)
    }

    /*
    param @ index -- is the index of the selected 'user' from the 'users' Array
    selectUser(index) -- Takes the 'index' of the user reference the selected user's
    attributes
    #usernameFld -- corresponds to the 'id' of the html eleemnt
    users[index] -- gets the index of the selected user to access its attributes
    .username -- is the identifier from the remote server
     */
    let selectedUserIndex = -1 // initialize selectedUserIndex to -1 bc indexing starts at 0 -- so -1 means no user selected to start
    const selectUser = (index) => { // (index) is the selected user's index in the array of users
        selectedUserIndex = index // update the 'selectedUserIndex'
        $("#usernameFld").val(users[index].username)
        $("#firstNameFld").val(users[index].first)
        $("#lastNameFld").val(users[index].last)
        $("#roleFld").val(users[index].role)
    }

    const renderUsers = (users) => {
        tbody.empty()
        const ul = $("<ul>")
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            // console.log(user.username)
            const li = $("<li>" + user.username + "</li>")
            ul.append(li)

            clone = template.clone()
            clone.removeClass("wbdv-hidden")

            clone.find(".wbdv-username").html(user.username)
            clone.find(".wbdv-first-name").html(user.first)
            clone.find(".wbdv-last-name").html(user.last)
            clone.find(".wbdv-role").html(user.role)
            clone.find(".wbdv-remove").click(() => deleteUser2(i))
            clone.find(".wbdv-edit").click(() => selectUser(i))

            tbody.append(clone)
        }
        container.append(ul)
    }

    const deleteUser2 = (_index) => {
        const user = users[_index]
        const userId = user._id
        userService.deleteUser(userId)
            .then(response => {
                users.splice(_index, 1)
                renderUsers(users)
            })
    }

    // const clearFld = () => {
    //     console.log("clearing Fld ")
    //     $usernameFld.val("")
    //     $firstNameFld.val("")
    //     $lastNameFld.val("")
    // }

    /*
    createUser()
    In the init() function there is a actionListener on the add button. Once
    it is clicked it calls here, createUser(). Then we get the value of the input fields
    with the .val() function. Then clear the input fields with (""). Then create a
    new object 'newUser' this will get 'pushed' to the remote server.
     */
    const createUser = () => {
        // get input value
        console.log("create user")
        const username = $usernameFld.val()
        const firstName = $firstNameFld.val()
        const lastName = $lastNameFld.val()
        const role = $roleFld.val()
        console.log(role)

        // clear input fields in the .html
        $usernameFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        //$roleFld.get(0).selectedIndex = 0;  // resets role dropdown back to first item

        // create 'newUser' object
        const newUser = {
            username: username,
            first: firstName,
            last: lastName,
            role: role
        }

        // This block communicates with the remote server -- add newUser to remote server and rerender with updated local cache.
        userService.createUser(newUser)
            .then(actualNewUser => {
                users.push(actualNewUser)
                renderUsers(users)
            })
    }

    /*
     * updateSelecteUser() -- edits the selected user.
     * Obtains the value of input fields. PUT the changes in the remote server using
     * 'userService.updateUser(userID, user) -- the 'user' is an object and you can
     * populate it in the argument. THEN when we get a response from the remote server
     * re-render our local cache using the updated information JSON object (response)
     *  from the remote server. We must declare which attributes we want to update.
     */
    const updateSelecteUser = () => {
        // Store edit values from input.
        const newUsername = $("#usernameFld").val()
        const newFirstName = $("#firstNameFld").val()
        const userId = users[selectedUserIndex]._id
        const newLastName = $("#lastNameFld").val()
        const newRole = $ ("#roleFld").val()

        //clearFld()

        //  PUT edited values into remote server THEN update local cache with the RESPONSE (updated JSON object).
        // pass the 'userID' into the function to reference the selected user
        // pass 'user' as an object with the updated attributes 'newUsername', etc.
        userService.updateUser(userId, {
            username: newUsername,
            first: newFirstName,
            last: newLastName,
            role: newRole
        })
            .then(response => {     // chain the command 'userService.updateUser' -- once we get a JSON object back from the remote server (response) update the local cache
                users[selectedUserIndex].username = newUsername // server send a JSON object, the 'response',  -- use the response to update local cache
                users[selectedUserIndex].first = newFirstName
                users[selectedUserIndex].last = newLastName
                users[selectedUserIndex].role = newRole
                renderUsers(users) // re-render (display) the updated information
            })

    }

    const findAllUsers = () => {
        userService.findAllUsers()
            .then((_users) => {
                console.log(_users)
                users = _users
                renderUsers(users)
            })

    }

    const init = () => {
        const heading1 = jQuery("h1")
        heading1
            .html("User Administrator")

        // instantiate variables that correspond to elements with specified identifiers in user-admin.template.client.html
        const container = $(".container")
        tbody = $("tbody")
        template = $("tr.wbdv-template")
        $createBtn = $(".wbdv-create").click(createUser)
        $firstNameFld = $("#firstNameFld")
        $usernameFld = $("#usernameFld")
        $lastNameFld = $("#lastNameFld")
        $roleFld = $("#roleFld")
        $(".wbdv-update").click(updateSelecteUser)

        // console.log(users)
        // userService.findAllUsers()
        //     .then((_users) => {
        //         console.log(_users)
        //         users = _users
        //         renderUsers(users)
        //     })

        findAllUsers()

    }
    $(init)


})()
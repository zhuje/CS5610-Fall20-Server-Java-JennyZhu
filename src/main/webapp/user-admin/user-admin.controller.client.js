
// static DATASET we're creating -- this is an array of 'users'. Typically we would
// get a dataset from a server but for simplicity we're going to manually create a
// simply data set to iterate over and append onto the DOM.

let users = [
    {
        username: 'alice',
        fName: 'Alice',
        lName: 'Wonderland',
        role:'Faculty'
    },
    {
        username: 'bob',
        fName: 'Bob',
        lName: 'Marley',
        role: "Student"
    },
    {
        username: 'charlie',
        fName: 'Charlie',
        lName: 'Garcia',
        role: "Student"
    }
]

// declare more variables with 'let'
let tbody  // variables doesn't need to match the element, just  a style choice
let template  // tbody  TABLE ROW you want to copy from the table - we're gonna use it as a template
let clone // this will be the clone of tbody table rows from the template

// naming convention is to put '$' infront of variable name tha references an object in the DOM
let $createBtn
let $usernameFld,$firstNameFld, $lastNameFld,$roleFld



// This way is bad practice because you only delete from the data model and not from the DOM.
// The number of rows displayed on the data model and in the DOM should match -- that why
// we need to reimplement a way to delete a user using 'deleteUser2'.
// declare and instance for an eventHandler -- every time we click the "X" in the viewport (class ".wbdv-delete) we call this EventHandler
// const deleteUser1 = (event) => { // (event) is a jQuery function equivalent to eventHandler
//     const deleteBtn = $(event.currentTarget) // wrap the current target (element with the class '.wbdv-delete') in the jQuery keyword '$' to allow it access to all of jQuery's functions
//     // deleteBtn.parent().parent().parent().remove();  // 'parent()' allows you to search UP the down to the parent element
//     deleteBtn.parents("tr.wbdv.template").remove()
//     console.log("delete user 1")
// }


// renderUsers -- renders the users every time we manipulate the table (add/remove user).
// It empties the table and repopulates it with the current datta model after we add/remove users.
const renderUsers = (users) => {
    tbody.empty(); // upon every call we empty the table data and rerender
    // print out each 'users' object username only
    const ul = $("<ul>")
    for(let i=0; i<users.length; i++){
        const user = users[i];
        // console.log(user.username);
        const li =$("<li>" + user.username + "</li>")
        ul.append(li)

        clone = template.clone() // .clone() is a jQuery function. Here we're copying the template table row with user data and assigning it to 'clone'
        clone.removeClass("wbdv-hidden") // removes the original template ONLY FROM THE CLONE -- the original template still in the DOM but is no longer displayed on the viewport

        clone.find(".wbdv-username").html(user.username) // within the clone ( <tr class="wbdv-template" ) FIND the element <td class"wbdv-username"> then REPLACE HTML with my dataset's usernames
        clone.find(".wbdv-first-name").html(user.fName)
        clone.find(".wbdv-last-name").html(user.lName)
        clone.find(".wbdv-role").html(user.role)

        clone.find(".wbdv-remove").click(()=>deleteUser2(i)) // .click a type of 'event' from jQuery -- so every time we click the element with the class ".wbdv-remove" we create an event for the eventHandler instance "deleteUser1" to respond to. the eventHandler is declared above in a lamba.
        console.log(users)

        tbody.append(clone) // now append the clone (copies of the table row) to the table body (tbody)


    }
    container.append(ul)
}

// This method deletes uses from both the DOM and the original dataset (data model).
const deleteUser2  = (index) => { // index is the index of the 'users' array that we want to delte
    users.splice(index, 1) // delete the index using 'splice'
    renderUsers(users)

}

// createUsers() -- creates new users in the data model.
// It reads in the html 'id's of each input field and populates the
// object 'newUsers' with the attributes. The table then gets
// repopulated with the new user added to the table.
// The <input id=""> are readin
// in the init() function. Then the evenHandler in the init function
// "$createBtn = $(".wbdv-create").click(createUser)" will detect
// with the 'add" buttons has been clicked.
const createUser = () => {
    console.log("create user")

    // Read-in input fields and get the values
    const username = $usernameFld.val() // get the value of the <input id="FooID'>
    const firstName = $firstNameFld.val()
    const lastName = $lastNameFld.val()
    const role = $roleFld.val()

    // Write to the input fields -- clear them with "" syntax
    $usernameFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val("")


    // create a newUser with the following attributes
    const newUser = {
        username: username,
        fName: firstName,
        lName: lastName,
        role: role
    }
    users.push(newUser) // append newUser to the array of 'users' using 'push'
    renderUsers(users)  // rerender the whole table with the newly added user
}


// Allow the DOM to load -- otherwise .js will try to manipulate it
// but the element hasn't been loaded in the DOM and your .js commands
// won't take effect.
const init = () =>  { // create a lamda that encapsulates all our .js commands
    const heading1 = jQuery("h1") // grab all 'h1' tags to manipulate those objects
    // heading1.css("color", "yellow") // change its color to yellow


    const container = $(".container ")
    tbody = $("tbody") // initialize 'tbody' (.js variable) by assigning it to the 'tbody' in the html ($("tbody"))
    template = $("tr.wbdv-template") // initialize 'template' by assigning it to the html element table row ('tr') which contains the users's data

    // Create New users --
    $createBtn = $(".wbdv-create").click(createUser) // event handler for clicking the add users button
    $firstNameFld = $("#firstNameFld") // '#' references the id of the input in the html -- grabs the inputFlds referenced by the id
    $usernameFld = $("#usernameFld")
    $lastNameFld =$("#lastNameFld")
    $roleFld = $("#roleFld")

    // print out array
    // console.log(users)

    renderUsers(users)


}

$(init) // calls on jQuery using '$'. It will now wait for the DOM to load before
// it attempts to execute all the commands in 'init'.







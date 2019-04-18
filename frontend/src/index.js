const roomsList = document.querySelector('#rooms-list')
const usersList = document.querySelector('#users-list')
const showPage = document.querySelector('#main')

// ROOM FUNCTIONS

function showRoomInList(room) {
    const roomEl = document.createElement('div')
    roomEl.className = `room-${room.id}`
    roomEl.innerHTML = `
    <h4 id="room-list-name">${room.name} </h4>
    `
    roomsList.appendChild(roomEl)

    const roomListEl = roomEl.querySelector('#room-list-name')
    roomListEl.addEventListener('click', () => {
        showRoomInfo(room)
    })
}

async function showRoomInfo(room) {
    const bookings = await getBookings()
    const users = await getUsers()
    showPage.innerHTML = ''
    const roomInfo = document.createElement('div')
    roomInfo.className = "room-info-and-booking"
    roomInfo.innerHTML = `
        <h2> Listing name: ${room.name} </h2><br>
        <h3> Hosted by: ${room.host.name}</h3><br>    
        <h4> Description: ${room.description}</h4>
<!--    <button id="delete-room">Delete Listing</button>
        <button id="edit-room">Edit Listing</button>     -->
        <ul id="guests-list"> <h3>Booked by:</h3> ${bookings.map(booking => {
        if (booking.room.id === room.id) {
            return (`<li>${booking.guest.name}</li>`)
        }
    }).join('')} </ul>
        <form id="new-booking">
        <select name="username">
        ${users.map(user => {
        return (`<option value =${user.id}>${user.name}</option>`)
    })}
        </select>
        <input type="submit" value="Book Now"/>
        </form>
    `
    showPage.appendChild(roomInfo)

    const guestsList = showPage.querySelector("#guests-list")
    const submitNewBooking = showPage.querySelector("#new-booking")

    submitNewBooking.addEventListener('submit', (event) => {
        event.preventDefault()
        const booking = {
            room_id: room.id,
            user_id: submitNewBooking.children.username.value
        }

        let newGuest = users.find(user => user.id === parseInt(submitNewBooking.children.username.value))
        let newGuestEl = document.createElement('li')
        newGuestEl.innerText = newGuest.name
        createBooking(booking)
            .then(guestsList.appendChild(newGuestEl))
    })


    // const deleteBookingBtn = showPage.querySelector('.delete-booking-30')
    // deleteBookingBtn.addEventListener('click', (event) => {
    // debugger
    // deleteBooking(booking)
    // })

}

async function newRoomForm() {
    const users = await getUsers()
    showPage.innerHTML = ''
    const roomForm = document.createElement('form')
    roomForm.id = "room-form"
    roomForm.innerHTML = `
        <p> Listing name: <input type="text" name="name" required placeholder="listing name"/><p>
        <p> Description: <input type="text" name="description" required placeholder="listing description"/><p>
        <p> Host: <select name="host">
        ${users.map(user => {
        return (`<option value=${user.id}>${user.name}</option>`)
    })}
        </select></p>
        <input type="submit" value="Add new listing"/>
    `
    showPage.appendChild(roomForm)

    const submitNewRoom = showPage.querySelector("#room-form")
    submitNewRoom.addEventListener('submit', (event) => {
        event.preventDefault()
        const room = {
            name: submitNewRoom.name.value,
            description: submitNewRoom.description.value,
            user_id: parseInt(submitNewRoom.host.value)
        }
        createRoom(room)
            .then(showRoomInList)
        submitNewRoom.reset()
    })
}

// USERS FUNCTIONS

function showUserInList(user) {
    const userEl = document.createElement('div')
    userEl.className = `user-${user.id}`
    userEl.innerHTML = `
    <h4 id="user-list-name">${user.name} </h4>
    `
    usersList.appendChild(userEl)

    const userListEl = userEl.querySelector('#user-list-name')
    userListEl.addEventListener('click', () => {
        showUserInfo(user)
    })
}

async function showUserInfo(user) {
    const rooms = await getRooms()
    showPage.innerHTML = ''
    const userInfo = document.createElement('div')
    userInfo.className = "user-info-and-create-listing"
    userInfo.innerHTML = `
        <h2>Name: ${user.name} </h2><br>
        <h3>Username: ${user.username} </h3><br>
        <button id="delete-user">Delete User</button>
        <button id="edit-user">Edit User</button>
        <ul id="listings"> <h3>User Listings: </h3>${rooms.map(room => {
        if (room.host.username === user.username) {
            return (`<li>${room.name}</li>`)
        }
    }).join('')}
        </ul>
        <ul id="bookings"> <h3>User Bookings: </h3>${rooms.map(room => {
        return room.guests.map(guest => {
            if (guest.username === user.username) {
                return (`<li>${room.name}</li>`)
            }
        }).join('')
    }).join('')}
        </ul>
    `
    showPage.appendChild(userInfo)

    userEl = usersList.querySelector(`.user-${user.id}`)

    const deleteUserBtn = showPage.querySelector("#delete-user")
    deleteUserBtn.addEventListener('click', () => {
        deleteUser(user)
            .then((resp) => {
                if (resp.message === 'deleted') {
                    userEl.remove()
                    showPage.innerHTML = `User ${user.username} has been deleted`
                } else {
                    showPage.innerHTML = `You can't delete user ${user.username}!`
                }
            })
    })

    const editUserBtn = showPage.querySelector("#edit-user")
    editUserBtn.addEventListener('click', () => {
        showPage.innerHTML = ''
        const editUserForm = document.createElement('form')
        editUserForm.id = "edit-user-form"
        editUserForm.innerHTML = `
        <p>Name: <input type="text" name="name" required value="${user.name}"/></p>
        <p>Username: <input type="text" name="username" required value="${user.username}"/></p>
        <input type="submit" value="Update user"/>
        `
        showPage.appendChild(editUserForm)

        let editForm = showPage.querySelector("#edit-user-form")
        editForm.addEventListener('submit', (event) => {
            event.preventDefault()
            newUser = {
                id: user.id,
                name: editForm.name.value,
                username: editForm.username.value
            }
            updateUser(newUser)
                .then(showPage.innerHTML = `<h3>User has been updated</h3>`)
            user.username = editForm.username.value

        })

    })
}

function newUserForm() {
    showPage.innerHTML = ''
    const userForm = document.createElement('form')
    userForm.id = "user-form"
    userForm.innerHTML = `
    <p>Name: <input type="text" name="name" required placeholder="name"/></p>
    <p>Username: <input type="text" name="username" required placeholder="username"/></p>
    <input type="submit" value="Create new user"/>
    `
    showPage.appendChild(userForm)

    const submitNewUser = showPage.querySelector("#user-form")
    submitNewUser.addEventListener('submit', (event) => {
        event.preventDefault()
        const user = {
            name: submitNewUser.name.value,
            username: submitNewUser.username.value
        }
        createUser(user)
            .then(showUserInList)
        submitNewUser.reset()
    })

}

// MAIN FUNCTIONS

function init() {
    getRooms()
        .then(rooms => rooms.forEach(showRoomInList))


    getUsers()
        .then(users => users.forEach(showUserInList))
}

init()

// OTHER THINGS

// async function newBookingForm() {
//     const users = await getUsers()
//     const rooms = await getRooms()
//     showPage.innerHTML = ''
//     const bookingForm = document.createElement('form')
//     bookingForm.id = "booking-form"
//     bookingForm.innerHTML = `
//     <select name="room">
//     ${rooms.map(room => {
//         return (`<option value=${room.id}>${room.name}</option>`)
//     })}
//     </select><br/>
//     <select name="user">
//     ${users.map(user => {
//         return (`<option value=${user.id}>${user.name}</option>`)
//     })}
//     </select><br/>
//     <input type="submit" value="Submit"/>
//     `
//     showPage.appendChild(bookingForm)

//     const submitNewBooking = showPage.querySelector("#booking-form")
//     submitNewBooking.addEventListener('submit', (event) => {
//         event.preventDefault()
//         const booking = {
//             user_id: parseInt(submitNewBooking.user.value),
//             room_id: parseInt(submitNewBooking.room.value)
//         }
//         createBooking(booking)
//         .then(getBookings())
//     })
// }

// function addNewBooking(user, room) {
//      booking = {
//         user_id: user.id,
//         room_id: room.id
//     }
//     createBooking(booking)
// }
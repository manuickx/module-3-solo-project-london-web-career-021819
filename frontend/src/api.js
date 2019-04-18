// URL LIST

usersUrl = "http://localhost:3000/users"
roomsUrl = "http://localhost:3000/rooms"
bookingsUrl = "http://localhost:3000/bookings"

// USER API FUNCTIONS

async function getUsers() {
    let response = await fetch(usersUrl)
    const users = await response.json()
    return users
}

function createUser(user) {
    return fetch(usersUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    }).then(resp => resp.json())
}

function updateUser(user) {
    return fetch(usersUrl + `/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then(resp => resp.json())
}

function deleteUser(user) {
    return fetch(usersUrl + `/${user.id}`, {
		method: 'DELETE'
    }).then(resp => resp.json())
}

// ROOM API FUNCTIONS

async function getRooms() {
    let response = await fetch(roomsUrl)
    const rooms = await response.json()
    return rooms
}

function createRoom(room) {
    return fetch(roomsUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(room)
    }).then(resp => resp.json())
}

function updateRoom(room) {
    return fetch(usersUrl + `/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then(resp => resp.json())
}

function deleteRoom(room) {
    return fetch(roomsUrl + `/${room.id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
}

// BOOKING API FUNCTIONS

async function getBookings() {
    let response = await fetch(bookingsUrl)
    const bookings = await response.json()
    return bookings
}

function createBooking(booking) {
    return fetch(bookingsUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(booking)
    }).then(resp => resp.json())  
}

function deleteBooking(booking) {
    return fetch(bookingsUrl + `/${booking.id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
}



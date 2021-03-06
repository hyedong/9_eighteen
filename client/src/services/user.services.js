export const userService = {
    signin,
    signup,
    signout,
    updateUser
}

const baseURL = 'http://localhost:8000'

function signin(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    }
    return fetch(`${baseURL}/api/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if(user.token) {
                localStorage.setItem('user', JSON.stringify(user))
            }
            return user;
        })
}

function signup(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    }
    return fetch(`${baseURL}/api/signup`, requestOptions).then(handleResponse)
}

function updateUser(user) {
    const requestOptions= {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    }
    return fetch(`${baseURL}/api/updateUser/${user._id}`, requestOptions).then(handleResponse)
}

function signout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            if(response.status === 401) {
                console.log('401')
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error)
        }
        return data
    })
}
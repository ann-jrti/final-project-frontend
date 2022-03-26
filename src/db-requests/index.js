export const getUserAccountInfo = async (email) => {
    const response = await fetch(`http://localhost:4000/users/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })
    const data = await response.json();
    return data

    // fetch(`http://localhost:4000/users/${email}`,
    //     {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `bearer ${localStorage.getItem('login-token')}`
    //         }
    //     })
    //     .then(res => res.json)
    //     .then(data => console.log(data))
}

export const getUserLolAccountData = async (email) => {
    console.log(localStorage.getItem('login-token'));
    const response = await fetch(`http://localhost:4000/users/custom-profile/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })
    const data = await response.json();
    return data
}
export const createsProfileUserInDB = async ({ stats, infoAccount, seasonInfo, champs, roles, mostPlayedRole }) => {
    console.log(stats);
    const body = {
        ...stats,
        ...infoAccount,
        ...seasonInfo,
        ...champs,
        ...roles,
        ...mostPlayedRole,
        email: localStorage.getItem('email')
    }
    const response = await fetch('http://localhost:4000/users/custom-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('login-token')}`
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    console.log(data);
}

export const getIfCustomProfileIsCreated = async (email) => {
    const response = await fetch(`http://localhost:4000/users/${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('login-token')}`
        }
    })
    const data = await response.json()
    return data;
}

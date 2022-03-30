export const getUserAccountInfo = async (email) => {
    const response = await fetch(`http://localhost:4000/users/`,
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

export const postPlayerOffer = async (role, playerDescription, lookingFor) => {
    const body = {
        role,
        playerDescription,
        lookingFor
    }
    const response = await fetch('http://localhost:4000/players-pool', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('login-token')}`
        },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        localStorage.setItem('player-offer', true)
    }
    const playerPool = await response.json();

    return playerPool;
}

export const postProfileUser = async ({ stats, infoAccount, seasonInfo, champs, roles, mostPlayedRole, date }) => {
    const body = {
        ...stats,
        ...infoAccount,
        ...seasonInfo,
        ...champs,
        ...roles,
        ...mostPlayedRole,
        date,
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
    return data;
}

export const doesPlayerHaveOfferPublished = async () => {
    const response = await fetch('http://localhost:4000/players-pool/player-offer', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('login-token')}`
        }
    })
    if (response.ok) localStorage.setItem('player-offer', true)
    else localStorage.setItem('player-offer', false)
    const data = await response.json();
}

export const login = async (email, password) => {

    const loginResponse = fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (!loginResponse.ok) return Error(t('login.login-error-msg'));
    const data = loginResponse.json();
    doesPlayerHaveOfferPublished();
    localStorage.setItem('login-token', data.access_token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('username', data.username);
    localStorage.setItem('summoner-icon', 'https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/1.png')
    localStorage.setItem('logged', true);
    return null;
}

export const getPlayersPool = async () => {
    const response = await fetch('http://localhost:4000/players-pool', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('login-token')}`
        }
    })
    const data = await response.json();
    return data;
}

export const register = async (user) => {
    const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) return t('signup.signup-error-msg');

    return null;
}

export const getArt = async () => {
    const response = await fetch(`http://localhost:4000/artwork?email=${localStorage.getItem('email')}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })
    const data = await response.json();
    return data;
}

export const deleteArtWork = async (id, b) => {
    const response = await fetch(`http://localhost:4000/artwork/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('login-token')}`
            }
        })
    return response;
}

export const uploadArtwork = async () => { }
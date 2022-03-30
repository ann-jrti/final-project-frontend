export const getUserAccountInfo = async (email) => {
  const response = await fetch(`http://localhost:4000/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('login-token')}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getUserLolAccountData = async (email) => {
  console.log(localStorage.getItem('login-token'));
  const response = await fetch(`http://localhost:4000/users/custom-profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('login-token')}`,
    },
  });
  const data = await response.json();
  return data;
};

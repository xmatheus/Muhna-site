export const TOKEN_KEY = '@muhna-Token';
export const USER_DATA = '@muhna-user-data';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    console.log('-> login aprovado');
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const saveData = data => {
    const dt = JSON.stringify(data);
    localStorage.setItem(USER_DATA, dt);
};

export const getData = () => {
    const dt = JSON.parse(localStorage.getItem(USER_DATA));
    return dt;
};

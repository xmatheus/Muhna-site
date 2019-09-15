import api from './api';

export const TOKEN_KEY = '@muhna-Token';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    console.log('login');
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const oldisAuthenticated = async () => {
    const token = localStorage.getItem('token');

    if (token !== (undefined && null)) {
        const config = {
            headers: { Authorization: 'Bearer ' + token }
        };

        const bodyParameters = {
            key: 'value'
        };
        try {
            const resposta = await api.post(
                '/auth/verify',
                bodyParameters,
                config
            );
            if (resposta.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
};

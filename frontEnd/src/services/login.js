import { api } from './api.js'

export async function LogarUsuario(data) {
    try {
        const res = await api.post(`/login`, data);
        return res.data;
    } catch (error) {
        console.log('Erro ao logar', error)
    }


}

export async function esqueciSenha(data) {
    try {
        const res = await api.post('/login/esqueci_senha', data);
        return res.data;
    } catch (error) {
        console.log('Erro ao recuperar senha', error)
    }

}


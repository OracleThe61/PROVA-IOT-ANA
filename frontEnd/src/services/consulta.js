import { api } from './api.js'

export async function getConsultas() {
    const res = await api.get("/consulta")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function postConsultas(consulta) {
    const res = await api.post("/consulta", consulta)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function patchConsultas(id, consulta) {
    const res = await api.patch(`/consulta/${id}`, consulta);

    let r = "";
    if (res.status === 200) {
        r = res.message;
    }
    return r;
}

export async function deleteConsultas(id) {
    const res = await api.delete(`/consulta/${id}`);

    let r = "";
    if (res.status === 200) {
        r = res.message;
    }
    return r;
}




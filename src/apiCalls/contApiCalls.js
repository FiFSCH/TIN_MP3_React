import {getCurrentUser} from "../helpers/authHelper";

const contsBaseUrl = 'http://localhost:3000/api/contracts'

const getContsApiCall = () => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const options = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(contsBaseUrl, options);
}
const getContByIdApiCall = id => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const options = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(`${contsBaseUrl}/${id}`, options);
}

const addContApiCall = cont => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const contString = JSON.stringify(cont);
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: contString
    }
    const promise = fetch(contsBaseUrl, options);
    return promise;
}
const updateContApiCall = (contId, cont) => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const url = `${contsBaseUrl}/${contId}`;
    const contString = JSON.stringify(cont);
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: contString
    }
    const promise = fetch(url, options);
    return promise;
}
const deleteContApiCall = contId => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const options = {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(`${contsBaseUrl}/${contId}`, options);
}
export {getContByIdApiCall, getContsApiCall, addContApiCall, updateContApiCall, deleteContApiCall}
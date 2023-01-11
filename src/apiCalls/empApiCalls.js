import {getCurrentUser} from "../helpers/authHelper";

const empsBaseUrl = 'http://localhost:3000/api/employees';

const getEmpsApiCall = () => {
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
    return fetch(empsBaseUrl, options);
};
const getEmpByIdApiCall = (id) => {
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
    return fetch(`${empsBaseUrl}/${id}`, options);
}

const addEmployeeApiCall = emp => {
    const empString = JSON.stringify(emp);
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: empString
    }
    const promise = fetch(empsBaseUrl, options);
    return promise;
}
const updateEmpApiCall = (empId, emp) => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const url = `${empsBaseUrl}/${empId}`;
    const empString = JSON.stringify(emp);
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: empString
    }
    const promise = fetch(url, options);
    return promise;
}
const deleteEmpApiCall = (empId) => {
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
    return fetch(`${empsBaseUrl}/${empId}`, options)
}

export {getEmpsApiCall, getEmpByIdApiCall, addEmployeeApiCall, updateEmpApiCall, deleteEmpApiCall};
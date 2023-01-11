import {getCurrentUser} from "../helpers/authHelper";

const deptsBaseUrl = 'http://localhost:3000/api/departments';

const getDeptsApiCall = () => fetch(deptsBaseUrl);
const getDeptByIdApiCall = id => {
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
    return fetch(`${deptsBaseUrl}/${id}`, options);
}
const addDeptApiCall = dept => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const deptString = JSON.stringify(dept);
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: deptString
    }
    const promise = fetch(deptsBaseUrl, options);
    return promise;
}
const updateDeptApiCall = (deptId, dept) => {
    const user = getCurrentUser();
    let token;
    if (user && user.token)
        token = user.token;
    const url = `${deptsBaseUrl}/${deptId}`;
    const deptString = JSON.stringify(dept);
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: deptString
    }
    const promise = fetch(url, options);
    return promise;
}
const deleteDeptApiCall = deptId => {
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

    return fetch(`${deptsBaseUrl}/${deptId}`, options)
}

export {getDeptsApiCall, getDeptByIdApiCall, addDeptApiCall, updateDeptApiCall, deleteDeptApiCall};
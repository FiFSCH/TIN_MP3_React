const deptsBaseUrl = 'http://localhost:3000/api/departments';

const getDeptsApiCall = () => fetch(deptsBaseUrl);
const getDeptByIdApiCall = id => fetch(`${deptsBaseUrl}/${id}`);
const addDeptApiCall = dept => {
    const deptString = JSON.stringify(dept);
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: deptString
    }
    const promise = fetch(deptsBaseUrl, options);
    return promise;
}
const updateDeptApiCall = (deptId,dept) => {
    const url = `${deptsBaseUrl}/${deptId}`;
    const deptString = JSON.stringify(dept);
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: deptString
    }
    const promise = fetch(url, options);
    return promise;
}
const deleteDeptApiCall = deptId => fetch(`${deptsBaseUrl}/${deptId}`,{method: 'DELETE'})

export {getDeptsApiCall, getDeptByIdApiCall,addDeptApiCall,updateDeptApiCall,deleteDeptApiCall};
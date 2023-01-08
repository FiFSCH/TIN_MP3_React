const empsBaseUrl = 'http://localhost:3000/api/employees';

const getEmpsApiCall = () => fetch(empsBaseUrl);
const getEmpByIdApiCall = id => fetch(`${empsBaseUrl}/${id}`);

const addEmployeeApiCall = emp => {
    const empString = JSON.stringify(emp);
    console.log('emp',emp);
    console.log('string',empString)
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(empsBaseUrl, options);
    return promise;
}
const updateEmpApiCall = (empId,emp) => {
    const url = `${empsBaseUrl}/${empId}`;
    const empString = JSON.stringify(emp);
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(url, options);
    return promise;
}
const deleteEmpApiCall = empId => fetch(`${empsBaseUrl}/${empId}`,{method: 'DELETE'})

export {getEmpsApiCall, getEmpByIdApiCall, addEmployeeApiCall, updateEmpApiCall,deleteEmpApiCall};
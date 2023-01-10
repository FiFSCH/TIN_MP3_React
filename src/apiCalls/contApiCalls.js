const contsBaseUrl = 'http://localhost:3000/api/contracts'

const getContsApiCall = () => fetch(contsBaseUrl);
const getContByIdApiCall = id => fetch(`${contsBaseUrl}/${id}`)

const addContApiCall = cont => {
    const contString = JSON.stringify(cont);
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: contString
    }
    const promise = fetch(contsBaseUrl, options);
    return promise;
}
const updateContApiCall = (contId,cont) => {
    const url = `${contsBaseUrl}/${contId}`;
    const contString = JSON.stringify(cont);
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: contString
    }
    const promise = fetch(url, options);
    return promise;
}
const deleteContApiCall = contId => fetch(`${contsBaseUrl}/${contId}`,{method: 'DELETE'})
export {getContByIdApiCall, getContsApiCall,addContApiCall,updateContApiCall,deleteContApiCall}
const contsBaseUrl = 'http://localhost:3000/api/contracts'

const getContsApiCall = () => fetch(contsBaseUrl);
const getContByIdApiCall = id => fetch(`${contsBaseUrl}/${id}`)
export {getContByIdApiCall, getContsApiCall}
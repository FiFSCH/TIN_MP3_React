const deptsBaseUrl = 'http://localhost:3000/api/departments';

const getDeptsApiCall = () => fetch(deptsBaseUrl);
const getDeptByIdApiCall = id => fetch(`${deptsBaseUrl}/${id}`);

export {getDeptsApiCall, getDeptByIdApiCall};
import {empList, empDetailsList} from "./empApiMockData";

const getEmpsApiCall = () => empList;
const getEmpByIdApiCall = id => empDetailsList.find(emp => emp.id === id);

export {getEmpsApiCall, getEmpByIdApiCall};
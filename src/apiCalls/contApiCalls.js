import {contList, contDetailsList} from "./contApiMockData";

const getContsApiCall = () => contList;
const getContByIdApiCall = id => contDetailsList.find(cont => cont.id === id);
export {getContByIdApiCall, getContsApiCall}
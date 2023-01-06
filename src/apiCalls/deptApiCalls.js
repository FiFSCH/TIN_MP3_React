import {deptList, deptDetailsList} from "./deptApiMockData";

const getDeptsApiCall = () => deptList;
const getDeptByIdApiCall = id => deptDetailsList.find(dept => dept.id === id);

export {getDeptsApiCall, getDeptByIdApiCall};
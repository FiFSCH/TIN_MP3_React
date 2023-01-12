const getCurrentUser = () => JSON.parse(sessionStorage.getItem('user'));
const isAuthenticated = () => {
    const user = getCurrentUser();
    return !!user;

}
export {getCurrentUser, isAuthenticated};
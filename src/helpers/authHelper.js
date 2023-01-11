const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));
const isAuthenticated = () => {
    const user = getCurrentUser();
    return !!user;

}
export {getCurrentUser, isAuthenticated};
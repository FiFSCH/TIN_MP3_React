const getFormattedDate = (sourceDate) => {
    const dateObject = new Date(sourceDate);
    return dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2);
}
export {getFormattedDate};
const addDateSuffix = (date) => {
    const lastChar = date.toString().slice(-1);
    return `${date}${['st', 'nd', 'rd'][lastChar] || 'th'}`;
   };
   
   module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => monthLength === 'short' ? month : month.charAt(0) + month.slice(1).toLowerCase());
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
   
    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
   };
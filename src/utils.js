export const getPrettyDate = date => {
    const fullDate = new Date(date);
    const month = fullDate.getUTCMonth();
    const day = fullDate.getUTCDate();
    const year = fullDate.getUTCFullYear();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    return `${months[month]} ${day}, ${year}`;
};
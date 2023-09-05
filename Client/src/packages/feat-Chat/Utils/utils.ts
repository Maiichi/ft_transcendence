

export const changeMessageLength =(message: string) =>
{
    if (message.length > 60)
    {
    message = message.substring(0,60);
    return (message + "...");
    }
    return message;
}

// function to change date format
export const convertDateTime = (dateString: string): string =>
{
    const now = new Date();
    const inputDate = new Date(dateString);

    const isSameDate = now.toDateString() === inputDate.toDateString();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === inputDate.toDateString();

    if (isSameDate) {
        const hours = inputDate.getHours().toString().padStart(2, '0');
        const minutes = inputDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else if (isYesterday) {
        return `yesterday`;
    } else {
        const year = inputDate.getFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDate.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
}
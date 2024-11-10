export default class Utils {

    static getIndiaTime = (getDate) => {
        if (getDate) {
            const formattedDate = new Date(getDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            const formattedTime = new Date(getDate).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            const indianDateTime = `${formattedDate}, ${formattedTime}`;
            return indianDateTime;
        }
        const date = new Date();
        const options = { timeZone: "Asia/Kolkata", hour12: true, hour: "numeric", minute: "numeric" };
        return date.toLocaleString("en-IN", options);
    }
}

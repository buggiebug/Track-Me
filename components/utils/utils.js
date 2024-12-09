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


    static compareObject(obj1, obj2) {
        if (obj1 === obj2) return true;
    
        if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 == null || obj2 == null) {
            return false;
        }
    
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
    
        if (keys1.length !== keys2.length) return false;
    
        for (const key of keys1) {
            if (!keys2.includes(key) || !this.compareObject(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }
}

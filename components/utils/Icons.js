import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faIndianRupeeSign, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import FontIcon from 'react-native-vector-icons/FontAwesome';

export default Icon = (name, styles) => {
    switch (name) {
        case "home":
            return <FontIcon name="home" style={styles} />
        case "plus":
            return <FontIcon name="plus-circle" style={styles} />
        case "profile":
            return <FontAwesomeIcon icon={faUser} style={styles} />
        case "rupee":
            return <FontAwesomeIcon icon={faIndianRupeeSign} style={styles} />
        case "sync":
            return <FontAwesomeIcon icon={faSpinner} style={styles} />
        default:
            return null;
    }
}

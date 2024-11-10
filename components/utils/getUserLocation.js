import * as Location from 'expo-location';

export default getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return {latitude, longitude};
}

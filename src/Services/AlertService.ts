import {Alert} from 'react-native';

export function showAlert(title: string, body: string) {
    Alert.alert(title, body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], {
        cancelable: false,
    });
}

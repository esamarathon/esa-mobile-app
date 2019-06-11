import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
AppRegistry.registerComponent(appName, () => App);

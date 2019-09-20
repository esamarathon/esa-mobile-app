import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ScheduleScreen} from './Screens/Schedule';
import {HomeScreen} from './Screens/Home';

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Schedule: {
            screen: ScheduleScreen,
        },
    },
    {
        initialRouteName: 'Home',
        contentOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#888',
        },
        drawerType: 'back',
    },
);

export const App = createAppContainer(DrawerNavigator);

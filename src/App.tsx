import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {SidebarContent} from './Components/Sidebar/Sidebar';

// Screens
import HomeScreen from './Screens/Home';
import ScheduleScreen from './Screens/Schedule';

const MainNavigation = createDrawerNavigator(
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
        contentComponent: SidebarContent,
    },
);

export const App = createAppContainer(MainNavigation);

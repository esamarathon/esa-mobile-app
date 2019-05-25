import React from 'react';
import {createAppContainer} from 'react-navigation';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ThemeContext = React.createContext<{theme: 'default' | 'summer' | 'winter'}>({
    theme: 'default',
});

Icon.loadFont();

const Navigation = createAppContainer(TabNavigator);

export default class AppContainer extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value={{theme: 'default'}}>
                <Navigation screenProps={{theme: 'default'}} />
            </ThemeContext.Provider>
        );
    }
}

import mocks from 'react-native-jest-mocks';

jest.mock('react-native-vector-icons/FontAwesome', () => ({loadFont: () => null}));
jest.mock('react-native-vector-icons/Feather', () => ({loadFont: () => null}));

jest.mock('NativeModules', () => ({
    UIManager: {
        RCTView: () => {},
    },
    RNGestureHandlerModule: {
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
        State: {},
        Directions: {},
    },
}));

jest.mock('react-navigation', () => ({
    createAppContainer: jest.fn().mockReturnValue(function NavigationContainer(props) {
        return null;
    }),
    createDrawerNavigator: jest.fn(),
    createBottomTabNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
        push: jest.fn().mockImplementation((x) => ({...x, type: 'Navigation/PUSH'})),
        replace: jest.fn().mockImplementation((x) => ({...x, type: 'Navigation/REPLACE'})),
    },
    NavigationActions: {
        navigate: jest.fn().mockImplementation((x) => x),
    },
}));

mocks.initAll();

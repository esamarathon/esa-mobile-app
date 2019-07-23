import mocks from 'react-native-jest-mocks';
import MockAsyncStorage from 'mock-async-storage';

jest.useFakeTimers();

jest.mock('react-native-vector-icons/FontAwesome', () => ({loadFont: () => null}));
jest.mock('react-native-vector-icons/Feather', () => ({loadFont: () => null}));

jest.mock('@react-native-community/async-storage', () => new MockAsyncStorage());

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

jest.mock('react-native-firebase', () => ({
    messaging: jest.fn(() => ({
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('myMockToken')),
        onTokenRefresh: jest.fn(() => Promise.resolve('myMockToken')),
        onMessage: jest.fn(),
    })),
    notifications: jest.fn(() => ({
        onNotification: jest.fn(),
        getInitialNotification: jest.fn(),
        onNotificationOpened: jest.fn(),
        onNotificationDisplayed: jest.fn(),
        android: {
            createChannel: jest.fn(),
        },
    })),
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

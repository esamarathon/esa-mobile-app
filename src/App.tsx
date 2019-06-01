import React, {Component} from 'react';
import {Alert} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';
import {IEvent, LoadEvents} from './Services/EventsService';

interface IProps {}

interface IState {
    events: IEvent[];
    preferredEvent: IEvent;
    loading: boolean;
}

export const EventContext = React.createContext({
    event: {},
    updateEvent: {},
});

Icon.loadFont();

const Navigation = createAppContainer(TabNavigator);

export default class AppContainer extends Component<IProps, IState> {
    state = {
        events: [],
        preferredEvent: {},
        loading: true,
    };

    async componentDidMount() {
        LoadEvents()
            .then((res: IEvent[]) => {
                this.setState({
                    events: res,
                    preferredEvent: res[0],
                    loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        this.checkPermission();
        this.createNotificationListeners();
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
         * Triggered when a particular notification has been received in foreground
         * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const {title, body} = notification;
            this.showAlert(title, body);
        });

        /*
         * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
         * */
        this.notificationOpenedListener = firebase
            .notifications()
            .onNotificationOpened((notificationOpen) => {
                const {title, body} = notificationOpen.notification;
                this.showAlert(title, body);
            });

        /*
         * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
         * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const {title, body} = notificationOpen.notification;
            this.showAlert(title, body);
        }
        /*
         * Triggered for data only payload in foreground
         * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    showAlert(title, body) {
        Alert.alert(title, body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], {
            cancelable: false,
        });
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    updateEvent = (item: IEvent) => {
        this.setState({
            preferredEvent: item,
        });
    };

    render() {
        const {events, preferredEvent, loading} = this.state;

        return (
            <EventContext.Provider
                value={{
                    event: preferredEvent,
                    updateEvent: this.updateEvent,
                }}
            >
                <Navigation theme={preferredEvent} />
            </EventContext.Provider>
        );
    }
}

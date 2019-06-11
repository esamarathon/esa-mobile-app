import React, {Component} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {createAppContainer, NavigationContainer} from 'react-navigation';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import {IEvent, LoadEvents} from './Services/EventsService';

interface IState {
    events: IEvent[];
    preferredEvent: IEvent | undefined;
    loading: boolean;
    error: boolean;
}

interface IContext {
    event: IEvent;
    updateEvent: (event: IEvent) => void;
}

export const EventContext = React.createContext<IContext>({} as IContext);

const Navigation: NavigationContainer = createAppContainer(TabNavigator);

export default class AppContainer extends Component<{}, IState> {
    state: IState = {
        events: [],
        preferredEvent: undefined,
        loading: true,
        error: false,
    };

    updateEvent = (item: IEvent) => {
        this.setState({
            preferredEvent: item,
        });
    };

    componentDidMount() {
        LoadEvents()
            .then((res: IEvent[]) => {
                this.setState({
                    events: res,
                    preferredEvent: res[0],
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({
                    events: [],
                    preferredEvent: undefined,
                    error: true,
                    loading: false,
                });
            });
    }

    render() {
        const {preferredEvent, loading, error} = this.state;

        if (loading) {
            return <ActivityIndicator size="large" color="#ccc" />;
        }

        if (error) {
            return <Text>Something went wrong</Text>;
        }

        return (
            <EventContext.Provider
                value={{
                    event: preferredEvent as IEvent,
                    updateEvent: this.updateEvent,
                }}
            >
                <Navigation screenProps={{theme: preferredEvent as IEvent}} />
            </EventContext.Provider>
        );
    }
}

import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IEvent, LoadEvents} from './Services/EventsService';

interface IProps {
    theme: any;
}

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
            .catch((err) => {
                this.setState({
                    events: [],
                    preferredEvent: {},
                    loading: false,
                });
            });
    }

    render() {
        const {preferredEvent} = this.state;

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

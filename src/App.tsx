import React, {Component} from 'react';
import {createAppContainer, NavigationContainer} from 'react-navigation';
import {TabNavigator} from './Components/Navigation/MainNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IEvent, LoadEvents} from './Services/EventsService';

interface IState {
    events: IEvent[];
    preferredEvent: IEvent | undefined;
    loading: boolean;
}

interface IContext {
    event: IEvent;
    updateEvent: (event: IEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
export const EventContext = React.createContext<IContext>({} as IContext);

Icon.loadFont();

const Navigation: NavigationContainer = createAppContainer(TabNavigator);

export default class AppContainer extends Component {
    state: IState = {
        events: [],
        preferredEvent: undefined,
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
                    event: preferredEvent as IEvent,
                    updateEvent: this.updateEvent,
                }}
            >
                <Navigation screenProps={{theme: preferredEvent as IEvent}} />
            </EventContext.Provider>
        );
    }
}

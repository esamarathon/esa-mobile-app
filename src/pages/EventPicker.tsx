import React, {useContext} from 'react';
import {IonPage, IonGrid, IonRow, IonCol} from '@ionic/react';
import {EventContext} from '../App';
import Logo from '../assets/Logo';
import './EventPicker.css';

function EventPicker() {
  const eventContext = useContext(EventContext);

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol size="3" className="picker__logo-wrapper ion-align-self-center ion-text-center">
            <Logo height="120" width="120" />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h1 className="picker__title">Pick Event</h1>
          </IonCol>
        </IonRow>
        <IonRow className="picker__events">
          {eventContext.events ? (
            eventContext.events.map((event) => {
              return (
                <IonRow
                  key={event._id}
                  className="picker__event"
                  onClick={() => eventContext.updateEvent(event)}
                >
                  <span>{event.name}</span>
                </IonRow>
              );
            })
          ) : (
            <p>No Events</p>
          )}
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default EventPicker;

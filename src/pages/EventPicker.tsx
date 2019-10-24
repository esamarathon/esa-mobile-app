import React from 'react';
import {IonPage, IonGrid, IonRow, IonCol} from '@ionic/react';
import Logo from '../assets/Logo';
import './EventPicker.css';
import {IEvent} from '../services/EventService';

interface IProps {
  events: IEvent[];
  onPickEvent: (event: IEvent) => void;
}

function EventPicker({events, onPickEvent}: IProps) {
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
          {events ? (
            events.map((event) => (
              <IonRow key={event._id} className="picker__event" onClick={() => onPickEvent(event)}>
                <span>{event.name}</span>
              </IonRow>
            ))
          ) : (
            <p>No Events</p>
          )}
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default EventPicker;

import React from 'react';
import {IonPage} from '@ionic/react';
import styled from 'styled-components';
import Logo from '../assets/Logo';
import {IEvent} from '../services/EventService';

const Page = styled(IonPage)`
  background: #fff;
  justify-content: flex-start !important;
`;

const LogoWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  text-align: center;
  margin: 40px 0;
`;

const EventWrapper = styled.div`
  width: calc(100% - 20px);
  align-self: flex-end;
`;

const Event = styled.div`
  width: 100%;
  height: 70px;
  margin-bottom: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  background: #eeeeee;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

interface IProps {
  events: IEvent[];
  onPickEvent: (event: IEvent) => void;
}

function EventPickerPage({events, onPickEvent}: IProps) {
  return (
    <Page>
      <LogoWrapper>
        <Logo height="120" width="120" />
      </LogoWrapper>
      <Title>Pick Event</Title>
      {events ? (
        <EventWrapper>
          {events.map((event) => (
            <Event key={event._id} onClick={() => onPickEvent(event)}>
              <span>{event.name}</span>
            </Event>
          ))}
        </EventWrapper>
      ) : (
        <p>No Events</p>
      )}
    </Page>
  );
}

export default EventPickerPage;

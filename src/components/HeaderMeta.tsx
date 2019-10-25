import React from 'react';
import {IonCol, IonGrid, IonRow} from '@ionic/react';
import styled from 'styled-components';
import Logo from '../assets/Logo';
import HeaderMetaRow from './HeaderMetaRow';
import HeaderMetaList, {HeaderLinks} from './HeaderMetaList';
import {IEvent} from '../services/EventService';
import {longDateRange} from '../services/DateFormatService';

const Title = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: var(--ion-color-secondary);
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  margin: 0;
`;

const StyledLogo = styled(Logo)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
`;

interface IProps {
  event: IEvent;
  isExpanded: boolean;
}

function HeaderMeta({event, isExpanded}: IProps) {
  return (
    <IonGrid>
      {isExpanded ? (
        <React.Fragment>
          <IonRow>
            <IonCol size="12" className="ion-align-self-start ion-text-center">
              <StyledLogo height="55" width="55" />
            </IonCol>
          </IonRow>
          <HeaderMetaRow title="Date" content={longDateRange(event.startDate, event.endDate)} />
          <HeaderMetaRow title="Cause" content={event.meta.cause.name} />
          <HeaderMetaRow
            title="Location"
            content={`${event.meta.venue.name} in ${event.meta.venue.city}, ${event.meta.venue.country}`}
          />
          <HeaderMetaRow title="Stream" content={`twitch.tv/${event.meta.twitchChannel}`} link />
          <HeaderMetaList>
            <HeaderLinks href="https://google.com">Master Post</HeaderLinks>
            <HeaderLinks href="https://google.com">Code of Conduct</HeaderLinks>
            <HeaderLinks href="https://google.com">Attendee Guide</HeaderLinks>
          </HeaderMetaList>
        </React.Fragment>
      ) : (
        <IonRow>
          <IonCol size="3" className="ion-align-self-start ion-text-center">
            <StyledLogo height="55" width="55" />
          </IonCol>
          <IonCol size="9">
            <Title>{event.meta.cause.name}</Title>
            <Paragraph>{event.meta.venue.name}</Paragraph>
            <Paragraph>
              {event.meta.venue.city}, {event.meta.venue.country}
            </Paragraph>
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  );
}

export default HeaderMeta;

import {IonCol, IonGrid, IonRow} from '@ionic/react';
import Logo from '../assets/Logo';
import React from 'react';
import styled from 'styled-components';
import HeaderMetaRow from './HeaderMetaRow';
import HeaderMetaList, {HeaderLinks} from './HeaderMetaList';
import {IEvent} from '../services/EventService';

interface IProps {
  event: IEvent;
  isExpanded: boolean;
}

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

function HeaderMeta({event, isExpanded}: IProps) {
  return (
    <IonGrid>
      {isExpanded ? (
        <React.Fragment>
          <IonRow>
            <IonCol size="12" className="ion-align-self-start ion-text-center">
              <StyledLogo height="50" width="50" />
            </IonCol>
          </IonRow>
          <HeaderMetaRow title="Date" content="15 - 22 February 2020 (Sat - Sat)" />
          <HeaderMetaRow title="Cause" content={event.meta.cause.name} />
          <HeaderMetaRow
            title="Location"
            content={`${event.meta.venue.name} in ${event.meta.venue.city}, ${event.meta.venue.country}`}
          />
          <HeaderMetaRow title="Stream" content={`twitch.tv/${event.meta.twitchChannel}`} />
          <HeaderMetaList>
            <HeaderLinks href="https://google.com">Master Post</HeaderLinks>
            <HeaderLinks href="https://google.com">Code of Conduct</HeaderLinks>
            <HeaderLinks href="https://google.com">Attendee Guide</HeaderLinks>
          </HeaderMetaList>
        </React.Fragment>
      ) : (
        <IonRow>
          <IonCol size="3" className="ion-align-self-start ion-text-center">
            <StyledLogo height="50" width="50" />
          </IonCol>
          <IonCol size="9">
            <Title>Swedish Alzheimer’s Foundation</Title>
            <Paragraph>Quality Hotel View</Paragraph>
            <Paragraph>Malmö, SE</Paragraph>
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  );
}

export default HeaderMeta;

import {IonCol, IonGrid, IonRow} from '@ionic/react';
import Logo from '../assets/Logo';
import React from 'react';
import HeaderMetaRow from './HeaderMetaRow';
import HeaderMetaList, {HeaderLinks} from './HeaderMetaList';

interface IProps {
  isExpanded: boolean;
}

function HeaderMeta({isExpanded}: IProps) {
  return (
    <IonGrid>
      {isExpanded ? (
        <React.Fragment>
          <IonRow>
            <IonCol size="12" className="ion-align-self-start ion-text-center">
              <Logo height="50" width="50" />
            </IonCol>
          </IonRow>
          <HeaderMetaRow title="Date" content="15 - 22 February 2020 (Sat - Sat)" />
          <HeaderMetaRow title="Cause" content="Swedish Alzheimer’s Foundation" />
          <HeaderMetaRow title="Location" content="Quality Hotel View in Malmö, Sweden" />
          <HeaderMetaRow title="Stream" content="Twitch.tv/esamarathon" />
          <HeaderMetaList>
            <HeaderLinks href="https://google.com">yeet</HeaderLinks>
            <HeaderLinks href="https://google.com">yeet</HeaderLinks>
            <HeaderLinks href="https://google.com">yeet</HeaderLinks>
          </HeaderMetaList>
        </React.Fragment>
      ) : (
        <IonRow>
          <IonCol size="3" className="ion-align-self-start ion-text-center">
            <Logo height="50" width="50" />
          </IonCol>
          <IonCol size="9">
            <h2 className="hero__title">Swedish Alzheimer’s Foundation</h2>
            <p className="hero__paragraph">Quality Hotel View</p>
            <p className="hero__paragraph">Malmö, SE</p>
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  );
}

export default HeaderMeta;

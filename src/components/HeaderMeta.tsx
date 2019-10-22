import {IonCol, IonGrid, IonRow} from '@ionic/react';
import Logo from '../assets/Logo';
import React from 'react';

interface IProps {
  isExpanded: boolean;
}

function HeaderMeta({isExpanded}: IProps) {
  return (
    <IonGrid>
      {isExpanded ? (
        <p>expanded</p>
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

import React from 'react';
import {IonPage} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import Toolbar from '../components/Toolbar';

function SchedulePage(_: RouteComponentProps) {
  return (
    <IonPage>
      <Toolbar>Schedule</Toolbar>
    </IonPage>
  );
}

export default SchedulePage;

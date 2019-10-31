import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonMenuToggle,
} from '@ionic/react';
import React, {useContext} from 'react';
import {home, list} from 'ionicons/icons';
import {EventContext} from '../App';

function MenuBar() {
  const {updatePreferredEvent} = useContext(EventContext);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/home" routerDirection="none">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem onClick={() => updatePreferredEvent(undefined)} button routerDirection="none">
              <IonIcon slot="start" icon={list} />
              <IonLabel>Event Picker</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default MenuBar;

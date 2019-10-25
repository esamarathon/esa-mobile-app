import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, {useContext} from 'react';
import {home, list} from 'ionicons/icons';
import {EventContext} from '../App';

interface IAppPage {
  url: string;
  icon: object;
  title: string;
}

interface IAppAction {
  action: () => void;
  icon: object;
  title: string;
}

function Menu() {
  const {updatePreferredEvent} = useContext(EventContext);

  const appPages: (IAppPage | IAppAction)[] = [
    {
      title: 'Home',
      url: '/home',
      icon: home,
    },
    {
      title: 'Event Picker',
      action: () => updatePreferredEvent(undefined),
      icon: list,
    },
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {appPages.map(({title, icon, ...page}) => {
            const itemProps = 'url' in page ? {routerLink: page.url} : {onClick: page.action};

            return (
              <IonMenuToggle key={title} autoHide={false}>
                <IonItem {...itemProps} button routerDirection="none">
                  <IonIcon slot="start" icon={icon} />
                  <IonLabel>{title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default Menu;

import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
  } from '@ionic/react';
import React from 'react';
import './Home.css';
import Logo from "../assets/Logo";

function expandHeader(): any {
  console.log("Hello world");
}

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="hero__header">
        <IonToolbar className="hero__toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ESA Summer Marathon</IonTitle>
          <IonButtons slot="end">
            <IonIcon name="notifications-outline"></IonIcon>
          </IonButtons>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="3" className="ion-align-self-start ion-text-center">
              <Logo height={"50"} width={"50"} />
            </IonCol>
            <IonCol size="9">
              <h2 className="hero__title">Swedish Alzheimer’s Foundation</h2>
              <p className="hero__paragraph">Quality Hotel View</p>
              <p className="hero__paragraph">Malmö, SE</p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <button className="hero__expander" onClick={expandHeader}></button>
      </IonHeader>

      <IonContent>
        <div className="home-margin home-flex ion-align-items-center ion-justify-content-between">
          <div>
            <h2>Announcements</h2>
          </div>
          <div className="home-flex ion-align-self-stretch ion-align-items-center">
            <a className="home-link" href="https://google.com">Read More</a>
          </div>
        </div>
        <IonCard className="home-card">
          <IonCardHeader>
            <p className="home-card__title">ESA WINTER 2020 - MASTER POS</p>
            <p className="home-card__date">8/2 - 14:30</p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <p className="home-card__paragraph">ESA Winter 2020 has moved!. It will be held, just like summer, in the...</p>
                </IonCol>
                <IonCol size="2" className="home-flex ion-align-items-center ion-justify-content-end">
                  <p> > </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card">
          <IonCardHeader>
            <p className="home-card__title">ESA WINTER 2020 - MASTER POS</p>
            <p className="home-card__date">8/2 - 14:30</p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <p className="home-card__paragraph">ESA Winter 2020 has moved!. It will be held, just like summer, in the...</p>
                </IonCol>
                <IonCol size="2" className="home-flex ion-align-items-center ion-justify-content-end">
                  <p> > </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card">
          <IonCardHeader>
            <p className="home-card__title">ESA WINTER 2020 - MASTER POS</p>
            <p className="home-card__date">8/2 - 14:30</p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <p className="home-card__paragraph">ESA Winter 2020 has moved!. It will be held, just like summer, in the...</p>
                </IonCol>
                <IonCol size="2" className="home-flex ion-align-items-center ion-justify-content-end">
                  <p> > </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

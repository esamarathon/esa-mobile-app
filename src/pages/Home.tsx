import React, {useState} from 'react';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {NotificationIcon, ChevronRight, MenuIcon} from '../assets/Icons';
import './Home.css';
import HeaderMeta from '../components/HeaderMeta';

function HomePage() {
  const [isHeaderOpen, setHeaderOpen] = useState(false);

  function expandHeader() {
    setHeaderOpen((open) => !open);
  }

  function getHeaderClasses() {
    if (isHeaderOpen) {
      return 'hero__header hero__header--expanded';
    } else {
      return 'hero__header hero__header--collapsed';
    }
  }

  return (
    <IonPage>
      <IonHeader className={getHeaderClasses()}>
        <IonToolbar className="hero__toolbar">
          <IonButtons slot="start">
            <IonMenuButton>
              <MenuIcon />
            </IonMenuButton>
          </IonButtons>
          <IonTitle>ESA Summer Marathon</IonTitle>
          <IonButtons slot="end">
            <NotificationIcon className="hero__icon" />
          </IonButtons>
        </IonToolbar>
        <HeaderMeta isExpanded={isHeaderOpen} />
        <button className="hero__expander" onClick={expandHeader} />
      </IonHeader>

      <IonContent>
        <div className="home-margin home-flex ion-align-items-center ion-justify-content-between">
          <div>
            <h2 className="home__heading">Announcements</h2>
          </div>
          <div className="home-flex ion-align-self-stretch ion-align-items-center">
            <a className="home-link" href="https://google.com">
              More <ChevronRight />
            </a>
          </div>
        </div>
        <IonCard className="home-card">
          <IonCardHeader>
            <p className="home-card__title">ESA WINTER 2020 - MASTER POS</p>
            <p className="home-card__date">8/2 - 14:30</p>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol className="ion-no-padding">
                  <p className="home-card__paragraph">
                    ESA Winter 2020 has moved!. It will be held, just like summer, in the...
                  </p>
                </IonCol>
                <IonCol
                  size="2"
                  className="home-flex ion-align-items-center ion-justify-content-end"
                >
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
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol className="ion-no-padding">
                  <p className="home-card__paragraph">
                    ESA Winter 2020 has moved!. It will be held, just like summer, in the...
                  </p>
                </IonCol>
                <IonCol
                  size="2"
                  className="home-flex ion-align-items-center ion-justify-content-end"
                >
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
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol className="ion-no-padding">
                  <p className="home-card__paragraph">
                    ESA Winter 2020 has moved!. It will be held, just like summer, in the...
                  </p>
                </IonCol>
                <IonCol
                  size="2"
                  className="home-flex ion-align-items-center ion-justify-content-end"
                >
                  <p> > </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <div className="home-margin home-flex ion-align-items-center ion-justify-content-between">
          <div>
            <h2 className="home__heading">Scheduled Events</h2>
          </div>
          <div className="home-flex ion-align-self-stretch ion-align-items-center">
            <a className="home-link" href="https://google.com">
              More <ChevronRight />
            </a>
          </div>
        </div>

        <ul className="schedule-list">
          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>

          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>

          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>

          <li className="schedule-card">
            <div className="schedule-card__header">14:00, Sep 3</div>
            <div className="schedule-card__content">
              <p className="schedule-card__game">Pokemon Crystal</p>
              <p className="schedule-card__runner">360Chrism</p>
            </div>
          </li>
        </ul>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;

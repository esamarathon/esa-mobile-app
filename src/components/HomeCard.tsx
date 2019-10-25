import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonRow} from '@ionic/react';
import styled from 'styled-components';
import {ChevronRight} from '../assets/Icons';

const Card = styled(IonCard)`
  --background: #f8f8f8;
  --color: var(--ion-color-primary);

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 0;
  margin-bottom: 4px;
`;

const CardHeader = styled(IonCardHeader)`
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const CardContent = styled(IonCardContent)`
  padding-top: 0;
  padding-bottom: 13px;
`;

const Title = styled.h2`
  --color: var(--ion-color-primary);
  font-family: 'Titillium Web', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
`;

const Date = styled.p`
  position: absolute;
  top: 4px;
  right: 0;
  padding: 2px 8px;
  color: #fff;
  font-weight: bold;
  background: var(--ion-color-secondary);
  font-size: 12px;
`;

const Paragraph = styled.p`
  font-size: 12px !important;
  color: var(--ion-color-medium);
  margin: 0;
`;

const Chevron = styled(ChevronRight)`
  float: right;
  color: #979797;
`;

interface IProps {
  title: string;
  date: string;
  paragraph: string;
}

function HomeCard({title, date, paragraph}: IProps) {
  return (
    <Card>
      <CardHeader>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </CardHeader>
      <CardContent>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-no-padding">
              <Paragraph>{paragraph}</Paragraph>
            </IonCol>
            <IonCol size="2" className="home-flex ion-align-items-center ion-justify-content-end">
              <Chevron />
            </IonCol>
          </IonRow>
        </IonGrid>
      </CardContent>
    </Card>
  );
}

export default HomeCard;

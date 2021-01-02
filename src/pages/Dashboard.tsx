import React, { useState } from 'react';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import './Tab3.css';
import QrReader from 'react-qr-scanner'
const Dashboard: React.FC = () => {
  const [delay,setdelay]=useState(100);
  const [result,setresult]=useState('');
  const handleScan = (data: any) =>{
    setresult(data);
  }
  const handleError = (err: any) =>{
    console.log(err);
  }
  const previewStyle = {
    height: 240,
    width: 320,
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div>
        {!result && <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />}
        <p>{result && 
        <IonGrid>
          <IonRow>
            <IonCard>{result}</IonCard>
            </IonRow>
          <IonRow>
            <IonCol>
            <IonButton>Positive</IonButton>
            </IonCol>
            <IonCol>
            <IonButton>Negative</IonButton>
            </IonCol>
        </IonRow>
        </IonGrid>}</p>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

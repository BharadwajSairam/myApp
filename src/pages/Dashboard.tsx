import React, { useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import firebase,{signout} from '../firebase';
import QrReader from 'react-qr-scanner'
const Dashboard: React.FC = () => {
  const [delay,setdelay]=useState(100);
  const [result,setresult]=useState('');
  const [report,setreport]=useState('');



//firebase.initializeApp(firebaseConfig);
  var user=firebase.auth().currentUser;

  const handleScan = (data: any) =>{
    setresult(data);
  }
  const handleError = (err: any) =>{
    console.log(err);
  }
  const positive=() =>{
      setreport('Positive');
  }
  const negative=() =>{
    setreport('Negative');
  }
  const logout =async() =>{
    const uid=firebase.auth().currentUser?.uid;
    console.log(uid + report);
    firebase.firestore().collection('users').doc(uid).update({Result:report});
    console.log(await signout());
    
    setreport("");
    setresult("");

  }
  const previewStyle = {
    height: 240,
    width: 320,
  }
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonAlert isOpen={!!report} message="Thanks for reporting please Logout" buttons={['Ok']}/>
     {user &&
      <IonContent>
      
        {!result && <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />}
         
        
        {result && 
        <IonGrid>
          <IonRow>
            <div className="ion-text-center ion-margin">
            <IonCard >
              <IonCardContent><h1>{result}</h1></IonCardContent></IonCard></div>
            </IonRow>
          <IonRow>
            <IonCol className="ion-text-center ion-margin">
            <IonButton onClick={positive}>Positive</IonButton>
            </IonCol>
            <IonCol className="ion-text-center ion-margin">
            <IonButton onClick={negative}>Negative</IonButton>
            </IonCol>
        </IonRow>
        
      {report &&
      <div className="ion-text-center ion-margin">
        <IonRow>
          <IonCol className="ion-text-center ion-margin">
            <IonButton onClick={logout}>Logout</IonButton>
          </IonCol>
        </IonRow>
      </div>}
      </IonGrid>}
      </IonContent>}
      {!user && 
      <IonContent>
        <IonCard>
          <IonCardContent>
            <h1>Please login to view Dashboard</h1>
          </IonCardContent>
        </IonCard>
      </IonContent>
      }
          </IonPage>
  );
};

export default Dashboard;

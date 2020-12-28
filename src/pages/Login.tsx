import React, { useState, useRef } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Tab2.css';
import { logInOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [welcomeMsg,setwelcomeMsg]=useState('')
  const [password,setPassword]=useState('')
  const userRef=useRef<HTMLIonInputElement>(null);
  const passRef=useRef<HTMLIonInputElement>(null);
  const r=document.getElementById('result')
  const loginUser = () => {
    console.log(password);
    const x='fuck u ';
    const u=userRef.current?.value;
    const p=passRef.current?.value;
    reset();
    setwelcomeMsg('Successfully logged in');
  }
  const reset = () => {
    userRef.current!.value='';
    passRef.current!.value='';
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle >Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
        <IonItem>
          <IonCol><IonLabel position="fixed">Username</IonLabel></IonCol>
          <IonCol>
          <IonInput ref={userRef} placeholder="Enter Username"></IonInput>
         </IonCol>
        </IonItem>
        </IonRow>
        <IonRow>        
          <IonItem>
            <IonCol>
        <IonLabel position="fixed">Password</IonLabel></IonCol>
        <IonCol>
        <IonInput ref={passRef} type="password" placeholder="Enter Password" 
        onIonChange={(e: any) => setPassword(e.target.value)}>
        </IonInput>
        </IonCol>
        </IonItem>
        </IonRow>
        <IonRow>
        <div className="ion-text-center ion-margin">
            <IonCol><IonButton onClick={loginUser} routerLink="/login" >
            <IonIcon slot="start" icon={logInOutline}/>
              Login</IonButton>
              </IonCol>
        </div>
        </IonRow>
        {welcomeMsg && (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>{welcomeMsg}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>)}
        </IonGrid>
        <p>
          New here? <Link to="/register">Register</Link>
        </p>
        <div id='result'></div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

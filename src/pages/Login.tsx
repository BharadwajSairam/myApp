import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  
  function loginUser(){
    console.log(username,password)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput placeholder="Enter Username"
         onIonChange={(e: any) => setUsername(e.target.value)}>Username
         </IonInput>

        <IonInput type="password" placeholder="Enter Password" 
        onIonChange={(e: any) => setPassword(e.target.value)}>Password
        </IonInput>

        <IonButton onClick={loginUser} routerLink="/login" >Login</IonButton>
        <p>
          New here? <Link to="/register">Register</Link>
        </p>
        
      </IonContent>
    </IonPage>
  );
};

export default Login;

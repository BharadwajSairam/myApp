import React, { useState }  from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import './Tab1.css';
import { Link } from 'react-router-dom';
//const [text, setText] = useState<string>();
const Register: React.FC = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [confirmpassword,setconfirmPassword]=useState('')
  function registerUser(){
    console.log(username,password)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput placeholder="Enter Username"
         onIonChange={(e: any) => setUsername(e.target.value)}>Username
         </IonInput>

        <IonInput type="password" placeholder="Enter Password" 
        onIonChange={(e: any) => setPassword(e.target.value)}>Password
        </IonInput>

        <IonInput type="password" placeholder="Confirm Password" 
        onIonChange={(e: any) => setconfirmPassword(e.target.value)}>Confirm Password
        </IonInput>

        <IonButton onClick={registerUser} routerLink="/login" >Register</IonButton>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        
      </IonContent>
    </IonPage>
  );
};

export default Register;

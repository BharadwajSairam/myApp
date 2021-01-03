import React, { useRef, useState }  from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRadioGroup, IonLabel, IonListHeader, IonItem, IonRadio, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonAlert } from '@ionic/react';
import './Tab1.css';
import { registrationUser } from '../firebase'; 
import { Link } from 'react-router-dom';
//const [text, setText] = useState<string>();
const Register: React.FC = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setcPassword]=useState('')
  const [selected, setSelected] = useState<string>('');
  const ageref=useRef<HTMLIonInputElement>(null);
  const genderref=useRef<HTMLIonInputElement>(null);
  const addressref=useRef<HTMLIonInputElement>(null);
  const nameref=useRef<HTMLIonInputElement>(null);
  const healthref=useRef<HTMLIonInputElement>(null);
  const [welcomeMsg,setwelcomeMsg]=useState('')
  async function registerUser(){
    const age=Number(ageref.current?.value);
    const name=String(nameref.current?.value);
    const address=String(addressref.current?.value);
    const health=String(healthref.current?.value);
    console.log(username,password)
    const output=await registrationUser(username,password,name, age,selected,address,health);
    if (output){
      reset();
      setwelcomeMsg('successfully registered! please proceed to Login');
    }
  }
  const reset = () => {
    nameref.current!.value='';
    addressref.current!.value='';
    setPassword('');
    setUsername('');
    setSelected('');setcPassword('');
    healthref.current!.value='';
    ageref.current!.value='';
    
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonAlert isOpen={!!welcomeMsg} message={welcomeMsg}/>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput type="email" value={username} placeholder="Enter Email address"
         onIonChange={(e: any) => setUsername(e.target.value)}>Username
         </IonInput>
        
         <IonInput type="password"value={password} placeholder="Enter Password" 
        onIonChange={(e: any) => setPassword(e.target.value)}>Password
        </IonInput>

        <IonInput type="password" value={cpassword} placeholder="Confirm Password">Confirm Password</IonInput>

         <IonInput ref={nameref} placeholder="Enter FullName"
         >FullName
         </IonInput>

         <IonInput ref={ageref} type="number" placeholder="Enter Age">Age
         </IonInput>

         Gender
         <IonGrid>
         <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel>Male</IonLabel>
              <IonRadio slot="start" value="Male" />
            </IonItem>
            </IonCol>
            <IonCol>
            <IonItem>
              <IonLabel>Female</IonLabel>
              <IonRadio slot="start" value="Female" />
            </IonItem>
            </IonCol>
            <IonCol>
            <IonItem>
              <IonLabel>Other</IonLabel>
              <IonRadio slot="start" value="Other" />
            </IonItem>
            </IonCol>
            </IonRow>
          </IonRadioGroup>
          </IonGrid>
          <br/>
         <IonInput ref={addressref} placeholder="Enter Address">Address
         </IonInput>

         <IonInput ref={healthref} placeholder="Enter Health Condition">Health Condition
         </IonInput>

        <IonButton onClick={registerUser}>Register</IonButton>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
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

      </IonContent>
    </IonPage>
  );
};

export default Register;

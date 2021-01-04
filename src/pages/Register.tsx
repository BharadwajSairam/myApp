import React, { useRef, useState }  from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRadioGroup, IonLabel, IonListHeader, IonItem, IonRadio, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import './Tab1.css';
import { registrationUser } from '../firebase'; 
import { Link } from 'react-router-dom';
//const [text, setText] = useState<string>();
const Registe: React.FC = () => {
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
        <IonToolbar color="primary">
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

        <IonItem>
          <IonLabel>Username</IonLabel>
          <IonInput required={true} type="email" value={username} placeholder="Enter Email address" onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
        </IonItem>
       
        <IonItem>
          <IonLabel>Password</IonLabel>
          <IonInput required={true} type="password" value={password} placeholder="Enter Password" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Confirm Password : </IonLabel>
          <IonInput required={true} type="password" onIonChange={e=>setcPassword(e.detail.value ?? '')} value={cpassword} placeholder="Confirm Password"></IonInput>
        </IonItem>
        
        <IonItem>
          <IonLabel>FullName : </IonLabel>
          <IonInput required={true} ref={nameref} placeholder="Enter FullName"></IonInput>
        </IonItem>
         
        <IonItem>
          <IonLabel>Age : </IonLabel>
          <IonInput required={true} ref={ageref} type="number" placeholder="Enter Age"></IonInput>
        </IonItem>
        
        <IonItem>
          <IonLabel>Gender : </IonLabel>
          <IonSelect aria-required={true} value={selected} placeholder="Select Gender" onIonChange={e => setSelected(e.detail.value)}>
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
            <IonSelectOption value="other">Other</IonSelectOption>
          </IonSelect>
        </IonItem>
         
        <IonItem>
          <IonLabel>Address : </IonLabel>
          <IonInput required={true} ref={addressref} placeholder="Enter Address"></IonInput>
        </IonItem>
        
        <IonItem>
          <IonLabel>Health Condition : </IonLabel>
          <IonInput clearInput={true} ref={healthref} placeholder="Enter Health Condition"></IonInput>
        </IonItem>
         

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

export default Registe;

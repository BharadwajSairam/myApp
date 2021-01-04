import React, { useState, useRef, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import './Tab2.css';
import { logInOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import {signout, vloginUser} from '../firebase';
import firebase from '../firebase';
import { Map } from 'typescript';

const VaccineMaker: React.FC = () => {
  const [vcount,setvcount]=useState<number>(0);
  const[efficacyRate,setRate]=useState(0);
  const[vflag,setvflag]=useState(false);
  const[halfdoseRate,sethalfRate]=useState(0);
  const[fulldoseRate,setfullRate]=useState(0);
  const [halfdcountA,sethalfdcountA]=useState<number>(0);
  const [fulldcountA,setfulldcountA]=useState<number>(0);
  const [halfdcountB,sethalfdcountB]=useState<number>(0);
  const [fulldcountB,setfulldcountB]=useState<number>(0);
  const [alertmsg,setAlertmsg]=useState('');
  const [flag,setflag]=useState(false);
  const userRef=useRef<HTMLIonInputElement>(null);
  const passRef=useRef<HTMLIonInputElement>(null);
  const [vaccount,setvaccount]=useState<number>(0);
  const [unvaccount,setUnvaccount]=useState<number>(0);
  const login = async () => {
   
    const u=userRef.current?.value;
    const p=passRef.current?.value;
    
    var user=String(u);
    var password=String(p);
    if (u !="" && p!=""){
    const result=await vloginUser(user,password);
    console.log(result);
    if(result){        
      reset();
      
      setflag(true);
      console.log("Entering Map");
      var count=0;
      var vac=0;var unvac=0;var hdA=0;var hdB=0;var fdA=0;var fdB=0;
      users.map((user)=>{
            if(user.Result == "Positive"){
                console.log(user.Result);
                count=count+1;   
                if(user.VaccineGroup=="A"){
                    vac=vac+1;
                    if(user.Dose=="0.5"){
                        hdA=hdA+1;
                    }
                    else if(user.Dose=="1.0"){
                        fdA=fdA+1;
                    }
                }
                else if(user.VaccineGroup=="B"){
                    unvac=unvac+1;
                    if(user.Dose=="0.5"){
                        hdB=hdB+1;
                    }
                    else if(user.Dose=="1.0"){
                        fdB=fdB+1;
                    }
                }     
            }
      })

      setvcount(count);
      setvaccount(vac);
      sethalfdcountA(hdA);
      sethalfdcountB(hdB);
      setfulldcountA(fdA);
      setfulldcountB(fdB);
      setUnvaccount(unvac);
      console.log(alertmsg);
    }else{
        setAlertmsg('This Login is only for vaccine makers.Please check credentials and try again');
    }
    
    
  }
   console.log(vcount);
  }
  const reset = () => {
    userRef.current!.value='';
    passRef.current!.value='';
  };
  useEffect(()=>{
    if(vcount>=10){
        setvflag(true);
    }else{setvflag(false);} 
    var efficacay=(unvaccount-vaccount)/(unvaccount);
    setRate(efficacay);
},[vaccount,unvaccount,vcount]);
useEffect(()=>{
      
    var hdoserate=(halfdcountB-halfdcountA)/(halfdcountB);
    var fdoserate=(fulldcountB-fulldcountA)/(fulldcountB);
    sethalfRate(hdoserate);
    setfullRate(fdoserate);
},[halfdcountA,halfdcountB,fulldcountA,fulldcountB]);
console.log(unvaccount);
console.log(vaccount);
  const [users,setusers]=React.useState<firebase.default.firestore.DocumentData[]>([]);
  const [loading,setloading]=React.useState(false);
  
  const ref=firebase.firestore().collection("users");
  /*const getusers=()=>{
        setloading(true);
        ref.onSnapshot((querysnapshot)=>{
            const items: firebase.default.firestore.DocumentData[]=[];
            querysnapshot.forEach((doc)=>{
                items.push(doc.data());
            })
            setusers(items);
            setloading(false);
        })
  }*/
  const logout =async() =>{
    const uid=firebase.auth().currentUser?.uid;
    console.log(await signout());
    setflag(false);
  }
  const getusers=()=>{
    setloading(true);
    ref.get().then((item)=>{
        const items=item.docs.map((doc)=>doc.data());
        setusers(items);
        setloading(false);
    })
}
  React.useEffect(()=>  {
    getusers();
    },[])
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle >VaccineMaker Exclusive Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      
    {!flag &&
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
          <IonInput type="email" ref={userRef} placeholder="VaccineMaker Username"></IonInput>
         </IonCol>
        </IonItem>
        </IonRow>
        <IonRow>        
          <IonItem>
            <IonCol>
        <IonLabel position="fixed">Password</IonLabel></IonCol>
        <IonCol>
        <IonInput ref={passRef} type="password" placeholder="Enter Password"></IonInput>
        </IonCol>
        </IonItem>
        </IonRow>
        <IonRow>
        <div className="ion-text-center ion-margin">
            <IonCol><IonButton onClick={login} routerLink="/vaccinemaker" >
            <IonIcon slot="start" icon={logInOutline}/>
              Login</IonButton>
              </IonCol>
        </div>
        </IonRow>
        </IonGrid>
      </IonContent>}
      {flag && 
      <IonContent>
         
          <h3 className="ion-text-center ion-margin">Welcome to Vaccine Maker Dashboard</h3>
        {loading ? <h1>Loading...</h1> : null}
        <IonCard>
          <IonCardContent><h2>Number of volunteers: {users.length}</h2></IonCardContent>
          <IonCardContent><h2>Number of positive cases: {vcount}</h2></IonCardContent>
          {vflag && <div>
          <IonCardContent><h2>Number of positive cases vaccine/Non vaccine: {vaccount}/{unvaccount}</h2></IonCardContent>
          <IonCardContent><h2>Efficacy Rate irrespective of dose: {efficacyRate}</h2></IonCardContent>
          <IonCardContent><h2>Efficacy Rate Half dose: {halfdoseRate}</h2></IonCardContent>
          <IonCardContent><h2>Efficacy Rate Full dose: {fulldoseRate}</h2></IonCardContent></div>}
        </IonCard>
      <IonRow>
          <IonCol className="ion-text-center ion-margin">
            <IonButton onClick={logout} routerLink="/vaccinemaker">Logout</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
      }
    </IonPage>
  );
};

export default VaccineMaker;
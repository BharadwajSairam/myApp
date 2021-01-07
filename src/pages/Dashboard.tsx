import React, { useEffect, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRippleEffect, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import firebase, { signout } from '../firebase';
import QrReader from 'react-qr-scanner'
const Dashboard: React.FC = () => {
  const delay = 100;
  const [repalert,setReportalert]=useState('');
  const [onsubmit,setsavesubmit]=useState('');
  const [result, setresult] = useState('');
  const [report, setreport] = useState('');
  const [scanqr, setscanqr] = useState(false);
  const [manual, setmanual] = useState(false);
  const [dose, setdose] = useState('');
  const [vacgroup, setvacgroup] = useState('');

  const user = firebase.auth().currentUser;

  const handleScan = (data: any) => {
    
    if (data) {
      setresult(data);
      setscanqr(false);
      console.log("calling update group");
    }
    console.log(data);
    console.log(result);
    
  }
useEffect(()=>{
  const updategroup =async()=>{
    console.log(result)
    if (result){
    var res = JSON.parse(result);
    const uid = firebase.auth().currentUser?.uid;
    if (res) {
      console.log(res.vaccine);
      console.log(res.dose);
      try{
      firebase.firestore().collection('users').doc(uid).update({ VaccineGroup: res.vaccine });
      firebase.firestore().collection('users').doc(uid).update({ Dose: res.dose });
    }catch(error){
      console.log(error);
    }
    }
  }
  }
  updategroup();
},[result])
  
  const handleError = (err: any) => {
    console.log(err);
  }
  const positive = () => {
    setreport('Positive');
  }
  const negative = () => {
    setreport('Negative');
  }
  useEffect(()=>{
    const updateResult=async() =>{
      try{
      const uid = firebase.auth().currentUser?.uid;
      console.log(uid + report);
      if(uid != null){
        firebase.firestore().collection('users').doc(uid).update({ Result: report });
      }
      
    }catch(error){
      console.log(error);
        }
    }
    updateResult();
  },[report])
  
  const validateReport=async()=>{
    const uid = firebase.auth().currentUser?.uid;
    firebase.firestore().collection('users').doc(uid).get().then((doc)=>{
      const items=doc.data();
      if(items){
        if(items.VaccineGroup === ""){
          setresult("");
          setReportalert("Please scanQR before making a report");
        }
        else{
          const x="{ \"vaccine\": \""+ items.VaccineGroup + "\" , " + " \"dose\": \"" + items.Dose + "\"}";
          JSON.stringify(x);
          console.log(x);
          setresult(x);
        }
      }
    })
  }
  const logout = async () => {
    console.log(await signout());
    setreport("");
    setresult("");
    setmanual(false);

  }
  const manualsubmit=async()=>{
    try{
    const uid = firebase.auth().currentUser?.uid;
      firebase.firestore().collection('users').doc(uid).update({ VaccineGroup: vacgroup });
      firebase.firestore().collection('users').doc(uid).update({ Dose: dose });
      setmanual(false);
      setvacgroup('');
      setdose('');
      setsavesubmit("QR Details saved successfully");
    }catch(error){
      console.log(error);
    }
    
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
      <IonAlert isOpen={!!report} message="Thanks for reporting please Logout" buttons={['Ok']} />
      <IonAlert isOpen={!!repalert} message={repalert} buttons={[{
              text: 'Ok',
              handler: () => {
                setReportalert("");
              }
            }]} />
      <IonAlert isOpen={!!onsubmit} message={onsubmit} buttons={[{
              text: 'Ok',
              handler: () => {
                setsavesubmit("");
              }
            }]} />

      {user &&
        <IonContent>
          <IonGrid>
            
              <IonRow>
              {!scanqr &&
                <IonCol className="ion-text-center ion-margin">
                  <IonButton onClick={(e) => { setscanqr(true) }}>ScanQR</IonButton>
                </IonCol>}
                <IonCol className="ion-text-center ion-margin">
                  <IonButton onClick={(e) => { setmanual(true);setscanqr(false); }}>Manual</IonButton>
                </IonCol>
                <IonCol className="ion-text-center ion-margin">
                  <IonButton color="danger" onClick={logout} routerLink="/dashboard">Logout</IonButton>
                </IonCol>
                <IonCol className="ion-text-center ion-margin">
                  <IonButton onClick={validateReport}>Report</IonButton>
                </IonCol>

              </IonRow>
            <IonRow>
              <IonCol className="ion-text-center ion-margin">
                {scanqr && <QrReader
                  delay={delay}
                  style={previewStyle}
                  onError={handleError}
                  onScan={handleScan}
                />}
              </IonCol>
            </IonRow>
            {manual &&
              <div>
                <IonRow>
                  <IonItem>
                    <IonLabel>Vaccine Group</IonLabel>
                    <IonSelect aria-required={true} value={vacgroup} placeholder="Select Vaccine Group" onIonChange={e => setvacgroup(e.detail.value)}>
                      <IonSelectOption value="A">A</IonSelectOption>
                      <IonSelectOption value="B">B</IonSelectOption>
                    </IonSelect>

                  </IonItem>
                </IonRow>

                <IonRow>
                  <IonItem>
                    <IonLabel>Dose</IonLabel>
                    <IonSelect aria-required={true} value={dose} placeholder="Select Dose" onIonChange={e => setdose(e.detail.value)}>
                      <IonSelectOption value="0.5">0.5</IonSelectOption>
                      <IonSelectOption value="1.0">1.0</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-text-center ion-margin">
                    <IonButton onClick={manualsubmit}>Submit</IonButton>
                  </IonCol>
                </IonRow>
                
              </div>}
          </IonGrid>

          {result &&
            <IonGrid>
              <IonRow>
                <div className="ion-text-center ion-margin">
                  <IonCard >
                    <IonCardContent><h1>{result}</h1></IonCardContent></IonCard></div>
              </IonRow>
              <IonTitle color="primary">Please report the result below:</IonTitle>
              <IonRow>
                <IonCol className="ion-text-center ion-margin">
                  <IonButton color="danger" onClick={positive}>Positive</IonButton>
                </IonCol>
                <IonCol className="ion-text-center ion-margin">
                  <IonButton color="success" onClick={negative}>Negative<IonRippleEffect></IonRippleEffect></IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>}
            <IonGrid>
              <IonRow>
                
              </IonRow>
            </IonGrid>
        </IonContent>}
      {!user &&
        <IonContent>
          <IonCard>
            <IonCardContent>
              <h1><a href="/login">Please login to view Dashboard</a></h1>
            </IonCardContent>
          </IonCard>
        </IonContent>
      }
    </IonPage>
  );
};

export default Dashboard;

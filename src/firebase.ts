import * as fb from 'firebase'
import * as firestore from '@react-firebase/firestore';
import { getNameOfDeclaration } from 'typescript';


var firebase=fb.default;

const firebaseConfig = {
    apiKey: "AIzaSyBY95ADFcU6BTBTiDoNSXrxI02C79YO8Kg",
    authDomain: "myauthenticatorapp-1461c.firebaseapp.com",
    projectId: "myauthenticatorapp-1461c",
    storageBucket: "myauthenticatorapp-1461c.appspot.com",
    messagingSenderId: "622859386469",
    appId: "1:622859386469:web:278c1b595cf9569f53108c",
    measurementId: "G-P1G9TRXMJV"
  };


firebase.initializeApp(firebaseConfig);


export async function loginUser(email: string, password: string){

    try{
    const  res = await firebase.auth().signInWithEmailAndPassword(email,password)
    console.log(res);
    return true

    }catch(error){
        return false
    }
}

export async function registrationUser(email: string, password: string,name:string,age : number,gender:string,address:string,health:string){
    

    try{
        const  res = await firebase.auth().createUserWithEmailAndPassword(email,password)
        const db =firebase.firestore();
        const userid=res.user?.uid;
        const ref=db.collection("users").doc(userid).set({
            email: email,
            password: password,
            FullName: name,
            Age: age,
            Gender: gender, 
            Address: address,
            HealthCondition:health,
            Result:""
        });
        console.log(ref)
        return true;
    }catch(error){
        console.log(error)
        return false
    }
}
export async function signout() {
    try{
  const res=await firebase.auth().signOut();
  return true;
    }
    catch{
        return false;
    }
};

export default firebase;
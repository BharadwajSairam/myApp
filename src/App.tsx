import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Registe from './pages/Register';
import Login from './pages/Login';
import VaccineMaker from './pages/VaccineMaker';
import Dashboard from './pages/Dashboard';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/register" component={Registe} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/dashboard" component={Dashboard} exact={true} />
          <Route path="/vaccinemaker" component={VaccineMaker} />
          <Route path="/" render={() => <Redirect to="/register" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="register" href="/register">
            <IonIcon icon={triangle} />
            <IonLabel>Register</IonLabel>
          </IonTabButton>
          <IonTabButton tab="login" href="/login">
            <IonIcon icon={triangle} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={triangle} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="vaccinemaker" href="/vaccinemaker">
            <IonIcon icon={triangle} />
            <IonLabel>VaccineMaker</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

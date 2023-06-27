import React from "react";
import { IonButton, IonContent, IonGrid, IonPage } from "@ionic/react";
import { startScan } from "utils/scanner";

import "./styles.css";

const Scan = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton title="Start Scan" onClick={() => startScan()}>
          START SCAN
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Scan;

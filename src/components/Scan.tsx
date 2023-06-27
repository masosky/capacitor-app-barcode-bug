import React from "react";
import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { startScan } from "utils/scanner";

import "./styles.css";

const Scan = () => {
  React.useEffect(() => {
    startScan();
  });
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>Hi</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Scan;

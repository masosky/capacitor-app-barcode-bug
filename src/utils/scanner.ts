import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  BarcodeScannedEvent,
  CameraPermissionState,
} from "@capacitor-mlkit/barcode-scanning";

const formats: Array<BarcodeFormat> = [
  BarcodeFormat.Ean8,
  BarcodeFormat.Ean13,
  BarcodeFormat.UpcA,
  BarcodeFormat.UpcE,
  BarcodeFormat.Itf,
];

const getDetectionCornerPoints = (
  squareElement: HTMLDivElement
): number[][] | undefined => {
  const squareElementBoundingClientRect = squareElement.getBoundingClientRect();
  const scaledRect = squareElementBoundingClientRect
    ? {
        left: squareElementBoundingClientRect.left * window.devicePixelRatio,
        right: squareElementBoundingClientRect.right * window.devicePixelRatio,
        top: squareElementBoundingClientRect.top * window.devicePixelRatio,
        bottom:
          squareElementBoundingClientRect.bottom * window.devicePixelRatio,
        width: squareElementBoundingClientRect.width * window.devicePixelRatio,
        height:
          squareElementBoundingClientRect.height * window.devicePixelRatio,
      }
    : undefined;

  const detectionCornerPoints = scaledRect
    ? [
        [scaledRect.left, scaledRect.top],
        [scaledRect.left + scaledRect.width, scaledRect.top],
        [
          scaledRect.left + scaledRect.width,
          scaledRect.top + scaledRect.height,
        ],
        [scaledRect.left, scaledRect.top + scaledRect.height],
      ]
    : undefined;
  return detectionCornerPoints;
};

export const startScan = async () => {
  await requestPermissions();
  document.querySelector("body")?.classList.add("barcode-scanner-active");
  document
    .querySelector("ion-tab-bar")
    ?.classList.add("ion-tab-bar-background");

  await BarcodeScanner.addListener(
    "barcodeScanned",
    async (result: BarcodeScannedEvent) => {
      console.log("result", result);
    }
  );

  await BarcodeScanner.startScan({ formats, lensFacing: LensFacing.Back });
};

export const stopScan = async () => {
  document.querySelector("body")?.classList.remove("barcode-scanner-active");
  document
    .querySelector("ion-tab-bar")
    ?.classList.remove("ion-tab-bar-background");
  await BarcodeScanner.removeAllListeners();
  await BarcodeScanner.stopScan();
};

export const scanSingleBarcode = async () => {
  return async () => {
    document.querySelector("body")?.classList.add("barcode-scanner-active");
    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        await listener.remove();
        document
          .querySelector("body")
          ?.classList.remove("barcode-scanner-active");
        await BarcodeScanner.stopScan();
        return result.barcode;
      }
    );

    await BarcodeScanner.startScan();
  };
};

export const scan = async () => {
  const { barcodes } = await BarcodeScanner.scan({
    formats,
  });
  return barcodes;
};

export const isSupported = async () => {
  const { supported } = await BarcodeScanner.isSupported();
  return supported;
};

export const enableTorch = async () => {
  await BarcodeScanner.enableTorch();
};

export const disableTorch = async () => {
  await BarcodeScanner.disableTorch();
};

export const toggleTorch = async () => {
  await BarcodeScanner.toggleTorch();
};

export const isTorchEnabled = async () => {
  const { enabled } = await BarcodeScanner.isTorchEnabled();
  return enabled;
};

export const isTorchAvailable = async () => {
  const { available } = await BarcodeScanner.isTorchAvailable();
  return available;
};

export const openSettings = async () => {
  await BarcodeScanner.openSettings();
};

export const checkPermissions = async (): Promise<CameraPermissionState> => {
  const { camera } = await BarcodeScanner.checkPermissions();
  return camera;
};

export const requestPermissions = async (): Promise<CameraPermissionState> => {
  const { camera } = await BarcodeScanner.requestPermissions();
  return camera;
};

export function dataURItoBlob(dataURI: string) {
  dataURI='https://rrm-dev.s3.ap-south-1.amazonaws.com/images/vim-p50-228x228.jpg';
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array]);
  return URL.createObjectURL(blob);
}

export function downloadBase64File(blob: any, fileName: string) {
  let url = URL.createObjectURL(blob);

}

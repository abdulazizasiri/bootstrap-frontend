import { allowedAllExtensions } from "@core/configs/file.config";
import { IAttachmentsType } from "@core/models/attachments.model";

export function base64ToFile(fileName: string, fileType: string, fileBase64: string) { // binary
  const base64 = fileBase64;
  const base64ContentName = fileName;
  const base64ContentBlob = dataURItoBlob(base64, fileType);
  const base64ContentFile = new File([base64ContentBlob], base64ContentName, { type: fileType });
  return base64ContentFile
}

function dataURItoBlob(dataURI: string, fileType: string) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: fileType });
  return blob;
}


export function toBase64(file: Blob): Promise<string> {
  const result = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  return (result as Promise<string>)
}

export function checkAttachmentValidation(file: File, attachmentSetting: IAttachmentsType, allowedExtensions: string[] = allowedAllExtensions): string {
  if (file.size > (attachmentSetting.maxSize * 1024 * 1024)) {
    return 'InvalidFileSize';
  }
  if (file.name?.length > 95) {
    return 'InvalidFileName';
  }
  const fileExt = file.name.split('.').pop();
  if (!allowedExtensions.includes(fileExt.toLowerCase())) {
    return 'InvalidFileType';
  }
  return null;
}
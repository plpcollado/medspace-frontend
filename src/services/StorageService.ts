import { storage } from "@/lib/firebase/firebaseApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export class StorageService {
  static async uploadImage(file: File, path: string) {
    const storageRef = ref(storage, path);
    const metadata = {
      contentType: file.type
    };

    try {
      const snapshot = await uploadBytes(storageRef, file, metadata);
      return snapshot;
    } catch (error) {
      console.error("[FileService]: Error uploading file", error);
      throw error;
    }
  }

  static async getFileUrl(path: string) {
    const storageRef = ref(storage, path);
    try {
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("[FileService]: Error getting file URL", error);
      throw error;
    }
  }
}

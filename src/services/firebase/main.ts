import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import service from "./service.json";
import { USER } from "../../constant";
import { getAuth } from "firebase-admin/auth";

admin.initializeApp({
  credential: admin.credential.cert(service as ServiceAccount),
});

export const db = getFirestore();
export const auth = getAuth();

export const getUser = (id: string) => db.collection(USER).doc(id).get();

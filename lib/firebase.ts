import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyA_Z_WQgfJLxf_tcDYYtRWWUUil0RzK_7c",
  authDomain: "customer-complaint-box-6c66c.firebaseapp.com",
  databaseURL: "https://customer-complaint-box-6c66c-default-rtdb.firebaseio.com",
  projectId: "customer-complaint-box-6c66c",
  storageBucket: "customer-complaint-box-6c66c.appspot.com",
  messagingSenderId: "608299523826",
  appId: "1:608299523826:web:061ff51ae13ade28ac7a6b",
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)

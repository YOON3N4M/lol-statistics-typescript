import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import {
	getFirestore,
	addDoc,
	collection,
	query,
	getDocs,
	onSnapshot,
	orderBy,
} from '@firebase/firestore'

interface FirebaseConfigT {
	readonly apiKey: string
	readonly authDomain: string
	readonly projectId: string
	readonly storageBucket: string
	readonly messagingSenderId: string
	readonly appId: string
	readonly databaseURL: string
}

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const dbService = getFirestore(app)
export const dbAddDoc = addDoc
export const dbCollection = collection
export const dbGetDocs = getDocs
export const dbQuery = query

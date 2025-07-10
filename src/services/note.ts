
'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';

export interface ClientNoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: string; // ISO string
  backgroundAnimation?: string;
  emojis?: string;
  email?: string;
  phone?: string;
  plan?: string;
  theme?: string;
  images?: string[]; // Kept for client-side display, but will be ignored by addNote
}

export interface NoteData {
  id: string;
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: Timestamp;
  backgroundAnimation?: string;
  emojis?: string;
  email?: string;
  phone?: string;
  plan?: string;
  theme?: string;
  images?: string[];
  createdAt: Timestamp;
}


export async function addNote(clientData: ClientNoteData): Promise<string> {
  try {
    // Create a new object for Firestore, excluding fields not meant for storage like 'images'
    const dataToCreate: { [key: string]: any } = {
      createdAt: serverTimestamp(),
    };

    // Add fields from clientData to dataToCreate, only if they are not undefined
    (Object.keys(clientData) as Array<keyof ClientNoteData>).forEach(key => {
        if (clientData[key] !== undefined && clientData[key] !== '' && key !== 'images' && key !== 'startDate') {
            dataToCreate[key] = clientData[key];
        }
    });

    // Handle startDate separately: convert ISO string to Timestamp
    if (clientData.startDate) {
      const date = new Date(clientData.startDate);
      if (!isNaN(date.getTime())) {
        dataToCreate.startDate = Timestamp.fromDate(date);
      }
    }
    
    const docRef = await addDoc(collection(db, 'notes'), dataToCreate);
    return docRef.id;

  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Could not save the note.');
  }
}

export async function getNote(id: string): Promise<NoteData | null> {
    try {
        const docRef = doc(db, 'notes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Ensure images is always an array, even if it's missing from Firestore
            if (!data.images) {
              data.images = [];
            }
            return { id: docSnap.id, ...data } as NoteData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw new Error('Could not retrieve the note.');
    }
}

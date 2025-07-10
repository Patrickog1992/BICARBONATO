
'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Data from client has startDate as an ISO string
export interface ClientNoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: string; // Should be ISO string
  backgroundAnimation?: string;
  emojis?: string;
  email?: string;
  phone?: string;
  plan?: string;
  theme?: string;
  images?: string[]; // Kept for client-side use, but won't be saved
}

// Stored data will have Timestamps
export interface NoteData {
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
  images?: string[]; // This will be empty in Firestore
  createdAt: Timestamp;
}


export async function addNote(clientData: ClientNoteData): Promise<string> {
  try {
    const dataToCreate: { [key: string]: any } = {
      ...clientData,
      createdAt: serverTimestamp(),
    };

    // Remove images as we are not saving them
    delete dataToCreate.images;

    // Remove undefined or empty fields to avoid Firestore errors
    Object.keys(dataToCreate).forEach(key => {
        if (dataToCreate[key] === undefined || dataToCreate[key] === '') {
            delete dataToCreate[key];
        }
    });

    // Convert ISO string to Firestore Timestamp only if it exists
    if (clientData.startDate) {
      const date = new Date(clientData.startDate);
      if (!isNaN(date.getTime())) {
        dataToCreate.startDate = Timestamp.fromDate(date);
      } else {
        delete dataToCreate.startDate; // remove invalid date
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
            // Firestore Timestamps are automatically handled by Next.js on the client,
            // but we ensure the images array exists for type safety.
            if (!data.images) {
              data.images = [];
            }
            return data as NoteData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw new Error('Could not retrieve the note.');
    }
}

    
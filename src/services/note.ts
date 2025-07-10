'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, Timestamp } from 'firebase/firestore';

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
  createdAt: Timestamp;
}

export async function addNote(clientData: ClientNoteData): Promise<string> {
  try {
    // Create a mutable object for the data to be stored.
    const dataToStore: { [key: string]: any } = {
      ...clientData,
      createdAt: Timestamp.now(),
    };

    // Convert startDate from ISO string to Firestore Timestamp if it exists.
    if (clientData.startDate) {
      const date = new Date(clientData.startDate);
      if (!isNaN(date.getTime())) {
        dataToStore.startDate = Timestamp.fromDate(date);
      } else {
        delete dataToStore.startDate; // Remove invalid date
      }
    }

    const docRef = await addDoc(collection(db, 'notes'), dataToStore);
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

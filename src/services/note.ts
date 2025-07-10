
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
    const dataToCreate: { [key: string]: any } = {
      ...clientData,
      createdAt: serverTimestamp(),
    };
    
    // Remove startDate before initial creation to avoid conflicts with serverTimestamp
    delete dataToCreate.startDate;
    
    const docRef = await addDoc(collection(db, 'notes'), dataToCreate);

    // If startDate exists, update the document with the client-side timestamp.
    // This two-step process avoids conflicts between serverTimestamp and client-generated Timestamps.
    if (clientData.startDate) {
      const date = new Date(clientData.startDate);
      if (!isNaN(date.getTime())) {
        await updateDoc(docRef, {
          startDate: Timestamp.fromDate(date)
        });
      }
    }

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

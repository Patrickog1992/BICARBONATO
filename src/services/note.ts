'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';

export interface NoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  userSentiment?: string;
  relationshipLength?: string;
  sharedMemory?: string;
  createdAt?: any;
}

export async function addNote(noteData: NoteData) {
  try {
    const docRef = await addDoc(collection(db, 'notes'), {
      ...noteData,
      createdAt: serverTimestamp(),
    });
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
            return docSnap.data() as NoteData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw new Error('Could not retrieve the note.');
    }
}

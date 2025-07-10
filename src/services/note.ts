'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';

export interface ClientNoteData {
  id?: string; // id is optional and only used on the client
  title: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: string; // ISO string
  backgroundAnimation?: string;
  emojis?: string;
  email: string;
  phone?: string;
  plan: string;
  theme: string;
}

export interface NoteData extends Omit<ClientNoteData, 'startDate' | 'id'> {
  id: string;
  startDate?: Timestamp;
  createdAt: Timestamp;
}


export async function addNote(clientData: ClientNoteData): Promise<string> {
  try {
    // Explicitly create the object to be stored, excluding the client-side 'id'.
    const dataToStore: { [key: string]: any } = {
      title: clientData.title,
      loveNote: clientData.loveNote,
      email: clientData.email,
      plan: clientData.plan,
      theme: clientData.theme,
      createdAt: Timestamp.now(),
    };

    if (clientData.musicUrl) {
      dataToStore.musicUrl = clientData.musicUrl;
    }
    if (clientData.startDate) {
      const date = new Date(clientData.startDate);
      if (!isNaN(date.getTime())) {
        dataToStore.startDate = Timestamp.fromDate(date);
      }
    }
    if (clientData.backgroundAnimation) {
      dataToStore.backgroundAnimation = clientData.backgroundAnimation;
    }
    if (clientData.emojis) {
      dataToStore.emojis = clientData.emojis;
    }
    if (clientData.phone) {
      dataToStore.phone = clientData.phone;
    }

    const docRef = await addDoc(collection(db, 'notes'), dataToStore);
    return docRef.id;

  } catch (e) {
    console.error('Error adding document: ', e);
    // Throwing a specific error message can help debug on the client side if needed.
    throw new Error('Could not save the note to the database.');
  }
}

export async function getNote(id: string): Promise<NoteData | null> {
    try {
        const docRef = doc(db, 'notes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Ensure the returned data conforms to the NoteData interface
            return {
                id: docSnap.id,
                title: data.title || '',
                loveNote: data.loveNote || '',
                email: data.email || '',
                plan: data.plan || '',
                theme: data.theme || 'default',
                musicUrl: data.musicUrl,
                startDate: data.startDate,
                backgroundAnimation: data.backgroundAnimation,
                emojis: data.emojis,
                phone: data.phone,
                createdAt: data.createdAt || Timestamp.now(),
            };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw new Error('Could not retrieve the note.');
    }
}

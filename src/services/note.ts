
'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, Timestamp } from 'firebase/firestore';

export interface ClientNoteData {
  id?: string;
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
  images?: string[];
}

export interface NoteData extends Omit<ClientNoteData, 'startDate' | 'id'> {
  id: string;
  startDate?: Timestamp;
  createdAt: Timestamp;
}


export async function addNote(clientData: ClientNoteData): Promise<string> {
  try {
    const docData: { [key: string]: any } = {
      title: clientData.title,
      loveNote: clientData.loveNote,
      email: clientData.email,
      plan: clientData.plan,
      theme: clientData.theme,
      createdAt: Timestamp.now(),
    };

    if (clientData.musicUrl) docData.musicUrl = clientData.musicUrl;
    if (clientData.phone) docData.phone = clientData.phone;
    if (clientData.backgroundAnimation) docData.backgroundAnimation = clientData.backgroundAnimation;
    if (clientData.emojis) docData.emojis = clientData.emojis;
    if (clientData.images) docData.images = clientData.images;

    if (clientData.startDate) {
      const date = new Date(clientData.startDate);
      if (!isNaN(date.getTime())) {
        docData.startDate = Timestamp.fromDate(date);
      }
    }

    const docRef = await addDoc(collection(db, 'notes'), docData);
    return docRef.id;

  } catch (e) {
    console.error('Error adding document: ', e);
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
                images: data.images,
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

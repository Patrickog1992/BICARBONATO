'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Interface for data received from the client
export interface ClientNoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: string; // Expecting ISO string from client
  backgroundAnimation?: string;
  emojis?: string;
  userSentiment?: string;
  relationshipLength?: string;
  sharedMemory?: string;
  email?: string;
  phone?: string;
  plan?: string;
  theme?: string;
}

// Interface for data shape in Firestore
export interface NoteData extends Omit<ClientNoteData, 'startDate'> {
  createdAt: Timestamp;
  startDate?: Timestamp; // Stored as Firestore Timestamp
  images?: string[]; // Although not saved, defined for type safety
}

export async function addNote(clientData: ClientNoteData) {
  try {
    const { startDate: startDateString, ...restOfClientData } = clientData;

    // Create a clean object for storage, excluding any undefined values
    const dataToSave: Omit<NoteData, 'startDate' | 'images'> = {
      ...restOfClientData,
      createdAt: serverTimestamp(),
    };
    
    // Convert ISO string back to a Date object, then to a Firestore Timestamp
    if (startDateString) {
      const date = new Date(startDateString);
      if (!isNaN(date.getTime())) {
        (dataToSave as NoteData).startDate = Timestamp.fromDate(date);
      }
    }

    const docRef = await addDoc(collection(db, 'notes'), dataToSave);
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
            // Convert Firestore Timestamp to Date for client-side usage
            if (data.startDate && data.startDate instanceof Timestamp) {
                data.startDate = data.startDate.toDate();
            }
            if (data.createdAt && data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }
            // Although images are not saved, we ensure the field exists for type safety on the client
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

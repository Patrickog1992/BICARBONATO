
'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Data from client has startDate as an ISO string
export interface ClientNoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: string; // Should be ISO string
  backgroundAnimation?: string;
  emojis?: string;
  userSentiment?: string;
  relationshipLength?: string;
  sharedMemory?: string;
  email?: string;
  phone?: string;
  plan?: string;
  theme?: string;
  images?: string[];
}

// Stored data will have Timestamps
export interface NoteData extends Omit<ClientNoteData, 'startDate'> {
  createdAt: Timestamp;
  startDate?: Timestamp;
}

export async function addNote(clientData: ClientNoteData): Promise<string> {
  try {
    // Separate startDate to handle it after document creation
    const { startDate, ...dataToCreate } = clientData;

    // Create the document with a server-generated timestamp for createdAt
    const docRef = await addDoc(collection(db, 'notes'), {
      ...dataToCreate,
      createdAt: serverTimestamp(),
    });

    // If startDate exists, update the document with the Firestore Timestamp
    if (startDate) {
      const date = new Date(startDate);
      if (!isNaN(date.getTime())) {
        await updateDoc(docRef, {
          startDate: Timestamp.fromDate(date),
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
            // Firestore Timestamps are automatically handled by Next.js on the client,
            // but we ensure the images array exists.
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

    
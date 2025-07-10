'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface NoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: Date; // For client-side use
  images?: string[]; // For client-side use, not stored in DB
  backgroundAnimation?: string;
  emojis?: string;
  userSentiment?: string;
  relationshipLength?: string;
  sharedMemory?: string;
  createdAt?: any;
  email?: string;
  phone?: string;
  plan?: string;
  theme?: string;
}

// This interface defines the shape of the data that will actually be stored in Firestore.
// Notice it does not include `images`.
interface NoteDataForStorage extends Omit<NoteData, 'images' | 'startDate' | 'createdAt'> {
    createdAt: any; // serverTimestamp()
    startDate?: Timestamp; // Firestore Timestamp
}


export async function addNote(noteData: Omit<NoteData, 'images' | 'createdAt' | 'startDate'>, startDate?: Date) {
  try {
    const dataToSave: NoteDataForStorage = {
      ...noteData,
      createdAt: serverTimestamp(),
    };

    // Only add startDate if it's a valid date, converting it to a Firestore Timestamp
    if (startDate && startDate instanceof Date && !isNaN(startDate.getTime())) {
      dataToSave.startDate = Timestamp.fromDate(startDate);
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

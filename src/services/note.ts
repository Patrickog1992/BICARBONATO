'use server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface NoteData {
  title?: string;
  loveNote: string;
  musicUrl?: string;
  startDate?: Date;
  images?: string[]; 
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

export async function addNote(noteData: Omit<NoteData, 'createdAt' | 'startDate'>, startDate?: Date) {
  try {
    const dataToSave: any = {
      ...noteData,
      createdAt: serverTimestamp(),
    };

    // Only add startDate if it's a valid date
    if (startDate && startDate instanceof Date && !isNaN(startDate.getTime())) {
      dataToSave.startDate = Timestamp.fromDate(startDate);
    }
    
    // As Firebase has a 1MB limit per document, we won't save images to Firestore.
    // This should be handled by a file storage service like Firebase Storage in a real app.
    if (dataToSave.images) {
      delete dataToSave.images;
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

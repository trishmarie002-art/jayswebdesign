import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Validate connection
async function testConnection() {
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    console.error("Firebase configuration is missing required fields (projectId or apiKey).");
    return;
  }

  try {
    // Try to read a path that might be allowed or at least more likely to exist/be reachable
    await getDocFromServer(doc(db, 'projects', 'test-connection'));
    console.log("Firebase connection successful.");
  } catch (error: any) {
    // If it's a permission error, the connection is actually working, but the rules are doing their job
    if (error.code === 'permission-denied') {
      console.log("Firebase connection established (permission denied as expected for test doc).");
      return;
    }
    
    console.error("Firebase connection error details:", {
      code: error.code,
      message: error.message,
      name: error.name
    });

    if (error.message && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The SDK reports the client is offline. This could be due to an invalid Project ID or API Key.");
    }
  }
}
testConnection();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => auth.signOut();

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

export function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  const user = auth.currentUser;
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || 'Unknown Firestore error',
    operationType,
    path,
    authInfo: {
      userId: user?.uid || 'anonymous',
      email: user?.email || 'none',
      emailVerified: user?.emailVerified || false,
      isAnonymous: user?.isAnonymous || true,
      providerInfo: user?.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName || '',
        email: p.email || ''
      })) || []
    }
  };
  throw new Error(JSON.stringify(errorInfo));
}

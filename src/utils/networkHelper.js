import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../config/firebase.config";
// Create a new ticket in the Firestore database
const createTicket = async (ticketData, toggleErrorState) => {
  try {
    const ticketsRef = collection(db, 'tickets');
    const newTicketRef = await addDoc(ticketsRef, {
      ...ticketData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: newTicketRef.id };
  } catch (error) {
    console.error("Error creating ticket: ", error);
    toggleErrorState("Error creating ticket: " + error.message, true);
    return { success: false, error };
  }
};

// Update the status of an existing ticket
const updateStatus = async (ticketId, status, toggleErrorState) => {
  try {
    const ticketRef = doc(db, 'tickets', ticketId);
    await updateDoc(ticketRef, { status });
    return { success: true };
  } catch (error) {
    console.error("Error updating status: ", error);
    toggleErrorState("Error updating status: " + error.message, true);
    return { success: false, error };
  }
};


// View tickets based on provided filters
const viewTickets = async (filters = {}, toggleErrorState) => {
  try {
    let q = collection(db, 'tickets');

    if (filters.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }
    if (filters.product) {
      q = query(q, where('product', '==', filters.product));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    const snapshot = await getDocs(q);
    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, tickets };
  } catch (error) {
    console.error("Error viewing tickets: ", error);
    toggleErrorState("Error viewing tickets: " + error.message, true);
    return { success: false, error };
  }
};

// View tickets for a specific user ID
const viewTicketsForUserID = async (userId, toggleErrorState) => {
  return viewTickets({ userId }, toggleErrorState);
};

// View tickets for a specific product
const viewTicketsForProject = async (product, toggleErrorState) => {
  return viewTickets({ product }, toggleErrorState);
};

// View tickets according to their status
const viewTicketsAccordingToStatus = async (status, toggleErrorState) => {
  return viewTickets({ status }, toggleErrorState);
};

// View tickets based on a custom query
const viewTicketsForQuery = async (queryField, queryValue, toggleErrorState) => {
  try {
    const ticketsRef = collection(db, 'tickets');
    const q = query(ticketsRef, where(queryField, '==', queryValue));
    const snapshot = await getDocs(q);
    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, tickets };
  } catch (error) {
    console.error("Error viewing tickets for query: ", error);
    toggleErrorState("Error viewing tickets for query: " + error.message, true);
    return { success: false, error };
  }
};

// Perform a query with an equality condition
const queryWithEquality = async (collectionName, field, value, toggleErrorState) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(field, '==', value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toggleErrorState(`Error querying ${collectionName} by ${field} == ${value}: ${error.message}`, true);
    throw new Error(`Error querying ${collectionName} by ${field} == ${value}: ${error.message}`);
  }
};

// Fetch a document by ID
const fetchDocument = async (collectionName, docId, toggleErrorState) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`No document found with ID ${docId} in collection ${collectionName}`);
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    toggleErrorState(`Error fetching document ${docId} from ${collectionName}: ${error.message}`, true);
    throw new Error(`Error fetching document ${docId} from ${collectionName}: ${error.message}`);
  }
};

// Fetch all documents in a collection
const fetchAllDocumentsInCollection = async (collectionName, toggleErrorState) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return {
      success: true,
      documents: documents
    };
  } catch (error) {
    const errorMessage = `Error fetching documents from collection ${collectionName}: ${error.message}`;
    toggleErrorState(errorMessage, true);
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Fetch a document inside a nested collection
const fetchNestedDocument = async (parentCollection, parentDocId, childCollection, childDocId, toggleErrorState) => {
  try {
    const nestedDocRef = doc(db, parentCollection, parentDocId, childCollection, childDocId);
    const docSnap = await getDoc(nestedDocRef);
    if (!docSnap.exists()) {
      throw new Error(`No document found with ID ${childDocId} in collection ${childCollection} under ${parentCollection}/${parentDocId}`);
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    toggleErrorState(`Error fetching document ${childDocId} from ${childCollection} under ${parentCollection}/${parentDocId}: ${error.message}`, true);
    throw new Error(`Error fetching document ${childDocId} from ${childCollection} under ${parentCollection}/${parentDocId}: ${error.message}`);
  }
};
export {
  createTicket,
  updateStatus,
  viewTickets,
  viewTicketsForUserID,
  viewTicketsForProject,
  viewTicketsAccordingToStatus,
  viewTicketsForQuery,
  queryWithEquality,
  fetchDocument,
  fetchAllDocumentsInCollection,
  fetchNestedDocument
};

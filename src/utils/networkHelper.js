import { db } from "../config/firebase.config";

  // Create a new ticket in the Firestore database
const createTicket = async (ticketData) => {
  try {
    const newTicketRef = db.collection('tickets').doc();
    await newTicketRef.set({
      ...ticketData,
      ticketId: newTicketRef.id,
      createdAt: fetchAllDocumentsInCollection.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, id: newTicketRef.id };
  } catch (error) {
    console.error("Error creating ticket: ", error);
    return { success: false, error };
  }
};

//Update the status of an existing ticket
const updateStatus = async (ticketId, status) => {
  try {
    await db.collection('tickets').doc(ticketId).update({ status });
    return { success: true };
  } catch (error) {
    console.error("Error updating status: ", error);
    return { success: false, error };
  }
};

//View tickets based on provided filters
const viewTickets = async (filters = {}) => {
  try {
    let query = db.collection('tickets');

    if (filters.userId) {
      query = query.where('userId', '==', filters.userId);
    }
    if (filters.product) {
      query = query.where('product', '==', filters.product);
    }
    if (filters.status) {
      query = query.where('status', '==', filters.status);
    }

    const snapshot = await query.get();
    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, tickets };
  } catch (error) {
    console.error("Error viewing tickets: ", error);
    return { success: false, error };
  }
};

//View tickets for a specific user ID
const viewTicketsForUserID = async (userId) => {
  return viewTickets({ userId });
};

//View tickets for a specific product
const viewTicketsForProject = async (product) => {
  return viewTickets({ product });
};

//View tickets according to their status
const viewTicketsAccordingToStatus = async (status) => {
  return viewTickets({ status });
};

//View tickets based on a custom query
const viewTicketsForQuery = async (query) => {
  try {
    const snapshot = await db.collection('tickets').where(query.field, '==', query.value).get();
    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, tickets };
  } catch (error) {
    console.error("Error viewing tickets for query: ", error);
    return { success: false, error };
  }
};

//Perform a query with an equality condition
const queryWithEquality = async (collection, field, value) => {
  try {
    const snapshot = await db.collection(collection).where(field, '==', value).get();
    return snapshot;
  } catch (error) {
    throw new Error(`Error querying ${collection} by ${field} == ${value}: ${error.message}`);
  }
};

//Fetch a document by ID
const fetchDocument = async (collection, docId) => {
  try {
    const doc = await db.collection(collection).doc(docId).get();
    if (!doc.exists) {
      throw new Error(`No document found with ID ${docId} in collection ${collection}`);
    }
    return doc;
  } catch (error) {
    throw new Error(`Error fetching document ${docId} from ${collection}: ${error.message}`);
  }
};

//Fetch all documents in a collection
const fetchAllDocumentsInCollection = async (collection) => {
  try {
    const snapshot = await db.collection(collection).get();
    return snapshot;
  } catch (error) {
    throw new Error(`Error fetching documents from collection ${collection}: ${error.message}`);
  }
};

//Fetch a document inside a nested collection
const fetchNestedDocument = async (parentCollection, parentDocId, childCollection, childDocId) => {
  try {
    const doc = await db.collection(parentCollection)
                        .doc(parentDocId)
                        .collection(childCollection)
                        .doc(childDocId)
                        .get();
    if (!doc.exists) {
      throw new Error(`No document found with ID ${childDocId} in collection ${childCollection} under ${parentCollection}/${parentDocId}`);
    }
    return doc;
  } catch (error) {
    throw new Error(`Error fetching document ${childDocId} from ${childCollection} under ${parentCollection}/${parentDocId}: ${error.message}`);
  }
};

export{
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

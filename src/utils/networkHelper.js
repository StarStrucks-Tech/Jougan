// src/utils/networkHelper.js
const { db } = require('../config/firebaseAdmin');
const { admin } = require('../config/firebaseAdmin');

const createTicket = async (ticketData) => {
  try {
    const newTicketRef = db.collection('tickets').doc();
    await newTicketRef.set({
      ...ticketData,
      ticketId: newTicketRef.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, id: newTicketRef.id };
  } catch (error) {
    console.error("Error creating ticket: ", error);
    return { success: false, error };
  }
};

const updateStatus = async (ticketId, status) => {
  try {
    await db.collection('tickets').doc(ticketId).update({ status });
    return { success: true };
  } catch (error) {
    console.error("Error updating status: ", error);
    return { success: false, error };
  }
};

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

const viewTicketsForUserID = async (userId) => {
  return viewTickets({ userId });
};

const viewTicketsForProject = async (product) => {
  return viewTickets({ product });
};

const viewTicketsAccordingToStatus = async (status) => {
  return viewTickets({ status });
};

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

module.exports = {
  createTicket,
  updateStatus,
  viewTickets,
  viewTicketsForUserID,
  viewTicketsForProject,
  viewTicketsAccordingToStatus,
  viewTicketsForQuery
};

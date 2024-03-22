"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class FirebaseContactRepository {
    async getContacts(userId) {
        const snapshot = await firebase_1.firestore
            .collection("contacts")
            .where("userId", "==", userId)
            .get();
        const contacts = [];
        snapshot.forEach((doc) => {
            contacts.push({ id: doc.id, ...doc.data() });
        });
        return contacts;
    }
    async addContact(userId, contactData) {
        try {
            await firebase_1.firestore.collection("contacts").add({ userId, ...contactData });
        }
        catch (error) {
            throw new Error("Failed to add contact");
        }
    }
    async getContact(contactId) {
        const docRef = firebase_1.firestore.collection("contacts").doc(contactId);
        const doc = await docRef.get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        else {
            return null;
        }
    }
    async updateContact(contactId, updatedData) {
        try {
            await firebase_1.firestore.collection("contacts").doc(contactId).update(updatedData);
        }
        catch (error) {
            throw new Error("Failed to update contact, error:");
        }
    }
    async deleteContact(contactId) {
        try {
            await firebase_1.firestore.collection("contacts").doc(contactId).delete();
        }
        catch (error) {
            throw new Error("Failed to delete contact");
        }
    }
}
FirebaseContactRepository.res = Response;
exports.default = FirebaseContactRepository;

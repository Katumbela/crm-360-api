import { Contact } from "../entities/contact.entity";
import { firestore } from "../firebase";
import { Response, Request } from "express";

class FirebaseContactRepository {
  static res = Response;
  async getContacts(userId: string): Promise<Contact[]> {
    const snapshot = await firestore
      .collection("contacts")
      .where("userId", "==", userId)
      .get();
    const contacts: Contact[] = [];
    snapshot.forEach((doc) => {
      contacts.push({ id: doc.id, ...doc.data() } as Contact);
    });
    return contacts;
  }

  async addContact(
    userId: string,
    contactData: Omit<Contact, "userId">
  ): Promise<void> {
    try {
      await firestore.collection("contacts").add({ userId, ...contactData });
    } catch (error) {
      throw new Error("Failed to add contact");
    }
  }

  async getContact(contactId: string): Promise<Contact | null> {
    const docRef = firestore.collection("contacts").doc(contactId);
    const doc = await docRef.get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() } as Contact;
    } else {
      return null;
    }
  }

  async updateContact(
    contactId: string,
    updatedData: Partial<Contact>
  ): Promise<void> {
    try {
      await firestore.collection("contacts").doc(contactId).update(updatedData);
    } catch (error: any) {
      throw new Error("Failed to update contact, error:");
    }
  }

  async deleteContact(contactId: string): Promise<any> {
    try {
      await firestore.collection("contacts").doc(contactId).delete();
    } catch (error) {
      throw new Error("Failed to delete contact");
    }
  }
}

export default FirebaseContactRepository;

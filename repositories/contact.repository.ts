import { Contact } from "../entities/contact.entity";

interface ContactRepository {
    getContacts(userId: string): Promise<Contact[]>;
    addContact(userId: string, contactData: Contact): Promise<void>;
    getContact(contactId: string): Promise<Contact | null>;
    updateContact(contactId: string, updatedData: Partial<Contact>): Promise<void>;
    deleteContact(contactId: string): Promise<void>;
}

export default ContactRepository;

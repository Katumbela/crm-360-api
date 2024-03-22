import { Contact } from "../entities/contact.entity";
import ContactRepository from "../repositories/contact.repository";

class ContactsUseCase {
    constructor(private contactRepository: ContactRepository) {}

    async getContacts(userId: string): Promise<Contact[]> {
        return this.contactRepository.getContacts(userId);
    }

    async addContact(userId: string, contactData: Contact): Promise<void> {
        return this.contactRepository.addContact(userId, contactData);
    }

    async getContact(contactId: string): Promise<Contact | null> {
        return this.contactRepository.getContact(contactId);
    }
    async getContactById(contactId: string): Promise<Contact | null> {
        return this.contactRepository.getContact(contactId);
    }

    async updateContact(contactId: string, updatedData: Partial<Contact>): Promise<void> {
        return this.contactRepository.updateContact(contactId, updatedData);
    }

    async deleteContact(contactId: string): Promise<void> {
        return this.contactRepository.deleteContact(contactId);
    }
}

export default ContactsUseCase;

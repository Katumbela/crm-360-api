"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContactsUseCase {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async getContacts(userId) {
        return this.contactRepository.getContacts(userId);
    }
    async addContact(userId, contactData) {
        return this.contactRepository.addContact(userId, contactData);
    }
    async getContact(contactId) {
        return this.contactRepository.getContact(contactId);
    }
    async getContactById(contactId) {
        return this.contactRepository.getContact(contactId);
    }
    async updateContact(contactId, updatedData) {
        return this.contactRepository.updateContact(contactId, updatedData);
    }
    async deleteContact(contactId) {
        return this.contactRepository.deleteContact(contactId);
    }
}
exports.default = ContactsUseCase;

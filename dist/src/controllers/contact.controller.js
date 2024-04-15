"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.getContactById = exports.addContact = exports.getContacts = void 0;
const firebase_contact_repository_1 = __importDefault(require("../repositories/firebase.contact.repository"));
const contact_usecase_1 = __importDefault(require("../useCases/contact.usecase"));
const contactRepository = new firebase_contact_repository_1.default();
const contactsUseCase = new contact_usecase_1.default(contactRepository);
async function getContacts(req, res) {
    const userId = req.params.userId; // Supondo que o userId esteja presente nos parâmetros da requisição
    try {
        const contacts = await contactsUseCase.getContacts(userId);
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get contacts" });
    }
}
exports.getContacts = getContacts;
async function addContact(req, res) {
    const userId = req.params.userId; // Supondo que o userId esteja presente nos parâmetros da requisição
    const contactData = req.body; // Supondo que os dados do contato estejam presentes no corpo da requisição
    try {
        await contactsUseCase.addContact(userId, contactData);
        res.status(201).json({ message: "Contact added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add contact" });
    }
}
exports.addContact = addContact;
async function getContactById(req, res) {
    const contactId = req.params.contactId; // Supondo que o contactId esteja presente nos parâmetros da requisição
    try {
        const contact = await contactsUseCase.getContactById(contactId);
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get contact" });
    }
}
exports.getContactById = getContactById;
async function updateContact(req, res) {
    const contactId = req.params.contactId; // Supondo que o contactId esteja presente nos parâmetros da requisição
    const contactData = req.body; // Supondo que os novos dados do contato estejam presentes no corpo da requisição
    try {
        await contactsUseCase.updateContact(contactId, contactData);
        res.status(200).json({ message: "Contact updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update contact" });
    }
}
exports.updateContact = updateContact;

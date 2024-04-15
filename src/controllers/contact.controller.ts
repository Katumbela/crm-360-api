import { Response, Request } from "express";
import FirebaseContactRepository from "../repositories/firebase.contact.repository";
import ContactsUseCase from "../useCases/contact.usecase";

const contactRepository = new FirebaseContactRepository();
const contactsUseCase = new ContactsUseCase(contactRepository);

async function getContacts(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId; // Supondo que o userId esteja presente nos parâmetros da requisição
  try {
    const contacts = await contactsUseCase.getContacts(userId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contacts" });
  }
}

async function addContact(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId; // Supondo que o userId esteja presente nos parâmetros da requisição
  const contactData = req.body; // Supondo que os dados do contato estejam presentes no corpo da requisição
  try {
    await contactsUseCase.addContact(userId, contactData);
    res.status(201).json({ message: "Contact added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add contact" });
  }
}

async function getContactById(req: Request, res: Response): Promise<void> {
  const contactId = req.params.contactId; // Supondo que o contactId esteja presente nos parâmetros da requisição
  try {
    const contact = await contactsUseCase.getContactById(contactId);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contact" });
  }
}

async function updateContact(req: Request, res: Response): Promise<void> {
  const contactId = req.params.contactId; // Supondo que o contactId esteja presente nos parâmetros da requisição
  const contactData = req.body; // Supondo que os novos dados do contato estejam presentes no corpo da requisição
  try {
    await contactsUseCase.updateContact(contactId, contactData);
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact" });
  }
}

export { getContacts, addContact, getContactById, updateContact };

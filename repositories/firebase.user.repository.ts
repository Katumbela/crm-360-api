import { UserEntity } from "../entities";
import firebase from "firebase/app";
import { auth, firestore } from "../firebase";

class FirebaseUserRepository {
  async login(email: string, password: string): Promise<UserEntity> {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (!user) {
        throw new Error('User authentication failed');
      }

      // Buscar os dados do usuário no Firestore usando o ID de usuário
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        throw new Error('User data not found');
      }

      // Retornar os dados do usuário
      return {
        ...userDoc.data() as UserEntity // Assume que os dados do usuário estão armazenados no Firestore
      };
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
}

export default FirebaseUserRepository;

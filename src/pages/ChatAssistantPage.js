// In ChatAssistantPage.js
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

// Save message to Firestore
const saveChatMessage = async (message) => {
  if (!currentUser) return;
  
  try {
    await addDoc(collection(db, 'messages'), {
      ...message,
      userId: currentUser.uid,
    });
  } catch (err) {
    console.error('Failed to save chat message:', err);
  }
};

// Load chat history from Firestore
const loadChatHistory = async () => {
  if (!currentUser) return;
  
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const loadedMessages = [];
    
    querySnapshot.forEach((doc) => {
      loadedMessages.push(doc.data());
    });
    
    setMessages(loadedMessages);
  } catch (err) {
    console.error('Failed to load chat history:', err);
    setError('Failed to load chat history. Please refresh the page.');
  }
};

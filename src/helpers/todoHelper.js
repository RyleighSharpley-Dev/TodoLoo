import { db } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const addTodo = async (uid, text) => {
    try{
        const todo = {
            id: uuidv4(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            todos: arrayUnion(todo),
        });
        return todo;
    }catch(error) {
        console.error("Error adding todo:", error);
        throw error;
    }   
}

export const deleteTodo = async (uid, id) => {
    try{
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if(!userDocSnap.exists()) {
            throw new Error("User not found");
        }

        const todos = userDocSnap.data().todos || [];
        const updatedTodos = todos.filter(todo => todo.id !== id);
        await updateDoc(userDocRef, { todos: updatedTodos });
        return null;
     
    }catch(error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export const toggleTodo = async (uid, id) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User not found");
    }

    const todos = userDocSnap.data().todos || [];
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) { // use === for comparison
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    await updateDoc(userDocRef, { todos: updatedTodos });

    return updatedTodos.find((todo) => todo.id === id);
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
};

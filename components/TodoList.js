import {
  onSnapshot,
  orderBy,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Todo from "./Todo";
import { useAuth } from "../Auth";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const collectionRef = collection(db, "todos");

    const q = query(
      collectionRef,
      where("email", "==", currentUser?.email),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, [currentUser.email]);
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          details={todo.details}
          timestamp={todo.timestamp}
        />
      ))}
    </div>
  );
};

export default TodoList;

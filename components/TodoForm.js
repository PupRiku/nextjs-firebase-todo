import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";

const TodoForm = () => {
  const inputAreaRef = useRef();

  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const onSubmit = async () => {
    if (todo?.hasOwnProperty("timestamp")) {
      const docRef = doc(db, "todos", todo.id);
      const todoUpdated = { ...todo, timestamp: serverTimestamp() };
      updateDoc(docRef, todoUpdated);
      setTodo({ title: "", details: "" });
      showAlert("info", `Todo with id ${docRef.id} updated successfully`);
    } else {
      const collectionRef = collection(db, "todos");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        timestamp: serverTimestamp(),
      });
      setTodo({ title: "", details: "" });
      showAlert("success", `Todo with id ${docRef.id} is added successfully`);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTodo({ title: "", details: "" });
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [setTodo]);

  return (
    <div ref={inputAreaRef}>
      <TextField
        fullWidth
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="details"
        multiline
        maxRows={4}
        value={todo.details}
        onChange={(e) => setTodo({ ...todo, details: e.target.value })}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={onSubmit}>
        {todo.hasOwnProperty("timestamp") ? "Update Todo" : "Add a new todo"}
      </Button>
    </div>
  );
};

export default TodoForm;

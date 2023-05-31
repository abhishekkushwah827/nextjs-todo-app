"use client"
import Todo from '@/components/Todo';
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface Todo {
  text: String,
  isCompleted: boolean,
  id: number
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return JSON.parse(localStorage.getItem("todos")) || []
  });
  const [inputVal, setInputVal] = useState<String>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodoId, setEditTodoId] = useState<number>();


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleAddEdit = (): void => {
    if(!inputVal) return;
    let updatedTodos = todos;
    if (isEdit) {
      let index = updatedTodos.findIndex(todo => todo.id == editTodoId);
      updatedTodos[index].text = inputVal;
    }
    else {
      updatedTodos.push({ text: inputVal, isCompleted: false, id: Date.now() });
    }
    setTodos([...updatedTodos]);
    setInputVal("");
    setIsEdit(false);
  }

  const deleteTodo = (id: number): void => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...updatedTodos]);
  }
  const markAsDone = (id: number): void => {
    let updatedTodos = todos;
    let index = updatedTodos.findIndex(todo => todo.id == id);
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos([...updatedTodos]);
  }
  const editHandler = (todo: Todo): void => {
    setIsEdit(true);
    setInputVal(todo.text);
    setEditTodoId(todo.id);
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      <h1 className="text-5xl font-semibold mb-10">Todo App</h1>

      <div className='w-full lg:w-1/2 flex gap-2'>
        <input type="text"
          className='rounded-md border-0 p-2 w-10/12 outline-none focus:ring-2 focus:ring-indigo-600'
          onChange={e => setInputVal(e.target.value)}
          value={inputVal}
          placeholder="Write a note.." />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleAddEdit}
        >
          {isEdit ? "Update" : "Add Todo"}
        </button>
      </div>

      <div className="mt-8 mb-32 grid text-center w-full lg:w-1/2 lg:mb-0 lg:text-left">

        {todos.map((todo) => {
          return (
            <div key={todo.id}
              className="group flex justify-between rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <Todo
                todo={todo}
                markAsDone={(id: number) => markAsDone(id)}
                deleteTodo={(id: number) => deleteTodo(id)}
                editHandler={(todo: Todo) => editHandler(todo)}
                isEdit={isEdit}
              />
            </div>
          )
        })}


      </div>
    </main>
  )
}

import React from 'react'

function Todo({ todo, markAsDone, deleteTodo, editHandler, isEdit }) {
    return (
        <>
            <div className='flex gap-2'>
                <input type="checkbox"
                    title='Mark as done'
                    className='w-8 h-8 rounded-full'
                    onChange={() => markAsDone(todo.id)}
                    checked={todo.isCompleted}
                />
                <h2 className={`text-2xl font-semibold ${todo.isCompleted && "line-through"}`}>
                    {todo.text}
                </h2>
            </div>

            <div className="flex gap-2">
                {(!todo.isCompleted)&&
                    <button
                        type="submit"
                        className="rounded-md bg-gray-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        onClick={() => editHandler(todo)}
                    >
                        Edit Todo
                    </button>
                }
                <button
                    type="submit"
                    className="rounded-md bg-red-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => deleteTodo(todo.id)}
                >
                    Delete Todo
                </button>
            </div>
        </>
    )
}

export default Todo
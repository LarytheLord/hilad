import React, { useState } from 'react'
import { Clock, Edit2, Save, X } from 'lucide-react'

interface Class {
  subject: string
  topics: string[]
}

interface TodoItem {
  text: string
  completed: boolean
}

const StudyNotes: React.FC = () => {
  const currentDate = new Date()
  const hours = currentDate.getHours().toString().padStart(2, '0')
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')
  const day = currentDate.getDate()
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()]

  const [isEditing, setIsEditing] = useState(false)
  const [classes, setClasses] = useState<Class[]>([
    { subject: 'Math', topics: ['Topic 1', 'Topic 2', 'Topic 3'] },
    { subject: 'Science', topics: ['Topic 1', 'Topic 2', 'Topic 3'] },
    { subject: 'History', topics: ['Topic 1', 'Topic 2', 'Topic 3'] },
    { subject: 'English', topics: ['Topic 1', 'Topic 2', 'Topic 3'] },
  ])
  const [todos, setTodos] = useState<TodoItem[]>([
    { text: 'Review Math homework', completed: false },
    { text: 'Prepare for Science quiz', completed: false },
    { text: 'Read History chapter 5', completed: false },
    { text: 'Write English essay outline', completed: false },
  ])

  const handleClassChange = (index: number, field: 'subject' | 'topics', value: string | string[]) => {
    const newClasses = [...classes]
    newClasses[index][field] = value
    setClasses(newClasses)
  }

  const handleTodoChange = (index: number, field: 'text' | 'completed', value: string | boolean) => {
    const newTodos = [...todos]
    newTodos[index][field] = value
    setTodos(newTodos)
  }

  const handleAddClass = () => {
    setClasses([...classes, { subject: 'New Subject', topics: ['New Topic'] }])
  }

  const handleAddTodo = () => {
    setTodos([...todos, { text: 'New todo item', completed: false }])
  }

  const handleRemoveClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index))
  }

  const handleRemoveTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Study Notes</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded ${isEditing ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
        >
          {isEditing ? <Save className="inline-block mr-2" /> : <Edit2 className="inline-block mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        This Study Note Planner template is designed to help you organize your study sessions effectively.
      </p>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">My Notes</h3>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-black text-white p-2 rounded">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold">{hours}:{minutes}</div>
              <div className="text-gray-500">{weekday}</div>
            </div>
          </div>
          <div className="text-5xl font-bold">{day}</div>
        </div>
        <h4 className="font-semibold mb-2">Classes</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {classes.map((classItem, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded relative">
              {isEditing && (
                <button
                  onClick={() => handleRemoveClass(index)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              )}
              <h5 className="font-semibold">
                {isEditing ? (
                  <input
                    type="text"
                    value={classItem.subject}
                    onChange={(e) => handleClassChange(index, 'subject', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  classItem.subject
                )}
              </h5>
              <ul className="text-sm">
                {classItem.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => {
                          const newTopics = [...classItem.topics]
                          newTopics[topicIndex] = e.target.value
                          handleClassChange(index, 'topics', newTopics)
                        }}
                        className="w-full p-1 border rounded mt-1"
                      />
                    ) : (
                      topic
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => {
                    const newTopics = [...classItem.topics, 'New Topic']
                    handleClassChange(index, 'topics', newTopics)
                  }}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  + Add Topic
                </button>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <button
            onClick={handleAddClass}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Class
          </button>
        )}
        <h4 className="font-semibold mb-2">To-do's</h4>
        <ul className="list-disc list-inside">
          {todos.map((todo, index) => (
            <li key={index} className="mb-2 flex items-center">
              {isEditing ? (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => handleTodoChange(index, 'completed', e.target.checked)}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleTodoChange(index, 'text', e.target.value)}
                    className="flex-grow p-1 border rounded"
                  />
                  <button
                    onClick={() => handleRemoveTodo(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <button
            onClick={handleAddTodo}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Todo
          </button>
        )}
      </div>
    </div>
  )
}

export default StudyNotes
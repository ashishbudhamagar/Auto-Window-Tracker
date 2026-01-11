import { useState, useEffect } from 'react'
import { Pencil, Check, X } from 'lucide-react'



export default function EditableHeader({ windowName, onWindowNameChange }: any) {

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(windowName)
  const [error, setError] = useState("")

  useEffect(() => {
    setEditValue(windowName)
  }, [windowName])


  async function handleSave() {
    const trimmedValue = editValue.trim()

    if (trimmedValue === "") {
      setError("Window name required")
      return
    }

    if (trimmedValue === windowName) {
      handleCancel()
      return
    }

    const isUniqueName = await onWindowNameChange(trimmedValue, windowName)

    if (!isUniqueName) {
      setError("Window name already exists")
      return null
    }

    setError("")
    setIsEditing(false)
  }

  function handleCancel() {
    setEditValue(windowName)
    setError("")
    setIsEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div>
        <div className="flex items-center w-full">
          <input
            autoFocus
            spellCheck={false}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
              px-3 py-0.5 rounded-lg outline-none border-2 border-blue-500 w-[80%]"
          />

          <button
            onClick={handleSave}
            className="p-1.5 hover:bg-green-200 dark:hover:bg-green-900/60 rounded-lg mx-1"
          >
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-lg mr-1"
          >
            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
          </button>
        </div>

        {error && (
          <p className="w-full text-red-400 font-bold text-lg">
            {error}
          </p>
        )}
        
      </div>
    )
  }

  return (
    <div className="group flex items-center gap-2 w-full ">

      <h2
      title={windowName}
      className="text-2xl font-bold text-gray-700 dark:text-gray-100 flex-1 line-clamp-2 break-all">
        {windowName}
      </h2>

      <button
        onClick={() => setIsEditing(true)}
        className="p-1.5  hover:bg-gray-200 dark:hover:bg-gray-700 
          rounded-lg hidden group-hover:block mr-2"
      >
        <Pencil className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>

    </div>
  )
}

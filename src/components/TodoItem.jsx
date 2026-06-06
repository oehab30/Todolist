

function TodoItem({
  id,
  text,
  isCompleted,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  editingId,
  editingText,
  setEditingText,
}) {
  const isEditing = editingId === id;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSave(id);
    } else if (e.key === "Escape") {
      onEdit(null);
    }
  };

  return (
    <div className={`group flex items-center gap-4 p-4 mb-4 glass-card border-white/5 transition-all duration-500 animate-fade-in shadow-lg ${
      isEditing ? "edit-mode-active ring-2 ring-purple-500/20" : "bg-white/5 hover:border-white/20"
    }`}>
      <button
        onClick={() => onToggle(id)}
        className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isCompleted
            ? "bg-purple-600 border-purple-600"
            : "border-white/20 hover:border-purple-500/50"
        }`}
        aria-label={isCompleted ? "Unmark task as completed" : "Mark task as completed"}
      >
        {isCompleted && (
          <svg className="w-5 h-5 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <div className="animate-scale-in">
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-white/10 border-b-2 border-purple-500 outline-none px-2 py-1 text-lg text-white transition-all focus:bg-white/15 rounded-t-lg"
              autoFocus
            />
          </div>
        ) : (
          <p
            className={`text-lg transition-all duration-300 ${
              isCompleted ? "text-white/30 line-through" : "text-white/90"
            }`}
          >
            {text}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isEditing ? (
          <button
            onClick={() => onSave(id)}
            className="p-2 hover:bg-white/10 rounded-lg text-purple-400 transition-colors animate-slide-in-right"
            aria-label="Save changes"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => onEdit(id)}
            className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all duration-300 hover:rotate-12 active:scale-90"
            aria-label="Edit task"
          >
            <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}

        <button
          onClick={() => onDelete(id)}
          className="p-2 hover:bg-red-500/20 rounded-lg text-white/30 hover:text-red-400 transition-colors"
          aria-label="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;


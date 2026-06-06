import { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";
import Timer from "./Timer";
import Clock from "./Clock";
import Calculator from "./Calculator";

function TodoList() {
  const [activeTab, setActiveTab] = useState("timer"); // timer, calc
  const [editingId, setEditingId] = useState(null);
  // ... rest of state stays same ...
  const [editingText, setEditingText] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const inputRef = useRef(null);

  function addTodo() {
    const text = inputRef.current.value.trim();
    if (!text) return;

    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
    };

    setTodos([newTodo, ...todos]); // Add new todos to the top
    inputRef.current.value = "";
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function startEdit(id) {
    if (id === null) {
      setEditingId(null);
      setEditingText("");
      return;
    }
    const todo = todos.find((todo) => todo.id === id);
    setEditingId(id);
    setEditingText(todo.text);
  }

  function saveEdit(id) {
    if (!editingText.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );

    setEditingId(null);
    setEditingText("");
  }

  const completedCount = todos.filter((t) => t.isCompleted).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
      {/* Sidebar: Clock, Tabs & Tools */}
      <div className="glass-card p-8 sticky flex flex-col gap-8">
        <Clock />
        
        <div className="flex bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("timer")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "timer" ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white/60"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => setActiveTab("calc")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "calc" ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white/60"
            }`}
          >
            Calculator
          </button>
        </div>

        <div className="h-px bg-white/5 w-full" />
        
        <div className="min-h-[300px]">
          {activeTab === "timer" ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-purple-500 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Focus Timer</h2>
              </div>
              <Timer />
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Calculator</h2>
              </div>
              <Calculator />
            </div>
          )}
        </div>
      </div>

      {/* Main: Todo List */}
      <div className="flex flex-col gap-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Daily Tasks
            </h1>
            <p className="text-white/50 font-medium">
              You have {pendingCount} tasks remaining today
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-white/40 text-sm block">Completed</span>
              <span className="text-xl font-bold">{completedCount}</span>
            </div>
            <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-white/40 text-sm block">Pending</span>
              <span className="text-xl font-bold">{pendingCount}</span>
            </div>
          </div>
        </header>

        <div className="relative group">
          <input
            ref={inputRef}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="What needs to be done?"
            className="w-full h-16 pl-6 pr-32 text-xl bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-white/20"
          />
          <button
            onClick={addTodo}
            className="absolute right-2 top-2 bottom-2 px-5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            Add Task
          </button>
        </div>

        <div className="max-h-[calc(100vh-350px)] overflow-y-auto pr-2 custom-scrollbar">
          {todos.length === 0 ? (
            <div className="text-center py-20 bg-white/2 border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-white/20 text-lg">No tasks yet. Start by adding one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                isCompleted={todo.isCompleted}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEdit}
                onSave={saveEdit}
                editingId={editingId}
                editingText={editingText}
                setEditingText={setEditingText}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

const STORAGE_KEY = 'todos';

export const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
};

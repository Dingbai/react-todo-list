interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const DB_NAME = 'TodoList';
const DB_VERSION = 1;
const TODO_STORE_NAME = 'todos';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(TODO_STORE_NAME, { keyPath: 'id' });
    };
  });
}

export async function addTodo(todo: Todo): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(TODO_STORE_NAME, 'readwrite');
  const store = tx.objectStore(TODO_STORE_NAME);
  store.add(todo);
  tx.oncomplete = () => {
    console.log('addTodo tx complete');
  };
}

export async function updateTodo(todo: Todo): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(TODO_STORE_NAME, 'readwrite');
  const store = tx.objectStore(TODO_STORE_NAME);
  store.put(todo);
  tx.oncomplete = () => {
    console.log('updateTodo tx complete');
  };
}

export async function deleteTodoById(id: number): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(TODO_STORE_NAME, 'readwrite');
  const store = tx.objectStore(TODO_STORE_NAME);
  store.delete(id);
  tx.oncomplete = () => {
    console.log('deleteTodoById tx complete');
  };
}

export async function getTodoById(id: number): Promise<Todo | undefined> {
  const db = await openDatabase();
  const tx = db.transaction(TODO_STORE_NAME, 'readonly');
  const store = tx.objectStore(TODO_STORE_NAME);
  const request = store.get(id);
  return new Promise((resolve) => {
    tx.oncomplete = () => {
      console.log('getTodoById tx complete');
      resolve(request.result);
    };
  });
}

export async function getAllTodos(): Promise<Todo[]> {
  const db = await openDatabase();
  const tx = db.transaction(TODO_STORE_NAME, 'readonly');
  const store = tx.objectStore(TODO_STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve) => {
    tx.oncomplete = () => {
      console.log('getAllTodos tx complete');
      resolve(request.result || []);
    };
  });
}

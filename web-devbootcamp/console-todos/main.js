let input = prompt('What would you like todo');
let todos = ['get milk'];

while (input !== 'quit') {
  if (input === 'list') {
    listTodos();
  } else if (input === 'new') {
    newTodo();
  } else if (input === 'delete') {
    deleteTodo();
  }
  input = prompt('What would you like todo');
}

function listTodos() {
  console.log('*********');
  todos.forEach((todo, index) => {
    console.log(index + ': ' + todo);
  });
  console.log('*********');
}

function newTodo() {
  let newTodo = prompt('Add new todo');
  todos.push(newTodo);
  console.log('Todo added');
}

function deleteTodo() {
  let index = prompt('What index would you like to delete');
  todos.splice(index, 1);
  console.log('Todo deleted');
}

console.log('Okay you quit the app');

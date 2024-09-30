function Todocomponent({ todo }) {
  return (
    <div>
      <h3>{todo.body}</h3>
      <p>{todo.description}</p>
    </div>
  );
}

export { Todocomponent };

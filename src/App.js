import React, { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  {
    id: 2,
    description: 'Boarding passes & tickets',
    quantity: 2,
    packed: false,
  },

  { id: 4, description: 'Charger & Power Bank', quantity: 1, packed: false },
  { id: 5, description: 'Toothbrush & Toothpaste', quantity: 2, packed: true },
  { id: 6, description: 'Sunscreen', quantity: 1, packed: false },
  { id: 7, description: 'Headphones', quantity: 1, packed: true },
  { id: 8, description: 'Water Bottle', quantity: 1, packed: false },
  { id: 9, description: 'Sunglasses', quantity: 1, packed: false },
  {
    id: 10,
    description: 'Band-aids & pain relief',
    quantity: 1,
    packed: false,
  },
];

export default function App() {
  //const [items, setItems] = useState([]);
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((x) => (x.id === id ? { ...x, packed: !x.packed } : x)),
    );
  }
  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((x) => x.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    console.log(e);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription('');
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((x) => (
          <option value={x} key={x}>
            {x}
          </option>
        ))}
        {/* <option value={1}>1</option>
         <option value={2}>2</option>
         <option value={3}>3</option>
         <option value={4}>4</option>
         */}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          console.log(e.target.value);
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((x) => (
          <Item
            item={x}
            key={x.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className={item.packed ? 'packed' : ''}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span className="item-text">{item.description}</span>
      <span className="qty">{item.quantity}</span>
      <button className="delete-btn" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((x) => x.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        💼 You have {numItems} items on your list, and you already packed
        {numPacked} ({percentage}%)
      </em>
    </footer>
  );
}

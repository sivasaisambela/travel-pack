import React, { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Item from './Item';
import Stats from './Stats';

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
  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?',
    );
    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default function Item({ item, onDeleteItem, onToggleItem }) {
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

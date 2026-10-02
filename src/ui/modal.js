import { createElement as el } from './createElement.js';

export function createModal() {
  const title = el('h2', { attributes: { id: 'modal-title' } });
  const content = el('div');
  const closeButton = el('button', { text: 'Close', attributes: { type: 'button' } });
  const panel = el('div', { className: 'modal-panel', children: [title, content, closeButton] });
  const dialog = el('dialog', {
    className: 'modal', attributes: { 'aria-labelledby': 'modal-title' }, children: [panel],
  });
  let previousFocus = null;
  let previousOverflow = '';

  function close() {
    if (!dialog.open) return;
    dialog.close();
    document.body.style.overflow = previousOverflow;
    if (previousFocus?.isConnected) previousFocus.focus();
  }

  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  document.body.append(dialog);

  function open(heading, children) {
    title.textContent = heading;
    content.replaceChildren(...children);
    if (!dialog.open) {
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    closeButton.focus();
  }

  return { open, close };
}

const notesGrid = document.getElementById('notes-grid');
const addNoteBtn = document.getElementById('add-note-btn');
const modal = document.getElementById('note-modal');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// --- Funções do Modal ---
function toggleModal() {
  const isHidden = modal.classList.contains('hidden');

  if (isHidden) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.replace('opacity-0', 'opacity-100');
      modal.querySelector('div').classList.replace('scale-95', 'scale-100');
    }, 10);
  } else {
    modal.classList.replace('opacity-100', 'opacity-0');
    modal.querySelector('div').classList.replace('scale-100', 'scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
    clearModal();
  }
}

function clearModal() {
  document.getElementById('modal-title').value = '';
  document.getElementById('modal-content').value = '';
}

function saveNewNote() {
  const title = document.getElementById('modal-title').value;
  const content = document.getElementById('modal-content').value;
  const categorySelect = document.getElementById('modal-category');
  const category = categorySelect.value;
  const color = categorySelect.options[categorySelect.selectedIndex].dataset.color;

  if (!title || !content) return alert("Preencha todos os campos!");

  const newNote = {
    id: Date.now(),
    title,
    content,
    category,
    color
  };

  notes.push(newNote);
  saveAndRefresh();
  toggleModal();
}

// --- Funções de Lógica ---
function renderNotes() {
  // Preservar o esqueleto de "Add New"
  const skeleton = notesGrid.querySelector('button.border-dashed');
  notesGrid.innerHTML = '';

  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = `group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all border-l-4 border-l-${note.color}-400`;

    div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-bold text-lg">${note.title}</h3>
                <button onclick="deleteNote(${note.id})" class="text-slate-400 hover:text-red-500 transition-colors">
                    <span class="material-symbols-outlined text-xl">delete</span>
                </button>
            </div>
            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">${note.content}</p>
            <div class="flex items-center gap-1.5 text-${note.color}-600 dark:text-${note.color}-400 bg-${note.color}-50 dark:bg-${note.color}-400/10 px-2 py-1 rounded text-xs font-semibold w-fit">
                <span class="material-symbols-outlined text-sm leading-none">label</span>
                <span>${note.category}</span>
            </div>
        `;
    notesGrid.appendChild(div);
  });

  if (skeleton) notesGrid.appendChild(skeleton);
}

function deleteNote(id) {
  if (confirm("Excluir nota?")) {
    notes = notes.filter(n => n.id !== id);
    saveAndRefresh();
  }
}

function saveAndRefresh() {
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

// Listeners
addNoteBtn.onclick = toggleModal;
notesGrid.addEventListener('click', (e) => {
  if (e.target.closest('button.border-dashed')) toggleModal();
});

renderNotes();
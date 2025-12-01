"use strict";

const listEl = document.getElementById("task-list");
const inputEl = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// =========================
// Lưu dữ liệu
// =========================
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// =========================
// Render UI
// =========================
function render() {
  listEl.innerHTML = "";

  tasks
    .filter((t) => {
      if (currentFilter === "active") return !t.done;
      if (currentFilter === "done") return t.done;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task" + (task.done ? " done" : "");

      li.innerHTML = `
        <input type="checkbox" ${
          task.done ? "checked" : ""
        } data-idx="${index}">
        <span class="text" data-edit="${index}">${task.text}</span>
        <button class="delete" data-del="${index}">X</button>
      `;

      listEl.appendChild(li);
    });
}

// =========================
// Thêm task
// =========================
addBtn.onclick = () => {
  const text = inputEl.value.trim();
  if (text === "") return;

  tasks.push({ text, done: false });
  inputEl.value = "";
  save();
  render();
};

// Enter = Add
inputEl.onkeydown = (e) => {
  if (e.key === "Enter") addBtn.onclick();
};

// =========================
// Delegation: Xử lý click trong list
// =========================
listEl.onclick = (e) => {
  const idx = e.target.dataset.idx;
  const del = e.target.dataset.del;
  const edit = e.target.dataset.edit;

  // Toggle checkbox
  if (idx !== undefined) {
    tasks[idx].done = !tasks[idx].done;
    save();
    render();
  }

  // Xóa
  if (del !== undefined) {
    tasks.splice(del, 1);
    save();
    render();
  }

  // Edit inline
  if (edit !== undefined) {
    const span = e.target;
    const oldText = span.textContent;

    const input = document.createElement("input");
    input.value = oldText;
    input.className = "edit-input";

    span.replaceWith(input);
    input.focus();

    input.onblur = () => {
      tasks[edit].text = input.value.trim() || oldText;
      save();
      render();
    };
  }
};

// =========================
// Clear completed tasks
// =========================
clearBtn.onclick = () => {
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
};

// =========================
// Bộ lọc
// =========================
filterBtns.forEach((btn) => {
  btn.onclick = () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  };
});

// Load lần đầu
render();

const ul = document.getElementById("ul");
const input = document.getElementById("input");
const add = document.getElementById("add");
//ham luu
function save() {
  localStorage.setItem("hehe", ul.innerHTML);
}
//ham add
add.onclick = () => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  li.textContent = input.value;
  input.value = "";
  li.appendChild(checkbox);
  ul.appendChild(li);
  save();
};
//ham delete
const deletee = document.getElementById("delete");
deletee.onclick = () => {
  const liChild = document.querySelectorAll("#ul li");
  liChild.forEach((x) => {
    const checkbox = x.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      x.remove();
    }
  });
};
//window

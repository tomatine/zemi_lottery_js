const members = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Helen",
    "Ivan",
    "John",
    "Kathy",
    "Linda",
    "Mike",
    "Nancy",
    "Oscar",
    "Penny",
    "Queen",
    "Robert",
    "Susan",
    "Tom",
    "Uma",
    "Victor",
    "Wendy",
    "Xavier",
    "Yvonne",
    "Zoe",
];

const candidateCheckbox = document.getElementById("candidate-checkbox");
const numQuestioner = document.getElementById("num_questioner");
const checkButton = document.getElementById("checkButton");
const clearButton = document.getElementById("clearButton");
const drawButton = document.getElementById("drawButton");
const questionerTable = document.getElementById("questioner_table");

function createCandidateCheckbox() {
    members.forEach((member) => {
        const label = createLabelWithCheckbox(member);
        candidateCheckbox.appendChild(label);
    });
}

function createLabelWithCheckbox(member) {
    const label = document.createElement("label");
    label.classList.add("checkbox-inline");
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = member;
    checkbox.checked = true;

    const textNode = document.createTextNode(" " + member);

    label.appendChild(checkbox);
    label.appendChild(textNode);

    return label;
}

function updateNumQuestionerMax() {
    const checked = candidateCheckbox.querySelectorAll("input:checked");
    numQuestioner.max = checked.length;
}

function updateQuestionerTable(data) {
    questionerTable.innerHTML = `
    <tr>
      <th>質問者</th>
    </tr>
  `;
    data.forEach((item) => {
        const row = createTableRow(item);
        questionerTable.appendChild(row);
    });
}

function createTableRow(item) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item}</td>`;
    return row;
}

function getSelectedCandidates() {
    const checked = candidateCheckbox.querySelectorAll("input:checked");
    return Array.from(checked).map((checkbox) => checkbox.value);
}

function selectAllCandidates() {
    setAllCandidatesCheckboxState(true);
    updateNumQuestionerMax();
}

function clearAllCandidates() {
    setAllCandidatesCheckboxState(false);
    updateNumQuestionerMax();
}

function setAllCandidatesCheckboxState(state) {
    const checkboxes = candidateCheckbox.querySelectorAll("input");
    checkboxes.forEach((checkbox) => (checkbox.checked = state));
}

function drawQuestioners() {
    const selectedCandidates = getSelectedCandidates();
    const num = parseInt(numQuestioner.value);
    const questioners = getRandomQuestioners(selectedCandidates, num);
    updateQuestionerTable(questioners);
}

function getRandomQuestioners(candidates, num) {
    const questioners = [];

    for (let i = 0; i < num; i++) {
        const index = Math.floor(Math.random() * candidates.length);
        const questioner = candidates.splice(index, 1)[0];
        questioners.push(questioner);
    }

    return questioners;
}

createCandidateCheckbox();
updateNumQuestionerMax();

checkButton.addEventListener("click", selectAllCandidates);
clearButton.addEventListener("click", clearAllCandidates);
drawButton.addEventListener("click", drawQuestioners);

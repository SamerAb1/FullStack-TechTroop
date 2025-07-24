const txtInput = document.getElementsByClassName("word-input")[0];
const addBtn = document.getElementsByClassName("add-word-btn");

addBtn.onclick = () => {
  handleCommand(cmd, args);
};

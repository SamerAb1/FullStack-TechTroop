const nameInput = document.getElementById("name");
const salaryInput = document.getElementById("salary");
const birthdayInput = document.getElementById("birthday");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submit-btn");
const output = Object.assign(document.createElement("div"), { id: "output" });

function isOnlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function isOnlyNumbers(str) {
  return /^[0-9]+$/.test(str);
}

const checkName = (name) => {
  return isOnlyLetters(name) && name.length > 1;
};

const checkSalary = (salary) => {
  let intSalary = parseInt(salary);
  return intSalary > 9999 && intSalary < 16001;
};

const checkBirthday = (birthday) => {
  return birthday && birthday.trim() !== "";
};

const checkPhone = (phone) => {
  return isOnlyNumbers(phone) && phone.length === 10;
};

const setOutput = () => {
  output.style.color = "red";
  output.style.margin = "16px 0 0 30px";
  output.style.fontFamily = "'Montserrat', Arial, sans-serif";
};
const validateInputs = function () {
  const name = nameInput.value;
  const salary = salaryInput.value;
  const birthday = birthdayInput.value;
  const phone = phoneInput.value;
  if (checkName(name)) {
    if (checkSalary(salary)) {
      if (checkBirthday(birthday)) {
        if (checkPhone(phone)) {
          output.textContent = "Thank You!";
        } else {
          output.textContent = "Invalid phone";
        }
      } else {
        output.textContent = "Invalid Birthday";
      }
    } else {
      output.textContent = "Invalid salary";
    }
  } else {
    output.textContent = "Invalid Name";
  }
};

submitBtn.onclick = (event) => {
  event.preventDefault();
  validateInputs();
  setOutput();
  document.getElementById("bottom-row").appendChild(output);
};

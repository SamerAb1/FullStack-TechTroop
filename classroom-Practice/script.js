let userStorage = {
  darkMode: true,
  showSideNav: false,
  defaultResultCount: 9,
  latestMarks: {
    sectionA: 92,
    sectionB: 11,
  },
  cart: [
    { id: 3112, count: 2 },
    { id: 812, count: 16 },
  ],
};

localStorage.userStorage = JSON.stringify(userStorage);
let data = JSON.parse(localStorage.userStorage);

console.log(data.cart[data.cart.length - 1].count);

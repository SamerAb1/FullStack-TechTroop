const {add, calculateHyp, clearLowPriority} = require('./code')

test("add should return sum of a + b", () => {
    let sum = add(1, 2)
    expect(sum).toBe(3)
})

test("calculateHyp should return square root of (a^2 + b^2)", () => {
    return expect(calculateHyp(3,4)).toBe(5);
})

test("clearLowPriority should return array of items with 'HIGH' priority)", () => {
    let tasks = [{ text: "dummy", priority: "HIGH" }, { text: "dummy", priority: "LOW" }];
    let filteredtasks = clearLowPriority(tasks);

    filteredtasks.forEach(element => { expect(element.priority).toBe("HIGH");
        
    });
})

const PictureManager = require('./code')

test("addPicture should add a picture URL to the pictureURLs array", function () {
  //sanity 
  const picManager = new PictureManager()
  expect(picManager.pictureURLs.length).toBe(0)
  
  picManager.addPicture("some_url")
  picManager.addPicture("some_url1")
  expect(picManager.pictureURLs.length).toBe(2)           //test
  expect(picManager.pictureURLs).toContain("some_url")    //double check 
  picManager.removePicture("some_url")
  expect(picManager.pictureURLs.length).toBe(1)
  expect(picManager.pictureURLs).not.toContain("some_url")    

})
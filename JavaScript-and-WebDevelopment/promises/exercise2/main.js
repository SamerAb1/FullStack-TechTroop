function processFile(filename, processingTime) {
  return new Promise((resolve, reject) => {
    console.log(`Starting to process ${filename}...`);

    setTimeout(() => {
      // 15% chance of failure for realistic simulation
      if (Math.random() < 0.15) {
        reject(new Error(`Failed to process ${filename}`));
      } else {
        const result = {
          filename: filename,
          size: Math.floor(Math.random() * 1000) + 100, // Random size
          processedAt: new Date().toLocaleTimeString(),
        };
        console.log(`✓ Completed ${filename}`);
        resolve(result);
      }
    }, processingTime);
  });
}
const startTime = Date.now();

// TODO: Use Promise.all() to process these files concurrently:
const files = [
  { name: "document1.pdf", time: 2000 },
  { name: "image1.jpg", time: 1500 },
  { name: "data.csv", time: 3000 },
  { name: "report.docx", time: 1000 },
];

let arrayPromise = files.map((file) => processFile(file.name, file.time));

Promise.all(arrayPromise)
  .then((promiseResults) => {
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    promiseResults.forEach((result) => {
      console.log(
        `File: ${result.name} Size: ${result.size}KB Process time: ${result.processedAt}`
      );
    });
  })
  .catch((err) => console.log(err.message));

// TODO:
// 1. Create an array of promises using the files array
// 2. Use Promise.all() to wait for all files to complete
// 3. Log total processing time and all results
// 4. Handle the case where any file fails

// Bonus: Try Promise.allSettled() to see results even if some files fail

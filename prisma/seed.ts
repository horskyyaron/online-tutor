const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.challenge.createMany({
    data: [
      {
        title: "Sum of Numbers",
        starterCode:
          "function sumUpTo(n) {\n    let sum = 0;\n    // Your code here\n    return sum;\n}\n\nconsole.log(sumUpTo(5)); // Should return 15",
        language: "javascript",
        description:
          "Write a function that calculates the sum of all numbers from 1 up to (and including) a given number.",
      },
      {
        title: "String Reversal",
        starterCode:
          'function reverseString(str) {\n    let reversed = \'\';\n    // Your code here\n    return reversed;\n}\n\nconsole.log(reverseString("hello")); // Should return "olleh"',
        language: "javascript",
        description: "Write a function that takes a string and returns it reversed."
      },
      {
        title: "Find the Largest Number",
        starterCode:
          "function findLargest(arr) {\n    let largest = arr[0];\n    // Your code here\n    return largest;\n}\n\nconsole.log(findLargest([3, 1, 4, 6, 2, 8])); // Should return 8",
        language: "javascript",
        description: "Write a function that finds the largest number in an array."
      },
      {
        title: "Checking for Palindromes",
        starterCode:
          'function isPalindrome(str) {\n    // Your code here\n    return true; // or false\n}\n\nconsole.log(isPalindrome("racecar")); // Should return true',
        language: "javascript",
        description: "Write a function that checks whether a given string is a palindrome (reads the same forward and backward)."
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

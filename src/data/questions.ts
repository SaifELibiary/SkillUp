
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correctAnswer: 0,
    category: "Web Development",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which CSS property is used to change the text color of an element?",
    options: [
      "text-color",
      "font-color",
      "color",
      "text-style"
    ],
    correctAnswer: 2,
    category: "Web Development",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the correct way to declare a JavaScript variable?",
    options: [
      "variable myVar;",
      "var myVar;",
      "declare myVar;",
      "v myVar;"
    ],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which of the following is NOT a JavaScript data type?",
    options: [
      "Number",
      "String",
      "Boolean",
      "Float"
    ],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "medium"
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1,
    category: "Web Development",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Which HTML element is used to define the largest heading?",
    options: [
      "<h6>",
      "<h1>",
      "<header>",
      "<heading>"
    ],
    correctAnswer: 1,
    category: "Web Development",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "What is the purpose of the 'useState' hook in React?",
    options: [
      "To handle side effects",
      "To manage component state",
      "To create context",
      "To handle routing"
    ],
    correctAnswer: 1,
    category: "React",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: [
      "append()",
      "add()",
      "push()",
      "insert()"
    ],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "medium"
  },
  {
    id: 9,
    question: "What is the box model in CSS?",
    options: [
      "A way to create boxes",
      "The fundamental concept describing how elements are rendered",
      "A debugging tool",
      "A layout framework"
    ],
    correctAnswer: 1,
    category: "Web Development",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Which of the following is the correct way to create a function in JavaScript?",
    options: [
      "function = myFunction() {}",
      "create myFunction() {}",
      "function myFunction() {}",
      "def myFunction() {}"
    ],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "easy"
  }
];

export const getRandomQuestions = (count: number = 5): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDifficultyColor = (difficulty: Question['difficulty']) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

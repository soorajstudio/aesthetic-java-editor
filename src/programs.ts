// programs.ts

export interface JavaProgram {
  id: number;
  name: string;
  description: string;
  code: string;
  output: string;
  category: string;
  categoryColor: string;
  cells?: { query: string; output: string }[];
}

export const javaDictionary: Record<string, string> = {
  public: "Access modifier: Makes the class or method visible to all other classes.",
  class: "The keyword used to define a blueprint for creating objects.",
  static: "Means the member belongs to the class itself, rather than an instance of the class.",
  void: "Indicates that the method does not return any value.",
  main: "The starting point of every Java application where execution begins.",
  System: "A built-in class that provides access to standard input, output, and error streams.",
  import: "Used to include external classes or entire packages into your current file.",
  package: "A namespace that organizes a set of related classes and prevents naming conflicts.",
  abstract: "Used to declare a class or method that is incomplete and must be implemented by a subclass.",
  extends: "Used to create a subclass (inheritance), allowing one class to acquire properties of another.",
  interface: "A reference type in Java, similar to a class, that can contain only constants and method signatures.",
  implements: "Used by a class to inherit the abstract methods of an interface.",
  try: "Starts a block of code that will be tested for errors while it is being executed.",
  catch: "Defines a block of code to be executed if an error occurs in the try block.",
  throw: "Used to explicitly throw an exception from a method or any block of code.",
  new: "Used to create a new instance (object) of a class.",
  this: "A reference variable that refers to the current object.",
  super: "A reference variable used to refer to immediate parent class objects.",
  final: "Used to finalize the implementations of classes, methods, and variables (making them unchangeable).",
  if: "A conditional statement that executes a block of code if the condition is true.",
  else: "Executes a block of code if the 'if' condition is false.",
  for: "A loop used to repeat a block of code a specific number of times.",
  int: "A primitive data type used to store whole numbers.",
  double: "A primitive data type used to store decimal (floating-point) numbers.",
  boolean: "A primitive data type that can only hold 'true' or 'false' values.",
  String: "A built-in class in Java used to store and manipulate sequences of characters.",
  Math: "A built-in Java class that provides mathematical functions like pow, sqrt, abs, etc.",
  println: "A method of System.out used to print a line of text followed by a newline.",
  print: "A method of System.out that prints text without moving to a new line.",
  args: "An array of String arguments passed to the main method from the command line.",
  return: "Exits the current method and optionally returns a value to the caller.",
  while: "A loop that keeps executing as long as a given condition remains true.",
  break: "Immediately exits the nearest enclosing loop or switch statement.",
  Scanner: "A class in java.util used for obtaining the input of primitive types and strings.",
  Exception: "The superclass of all errors and exceptions in the Java language.",
  length: "A method or property used to get the number of characters in a string or elements in an array.",
  nextLine: "A method of the Scanner class that reads the rest of the current line.",
  getMessage: "A method that returns a detailed message string of an exception.",
  out: "A static member of the System class representing the standard output stream.",
  in: "A static member of the System class representing the standard input stream.",
};

export const javaPrograms: JavaProgram[] = [
  {
    id: 1, category: "Math", categoryColor: "#38bdf8",
    name: "Simple and Compound Interest",
    description: "Calculate simple and compound interest taking input from the user.",
    code: `import java.util.Scanner;\npublic class InterestCalculator {\n   public static void main(String[] args) {\n       Scanner sc = new Scanner(System.in);\n       double principal, rate, time, simpleInterest, compoundInterest, amount;\n       System.out.print("Enter Principal Amount: ");\n       principal = sc.nextDouble();\n       System.out.print("Enter Rate of Interest: ");\n       rate = sc.nextDouble();\n       System.out.print("Enter Time (in years): ");\n       time = sc.nextDouble();\n       simpleInterest = (principal * rate * time) / 100;\n       amount = principal * Math.pow((1 + rate / 100), time);\n       compoundInterest = amount - principal;\n       System.out.println("\\nSimple Interest = " + simpleInterest);\n       System.out.println("Compound Interest = " + compoundInterest);\n       sc.close();\n   }\n}`,
    output: "Enter Principal Amount: 10000\nEnter Rate of Interest: 5\nEnter Time (in years): 2\nSimple Interest = 1000.0\nCompound Interest = 1025.0"
  },
  {
    id: 2, category: "Algorithm", categoryColor: "#a78bfa",
    name: "Fibonacci Series",
    description: "Print the Fibonacci series up to a specified number of terms.",
    code: `import java.util.Scanner;\npublic class FibonacciSeries\n{\n   public static void main(String args[])\n   {\n       int n, a = 0, b = 1, c, i;\n       Scanner sc = new Scanner(System.in);\n       System.out.print("Enter the number of terms: ");\n       n = sc.nextInt();\n       System.out.println("Fibonacci Series:");\n       for(i = 1; i <= n; i++)\n       {\n           System.out.print(a + " ");\n           c = a + b;\n           a = b;\n           b = c;\n       }\n   }\n}`,
    output: "Enter the number of terms: 7\nFibonacci Series:\n0 1 1 2 3 5 8 "
  },
  {
    id: 3, category: "Logic", categoryColor: "#f472b6",
    name: "Prime Numbers up to N",
    description: "Find and display all prime numbers up to a user-defined limit.",
    code: `import java.util.Scanner;\npublic class PrimeLimit\n{\n   public static void main(String args[])\n   {\n       int limit, i, j, flag;\n       Scanner sc = new Scanner(System.in);\n       System.out.print("Enter the limit: ");\n       limit = sc.nextInt();\n       System.out.println("Prime Numbers are:");\n       for(i = 2; i <= limit; i++)\n       {\n           flag = 0;\n           for(j = 2; j <= i / 2; j++)\n       {\n               if(i % j == 0)\n               {\n                   flag = 1;\n                   break;\n               }\n           }\n           if(flag == 0)\n           {\n               System.out.print(i + " ");\n           }\n       }\n   }\n}`,
    output: "Enter the limit: 20\nPrime Numbers are:\n2 3 5 7 11 13 17 19 "
  },
  {
    id: 4, category: "Arrays", categoryColor: "#fb923c",
    name: "Matrix Addition and Multiplication",
    description: "Perform addition and multiplication of two matrices based on user input.",
    code: `import java.util.Scanner;\npublic class MatrixOperations\n{\n   public static void main(String args[])\n   {\n       int r1, c1, r2, c2, i, j, k;\n       Scanner sc = new Scanner(System.in);\n       System.out.print("Enter rows and columns of Matrix 1: ");\n       r1 = sc.nextInt();\n       c1 = sc.nextInt();\n       System.out.print("Enter rows and columns of Matrix 2: ");\n       r2 = sc.nextInt();\n       c2 = sc.nextInt();\n       int a[][] = new int[r1][c1];\n       int b[][] = new int[r2][c2];\n       int sum[][] = new int[r1][c1];\n       int mul[][] = new int[r1][c2];\n       System.out.println("Enter elements of Matrix 1:");\n       for(i = 0; i < r1; i++)\n       {\n           for(j = 0; j < c1; j++)\n           {\n               a[i][j] = sc.nextInt();\n           }\n       }\n       System.out.println("Enter elements of Matrix 2:");\n       for(i = 0; i < r2; i++)\n       {\n           for(j = 0; j < c2; j++)\n           {\n               b[i][j] = sc.nextInt();\n           }\n       }\n       if(r1 == r2 && c1 == c2)\n       {\n           for(i = 0; i < r1; i++)\n           {\n               for(j = 0; j < c1; j++)\n               {\n                   sum[i][j] = a[i][j] + b[i][j];\n               }\n           }\n           System.out.println("Matrix Addition Result:");\n           for(i = 0; i < r1; i++)\n           {\n               for(j = 0; j < c1; j++)\n               {\n                   System.out.print(sum[i][j] + " ");\n               }\n               System.out.println();\n           }\n       }\n       else\n       {\n           System.out.println("Addition not possible");\n       }\n       if(c1 == r2)\n       {\n           for(i = 0; i < r1; i++)\n           {\n               for(j = 0; j < c2; j++)\n               {\n                   mul[i][j] = 0;\n                   for(k = 0; k < c1; k++)\n                   {\n                       mul[i][j] = mul[i][j] + a[i][k] * b[k][j];\n                   }\n               }\n           }\n           System.out.println("Matrix Multiplication Result:");\n           for(i = 0; i < r1; i++)\n           {\n               for(j = 0; j < c2; j++)\n               {\n                   System.out.print(mul[i][j] + " ");\n               }\n               System.out.println();\n           }\n       }\n       else\n       {\n           System.out.println("Multiplication not possible");\n       }\n   }\n}`,
    output: "Enter rows and columns of Matrix 1: 2 2\nEnter rows and columns of Matrix 2: 2 2\nEnter elements of Matrix 1:\n1 2\n3 4\nEnter elements of Matrix 2:\n5 6\n7 8\nMatrix Addition Result:\n6 8 \n10 12 \nMatrix Multiplication Result:\n19 22 \n43 50 "
  },
  {
    id: 5, category: "OOP", categoryColor: "#34d399",
    name: "Area of Rectangle",
    description: "Calculate the area of a rectangle using object-oriented concepts.",
    code: `import java.util.Scanner;\nclass Rectangle\n{\n   int length;\n   int breadth;\n   void area()\n   {\n       int a;\n       a = length * breadth;\n       System.out.println("Area of Rectangle = " + a);\n   }\n}\npublic class RectangleDemo\n{\n   public static void main(String args[])\n   {\n       Rectangle r = new Rectangle();\n       Scanner sc = new Scanner(System.in);\n       System.out.print("Enter length: ");\n       r.length = sc.nextInt();\n       System.out.print("Enter breadth: ");\n       r.breadth = sc.nextInt();\n       r.area();\n   }\n}`,
    output: "Enter length: 10\nEnter breadth: 5\nArea of Rectangle = 50"
  },
  {
    id: 6, category: "OOP", categoryColor: "#34d399",
    name: "Method Overloading (Area)",
    description: "Demonstrate compile-time polymorphism using method overloading for calculating area.",
    code: `import java.util.Scanner;\nclass Area\n{\n   void area(int side)\n   {\n       int a;\n       a = side * side;\n       System.out.println("Area of Square = " + a);\n   }\n   void area(int length, int breadth)\n   {\n       int a;\n       a = length * breadth;\n       System.out.println("Area of Rectangle = " + a);\n   }\n}\npublic class MethodOverloadDemo\n{\n   public static void main(String args[])\n   {\n       Scanner sc = new Scanner(System.in);\n       Area obj = new Area();\n       int side, length, breadth;\n       System.out.print("Enter side of square: ");\n       side = sc.nextInt();\n       System.out.print("Enter length of rectangle: ");\n       length = sc.nextInt();\n       System.out.print("Enter breadth of rectangle: ");\n       breadth = sc.nextInt();\n       obj.area(side);\n       obj.area(length, breadth);\n   }\n}`,
    output: "Enter side of square: 4\nEnter length of rectangle: 10\nEnter breadth of rectangle: 5\nArea of Square = 16\nArea of Rectangle = 50"
  },
  {
    id: 7, category: "OOP", categoryColor: "#34d399",
    name: "Single Level Inheritance – CricketPlayer",
    description: "Show inheritance where a subclass provides additional properties and methods.",
    code: `import java.util.Scanner;\nclass Player\n{\n   int id;\n   String name;\n   void ReadPlayer()\n   {\n       Scanner sc = new Scanner(System.in);\n       System.out.print("Enter Player ID: ");\n       id = sc.nextInt();\n       System.out.print("Enter Player Name: ");\n       name = sc.next();\n   }\n   void DisplayPlayer()\n   {\n       System.out.println("Player ID = " + id);\n       System.out.println("Player Name = " + name);\n   }\n}\nclass CricketPlayer extends Player\n{\n   int runs;\n   void ReadCricketPlayer()\n   {\n       Scanner sc = new Scanner(System.in);\n       System.out.print("Enter Total Runs: ");\n       runs = sc.nextInt();\n   }\n   void DisplayCricketPlayer()\n   {\n       System.out.println("Total Runs = " + runs);\n   }\n}\npublic class InheritanceDemo\n{\n   public static void main(String args[])\n   {\n       CricketPlayer c = new CricketPlayer();\n       c.ReadPlayer();\n       c.ReadCricketPlayer();\n       c.DisplayPlayer();\n       c.DisplayCricketPlayer();\n   }\n}`,
    output: "Enter Player ID: 18\nEnter Player Name: Virat\nEnter Total Runs: 12000\nPlayer ID = 18\nPlayer Name = Virat\nTotal Runs = 12000"
  },
  {
    id: 8, category: "OOP", categoryColor: "#34d399",
    name: "Abstract Class Figure (Area Calculation)",
    description: "Using the 'abstract' keyword to create templates for subclasses like figures.",
    code: `import java.util.*;\n\nabstract class figure\n{\n    double a, b;\n    abstract void area();\n}\n\nclass rect extends figure\n{\n    void area()\n    {\n        System.out.println("Area of rect : " + (a * b));\n    }\n}\n\nclass tri extends figure\n{\n    void area()\n    {\n        System.out.println("Area of tri : " + (0.5 * a * b));\n    }\n}\n\npublic class abs\n{\n    public static void main(String args[])\n    {\n        Scanner sc = new Scanner(System.in);\n\n        rect r = new rect();\n        System.out.print("Enter rect sides : ");\n        r.a = sc.nextDouble();\n        r.b = sc.nextDouble();\n\n        tri t = new tri();\n        System.out.print("Enter tri sides : ");\n        t.a = sc.nextDouble();\n        t.b = sc.nextDouble();\n\n        r.area();\n        t.area();\n    }\n}`,
    output: "Enter rect sides : 10 5\nEnter tri sides : 6 4\nArea of rect : 50.0\nArea of tri : 12.0"
  },
  {
    id: 9, category: "Package", categoryColor: "#60a5fa",
    name: "User Defined Package (Complex Numbers)",
    description: "Organizing your multiple Java files into specific package namespaces.",
    code: `// File name: pack/Complex.java\npackage pack;\n\npublic class Complex\n{\n    public void add(int a, int b, int c, int d)\n    {\n        System.out.println("Add : " + (a + c) + "+" + (b + d) + "i");\n    }\n\n    public void sub(int a, int b, int c, int d)\n    {\n        System.out.println("Sub : " + (a - c) + "+" + (b - d) + "i");\n    }\n}\n// File name: test.java\nimport java.util.*;\nimport pack.*;\n\nclass test\n{\n    public static void main(String args[])\n    {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println("Enter first complex number (real and imaginary): ");\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n\n        System.out.println("Enter second complex number (real and imaginary): ");\n        int c = sc.nextInt();\n        int d = sc.nextInt();\n\n        Complex num = new Complex();\n\n        num.add(a, b, c, d);\n        num.sub(a, b, c, d);\n    }\n}`,
    output: "Enter first complex number (real and imaginary): \n4 3\nEnter second complex number (real and imaginary): \n2 1\nAdd : 6+4i\nSub : 2+2i"
  },
  {
    id: 10, category: "Collections", categoryColor: "#fbbf24",
    name: "Sorting of Strings",
    description: "Sort an array of strings in alphabetical order using Arrays.sort().",
    code: `import java.util.*;\n\npublic class SortStrings\n{\n    public static void main(String args[])\n    {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print("Enter number: ");\n        int n = sc.nextInt();\n        sc.nextLine();\n\n        String s[] = new String[n];\n\n        System.out.println("Enter strings:");\n        for(int i = 0; i < n; i++)\n        {\n            s[i] = sc.nextLine();\n        }\n\n        Arrays.sort(s);\n\n        System.out.println("Sorted strings:");\n        for(int i = 0; i < n; i++)\n        {\n            System.out.println(s[i]);\n        }\n    }\n}`,
    output: "Enter number: 4\nEnter strings:\nbanana\napple\nmango\ngrape\nSorted strings:\napple\nbanana\ngrape\nmango"
  },
  {
    id: 11, category: "GUI", categoryColor: "#c084fc",
    name: "Swing Case Converter",
    description: "A Swing GUI application that converts text to uppercase on button click using ActionListener.",
    code: `import javax.swing.*;\nimport java.awt.event.*;\n\npublic class SwingCaseDemo extends JFrame implements ActionListener\n{\n    JTextField t1;\n    JButton b1;\n\n    SwingCaseDemo()\n    {\n        t1 = new JTextField();\n        t1.setBounds(50, 50, 200, 30);\n\n        b1 = new JButton("Submit");\n        b1.setBounds(50, 100, 100, 30);\n\n        add(t1);\n        add(b1);\n\n        b1.addActionListener(this);\n\n        setSize(300, 200);\n        setLayout(null);\n        setVisible(true);\n    }\n\n    public void actionPerformed(ActionEvent e)\n    {\n        String str = t1.getText();\n        String result = str.toUpperCase();   // change to upper case\n        t1.setText(result);\n    }\n\n    public static void main(String args[])\n    {\n        new SwingCaseDemo();\n    }\n}`,
    output: "Input: hello world\n\nOutput (after clicking Submit):\nHELLO WORLD"
  }
];
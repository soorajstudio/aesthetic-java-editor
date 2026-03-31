import type { JavaProgram } from './programs';

export const adbmsPrograms: JavaProgram[] = [
  {
    id: 1, category: "ADBMS", categoryColor: "#10b981",
    name: "A. Basic Queries (Set 1)",
    description: "Create tables LOCATION, DEPARTMENT, JOB, EMPLOYEE and perform basic data retrieval.",
    code: "", output: "",
    cells: [
      {
        query: `/* TABLE CREATION */
-- a) Create LOCATION Table
CREATE TABLE LOCATION (
    Location_Id   INT          PRIMARY KEY,
    Regional_Group VARCHAR(50)
);
INSERT INTO LOCATION VALUES (122, 'NEW YORK');
INSERT INTO LOCATION VALUES (123, 'DALLAS');
INSERT INTO LOCATION VALUES (124, 'CHICAGO');
INSERT INTO LOCATION VALUES (167, 'BOSTON');`,
        output: "Table LOCATION created.\n1 row created.\n1 row created.\n1 row created.\n1 row created."
      },
      {
        query: `-- b) Create DEPARTMENT Table
CREATE TABLE DEPARTMENT (
    Department_Id INT          PRIMARY KEY,
    Name          VARCHAR(50),
    Location_Id   INT,
    CONSTRAINT fk_dept_loc FOREIGN KEY (Location_Id) REFERENCES LOCATION(Location_Id)
);
INSERT INTO DEPARTMENT VALUES (10, 'ACCOUNTING', 122);
INSERT INTO DEPARTMENT VALUES (20, 'RESEARCH',   124);
INSERT INTO DEPARTMENT VALUES (30, 'SALES',      123);
INSERT INTO DEPARTMENT VALUES (40, 'OPERATIONS', 167);`,
        output: "Table DEPARTMENT created.\n1 row created.\n1 row created.\n1 row created.\n1 row created."
      },
      {
        query: `-- c) Create JOB Table
CREATE TABLE JOB (
    Job_Id   INT         PRIMARY KEY,
    Function VARCHAR(50)
);
INSERT INTO JOB VALUES (667, 'CLERK');
INSERT INTO JOB VALUES (668, 'STAFF');
INSERT INTO JOB VALUES (669, 'ANALYST');
INSERT INTO JOB VALUES (670, 'SALESPERSON');
INSERT INTO JOB VALUES (671, 'MANAGER');
INSERT INTO JOB VALUES (672, 'PRESIDENT');`,
        output: "Table JOB created.\n1 row created.\n1 row created.\n1 row created.\n1 row created.\n1 row created.\n1 row created."
      },
      {
        query: `-- d) Create EMPLOYEE Table
CREATE TABLE EMPLOYEE (
    Em_Id      INT          PRIMARY KEY,
    L_Name     VARCHAR(50)  NOT NULL,
    F_Name     VARCHAR(50),
    M_Name     CHAR(1),
    Job_Id     INT,
    Manager_Id INT,
    Hire_Date  DATE,
    Salary     NUMBER(10,2),
    Comm       NUMBER(10,2),
    D_ID       INT,
    CONSTRAINT fk_emp_dept FOREIGN KEY (D_ID) REFERENCES DEPARTMENT(Department_Id)
);
INSERT INTO EMPLOYEE VALUES (7369, 'SMITH',  'JOHN',   'Q', 667, 7902, TO_DATE('17-DEC-1984','DD-MON-YYYY'),  800,  NULL, 20);
INSERT INTO EMPLOYEE VALUES (7499, 'ALLEN',  'KEVIN',  'J', 670, 7698, TO_DATE('20-FEB-1985','DD-MON-YYYY'), 1600,  300, 30);
INSERT INTO EMPLOYEE VALUES (7505, 'DOYLE',  'JEAN',   'K', 671, 7839, TO_DATE('04-APR-1985','DD-MON-YYYY'), 2850,  NULL, 30);
INSERT INTO EMPLOYEE VALUES (7506, 'DENNIS', 'LYNN',   'S', 671, 7839, TO_DATE('15-MAY-1985','DD-MON-YYYY'), 2750,  NULL, 30);
INSERT INTO EMPLOYEE VALUES (7507, 'BAKER',  'LESLIE', 'D', 671, 7839, TO_DATE('10-JUN-1985','DD-MON-YYYY'), 2200,  NULL, 40);
INSERT INTO EMPLOYEE VALUES (7521, 'WARK',   'CYNTH',  'D', 670, 7698, TO_DATE('22-FEB-1985','DD-MON-YYYY'), 1250,  500, 30);`,
        output: "Table EMPLOYEE created.\n1 row created.\n1 row created.\n1 row created.\n1 row created.\n1 row created.\n1 row created."
      },
      {
        query: "-- 1. List all job details.\nSELECT * FROM JOB;",
        output: "JOB_ID  FUNCTION\n667     CLERK\n668     STAFF\n669     ANALYST\n670     SALESPERSON\n671     MANAGER\n672     PRESIDENT"
      },
      {
        query: "-- 2. List all the locations.\nSELECT * FROM LOCATION;",
        output: "LOCATION_ID  REGIONAL_GROUP\n122          NEW YORK\n123          DALLAS\n124          CHICAGO\n167          BOSTON"
      },
      {
        query: "-- 3. List out first name, last_name, salary, commission for all employees.\nSELECT F_Name, L_Name, Salary, Comm FROM EMPLOYEE;",
        output: "F_NAME  L_NAME  SALARY  COMM\nJOHN    SMITH   800     NULL\nKEVIN   ALLEN   1600    300\nJEAN    DOYLE   2850    NULL\nLYNN    DENNIS  2750    NULL\nLESLIE  BAKER   2200    NULL\nCYNTH   WARK    1250    500"
      },
      {
        query: "-- 4. List out employee_id, last_name, department_id with renamed columns.\nSELECT Em_Id AS \"ID of the employee\", L_Name AS \"Name of the employee\", D_ID AS \"department ID\" FROM EMPLOYEE;",
        output: "ID of the employee  Name of the employee  department ID\n7369                SMITH                 20\n7499                ALLEN                 30\n7505                DOYLE                 30\n7506                DENNIS                30\n7507                BAKER                 40\n7521                WARK                  30"
      },
      {
        query: "-- 5. List out the employee's annual salary with their names only.\nSELECT L_Name, F_Name, Salary * 12 AS \"Annual Salary\" FROM EMPLOYEE;",
        output: "L_NAME  F_NAME  Annual Salary\nSMITH   JOHN    9600\nALLEN   KEVIN   19200\nDOYLE   JEAN    34200\nDENNIS  LYNN    33000\nBAKER   LESLIE  26400\nWARK    CYNTH   15000"
      }
    ]
  },
  {
    id: 2, category: "ADBMS", categoryColor: "#10b981",
    name: "A. Conditional Queries (Set 2)",
    description: "Retrieve employee details applying WHERE clause, BETWEEN, IN, and LIKE conditions.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. List out the employees who are working in department 20.\nSELECT * FROM EMPLOYEE WHERE D_ID = 20;",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20"
      },
      {
        query: "-- 2. List out the employees who are earning salary between 3000 and 4500.\nSELECT * FROM EMPLOYEE WHERE Salary BETWEEN 3000 AND 4500;",
        output: "no rows selected"
      },
      {
        query: "-- 3. List out the employees who are working in department 10 or 20.\nSELECT * FROM EMPLOYEE WHERE D_ID IN (10, 20);",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20"
      },
      {
        query: "-- 4. List out the employees whose name starts with 'S'.\nSELECT * FROM EMPLOYEE WHERE L_Name LIKE 'S%' OR F_Name LIKE 'S%';",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20"
      },
      {
        query: "-- 5. List out the employees whose name length is 4 and start with 'S'.\nSELECT * FROM EMPLOYEE WHERE L_Name LIKE 'S___';",
        output: "no rows selected"
      }
    ]
  },
  {
    id: 3, category: "ADBMS", categoryColor: "#10b981",
    name: "A. Sorting Data (Set 3)",
    description: "Format output using ORDER BY in ascending and descending order on specific columns.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. List out the employee id, last name in ascending order based on the employee id.\nSELECT Em_Id, L_Name FROM EMPLOYEE ORDER BY Em_Id ASC;",
        output: "EM_ID  L_NAME\n7369   SMITH\n7499   ALLEN\n7505   DOYLE\n7506   DENNIS\n7507   BAKER\n7521   WARK"
      },
      {
        query: "-- 2. List out the employee id, name in descending order based on salary column.\nSELECT Em_Id, F_Name, L_Name FROM EMPLOYEE ORDER BY Salary DESC;",
        output: "EM_ID  F_NAME  L_NAME\n7505   JEAN    DOYLE\n7506   LYNN    DENNIS\n7507   LESLIE  BAKER\n7499   KEVIN   ALLEN\n7521   CYNTH   WARK\n7369   JOHN    SMITH"
      },
      {
        query: "-- 3. List out the employee details according to their last_name in ascending order.\nSELECT * FROM EMPLOYEE ORDER BY L_Name ASC;",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7499   ALLEN   KEVIN   J       670     7698        20-FEB-85  1600    300   30\n7507   BAKER   LESLIE  D       671     7839        10-JUN-85  2200    NULL  40\n7506   DENNIS  LYNN    S       671     7839        15-MAY-85  2750    NULL  30\n7505   DOYLE   JEAN    K       671     7839        04-APR-85  2850    NULL  30\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20\n7521   WARK    CYNTH   D       670     7698        22-FEB-85  1250    500   30"
      },
      {
        query: "-- 4. List out the employee details according to their salaries in descending order.\nSELECT * FROM EMPLOYEE ORDER BY Salary DESC;",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7505   DOYLE   JEAN    K       671     7839        04-APR-85  2850    NULL  30\n7506   DENNIS  LYNN    S       671     7839        15-MAY-85  2750    NULL  30\n7507   BAKER   LESLIE  D       671     7839        10-JUN-85  2200    NULL  40\n7499   ALLEN   KEVIN   J       670     7698        20-FEB-85  1600    300   30\n7521   WARK    CYNTH   D       670     7698        22-FEB-85  1250    500   30\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20"
      },
      {
        query: "-- 5. List out the employee details according to their department_id in descending order.\nSELECT * FROM EMPLOYEE ORDER BY D_ID DESC;",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7507   BAKER   LESLIE  D       671     7839        10-JUN-85  2200    NULL  40\n7499   ALLEN   KEVIN   J       670     7698        20-FEB-85  1600    300   30\n7505   DOYLE   JEAN    K       671     7839        04-APR-85  2850    NULL  30\n7506   DENNIS  LYNN    S       671     7839        15-MAY-85  2750    NULL  30\n7521   WARK    CYNTH   D       670     7698        22-FEB-85  1250    500   30\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20"
      }
    ]
  },
  {
    id: 4, category: "ADBMS", categoryColor: "#10b981",
    name: "A. Aggregation & Groups (Set 4)",
    description: "Using GROUP BY, HAVING, and aggregate functions like MIN, MAX, AVG, COUNT.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. How many employees who are working in different departments wise in the organization\nSELECT D_ID, COUNT(*) AS \"Number of Employees\" FROM EMPLOYEE GROUP BY D_ID;",
        output: "D_ID  Number of Employees\n20    1\n30    4\n40    1"
      },
      {
        query: "-- 2. List out the department wise maximum salary, minimum salary, average salary of the employees\nSELECT D_ID, MAX(Salary), MIN(Salary), AVG(Salary) FROM EMPLOYEE GROUP BY D_ID;",
        output: "D_ID  MAX(SALARY)  MIN(SALARY)  AVG(SALARY)\n20    800          800          800\n30    2850         1250         2112.5\n40    2200         2200         2200"
      },
      {
        query: "-- 3. List out the department id having at least four employees.\nSELECT D_ID FROM EMPLOYEE GROUP BY D_ID HAVING COUNT(*) >= 4;",
        output: "D_ID\n30"
      },
      {
        query: "-- 4. How many employees in January month.\nSELECT COUNT(*) FROM EMPLOYEE WHERE TO_CHAR(Hire_Date, 'MON') = 'JAN';",
        output: "COUNT(*)\n0"
      },
      {
        query: "-- 5. Which is the department id, having greater than or equal to 3 employees joined in April 1985?\nSELECT D_ID FROM EMPLOYEE WHERE TO_CHAR(Hire_Date, 'MON-YYYY') = 'APR-1985' GROUP BY D_ID HAVING COUNT(*) >= 3;",
        output: "no rows selected"
      }
    ]
  },
  {
    id: 5, category: "ADBMS", categoryColor: "#10b981",
    name: "A. Subqueries & Joins 1 (Set 5)",
    description: "Display maximum salaries and fetch relational data across Employee and Department tables.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. Display the employee who got the maximum salary.\nSELECT * FROM EMPLOYEE WHERE Salary = (SELECT MAX(Salary) FROM EMPLOYEE);",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7505   DOYLE   JEAN    K       671     7839        04-APR-85  2850    NULL  30"
      },
      {
        query: "-- 2. Display the employees who are working in Sales department.\nSELECT E.* FROM EMPLOYEE E JOIN DEPARTMENT D ON E.D_ID = D.Department_Id WHERE D.Name = 'SALES';",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7499   ALLEN   KEVIN   J       670     7698        20-FEB-85  1600    300   30\n7505   DOYLE   JEAN    K       671     7839        04-APR-85  2850    NULL  30\n7506   DENNIS  LYNN    S       671     7839        15-MAY-85  2750    NULL  30\n7521   WARK    CYNTH   D       670     7698        22-FEB-85  1250    500   30"
      },
      {
        query: "-- 3. Display the employees who are working as \"Clerk\".\nSELECT E.* FROM EMPLOYEE E JOIN JOB J ON E.Job_Id = J.Job_Id WHERE J.Function = 'CLERK';",
        output: "EM_ID  L_NAME  F_NAME  M_NAME  JOB_ID  MANAGER_ID  HIRE_DATE  SALARY  COMM  D_ID\n7369   SMITH   JOHN    Q       667     7902        17-DEC-84  800     NULL  20"
      },
      {
        query: "-- 4. Find out no. of employees working in \"Sales\" department.\nSELECT COUNT(*) FROM EMPLOYEE E JOIN DEPARTMENT D ON E.D_ID = D.Department_Id WHERE D.Name = 'SALES';",
        output: "COUNT(*)\n4"
      },
      {
        query: "-- 5. List out employees with their department names.\nSELECT E.F_Name, E.L_Name, D.Name AS Department_Name \nFROM EMPLOYEE E \nJOIN DEPARTMENT D ON E.D_ID = D.Department_Id;",
        output: "F_NAME  L_NAME  DEPARTMENT_NAME\nJOHN    SMITH   RESEARCH\nKEVIN   ALLEN   SALES\nJEAN    DOYLE   SALES\nLYNN    DENNIS  SALES\nLESLIE  BAKER   OPERATIONS\nCYNTH   WARK    SALES"
      }
    ]
  },
  {
    id: 6, category: "ADBMS", categoryColor: "#10b981",
    name: "A. Subqueries & Joins 2 (Set 6)",
    description: "Join operations connecting employee details, departments, and job classifications.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. Display employees with their designations (jobs).\nSELECT E.F_Name, E.L_Name, J.Function AS Designation \nFROM EMPLOYEE E JOIN JOB J ON E.Job_Id = J.Job_Id;",
        output: "F_NAME  L_NAME  DESIGNATION\nJOHN    SMITH   CLERK\nKEVIN   ALLEN   SALESPERSON\nJEAN    DOYLE   MANAGER\nLYNN    DENNIS  MANAGER\nLESLIE  BAKER   MANAGER\nCYNTH   WARK    SALESPERSON"
      },
      {
        query: "-- 2. How many employees working in different departments display with department name.\nSELECT D.Name, COUNT(E.Em_Id) AS Employee_Count \nFROM DEPARTMENT D LEFT JOIN EMPLOYEE E ON D.Department_Id = E.D_ID \nGROUP BY D.Name;",
        output: "NAME        EMPLOYEE_COUNT\nACCOUNTING  0\nRESEARCH    1\nSALES       4\nOPERATIONS  1"
      },
      {
        query: "-- 3. How many jobs in the organization with designations.\nSELECT Function, COUNT(*) OVER() AS Total_Jobs FROM JOB;",
        output: "FUNCTION     TOTAL_JOBS\nCLERK        6\nSTAFF        6\nANALYST      6\nSALESPERSON  6\nMANAGER      6\nPRESIDENT    6"
      },
      {
        query: "-- 4. Display employee details with all departments.\nSELECT E.Em_Id, E.F_Name, D.Name AS Department_Name \nFROM DEPARTMENT D LEFT JOIN EMPLOYEE E ON D.Department_Id = E.D_ID;",
        output: "EM_ID  F_NAME  DEPARTMENT_NAME\n       NULL    ACCOUNTING\n7369   JOHN    RESEARCH\n7499   KEVIN   SALES\n7505   JEAN    SALES\n7506   LYNN    SALES\n7521   CYNTH   SALES\n7507   LESLIE  OPERATIONS"
      }
    ]
  },
  {
    id: 7, category: "ADBMS", categoryColor: "#10b981",
    name: "B. Students Tables (Set 7)",
    description: "Alter tables to add constraints, perform matching with LIKE, AND, and average functions.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. While creating COURSE table, primary key constraint was forgotten. Add the primary key now.\nALTER TABLE COURSE ADD CONSTRAINT PK_COURSE PRIMARY KEY (courseno);",
        output: "Table COURSE altered."
      },
      {
        query: "-- 2. Display details of student where course is 'Data Base Management System' / 'DBMSI'\nSELECT S.* FROM STUDENT S \nJOIN Student_Course SC ON S.rollno = SC.rollno \nJOIN COURSE C ON SC.courseno = C.courseno \nWHERE C.coursename = 'DBMSI';",
        output: "ROLLNO  NAME           CLASS  BIRTHDATE\nR1      Pritesh Patel  A      23-FEB-89"
      },
      {
        query: "-- 3. Select names and class of students whose names begin with 'A' or 'B'.\nSELECT NAME, CLASS FROM STUDENT WHERE NAME LIKE 'A%' OR NAME LIKE 'B%';",
        output: "NAME             CLASS\nBhavin Jilvaani  A"
      },
      {
        query: "-- 4. Display average marks obtained by each student.\nSELECT rollno, AVG(marks) FROM Student_Course GROUP BY rollno;",
        output: "ROLLNO  AVG(MARKS)\nR1      70\nR2      70\nR3      68\nR4      58\nR5      74\nR6      59\nR7      55\nR8      80"
      },
      {
        query: "-- 5. Select the course where Second and third characters are 'AT'\nSELECT * FROM COURSE WHERE coursename LIKE '_AT%';",
        output: "COURSENO  COURSENAME  MAX_MARKS  PASS_MARKS\n610003    MATHS       90         40"
      },
      {
        query: "-- 6. Display details of students born in 1975 or 1976.\nSELECT * FROM STUDENT WHERE EXTRACT(YEAR FROM BIRTHDATE) IN (1975, 1976);",
        output: "ROLLNO  NAME             CLASS  BIRTHDATE\nR3      Dipesh Patel     B      24-MAR-76\nR5      Bhavin Jilvaani  A      25-DEC-75"
      }
    ]
  },
  {
    id: 8, category: "ADBMS", categoryColor: "#10b981",
    name: "B. Misc Date Operations (Set 8)",
    description: "Executing dual table date operations (adding days, months, last_day).",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. Add 15 days to current date.\nSELECT SYSDATE + 15 AS \"Date After 15 Days\" FROM DUAL;",
        output: "Date After 15 Days\n05-APR-26"
      },
      {
        query: "-- 2. Add and subtract 5 months from current month.\nSELECT ADD_MONTHS(SYSDATE, 5) AS \"Date After 5 Months\", \n       ADD_MONTHS(SYSDATE, -5) AS \"Date Before 5 Months\" FROM DUAL;",
        output: "Date After 5 Months  Date Before 5 Months\n21-AUG-26            21-OCT-25"
      },
      {
        query: "-- 3. Calculate months between current months and '3-7-2008'\nSELECT MONTHS_BETWEEN(SYSDATE, TO_DATE('03-JUL-2008', 'DD-MON-YYYY')) AS \"Months Between\" FROM DUAL;",
        output: "Months Between\n212.5806"
      },
      {
        query: "-- 4. Find last day of current month.\nSELECT LAST_DAY(SYSDATE) AS \"Last Day Window\" FROM DUAL;",
        output: "Last Day Window\n31-MAR-26"
      },
      {
        query: "-- 5. How many days left in a current month?\nSELECT LAST_DAY(SYSDATE) - SYSDATE AS \"Days Left\" FROM DUAL;",
        output: "Days Left\n10"
      }
    ]
  },
  {
    id: 9, category: "ADBMS", categoryColor: "#10b981",
    name: "B. Misc String Operations (Set 9)",
    description: "Executing DBMS built-in string and system functions from DUAL.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. Find ASCII value of letter 'R'.\nSELECT ASCII('R') AS \"ASCII Value\" FROM DUAL;",
        output: "ASCII Value\n82"
      },
      {
        query: "-- 2. Find name of all constraint based on particular table.\nSELECT CONSTRAINT_NAME, CONSTRAINT_TYPE \nFROM USER_CONSTRAINTS WHERE TABLE_NAME = 'STUDENT';",
        output: "CONSTRAINT_NAME  CONSTRAINT_TYPE\nSYS_C00124       P"
      },
      {
        query: "-- 3. Find difference between current date and specified date.\nSELECT SYSDATE - TO_DATE('01-JAN-2023', 'DD-MON-YYYY') AS \"Date Diff\" FROM DUAL;",
        output: "Date Diff\n1176.54"
      },
      {
        query: "-- 4. Find username from current login.\nSELECT USER AS \"Current DB User\" FROM DUAL;",
        output: "Current DB User\nSYSTEM"
      },
      {
        query: "-- 5. Find the occurrence of 'or' in the string.\nSELECT REGEXP_COUNT('Hello World or Oracle DB', 'or', 1, 'i') AS \"Count of OR\" FROM DUAL;",
        output: "Count of OR\n2"
      }
    ]
  },
  {
    id: 10, category: "ADBMS", categoryColor: "#10b981",
    name: "C. Movie & Screen JOIN (Set 10)",
    description: "Working with DATES and complex joins for Screen Multiplex tables.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. Get the name of movie which has run the longest in the multiplex so far.\nSELECT M.MOVIE_NAME FROM MOVIE M \nJOIN CURRENT1 C ON M.MOVIE_ID = C.MOVIE_ID \nWHERE (C.DATE_OF_CLOSURE - C.DATE_OF_ARRIVAL) = (\n    SELECT MAX(DATE_OF_CLOSURE - DATE_OF_ARRIVAL) FROM CURRENT1\n);",
        output: "MOVIE_NAME\nStar Wars III"
      },
      {
        query: "-- 2. Get the average duration of a movie on screen number 'S4'.\nSELECT AVG(DATE_OF_CLOSURE - DATE_OF_ARRIVAL) AS \"Average Duration (Days)\" \nFROM CURRENT1 WHERE SCREEN_ID = 'S4';",
        output: "Average Duration (Days)\n35"
      },
      {
        query: "-- 3. Get the details of movie that closed on date 24-november-2004.\nSELECT M.* FROM MOVIE M JOIN CURRENT1 C ON M.MOVIE_ID = C.MOVIE_ID \nWHERE C.DATE_OF_CLOSURE = TO_DATE('24-NOV-2004','DD-MON-YYYY');",
        output: "no rows selected"
      },
      {
        query: "-- 4. Movie 'star wars III' was released in the 7th week of 2005. Find out the date of its release...\nSELECT NEXT_DAY(TO_DATE('01-JAN-2005','DD-MON-YYYY') + (6*7), 'FRIDAY') \nAS \"Release_Date\" FROM DUAL;",
        output: "Release_Date\n25-FEB-05"
      },
      {
        query: "-- 5. Get the full outer join of the relations screen and current.\nSELECT * FROM SCREEN S FULL OUTER JOIN CURRENT1 C ON S.SCREEN_ID = C.SCREEN_ID;",
        output: "SCREEN_ID  LOCATION  SEATING_CAP  SCREEN_ID  MOVIE_ID  DATE_OF_ARRIVAL  DATE_OF_CLOSURE\nS1         SF        400          S1         M01       13-JUL-09        26-AUG-09\nS2         TF        350          S2         M02       25-APR-04        03-MAY-04\nS3         TF        250          S3         M03       05-JAN-09        25-FEB-09\nS4         SF        300          S4         M04       16-MAR-09        20-APR-09\nS5         TF        170          S5         M05       03-MAY-05        09-JUL-05"
      }
    ]
  },
  {
    id: 11, category: "ADBMS", categoryColor: "#10b981",
    name: "D. Customer Validations (Set 11)",
    description: "Update rules, deletes, complex WHERE conditions and pattern matching rules.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. Display all the records from the table where state is Maharashtra.\nSELECT * FROM CUSTOMER WHERE State = 'Maharashtra';",
        output: "CUST_NO  FIRST_NAME  LAST_NAME  ADDRESS       CITY    STATE        PIN     B_DATE     STATUS\n1001     Rajesh      Sharma     12, MG Road   Mumbai  Maharashtra  400001  15-JUL-85  V\n1004     Sneha       Patil      34, FC Road   Pune    Maharashtra  411004  18-MAR-95  V"
      },
      {
        query: "-- 2. Delete the row from the table where PIN CODE is 411004.\nDELETE FROM CUSTOMER WHERE Pin = 411004;",
        output: "1 row deleted."
      },
      {
        query: "-- 3. Change the ADDRESS as \"34, FC Road\" AND PIN=411004 where CUST_NO=1004.\nUPDATE CUSTOMER SET Address = '34, FC Road', Pin = 411004 WHERE Cust_No = 1004;",
        output: "1 row updated."
      },
      {
        query: "-- 4. Select all the records with single occurrence of state from the table.\nSELECT * FROM CUSTOMER WHERE State IN (\n    SELECT State FROM CUSTOMER GROUP BY State HAVING COUNT(*) = 1\n);",
        output: "CUST_NO  FIRST_NAME  LAST_NAME  ADDRESS         CITY      STATE       PIN     B_DATE     STATUS\n1002     Priya       Iyer       45, Anna Nagar  Chennai   Tamil Nadu  600040  23-MAY-90  A\n1003     Amit        Verma      78, Sector 62   Panjim    Goa         201301  12-SEP-88  I\n1005     Rohan       Das        11, Salt Lake   Amritsar  Punjab      700091  25-NOV-87  A\n1006     Neha        Singh      56, Civil Lines Surat     Gujarat     226001  30-JUN-92  I"
      },
      {
        query: "-- 5. Sort and display the customer data, in the alphabetic order of state.\nSELECT * FROM CUSTOMER ORDER BY State ASC;",
        output: "CUST_NO  FIRST_NAME  LAST_NAME  ADDRESS         CITY      STATE       PIN     B_DATE     STATUS\n1003     Amit        Verma      78, Sector 62   Panjim    Goa         201301  12-SEP-88  I\n1006     Neha        Singh      56, Civil Lines Surat     Gujarat     226001  30-JUN-92  I\n1001     Rajesh      Sharma     12, MG Road     Mumbai    Maharashtra 400001  15-JUL-85  V\n1004     Sneha       Patil      34, FC Road     Pune      Maharashtra 411004  18-MAR-95  V\n1005     Rohan       Das        11, Salt Lake   Amritsar  Punjab      700091  25-NOV-87  A\n1002     Priya       Iyer       45, Anna Nagar  Chennai   Tamil Nadu  600040  23-MAY-90  A"
      },
      {
        query: "-- 6. Sort and display the state field in the in descending order.\nSELECT State FROM CUSTOMER ORDER BY State DESC;",
        output: "STATE\nTamil Nadu\nPunjab\nMaharashtra\nMaharashtra\nGujarat\nGoa"
      },
      {
        query: "-- 7. Retrieve records of Maharashtra / Gujarat customers who are ACTIVE ('A').\nSELECT * FROM CUSTOMER WHERE State IN ('Maharashtra', 'Gujarat') AND Status = 'A';",
        output: "no rows selected"
      },
      {
        query: "-- 8. Retrieve rows where name contains the word ROHAN embedded it.\nSELECT * FROM CUSTOMER WHERE UPPER(FIRST_Name) LIKE '%ROHAN%' OR UPPER(Last_Name) LIKE '%ROHAN%';",
        output: "CUST_NO  FIRST_NAME  LAST_NAME  ADDRESS        CITY      STATE   PIN     B_DATE     STATUS\n1005     Rohan       Das        11, Salt Lake  Amritsar  Punjab  700091  25-NOV-87  A"
      },
      {
        query: "-- 9. Display all the rows whose dates are in the range of 10-JAN-70 and 31-JUL-96.\nSELECT * FROM CUSTOMER WHERE B_Date BETWEEN '10-JAN-1970' AND '31-JUL-1996';",
        output: "CUST_NO  FIRST_NAME  LAST_NAME  ADDRESS         CITY      STATE       PIN     B_DATE     STATUS\n1001     Rajesh      Sharma     12, MG Road     Mumbai    Maharashtra 400001  15-JUL-85  V\n1002     Priya       Iyer       45, Anna Nagar  Chennai   Tamil Nadu  600040  23-MAY-90  A\n1003     Amit        Verma      78, Sector 62   Panjim    Goa         201301  12-SEP-88  I\n1004     Sneha       Patil      34, FC Road     Pune      Maharashtra 411004  18-MAR-95  V\n1005     Rohan       Das        11, Salt Lake   Amritsar  Punjab      700091  25-NOV-87  A\n1006     Neha        Singh      56, Civil Lines Surat     Gujarat     226001  30-JUN-92  I"
      }
    ]
  },
  {
    id: 12, category: "ADBMS", categoryColor: "#10b981",
    name: "E. Student Report Logic (Set 12)",
    description: "Aggregate marking using GROUP BY, ORDER BY and Subqueries to show Subject averages.",
    code: "", output: "",
    cells: [
      {
        query: "-- 1. List the personal details of all students in the ascending order of age.\nSELECT * FROM STUDENT ORDER BY Dob DESC;",
        output: "STUD_ID  STUD_NAME  CLASS  ADDRESS    DOB\n1        Aarav      10     Delhi      15-MAR-08\n2        Bhavin     10     Mumbai     12-JAN-08\n3        Dipesh     10     Pune       05-MAY-07"
      },
      {
        query: "-- 2. Determine how many subjects are available in the school.\nSELECT COUNT(Sub_id) AS \"Total Subjects\" FROM SUBJECT;",
        output: "Total Subjects\n6"
      },
      {
        query: "-- 3. Display the total marks of all subjects of each student. Grouped by class.\nSELECT S.Class, S.Stud_id, S.Stud_name, SUM(R.marks) AS \"Total_Marks\" \nFROM STUDENT S JOIN RESULT R ON S.Stud_id = R.Stud_id \nGROUP BY S.Class, S.Stud_id, S.Stud_name;",
        output: "CLASS  STUD_ID  STUD_NAME  TOTAL_MARKS\n10     1        Aarav      350\n10     2        Bhavin     290\n10     3        Dipesh     310"
      },
      {
        query: "-- 4. Display the total marks of all subjects of each student. Alphabetical order of name.\nSELECT S.Stud_name, SUM(R.marks) AS \"Total_Marks\" \nFROM STUDENT S JOIN RESULT R ON S.Stud_id = R.Stud_id \nGROUP BY S.Stud_name ORDER BY S.Stud_name ASC;",
        output: "STUD_NAME   TOTAL_MARKS\nAarav       350\nBhavin      290\nDipesh      310"
      },
      {
        query: "-- 5. Determine the class average mark.\nSELECT S.Class, AVG(R.marks) AS \"Average_Marks\" \nFROM STUDENT S JOIN RESULT R ON S.Stud_id = R.Stud_id \nGROUP BY S.Class;",
        output: "CLASS  AVERAGE_MARKS\n10     79.16"
      },
      {
        query: "-- 6. Display the names of the subjects which have an average mark lower than 50.\nSELECT Sub.Sub_name \nFROM SUBJECT Sub JOIN RESULT R ON Sub.Sub_id = R.Sub_id \nGROUP BY Sub.Sub_name HAVING AVG(R.marks) < 50;",
        output: "SUB_NAME\nHistory"
      }
    ]
  },
  {
    id: 13, category: "MySQL", categoryColor: "#00758f",
    name: "13. Armstrong Numbers Procedure",
    description: "MySQL stored procedure to find all Armstrong numbers up to a given limit N.",
    code: "", output: "",
    cells: [
      {
        query: `-- ALGORITHM: Armstrong Numbers
-- Step 1: Start
-- Step 2: Read the upper limit N
-- Step 3: Set i = 1
-- Step 4: Repeat Step 5 to Step 11 while i <= N
-- Step 5: Set temp = i, sum = 0, digits = LENGTH(i)
-- Step 6: Repeat Step 7 to Step 9 while temp > 0
-- Step 7: rem = temp MOD 10
-- Step 8: sum = sum + POW(rem, digits)
-- Step 9: temp = temp DIV 10
-- Step 10: If sum = i then Print i
-- Step 11: i = i + 1
-- Step 12: Stop`,
        output: "Algorithm loaded."
      },
      {
        query: `-- Create Armstrong Procedure
DELIMITER $$

CREATE PROCEDURE armstrong_simple(IN N INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE temp INT;
    DECLARE rem INT;
    DECLARE sum INT;
    DECLARE digits INT;

    WHILE i <= N DO
        SET temp = i;
        SET sum = 0;
        SET digits = LENGTH(i);

        WHILE temp > 0 DO
            SET rem = temp MOD 10;
            SET sum = sum + POW(rem, digits);
            SET temp = temp DIV 10;
        END WHILE;

        IF sum = i THEN
            SELECT i AS Armstrong_Number;
        END IF;

        SET i = i + 1;
    END WHILE;
END $$

DELIMITER ;`,
        output: "Procedure created successfully."
      },
      {
        query: `-- Call the Armstrong procedure
CALL armstrong_simple(500);`,
        output: `Armstrong_Number
1
2
3
4
5
6
7
8
9
153
370
371
407`
      }
    ]
  },
  {
    id: 14, category: "MySQL", categoryColor: "#00758f",
    name: "14. Factorial up to N",
    description: "MySQL stored procedure to compute and display factorial values from 1 up to N.",
    code: "", output: "",
    cells: [
      {
        query: `-- ALGORITHM: Factorial up to N
-- Step 1: Start
-- Step 2: Read the integer input n
-- Step 3: Set num = 1, fact = 1
-- Step 4: Repeat Step 5 to Step 7 while num <= n
-- Step 5: fact = fact * num
-- Step 6: Print num and fact
-- Step 7: num = num + 1
-- Step 8: Stop`,
        output: "Algorithm loaded."
      },
      {
        query: `-- Create Factorial Procedure
DELIMITER $$

CREATE PROCEDURE factorial_upto(IN N INT)
BEGIN
    DECLARE num INT DEFAULT 1;
    DECLARE fact BIGINT DEFAULT 1;

    WHILE num <= N DO
        SET fact = fact * num;
        SELECT num AS Number, fact AS Factorial;
        SET num = num + 1;
    END WHILE;
END $$

DELIMITER ;`,
        output: "Procedure created successfully."
      },
      {
        query: `-- Call the Factorial procedure
CALL factorial_upto(5);`,
        output: `Number  Factorial
1       1
2       2
3       6
4       24
5       120`
      }
    ]
  },
  {
    id: 15, category: "MySQL", categoryColor: "#00758f",
    name: "15. Cursor: Employee Salary",
    description: "MySQL stored procedure using a CURSOR to loop through employee records and apply a 10% salary increment.",
    code: "", output: "",
    cells: [
      {
        query: `-- ALGORITHM: Cursor-based Salary Increment
-- Step 1: Start
-- Step 2: Declare a cursor to select id and salary from employee
-- Step 3: Open the cursor
-- Step 4: Repeat Step 5 to Step 7 until no more rows are found
-- Step 5: Fetch id and salary
-- Step 6: Calculate new_salary = salary + (salary * 0.10)
-- Step 7: Update employee set salary = new_salary where id = fetched id
-- Step 8: Close the cursor
-- Step 9: Stop`,
        output: "Algorithm loaded."
      },
      {
        query: `-- Create Employee Table
CREATE TABLE employee(
    id INT,
    name VARCHAR(20),
    salary INT
);

INSERT INTO employee VALUES (1, 'Arun', 20000);
INSERT INTO employee VALUES (2, 'Ravi', 25000);
INSERT INTO employee VALUES (3, 'Anu', 30000);`,
        output: "Table EMPLOYEE created.\n1 row created.\n1 row created.\n1 row created."
      },
      {
        query: `-- Create Cursor-based Salary Increment Procedure
DELIMITER $$

CREATE PROCEDURE emp_salary_increment()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE eid INT;
    DECLARE sal INT;

    DECLARE cur CURSOR FOR 
        SELECT id, salary FROM employee;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO eid, sal;

        IF done = 1 THEN
            LEAVE read_loop;
        END IF;

        SET sal = sal + (sal * 0.10);

        UPDATE employee 
        SET salary = sal 
        WHERE id = eid;

    END LOOP;

    CLOSE cur;
END $$

DELIMITER ;`,
        output: "Procedure created successfully."
      },
      {
        query: `-- Call the procedure and view updated salaries
CALL emp_salary_increment();
SELECT * FROM employee;`,
        output: `id  name  salary
1   Arun  22000
2   Ravi  27500
3   Anu   33000`
      }
    ]
  },
  {
    id: 16, category: "MySQL", categoryColor: "#00758f",
    name: "16. Trigger: Student Fee",
    description: "MySQL BEFORE INSERT trigger that automatically calculates total_fee from tuition and hostel fees.",
    code: "", output: "",
    cells: [
      {
        query: `-- ALGORITHM: Trigger for Student Fee Calculation
-- Step 1: Start
-- Step 2: Create a BEFORE INSERT trigger on student table
-- Step 3: Read tuition_fee and hostel_fee for the new record
-- Step 4: Calculate total_fee = tuition_fee + hostel_fee
-- Step 5: Set the new record's total_fee to the calculated value
-- Step 6: Stop`,
        output: "Algorithm loaded."
      },
      {
        query: `-- Step 1: Create Student Table
CREATE TABLE student (
    id INT,
    name VARCHAR(20),
    tuition_fee INT,
    hostel_fee INT,
    total_fee INT
);`,
        output: "Table STUDENT created."
      },
      {
        query: `-- Step 2: Create Trigger (Before Insert)
DELIMITER $$

CREATE TRIGGER fee_calculation
BEFORE INSERT ON student
FOR EACH ROW
BEGIN
    SET NEW.total_fee = NEW.tuition_fee + NEW.hostel_fee;
END $$

DELIMITER ;`,
        output: "Trigger created successfully."
      },
      {
        query: `-- Step 3: Insert Data
INSERT INTO student VALUES (1, 'Arun', 20000, 5000, 0);
INSERT INTO student VALUES (2, 'Ravi', 25000, 6000, 0);`,
        output: "1 row created.\n1 row created."
      },
      {
        query: `-- Step 4: View Output
SELECT * FROM student;`,
        output: `id  name  tuition_fee  hostel_fee  total_fee
1   Arun  20000        5000        25000
2   Ravi  25000        6000        31000`
      }
    ]
  },
  {
    id: 17, category: "MySQL", categoryColor: "#00758f",
    name: "17. Function: Employee Tax",
    description: "MySQL user-defined function that calculates employee tax based on salary brackets.",
    code: "", output: "",
    cells: [
      {
        query: `-- ALGORITHM: Employee Tax Calculation Function
-- Step 1: Start
-- Step 2: Read the salary input
-- Step 3: If salary <= 25000 then tax = salary * 0.05
-- Step 4: Else If salary <= 50000 then tax = salary * 0.10
-- Step 5: Else tax = salary * 0.20
-- Step 6: Return tax
-- Step 7: Stop`,
        output: "Algorithm loaded."
      },
      {
        query: `-- Create Tax Calculation Function
DELIMITER $$

CREATE FUNCTION calculate_tax(salary INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE tax INT;

    IF salary <= 25000 THEN
        SET tax = salary * 0.05;
    ELSEIF salary <= 50000 THEN
        SET tax = salary * 0.10;
    ELSE
        SET tax = salary * 0.20;
    END IF;

    RETURN tax;
END $$

DELIMITER ;`,
        output: "Function created successfully."
      },
      {
        query: `-- Use the function to calculate tax
SELECT name, salary, calculate_tax(salary) AS Tax
FROM employee;`,
        output: `name   salary  Tax
Arun   20000   1000
Ravi   40000   4000
Anu    60000   12000`
      }
    ]
  }
];

// App.tsx

import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  Code2, Terminal, ArrowLeft,
  ChevronRight, Layers, Menu, Globe, Sun, Moon, Play, Table2, CheckSquare, Square,
  Minus, Plus
} from 'lucide-react';
import { javaPrograms, javaDictionary } from './programs';
import { adbmsPrograms } from './adbmsPrograms';
import type { JavaProgram } from './programs';
import './App.css';

const sqlDictionary: Record<string, string> = {
  SELECT: 'Retrieves data from one or more tables based on specified conditions.',
  FROM: 'Specifies the table(s) from which to retrieve or delete data.',
  WHERE: 'Filters records based on a specified condition.',
  INSERT: 'Adds new rows of data into a table.',
  INTO: 'Used with INSERT to specify the target table for new data.',
  UPDATE: 'Modifies existing records in a table.',
  DELETE: 'Removes rows from a table based on a condition.',
  CREATE: 'Creates a new database object such as a table, view, or index.',
  TABLE: 'A database object that stores data in rows and columns.',
  ALTER: 'Modifies the structure of an existing database object.',
  DROP: 'Permanently removes a database object.',
  JOIN: 'Combines rows from two or more tables based on a related column.',
  INNER: 'Returns records that have matching values in both tables.',
  LEFT: 'Returns all records from the left table, and matched records from the right.',
  RIGHT: 'Returns all records from the right table, and matched records from the left.',
  FULL: 'Returns all records when there is a match in either table.',
  OUTER: 'Used with LEFT/RIGHT/FULL to include non-matching rows.',
  ON: 'Specifies the condition for joining two tables.',
  GROUP: 'Groups rows sharing a property so aggregate functions can be applied.',
  BY: 'Used with GROUP BY and ORDER BY to specify the column(s).',
  ORDER: 'Sorts the result set by one or more columns.',
  HAVING: 'Filters groups created by GROUP BY (like WHERE but for aggregates).',
  AS: 'Creates an alias for a column or table name.',
  AND: 'Combines multiple conditions; all must be true.',
  OR: 'Combines multiple conditions; at least one must be true.',
  NOT: 'Negates a condition.',
  IN: 'Checks if a value matches any value in a list or subquery.',
  BETWEEN: 'Filters values within a specified range (inclusive).',
  LIKE: 'Searches for a specified pattern in a column.',
  IS: 'Tests for NULL values or boolean conditions.',
  NULL: 'Represents a missing or unknown value in a column.',
  ASC: 'Sorts the result set in ascending order (default).',
  DESC: 'Sorts the result set in descending order.',
  DISTINCT: 'Returns only unique (non-duplicate) values.',
  COUNT: 'Aggregate function: Returns the number of rows matching a condition.',
  SUM: 'Aggregate function: Returns the total sum of a numeric column.',
  AVG: 'Aggregate function: Returns the average value of a numeric column.',
  MIN: 'Aggregate function: Returns the smallest value in a column.',
  MAX: 'Aggregate function: Returns the largest value in a column.',
  PRIMARY: 'Defines the primary key constraint — uniquely identifies each row.',
  KEY: 'Used with PRIMARY/FOREIGN to define key constraints.',
  FOREIGN: 'Creates a link between two tables via a referenced key.',
  REFERENCES: 'Specifies the table and column a foreign key refers to.',
  CONSTRAINT: 'Names a rule (like PRIMARY KEY) applied to columns.',
  VALUES: 'Specifies the data values to insert into a table.',
  SET: 'Assigns new values to columns in an UPDATE statement.',
  INT: 'Integer data type for storing whole numbers.',
  VARCHAR: 'Variable-length character string data type.',
  NUMBER: 'Numeric data type for storing decimal or integer values (Oracle).',
  DATE: 'Data type for storing date/time values.',
  CHAR: 'Fixed-length character string data type.',
  TO_DATE: 'Oracle function that converts a string to a DATE value.',
  TO_CHAR: 'Oracle function that converts a date or number to a string.',
  SYSDATE: 'Returns the current system date and time (Oracle).',
  DUAL: 'A special one-row table in Oracle used for evaluating expressions.',
  EXTRACT: 'Extracts part (YEAR, MONTH, DAY) from a date value.',
  ADD_MONTHS: 'Oracle function that adds/subtracts months from a date.',
  MONTHS_BETWEEN: 'Oracle function that returns the months between two dates.',
  LAST_DAY: 'Oracle function that returns the last day of the month.',
  NEXT_DAY: 'Oracle function that returns the next specified weekday after a date.',
  ASCII: 'Returns the numeric ASCII code of the first character.',
  REGEXP_COUNT: 'Counts occurrences of a regex pattern in a string.',
  USER: 'Returns the current database user name.',
  DECLARE: 'Begins the declaration section of a PL/SQL block.',
  BEGIN: 'Marks the start of the executable section in PL/SQL.',
  END: 'Marks the end of a PL/SQL block or procedure.',
  LOOP: 'Creates a loop construct in PL/SQL.',
  FOR: 'Defines a counted loop in PL/SQL (FOR i IN 1..n LOOP).',
  WHILE: 'Creates a conditional loop that runs while a condition is true.',
  IF: 'Conditional statement in PL/SQL.',
  THEN: 'Follows the IF condition to begin the true branch.',
  ELSIF: 'Additional conditional branch in PL/SQL IF statements.',
  ELSE: 'The fallback branch when all IF/ELSIF conditions are false.',
  CURSOR: 'A pointer to a result set returned by a query in PL/SQL.',
  OPEN: 'Opens a cursor to begin fetching rows.',
  FETCH: 'Retrieves the next row from an opened cursor.',
  CLOSE: 'Closes an opened cursor, freeing resources.',
  PROCEDURE: 'A named PL/SQL block that performs an action (no return value).',
  FUNCTION: 'A named PL/SQL block that returns a value.',
  TRIGGER: 'A stored program that automatically fires on table events.',
  RETURN: 'Exits a function and returns a value to the caller.',
  EXEC: 'Executes a stored procedure.',
  REPLACE: 'Used with CREATE OR REPLACE to overwrite existing objects.',
  DBMS_OUTPUT: 'Oracle package for printing output in PL/SQL.',
  PUT_LINE: 'Procedure of DBMS_OUTPUT that prints a line of text.',
  MOD: 'Returns the remainder of a division operation.',
  TRUNC: 'Truncates a number to a specified number of decimal places.',
  RAISE_APPLICATION_ERROR: 'Raises a user-defined error with a custom message in PL/SQL.',
  EXIT: 'Exits a LOOP in PL/SQL when a condition is met.',
  WHEN: 'Used with EXIT WHEN or EXCEPTION WHEN in PL/SQL.',
  OVER: 'Defines a window for analytic/window functions.',
  DELIMITER: 'MySQL command that changes the statement delimiter (e.g., from ; to $$).',
  DETERMINISTIC: 'Indicates that a MySQL function always returns the same result for the same inputs.',
  CALL: 'Executes a stored procedure in MySQL.',
  HANDLER: 'Defines a handler for conditions like NOT FOUND in MySQL cursors.',
  LEAVE: 'Exits a labeled loop or block in MySQL stored procedures.',
  DIV: 'Integer division operator in MySQL.',
  POW: 'MySQL function that returns a number raised to a power.',
  LENGTH: 'Returns the number of characters (or digits) in a string or number.',
  BIGINT: 'A large integer data type for storing very large whole numbers.',
  RETURNS: 'Specifies the return data type of a MySQL function.',
};

function parseSqlQuery(query: string): { question: string | null; cleanQuery: string } {
  const lines = query.split('\n');
  const questionLines: string[] = [];
  const codeLines: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--')) {
      // Extract the question text (remove the -- prefix and letter/number prefixes)
      const questionText = trimmed.replace(/^--\s*/, '').replace(/^[a-z]\)\s*/i, '').trim();
      if (questionText) questionLines.push(questionText);
    } else if (trimmed.startsWith('/*') || trimmed.startsWith('*/')) {
      const questionText = trimmed.replace(/^\/\*\s*|\s*\*\/$/g, '').trim();
      if (questionText) questionLines.push(questionText);
    } else if (trimmed !== '') {
      codeLines.push(line);
    }
  }
  
  return {
    question: questionLines.length > 0 ? questionLines.join('\n') : null,
    cleanQuery: codeLines.join('\n')
  };
}

function splitValuesRespectingParens(str: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(') { depth++; current += ch; }
    else if (ch === ')') { depth--; current += ch; }
    else if (ch === ',' && depth === 0) { parts.push(current); current = ''; }
    else { current += ch; }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function extractValuesBlock(query: string, startIdx: number): string | null {
  // Find the opening '(' after VALUES
  let i = startIdx;
  while (i < query.length && query[i] !== '(') i++;
  if (i >= query.length) return null;
  i++; // skip opening '('
  let depth = 1;
  const start = i;
  while (i < query.length && depth > 0) {
    if (query[i] === '(') depth++;
    else if (query[i] === ')') depth--;
    i++;
  }
  if (depth !== 0) return null;
  return query.substring(start, i - 1);
}

function parseTableFromQuery(query: string, output: string): { headers: string[]; rows: string[][] } | null {
  const upperQuery = query.toUpperCase();
  const hasCreate = upperQuery.includes('CREATE TABLE');
  const hasInsert = upperQuery.includes('INSERT INTO');
  
  if (!hasCreate || !hasInsert) return null;
  
  // Extract column names from CREATE TABLE
  const createMatch = query.match(/CREATE\s+TABLE\s+\w+\s*\(([^;]*?)(?:CONSTRAINT|\);|\)\s*;)/si);
  if (!createMatch) return null;
  
  const colBlock = createMatch[1];
  const colNames: string[] = [];
  const colLines = splitValuesRespectingParens(colBlock);
  for (const cl of colLines) {
    const trimmed = cl.trim();
    if (!trimmed || trimmed.toUpperCase().startsWith('CONSTRAINT') || trimmed.toUpperCase().startsWith('FOREIGN')) continue;
    const match = trimmed.match(/^([a-zA-Z_]\w*)/); 
    if (match) colNames.push(match[1].toUpperCase());
  }
  if (colNames.length === 0) return null;

  // Extract rows from INSERT statements (handles nested parens like TO_DATE)
  const rows: string[][] = [];
  const valuesRegex = /INSERT\s+INTO\s+\w+\s+VALUES\s*/gi;
  let vm;
  while ((vm = valuesRegex.exec(query)) !== null) {
    const valuesBlock = extractValuesBlock(query, vm.index + vm[0].length);
    if (!valuesBlock) continue;

    const parts = splitValuesRespectingParens(valuesBlock);
    const row = parts.map(v => {
      let cleaned = v.trim();
      // Handle TO_DATE — extract the readable date string
      const dateMatch = cleaned.match(/TO_DATE\s*\(\s*'([^']+)'/i);
      if (dateMatch) return dateMatch[1];
      // Remove surrounding quotes
      cleaned = cleaned.replace(/^'|'$/g, '');
      return cleaned;
    });
    rows.push(row);
  }

  if (rows.length === 0) return null;
  return { headers: colNames, rows };
}

import bgVideo from './assets/ANIME EYES EDIT _ THIS IS 4K ANIME (EYES) _ PEPEKACHU(4K_HD).webm';

export default function App() {
  const [view, setView] = useState<'home' | 'editor'>('home');
  const [language, setLanguage] = useState<'java' | 'adbms'>('java');
  const [activeProgram, setActiveProgram] = useState<JavaProgram | null>(null);
  const [files, setFiles] = useState<{name: string, content: string}[]>([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [hoverInfo, setHoverInfo] = useState<{ word: string; type: string } | null>(null);
  const [scrollToGrid, setScrollToGrid] = useState(false);
  const gridRef = useRef<HTMLElement>(null);

  // Studied programs state with localStorage persistence
  const [studiedPrograms, setStudiedPrograms] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('studiedPrograms');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('studiedPrograms', JSON.stringify(studiedPrograms));
  }, [studiedPrograms]);

  const toggleStudied = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStudiedPrograms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getStudyKey = (lang: string, id: number) => `${lang}-${id}`;

  const parseCodeIntoFiles = (rawCode: string, pgmName: string) => {
    const matches = [...rawCode.matchAll(/\/\/\s*\(?File(?: name)?:\s*([a-zA-Z0-9_]+\.java)\)?/gi)];
    if (matches.length === 0) {
      return [{ name: pgmName.replace(/[^a-zA-Z0-9]/g, '') + '.java', content: rawCode }];
    }
    const parsed = [];
    for (let i = 0; i < matches.length; i++) {
      const fileName = matches[i][1];
      const startIndex = matches[i].index! + matches[i][0].length;
      const endIndex = i + 1 < matches.length ? matches[i+1].index! : rawCode.length;
      parsed.push({
        name: fileName,
        content: rawCode.substring(startIndex, endIndex).trim()
      });
    }
    return parsed;
  };

  const [outputText, setOutputText] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (import.meta.hot) {
      const handleOutput = (data: string) => setOutputText(prev => prev + data);
      const handleExit = () => setIsExecuting(false);
      // @ts-ignore
      import.meta.hot.on('java:output', handleOutput);
      // @ts-ignore
      import.meta.hot.on('java:exit', handleExit);
      return () => {
        // @ts-ignore
        import.meta.hot.off('java:output', handleOutput);
        // @ts-ignore
        import.meta.hot.off('java:exit', handleExit);
      };
    }
  }, []);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Font Size State (persisted)
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('editorFontSize');
      return saved ? parseInt(saved, 10) : 14;
    } catch { return 14; }
  });

  useEffect(() => {
    localStorage.setItem('editorFontSize', String(fontSize));
  }, [fontSize]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 10));

  // Apply theme to the document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const openProgram = (pgm: JavaProgram) => {
    setActiveProgram(pgm);
    const parsedFiles = parseCodeIntoFiles(pgm.code, pgm.name);
    setFiles(parsedFiles);
    setActiveFileIndex(0);
    setOutputText(pgm.output);
    setCurrentInput('');
    setHoverInfo(null);
    setView('editor');
  };

  const goBack = () => {
    setView('home');
    setScrollToGrid(true);
  };

  useEffect(() => {
    if (view === 'home' && scrollToGrid && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'instant' });
      setScrollToGrid(false);
    }
  }, [view, scrollToGrid]);

  const handleRun = () => {
    if (!activeProgram) return;
    setIsExecuting(true);
    
    if (activeProgram.category === 'ADBMS' || activeProgram.category === 'PL/SQL' || activeProgram.category === 'MySQL') {
      setOutputText('Executing Query...\n');
      setCurrentInput('');
      setTimeout(() => {
        setOutputText('Executing Query...\n\n' + activeProgram.output);
        setIsExecuting(false);
      }, 800);
      return;
    }

    setOutputText('Compiling and running...\n');
    setCurrentInput('');
    
    let combinedCode = '';
    if (files.length === 1 && !activeProgram.code.match(/\/\/\s*\(?File/i)) {
      combinedCode = files[0].content;
    } else {
      combinedCode = files.map(f => `// File name: ${f.name}\n${f.content}`).join('\n\n');
    }

    // @ts-ignore
    if (import.meta.hot) {
      // @ts-ignore
      import.meta.hot.send('java:start', { code: combinedCode });
    } else {
      setOutputText('Error: Vite HMR is not connected.');
      setIsExecuting(false);
    }
  };

  const handleEditorMount = (editor: any) => {
    editor.onMouseMove((e: any) => {
      const model = editor.getModel();
      const pos = e.target.position;
      if (!pos) return;

      const line = model.getLineContent(pos.lineNumber);
      const word = model.getWordAtPosition(pos);

      if (line.trim().startsWith('//') ||
        (word && line.includes('//') && pos.column > line.indexOf('//'))) {
        setHoverInfo({ word: 'Comment', type: 'comment' });
      } else if (line.trim().startsWith('import') || line.trim().startsWith('package')) {
        setHoverInfo({ word: word?.word ?? 'Header', type: 'package' });
      } else if (word) {
        const w = word.word;
        setHoverInfo({ word: w, type: javaDictionary[w] ? 'keyword' : 'custom' });
      } else {
        setHoverInfo(null);
      }
    });
  };

  const getExplanation = (): string => {
    if (!hoverInfo) return '';
    switch (hoverInfo.type) {
      case 'comment': return 'This is a comment — it explains logic to developers and is ignored by the Java compiler.';
      case 'package': return 'This is a header or package statement used to organize code or import external libraries.';
      case 'keyword': return javaDictionary[hoverInfo.word] ?? '';
      case 'sql-keyword': return sqlDictionary[hoverInfo.word] ?? `SQL keyword used in database operations.`;
      case 'sql-function': return sqlDictionary[hoverInfo.word] ?? `A built-in SQL/PL-SQL function.`;
      case 'sql-identifier': return `"${hoverInfo.word}" is a table name, column name, or alias used in this query.`;
      default:
        return /^[A-Z]/.test(hoverInfo.word)
          ? `"${hoverInfo.word}" is a Class name defined or used in this program.`
          : `"${hoverInfo.word}" is a custom variable or method used in the code.`;
    }
  };

  const handleSqlWordClick = (word: string) => {
    if (!word || word.length < 2) {
      setHoverInfo(null);
      return;
    }
    const upperWord = word.toUpperCase();
    if (sqlDictionary[upperWord]) {
      setHoverInfo({ word: upperWord, type: 'sql-keyword' });
    } else {
      setHoverInfo({ word: word, type: 'sql-identifier' });
    }
  };

  const renderSqlWithClickableWords = (sql: string) => {
    // Split SQL into tokens: words and non-words
    const tokens = sql.split(/(\b[a-zA-Z_]\w*\b)/g);
    return tokens.map((token, i) => {
      if (/^[a-zA-Z_]\w*$/.test(token) && token.length >= 2) {
        const upperToken = token.toUpperCase();
        const isKeyword = !!sqlDictionary[upperToken];
        return (
          <span
            key={i}
            onMouseEnter={(e) => {
              handleSqlWordClick(token);
              (e.target as HTMLElement).style.borderBottomColor = isKeyword ? '#569cd6' : '#888';
              (e.target as HTMLElement).style.color = isKeyword ? '#7ec8f8' : '#e8e8e8';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = 'transparent';
              (e.target as HTMLElement).style.color = isKeyword ? '#569cd6' : '#d4d4d4';
            }}
            style={{
              cursor: 'default',
              color: isKeyword ? '#569cd6' : '#d4d4d4',
              borderBottom: '1px dashed transparent',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >{token}</span>
        );
      }
      return <span key={i}>{token}</span>;
    });
  };

  /* ── HOME ─────────────────────────────────────────────────────── */
  if (view === 'home') {
    return (
      <div className="home-root">

        {/* Nav */}
        <nav className="scifi-nav">
          <div className="nav-left">
            <div className="nav-logo">
              <Layers size={14} color="#fff" />
            </div>
            <span className="nav-brand-text mono">Java.Hub</span>
          </div>

          <div className="nav-center mono">
            <a className={language === 'java' ? 'active' : ''} onClick={() => setLanguage('java')} style={{cursor: 'pointer'}}>JAVA</a>
            <a className={language === 'adbms' ? 'active' : ''} onClick={() => setLanguage('adbms')} style={{cursor: 'pointer'}}>ADBMS</a>
          </div>

          <div className="nav-right">
            <button className="btn-icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="font-size-control">
              <button className="btn-icon btn-font" onClick={decreaseFontSize} title="Decrease font size">
                <Minus size={14} />
              </button>
              <span className="font-size-label mono">{fontSize}</span>
              <button className="btn-icon btn-font" onClick={increaseFontSize} title="Increase font size">
                <Plus size={14} />
              </button>
            </div>
            <button className="btn-icon"><Menu size={20} /></button>
          </div>
        </nav>

        {/* Hero Sci-Fi Panel */}
        <div className="hero-wrapper">
          <div className="scifi-panel" style={{ overflow: 'hidden' }}>
            {/* Background Video */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto',
                transform: 'translate(-50%, -50%)',
                zIndex: -2,
                opacity: 0.25,
                objectFit: 'cover'
              }}
            >
              <source src={bgVideo} type="video/webm" />
            </video>

            {/* Top Corners Decor */}
            <div className="panel-decor top-left"><Globe size={24} strokeWidth={1} color="var(--text-3)" /></div>
            <div className="panel-decor top-right mono">XXXXX</div>

            {/* Main Content */}
            <div className="panel-content">
              <h1 className="scifi-h1 mono">
                <span className="bracket neon-text">&lt;</span>
                WORK WITH YOUR CODE<br />CONFIDENTLY
                <span className="bracket neon-text">&gt;</span>
              </h1>
              <p className="scifi-sub mono">
                Allow interactive analysis to become your partner in learning.
              </p>

              <div className="cta-wrapper">
                <button
                  className="scifi-btn-primary mono"
                  onClick={() => document.getElementById('programs-grid')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  TRY NOW
                </button>
                <div className="cta-triangle"></div>
              </div>
            </div>

            {/* Bottom HUD */}
            <div className="panel-hud">
              <div className="hud-left">
                <div className="segmented-bar">
                  <div className="segment on"></div><div className="segment on"></div>
                  <div className="segment on"></div><div className="segment on"></div>
                  <div className="segment on"></div><div className="segment on"></div>
                  <div className="segment on"></div><div className="segment on"></div>
                  <div className="segment on"></div><div className="segment on"></div>
                  <div className="segment off"></div><div className="segment off"></div>
                </div>
                <div className="hud-text mono">
                  ANALYZING YOUR WAY <span className="hud-highlight">80%</span>
                </div>
              </div>

              <div className="hud-right">
                <div className="segmented-bar right-align">
                  <div className="segment on"></div><div className="segment on"></div>
                  <div className="segment on"></div><div className="segment off"></div>
                </div>
                <div className="hud-text mono">
                  EXPERIENCE BOOST
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <section id="programs-grid" className="home-grid-section" ref={gridRef}>
          <div className="programs-grid">
            {(language === 'java' ? javaPrograms : adbmsPrograms).map((pgm) => {
              const studyKey = getStudyKey(language, pgm.id);
              const isStudied = !!studiedPrograms[studyKey];
              return (
              <button 
                key={pgm.id} 
                className="prog-card" 
                onClick={() => openProgram(pgm)}
                style={isStudied ? {
                  borderColor: '#10b981',
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.15), inset 0 0 30px rgba(16, 185, 129, 0.03)'
                } : {}}
              >
                <div className="prog-card-top">
                  <span className="prog-badge mono" style={{ color: pgm.categoryColor }}>
                    [{pgm.category}]
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="prog-num mono">SYS.{pgm.id.toString().padStart(2, '0')}</span>
                    <div 
                      onClick={(e) => toggleStudied(studyKey, e)}
                      title={isStudied ? 'Mark as not studied' : 'Mark as studied'}
                      style={{ 
                        cursor: 'pointer',
                        color: isStudied ? '#10b981' : '#555',
                        transition: 'color 0.3s, transform 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      {isStudied ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                  </div>
                </div>
                {isStudied && (
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }} />
                )}
                <div className="prog-name">{pgm.name}</div>
                <div className="prog-desc">{pgm.description}</div>
                <div className="prog-footer">
                  <div className="prog-lang">
                    {language === 'java' ? (
                      <>
                        <span className="prog-lang-dot" />
                        <span className="mono">Main.java</span>
                      </>
                    ) : (
                      <>
                        <span className="prog-lang-dot" style={{ backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                        <span className="mono">Query.sql</span>
                      </>
                    )}
                  </div>
                  <ChevronRight size={13} className="prog-arrow neon-text" />
                </div>
              </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  /* ── EDITOR ────────────────────────── */
  return (
    <div className="editor-root">
      {/* Nav - persisted from home */}
      <nav className="scifi-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="nav-left">
          <button className="btn-back" onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', display: 'flex', alignItems: 'center', padding: '4px', marginRight: '8px' }}>
            <ArrowLeft size={16} />
          </button>
          <div className="nav-logo">
            <Layers size={14} color="#fff" />
          </div>
          <span className="nav-brand-text mono">Java.Hub</span>
        </div>

        <div className="nav-center mono">
          <a className={language === 'java' ? 'active' : ''} onClick={() => { setLanguage('java'); goBack(); }} style={{cursor: 'pointer'}}>JAVA</a>
          <a className={language === 'adbms' ? 'active' : ''} onClick={() => { setLanguage('adbms'); goBack(); }} style={{cursor: 'pointer'}}>ADBMS</a>
        </div>

        <div className="nav-right">
          <button className="btn-icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="font-size-control">
            <button className="btn-icon btn-font" onClick={decreaseFontSize} title="Decrease font size">
              <Minus size={14} />
            </button>
            <span className="font-size-label mono">{fontSize}</span>
            <button className="btn-icon btn-font" onClick={increaseFontSize} title="Increase font size">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Topbar */}
      <div className="editor-topbar">
        <div className="topbar-left">
          <div className="breadcrumb">
            <span className="mono">ROOT</span>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: activeProgram?.categoryColor, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              {activeProgram?.category.toUpperCase()}
            </span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active mono">{activeProgram?.name.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* File tabs */}
      <div className="editor-tabs" style={{ display: 'flex', overflowX: 'auto' }}>
        {files.map((f, i) => (
          <div 
            key={i} 
            className={`editor-tab ${i === activeFileIndex ? 'active' : ''}`}
            onClick={() => setActiveFileIndex(i)}
            style={{ cursor: 'pointer', padding: '0 16px', borderRight: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {i === activeFileIndex && <span className="tab-modified" />}
            <span className="mono">{f.name}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="editor-body">
        <div className="editor-main">
          <div className="editor-pane">
            {activeProgram?.cells && activeProgram.cells.length > 0 ? (
              <div className="notebook-container" style={{ padding: '20px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '30px', boxSizing: 'border-box' }}>
                <div style={{color: 'var(--neon-green)', fontFamily: 'var(--font-mono)', fontSize: '12px', opacity: 0.7}}>
                  {activeProgram.name.toUpperCase()} - INTERACTIVE SQL NOTEBOOK
                </div>
                <div style={{color: '#888', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.6, marginTop: '-20px'}}>
                  Hover over any SQL keyword to analyze it →
                </div>
                {activeProgram.cells.map((cell, idx) => {
                  const tableData = parseTableFromQuery(cell.query, cell.output);
                  const { question, cleanQuery } = parseSqlQuery(cell.query);
                  return (
                  <div key={idx} className="notebook-cell" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {question && (
                      <div style={{
                        backgroundColor: '#0d1117',
                        border: '1px solid #1a3a2a',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}>
                        <span style={{
                          color: '#10b981',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 700,
                          minWidth: '18px',
                          flexShrink: 0,
                          marginTop: '1px'
                        }}>Q{idx + 1}</span>
                        <span style={{
                          color: '#c9d1d9',
                          fontFamily: 'var(--font-mono)',
                          fontSize: `${fontSize - 1}px`,
                          lineHeight: '1.5',
                          letterSpacing: '0.2px',
                          whiteSpace: 'pre-wrap'
                        }}>{question}</span>
                      </div>
                    )}
                    <div className="cell-query" style={{ 
                      backgroundColor: '#1e1e1e', 
                      borderLeft: '3px solid var(--neon-green)', 
                      borderRadius: '0 8px 8px 0', 
                      padding: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: `${fontSize}px`,
                      color: '#d4d4d4',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#888', fontSize: '12px' }}>
                        <Terminal size={12} style={{ marginRight: '6px' }} />
                        <span>SQL_INPUT [{idx + 1}]</span>
                      </div>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{renderSqlWithClickableWords(cleanQuery)}</pre>
                    </div>
                    
                    <div className="cell-output" style={{ 
                      backgroundColor: '#0a0a0a', 
                      border: '1px solid #222', 
                      borderRadius: '6px', 
                      padding: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: `${fontSize - 1}px`,
                      color: 'var(--neon-green)',
                      marginLeft: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#666', fontSize: '11px' }}>
                        <Terminal size={10} style={{ marginRight: '6px' }} />
                        <span>OUT_STREAM</span>
                      </div>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{cell.output}</pre>
                    </div>

                    {tableData && (
                      <div style={{
                        backgroundColor: '#0d1117',
                        border: '1px solid #1a3a2a',
                        borderRadius: '8px',
                        padding: '16px',
                        marginLeft: '16px',
                        overflow: 'auto'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '6px' }}>
                          <Table2 size={12} color="var(--neon-green)" />
                          <span style={{ color: 'var(--neon-green)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px' }}>TABLE_VIEW</span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px'
                          }}>
                            <thead>
                              <tr>
                                {tableData.headers.map((h, hi) => (
                                  <th key={hi} style={{
                                    padding: '8px 12px',
                                    textAlign: 'left',
                                    color: '#10b981',
                                    borderBottom: '2px solid #1a3a2a',
                                    fontWeight: 600,
                                    letterSpacing: '0.5px',
                                    whiteSpace: 'nowrap'
                                  }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.rows.map((row, ri) => (
                                <tr key={ri} style={{ backgroundColor: ri % 2 === 0 ? 'transparent' : 'rgba(16, 185, 129, 0.03)' }}>
                                  {row.map((val, vi) => (
                                    <td key={vi} style={{
                                      padding: '6px 12px',
                                      color: '#c9d1d9',
                                      borderBottom: '1px solid #161b22',
                                      whiteSpace: 'nowrap'
                                    }}>{val}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div style={{ marginTop: '8px', color: '#484f58', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                          {tableData.rows.length} row{tableData.rows.length !== 1 ? 's' : ''} inserted
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            ) : (
              <Editor
                height="100%"
                defaultLanguage={activeProgram?.category === 'ADBMS' || activeProgram?.category === 'PL/SQL' || activeProgram?.category === 'MySQL' ? 'sql' : 'java'}
                language={activeProgram?.category === 'ADBMS' || activeProgram?.category === 'PL/SQL' || activeProgram?.category === 'MySQL' ? 'sql' : 'java'}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={files[activeFileIndex]?.content || ''}
                onChange={(v) => {
                  setFiles(prev => {
                    const newFiles = [...prev];
                    newFiles[activeFileIndex] = { ...newFiles[activeFileIndex], content: v || '' };
                    return newFiles;
                  });
                }}
                onMount={handleEditorMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize,
                  lineHeight: fontSize + 10,
                  padding: { top: 14, bottom: 14 },
                  smoothScrolling: true,
                  cursorBlinking: 'smooth',
                  renderLineHighlight: 'gutter',
                  fontFamily: "'DM Mono', 'Fira Code', monospace",
                }}
              />
            )}
          </div>

        </div>

        {/* Sidebar & Console */}
        <div className="sidebar">
          <div className="sidebar-head">
            <Layers size={12} color="var(--neon-green)" />
            <span className="sidebar-head-title">ANALYSIS_NODE</span>
          </div>
          <div className="sidebar-body">
            {hoverInfo ? (
              <div className="insight">
                <div className="insight-token">{hoverInfo.word}</div>
                <div className="insight-body">{getExplanation()}</div>
                <div className="insight-footer">
                  <span className="insight-type-label">TYPE</span>
                  <span className={`insight-type-badge type-${hoverInfo.type}`}>
                    {hoverInfo.type.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="sidebar-empty">
                <div className="empty-icon-wrap">
                  <Code2 size={20} />
                </div>
                <div className="empty-title mono">STANDBY</div>
                <div className="empty-hint">
                  Target cursor on code entities to initialize syntax breakdown.
                </div>
              </div>
            )}
          </div>

          {/* Console moved below analysis */}
          {activeProgram?.category !== 'ADBMS' && activeProgram?.category !== 'PL/SQL' && activeProgram?.category !== 'MySQL' && (
            <div className="console-panel">
              <div className="console-topbar">
                <Terminal size={11} color="var(--neon-green)" />
                <span className="console-label">TERMINAL_OUT</span>
                <button 
                  className="btn-run scifi-btn-primary mono" 
                  onClick={handleRun} 
                  disabled={isExecuting}
                  style={{ height: '22px', padding: '0 10px', fontSize: '9px', marginLeft: '12px', letterSpacing: '1px' }}
                >
                  <Play size={8} fill="var(--btn-text)" color="var(--btn-text)" />
                  {isExecuting ? 'RUNNING' : 'RUN'}
                </button>
                <div className="console-status">
                  <span className="console-dot" />
                  <span className="mono">{isExecuting ? 'RUNNING' : 'ACTIVE'}</span>
                </div>
              </div>
              <div 
                className="console-body" 
                style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
                onClick={() => document.getElementById('console-input-field')?.focus()}
              >
                <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-1)', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.5 }}>
                  {outputText ? outputText : <span className="console-empty">Awaiting execution...</span>}
                </div>

                {isExecuting && (
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                    <input 
                      id="console-input-field"
                      type="text" 
                      value={currentInput}
                      onChange={e => setCurrentInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          // @ts-ignore
                          if (import.meta.hot) {
                            // @ts-ignore
                            import.meta.hot.send('java:input', currentInput);
                            setOutputText(prev => prev + currentInput + '\n');
                            setCurrentInput('');
                          }
                        }
                      }}
                      autoFocus
                      autoComplete="off"
                      style={{ background: 'transparent', border: 'none', color: 'var(--neon-green)', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 13, flex: 1 }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
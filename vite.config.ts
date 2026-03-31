import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { spawn, exec } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const javaRunnerPlugin = () => {
  let activeChild: any = null;
  let currentTmpDir: string | null = null;
  
  const cleanup = () => {
    if (activeChild) {
      activeChild.kill();
      activeChild = null;
    }
    if (currentTmpDir) {
      fs.rm(currentTmpDir, { recursive: true, force: true }).catch(() => {});
      currentTmpDir = null;
    }
  };

  return {
    name: 'java-runner',
    configureServer(server: any) {
      server.ws.on('java:start', async (data: any, client: any) => {
        cleanup();
        const { code } = data;
        try {
          currentTmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'java-run-'));
          let mainClassName = 'Main';
          
          const fileMarkerRegex = /\/\/\s*\(?File(?: name)?:\s*([a-zA-Z0-9_]+\.java)\)?/gi;
          const matches = [...code.matchAll(fileMarkerRegex)];
          if (matches.length > 0) {
            for (let i = 0; i < matches.length; i++) {
              const fileName = matches[i][1];
              const startIndex = matches[i].index! + matches[i][0].length;
              const endIndex = i + 1 < matches.length ? matches[i+1].index! : code.length;
              const fileContent = code.substring(startIndex, endIndex).trim();
              
              let pkgDir = '';
              const pkgMatch = fileContent.match(/package\s+([a-zA-Z0-9_.]+)\s*;/);
              if (pkgMatch) {
                pkgDir = pkgMatch[1].replace(/\./g, '/');
                await fs.mkdir(path.join(currentTmpDir!, pkgDir), { recursive: true });
              }
              
              const filePath = path.join(currentTmpDir!, pkgDir, fileName);
              await fs.writeFile(filePath, fileContent);
              
              if (fileContent.includes('static void main') || fileContent.includes('public static void main')) {
                mainClassName = fileName.replace('.java', '');
                if (pkgMatch) {
                  mainClassName = pkgMatch[1] + '.' + mainClassName;
                }
              }
            }
          } else {
            const publicClassMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
            if (publicClassMatch) {
              mainClassName = publicClassMatch[1];
            } else {
              const classBlocks = code.split(/(?=\bclass\s+[A-Za-z0-9_]+)/);
              for (const block of classBlocks) {
                if (block.includes('static void main') || block.includes('public static void main')) {
                  const match = block.match(/class\s+([A-Za-z0-9_]+)/);
                  if (match) {
                    mainClassName = match[1];
                    break;
                  }
                }
              }
              if (mainClassName === 'Main') {
                const fallback = code.match(/class\s+([A-Za-z0-9_]+)/);
                if (fallback) mainClassName = fallback[1];
              }
            }
            const javaFile = path.join(currentTmpDir!, `${mainClassName}.java`);
            await fs.writeFile(javaFile, code);
          }

          const getJavaFiles = async (dir: string): Promise<string[]> => {
            const dirents = await fs.readdir(dir, { withFileTypes: true });
            const files = await Promise.all(dirents.map((dirent) => {
              const res = path.resolve(dir, dirent.name);
              return dirent.isDirectory() ? getJavaFiles(res) : res;
            }));
            return Array.prototype.concat(...files).filter(f => f.endsWith('.java'));
          };
          const allFiles = await getJavaFiles(currentTmpDir!);
          const compileCmd = `javac ${allFiles.map(f => `"${f}"`).join(' ')}`;

          exec(compileCmd, { cwd: currentTmpDir }, (compileErr, stdout, stderr) => {
            if (compileErr) {
              client.send('java:output', stderr || compileErr.message);
              client.send('java:exit', 1);
              return;
            }

            activeChild = spawn('java', ['-cp', '.', mainClassName], { cwd: currentTmpDir });
            
            activeChild.stdout.on('data', (d: Buffer) => {
              client.send('java:output', d.toString());
            });
            activeChild.stderr.on('data', (d: Buffer) => {
              client.send('java:output', d.toString());
            });
            activeChild.on('close', (code: number) => {
              client.send('java:exit', code);
              cleanup();
            });
          });
        } catch (err: any) {
          client.send('java:output', 'Server Error: ' + err.message);
          client.send('java:exit', 1);
        }
      });

      server.ws.on('java:input', (data: string) => {
        if (activeChild && activeChild.stdin) {
          activeChild.stdin.write(data + '\n');
        }
      });
      
      server.ws.on('java:kill', () => {
        cleanup();
      });
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    javaRunnerPlugin(),
  ],
})
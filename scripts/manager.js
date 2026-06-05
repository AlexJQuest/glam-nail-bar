#!/usr/bin/env node
import { spawnSync } from 'child_process';
import process from 'process';

const [,, cmd] = process.argv;
const OWNER = 'AlexJQuest';
const REPO = 'glam-nail-bar';
const BACKEND_WORKFLOW = 'deploy-backend.yml';

function runCommand(command, args, opts = {}){
  const res = spawnSync(command, args, { stdio: 'inherit', shell: true, ...opts });
  if (res.status !== 0) throw new Error(`${command} ${args.join(' ')} failed with code ${res.status}`);
}

async function dispatchBackend(){
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN is required to dispatch the backend workflow. Set it in the environment.');
    process.exit(1);
  }

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${BACKEND_WORKFLOW}/dispatches`;
  const body = JSON.stringify({ ref: 'main' });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': `${OWNER}/${REPO}-deploy-script`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body,
    });

    if (res.status === 204) {
      console.log('Successfully dispatched backend workflow.');
    } else {
      const text = await res.text();
      console.error('Failed to dispatch backend workflow:', res.status, text);
      process.exit(1);
    }
  } catch (e) {
    console.error('Error dispatching workflow:', e.message);
    process.exit(1);
  }
}

async function main(){
  try {
    switch(cmd){
      case 'build':
        runCommand('npm', ['run', 'build']);
        break;
      case 'deploy-frontend':
        runCommand('npm', ['run', 'deploy']);
        break;
      case 'deploy-backend':
        await dispatchBackend();
        break;
      case 'deploy-all':
        runCommand('npm', ['run', 'build']);
        runCommand('npm', ['run', 'deploy']);
        await dispatchBackend();
        break;
      case 'help':
      default:
        console.log('Usage: node scripts/manager.js <command>');
        console.log('Commands:');
        console.log('  build             Build frontend (npm run build)');
        console.log('  deploy-frontend   Build + deploy frontend to gh-pages');
        console.log('  deploy-backend    Trigger backend workflow dispatch (requires GITHUB_TOKEN env)');
        console.log('  deploy-all        Deploy frontend and dispatch backend');
        console.log('  help              Show this help');
    }
  } catch (e){
    console.error(e.message);
    process.exit(1);
  }
}

main();

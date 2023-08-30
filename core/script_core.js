const consoleText = document.querySelector('.console-text');
const consoleInputField = document.querySelector('.console-input-field');

window.addEventListener('load', () => {
  const welcomeMessage = 'Nuabix [Version 0.06]<br>Type \'help\' to verify the command.<br><br>';
  const welcomeOutput = executeCommand(`echo ${welcomeMessage}`);
  consoleText.innerHTML += `<div>${welcomeOutput}</div>`;
});

consoleInputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const command = consoleInputField.value;
    consoleInputField.value = '';
    const output = executeCommand(command);
    if (command === 'cls') {
      consoleText.innerHTML = '';
      return;
    }
    consoleText.innerHTML += `<div>${command}</div><div>${output}</div><br>`;
    consoleText.scrollTop = consoleText.scrollHeight;
  }
});

function clsCommand() {
  consoleText.innerHTML = '';
  return '';
}

function echoCommand(args) {
  return args.join(' ');
}

function dateCommand() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
}

function timeCommand() {
  const currentDate = new Date();
  return currentDate.toLocaleTimeString();
}

function dirCommand() {
  const currentUrl = new URL(window.location.href);
  const currentPath = currentUrl.pathname.split('/');
  currentPath.pop();
  const parentPath = currentPath.join('/');
  return `<div>${currentUrl.hostname}${parentPath}</div><div>Directory of ${currentUrl.hostname}${currentUrl.pathname}</div><div></div>`;
}

function titleCommand(commandArgs) {
  const newTitle = commandArgs.join(' ');
  document.title = newTitle;
  const consoleTitle = document.querySelector('.console-title');
  consoleTitle.textContent = `Nuabix - ${newTitle}`;
  return `Title set to ${newTitle}`;
}

function startCommand(args) {
  const siteUrl = args[0];
  if (!siteUrl) {
    return 'Site URL is required';
  }
  const iframe = document.createElement('iframe');
  iframe.src = `site/${siteUrl}`;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.display = 'block';
  iframe.style.border = 'none';
  iframe.style.maxHeight = '400px';
  iframe.style.maxWidth = '800px';
  iframe.onload = function() {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const body = iframeDoc.body;
    const bodyHeight = body.scrollHeight;
    iframe.style.height = `${bodyHeight}px`;
  };

  consoleText.appendChild(iframe);
  return '';
}

function questionCommand() {
  setTimeout(() => {
    setTimeout(() => {
      const result = Math.floor(Math.random() * 2) === 0 ? 'Yes' : 'No';
      consoleText.innerHTML += `<div>${result}!</div><br>`;
      consoleText.scrollTop = consoleText.scrollHeight;
    }, Math.floor(Math.random() * 2000) + 1000);
  }, 0);

  return 'Loading. . .';
}


// Core Command
function executeCommand(command) {
  const commandArray = command.split(' ');
  const commandName = commandArray[0].toLowerCase();
  const commandArgs = commandArray.slice(1);

  switch (commandName) {
    case 'help':
      return helpCommand(commandArgs);
    case 'cls':
      return clsCommand();
    case 'echo':
      return echoCommand(commandArgs);
    case 'date':
      return dateCommand();
    case 'time':
      return timeCommand();
    case 'dir':
      return dirCommand();
    case 'title':
      return titleCommand(commandArgs);
    case 'start':
      return startCommand(commandArgs);
    case 'do?':
      return questionCommand();

    default:
      return `Command not found: ${commandName}`;
  }
}

// Help Command
function helpCommand(commandArgs) {
  const commands = [
    {
      name: 'help',
      description: 'Displays the available commands',
      syntax: 'help [command]',
    },
    {
      name: 'cls',
      description: 'Clears the console screen',
      syntax: 'cls',
    },
    {
      name: 'echo',
      description: 'Displays a message',
      syntax: 'echo [message]',
    },
    {
      name: 'date',
      description: 'Displays the current date',
      syntax: 'date',
    },
    {
      name: 'time',
      description: 'Displays the current time',
      syntax: 'time',
    },
    {
      name: 'dir',
      description: 'Displays the current directory',
      syntax: 'dir',
    },
    {
      name: 'title',
      description: 'Change the title',
      syntax: 'title',
    },
    {
      name: 'start',
      description: 'Opens a site in an iframe.',
      syntax: 'start [site URL]',
    },
  ];

  if (commandArgs.length === 0) {
    const output = commands.map((command) => `<div>${command.name} - ${command.description}</div>`).join('');
    return output;
  } else {
    const commandName = commandArgs[0].toLowerCase();
    const matchingCommands = commands.filter((command) => command.name.startsWith(commandName));
    if (matchingCommands.length === 1) {
      const command = matchingCommands[0];
      return `<div>${command.name} - ${command.description}</div><div>Syntax: ${command.syntax}</div>`;
    } else if (matchingCommands.length > 1) {
      const output = matchingCommands.map((command) => `<div>${command.name}</div>`).join('');
      return `<div>Multiple matching commands found:</div>${output}`;
    } else {
      return `Command not found: ${commandName}`;
    }
  }
}

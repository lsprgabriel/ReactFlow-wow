# Iniciativa Mapa Estratégico


## Configuração do ambiente
1. Instale o VS Code: https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user
2. Instale o Git para Windows: https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe
3. Instale o NVM para Windows: https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe
4. Instale no Google Chrome a extensão React DevTools: https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
5. No terminal, gere uma nova chave SSH para se autenticar no GitLab:
    - `ssh-keygen -t rsa -b 4096 -C "seu_email_da_soft@softexpert.com"`
    - `cat ~/.ssh/id_rsa.pub | clip` (Esse comando já irá copiar sua chave para a area de transferência)
6. Abra as configurações do seu perfil no GitLab: https://gitlab.softexpert.network/-/profile/keys
7. Clique em "Add new key" e cole o conteúdo copiado do terminal no passo 5
8. Abra o terminal e execute esses comandos:
    - `nvm install 20.10.0`
    - `nvm use 20.10.0`
    - `cd Desktop`
    - `git clone git@gitlab.softexpert.network:product/iniciativa-mapa-estrategico.git`
    - `cd .\iniciativa-mapa-estratégico\`
    - `git checkout -b "sua_branch"`
    - `npm install`
    - `code .` (Esse comando abrirá o VS Code na sua branch atual)
9. Rode o projeto localmente com: `npm run dev`


## Links importantes
1. Documentação do React: https://pt-br.react.dev/reference/react
2. Documentação do React Flow (Inglês): https://reactflow.dev/learn

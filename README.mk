# Extrator de Informações de Cidades Brasileiras (Fonte: Wikipedia)

Este é um script simples escrito em JavaScript para Node.js que extrai dados sobre cidades do Brasil (nome, UF e tamanho da população), utilizando uma [página da Wikipedia](https://pt.wikipedia.org/wiki/Lista_de_munic%C3%ADpios_do_Brasil_por_popula%C3%A7%C3%A3o_(2022)) como fonte, e gera um arquivo HTML com uma lista dessas informações.

## Como Usar

### Pré-requisitos

Antes de rodar este script, você precisa ter o Node.js instalado no seu sistema. Você pode baixá-lo e instalá-lo [aqui](https://nodejs.org/).

### Instalação de Dependências

Para instalar as dependências necessárias para este projeto, você precisa executar o seguinte comando no terminal:
`npm install puppeteer open`

Este comando irá instalar o `Puppeteer`, uma biblioteca que permite automatizar a interação com páginas da web, e o `open`, utilizado para abrir o arquivo HTML gerado em um navegador padrão.

### Rodando o Script

Depois de instalar as dependências, você pode rodar o script com o seguinte comando:
`node extracaoCidades.js`

Este comando iniciará o processo de extração dos dados da Wikipedia e a geração do arquivo HTML com a lista de cidades por população.

## Módulos Utilizados

- **Puppeteer:** Utilizado para automatizar a interação com páginas da web e extrair dados da Wikipedia.
- **open:** Utilizado para abrir o arquivo HTML gerado em um navegador padrão após a geração.
- **fs (File System):** Módulo nativo do Node.js utilizado para manipulação de arquivos.

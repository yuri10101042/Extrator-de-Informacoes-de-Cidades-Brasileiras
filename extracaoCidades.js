//Importação dos módulos
const puppeteer = require('puppeteer');
const fs = require('fs');

//Função para extrair os dados das cidades brasileiras e exportar para um arquivo HTML
async function scrapeData() {
  //Usa o Puppeteer para acessar a página da Wikipedia
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://pt.wikipedia.org/wiki/Lista_de_munic%C3%ADpios_do_Brasil_por_popula%C3%A7%C3%A3o_(2022)', { timeout: 0 });
  await page.waitForSelector('table.wikitable');

  //Extrai as informações da tabela de cidades presente na página
  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table.wikitable tbody tr'));
    return rows.slice(0).map(row => {
      const columns = Array.from(row.querySelectorAll('td')).map(td => td.innerText.trim());
      if (columns.length >= 4) {
        return {
          cidade: columns[2], 
          populacao: columns[4],
          uf: columns[3] 
        };
      } else {
        return null; 
      }
    }).filter(item => item !== null);
  });

  await browser.close();

  //Gera e abre o arquivo HTML com as informações
  generateHTML(data);
}

function generateHTML(data) {
  //Gera o código HTML com as informações extraídas
  let htmlContent = `
  <!DOCTYPE html>
  <html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Municípios por População</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 8px; }
      th { background-color: #f2f2f2; }
      tr:nth-child(even) { background-color: #ddd; }
    </style>
  </head>
  <body>
    <h2>Lista de Municípios por População (2022)</h2>
    <table>
      <tr>
        <th>Cidade</th>
        <th>UF</th>
        <th>População</th>
      </tr>`;

  data.forEach(item => {
    htmlContent += `
      <tr>
        <td>${item.cidade}</td>
        <td>${item.uf}</td>
        <td>${item.populacao}</td>
      </tr>`;
  });

  htmlContent += `
    </table>
  </body>
  </html>`;

  //Gera arquivo com código HTML
  fs.writeFileSync('lista_de_cidades.html', htmlContent);
  console.log('Arquivo HTML gerado com sucesso!');

  //Abre o arquivo HTML (tem necessidade de ser uma função assíncrona por ser um módulo ES)
  (async () => {
    const open = (await import('open')).default;
    await open('lista_de_cidades.html');
  })();
}

scrapeData();

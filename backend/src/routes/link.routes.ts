import { Router } from "express"; // Importa o Router do Express para criar um conjunto de rotas relacionadas aos links. O Router permite organizar as rotas em módulos separados, facilitando a manutenção e a escalabilidade do código.
import { createLink } from "../modules/links/create-Link"; // Importa a função createLink, que é responsável por criar um novo link curto no banco de dados. Essa função é definida em um módulo separado para manter a lógica de negócios organizada e reutilizável.

export const linkRoutes = Router(); // Cria uma instância do Router, que será usada para definir as rotas relacionadas aos links. Essa instância é exportada para ser utilizada no arquivo principal do servidor (server.ts), onde as rotas serão registradas.

linkRoutes.post("/links", async (req, res) => {
  try {
    const link = await createLink(req.body); // Chama a função createLink, passando os dados do corpo da requisição (req.body) para criar um novo link curto. A função retorna o link criado, que é armazenado na variável link.

    return res.status(201).json({
      ...link,
      shortUrl: `${process.env.BASE_URL}/${link.shortCode}`
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    });
  }
});
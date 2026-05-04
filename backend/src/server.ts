import express from "express"; // Importa o framework Express para criar o servidor HTTP    
import cors from "cors"; // Importa o middleware CORS para permitir requisições de diferentes origens
import dotenv from "dotenv"; // Importa o dotenv para carregar variáveis de ambiente a partir do arquivo .env
import { linkRoutes } from "./routes/link.routes"; // Importa as rotas relacionadas aos links, onde estão definidas as operações de criação e redirecionamento de links

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env


const app = express(); // Cria uma instância do Express, que será usada para configurar o servidor e definir as rotas

app.use(cors()); // Habilita o CORS para permitir que o frontend (que pode estar em um domínio diferente) faça requisições para este backend
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições, permitindo que o servidor entenda e processe os dados enviados pelo cliente

app.use(linkRoutes); // Registra as rotas definidas em linkRoutes, que incluem a rota para criar um novo link curto e a rota para redirecionar para o URL original

const PORT = process.env.PORT || 3333; // Define a porta em que o servidor irá escutar. Ele tenta usar a variável de ambiente PORT, mas se não estiver definida, usa a porta 3333 como padrão.


app.listen(PORT, () => {  // Inicia o servidor e faz com que ele escute as requisições na porta definida. O callback é executado quando o servidor está pronto para receber requisições.
  console.log(`🚀 Server running on port ${PORT}`); 
});
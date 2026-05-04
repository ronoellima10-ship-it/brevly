import { prisma } from "../../lib/prisma"; // Import the Prisma client instance to interact with the database
import { nanoid } from "nanoid"; // nanoid é uma biblioteca para gerar IDs curtos e únicos, ideal para criar códigos de link curto
import { z } from "zod";   // Define a Zod schema for validating the input data

const createLinkSchema = z.object({ // Define a Zod schema for validating the input data when creating a new link. O schema espera um objeto com uma propriedade originalUrl, que deve ser uma string e um URL válido.
  originalUrl: z.string().url() // Valida que originalUrl é uma string e um URL válido
});

export async function createLink(data: unknown) { // Define a função createLink, que recebe um parâmetro data do tipo unknown. O tipo unknown é usado aqui para indicar que a função pode receber qualquer tipo de dado, e a validação será feita posteriormente usando o Zod schema.
  const { originalUrl } = createLinkSchema.parse(data); // Valida os dados de entrada usando o Zod schema definido anteriormente. Se os dados forem válidos, a função parse retorna um objeto com a propriedade originalUrl, que é extraída usando destructuring. Se os dados forem inválidos, a função parse lança um erro, que pode ser capturado e tratado pelo chamador da função createLink.

  const shortCode = nanoid(6); // Gera um código curto único usando a função nanoid, que gera uma string de 6 caracteres. Esse código será usado para criar o link curto que redireciona para a URL original.

  const link = await prisma.link.create({ // Usa o Prisma client para criar um novo registro na tabela Link do banco de dados. A função create recebe um objeto com a propriedade data, que contém os dados do novo link a ser criado. O objeto data inclui a originalUrl e o shortCode gerados anteriormente.
    data: { //
      originalUrl, // A URL original para a qual o link curto irá redirecionar
      shortCode // O código curto gerado para criar o link curto
    }
  });

  return link; // Retorna o link criado, que inclui as propriedades id, originalUrl e shortCode. O chamador da função createLink pode usar essas informações para construir a resposta da API ou para outras operações relacionadas ao link criado.
}
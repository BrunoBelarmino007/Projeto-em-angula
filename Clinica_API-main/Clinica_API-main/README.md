"# Clinica_API", "# Front-end-html-css-javascript", "# Back-end-API", "# Dcoker" 

Este código cria uma interface frontend para interagir com uma API RESTful que gerencia dados de pets. Os formulários permitem listar, cadastrar, atualizar e excluir pets. O JavaScript faz solicitações AJAX para o backend em Java, que por sua vez se comunica com um banco de dados PostgreSQL para executar essas operações.

Para rodar o projeto, siga estas etapas:

Backend (Java)
Certifique-se de ter o JDK e o Maven instalados.

Clone o repositório do backend.

Navegue até o diretório do backend.

Execute o seguinte comando para construir e empacotar o projeto Maven:

mvn clean package

Após a construção bem-sucedida, execute o seguinte comando para iniciar o servidor:

java -jar target/nome-do-arquivo-jar.jar

Frontend (HTML, JavaScript)
Não é necessário nenhum processo de construção.
Clone o repositório do frontend.
Abra o arquivo index.html em um navegador da web.
Docker
Certifique-se de ter o Docker instalado e em execução.

Clone o repositório do backend.

Navegue até o diretório do backend.

Construa a imagem Docker usando o seguinte comando:

bash
Copiar código
docker build -t nome-da-imagem .
Execute o contêiner Docker usando o seguinte comando:

bash
Copiar código
docker run -p 8080:8080 nome-da-imagem
Isso iniciará o backend em um contêiner Docker, tornando-o acessível na porta 8080 do host.

Certifique-se de substituir nome-do-arquivo-jar.jar pelo nome real do arquivo JAR gerado pelo Maven e nome-da-imagem pelo nome que você deseja dar à imagem Docker.

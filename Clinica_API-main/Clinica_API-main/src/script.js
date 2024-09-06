document.addEventListener("DOMContentLoaded", function () {
  const formListar = document.getElementById("form-listar");
  const formCadastrar = document.getElementById("form-cadastrar");
  const formAtualizar = document.getElementById("form-atualizar");
  const formExcluir = document.getElementById("form-excluir");
  const resultadoDiv = document.getElementById("resultado");

  // Função para listar pets
  function listarPets() {
      fetch("http://localhost:8080/pet/listar")
          .then((response) => response.json())
          .then((data) => {
              exibirListaPets(data);
          })
          .catch((error) => {
              console.error("Erro ao listar os pets:", error);
          });
  }

  // Função para exibir a lista de pets
  function exibirListaPets(data) {
      resultadoDiv.innerHTML = "";

      if (data.pet && data.pet.length > 0) {
          const lista = document.createElement("ul");

          data.pet.forEach((pet) => {
              const listItem = document.createElement("li");
              listItem.textContent = `Nome: ${pet.nome}, Raça: ${pet.raca}, Histórico: ${pet.historicoDoPet}, Sexo: ${pet.sexo}`;
              lista.appendChild(listItem);
          });

          resultadoDiv.appendChild(lista);
      } else {
          const mensagemParagrafo = document.createElement("p");
          mensagemParagrafo.textContent = "Nenhum pet encontrado.";
          resultadoDiv.appendChild(mensagemParagrafo);
      }
  }

  // Listar pets ao carregar a página
  listarPets();

  // Cadastrar um novo pet
  formCadastrar.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const novoPet = {
          nome: formData.get("nome"),
          raca: formData.get("raca"),
          historicoDoPet: formData.get("historico"), // Corrigindo o nome do campo
          sexo: formData.get("sexo"),
      };

      // Validar a raça para conter apenas letras antes de enviar a solicitação
      if (!/^[a-zA-Z]+$/.test(novoPet.raca)) {
          alert("A raça só deve conter letras.");
          return; // Não envia a solicitação se a validação falhar
      }

      console.log("Dados do novo pet:", novoPet); // Verificar os dados antes de enviar a solicitação

      fetch("http://localhost:8080/pet/cadastrar", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(novoPet),
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Erro ao cadastrar o pet: " + response.statusText);
              }
              return response.json();
          })
          .then((data) => {
              // Mostrar os detalhes do pet cadastrado para o usuário
              const petCadastrado = `
                  Nome: ${data.nome},
                  Histórico: ${data.historicoDoPet}, // Corrigindo o nome do campo
                  Sexo: ${data.sexo}
              `;
              alert("Pet cadastrado com sucesso:\n" + petCadastrado);

              console.log(data);
              listarPets(); // Atualizar lista de pets após o cadastro
              formCadastrar.reset(); // Limpar o formulário
          })
          .catch((error) => {
              console.error("Erro ao cadastrar o pet:", error.message); // Registrar a mensagem de erro no console
              alert("Erro ao cadastrar o pet: " + error.message);
          });
  });

  // Atualizar um pet
  formAtualizar.addEventListener("submit", function (event) {
      event.preventDefault();

      const petId = document.getElementById("id-atualizar").value;
      const novoNome = document.getElementById("novo-nome").value;
      const novaRaca = document.getElementById("nova-raca").value;

      fetch(`http://localhost:8080/pet/atualizar/${petId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome: novoNome, raca: novaRaca }),
      })
          .then((response) => response.json())
          .then((data) => {
              alert("Pet atualizado com sucesso!");
              console.log(data);
              listarPets(); // Atualizar lista de pets após a atualização
              formAtualizar.reset(); // Limpar o formulário
          })
          .catch((error) => {
              alert("Erro ao atualizar o pet: " + error.message);
          });
  });

  // Excluir um pet
  formExcluir.addEventListener("submit", function (event) {
      event.preventDefault();

      const petId = document.getElementById("id-excluir").value;

      fetch(`http://localhost:8080/pet/delete/${petId}`, {
          method: "DELETE",
      })
          .then((response) => response.json())
          .then((data) => {
              alert("Pet excluído com sucesso!");
              console.log(data);
              listarPets(); // Atualizar lista de pets após a exclusão
              formExcluir.reset(); // Limpar o formulário
          })
          .catch((error) => {
              alert("Erro ao excluir o pet: " + error.message);
          });
  });

  // Evento para limpar a lista quando o botão for clicado
  document.getElementById("limparLista").addEventListener("click", function () {
      resultadoDiv.innerHTML = ""; // Limpa a div de resultados
  });
});

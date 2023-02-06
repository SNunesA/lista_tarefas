const frm = document.querySelector("form"); // obtém elementos da página através do formulario
                                     //  # siginifica que é uma class
const dvQuadro = document.querySelector("#divQuadro");

// quando for feito um submit no form
frm.addEventListener("submit",  (e) => {
    e.preventDefault(); // evita envio do form
    const tarefa = frm.inTarefa.value;  // obtém o conteúdo digitado
 
    const h5 = document.createElement("h5");  // cria o elemento HTML h5
    const texto = document.createTextNode(tarefa); // cria um texto
     // define que texto será filho de h5
    h5.appendChild(texto); 
    dvQuadro.appendChild(h5);  // e que h5 será filho de divQuadro

    frm.inTarefa.value = "";  // limpa o campo de edição
    frm.inTarefa.focus(); // joga o cursor neste campo
});
// quando o botao selecionar for clicado
frm.btSelecionar.addEventListener("click", () => { 
  // coleta todo o conteudo nos elementos H5
    const tarefas = document.querySelectorAll("h5")  
    // verifica se nao é vazio
    if (tarefas.length == 0) {
      alert("Não há tarefas para selecionar")       
      return                                        
    }
    // for percorre as tarefas 
    // auxiliar guarda a posiçao
    let aux = -1                   
    for (let i = 0; i < tarefas.length; i++) {
      
      if (tarefas[i].className == "tarefa-selecionada") {
        tarefas[i].className = "tarefa-normal"      
        aux = i                                     
        break                                       
      }
    }
  
    // se for o ultimo elemento
    if (aux == tarefas.length - 1) {
      aux = -1
    }
    // tarefa na posiçao contida no auxiliar recebe a classe 
    tarefas[aux + 1].className = "tarefa-selecionada" 
  })
  // quando o botao retirar for clicado
  frm.btRetirar.addEventListener("click", () => { 
    const tarefas = document.querySelectorAll("h5") 
  
    let aux = -1               
  
    // percorre as tarefas até achar a selecionada
    tarefas.forEach((tarefa, i) => {
      if (tarefa.className == "tarefa-selecionada") {  
        aux = i
                                          
      }
    })
  //  caso nao for selecionada nenhuma tarefa
    if (aux == -1) {             
      alert("Selecione uma tarefa para removê-la...")
      return
    }
  // remove a tarefa
    if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) {
      dvQuadro.removeChild(tarefas[aux])        
    }
  })
  // quando o botao gravar for clicado
  frm.btGravar.addEventListener("click", () => { 
    const tarefas = document.querySelectorAll("h5")  
  
    if (tarefas.length == 0) {
      alert("Não há tarefas para serem salvas")      
      return                                         
    }
    // forma uma string com todas as tarefas separadas por ;
    let dados = ""                            
    tarefas.forEach(tarefa => { 
      dados += tarefa.innerText + ";"         
    })
  
    //guarda a variavel dados em um armazenamento local, o slice tira o ultimo ;
    localStorage.setItem("tarefasDia", dados.slice(0, -1))
  
    // aviso na tela
    if (localStorage.getItem("tarefasDia")) {
      alert("Ok! Tarefas Salvas")
    }
  })
  // quando a pagina for recarregada
  window.addEventListener("load", () => { 
    // se tiver algo armazenado
    if (localStorage.getItem("tarefasDia")) {
      // o split separa os items por  ;
      const dados = localStorage.getItem("tarefasDia").split(";")
  
      // percorre os dados armazenados em localStorage
      dados.forEach(dado => {
        // recarrega cada tarefa no quadro
        const h5 = document.createElement("h5")      
        const texto = document.createTextNode(dado)  
        h5.appendChild(texto)                      
        dvQuadro.appendChild(h5)                   
      })
    }
  })
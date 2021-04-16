function bt_chamado(){
    var opcao = Number(sel_opcao.value)

    if(opcao == 0){
        alert ("Selecione um Assunto")
    }else{
        alert ("Chamado Enviado")
        window.location.href = "fale-conosco.html";
    }

}
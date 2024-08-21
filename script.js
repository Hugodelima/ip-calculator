function adicionarNovoItemNaTabela(CodigoSubRede, Ip ,NumeroDeHost, BroadCast){
    let tabela = document.getElementById("tabela")
    let ultimaTRPosicao = tabela.lastElementChild

    var trDaTable = document.createElement('tr');
    var trQuantidadeDeSubRede = document.createElement('td');
    var tdRede = document.createElement('td');
    var tdHost = document.createElement('td');
    var tdBroadCast = document.createElement('td');
    
    ultimaTRPosicao.appendChild(trDaTable)

    trQuantidadeDeSubRede.textContent = CodigoSubRede
    tdRede.textContent = Ip+'.'+NumeroDeHost
    tdBroadCast.textContent = Ip+'.'+BroadCast

    tdHost.textContent = Ip+'.'+(NumeroDeHost+1)+'|----|'+Ip+'.'+(BroadCast - 1)


    trDaTable.appendChild(trQuantidadeDeSubRede)
    trDaTable.appendChild(tdRede)
    trDaTable.appendChild(tdHost)
    trDaTable.appendChild(tdBroadCast)
}

function retornarClasseDoIP(primeiroOCteto_function){
    if (primeiroOCteto_function >= 1 && primeiroOCteto_function <= 126){
        return primeiroOCteto_function = 'Classe A'
    }
    else if (primeiroOCteto_function >= 128 && primeiroOCteto_function <= 191){
        return primeiroOCteto_function = 'Classe B'
    }
    else if (primeiroOCteto_function >= 192 && primeiroOCteto_function <= 223){
        return primeiroOCteto_function ='Classe C'
    }
    else if (primeiroOCteto_function >= 224 && primeiroOCteto_function <= 239){
        return primeiroOCteto_function ='Classe D'
    }
    else if (primeiroOCteto_function >= 240 && primeiroOCteto_function <= 254){
        return primeiroOCteto_function ='Classe E'
    }
    else if (primeiroOcteto == 127){
        return primeiroOCteto_function = 'Classe A Reservado para Loopback'
    }
    else{
        return primeiroOCteto_function = null
    }
}

function limparTabela() {
    let tabela = document.getElementById("tabela");
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }
}

function removerTodosSemSubRede() {
    let elementos = document.querySelectorAll('#semSubRede');
    elementos.forEach(elemento => {
        elemento.remove();
    });
}

function limparResultados() {
    var elementos = [
        'tabela_ip_valor',
        'tabela_classeIP_valor',
        'tabela_primeirohost_valor',
        'tabela_ultimohost_valor',
        'tabela_endereco_rede_valor',
        'tabela_brodcast_valor',
        'tabela_binario',
        'tabela_mascara_sub_rede',
        'tabela_host_de_cada_subrede'
    ];

    for (var i = 0; i < elementos.length; i++) {
        var elemento = document.getElementById(elementos[i]);
        if (elemento) {
            elemento.textContent = '';
        }
    }
}

let botaoCalcular = document.getElementById("botaoCalcular")

botaoCalcular.addEventListener("click", ()=>{
    limparTabela();
    removerTodosSemSubRede();
    limparResultados();
    
    let input_ip = document.getElementById('input_ip').value
    input_ip = input_ip.split('.')
    primeiroOcteto = (input_ip[0] === undefined || input_ip[0] == '' ?"XXX" : input_ip[0])
    segundoOcteto = (input_ip[1] === undefined || input_ip[1] ==''? "XXX": input_ip[1])
    terceiroOcteto = (input_ip[2] === undefined|| input_ip[2] ==''? "XXX": input_ip[2])
    quartoOcteto = (input_ip[3] === undefined|| input_ip[3] ==''? "XXX": input_ip[3])

    let classeIP = retornarClasseDoIP(primeiroOcteto)


    let tabela_ip_valor = document.getElementById('tabela_ip_valor') 
    tabela_ip_valor.textContent = primeiroOcteto+"."+segundoOcteto+"."+terceiroOcteto+"."+quartoOcteto

    let tabela_classeIP_valor = document.getElementById('tabela_classeIP_valor')
    tabela_classeIP_valor.textContent = classeIP

    let tabela_primeirohost_valor = document.getElementById("tabela_primeirohost_valor")
    let tabela_ultimohost_valor = document.getElementById("tabela_ultimohost_valor")
    let tabela_endereco_rede_valor = document.getElementById("tabela_endereco_rede_valor")
    let tabela_brodcast_valor = document.getElementById("tabela_brodcast_valor")
    let tabela_host_de_cada_subrede = document.getElementById("tabela_host_de_cada_subrede")
    let tabela_mascara_sub_rede = document.getElementById("tabela_mascara_sub_rede")

    
    let quantidadeDeBinario = [parseInt(input_subrede.value)]

    if (quantidadeDeBinario == 0) {
        quantidadeDeBinario = quantidadeDeBinario[0]
    }else{
        while (quantidadeDeBinario[quantidadeDeBinario.length - 1] > 1) {
            let ultimaPosicao = quantidadeDeBinario[quantidadeDeBinario.length - 1]
            let resultado = ultimaPosicao / 2
            quantidadeDeBinario.push(resultado)
        }
    }
    let arrayMascaraSubRedeClasseC = [128,64,32,16,8,4,2,1]

   

    if (classeIP == 'Classe A') {
        tabela_primeirohost_valor.textContent = primeiroOcteto+'.0.0.1'
        tabela_ultimohost_valor.textContent = primeiroOcteto+'.255.255.254'
        tabela_endereco_rede_valor.textContent = primeiroOcteto+'.0.0.0'
        tabela_brodcast_valor.textContent = primeiroOcteto+'.255.255.255'
        
    }else if (classeIP == 'Classe B') {
        tabela_primeirohost_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.0.1'
        tabela_ultimohost_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.255.254'
        tabela_endereco_rede_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.0.0'
        tabela_brodcast_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.255.255'
    }
    else if (classeIP == 'Classe C') {

        tabela_primeirohost_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.'+terceiroOcteto+'.1'
        tabela_ultimohost_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.'+terceiroOcteto+'.254'
        tabela_endereco_rede_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.'+terceiroOcteto+'.0'
        tabela_brodcast_valor.textContent = primeiroOcteto+'.'+segundoOcteto+'.'+terceiroOcteto+'.255'
        
        
        if (quantidadeDeBinario.length > 0) {
            tabela_binario.textContent = "11111111.11111111.11111111."+"1".repeat(quantidadeDeBinario.length)+"0".repeat(8 - quantidadeDeBinario.length)
            let quantidadeDeHostNaSubRede = (2**(8 - quantidadeDeBinario.length)) - 2  < 0 ? "0" : (2**(8 - quantidadeDeBinario.length)) - 2
            tabela_host_de_cada_subrede.textContent = quantidadeDeHostNaSubRede
            
            let arrayResultadoMascaraClasseC = []
    
            for (let i = quantidadeDeBinario.length; i > 0; i--) {
                const element = arrayMascaraSubRedeClasseC[i - 1]
                arrayResultadoMascaraClasseC.push(element)
            }
            
            tabela_mascara_sub_rede.textContent = '255.255.255.'+arrayResultadoMascaraClasseC.reduce((accumulator, current) => accumulator + current)
            if (input_subrede.value <= 32){
                let primeiroBroadCast = parseInt(tabela_host_de_cada_subrede.textContent) + 2
                
                for(let i = 1; i <= (input_subrede.value*2); i++){
                    let NumeroDeHost = (i-1) * (quantidadeDeHostNaSubRede+2)
                    let ipDaClasseC = primeiroOcteto+'.'+segundoOcteto+'.'+terceiroOcteto
                    let broadcast = (primeiroBroadCast  + NumeroDeHost) - 1
                    adicionarNovoItemNaTabela(i,ipDaClasseC, NumeroDeHost ,broadcast)
                }
            }else{
                let tabela = document.getElementById("tabela")
                let h2 = document.createElement("h2")
                h2.setAttribute("id","semSubRede")
                h2.textContent = "Não é possível calcular nessa subrede selecionada"
                tabela.after(h2)
                
                
            }
            
            

        }else{
            tabela_binario.textContent = "11111111.11111111.11111111.00000000"
            tabela_mascara_sub_rede.textContent = '255.255.255.255'
            tabela_host_de_cada_subrede.textContent = '254'
        }
        
        
        
    }
    else if (classeIP == 'Classe D') {
        tabela_endereco_rede_valor.textContent = 'Reservado para multicasting'
        tabela_brodcast_valor.textContent = 'Reservado para multicasting'
    }
    else if (classeIP == 'Classe E') {
        tabela_endereco_rede_valor.textContent = 'Experimental, usado para pesquisa'
        tabela_brodcast_valor.textContent = 'Experimental, usado para pesquisa'
    }
    

    
})


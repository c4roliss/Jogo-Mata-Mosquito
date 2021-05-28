// Aqui acontece a lógica da aplicação
//limitando o tamanho do window
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10 //(10s)
var criaMoscaTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?','')
//o replace vai procurar o ? e substituir por vazio

if(nivel === 'iniciante'){
    criaMoscaTempo = 1500
}else if(nivel === 'intermediario'){
    criaMoscaTempo = 1000
}else if(nivel === 'avançado'){
    criaMoscaTempo = 750
}



function ajustaTamanho(){
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura,altura)
}
ajustaTamanho()

//inicio do cronometro
var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo<0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else{
        document.getElementById('cronometro').innerHTML = tempo
    }
    
},1000)
//fim do cronometro

function posicaoRandomica(){ 
    //remover a mosca anterior(caso exista)
    if(document.getElementById('mosca')){
        document.getElementById('mosca').remove()
        if(vidas>3){
            window.location.href = 'fimdejogo.html'
        }else{
            document.getElementById('coracao' + vidas).src="imagens/coracao_vazio.png"
            vidas++
        }
        /*quando o elemento aparecer e não for clicado
        a imagem coração cheio vai ser substituido por
        coração vazio*/
    }
    


    /*Quando multiplico o randoom por largura e altura
    eu vou gerar um número que vai de zero até a largura e altura máxima, ou seja, limitantes da window */ 
    var posicaoX = Math.floor(Math.random()*largura) - 90 // a subtração é para que não haja um extouro da pagina  
    var posicaoY = Math.floor(Math.random()*altura) - 90


    /*Caso a posição for negativa, vou igualar a zero
    para que a imagem não suma do window*/
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY


    console.log(posicaoX,posicaoY)

    //criando o elemento html de forma programática através do js 
    var mosca = document.createElement('img')
    mosca.src = 'imagens/mosca.png'
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    /* Nesse caso, estou usando a classe mosca1
    e colocando as características(css) contida dentro 
    dessa classe*/


    mosca.style.left = posicaoX + 'px'/*coordenada em pixels 
    posicionando a imagem a esquerda do navegador */
    mosca.style.top = posicaoY + 'px' //posicionando no top
    mosca.style.position = 'absolute'
    /*para que essas coordenadas sejam aplicadas,
    o elemento precisa ser absoluto*/
    mosca.id = 'mosca'
    mosca.onclick = function(){
        this.remove()
        //quando clicar, a mosca vai ser removida
    }
    
    document.body.appendChild(mosca)
    // criei o elemento img e adicionei no body como filho por meio de uma variável, como referência 
    
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random()*3) //algum numero entre 0 e proximo de 3
    switch(classe){
        case 0:
            return 'moscaPequena'
        case 1:
            return 'moscaMedia'
        case 2:
            return 'moscaGrande'
    }
}

function ladoAleatorio(){
    //essa função muda a posição do olhar
    var classe = Math.floor(Math.random()*2) //algum numero entre 0 e proximo de 3
    switch(classe){
        case 0:
            return 'ladoEsquerdo'
        case 1:
            return 'ladoDireito'

    }
}

/*Se o elemento não for clicado antes da remoção automática,
os pontos de vida devem ser afetados 
*/
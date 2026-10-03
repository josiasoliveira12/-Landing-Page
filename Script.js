// =========================
// MENU MOBILE
// =========================

const botaoMenu = document.getElementById("botaoMenu");
const navegacao = document.getElementById("navegacao");

botaoMenu.addEventListener("click", () => {

    const aberto = navegacao.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = aberto ? "✕" : "☰";
});


document.querySelectorAll(".navegacao a").forEach(link => {

    link.addEventListener("click", () => {

        navegacao.classList.remove("aberto");

        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");

        botaoMenu.textContent = "☰";

    });

});


// =========================
// TEMA CLARO / ESCURO
// =========================

const botaoTema = document.getElementById("botaoTema");
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {

    document.body.classList.add("tema-escuro");
    botaoTema.textContent = "☀";

}


botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("tema-escuro");

    const escuro =
        document.body.classList.contains("tema-escuro");

    localStorage.setItem(
        "tema",
        escuro ? "escuro" : "claro"
    );

    botaoTema.textContent =
        escuro ? "☀" : "☾";

});


// =========================
// TEXTO DINÂMICO
// =========================

const textoDinamico =
    document.getElementById("textoDinamico");

const frases = [
    "Gosto de transformar problemas em soluções através da programação.",
    "Tenho interesse em programação e análise de dados.",
    "Estou construindo meu caminho na área de tecnologia."
];

let fraseAtual = 0;
let caractereAtual = 0;
let apagando = false;


function escreverTexto() {

    const frase = frases[fraseAtual];

    if (!apagando) {

        textoDinamico.textContent =
            frase.substring(0, caractereAtual + 1);

        caractereAtual++;

        if (caractereAtual === frase.length) {

            apagando = true;

            setTimeout(escreverTexto, 2200);

            return;
        }

    } else {

        textoDinamico.textContent =
            frase.substring(0, caractereAtual - 1);

        caractereAtual--;

        if (caractereAtual === 0) {

            apagando = false;

            fraseAtual =
                (fraseAtual + 1) % frases.length;

        }
    }

    setTimeout(
        escreverTexto,
        apagando ? 25 : 45
    );
}


escreverTexto();


// =========================
// REVELAÇÃO AO ROLAR
// =========================

const elementosRevelar =
    document.querySelectorAll(".revelar");


const observador = new IntersectionObserver(
    elementos => {

        elementos.forEach(elemento => {

            if (elemento.isIntersecting) {

                elemento.target.classList.add("visivel");

                observador.unobserve(elemento.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


elementosRevelar.forEach(elemento => {

    observador.observe(elemento);

});


// =========================
// NAVEGAÇÃO ATIVA
// =========================

const secoes =
    document.querySelectorAll("main section[id]");

const linksNavegacao =
    document.querySelectorAll(".navegacao a");


const observadorSecoes =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(entrada => {

                if (!entrada.isIntersecting) {
                    return;
                }

                linksNavegacao.forEach(link => {

                    link.classList.remove("ativo");

                });


                const linkAtivo =
                    document.querySelector(
                        `.navegacao a[href="#${entrada.target.id}"]`
                    );


                if (linkAtivo) {

                    linkAtivo.classList.add("ativo");

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


secoes.forEach(secao => {

    observadorSecoes.observe(secao);

});


// =========================
// CONTADOR DE CARACTERES
// =========================

const campoMensagem =
    document.getElementById("mensagem");

const contador =
    document.getElementById("contador");


campoMensagem.addEventListener("input", () => {

    contador.textContent =
        campoMensagem.value.length;

});


// =========================
// VALIDAÇÃO DO FORMULÁRIO
// =========================

const formulario =
    document.getElementById("formularioContato");

const mensagemFormulario =
    document.getElementById("mensagemFormulario");


formulario.addEventListener("submit", evento => {

    evento.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const mensagem =
        campoMensagem.value.trim();


    if (!nome || !email || !mensagem) {

        mensagemFormulario.textContent =
            "Preencha todos os campos antes de enviar.";

        mensagemFormulario.className =
            "mensagem-formulario erro";

        return;
    }


    if (!email.includes("@") || !email.includes(".")) {

        mensagemFormulario.textContent =
            "Digite um endereço de e-mail válido.";

        mensagemFormulario.className =
            "mensagem-formulario erro";

        return;
    }


    mensagemFormulario.textContent =
        "Mensagem validada com sucesso! Este formulário ainda não envia dados para um servidor.";

    mensagemFormulario.className =
        "mensagem-formulario sucesso";

});
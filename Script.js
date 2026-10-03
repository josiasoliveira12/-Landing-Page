// =========================
// MENU MOBILE
// =========================

const botaoMenu = document.getElementById("botaoMenu");
const navegacao = document.getElementById("navegacao");

botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.textContent = aberto ? "✕" : "☰";
});

document.querySelectorAll(".navegacao a").forEach(link => {
    link.addEventListener("click", () => {
        navegacao.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
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

    const escuro = document.body.classList.contains("tema-escuro");

    localStorage.setItem("tema", escuro ? "escuro" : "claro");
    botaoTema.textContent = escuro ? "☀" : "☾";
});


// =========================
// TEXTO DINÂMICO
// =========================

const textoDinamico = document.getElementById("textoDinamico");

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
            fraseAtual = (fraseAtual + 1) % frases.length;
        }
    }

    setTimeout(escreverTexto, apagando ? 25 : 45);
}

escreverTexto();


// =========================
// REVELAÇÃO AO ROLAR
// =========================

const elementosRevelar = document.querySelectorAll(".revelar");

const observador = new IntersectionObserver(
    elementos => {
        elementos.forEach(elemento => {
            if (elemento.isIntersecting) {
                elemento.target.classList.add("visivel");
                observador.unobserve(elemento.target);
            }
        });
    },
    { threshold: 0.12 }
);

elementosRevelar.forEach(elemento => {
    observador.observe(elemento);
});


// =========================
// FILTRO DE PROJETOS
// =========================

const filtros = document.querySelectorAll(".filtro");
const projetos = document.querySelectorAll(".projeto");

filtros.forEach(filtro => {

    filtro.addEventListener("click", () => {

        filtros.forEach(botao => {
            botao.classList.remove("ativo");
        });

        filtro.classList.add("ativo");

        const categoria = filtro.dataset.filtro;

        projetos.forEach(projeto => {

            const categorias =
                projeto.dataset.categorias.split(" ");

            const mostrar =
                categoria === "todos" ||
                categorias.includes(categoria);

            projeto.classList.toggle("oculto", !mostrar);
        });
    });
});


// =========================
// MODAL
// =========================

const modal = document.getElementById("modalProjeto");
const fecharModal = document.getElementById("fecharModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");

function abrirModal(titulo, descricao) {

    modalTitulo.textContent = titulo;
    modalDescricao.textContent = descricao;

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function fecharModalProjeto() {

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

document.querySelectorAll(".abrir-modal").forEach(botao => {

    botao.addEventListener("click", () => {
        abrirModal(
            botao.dataset.titulo,
            botao.dataset.descricao
        );
    });

});

fecharModal.addEventListener("click", fecharModalProjeto);

modal.addEventListener("click", evento => {
    if (evento.target === modal) {
        fecharModalProjeto();
    }
});

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        fecharModalProjeto();
    }
});


// =========================
// NAVEGAÇÃO ATIVA
// =========================

const secoes = document.querySelectorAll("main section[id]");
const linksNavegacao = document.querySelectorAll(".navegacao a");

const observadorSecoes = new IntersectionObserver(
    entradas => {

        entradas.forEach(entrada => {

            if (!entrada.isIntersecting) return;

            linksNavegacao.forEach(link => {
                link.classList.remove("ativo");
            });

            const linkAtivo = document.querySelector(
                `.navegacao a[href="#${entrada.target.id}"]`
            );

            linkAtivo?.classList.add("ativo");
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
// CONTADOR E FORMULÁRIO
// =========================

const campoMensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");
const formulario = document.getElementById("formularioContato");
const mensagemFormulario =
    document.getElementById("mensagemFormulario");

campoMensagem.addEventListener("input", () => {
    contador.textContent = campoMensagem.value.length;
});

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
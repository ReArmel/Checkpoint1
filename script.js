window.addEventListener("load", () => {
    const url = document.querySelector("input[name='urlImagem']");
    const local = document.querySelector("input[name='nomeLocal']");
    const data = document.querySelector("input[name='data']");
    const descricao = document.querySelector("textarea[name='descricao']");
    const botaoDeSalvar = document.querySelector(".salvar");
    let imagemValida = false;

    let botaoDesabilitado = true;
    //Botao sendo desabilitado
    botaoDeSalvar.disabled = botaoDesabilitado;


    //Mudar o status do botao para Habilitado e desabilitado.
    function mudarStatusBotao(disabled) {
        botaoDesabilitado = disabled;
        botaoDeSalvar.disabled = botaoDesabilitado;
    }

    function mostrarAviso(element, avisoErro) {
        if (avisoErro) {
            element.classList.add("is-invalid")
            element.classList.remove("is-valid")
            return
        }
        element.classList.remove("is-invalid")
        element.classList.add("is-valid")
    }

    function validarCampos() {
        const camposPreenchidos = url.value && local.value && data.value && descricao.value && descricao.value.length > 3 && local.value.length > 3 && imagemValida;
        mudarStatusBotao(!camposPreenchidos);
    }


    function mostrarUrlErro() {
        const urlErro = !url.value || !imagemValida;
        mostrarAviso(url, urlErro);
    }

    url.addEventListener("change", () => {
        const img = document.createElement("img")
        img.src = url.value;
        img.onload = () => {
            document.querySelector(".preImagem img").src = url.value
            imagemValida = true;
            validarCampos();
            mostrarUrlErro();
        }
        img.onerror = () => {
            document.querySelector(".preImagem img").src = "no-image.png";
            imagemValida = false;
            validarCampos();
            mostrarUrlErro();
        }
    })

    data.addEventListener("change", () => {
        validarCampos();
    })


    //Capturar os eventos de KeyUp
    function adicinarEvento(elemento, tamanhoMinimo) {
        elemento.addEventListener("keyup", () => {
            if (elemento.value == " ") elemento.value = "";
            const possuiErro = tamanhoMinimo ? elemento.value.length < tamanhoMinimo : !elemento.value;
            mostrarAviso(elemento, possuiErro);
            validarCampos();
        })
    }

    adicinarEvento(url);
    adicinarEvento(local,4);
    adicinarEvento(data);
    adicinarEvento(descricao,4);

    function criarElementos(tag, className) {
        const el = document.createElement(tag)
        el.classList.add(className)
        return el
    }

    function adicionarCard() {
        const card = criarElementos("div", "card-item")
        card.addEventListener("click", () => { card.classList.toggle("cardEfeito") });

        const cardInner = criarElementos("div", "card-inner");

        const cardFront = criarElementos("div", "card-front");
        const img = document.createElement("img");
        img.src = url.value;
        cardFront.appendChild(img);

        const cardBack = criarElementos("div", "card-back");
        const div = document.createElement("div");
        const pDescricao = criarElementos("p", "descricao");
        const pText = document.createTextNode(descricao.value);
        pDescricao.appendChild(pText);
        div.appendChild(pDescricao);

        const h3 = document.createElement("h3")
        const h3Text = document.createTextNode(local.value);
        h3.appendChild(h3Text);
        div.appendChild(h3);

        const pData = document.createElement("p")
        const pInfoData = document.createTextNode(data.value);
        pData.appendChild(pInfoData);
        div.appendChild(pData);

        cardBack.appendChild(div);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        document.querySelector(".image-form").appendChild(card);
    }

    const form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        adicionarCard();
        const myModalEl = document.getElementById('exampleModal');
        const modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
        form.reset();
    })

    form.addEventListener("reset", () => {
        document.querySelector(".preImagem img").src = "no-image.png";
        mudarStatusBotao(true);
        imagemValida = false;
        const listaInputs = document.querySelectorAll("input, textarea")
        for (const input of listaInputs) {
            input.classList.remove("is-valid","is-invalid")
        }
    })

})


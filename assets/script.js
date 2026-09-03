document.addEventListener('DOMContentLoaded', () => {

  // Mapeamento de cidades por estado
  const cidadesPorEstado = {
    piaui: [
      'Teresina',
      'Parnaíba',
      'Picos',
      'Piripiri',
      'Floriano',
      'Campo Maior',
      'Barras',
      'União'
    ],
    maranhao: [
      'São Luís',
      'Imperatriz',
      'Caxias',
      'Timon',
      'Codó',
      'Açailândia',
      'Bacabal',
      'Balsas'
    ]
  };

  // Cidades em que a NTN Construtora tem imóveis cadastrados hoje.
  // O filtro de busca só retorna resultados para estas duas.
  const cidadesComImoveis = ['teresina', 'timon'];

  const selectEstado = document.querySelector('.estado');
  const selectCidade = document.querySelector('.cidade');
  const botaoBuscar = document.querySelector('.buscar');
  const listaImoveis = document.querySelector('.lista-imoveis');
  const mensagemBusca = document.querySelector('.busca-mensagem');

  const slugify = (texto) =>
    texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

  // Quando o estado muda, popula e libera o select de cidade
  if (selectEstado && selectCidade) {
    selectEstado.addEventListener('change', () => {
      const estadoSelecionado = selectEstado.value;

      selectCidade.innerHTML = '<option value="">Cidade</option>';

      if (!estadoSelecionado || !cidadesPorEstado[estadoSelecionado]) {
        selectCidade.disabled = true;
        return;
      }

      cidadesPorEstado[estadoSelecionado].forEach((cidade) => {
        const option = document.createElement('option');
        option.value = slugify(cidade);
        option.textContent = cidade;
        selectCidade.appendChild(option);
      });

      selectCidade.disabled = false;
    });
  }

  // Filtra os cards de "Imóveis em Destaque" pela cidade escolhida.
  // Hoje só existem imóveis cadastrados em Teresina e Timon.
  function filtrarImoveis(cidadeSlug) {
    if (!listaImoveis) return;

    const cards = listaImoveis.querySelectorAll('.imovel.destaque');
    let algumVisivel = false;

    cards.forEach((card) => {
      const cidadeDoCard = card.dataset.cidade;
      const deveMostrar = !cidadeSlug || cidadeDoCard === cidadeSlug;
      card.classList.toggle('oculto', !deveMostrar);
      if (deveMostrar) algumVisivel = true;
    });

    if (!mensagemBusca) return;

    if (!cidadeSlug) {
      mensagemBusca.hidden = true;
      mensagemBusca.textContent = '';
      return;
    }

    if (cidadesComImoveis.includes(cidadeSlug) && algumVisivel) {
      mensagemBusca.hidden = true;
      mensagemBusca.textContent = '';
    } else {
      mensagemBusca.hidden = false;
      mensagemBusca.textContent =
        'No momento, temos imóveis cadastrados apenas em Teresina - PI e Timon - MA. Fale com a gente pelo WhatsApp para saber sobre novos lançamentos na sua cidade.';
    }
  }

  // Ação do botão Buscar
  if (botaoBuscar && selectEstado && selectCidade) {
    botaoBuscar.addEventListener('click', () => {
      const estado = selectEstado.value;
      const cidade = selectCidade.value;

      if (!estado) {
        alert('Selecione um estado para continuar.');
        selectEstado.focus();
        return;
      }

      if (!cidade) {
        alert('Selecione uma cidade para continuar.');
        selectCidade.focus();
        return;
      }

      filtrarImoveis(cidade);

      const secaoDestaques = document.querySelector('.section-destaques');
      if (secaoDestaques) {
        secaoDestaques.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Animação de revelação ao rolar a página
  const elementos = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elementos.forEach(el => observer.observe(el));

});
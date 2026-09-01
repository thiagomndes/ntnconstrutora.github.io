document.addEventListener('DOMContentLoaded', () => {

  // Mapeamento de cidades por estado (ajuste/complete a lista como precisar)
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

  const selectEstado = document.querySelector('.estado');
  const selectCidade = document.querySelector('.cidade');
  const botaoBuscar = document.querySelector('.buscar');

  // Quando o estado muda, popula e libera o select de cidade
  selectEstado.addEventListener('change', () => {
    const estadoSelecionado = selectEstado.value;

    // Reseta o select de cidade
    selectCidade.innerHTML = '<option value="">Cidade</option>';

    if (!estadoSelecionado || !cidadesPorEstado[estadoSelecionado]) {
      selectCidade.disabled = true;
      return;
    }

    // Preenche com as cidades do estado escolhido
    cidadesPorEstado[estadoSelecionado].forEach((cidade) => {
      const option = document.createElement('option');
      // value "slugificado" (sem acento, minúsculo, com hífen)
      option.value = cidade
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
      option.textContent = cidade;
      selectCidade.appendChild(option);
    });

    selectCidade.disabled = false;
  });

  // Ação do botão Buscar
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

    // Aqui você troca pela lógica real (redirecionar, filtrar imóveis, chamar API, etc.)
    console.log('Buscando imóveis em:', { estado, cidade });

    // Exemplo de redirecionamento para uma página de resultados:
    // window.location.href = `imoveis.html?estado=${estado}&cidade=${cidade}`;
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, {
    threshold: 0.15, // dispara quando 15% do elemento estiver visível
    rootMargin: '0px 0px -50px 0px' // dispara um pouco antes de chegar no fim da tela
  });

  elementos.forEach(el => observer.observe(el));
});
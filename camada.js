const senhas = {
  12: "sol", 11: "arvore", 10: "magia", 9: "estrela", 8: "lua", 7: "terra",
  6: "agua", 5: "fogo", 4: "vento", 3: "chuva", 2: "neve", 1: "arcoiris"
};

const total = Object.keys(senhas).length;
const progressoBarra = document.getElementById('barraProgresso');

// Cria dinamicamente os campos de senha restantes
const form = document.querySelector('.senha-camadas');
for (let n = 11; n >= 1; n--) {
  const label = document.createElement('label');
  label.id = `campoSenha${n}`;
  label.innerHTML = `
    <span>Senha ${13 - n}</span>
    <input type="password" id="senha${n}" aria-label="Senha ${13 - n}" disabled />
    <button type="button" onclick="verificarSenha(${n})" disabled>OK</button>
  `;
  form.appendChild(label);
}

// Inicializa camadas com opacidade 0
for (let n = total; n >= 1; n--) {
  const img = document.getElementById('img' + n);
  if (img) img.style.opacity = 0;
}

function atualizarProgresso(nAtual) {
  const desbloqueadas = total - nAtual + 1;
  if (progressoBarra) {
    progressoBarra.style.width = ((desbloqueadas / total) * 100) + "%";
  }
}

function verificarSenha(n) {
  const input = document.getElementById('senha' + n);
  if (!input) return;
  const btn = input.nextElementSibling;

  if (input.value.trim().toLowerCase() === senhas[n]) {
    const img = document.getElementById('img' + n);
    if (img) img.style.opacity = 1;

    input.disabled = true;
    btn.disabled = true;
    input.style.background = "#eaffea";
    input.value = "";
    input.placeholder = "✔";

    atualizarProgresso(n);

    // Move o campo respondido para o final do formulário
    const labelAtual = document.getElementById('campoSenha' + n);
    if (labelAtual && form) form.appendChild(labelAtual);

    // Remove todos os campos ativos
    document.querySelectorAll('.senha-camadas label').forEach(l => l.classList.remove('active'));

    // Mostra próximo campo OU simulador de ângulo na etapa 10
    if (n === 10) {
      const simuladorAngulo = document.getElementById('simuladorAngulo');
      if (simuladorAngulo) simuladorAngulo.style.display = 'block';
    } else if (n > 1) {
      mostrarProximaSenha(n - 1);
    } else {
      // Todas as senhas foram completadas!
      mostrarMensagemFinal();
    }
  } else {
    input.style.background = "#ffeaea";
    input.value = "";
    input.placeholder = "Senha incorreta!";
    btn.disabled = true;
    setTimeout(() => {
      input.style.background = "#00141a";
      input.placeholder = "";
    }, 1000);
  }
}

// Ativa botão apenas se o campo não estiver vazio
document.querySelectorAll('input[type="password"]').forEach(input => {
  input.addEventListener('input', function () {
    if (this.nextElementSibling) {
      this.nextElementSibling.disabled = !this.value.trim();
    }
  });
});

// --- SIMULADOR DE ESPELHO ---
const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');
const distEl = document.getElementById('distancia');
const distEspelho = document.getElementById('distanciaEspelho');
const sliderImagem = document.getElementById('sliderImagem');
const feedback = document.getElementById('feedback');

let objX = 150;
const espelhoX = 400;
const objY = 150;

if (sliderImagem) sliderImagem.value = 600;
let imagemX = sliderImagem ? parseInt(sliderImagem.value) : 600;

let etapaEspelhoConcluida = false;

function drawScene() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#999';
  ctx.lineWidth = 1;
  for (let i = espelhoX; i <= 800; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 270);
    ctx.lineTo(i, 280);
    ctx.stroke();
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    const distMetros = ((i - espelhoX) / 10).toFixed(0);
    ctx.fillText(distMetros + ' m', i - 10, 295);
  }

  const distancia = Math.abs(imagemX - objX);
  const distToEspelho = Math.abs(objX - espelhoX);

  ctx.fillStyle = "#ff9800";
  ctx.beginPath();
  ctx.arc(objX, objY, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "14px Arial";
  ctx.fillText("Pessoa", objX - 22, objY + 40);

  ctx.strokeStyle = "#2196f3";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(espelhoX, 50);
  ctx.lineTo(espelhoX, 250);
  ctx.stroke();
  ctx.fillText("Espelho", espelhoX - 25, 40);

  ctx.fillStyle = "#9c27b0";
  ctx.beginPath();
  ctx.arc(imagemX, objY, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText("Imagem", imagemX - 25, objY + 40);

  if (distEl) distEl.textContent = (distancia / 10).toFixed(1);
  if (distEspelho) distEspelho.textContent = (distToEspelho / 10).toFixed(1);

  if (imagemX === 2 * espelhoX - objX) {
    if (feedback) feedback.innerHTML = `<p style="color:#fff;"><strong>✅ Parabéns!</strong> A imagem está simétrica em relação ao espelho.<br>Você pode prosseguir!</p>`;
    if (!etapaEspelhoConcluida) {
      etapaEspelhoConcluida = true;
      liberarPrimeiraSenha();
    }
  } else {
    if (feedback) feedback.innerHTML = '';
  }
}

function ajustarImagem(valor) {
  imagemX = parseInt(valor);
  drawScene();
}

function liberarPrimeiraSenha() {
  // Esconde o simulador do espelho
  const simuladorEspelho = document.getElementById('simuladorEspelho');
  if (simuladorEspelho) simuladorEspelho.style.display = 'none';

  // Mostra o formulário de senha
  const formSenha = document.querySelector('.senha-camadas');
  if (formSenha) {
    formSenha.style.display = 'block';
    formSenha.scrollIntoView({behavior: 'smooth'});
  }
  // Foca no primeiro campo
  const label = document.getElementById('campoSenha12');
  if (label) label.classList.add('active');
  const input = document.getElementById('senha12');
  const btn = input ? input.nextElementSibling : null;
  if (input) input.disabled = false;
  if (btn) btn.disabled = false;
  if (input) input.focus();
}

drawScene();

// --- SIMULADOR DE ÂNGULO (Etapa 10) ---
const canvasAngulo = document.getElementById('canvasAngulo');
const ctxAngulo = canvasAngulo?.getContext('2d');
const sliderAngulo = document.getElementById('angulo');
const valorAngulo = document.getElementById('valorAngulo');
const feedbackAngulo = document.getElementById('feedbackAngulo');
const inputResposta = document.getElementById('resposta');
const btnVerificarAngulo = document.getElementById('btnVerificarAngulo');

if (canvasAngulo && ctxAngulo && sliderAngulo && valorAngulo && feedbackAngulo && inputResposta && btnVerificarAngulo) {
  const cx = canvasAngulo.width / 2;
  const cy = canvasAngulo.height / 2 + 50;
  const comprimentoEspelho = 180;
  const ponto = { x: cx - 120, y: cy + 30 };

  function desenharEspelho(x1, y1, x2, y2) {
    ctxAngulo.strokeStyle = '#1976d2';
    ctxAngulo.lineWidth = 4;
    ctxAngulo.shadowColor = 'rgba(25,118,210,0.3)';
    ctxAngulo.shadowBlur = 10;
    ctxAngulo.beginPath();
    ctxAngulo.moveTo(x1, y1);
    ctxAngulo.lineTo(x2, y2);
    ctxAngulo.stroke();
    ctxAngulo.shadowBlur = 0;
  }

  function desenharPonto(x, y, r = 6, cor = '#004d99') {
    ctxAngulo.beginPath();
    ctxAngulo.arc(x, y, r, 0, 2 * Math.PI);
    ctxAngulo.fillStyle = cor;
    ctxAngulo.fill();
  }

  function desenharArco(x, y, r, a1, a2) {
    ctxAngulo.strokeStyle = '#2e7d32';
    ctxAngulo.lineWidth = 3;
    ctxAngulo.beginPath();
    ctxAngulo.arc(x, y, r, a1, a2);
    ctxAngulo.stroke();

    const mid = (a1 + a2) / 2;
    const tx = x + (r + 15) * Math.cos(mid);
    const ty = y + (r + 15) * Math.sin(mid);
    ctxAngulo.fillStyle = '#2e7d32';
    ctxAngulo.font = '16px serif';
    ctxAngulo.fillText('α/2', tx - 12, ty);
  }

  function refletir(px, py, angulo) {
    const x = px - cx;
    const y = py - cy;
    const cosT = Math.cos(angulo);
    const sinT = Math.sin(angulo);
    const xr = x * cosT + y * sinT;
    const yr = -x * sinT + y * cosT;
    const yrReflet = -yr;
    const xFinal = xr * cosT - yrReflet * sinT;
    const yFinal = xr * sinT + yrReflet * cosT;
    return { x: xFinal + cx, y: yFinal + cy };
  }

  function gerarImagens(n, alphaRad) {
    const imagens = [ponto];
    for (let i = 1; i < n; i++) {
      const anterior = imagens[i - 1];
      const espelho = (i - 1) % 2 === 0 ? 0 : alphaRad;
      imagens.push(refletir(anterior.x, anterior.y, espelho));
    }
    imagens.slice(1).forEach(p => {
      desenharPonto(p.x, p.y, 5, '#43a047');
    });
  }

  function desenhar(alphaDeg) {
    ctxAngulo.clearRect(0, 0, canvasAngulo.width, canvasAngulo.height);
    const alphaRad = (alphaDeg * Math.PI) / 180;

    desenharEspelho(cx, cy, cx, cy - comprimentoEspelho);
    const x2 = cx + comprimentoEspelho * Math.sin(alphaRad);
    const y2 = cy - comprimentoEspelho * Math.cos(alphaRad);
    desenharEspelho(cx, cy, x2, y2);

    desenharArco(cx, cy, 40, -Math.PI / 2, -Math.PI / 2 + alphaRad);
    desenharPonto(ponto.x, ponto.y, 10, '#003366');

    const n = Math.floor(360 / alphaDeg);
    gerarImagens(n, alphaRad);

    ctxAngulo.setLineDash([6, 6]);
    ctxAngulo.beginPath();
    ctxAngulo.moveTo(cx, cy);
    ctxAngulo.lineTo(cx + 150, cy);
    ctxAngulo.strokeStyle = '#888';
    ctxAngulo.stroke();
    ctxAngulo.setLineDash([]);

    valorAngulo.textContent = alphaDeg;
  }

  function verificarResposta() {
    const alpha = parseInt(sliderAngulo.value);
    const esperado = Math.floor(360 / alpha);
    const resposta = parseInt(inputResposta.value);
    if (resposta === esperado) {
      feedbackAngulo.textContent = '✅ Correto! Muito bem!';
      feedbackAngulo.style.color = 'limegreen';
      // Avança para a próxima camada (senha 9)
      setTimeout(() => {
        document.getElementById('simuladorAngulo').style.display = 'none';
        mostrarProximaSenha(9);
      }, 1200);
    } else {
      feedbackAngulo.textContent = `❌ Incorreto. O número certo é ${esperado}.`;
      feedbackAngulo.style.color = 'red';
    }
  }

  sliderAngulo.addEventListener('input', () => {
    feedbackAngulo.textContent = '';
    desenhar(parseInt(sliderAngulo.value));
  });

  btnVerificarAngulo.addEventListener('click', verificarResposta);

  desenhar(parseInt(sliderAngulo.value));
}

function mostrarProximaSenha(n) {
  // Remove todos os campos ativos
  document.querySelectorAll('.senha-camadas label').forEach(l => l.classList.remove('active'));
  const label = document.getElementById('campoSenha' + n);
  if (label) {
    label.classList.add('active');
    const input = document.getElementById('senha' + n);
    const btn = input ? input.nextElementSibling : null;
    if (input) input.disabled = false;
    if (btn) btn.disabled = false;
    if (input) input.focus();
  }
}

function mostrarMensagemFinal() {
  // Remove campos de senha
  const formSenha = document.querySelector('.senha-camadas');
  if (formSenha) formSenha.style.display = 'none';

  // Cria o container da mensagem
  let msg = document.getElementById('mensagem-final');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'mensagem-final';
    msg.innerHTML = `
      <div class="mensagem-final-box">
        <img src="professor.png" alt="Professor" class="mensagem-final-icone">
        <div>
          <h2>Parabéns! Você reativou todos os cristais!<br>Seu conhecimento restaurou a energia do Núcleo Fotônico.</h2>
          <p>Agora, <a href="https://forms.gle/VuHmZ4xRanzAsmk99" target="_blank" rel="noopener">clique aqui para registrar sua conquista</a>!</p>
        </div>
      </div>
    `;
    document.body.appendChild(msg);
  }
}

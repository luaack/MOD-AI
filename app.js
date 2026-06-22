// app.js - Interatividade e Simulações da Landing Page MOD. AI

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. TROCADOR DE PALAVRAS NO HERO (WORD SWAP)
  // ==========================================
  const words = ["Instagram", "TikTok"];
  let wordIndex = 0;
  const hiddenSpan = document.querySelector(".lp-hero-h1 span span[aria-hidden='true']");
  const visibleEm = document.querySelector(".lp-hero-h1 span em");

  function swapWord() {
    wordIndex = (wordIndex + 1) % words.length;
    const nextWord = words[wordIndex];

    if (hiddenSpan && visibleEm) {
      visibleEm.style.animation = "none";
      visibleEm.offsetHeight; // trigger reflow
      
      hiddenSpan.textContent = nextWord;
      visibleEm.textContent = nextWord;
      
      visibleEm.style.animation = "rp-swap 700ms ease-out";
    }
  }
  setInterval(swapWord, 3500);

  // ==========================================
  // 2. SIMULADOR DO HERO PANEL (STEPPER 1-6)
  // ==========================================
  let currentStep = 0;
  let stepTimeout;
  const stepButtons = document.querySelectorAll('button[aria-label^="step"]');
  const heroSteps = document.querySelectorAll('.hero-step');
  
  // Script typing state variables
  let typingIntervals = [];
  const scriptHook = "Elon Musk e Sam Altman estão literalmente no tribunal agora. E o que está em jogo pode matar o IPO da OpenAI.";
  const scriptCta = 'Siga pra updates diários conforme os depoimentos saem...';

  // Video edit caption rotations
  const editCaptions = [
    'EU <span style="color:#FFE6B0">ECONOMIZEI</span>',
    '<span style="color:#FFE6B0">2 HORAS</span> POR DIA',
    'COM UM ÚNICO <span style="color:#FFE6B0">TRUQUE</span>',
    'QUE <span style="color:#FFE6B0">NINGUÉM</span> TE CONTA',
    'OLHA SÓ <span style="color:#FFE6B0">ISSO</span> AQUI',
    '<span style="color:#FFE6B0">INSANO</span>, NÉ?'
  ];
  let editCaptionInterval;

  function typeText(elementId, text, speed = 20, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
    typingIntervals.push(interval);
  }

  function setStep(index) {
    currentStep = index;

    // Toggle active classes on step views
    heroSteps.forEach((step, idx) => {
      step.classList.toggle("active", idx === index);
    });

    // Reset writing effects & intervals
    typingIntervals.forEach(clearInterval);
    typingIntervals = [];
    clearInterval(editCaptionInterval);

    // Dynamic steps actions
    if (index === 3) {
      // Step 4: Write Script Animation
      const statusText = document.getElementById("script-status-text");
      const statusDot = document.getElementById("script-status-dot");
      const ctaEl = document.getElementById("script-cta-text");
      if (ctaEl) ctaEl.textContent = "";
      
      if (statusText) statusText.textContent = "GERANDO GANCHO...";
      if (statusDot) statusDot.style.background = "#C97A1F";

      typeText("script-hook-text", scriptHook, 15, () => {
        if (statusText) statusText.textContent = "GERANDO CTA...";
        typeText("script-cta-text", scriptCta, 15, () => {
          if (statusText) statusText.textContent = "ROTEIRO PRONTO";
          if (statusDot) statusDot.style.background = "#2E6B47";
        });
      });
    } else if (index === 4) {
      // Step 5: Edit Caption Overlay Loops
      const captionEl = document.getElementById('video-caption');
      if (captionEl) captionEl.innerHTML = editCaptions[0];
      let capIdx = 0;
      editCaptionInterval = setInterval(() => {
        capIdx = (capIdx + 1) % editCaptions.length;
        if (captionEl) captionEl.innerHTML = editCaptions[capIdx];
      }, 500);
    }

    // Update bottom step buttons and progress bars
    stepButtons.forEach((btn, idx) => {
      const progressSpan = btn.querySelector("span");
      if (progressSpan) {
        if (idx < index) {
          progressSpan.style.width = "100%";
          progressSpan.style.animation = "none";
        } else if (idx === index) {
          progressSpan.style.width = "0%";
          progressSpan.style.animation = "none";
          progressSpan.offsetHeight; // force reflow
          progressSpan.style.width = "100%";
          progressSpan.style.animation = "sb-progress 3000ms linear forwards";
        } else {
          progressSpan.style.width = "0%";
          progressSpan.style.animation = "none";
        }
      }
    });
  }

  function nextStep() {
    currentStep = (currentStep + 1) % 6;
    setStep(currentStep);
    stepTimeout = setTimeout(nextStep, 3000);
  }

  // Stepper buttons click handlers
  stepButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      clearTimeout(stepTimeout);
      setStep(idx);
      stepTimeout = setTimeout(nextStep, 3000);
    });
  });

  // Init Hero simulation stepper
  setStep(0);
  stepTimeout = setTimeout(nextStep, 3000);


  // ==========================================
  // 3. SELETOR DE NICHOS (DISCOVER NICHE CARD)
  // ==========================================
  const nicheData = {
    "Fitness": {
      category: "MOFU · Mito vs verdade",
      score: "88",
      title: "Você não precisa treinar 6× por semana pra ganhar massa. Provo em 60s.",
      body: "Talking head direto desmontando o mito do volume alto, com referência de estudo recente e exemplo real do seu próprio treino atual.",
      why: "Combina com padrão vencedor do nicho."
    },
    "Viagens": {
      category: "TOFU · Lista / Roteiro",
      score: "94",
      title: "3 destinos secretos na Europa que custam metade do preço de Paris.",
      body: "Vídeo dinâmico mostrando imagens rápidas dos locais com legenda flutuante, preços médios de estadia e link para guia gratuito na bio.",
      why: "Ganchos visuais rápidos retêm o público do nicho."
    },
    "Culinária": {
      category: "TOFU · Receita Rápida",
      score: "91",
      title: "A sobremesa de 3 ingredientes que viralizou na gringa. Pronta em 5 min.",
      body: "Corte dinâmico da preparação em primeira pessoa, com áudio original satisfatório (ASMR) e receita completa descrita na legenda.",
      why: "Receitas de alta facilidade geram muitos salvamentos."
    },
    "Beleza": {
      category: "MOFU · Tutorial / Review",
      score: "89",
      title: "Como cobrir olheiras sem craquelar: o erro que você está cometendo.",
      body: "Close-up focado mostrando a aplicação correta em um lado do rosto contra a incorreta no outro, com dica de produto acessível.",
      why: "Comparativos de \"antes e depois\" geram alto engajamento."
    },
    "Pets": {
      category: "TOFU · Humor / Identificação",
      score: "93",
      title: "O que o seu cachorro pensa quando você sai para trabalhar.",
      body: "Compilado de vídeos fofos com dublagem bem-humorada em primeira pessoa, gerando identificação imediata para donos de pet.",
      why: "Formatos emocionais e engraçados têm alto compartilhamento."
    },
    "Direito": {
      category: "BOFU · Dica Legal",
      score: "86",
      title: "Comprou voo cancelado? O que a companhia aérea esconde de você.",
      body: "Roteiro direto com tom de autoridade, citando o artigo do código de defesa do consumidor e explicando como exigir o reembolso.",
      why: "Conteúdo de utilidade pública gera alta taxa de salvamento."
    },
    "Maternidade": {
      category: "MOFU · Relato / Desabafo",
      score: "90",
      title: "A verdade sobre a 'rede de apoio' que ninguém te conta antes do parto.",
      body: "Storytelling sincero em formato de desabafo no carro, validando o sentimento de outras mães e sugerindo soluções práticas.",
      why: "Gera forte conexão emocional e muitos comentários de apoio."
    },
    "Crypto": {
      category: "TOFU · Alerta / Notícia",
      score: "92",
      title: "O evento de amanhã que pode fazer o Bitcoin subir ou derreter.",
      body: "Análise gráfica rápida em 45 segundos, explicando o impacto da decisão do FED de forma simplificada para iniciantes.",
      why: "Conteúdo urgente incentiva o compartilhamento rápido."
    },
    "Negócios": {
      category: "MOFU · Estudo de Caso",
      score: "95",
      title: "Como uma marca de água de $1 fatura milhões usando branding de cerveja.",
      body: "Análise visual do caso Liquid Death, quebrando a estratégia de marketing de guerrilha e aplicando a lição para pequenos negócios.",
      why: "Estudos de caso curtos mostram autoridade e retêm profissionais."
    },
    "Lifestyle": {
      category: "TOFU · Rotina / Vibe",
      score: "87",
      title: "Minha rotina matinal 5:00 AM para produtividade (sem ser chato).",
      body: "Cuts estéticos de transições rápidas (café, treino, leitura) com narração em voiceover inspiradora sobre foco e consistência.",
      why: "Vídeos estéticos e associativos geram alto engajamento visual."
    }
  };

  const nicheTags = document.querySelectorAll(".niche-tag");
  nicheTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      nicheTags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");

      const nicheName = tag.getAttribute("data-niche");
      const data = nicheData[nicheName];

      if (data) {
        // Find and animate Card Wrapper
        const categorySpan = document.getElementById("niche-card-category");
        if (categorySpan) {
          const cardWrapper = categorySpan.closest("div");
          if (cardWrapper) {
            cardWrapper.style.animation = "none";
            cardWrapper.offsetHeight; // trigger reflow
            cardWrapper.style.animation = "320ms cubic-bezier(0.2, 0.7, 0.2, 1) 0s 1 normal both running lp-card-fade";
          }
        }

        // Update card contents
        const scoreSpan = document.getElementById("niche-card-score");
        const titleSpan = document.getElementById("niche-card-title");
        const bodySpan = document.getElementById("niche-card-body");
        const whySpan = document.getElementById("niche-card-why");

        if (categorySpan) {
          categorySpan.innerHTML = `<span style="width:6px;height:6px;border-radius:999px;background:rgb(201,122,31);display:inline-block;margin-right:5px;"></span>${data.category}`;
        }
        if (scoreSpan) scoreSpan.textContent = data.score;
        if (titleSpan) titleSpan.textContent = data.title;
        if (bodySpan) bodySpan.textContent = data.body;
        if (whySpan) whySpan.textContent = data.why;
      }
    });
  });


  // ==========================================
  // 4. PERGUNTAS FREQUENTES (FAQ ACCORDION)
  // ==========================================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answerDiv = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-toggle-icon");

    if (questionBtn && answerDiv) {
      questionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains("open");

        // Close other open accordion items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("open");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-toggle-icon");
          if (otherAnswer) otherAnswer.classList.remove("open");
          if (otherIcon) {
            otherIcon.textContent = "+";
            otherIcon.style.transform = "rotate(0deg)";
          }
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add("open");
          answerDiv.classList.add("open");
          if (icon) {
            icon.textContent = "−";
            icon.style.transform = "rotate(180deg)";
          }
        } else {
          item.classList.remove("open");
          answerDiv.classList.remove("open");
          if (icon) {
            icon.textContent = "+";
            icon.style.transform = "rotate(0deg)";
          }
        }
      });
    }
  });
});

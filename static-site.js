const photos = [
  "007659dc-2dfc-402e-b203-daf6e95488a1.jpg",
  "29104e9c-584b-4086-8179-77b4bb85fc02.jpg",
  "48b08cd3-dc78-4015-8ee2-319fbfe491eb.jpg",
  "5250bad9-7913-4c11-9fa5-304db509a4a4.jpg",
  "76ab6975-35bb-496e-9e6d-608cae12bda1.jpg",
  "7c42c679-c013-4c4f-8c31-f4867b0a57ce.jpg",
  "9319f842-6aa9-463b-b561-3fe66733fb28.jpg",
  "9a354ad0-3640-465a-9c1b-49c3cf898d01.jpg",
  "b4bfd80f-767f-4fb3-bb71-48385dd359bc.jpg",
  "c42e28f0-e258-4fec-b05b-dadc5bd31309.jpg",
  "d1c3ecf9-a711-4b25-8703-76d3867b424e.jpg",
  "d8acc275-1034-409a-bd60-df6cab208413.jpg",
  "f4d4d687-a065-4fc1-a51f-3e86697f5275.jpg"
];

const loveCards = [
  {
    title: "Seu sorriso",
    body: "Existe um antes e um depois quando ele aparece. O mundo fica mais leve, como se tudo encontrasse o tom certo."
  },
  {
    title: "Sua risada",
    body: "Ela muda o clima de qualquer lugar. Eu reconheceria esse som em qualquer universo."
  },
  {
    title: "Seu cuidado",
    body: "Você repara nas pessoas de um jeito raro. Faz carinho nos detalhes, protege sem fazer barulho."
  },
  {
    title: "Seu carinho",
    body: "Tem coisas que só ficam bonitas quando vêm de você. Um gesto pequeno seu vira memória grande."
  },
  {
    title: "Sua personalidade",
    body: "Doce, intensa, única. Um conjunto impossível de repetir, impossível de esquecer."
  },
  {
    title: "Você em geral",
    body: "O jeito de olhar, as manias, as frases, os silêncios. Eu amo até o que talvez você nem perceba."
  }
];

const memoryCategories = [
  {
    id: "favoritos",
    title: "❤ Momentos favoritos",
    signal: "AFETO PRIMÁRIO",
    entries: [
      {
        title: "Quando tudo pareceu simples",
        body: "Aqueles minutos em que estar com você bastou para transformar o meu dia inteiro.",
        photoIndex: 0
      },
      {
        title: "O tipo de lembrança que fica",
        body: "Não porque foi perfeito, mas porque eu vivi aquilo com você.",
        photoIndex: 3
      },
      {
        title: "Um pedaço de paz",
        body: "O mundo correndo do lado de fora e, ali dentro, só importava ficar perto de você.",
        photoIndex: 6
      }
    ]
  },
  {
    id: "engracados",
    title: "😂 Momentos engraçados",
    signal: "RISADA DETECTADA",
    entries: [
      {
        title: "O caos bonito",
        body: "A parte em que nada sai exatamente como planejado e mesmo assim vira uma das minhas histórias preferidas.",
        photoIndex: 1
      },
      {
        title: "Olhares cúmplices",
        body: "Aquele nosso código secreto em que uma cara sua já me conta a piada inteira.",
        photoIndex: 4
      },
      {
        title: "Rir até esquecer",
        body: "Porque com você, até o absurdo parece ter trilha sonora.",
        photoIndex: 8
      }
    ]
  },
  {
    id: "detalhes",
    title: "🌙 Pequenos detalhes",
    signal: "CAMADA SECRETA",
    entries: [
      {
        title: "Jeito de cuidar",
        body: "Nas pequenas atitudes, você me mostra que amor também mora na atenção.",
        photoIndex: 2
      },
      {
        title: "O olhar",
        body: "Tem respostas que eu encontro antes mesmo de você dizer qualquer coisa.",
        photoIndex: 5
      },
      {
        title: "As manias",
        body: "Coisas pequenas, quase invisíveis, que fazem você ser exatamente você.",
        photoIndex: 9
      }
    ]
  },
  {
    id: "especiais",
    title: "✨ Lembranças especiais",
    signal: "ARQUIVO ETERNO",
    entries: [
      {
        title: "O começo de uma certeza",
        body: "Quando eu entendi que não queria apenas viver momentos, queria viver você.",
        photoIndex: 7
      },
      {
        title: "Presente contínuo",
        body: "Tem lembranças que não ficam no passado. Elas continuam acontecendo dentro de mim.",
        photoIndex: 10
      },
      {
        title: "Casa em forma de pessoa",
        body: "Eu encontrei em você destino, descanso e futuro no mesmo nome.",
        photoIndex: 12
      }
    ]
  }
];

const futureMoments = [
  {
    title: "Viagens",
    body: "Novas cidades, novas fotos, o mesmo jeito de procurar a sua mão."
  },
  {
    title: "Conquistas",
    body: "Celebrar cada vitória como se fosse nossa, porque de algum jeito sempre será."
  },
  {
    title: "Crescimento pessoal",
    body: "Ser abrigo sem prender, impulso sem pressa, amor que ajuda a virar versão melhor."
  },
  {
    title: "Novas experiências",
    body: "Experimentar o mundo com a curiosidade de quem sabe que a companhia muda tudo."
  },
  {
    title: "Envelhecer juntos",
    body: "Chegar longe e ainda reconhecer, no rosto do outro, o mesmo lugar de sempre."
  }
];

const tracks = [
  {
    id: "hello-kitty",
    name: "Hello Kitty",
    image: "hellokitty.png",
    artist: "Ariana Grande",
    track: "Ariana Grande",
    note: "Doce, brilhante e com cara de Brenda.",
    link: "https://open.spotify.com/intl-pt/track/6XXKB32Om6WuXg3uEWwTob?si=fbfeb5631c2b4ca1",
    embed: "https://open.spotify.com/embed/track/6XXKB32Om6WuXg3uEWwTob?utm_source=generator&theme=0",
    uri: "spotify:track:6XXKB32Om6WuXg3uEWwTob"
  },
  {
    id: "spiderman",
    name: "Homem-Aranha",
    image: "spiderman.png",
    artist: "Billie Eilish",
    track: "Billie Eilish",
    note: "Trecho escolhido: What a drag...",
    link: "https://open.spotify.com/intl-pt/track/5XsAal7ZcWg1I5T4NcRjkv?si=bfadf5b849754a68",
    embed: "https://open.spotify.com/embed/track/5XsAal7ZcWg1I5T4NcRjkv?utm_source=generator&theme=0",
    uri: "spotify:track:5XsAal7ZcWg1I5T4NcRjkv"
  }
];

const multiverseChoices = [
  {
    prompt: "Primeira conversa",
    left: "Eu falo com Brenda",
    right: "Eu guardo tudo em silêncio",
    consequence: "A linha do tempo tenta se dividir, mas a curiosidade puxa os dois para a mesma cena."
  },
  {
    prompt: "Tempo",
    left: "Conhecer mais cedo",
    right: "Conhecer mais tarde",
    consequence: "O calendário muda, os detalhes mudam, mas o encontro continua aparecendo como ponto fixo."
  },
  {
    prompt: "Lugar",
    left: "Outro lugar",
    right: "Mesmo lugar",
    consequence: "As coordenadas giram como um mapa vivo e sempre desenham uma rota de volta para Brenda."
  },
  {
    prompt: "Momento da vida",
    left: "Outra fase",
    right: "Momento atual",
    consequence: "O sistema recalcula medos, escolhas e caminhos. O resultado continua insistindo em nós dois."
  },
  {
    prompt: "Universo",
    left: "Outro universo",
    right: "Universo atual",
    consequence: "Mesmo com novas regras, novas estrelas e novas versões de mim, a simulação converge."
  }
];

const anniversaryStart = new Date("2025-10-09T00:00:00-03:00");
let spotifyApi = null;
let spotifyApiPromise = null;

function photoUrl(name) {
  return `./img/${encodeURIComponent(name)}`;
}

function formatTwo(value) {
  return String(value).padStart(2, "0");
}

function seededRandom(seed) {
  const value = Math.sin(seed * 999.91) * 10000;
  return value - Math.floor(value);
}

function getAudio() {
  return document.getElementById("ambient-audio");
}

function tryPlayAmbient() {
  const audio = getAudio();

  if (!audio) {
    return Promise.resolve(false);
  }

  audio.volume = 0.52;
  return audio
    .play()
    .then(() => true)
    .catch(() => false);
}

function pauseAmbientAudio() {
  const audio = getAudio();
  if (audio) {
    audio.pause();
  }
}

function resumeAmbientAudio() {
  void tryPlayAmbient();
}

function bindAudioFallback() {
  const start = () => {
    void tryPlayAmbient().then((played) => {
      if (!played) {
        return;
      }

      window.removeEventListener("pointerdown", start, true);
      window.removeEventListener("touchstart", start, true);
      window.removeEventListener("keydown", start, true);
    });
  };

  void tryPlayAmbient().then((played) => {
    if (played) {
      return;
    }

    window.addEventListener("pointerdown", start, true);
    window.addEventListener("touchstart", start, true);
    window.addEventListener("keydown", start, true);
  });
}

function loadSpotifyIframeApi() {
  if (spotifyApi) {
    return Promise.resolve(spotifyApi);
  }

  if (spotifyApiPromise) {
    return spotifyApiPromise;
  }

  spotifyApiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      if (typeof previousReady === "function") {
        previousReady(api);
      }

      spotifyApi = api;
      resolve(api);
    };

    if (document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.onerror = () => reject(new Error("Spotify API failed"));
    document.body.appendChild(script);
  });

  return spotifyApiPromise;
}

function typeIntro() {
  const lines = [
    "Pesquisando todos os universos...",
    "Procurando a pessoa mais importante da minha vida...",
    "Sistema encontrou um resultado.",
    "Brenda Nickolly"
  ];
  const typedText = document.getElementById("typed-text");
  const typedLine = document.getElementById("typed-line");
  const enterButton = document.getElementById("enter-button");
  let lineIndex = 0;
  let charIndex = 0;

  const tick = () => {
    const current = lines[lineIndex];
    charIndex += 1;
    typedText.textContent = current.slice(0, charIndex);
    typedLine.classList.toggle("typed-line-name", lineIndex === lines.length - 1);

    if (charIndex < current.length) {
      window.setTimeout(tick, lineIndex === lines.length - 1 ? 58 : 32);
      return;
    }

    if (lineIndex === lines.length - 1) {
      window.setTimeout(() => {
        enterButton.hidden = false;
      }, 520);
      return;
    }

    window.setTimeout(() => {
      lineIndex += 1;
      charIndex = 0;
      typedText.textContent = "";
      tick();
    }, lineIndex === 2 ? 850 : 1050);
  };

  tick();
}

function enterSite() {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");
  const portal = document.getElementById("portal-overlay");

  portal.hidden = false;
  void tryPlayAmbient();

  window.setTimeout(() => {
    intro.hidden = true;
    site.hidden = false;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    startNameCanvas();
    startMultiverseCanvas();
  }, 1550);
}

function renderLoveCards() {
  const container = document.getElementById("love-cards");
  const modal = document.getElementById("love-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  loveCards.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = "love-card";
    button.type = "button";
    button.innerHTML = `<span>${formatTwo(index + 1)}</span><strong>${card.title}</strong>`;
    button.addEventListener("click", () => {
      modalTitle.textContent = card.title;
      modalBody.textContent = card.body;
      modal.hidden = false;
    });
    container.appendChild(button);
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    modal.hidden = true;
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  });
}

function renderArchive() {
  const tabs = document.getElementById("archive-tabs");
  const content = document.getElementById("archive-content");
  let activeId = memoryCategories[0].id;

  const render = () => {
    const active = memoryCategories.find((category) => category.id === activeId) ?? memoryCategories[0];
    tabs.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.dataset.id === activeId);
    });
    content.innerHTML = "";
    active.entries.forEach((entry) => {
      const photo = photos[entry.photoIndex % photos.length];
      const article = document.createElement("article");
      article.className = "memory-entry";
      article.innerHTML = `
        <img alt="${entry.title}" decoding="async" loading="lazy" src="${photoUrl(photo)}" />
        <div>
          <span>${active.signal}</span>
          <h3>${entry.title}</h3>
          <p>${entry.body}</p>
        </div>
      `;
      content.appendChild(article);
    });
  };

  memoryCategories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "archive-tab";
    button.type = "button";
    button.dataset.id = category.id;
    button.innerHTML = `<span>${category.title}</span><small>${category.signal}</small>`;
    button.addEventListener("click", () => {
      activeId = category.id;
      render();
    });
    tabs.appendChild(button);
  });

  render();
}

function renderMusicChapter() {
  const grid = document.getElementById("character-music-grid");

  tracks.forEach((track) => {
    const card = document.createElement("article");
    card.className = "character-music-card";
    card.innerHTML = `
      <div class="character-portrait">
        <img alt="${track.name}" decoding="async" loading="lazy" src="${photoUrl(track.image)}" />
        <span>${track.name}</span>
      </div>
      <div class="spotify-widget-shell">
        <div class="spotify-widget-header">
          <span class="spark">✦</span>
          <div>
            <span>${track.artist}</span>
            <strong>${track.track}</strong>
            <small>${track.note}</small>
          </div>
        </div>
        <div class="spotify-embed-host" id="spotify-${track.id}" aria-label="${track.artist} no Spotify"></div>
        <a href="${track.link}" target="_blank" rel="noreferrer">Abrir no Spotify</a>
      </div>
    `;
    grid.appendChild(card);
    setupSpotifyEmbed(track);
  });
}

function setupSpotifyEmbed(track) {
  const host = document.getElementById(`spotify-${track.id}`);
  let resumeTimer = 0;
  const scheduleResume = (delay = 800) => {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(resumeAmbientAudio, delay);
  };

  loadSpotifyIframeApi()
    .then((api) => {
      api.createController(
        host,
        {
          height: 152,
          theme: "dark",
          uri: track.uri,
          width: "100%"
        },
        (controller) => {
          controller.addListener("playback_started", pauseAmbientAudio);
          controller.addListener("playback_update", (event) => {
            const state = event.data;

            if (!state) {
              return;
            }

            if (!state.isPaused) {
              window.clearTimeout(resumeTimer);
              pauseAmbientAudio();
              return;
            }

            scheduleResume();
          });
        }
      );
    })
    .catch(() => {
      host.innerHTML = `
        <iframe
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          src="${track.embed}"
          title="${track.artist} no Spotify"></iframe>
      `;
      host.addEventListener("pointerdown", pauseAmbientAudio, true);
    });
}

function renderFutureTimeline() {
  const timeline = document.getElementById("future-timeline");
  futureMoments.forEach((moment, index) => {
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.innerHTML = `<span>${formatTwo(index + 1)}</span><h3>${moment.title}</h3><p>${moment.body}</p>`;
    timeline.appendChild(item);
  });
}

function renderPhotoWall() {
  const wall = document.getElementById("photo-wall-space");
  photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "polaroid";
    figure.style.transform = `rotate(${(-10 + (index % 7) * 3)}deg)`;
    figure.innerHTML = `
      <img alt="Memória de Brenda e eu ${index + 1}" decoding="async" loading="lazy" src="${photoUrl(photo)}" />
    `;
    wall.appendChild(figure);
  });
}

function renderHeart() {
  const heart = document.getElementById("heart-constellation");
  for (let index = 0; index < 92; index += 1) {
    const t = (index / 92) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const dot = document.createElement("span");
    dot.style.left = `${50 + x * 2.35 + (seededRandom(index + 2) - 0.5) * 2}%`;
    dot.style.top = `${50 - y * 2.25 + (seededRandom(index + 8) - 0.5) * 2}%`;
    const size = 2 + seededRandom(index + 31) * 3;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    heart.appendChild(dot);
  }

  const word = document.createElement("div");
  word.className = "heart-final-word";
  word.textContent = "Brenda";
  heart.appendChild(word);
}

function calculateCountdown(now = new Date()) {
  let cursor = new Date(anniversaryStart);
  let years = 0;
  let months = 0;

  while (addYears(cursor, 1) <= now) {
    cursor = addYears(cursor, 1);
    years += 1;
  }

  while (addMonths(cursor, 1) <= now) {
    cursor = addMonths(cursor, 1);
    months += 1;
  }

  const diff = Math.max(0, now.getTime() - cursor.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { years, months, days, hours, minutes, seconds };
}

function addYears(date, years) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function startCountdown() {
  const grid = document.getElementById("countdown-grid");
  const render = () => {
    const time = calculateCountdown();
    const values = [
      ["anos", time.years],
      ["meses", time.months],
      ["dias", time.days],
      ["horas", time.hours],
      ["minutos", time.minutes],
      ["segundos", time.seconds]
    ];
    grid.innerHTML = values
      .map(([label, value]) => `<div class="countdown-cell"><strong>${formatTwo(value)}</strong><span>${label}</span></div>`)
      .join("");
  };

  render();
  window.setInterval(render, 1000);
}

function startNameCanvas() {
  const canvas = document.getElementById("name-canvas");
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const points = [];

  const hiddenCanvas = document.createElement("canvas");
  hiddenCanvas.width = width;
  hiddenCanvas.height = height;
  const hidden = hiddenCanvas.getContext("2d", { willReadFrequently: true });
  hidden.fillStyle = "#fff";
  hidden.textAlign = "center";
  hidden.textBaseline = "middle";
  hidden.font = "900 132px Inter, Arial, sans-serif";
  hidden.fillText("Brenda", width / 2, height / 2 + 8);
  const pixels = hidden.getImageData(0, 0, width, height).data;

  for (let y = 38; y < height - 38; y += 12) {
    for (let x = 28; x < width - 28; x += 12) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha > 120 && seededRandom(x + y * 3) > 0.5) {
        points.push({
          x: seededRandom(points.length + 3) * width,
          y: seededRandom(points.length + 7) * height,
          tx: x,
          ty: y,
          size: 1.5 + seededRandom(points.length + 12) * 2.8
        });
      }
    }
  }

  const start = performance.now();
  const animate = (time) => {
    const progress = Math.min(1, (time - start) / 3200);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255,255,255,0.9)";
    context.shadowBlur = 12;
    context.shadowColor = "rgba(244,167,190,0.76)";

    points.slice(0, 380).forEach((point) => {
      const ease = 1 - (1 - progress) ** 3;
      const x = point.x + (point.tx - point.x) * ease;
      const y = point.y + (point.ty - point.y) * ease;
      context.beginPath();
      context.arc(x, y, point.size, 0, Math.PI * 2);
      context.fill();
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}

function startMultiverseCanvas() {
  const section = document.getElementById("multiverse");
  const canvas = document.getElementById("multiverse-canvas");
  const context = canvas.getContext("2d");
  let active = false;
  let particles = [];
  let convergence = 0.08;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.4);
    const rect = section.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: 680 }, (_, index) => {
      const angle = seededRandom(index + 12) * Math.PI * 2;
      const ring = 180 + seededRandom(index + 31) * 620;
      return {
        ox: rect.width / 2 + Math.cos(angle) * ring,
        oy: rect.height / 2 + Math.sin(angle) * ring * 0.5,
        tx: rect.width / 2 + (seededRandom(index + 93) - 0.5) * 44,
        ty: rect.height / 2 + (seededRandom(index + 129) - 0.5) * 34,
        size: 0.7 + seededRandom(index + 56) * 1.7
      };
    });
  };

  const observer = new IntersectionObserver((entries) => {
    active = entries.some((entry) => entry.isIntersecting);
    if (active) {
      requestAnimationFrame(draw);
    }
  });

  const draw = (time) => {
    if (!active) {
      return;
    }

    const rect = section.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    context.fillStyle = "#030205";
    context.fillRect(0, 0, rect.width, rect.height);

    const gradient = context.createRadialGradient(rect.width / 2, rect.height / 2, 20, rect.width / 2, rect.height / 2, rect.width * 0.7);
    gradient.addColorStop(0, "rgba(244,167,190,0.2)");
    gradient.addColorStop(0.45, "rgba(139,217,221,0.08)");
    gradient.addColorStop(1, "rgba(3,2,5,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    particles.forEach((particle, index) => {
      const wave = Math.sin(time * 0.0014 + index * 0.08) * 10;
      const x = particle.ox * (1 - convergence) + particle.tx * convergence + wave;
      const y = particle.oy * (1 - convergence) + particle.ty * convergence;
      context.fillStyle = index % 2 ? "rgba(244,167,190,0.78)" : "rgba(139,217,221,0.72)";
      context.beginPath();
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fill();

      if (index % 12 === 0) {
        context.strokeStyle = "rgba(244,167,190,0.13)";
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(particle.tx, particle.ty);
        context.stroke();
      }
    });

    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  observer.observe(section);
  window.setMultiverseConvergence = (value) => {
    convergence = value;
  };
}

function renderMultiverseChoices() {
  const progress = document.getElementById("choice-progress");
  const indexLabel = document.getElementById("choice-index");
  const title = document.getElementById("choice-title");
  const left = document.getElementById("choice-left");
  const right = document.getElementById("choice-right");
  const consequence = document.getElementById("choice-consequence");
  const consoleBox = document.getElementById("choice-console");
  const result = document.getElementById("multiverse-result");
  let step = 0;
  let locked = false;

  const update = () => {
    const choice = multiverseChoices[step];
    indexLabel.textContent = `SIMULAÇÃO ${formatTwo(step + 1)}/${formatTwo(multiverseChoices.length)}`;
    title.textContent = choice.prompt;
    left.innerHTML = `<small>Universo A</small><span>${choice.left}</span>`;
    right.innerHTML = `<small>Universo B</small><span>${choice.right}</span>`;
    consequence.hidden = true;
    consequence.textContent = "";
    left.disabled = false;
    right.disabled = false;
    left.classList.remove("selected");
    right.classList.remove("selected");
    progress.style.width = `${((step + 0.12) / multiverseChoices.length) * 100}%`;
  };

  const choose = (side) => {
    if (locked) {
      return;
    }

    locked = true;
    const choice = multiverseChoices[step];
    const button = side === "left" ? left : right;
    button.classList.add("selected");
    left.disabled = true;
    right.disabled = true;
    consequence.textContent = choice.consequence;
    consequence.hidden = false;
    progress.style.width = `${((step + 0.68) / multiverseChoices.length) * 100}%`;
    if (window.setMultiverseConvergence) {
      window.setMultiverseConvergence(0.34 + step * 0.07);
    }

    window.setTimeout(() => {
      if (step >= multiverseChoices.length - 1) {
        consoleBox.hidden = true;
        result.hidden = false;
        progress.style.width = "100%";
        if (window.setMultiverseConvergence) {
          window.setMultiverseConvergence(1);
        }
        return;
      }

      step += 1;
      locked = false;
      update();
    }, 3500);
  };

  left.addEventListener("click", () => choose("left"));
  right.addEventListener("click", () => choose("right"));
  update();
}

function init() {
  typeIntro();
  bindAudioFallback();
  renderLoveCards();
  renderArchive();
  renderMusicChapter();
  renderFutureTimeline();
  renderPhotoWall();
  renderHeart();
  renderMultiverseChoices();
  startCountdown();
  document.getElementById("enter-button").addEventListener("click", enterSite);
}

document.addEventListener("DOMContentLoaded", init);

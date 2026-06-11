"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import {
  Heart,
  Sparkles,
  X
} from "lucide-react";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import * as THREE from "three";
import experienceData from "../data/experience.json";

type PhotoName = string;

type LoveCard = {
  title: string;
  body: string;
};

type MemoryEntry = {
  title: string;
  body: string;
  photoIndex: number;
};

type MemoryCategory = {
  id: string;
  title: string;
  signal: string;
  entries: MemoryEntry[];
};

type FutureMoment = {
  title: string;
  body: string;
};

type ParticlePoint = {
  id: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  size: number;
  delay: number;
};

type CountdownValue = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type MultiverseChoice = {
  prompt: string;
  left: string;
  right: string;
  consequence: string;
};

type CharacterTrack = {
  id: string;
  name: string;
  image: PhotoName;
  artist: string;
  track: string;
  note: string;
  link: string;
  embed: string;
  uri: string;
};

type SpotifyPlaybackEvent = {
  data?: {
    duration: number;
    isBuffering: boolean;
    isPaused: boolean;
    playingURI: string;
    position: number;
  };
};

type SpotifyEmbedController = {
  addListener: (
    event: "ready" | "playback_started" | "playback_update",
    callback: (event: SpotifyPlaybackEvent) => void
  ) => void;
  destroy: () => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: {
      height: number | string;
      theme?: "dark";
      uri: string;
      width: number | string;
    },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
};

type SpotifyWindow = Window &
  typeof globalThis & {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  };

const loveCards = experienceData.loveCards as LoveCard[];
const memoryCategories = experienceData.memoryCategories as MemoryCategory[];
const futureMoments = experienceData.futureMoments as FutureMoment[];
const anniversaryStart = new Date("2025-10-09T00:00:00-03:00");
const nameParticleLimit = 380;
const multiverseParticleCount = 1200;
const multiverseLineCount = 180;

const characterTracks: CharacterTrack[] = [
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

let spotifyApi: SpotifyIFrameAPI | null = null;
let spotifyApiPromise: Promise<SpotifyIFrameAPI> | null = null;

const multiverseChoices: MultiverseChoice[] = [
  {
    prompt: "Primeira conversa",
    left: "Eu falo com Brenda",
    right: "Eu guardo tudo em silêncio",
    consequence:
      "A linha do tempo tenta se dividir, mas a curiosidade puxa os dois para a mesma cena."
  },
  {
    prompt: "Tempo",
    left: "Conhecer mais cedo",
    right: "Conhecer mais tarde",
    consequence:
      "O calendário muda, os detalhes mudam, mas o encontro continua aparecendo como ponto fixo."
  },
  {
    prompt: "Lugar",
    left: "Outro lugar",
    right: "Mesmo lugar",
    consequence:
      "As coordenadas giram como um mapa vivo e sempre desenham uma rota de volta para Brenda."
  },
  {
    prompt: "Momento da vida",
    left: "Outra fase",
    right: "Momento atual",
    consequence:
      "O sistema recalcula medos, escolhas e caminhos. O resultado continua insistindo em nós dois."
  },
  {
    prompt: "Universo",
    left: "Outro universo",
    right: "Universo atual",
    consequence:
      "Mesmo com novas regras, novas estrelas e novas versões de mim, a simulação converge."
  }
];

const portalLottie = {
  v: "5.8.1",
  fr: 60,
  ip: 0,
  op: 120,
  w: 420,
  h: 420,
  nm: "Brenda portal",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "outer ring",
      sr: 1,
      ks: {
        o: { a: 0, k: 90 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 120, s: [360] }
          ]
        },
        p: { a: 0, k: [210, 210, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [82, 82, 100] },
            { t: 60, s: [112, 112, 100] },
            { t: 120, s: [82, 82, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [300, 300] } },
            {
              ty: "st",
              c: { a: 0, k: [0.956, 0.654, 0.745, 1] },
              o: { a: 0, k: 74 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "inner ring",
      sr: 1,
      ks: {
        o: { a: 0, k: 82 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [360] },
            { t: 120, s: [0] }
          ]
        },
        p: { a: 0, k: [210, 210, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [52, 52, 100] },
            { t: 45, s: [78, 78, 100] },
            { t: 120, s: [52, 52, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [220, 220] } },
            {
              ty: "st",
              c: { a: 0, k: [0.545, 0.851, 0.866, 1] },
              o: { a: 0, k: 74 },
              w: { a: 0, k: 3 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "core",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [35] },
            { t: 60, s: [95] },
            { t: 120, s: [35] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [210, 210, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [40, 40, 100] },
            { t: 60, s: [70, 70, 100] },
            { t: 120, s: [40, 40, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [160, 160] } },
            {
              ty: "fl",
              c: { a: 0, k: [0.956, 0.847, 0.654, 1] },
              o: { a: 0, k: 26 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ]
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999.91) * 10000;
  return value - Math.floor(value);
}

function photoUrl(name: PhotoName) {
  return `/api/photo/${encodeURIComponent(name)}`;
}

function audioUrl(name: string) {
  return `/api/audio/${encodeURIComponent(name)}`;
}

function pauseAmbientAudio() {
  window.dispatchEvent(new Event("brenda:pause-ambient"));
}

function resumeAmbientAudio() {
  window.dispatchEvent(new Event("brenda:resume-ambient"));
}

function loadSpotifyIframeApi() {
  if (spotifyApi) {
    return Promise.resolve(spotifyApi);
  }

  if (spotifyApiPromise) {
    return spotifyApiPromise;
  }

  spotifyApiPromise = new Promise<SpotifyIFrameAPI>((resolve, reject) => {
    const spotifyWindow = window as SpotifyWindow;
    const previousReady = spotifyWindow.onSpotifyIframeApiReady;

    spotifyWindow.onSpotifyIframeApiReady = (api) => {
      previousReady?.(api);
      spotifyApi = api;
      resolve(api);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
    );

    if (existingScript) {
      existingScript.addEventListener("error", () => reject(new Error("Spotify API failed")));
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

function addYears(date: Date, years: number) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function calculateCountdown(now = new Date()): CountdownValue {
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

function formatTwo(value: number) {
  return String(value).padStart(2, "0");
}

export function ExperienceClient({
  audioFile,
  photos
}: {
  audioFile: string | null;
  photos: PhotoName[];
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.08
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [entered]);

  return (
    <>
      <AmbientAudio audioFile={audioFile} />
      <AnimatePresence mode="wait">
        {!entered ? (
          <IntroSequence key="intro" onComplete={() => setEntered(true)} />
        ) : (
          <MainExperience audioFile={audioFile} key="main" photos={photos} />
        )}
      </AnimatePresence>
    </>
  );
}

function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const lines = useMemo(
    () => [
      "Pesquisando todos os universos...",
      "Procurando a pessoa mais importante da minha vida...",
      "Sistema encontrou um resultado.",
      "Brenda Nickolly"
    ],
    []
  );
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [ready, setReady] = useState(false);
  const [portal, setPortal] = useState(false);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      return;
    }

    const current = lines[lineIndex];
    let character = 0;
    setTyped("");
    setReady(false);

    const interval = window.setInterval(() => {
      character += 1;
      setTyped(current.slice(0, character));

      if (character >= current.length) {
        window.clearInterval(interval);

        if (lineIndex === lines.length - 1) {
          window.setTimeout(() => setReady(true), 620);
          return;
        }

        window.setTimeout(() => {
          setLineIndex((value) => value + 1);
        }, lineIndex === 2 ? 900 : 1150);
      }
    }, lineIndex === lines.length - 1 ? 58 : 32);

    return () => window.clearInterval(interval);
  }, [lineIndex, lines]);

  const enter = () => {
    setPortal(true);
    window.setTimeout(onComplete, 2300);
  };

  return (
    <motion.section
      className="intro-screen"
      exit={{ opacity: 0, scale: 1.03, filter: "blur(16px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="intro-stars" />
      <div className="intro-scanline" />

      <motion.div
        className="intro-console"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="system-pill">PROJECT BRENDA</span>
        <div
          className={
            lineIndex === lines.length - 1 ? "typed-line typed-line-name" : "typed-line"
          }
        >
          {typed}
          <span className="cursor" />
        </div>

        <motion.span
          className="creator-credit"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          Um site criado 100% por Filipe para Brenda
        </motion.span>

        <AnimatePresence>
          {ready && (
            <motion.button
              className="enter-button"
              type="button"
              onClick={enter}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.98 }}
            >
              Entrar
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {portal && (
          <motion.div
            className="portal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="portal-lottie"
              initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
              animate={{ scale: [0.2, 1, 1.65], rotate: 0, opacity: [0, 1, 0.96] }}
              transition={{ duration: 2.1, ease: "easeInOut" }}
            >
              <Lottie animationData={portalLottie} loop />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function MainExperience({
  audioFile,
  photos
}: {
  audioFile: string | null;
  photos: PhotoName[];
}) {
  return (
    <motion.main
      className="experience-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <AmbientBackground />

      <section className="opening-statement">
        <div className="statement-inner" data-reveal>
          <span className="chapter-kicker">Entre infinitos universos possíveis</span>
          <h1>Eu sempre encontraria Brenda.</h1>
        </div>
      </section>

      <ProbabilityChapter />
      <LoveCardsChapter />
      <MemoryArchive photos={photos} />
      <CharacterMusicChapter />
      <MultiverseChoiceChapter />
      <FutureTimeline />
      <FinalChapter photos={photos} />
    </motion.main>
  );
}

function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="star-noise" />
      <div className="light-rift light-rift-one" />
      <div className="light-rift light-rift-two" />
    </div>
  );
}

function AmbientAudio({ audioFile }: { audioFile: string | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const removeGestureListenersRef = useRef<(() => void) | null>(null);

  const clearGestureListeners = useCallback(() => {
    removeGestureListenersRef.current?.();
    removeGestureListenersRef.current = null;
  }, []);

  const tryPlay = useCallback(async () => {
    const element = audioRef.current;

    if (!element) {
      return false;
    }

    try {
      await element.play();
      clearGestureListeners();
      return true;
    } catch {
      return false;
    }
  }, [clearGestureListeners]);

  useEffect(() => {
    if (!audioFile || typeof Audio !== "function") {
      return;
    }

    const element = new Audio(audioUrl(audioFile));
    element.loop = true;
    element.volume = 0.52;
    element.preload = "auto";
    element.muted = false;
    audioRef.current = element;

    const startFromGesture = () => {
      void tryPlay();
    };

    const addGestureListeners = () => {
      if (removeGestureListenersRef.current) {
        return;
      }

      window.addEventListener("pointerdown", startFromGesture, true);
      window.addEventListener("touchstart", startFromGesture, true);
      window.addEventListener("keydown", startFromGesture, true);
      removeGestureListenersRef.current = () => {
        window.removeEventListener("pointerdown", startFromGesture, true);
        window.removeEventListener("touchstart", startFromGesture, true);
        window.removeEventListener("keydown", startFromGesture, true);
      };
    };

    const pauseFromExternal = () => {
      clearGestureListeners();
      element.pause();
    };

    const resumeFromExternal = () => {
      void tryPlay().then((played) => {
        if (!played) {
          addGestureListeners();
        }
      });
    };

    window.addEventListener("brenda:pause-ambient", pauseFromExternal);
    window.addEventListener("brenda:resume-ambient", resumeFromExternal);
    void tryPlay().then((played) => {
      if (!played) {
        addGestureListeners();
      }
    });

    return () => {
      window.removeEventListener("brenda:pause-ambient", pauseFromExternal);
      window.removeEventListener("brenda:resume-ambient", resumeFromExternal);
      clearGestureListeners();
      element.pause();
      element.removeAttribute("src");
      audioRef.current = null;
    };
  }, [audioFile, clearGestureListeners, tryPlay]);

  return null;
}

function ProbabilityChapter() {
  return (
    <section className="chapter probability-chapter">
      <div className="chapter-copy" data-reveal>
        <span className="chapter-kicker">Capítulo 1</span>
        <h2>A Probabilidade</h2>
        <div className="stat-sequence">
          <span>Mais de 8 bilhões de pessoas.</span>
          <span>Milhões de caminhos possíveis.</span>
          <span>Infinitas combinações.</span>
          <strong>Mas de alguma forma...</strong>
        </div>
      </div>
      <NameParticleField />
    </section>
  );
}

function NameParticleField() {
  const [formed, setFormed] = useState(false);
  const [points, setPoints] = useState<ParticlePoint[]>([]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const width = 760;
    const height = 240;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      return;
    }

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "900 118px Inter, Arial, sans-serif";
    context.fillText("Brenda", width / 2, height / 2 + 8);

    const pixels = context.getImageData(0, 0, width, height).data;
    const sampled: ParticlePoint[] = [];
    let id = 0;

    for (let y = 18; y < height - 18; y += 11) {
      for (let x = 20; x < width - 20; x += 11) {
        const alpha = pixels[(y * width + x) * 4 + 3];

        if (alpha > 120 && seededRandom(x + y * 3) > 0.42) {
          sampled.push({
            id,
            sx: seededRandom(id + 3) * 100,
            sy: seededRandom(id + 7) * 100,
            tx: (x / width) * 100,
            ty: (y / height) * 100,
            size: 1.5 + seededRandom(id + 12) * 2.8,
            delay: seededRandom(id + 19) * 0.9
          });
          id += 1;
        }
      }
    }

    sampled.sort((a, b) => seededRandom(a.id + 100) - seededRandom(b.id + 100));
    setPoints(sampled.slice(0, nameParticleLimit));

    const timer = window.setTimeout(() => setFormed(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="particle-stage" data-reveal>
      <div className="particle-grid" />
      {points.map((point) => (
        <motion.span
          className="name-particle"
          key={point.id}
          initial={{ opacity: 0, left: `${point.sx}%`, top: `${point.sy}%` }}
          animate={{
            opacity: formed ? 1 : [0, 0.9, 0.5],
            left: formed ? `${point.tx}%` : `${point.sx}%`,
            top: formed ? `${point.ty}%` : `${point.sy}%`
          }}
          transition={{
            delay: point.delay,
            duration: formed ? 1.9 : 2.8,
            ease: formed ? "easeInOut" : "easeOut"
          }}
          style={
            {
              "--particle-size": `${point.size}px`
            } as CSSProperties
          }
        />
      ))}
      <motion.div
        className="formed-name-aura"
        initial={{ opacity: 0 }}
        animate={{ opacity: formed ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.35 }}
      >
        Brenda
      </motion.div>
    </div>
  );
}

function LoveCardsChapter() {
  const [selectedCard, setSelectedCard] = useState<LoveCard | null>(null);

  return (
    <section className="chapter love-chapter">
      <div className="chapter-copy compact" data-reveal>
        <span className="chapter-kicker">Capítulo 2</span>
        <h2>As Coisas Que Eu Amo Em Você</h2>
      </div>

      <div className="floating-card-grid" data-reveal>
        {loveCards.map((card, index) => (
          <motion.button
            className="love-card"
            key={card.title}
            type="button"
            onClick={() => setSelectedCard(card)}
            initial={{ opacity: 0, y: 34, rotateX: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.07, duration: 0.75 }}
            whileHover={{ y: -8, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
          >
            <span>{formatTwo(index + 1)}</span>
            <strong>{card.title}</strong>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fullscreen-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.article
              className="fullscreen-card-inner"
              initial={{ y: 50, scale: 0.96, filter: "blur(12px)" }}
              animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ y: 40, scale: 0.96, filter: "blur(12px)" }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            >
              <button
                aria-label="Fechar cartao"
                className="icon-button close-button"
                type="button"
                onClick={() => setSelectedCard(null)}
              >
                <X size={18} />
              </button>
              <span className="chapter-kicker">Arquivo sensível</span>
              <h3>{selectedCard.title}</h3>
              <p>{selectedCard.body}</p>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MemoryArchive({ photos }: { photos: PhotoName[] }) {
  const [activeId, setActiveId] = useState(memoryCategories[0]?.id ?? "");
  const activeCategory =
    memoryCategories.find((category) => category.id === activeId) ?? memoryCategories[0];

  return (
    <section className="chapter archive-chapter">
      <div className="chapter-copy compact" data-reveal>
        <span className="chapter-kicker">Capítulo 3</span>
        <h2>Arquivo de Memórias</h2>
      </div>

      <div className="archive-console" data-reveal>
        <div className="archive-tabs" role="tablist" aria-label="Categorias de memorias">
          {memoryCategories.map((category) => (
            <button
              aria-selected={category.id === activeId}
              className="archive-tab"
              key={category.id}
              role="tab"
              type="button"
              onClick={() => setActiveId(category.id)}
            >
              <span>{category.title}</span>
              <small>{category.signal}</small>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="archive-content"
            key={activeCategory.id}
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.35 }}
          >
            {activeCategory.entries.map((entry) => {
              const photo = photos[entry.photoIndex % Math.max(photos.length, 1)];

              return (
                <article className="memory-entry" key={entry.title}>
                  {photo && (
                    <img
                      alt={entry.title}
                      decoding="async"
                      loading="lazy"
                      src={photoUrl(photo)}
                    />
                  )}
                  <div>
                    <span>{activeCategory.signal}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.body}</p>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SpotifyEmbed({ track }: { track: CharacterTrack }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [apiFailed, setApiFailed] = useState(false);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const pauseSiteAudio = useCallback(() => {
    clearResumeTimer();
    pauseAmbientAudio();
  }, [clearResumeTimer]);

  const scheduleSiteAudioResume = useCallback(
    (delay = 700) => {
      clearResumeTimer();
      resumeTimerRef.current = window.setTimeout(() => {
        resumeAmbientAudio();
        resumeTimerRef.current = null;
      }, delay);
    },
    [clearResumeTimer]
  );

  useEffect(() => {
    const host = hostRef.current;
    let disposed = false;

    if (!host) {
      return;
    }

    loadSpotifyIframeApi()
      .then((api) => {
        if (disposed) {
          return;
        }

        api.createController(
          host,
          {
            height: 152,
            theme: "dark",
            uri: track.uri,
            width: "100%"
          },
          (controller) => {
            if (disposed) {
              controller.destroy();
              return;
            }

            controllerRef.current = controller;
            controller.addListener("playback_started", pauseSiteAudio);
            controller.addListener("playback_update", (event) => {
              const state = event.data;

              if (!state) {
                return;
              }

              const almostFinished =
                state.duration > 0 && state.position >= state.duration - 900;

              if (!state.isPaused) {
                pauseSiteAudio();
                return;
              }

              if (!state.isBuffering || almostFinished) {
                scheduleSiteAudioResume(almostFinished ? 1100 : 650);
              }
            });
          }
        );
      })
      .catch(() => setApiFailed(true));

    return () => {
      disposed = true;
      clearResumeTimer();
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, [clearResumeTimer, pauseSiteAudio, scheduleSiteAudioResume, track.uri]);

  if (apiFailed) {
    return (
      <iframe
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        src={track.embed}
        title={`${track.artist} no Spotify`}
      />
    );
  }

  return (
    <div
      aria-label={`${track.artist} no Spotify`}
      className="spotify-embed-host"
      ref={hostRef}
    />
  );
}

function CharacterMusicChapter() {
  return (
    <section className="chapter music-chapter">
      <div className="music-panel music-universe-panel" data-reveal>
        <div className="chapter-copy compact">
          <span className="chapter-kicker">Capítulo 4</span>
          <h2>Dois sinais no mesmo universo</h2>
        </div>

        <div className="character-music-grid">
          {characterTracks.map((track, index) => (
            <motion.article
              className="character-music-card"
              key={track.id}
              initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.16, duration: 0.72 }}
            >
              <div className="character-portrait">
                <img alt={track.name} decoding="async" loading="lazy" src={photoUrl(track.image)} />
                <span>{track.name}</span>
              </div>
              <div className="spotify-widget-shell">
                <div className="spotify-widget-header">
                  <Sparkles size={16} aria-hidden="true" />
                  <div>
                    <span>{track.artist}</span>
                    <strong>{track.track}</strong>
                    <small>{track.note}</small>
                  </div>
                </div>
                <SpotifyEmbed track={track} />
                <a
                  href={track.link}
                  onClick={pauseAmbientAudio}
                  rel="noreferrer"
                  target="_blank"
                >
                  Abrir no Spotify
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MultiverseChoiceChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasReady = useInView(sectionRef, {
    margin: "700px 0px 700px 0px"
  });
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<"left" | "right" | null>(null);
  const [finished, setFinished] = useState(false);
  const activeChoice = multiverseChoices[step];
  const progress = finished
    ? 100
    : ((step + (selected ? 0.68 : 0.12)) / multiverseChoices.length) * 100;

  useEffect(() => {
    if (!selected || finished) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (step >= multiverseChoices.length - 1) {
        setFinished(true);
        return;
      }

      setStep((value) => value + 1);
      setSelected(null);
    }, 4300);

    return () => window.clearTimeout(timer);
  }, [finished, selected, step]);

  const selectChoice = (choice: "left" | "right") => {
    if (selected || finished) {
      return;
    }

    setSelected(choice);
  };

  return (
    <section className="multiverse-section" ref={sectionRef}>
      <div className="multiverse-canvas" data-testid="multiverse-canvas">
        {canvasReady && (
          <Canvas
            camera={{ position: [0, 0, 10.5], fov: 58 }}
            dpr={[1, 1.35]}
            gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
          >
            <MultiverseScene finished={finished} selected={selected} step={step} />
          </Canvas>
        )}
      </div>

      <div className="multiverse-interface" data-reveal>
        <span className="chapter-kicker">Capítulo 5</span>
        <h2>O Multiverso das Escolhas</h2>

        <div className="multiverse-progress" aria-hidden="true">
          <motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              className="choice-console"
              key={activeChoice.prompt}
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
              transition={{ duration: 0.45 }}
            >
              <span className="choice-index">
                SIMULAÇÃO {formatTwo(step + 1)}/{formatTwo(multiverseChoices.length)}
              </span>
              <h3>{activeChoice.prompt}</h3>
              <div className="choice-grid">
                <button
                  className={selected === "left" ? "selected" : ""}
                  disabled={Boolean(selected)}
                  onClick={() => selectChoice("left")}
                  type="button"
                >
                  <small>Universo A</small>
                  <span>{activeChoice.left}</span>
                </button>
                <button
                  className={selected === "right" ? "selected" : ""}
                  disabled={Boolean(selected)}
                  onClick={() => selectChoice("right")}
                  type="button"
                >
                  <small>Universo B</small>
                  <span>{activeChoice.right}</span>
                </button>
              </div>

              <AnimatePresence>
                {selected && (
                  <motion.p
                    className="choice-consequence"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42 }}
                  >
                    {activeChoice.consequence}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="multiverse-result"
              key="result"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <span className="result-pair">Brenda + Eu</span>
              <small>Resultado da análise:</small>
              <p>
                Em 100% das simulações, a gente acaba encontrando o caminho um
                para o outro.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MultiverseScene({
  finished,
  selected,
  step
}: {
  finished: boolean;
  selected: "left" | "right" | null;
  step: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const resetAt = useRef(0);
  const lastFrameAt = useRef(0);

  const particleData = useMemo(() => {
    const count = multiverseParticleCount;
    const origins = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const angle = seededRandom(index + 12) * Math.PI * 2;
      const ring = 2.8 + seededRandom(index + 31) * 8.8;
      const lane = (index % 7) - 3;

      origins[index * 3] = Math.cos(angle) * ring + lane * 0.34;
      origins[index * 3 + 1] = (seededRandom(index + 44) - 0.5) * 7.6;
      origins[index * 3 + 2] = Math.sin(angle) * ring + (seededRandom(index + 76) - 0.5) * 3.8;

      targets[index * 3] = (seededRandom(index + 93) - 0.5) * 0.38;
      targets[index * 3 + 1] = (seededRandom(index + 129) - 0.5) * 0.2;
      targets[index * 3 + 2] = (seededRandom(index + 157) - 0.5) * 0.38;
    }

    const positions = new Float32Array(origins);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { count, geometry, origins, targets };
  }, []);

  const lineGeometry = useMemo(() => {
    const lineCount = multiverseLineCount;
    const positions = new Float32Array(lineCount * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry, lineCount };
  }, []);

  useEffect(() => {
    resetAt.current = performance.now();
  }, [finished, selected, step]);

  useFrame(({ clock }) => {
    if (clock.elapsedTime - lastFrameAt.current < 1 / 30) {
      return;
    }

    lastFrameAt.current = clock.elapsedTime;
    const elapsed = (performance.now() - resetAt.current) / 1000;
    const convergence = finished
      ? Math.min(1, elapsed / 4)
      : selected
        ? 0.34 + Math.sin(clock.elapsedTime * 5) * 0.04
        : 0.08 + step * 0.045;
    const positions = particleData.geometry.attributes.position.array as Float32Array;

    for (let index = 0; index < particleData.count; index += 1) {
      const offset = index * 3;
      const wave = Math.sin(clock.elapsedTime * 1.8 + index * 0.015) * 0.16;
      const drift = Math.cos(clock.elapsedTime * 1.1 + index * 0.011) * 0.12;

      positions[offset] =
        particleData.origins[offset] * (1 - convergence) +
        particleData.targets[offset] * convergence +
        wave * (finished ? 0.08 : 1);
      positions[offset + 1] =
        particleData.origins[offset + 1] * (1 - convergence) +
        particleData.targets[offset + 1] * convergence +
        drift * (finished ? 0.05 : 1);
      positions[offset + 2] =
        particleData.origins[offset + 2] * (1 - convergence) +
        particleData.targets[offset + 2] * convergence;
    }

    particleData.geometry.attributes.position.needsUpdate = true;

    const linePositions = lineGeometry.geometry.attributes.position.array as Float32Array;
    for (let index = 0; index < lineGeometry.lineCount; index += 1) {
      const particleIndex = (index * 5) % particleData.count;
      const source = particleIndex * 3;
      const offset = index * 6;
      linePositions[offset] = positions[source];
      linePositions[offset + 1] = positions[source + 1];
      linePositions[offset + 2] = positions[source + 2];
      linePositions[offset + 3] = particleData.targets[source] * (0.2 + convergence);
      linePositions[offset + 4] = particleData.targets[source + 1] * (0.2 + convergence);
      linePositions[offset + 5] = particleData.targets[source + 2] * (0.2 + convergence);
    }

    lineGeometry.geometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.045;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.07;
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(finished ? 1.1 + Math.sin(clock.elapsedTime * 3) * 0.08 : 0.08);
    }
  });

  return (
    <>
      <color attach="background" args={["#030205"]} />
      <fog attach="fog" args={["#030205", 8, 24]} />
      <ambientLight intensity={0.65} />
      <pointLight color="#f4a7be" intensity={2.4} position={[2, 3, 5]} />
      <pointLight color="#8bd9dd" intensity={1.5} position={[-4, -2, 5]} />
      <group ref={groupRef}>
        <points ref={pointsRef}>
          <primitive object={particleData.geometry} attach="geometry" />
          <pointsMaterial
            color={finished ? "#fff3c4" : selected ? "#f4a7be" : "#8bd9dd"}
            size={finished ? 0.038 : 0.028}
            sizeAttenuation
            transparent
            opacity={finished ? 0.96 : 0.72}
            depthWrite={false}
          />
        </points>
        <lineSegments ref={linesRef}>
          <primitive object={lineGeometry.geometry} attach="geometry" />
          <lineBasicMaterial
            color={finished ? "#f2d8a7" : "#f4a7be"}
            transparent
            opacity={finished ? 0.46 : selected ? 0.24 : 0.14}
          />
        </lineSegments>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.42, 20, 20]} />
          <meshStandardMaterial
            color="#fff3c4"
            emissive="#f4a7be"
            emissiveIntensity={finished ? 2.8 : 0}
            roughness={0.18}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
}

function FutureTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.88], [0.05, 1]);
  const depth = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section className="chapter future-chapter" ref={ref}>
      <motion.div className="future-depth" style={{ y: depth }} aria-hidden="true" />
      <div className="chapter-copy compact" data-reveal>
        <span className="chapter-kicker">Capítulo 6</span>
        <h2>O Nosso Futuro</h2>
      </div>

      <div className="timeline">
        <motion.div className="timeline-line" style={{ scaleY: lineScale }} />
        {futureMoments.map((moment, index) => (
          <motion.article
            className="timeline-item"
            key={moment.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, delay: index * 0.08 }}
          >
            <span>{formatTwo(index + 1)}</span>
            <h3>{moment.title}</h3>
            <p>{moment.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function FinalChapter({ photos }: { photos: PhotoName[] }) {
  const lines = [
    "Se eu pudesse viver infinitos universos...",
    "Eu ainda escolheria você.",
    "De novo.",
    "E de novo.",
    "E de novo."
  ];

  return (
    <section className="final-chapter">
      <div className="final-lines" data-reveal>
        {lines.map((line, index) => (
          <motion.p
            key={`${line}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.8, delay: index * 0.42 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <Countdown />
      <PhotoWall photos={photos} />

      <div className="closing-message" data-reveal>
        <Heart className="closing-heart" size={21} aria-hidden="true" />
        <p>
          Brenda,
          <br />
          não importa quantos universos existam,
          <br />
          eu sempre encontraria o caminho de volta até você.
          <br />
          Feliz Dia dos Namorados.
          <br />
          Com amor,
          <br />
          Eu, Filipe, seu namorado e futuro esposo.
        </p>
      </div>

      <HeartConstellation />
    </section>
  );
}

function Countdown() {
  const [time, setTime] = useState<CountdownValue>(() => calculateCountdown());

  useEffect(() => {
    const interval = window.setInterval(() => setTime(calculateCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const values = [
    ["anos", time.years],
    ["meses", time.months],
    ["dias", time.days],
    ["horas", time.hours],
    ["minutos", time.minutes],
    ["segundos", time.seconds]
  ] as const;

  return (
    <div className="countdown-block" data-reveal>
      <span className="anniversary-date">09 de Outubro de 2025</span>
      <div className="countdown-grid">
        {values.map(([label, value]) => (
          <div className="countdown-cell" key={label}>
            <strong>{formatTwo(value)}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoWall({ photos }: { photos: PhotoName[] }) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="photo-wall" data-reveal>
      <div className="photo-wall-space">
        {photos.map((photo, index) => {
          const rotate = -13 + (index % 7) * 4;
          const z = (index % 5) * 18;

          return (
            <motion.figure
              className="polaroid"
              key={photo}
              initial={{ opacity: 0, y: 60, rotateZ: rotate - 8 }}
              whileInView={{ opacity: 1, y: 0, rotateZ: rotate }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: (index % 6) * 0.08 }}
              style={
                {
                  "--photo-z": `${z}px`,
                  "--photo-drift": `${(index % 2 === 0 ? -1 : 1) * (8 + index)}px`
                } as CSSProperties
              }
            >
              <img
                alt={`Memória de Brenda e eu ${index + 1}`}
                decoding="async"
                loading="lazy"
                src={photoUrl(photo)}
              />
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}

function HeartConstellation() {
  const points = useMemo(
    () =>
      Array.from({ length: 92 }, (_, index) => {
        const t = (index / 92) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        return {
          x: 50 + x * 2.35 + (seededRandom(index + 2) - 0.5) * 2,
          y: 50 - y * 2.25 + (seededRandom(index + 8) - 0.5) * 2,
          delay: seededRandom(index + 21) * 1.7,
          size: 2 + seededRandom(index + 31) * 3
        };
      }),
    []
  );

  return (
    <div className="heart-constellation" aria-hidden="true" data-reveal>
      {points.map((point, index) => (
        <motion.span
          key={`${point.x}-${point.y}-${index}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.75] }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 5.2, delay: point.delay, times: [0, 0.22, 0.78, 1] }}
          style={
            {
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${point.size}px`,
              height: `${point.size}px`
            } as CSSProperties
          }
        />
      ))}
      <motion.div
        className="heart-final-word"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 0] }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 5, delay: 2.2 }}
      >
        Fim
      </motion.div>
    </div>
  );
}

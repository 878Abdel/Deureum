import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import deureumHero from "../assets/deureum-hero.png";
import logoFace    from "../assets/LOGO_face.png";
import logoPile    from "../assets/LOGO_pile.png";
import card1       from "../assets/card1.png";
import card2       from "../assets/card2.png";
import card3       from "../assets/card3.png";

const AnimatedBg: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number, w = 130, dir = 1;
    const run = () => {
      if (w >= 142) dir = -1;
      if (w <= 118) dir = 1;
      w += dir * 0.014;
      if (ref.current)
        ref.current.style.background =
          `radial-gradient(${w}% ${w + 15}% at 50% -8%,
            #2d0a1a 0%,
            #1f0812 22%,
            #15060d 42%,
            #0e0408 60%,
            #080204 78%,
            #040102 100%)`;
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
      className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div ref={ref} className="absolute inset-0" />
    </motion.div>
  );
};

const TypingText: React.FC = () => {
  const words = ["Dalal ak jamm","Bienvenue", "Bismillaah", "Sa Xaliss yay borom"];
  const [wi, setWi]   = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    let ms = del ? 55 : 105;
    if (!del && txt === words[wi]) ms = 2200;
    const t = setTimeout(() => {
      if (!del && txt !== words[wi])       setTxt(words[wi].slice(0, txt.length + 1));
      else if (!del && txt === words[wi])  setDel(true);
      else if (del && txt.length > 0)      setTxt(words[wi].slice(0, txt.length - 1));
      else { setDel(false); setWi(p => (p + 1) % words.length); }
    }, ms);
    return () => clearTimeout(t);
  }, [txt, del, wi]);
  return (
    <span>
      {txt}
      <span style={{ color: "#E8FF5A", animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
};

const Ticker: React.FC = () => {
  const items = ["Suivi des dépenses", "·", "Tontine Digitale", "·", "Mobile Money", "·",
    "Épargne Automatique", "·", "Analyse Prédictive", "·", "Wave & Orange Money", "·",
    "Zéro Frais Cachés", "·", "100% Sécurisé", "·"];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0",
      background: "rgba(255,255,255,0.02)" }}>
      <motion.div animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 10, fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "0.28em",
            color: item === "·" ? "#E8FF5A" : "rgba(255,255,255,0.2)",
          }}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
};

const DashboardWidget: React.FC = () => {
  const card = { bg: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20 };
  return (
    <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 28, padding: 20, boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16, padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={logoFace} style={{ width: 22, height: 22, objectFit: "contain" }} alt="" />
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }}>DEUREUM</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Dashboard","Statistiques","Transactions","Wallet"].map(l => (
            <span key={l} style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 500,
              color: l === "Dashboard" ? "#fff" : "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
              background: l === "Dashboard" ? "rgba(255,255,255,0.08)" : "transparent",
              padding: "4px 10px", borderRadius: 99 }}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: 99, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700, color: "#000", fontFamily: "'Satoshi', sans-serif" }}>MN</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 220px", gap: 12 }}>

        <div style={{ gridColumn: "1 / 3", background: "#fff", borderRadius: 20, padding: "24px 28px" }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(0,0,0,0.35)", marginBottom: 8 }}>
            Solde Total
          </p>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 28, fontWeight: 700,
            letterSpacing: "-0.04em", color: "#000", lineHeight: 1 }}>
            1 245 680 <span style={{ fontSize: 13, fontWeight: 400 }}>F CFA</span>
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <span style={{ background: "#000", color: "#fff", padding: "6px 14px", borderRadius: 99,
              fontSize: 8, fontWeight: 600, fontFamily: "'Satoshi', sans-serif", letterSpacing: "0.08em" }}>
              Transférer
            </span>
            <span style={{ background: "transparent", color: "#000", padding: "6px 14px", borderRadius: 99,
              fontSize: 8, fontWeight: 500, fontFamily: "'Satoshi', sans-serif",
              border: "1px solid rgba(0,0,0,0.15)", letterSpacing: "0.08em" }}>
              Analyser
            </span>
          </div>
        </div>

        <div style={{ ...card, padding: "20px 22px" }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
            Revenus
          </p>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 22, fontWeight: 700,
            color: "#fff", letterSpacing: "-0.03em" }}>285k</p>
          <div style={{ marginTop: 10, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>
            <div style={{ width: "72%", height: "100%", borderRadius: 99, background: "#E8FF5A" }} />
          </div>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 600,
            color: "#E8FF5A", marginTop: 5 }}>+15.7%</p>
        </div>

        <div style={{ ...card, padding: "20px 22px" }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>
            Dépenses
          </p>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 22, fontWeight: 700,
            color: "#fff", letterSpacing: "-0.03em" }}>124k</p>
          <div style={{ marginTop: 10, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>
            <div style={{ width: "42%", height: "100%", borderRadius: 99, background: "rgba(255,255,255,0.3)" }} />
          </div>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 500,
            color: "rgba(255,255,255,0.3)", marginTop: 5 }}>-10.3%</p>
        </div>

        <div style={{ ...card, padding: "20px", gridRow: "1 / 3", display: "flex",
          flexDirection: "column", gap: 12 }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)" }}>
            Mon Wallet
          </p>
          <div style={{ position: "relative", height: 100 }}>
            {[card1, card2, card3].map((c, i) => (
              <img key={i} src={c} alt=""
                style={{ position: "absolute", width: "100%", borderRadius: 10,
                  transform: `translateY(${i * 10}px) translateX(${i * 4}px) scale(${1 - i * 0.04})`,
                  zIndex: 3 - i, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }} />
            ))}
          </div>
          <div style={{ marginTop: 4 }}>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8, color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.2em", textTransform: "uppercase" }}>Wave</p>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff",
              letterSpacing: "-0.02em", marginTop: 2 }}>245 000 F</p>
          </div>
        </div>

        <div style={{ ...card, padding: "20px 22px", gridColumn: "1 / 4" }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 8, fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>
            Flux Mensuel
          </p>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 42 }}>
            {[180, 220, 195, 310, 275, 350, 290, 285].map((v, i) => (
              <div key={i} style={{ flex: 1, borderRadius: "4px 4px 0 0",
                background: i === 5 ? "#E8FF5A" : "rgba(255,255,255,0.12)",
                height: `${(v / 350) * 100}%` }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {["J","F","M","A","M","J","J","A"].map((m, i) => (
              <span key={i} style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 7,
                color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>{m}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const FEATURES = [
  {
    num: "01",
    title: "Mobile Money Hub",
    desc: "Wave, Orange Money, Free Money — tout votre argent sénégalais en un seul tableau de bord, en temps réel.",
    tag: "Intégration locale",
    accent: false,
  },
  {
    num: "02",
    title: "Tontine Digitale",
    desc: "Gérez vos tontines familiales avec transparence totale. Rappels automatiques, suivi des tours.",
    tag: "Social Finance",
    accent: false,
  },
  {
    num: "03",
    title: "Analyse Prédictive",
    desc: "Anticipez vos dépenses grâce à l'IA. Alertes intelligentes basées sur vos habitudes.",
    tag: "Intelligence Artificielle",
    accent: true,
  },
  {
    num: "04",
    title: "Épargne Automatique",
    desc: "Définissez des règles d'épargne. Chaque transaction peut alimenter vos objectifs automatiquement.",
    tag: "Automatisation",
    accent: false,
  },
  {
    num: "05",
    title: "Sécurité Bancaire",
    desc: "Chiffrement de niveau bancaire, authentification biométrique. Votre argent, votre contrôle.",
    tag: "Sécurité maximale",
    accent: false,
  },
  {
    num: "06",
    title: "100% Mobile",
    desc: "Conçu pour fonctionner avec une connexion limitée. Pensé pour la réalité africaine.",
    tag: "Offline-ready",
    accent: false,
  },
];

const STATS = [
  { val: "1M+",  label: "Utilisateurs actifs"  },
  { val: "98%",  label: "Précision IA"          },
  { val: "30s",  label: "Pour s'inscrire"       },
  { val: "0 F",  label: "Frais cachés"          },
];

const TESTIMONIALS = [
  { name: "Aminata Diallo", role: "Entrepreneuse · Dakar",
    text: "DEUREUM a complètement changé ma relation à l'argent. Je vois tout, je contrôle tout. C'est l'outil qu'on attendait." },
  { name: "Moussa Ba",  role: "Ingénieur · Abidjan",
    text: "La tontine digitale est incroyable. Plus de conflits dans notre groupe — tout est transparent et traçable." },
  { name: "Fatou Sow",      role: "Médecin · Saint-Louis",
    text: "En 3 mois j'ai économisé 40% de plus. Les alertes m'ont fait réaliser combien de petites dépenses s'accumulent." },
  { name: "Ibrahima Fall",  role: "Commerçant · Thiès",
    text: "Simple, rapide, en français. Même ma mère s'en sert pour ses tontines. C'est la finance pour tout le monde." },
];

const PLANS = [
  {
    name: "Essentiel", price: "0", period: "pour toujours",
    features: ["Suivi revenus & dépenses", "Solde en temps réel", "5 catégories", "Rapport mensuel PDF", "1 objectif d'épargne"],
    highlight: false,
  },
  {
    name: "Pro", price: "2 500", period: "F CFA / mois",
    features: ["Tout l'Essentiel", "Wave & Orange Money", "Tontine Digitale illimitée", "Catégories illimitées", "Analyse prédictive IA", "Export CSV & PDF", "Support 24h"],
    highlight: true,
  },
  {
    name: "Famille", price: "5 000", period: "F CFA / mois",
    features: ["Tout le Pro", "Jusqu'à 6 membres", "Dashboard familial", "Tontines multi-groupes", "Conseiller virtuel", "Onboarding personnalisé"],
    highlight: false,
  },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 20, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "center",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 4,
        background: scrolled ? "rgba(5,5,5,0.88)" : "rgba(5,5,5,0.5)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 99, padding: "8px 12px",
        transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8,
          paddingRight: 16, borderRight: "1px solid rgba(255,255,255,0.08)", marginRight: 8 }}>
          <img src={logoFace} style={{ width: 26, height: 26, objectFit: "contain" }} alt="" />
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff" }}>DEUREUM</span>
        </div>

        {[["Vision","#vision"],["Fonctionnalités","#features"],["Tarifs","#pricing"],["Témoignages","#testimonials"]].map(([l,h]) => (
          <a key={l} href={h}
            style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 400,
              color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em", padding: "6px 14px",
              borderRadius: 99, transition: "color 0.15s", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >{l}</a>
        ))}

        <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
          <button onClick={() => navigate("/login")}
            style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 500,
              padding: "7px 16px", borderRadius: 99, background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)",
              cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
          >Connexion</button>
          <button onClick={() => navigate("/register")}
            style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 600,
              padding: "7px 18px", borderRadius: 99, background: "#fff", color: "#000",
              cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.02em" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#E8FF5A")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
          >Lancer l'App</button>
        </div>
      </div>
    </motion.nav>
  );
};

const Label: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 500,
    textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 20,
    color: light ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.3)" }}>
    {children}
  </p>
);

const SectionHeading: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(36px, 5vw, 60px)",
    fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.05,
    color: light ? "#000" : "#fff" }}>
    {children}
  </h2>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroScale   = useTransform(scrollYProgress, [0, 0.18], [1, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroBlurVal = useTransform(scrollYProgress, [0, 0.18], [0, 16]);

  const S: React.CSSProperties = { fontFamily: "'Satoshi', sans-serif" };

  return (
    <main style={{ ...S, background: "#030303", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { font-family: 'Satoshi', sans-serif; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <AnimatedBg />
      <Navbar />

      <section style={{ position: "relative", height: "100vh", width: "100%",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 1 }}>

        <motion.div style={{ scale: heroScale, opacity: heroOpacity,
          filter: useTransform(heroBlurVal, v => `blur(${v}px)`),
          position: "absolute", inset: 0 }}>
          <img src={deureumHero} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center 55%", opacity: 0.65 }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(3,3,3,0.2) 0%, transparent 40%, #030303 100%)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(3,3,3,0.7) 0%, transparent 30%, transparent 70%, rgba(3,3,3,0.7) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center",
          width: "100%", maxWidth: 900, padding: "0 40px" }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
            gap: 60, width: "100%", marginBottom: 0 }}>
            <motion.img src={logoFace} alt=""
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ width: 160, height: 160, objectFit: "contain",
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8))",
                display: typeof window !== "undefined" && window.innerWidth < 900 ? "none" : "block" }} />

            <div style={{ flex: 1, textAlign: "center" }}>
              <h1 style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 600,
                letterSpacing: "-0.04em", lineHeight: 1, color: "#fff",
                fontStyle: "italic" }}>
                <TypingText />
              </h1>
              <p style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.4em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 16 }}>
                Gestion Financière · Dakar & Au-delà
              </p>
            </div>

            <motion.img src={logoPile} alt=""
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ width: 160, height: 160, objectFit: "contain", opacity: 0.85,
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8))",
                display: typeof window !== "undefined" && window.innerWidth < 900 ? "none" : "block" }} />
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ display: "flex", gap: 12, marginTop: 48, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => navigate("/register")}
              style={{ background: "#fff", color: "#000", padding: "13px 28px",
                borderRadius: 99, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em",
                cursor: "pointer", transition: "all 0.2s", border: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#E8FF5A")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
            >
              Commencer gratuitement
            </button>
            <button
              style={{ background: "transparent", color: "rgba(255,255,255,0.5)", padding: "13px 28px",
                borderRadius: 99, fontSize: 12, fontWeight: 400, letterSpacing: "0.04em",
                cursor: "pointer", transition: "all 0.2s", border: "1px solid rgba(255,255,255,0.12)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            >
              Voir la démo →
            </button>
          </motion.div>
        </motion.div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 1, height: 60,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
          <span style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.8em",
            color: "rgba(255,255,255,0.15)" }}>Scroll</span>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 20 }}><Ticker /></div>

      <section id="vision" style={{ position: "relative", zIndex: 20,
        padding: "120px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <Label>Aperçu du produit</Label>
          <SectionHeading>
            Une vision claire<br />
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>de vos finances.</span>
          </SectionHeading>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", maxWidth: 480,
            margin: "20px auto 0", lineHeight: 1.7, fontWeight: 400 }}>
            Conçu pour la réalité africaine — Mobile Money, tontines, épargne — tout en un seul endroit.
          </p>
        </div>

        <div>
          <DashboardWidget />
        </div>
      </section>

      <section id="features" style={{ position: "relative", zIndex: 20, padding: "120px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <Label>Fonctionnalités</Label>
          <SectionHeading>
            Tout ce dont<br />
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>vous avez besoin.</span>
          </SectionHeading>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={i}
              style={{
                background: f.accent ? "#fff" : "rgba(255,255,255,0.03)",
                border: f.accent ? "none" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24, padding: "36px 32px",
                transition: "all 0.2s", cursor: "default",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 500,
                  color: f.accent ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.25)",
                  textTransform: "uppercase", letterSpacing: "0.2em" }}>{f.tag}</span>
                <span style={{ fontSize: 12, fontWeight: 600,
                  color: f.accent ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.2)" }}>{f.num}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em",
                color: f.accent ? "#000" : "#fff", marginBottom: 12, lineHeight: 1.2 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, fontWeight: 400,
                color: f.accent ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "60px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700,
                letterSpacing: "-0.04em", color: i === 0 ? "#E8FF5A" : "#fff", lineHeight: 1 }}>
                {s.val}
              </p>
              <p style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 10 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section style={{ background: "#fff", color: "#000",
        borderRadius: "48px 48px 0 0", padding: "120px 40px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

            <div style={{ position: "sticky", top: 100 }}>
              <Label light>Le Contexte</Label>
              <SectionHeading light>
                La finance<br />n'est plus<br />un secret.
              </SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36 }}>
                {[
                  ["75%", "des Sénégalais gèrent leurs finances via Mobile Money sans aucun outil de suivi."],
                  ["300 Mrd F", "échangés en tontines chaque année en Afrique de l'Ouest, sans traçabilité digitale."],
                  ["DEUREUM", "apporte la clarté visuelle instantanée que chaque foyer sénégalais mérite."],
                ].map(([bold, rest], i) => (
                  <p key={i} style={{ fontSize: 15, fontWeight: 400, color: "rgba(0,0,0,0.45)", lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 700, color: "#000" }}>{bold}</span> {rest}
                  </p>
                ))}
              </div>
              <button onClick={() => navigate("/register")}
                style={{ marginTop: 40, background: "#000", color: "#fff",
                  padding: "13px 28px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                  letterSpacing: "0.04em", cursor: "pointer", border: "none",
                  display: "inline-flex", alignItems: "center", gap: 8 }}>
                Rejoindre DEUREUM <ArrowUpRight size={14} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { val: "75%",  label: "Sans outil de suivi", bg: "#f5f5f5",   color: "#000" },
                { val: "+2M",  label: "Transactions/mois",   bg: "#000",       color: "#fff" },
                { val: "98%",  label: "Précision IA",        bg: "#111",       color: "#E8FF5A" },
                { val: "30s",  label: "Pour s'inscrire",     bg: "#f5f5f5",    color: "#000" },
              ].map((s, i) => (
                <div key={i}
                  style={{ background: s.bg, borderRadius: 20, padding: "36px 28px", textAlign: "center" }}>
                  <p style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em",
                    color: s.color, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: s.color === "#fff" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
                    marginTop: 10 }}>{s.label}</p>
                </div>
              ))}
              <div
                style={{ gridColumn: "1 / 3", background: "#000", borderRadius: 20,
                  padding: "40px 36px", position: "relative", overflow: "hidden", cursor: "pointer" }}
              >
                <p style={{ fontSize: 24, fontWeight: 600, color: "#fff",
                  letterSpacing: "-0.03em", lineHeight: 1.3, fontStyle: "italic" }}>
                  Zéro frais caché.<br />Zéro compromis.<br />100% pour vous.
                </p>
                <ArrowUpRight style={{ position: "absolute", right: 28, bottom: 28,
                  color: "rgba(255,255,255,0.2)" }} size={36} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" style={{ position: "relative", zIndex: 20, background: "#fff", padding: "80px 40px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60 }}>
            <div>
              <Label light>Témoignages</Label>
              <SectionHeading light>
                Ils ont repris<br />
                <span style={{ color: "rgba(0,0,0,0.25)", fontStyle: "italic" }}>le contrôle.</span>
              </SectionHeading>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                style={{ background: "#f8f8f8", borderRadius: 20, padding: "36px 32px" }}>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(0,0,0,0.55)",
                  fontWeight: 400, marginBottom: 28 }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 99, background: "#000",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: "#fff" }}>
                    {t.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{t.name}</p>
                    <p style={{ fontSize: 10, color: "rgba(0,0,0,0.35)", fontWeight: 400 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ position: "relative", zIndex: 20, background: "#fff", padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64,
            borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 80 }}>
            <Label light>Tarifs</Label>
            <SectionHeading light>
              Simple.{" "}
              <span style={{ color: "rgba(0,0,0,0.25)", fontStyle: "italic" }}>Transparent.</span>
            </SectionHeading>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {PLANS.map((plan, i) => (
              <div key={i}
                style={{
                  background: plan.highlight ? "#000" : "#f8f8f8",
                  borderRadius: 24, padding: "40px 32px",
                  position: "relative", overflow: "hidden",
                }}>
                {plan.highlight && (
                  <span style={{ position: "absolute", top: 20, right: 20,
                    background: "#E8FF5A", color: "#000", fontSize: 8, fontWeight: 700,
                    padding: "4px 12px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Populaire
                  </span>
                )}
                <p style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.25em",
                  color: plan.highlight ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", marginBottom: 20 }}>
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em",
                    color: plan.highlight ? "#fff" : "#000", lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 400,
                    color: plan.highlight ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)" }}>
                    F CFA
                  </span>
                </div>
                <p style={{ fontSize: 10, color: plan.highlight ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)",
                  marginBottom: 32, fontWeight: 400 }}>{plan.period}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {plan.features.map(feat => (
                    <div key={feat} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: 99, flexShrink: 0,
                        background: plan.highlight ? "#E8FF5A" : "#000" }} />
                      <span style={{ fontSize: 12, fontWeight: 400,
                        color: plan.highlight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate("/register")}
                  style={{
                    width: "100%", padding: "12px 0", borderRadius: 99,
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer",
                    background: plan.highlight ? "#fff" : "#000",
                    color: plan.highlight ? "#000" : "#fff",
                    border: "none", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (plan.highlight) (e.currentTarget as HTMLElement).style.background = "#E8FF5A"; }}
                  onMouseLeave={e => { if (plan.highlight) (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                >
                  {plan.price === "0" ? "Commencer gratuitement" : "Essayer 30 jours"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 20, background: "#030303", padding: "140px 40px", textAlign: "center",
        overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,255,90,0.04) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <img src={logoFace} alt="" style={{ width: 56, height: 56, objectFit: "contain",
            margin: "0 auto 32px", opacity: 0.3, display: "block" }} />
          <h2 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, letterSpacing: "-0.05em",
            color: "#fff", lineHeight: 1, marginBottom: 20 }}>
            Prenez le<br />
            <span style={{ color: "#E8FF5A" }}>contrôle.</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 40,
            lineHeight: 1.7, fontWeight: 400 }}>
            Rejoignez des milliers d'utilisateurs au Sénégal et en Afrique de l'Ouest<br />
            qui ont transformé leur rapport à l'argent.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/register")}
              style={{ background: "#fff", color: "#000", padding: "14px 32px",
                borderRadius: 99, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                cursor: "pointer", border: "none", transition: "all 0.15s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#E8FF5A")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
            >
              Créer mon compte — Gratuit
            </button>
            <button onClick={() => navigate("/login")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.35)", padding: "14px 32px",
                borderRadius: 99, fontSize: 13, fontWeight: 400, cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.15s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
            >
              J'ai déjà un compte
            </button>
          </div>
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 20, background: "#030303", padding: "32px 40px 48px",
        borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logoFace} alt="" style={{ width: 24, height: 24, objectFit: "contain", opacity: 0.3 }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>DEUREUM</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["Confidentialité","CGU","Contact","FAQ"].map(l => (
              <a key={l} href="#" style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={logoPile} alt="" style={{ width: 18, height: 18, objectFit: "contain",
              opacity: 0.15, filter: "grayscale(1)" }} />
            <span style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
              Made in Dakar 🇸🇳
            </span>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: 36, fontSize: 8, fontWeight: 400,
          letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.1)" }}>
          © 2025 DEUREUM — Conçu pour le futur du Sénégal
        </p>
      </footer>
    </main>
  );
}

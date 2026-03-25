import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, Plus, ChevronRight, MoreHorizontal,
  ArrowUpRight, ArrowDownLeft, Search, Bell,
  TrendingUp, TrendingDown, Filter, Download,
} from "lucide-react";

import logoFace    from "../assets/LOGO_face.png";
import card1       from "../assets/card1.png";
import card2       from "../assets/card2.png";
import card3       from "../assets/card3.png";
import dashboardBg from "../assets/bg.png";

import iconWallet   from "../icons/wallet.png";
import iconCard     from "../icons/card.png";
import iconCoins    from "../icons/coins.png";
import iconBills    from "../icons/bills.png";
import iconBank     from "../icons/bank.png";
import iconMoneybag from "../icons/moneybag.png";
import iconSavings  from "../icons/savings.png";
import iconBills2   from "../icons/bills2.png";
import iconDiamond  from "../icons/diamond.png";
import iconGold     from "../icons/gold.png";

const couleurs = {
  primary:   "#E8EDF2",
  secondary: "rgba(220,228,238,0.85)",
  muted:     "rgba(190,205,220,0.65)",
  soft:      "rgba(160,180,200,0.45)",
  accent:    "#E8FF5A",
  card:      "rgba(30,45,65,0.45)",
  cardHover: "rgba(40,60,85,0.55)",
  border:    "rgba(140,170,210,0.18)",
  borderHi:  "rgba(180,210,240,0.28)",
  radius:    20,
  blur:      "blur(18px)",
  shadow:    "0 8px 32px rgba(0,10,30,0.45), 0 1px 0 rgba(255,255,255,0.08) inset",
  shadowLg:  "0 20px 60px rgba(0,10,30,0.6), 0 1px 0 rgba(255,255,255,0.1) inset",
};

const styleCartte = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: couleurs.card,
  backdropFilter: couleurs.blur,
  WebkitBackdropFilter: couleurs.blur,
  border: `1px solid ${couleurs.border}`,
  borderRadius: couleurs.radius,
  padding: 24,
  boxShadow: couleurs.shadow,
  ...extra,
});

const etiquette = (light?: boolean): React.CSSProperties => ({
  fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const,
  letterSpacing: "0.28em",
  color: light ? "rgba(20,40,70,0.5)" : couleurs.muted,
  marginBottom: 10,
});

const donneesRevenu = [
  { m:"Jan", r:180, d:95,  e:85  },
  { m:"Fév", r:220, d:130, e:90  },
  { m:"Mar", r:195, d:110, e:85  },
  { m:"Avr", r:310, d:145, e:165 },
  { m:"Mai", r:275, d:120, e:155 },
  { m:"Jun", r:350, d:160, e:190 },
  { m:"Jul", r:290, d:140, e:150 },
  { m:"Aoû", r:285, d:124, e:161 },
];

const donneesSemaine = [
  { j:"Lun", v:45, d:30 },{ j:"Mar", v:12, d:8 },{ j:"Mer", v:78, d:45 },
  { j:"Jeu", v:23, d:15 },{ j:"Ven", v:91, d:60 },{ j:"Sam", v:34, d:22 },{ j:"Dim", v:18, d:10 },
];

const donneesBeignet = [
  { name:"Alimentation", value:30, color:"#E8FF5A" },
  { name:"Logement",     value:25, color:"#fff"    },
  { name:"Transport",    value:15, color:"#888"    },
  { name:"Santé",        value:10, color:"#aaa"    },
  { name:"Loisirs",      value:10, color:"#555"    },
  { name:"Autres",       value:10, color:"#333"    },
];

const croissanceEpargne = [
  { m:"Jan", s:50 },{ m:"Fév", s:85 },{ m:"Mar", s:102 },
  { m:"Avr", s:140 },{ m:"Mai", s:168 },{ m:"Jun", s:210 },
  { m:"Jul", s:245 },{ m:"Aoû", s:306 },
];

const donneesTontine = [
  { name:"Famille Ndiaye", total:500, collected:350, members:8,  next:"05 Avr" },
  { name:"Amis Dakar",     total:300, collected:210, members:6,  next:"12 Avr" },
  { name:"Collègues",      total:200, collected:200, members:5,  next:"Terminé" },
];

const toutesLesTransac = [
  { id:1,  label:"Salaire Mensuel",       sub:"Virement employeur",    amount:+350000, type:"credit", date:"21 Mar 2026", cat:"Revenus",      icon:iconGold     },
  { id:2,  label:"Wave Transfer reçu",    sub:"De Aminata Diallo",     amount:+45000,  type:"credit", date:"21 Mar 2026", cat:"Transferts",   icon:iconCoins    },
  { id:3,  label:"Loyer Mensuel",         sub:"Virement automatique",  amount:-150000, type:"debit",  date:"20 Mar 2026", cat:"Logement",     icon:iconBank     },
  { id:4,  label:"Freelance Design",      sub:"Client Dakar Digital",  amount:+85000,  type:"credit", date:"20 Mar 2026", cat:"Revenus",      icon:iconMoneybag },
  { id:5,  label:"Marché Sandaga",        sub:"Alimentation",          amount:-12500,  type:"debit",  date:"21 Mar 2026", cat:"Alimentaton",  icon:iconBills    },
  { id:6,  label:"Orange Money",          sub:"Envoi famille",         amount:-20000,  type:"debit",  date:"19 Mar 2026", cat:"Transferts",   icon:iconBills2   },
  { id:7,  label:"SENELEC",              sub:"Facture électricité",    amount:-28000,  type:"debit",  date:"18 Mar 2026", cat:"Factures",     icon:iconBank     },
  { id:8,  label:"Tontine Famille",       sub:"Cotisation mensuelle",  amount:-50000,  type:"debit",  date:"17 Mar 2026", cat:"Tontines",     icon:iconSavings  },
  { id:9,  label:"Épargne auto",          sub:"Objectif Marrakech",    amount:-48000,  type:"debit",  date:"16 Mar 2026", cat:"Épargne",      icon:iconDiamond  },
  { id:10, label:"Freelance Dev",         sub:"Client Abidjan",        amount:+120000, type:"credit", date:"15 Mar 2026", cat:"Revenus",      icon:iconGold     },
];

const objectifs = [
  { title:"Voyage Marrakech", current:306, target:450, color:"#E8FF5A", icon:iconSavings, deadline:"Juin 2026"  },
  { title:"Fonds d'urgence",  current:180, target:500, color:"#fff",    icon:iconDiamond, deadline:"Déc 2026"   },
  { title:"Nouvelle voiture", current:750, target:2500,color:"#888",    icon:iconMoneybag,deadline:"Déc 2027"   },
];

const CARTES = [
  { id:1, img:card1, label:"Wave",         number:"4352", balance:"245 000 F" },
  { id:2, img:card2, label:"Orange Money", number:"8821", balance:"89 500 F"  },
  { id:3, img:card3, label:"Free Money",   number:"1107", balance:"34 200 F"  },
];

const NAVIGATION = [
  { id:"dashboard",    label:"Dashboard",    icon:iconWallet   },
  { id:"stats",        label:"Statistiques", icon:iconCoins    },
  { id:"transactions", label:"Transactions", icon:iconBills    },
  { id:"wallet",       label:"Wallet",       icon:iconCard     },
  { id:"objectifs",    label:"Objectifs",    icon:iconSavings  },
  { id:"tontines",     label:"Tontines",     icon:iconMoneybag },
];

const BulleInfo = ({ active, payload, label: lbl }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"rgba(5,5,5,0.96)", border:`1px solid ${couleurs.border}`,
      borderRadius:12, padding:"10px 14px" }}>
      <p style={{ fontSize:9, color:couleurs.muted, fontWeight:600, textTransform:"uppercase",
        letterSpacing:"0.2em", marginBottom:6 }}>{lbl}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ fontSize:12, fontWeight:700, color:p.color || couleurs.accent }}>
          {p.name}: {p.value?.toLocaleString()} {p.unit || "k F"}
        </p>
      ))}
    </div>
  );
};

const BarreNavigation: React.FC<{ actif:string; setActif:(s:string)=>void }> = ({ actif, setActif }) => {
  const [ouvert, setOuvert] = useState(true);
  const navigate = useNavigate();
  return (
    <motion.aside animate={{ width: ouvert ? 200 : 60 }}
      transition={{ type:"spring", stiffness:280, damping:28 }}
      className="relative flex flex-col flex-shrink-0 h-full"
      style={{
        background: "rgba(15,28,50,0.55)",
        backdropFilter: couleurs.blur,
        WebkitBackdropFilter: couleurs.blur,
        borderRight: `1px solid ${couleurs.border}`,
        boxShadow: "2px 0 24px rgba(0,10,30,0.3)",
      }}>
      <div className="flex items-center gap-3 px-4 pt-7 pb-8">
        <img src={logoFace} style={{ width:28, height:28, objectFit:"contain", flexShrink:0 }} alt="" />
        <AnimatePresence>{ouvert && (
          <motion.span initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
            style={{ fontWeight:700, fontSize:13, letterSpacing:"0.18em",
              textTransform:"uppercase", color:couleurs.primary }}>DEUREUM</motion.span>
        )}</AnimatePresence>
      </div>
      <nav className="flex-1 flex flex-col gap-0.5 px-2">
        {NAVIGATION.map(item => {
          const estActif = actif === item.id;
          return (
            <button key={item.id} onClick={() => setActif(item.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left relative transition-all"
              style={{ background: estActif ? "rgba(140,180,230,0.18)" : "transparent",
                backdropFilter: estActif ? "blur(8px)" : "none",
                borderRadius: 12, border: estActif ? `1px solid ${couleurs.border}` : "1px solid transparent" }}>
              <img src={item.icon} alt="" style={{ width:16, height:16, flexShrink:0,
                filter:"invert(1)", opacity: estActif ? 0.9 : 0.25 }} />
              <AnimatePresence>{ouvert && (
                <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  style={{ fontSize:12, fontWeight: estActif ? 600 : 400,
                    color: estActif ? couleurs.primary : couleurs.muted, letterSpacing:"0.02em", whiteSpace:"nowrap" }}>
                  {item.label}
                </motion.span>
              )}</AnimatePresence>
              {estActif && <motion.div layoutId="dot" style={{ position:"absolute", right:10,
                width:3, height:16, borderRadius:99, background:"#fff" }} />}
            </button>
          );
        })}
      </nav>
      <div className="px-2 pb-6 pt-4" style={{ borderTop:`1px solid rgba(255,255,255,0.05)` }}>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all"
          style={{ color:couleurs.soft }}
          onMouseEnter={e => (e.currentTarget.style.color = couleurs.secondary)}
          onMouseLeave={e => (e.currentTarget.style.color = couleurs.soft)}>
          <img src={iconBank} alt="" style={{ width:16, height:16, filter:"invert(1)", opacity:0.2, flexShrink:0 }} />
          {ouvert && <span style={{ fontSize:12, fontWeight:400 }}>Déconnexion</span>}
        </button>
      </div>
      <button onClick={() => setOuvert(!ouvert)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full flex items-center justify-center z-10"
        style={{ background:"#fff", boxShadow:"0 2px 12px rgba(0,0,0,0.5)" }}>
        <motion.div animate={{ rotate: ouvert ? 0 : 180 }}><ChevronRight size={11} color="#000" /></motion.div>
      </button>
    </motion.aside>
  );
};

const SectionPortfeuille: React.FC = () => {
  const [actif, setActif] = useState(0);
  const [afficher, setAfficher]     = useState(true);

  const cartePrecedente = () => setActif(i => (i - 1 + CARTES.length) % CARTES.length);
  const carteSuivante = () => setActif(i => (i + 1) % CARTES.length);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontSize:10, fontWeight:500, color:couleurs.soft, textTransform:"uppercase", letterSpacing:"0.25em" }}>Mon Wallet</p>
          <p style={{ fontSize:16, fontWeight:600, color:couleurs.primary, marginTop:2 }}>
            {afficher ? "369 700 F CFA" : "••••••• F"}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setAfficher(!afficher)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background:"rgba(30,55,90,0.55)", backdropFilter:"blur(8px)",
              WebkitBackdropFilter:"blur(8px)", border:`1px solid ${couleurs.border}` }}>
            {afficher ? <Eye size={13} color={couleurs.muted}/> : <EyeOff size={13} color={couleurs.muted}/>}
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background:"rgba(232,255,90,0.9)" }}>
            <Plus size={13} color="#000" />
          </button>
        </div>
      </div>

      <div style={{ position:"relative" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={actif}
            src={CARTES[actif].img}
            alt={CARTES[actif].label}
            initial={{ opacity:0, x: 40 }}
            animate={{ opacity:1, x: 0 }}
            exit={{ opacity:0, x: -40 }}
            transition={{ duration:0.25, ease:"easeOut" }}
            style={{ width:"100%", height:"auto", borderRadius:16,
              display:"block", boxShadow:"0 16px 48px rgba(0,0,0,0.65)" }}
          />
        </AnimatePresence>

        <button onClick={cartePrecedente}
          style={{
            position:"absolute", left:-10, top:"50%", transform:"translateY(-50%)",
            width:28, height:28, borderRadius:99,
            background:"rgba(20,40,70,0.7)", backdropFilter:"blur(12px)",
            WebkitBackdropFilter:"blur(12px)",
            border:`1px solid ${couleurs.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", zIndex:10,
            boxShadow:"0 4px 12px rgba(0,0,0,0.4)",
          }}>
          <ChevronRight size={13} color={couleurs.primary} style={{ transform:"rotate(180deg)" }}/>
        </button>

        <button onClick={carteSuivante}
          style={{
            position:"absolute", right:-10, top:"50%", transform:"translateY(-50%)",
            width:28, height:28, borderRadius:99,
            background:"rgba(20,40,70,0.7)", backdropFilter:"blur(12px)",
            WebkitBackdropFilter:"blur(12px)",
            border:`1px solid ${couleurs.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", zIndex:10,
            boxShadow:"0 4px 12px rgba(0,0,0,0.4)",
          }}>
          <ChevronRight size={13} color={couleurs.primary}/>
        </button>
      </div>

      <div style={{ display:"flex", gap:8 }}>
        {CARTES.map((c,i) => (
          <button key={i} onClick={() => setActif(i)}
            style={{
              flex:1, padding:0, border:"none", background:"none",
              cursor:"pointer", borderRadius:10, overflow:"hidden",
              opacity: actif===i ? 1 : 0.45,
              outline: actif===i ? `2px solid ${couleurs.accent}` : "2px solid transparent",
              outlineOffset:2,
              transition:"all 0.2s",
              boxShadow: actif===i ? `0 0 12px rgba(232,255,90,0.3)` : "none",
            }}>
            <img src={c.img} alt={c.label}
              style={{ width:"100%", height:"auto", display:"block", borderRadius:8 }}/>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-1">
        <div>
          <p style={{ fontSize:9, color:couleurs.soft, textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:2 }}>
            {CARTES[actif].label}
          </p>
          <p style={{ fontSize:18, fontWeight:700, color:couleurs.primary, letterSpacing:"-0.02em" }}>
            {afficher ? CARTES[actif].balance : "•••••• F"}
          </p>
        </div>
        <p style={{ fontSize:10, color:couleurs.soft, letterSpacing:"0.15em" }}>**** {CARTES[actif].number}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label:"Envoyer",   icon:<ArrowUpRight size={14}/>,  bg:"rgba(232,255,90,0.9)",   color:"#000" },
          { label:"Recevoir",  icon:<ArrowDownLeft size={14}/>, bg:"rgba(30,55,90,0.55)",    color:couleurs.primary },
          { label:"Recharger", icon:<Plus size={14}/>,          bg:"rgba(30,55,90,0.55)",    color:couleurs.primary },
        ].map(a => (
          <button key={a.label}
            className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all hover:scale-105"
            style={{ background:a.bg, backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
              border:`1px solid ${couleurs.border}` }}>
            <span style={{ color:a.color }}>{a.icon}</span>
            <span style={{ fontSize:8, fontWeight:600, textTransform:"uppercase",
              letterSpacing:"0.12em", color:a.color, opacity:0.85 }}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};


const PageAccueil: React.FC = () => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 360px", gap:20, alignItems:"start" }}>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.04 }}
      style={{ ...styleCartte({ gridColumn:"1 / 3",
        background:"rgba(220,235,255,0.92)",
        backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
        border:"1px solid rgba(255,255,255,0.6)",
        boxShadow:"0 12px 40px rgba(0,15,40,0.35), 0 1px 0 rgba(255,255,255,0.8) inset",
      }) }}>
      <p style={etiquette(true)}>Solde total</p>
      <h2 style={{ fontSize:40, fontWeight:700, letterSpacing:"-0.04em", color:"rgba(8,20,50,0.9)", lineHeight:1 }}>
        1 245 680<span style={{ fontSize:17, fontWeight:400, marginLeft:6 }}>F CFA</span>
      </h2>
      <div className="flex items-center gap-3 mt-4">
        <span style={{ fontSize:11, color:"rgba(10,25,55,0.5)", fontWeight:500 }}>+285 000 F ce mois</span>
        <span style={{ fontSize:10, fontWeight:700, padding:"2px 10px", borderRadius:99,
          background:"rgba(10,25,55,0.85)", color:"#fff", letterSpacing:"0.1em" }}>+12.4%</span>
      </div>
      <div className="flex gap-3 mt-6">
        {["Transférer","Analyser"].map((btn,i) => (
          <button key={btn} style={{
            background: i===0 ? "rgba(10,25,50,0.85)" : "transparent",
            color: i===0 ? "#fff" : "rgba(10,25,50,0.7)",
            padding:"10px 22px", borderRadius:99, fontSize:11, fontWeight:600, letterSpacing:"0.08em",
            border: i===0 ? "none" : "1px solid rgba(10,25,50,0.25)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          }}>{btn}</button>
        ))}
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.08 }} style={styleCartte()}>
      <p style={etiquette()}>Revenus</p>
      <div className="flex items-end justify-between">
        <div>
          <p style={{ fontSize:32, fontWeight:700, letterSpacing:"-0.03em", color:couleurs.primary }}>285 k</p>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:3 }}>F CFA ce mois</p>
        </div>
        <img src={iconMoneybag} alt="" style={{ width:32, height:32, filter:"invert(1)", opacity:0.1 }} />
      </div>
      <div className="flex items-center gap-2 mt-5">
        <div style={{ width:"100%", height:3, borderRadius:99, background:"rgba(255,255,255,0.07)" }}>
          <div style={{ width:"72%", height:"100%", borderRadius:99, background:couleurs.accent }} />
        </div>
        <span style={{ fontSize:10, fontWeight:700, color:couleurs.accent, flexShrink:0 }}>+15.7%</span>
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.12 }} style={styleCartte()}>
      <p style={etiquette()}>Dépenses</p>
      <div className="flex items-end justify-between">
        <div>
          <p style={{ fontSize:32, fontWeight:700, letterSpacing:"-0.03em", color:couleurs.primary }}>124 k</p>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:3 }}>F CFA ce mois</p>
        </div>
        <img src={iconBills} alt="" style={{ width:32, height:32, filter:"invert(1)", opacity:0.1 }} />
      </div>
      <div className="flex items-center gap-2 mt-5">
        <div style={{ width:"100%", height:3, borderRadius:99, background:"rgba(255,255,255,0.07)" }}>
          <div style={{ width:"42%", height:"100%", borderRadius:99, background:"rgba(255,255,255,0.35)" }} />
        </div>
        <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.4)", flexShrink:0 }}>-10.3%</span>
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.06 }}
      style={styleCartte({ gridColumn:"4", gridRow:"1 / 4" })}>
      <SectionPortfeuille />
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.16 }}
      style={styleCartte({ gridColumn:"1 / 4" })}>
      <div className="flex items-center justify-between mb-5">
        <p style={etiquette()}>Flux financier — Revenus vs Dépenses vs Épargne</p>
        <div className="flex gap-4">
          {[{ l:"Revenus", c:couleurs.accent },{ l:"Dépenses", c:"rgba(255,255,255,0.35)" },{ l:"Épargne", c:"#60a5fa" }].map(x => (
            <div key={x.l} className="flex items-center gap-1.5">
              <div style={{ width:6, height:6, borderRadius:99, background:x.c }} />
              <span style={{ fontSize:9, color:couleurs.soft, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.15em" }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={donneesRevenu} margin={{ top:5, right:5, left:-20, bottom:0 }}>
          <defs>
            {[["gR",couleurs.accent],["gD","#fff"],["gE","#60a5fa"]].map(([id,c]) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={c as string} stopOpacity={0.22}/>
                <stop offset="95%" stopColor={c as string} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="m" tick={{ fill:"rgba(255,255,255,0.2)", fontSize:10, fontWeight:500 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:"rgba(255,255,255,0.15)", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
          <Tooltip content={<BulleInfo/>}/>
          <Area type="monotone" dataKey="r" name="Revenus"  stroke={couleurs.accent}              strokeWidth={1.5} fill="url(#gR)" dot={false}/>
          <Area type="monotone" dataKey="d" name="Dépenses" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} fill="url(#gD)" dot={false}/>
          <Area type="monotone" dataKey="e" name="Épargne"  stroke="#60a5fa"               strokeWidth={1.5} fill="url(#gE)" dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.20 }} style={styleCartte()}>
      <p style={etiquette()}>Répartition dépenses</p>
      <div className="flex items-center gap-5">
        <div style={{ position:"relative", flexShrink:0 }}>
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie data={donneesBeignet} cx={50} cy={50} innerRadius={32} outerRadius={50}
                paddingAngle={2} dataKey="value" strokeWidth={0}>
                {donneesBeignet.map((e,i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:13, fontWeight:700, color:couleurs.primary }}>124k</span>
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:7 }}>
          {donneesBeignet.map(item => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div style={{ width:5, height:5, borderRadius:99, background:item.color, flexShrink:0 }} />
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>{item.name}</span>
              </div>
              <span style={{ fontSize:10, fontWeight:600, color:couleurs.primary }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.24 }} style={styleCartte()}>
      <p style={etiquette()}>Activité cette semaine</p>
      <ResponsiveContainer width="100%" height={135}>
        <BarChart data={donneesSemaine} margin={{ top:5, right:5, left:-28, bottom:0 }} barSize={9} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
          <XAxis dataKey="j" tick={{ fill:"rgba(255,255,255,0.2)", fontSize:10 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:"rgba(255,255,255,0.15)", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
          <Tooltip content={<BulleInfo/>} cursor={{ fill:"rgba(255,255,255,0.02)" }}/>
          <Bar dataKey="v" name="Revenus" radius={[4,4,0,0]}>
            {donneesSemaine.map((_,i) => <Cell key={i} fill={i===4?couleurs.accent:"rgba(255,255,255,0.12)"}/>)}
          </Bar>
          <Bar dataKey="d" name="Dépenses" radius={[4,4,0,0]} fill="rgba(255,255,255,0.06)"/>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28 }} style={styleCartte()}>
      <div className="flex items-center justify-between mb-5">
        <p style={etiquette()}>Objectifs d'épargne</p>
        <button style={{ width:26, height:26, borderRadius:99, background:"#fff",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Plus size={12} color="#000"/>
        </button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
        {objectifs.map((obj,i) => {
          const pourcentage = Math.round((obj.current/obj.target)*100);
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src={obj.icon} alt="" style={{ width:13, height:13, filter:"invert(1)", opacity:0.3 }}/>
                  <span style={{ fontSize:12, fontWeight:500, color:couleurs.primary }}>{obj.title}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:obj.color }}>{pourcentage}%</span>
              </div>
              <div style={{ height:3, borderRadius:99, background:"rgba(255,255,255,0.07)" }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${pourcentage}%` }}
                  transition={{ duration:1.2, delay:i*0.18, ease:"easeOut" }}
                  style={{ height:"100%", borderRadius:99, background:obj.color }}/>
              </div>
              <div className="flex justify-between mt-1.5">
                <span style={{ fontSize:9, color:couleurs.soft }}>{obj.current}k / {obj.target}k F</span>
                <span style={{ fontSize:9, color:couleurs.soft }}>{obj.deadline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.32 }}
      style={styleCartte({ gridColumn:"1 / 5" })}>
      <div className="flex items-center justify-between mb-6">
        <p style={etiquette()}>Transactions récentes</p>
        <button className="flex items-center gap-1"
          style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.35)",
            letterSpacing:"0.1em", textTransform:"uppercase" }}>
          Voir tout <ChevronRight size={11}/>
        </button>
      </div>
      <div className="grid gap-4 pb-3 mb-1"
        style={{ gridTemplateColumns:"1fr 1fr 120px 120px 100px 40px",
          borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["Opération","Description","Statut","Date","Montant",""].map((h,i) => (
          <span key={i} style={{ fontSize:9, fontWeight:500, color:"rgba(255,255,255,0.2)",
            textTransform:"uppercase", letterSpacing:"0.2em" }}>{h}</span>
        ))}
      </div>
      {toutesLesTransac.slice(0,6).map((tx) => (
        <div key={tx.id} className="grid gap-4 py-3.5 group items-center transition-all rounded-xl"
          style={{ gridTemplateColumns:"1fr 1fr 120px 120px 100px 40px",
            borderBottom:"1px solid rgba(255,255,255,0.03)" }}
          onMouseEnter={e => (e.currentTarget.style.background="rgba(255,255,255,0.02)")}
          onMouseLeave={e => (e.currentTarget.style.background="transparent")}>
          <div className="flex items-center gap-3">
            <div style={{ width:34, height:34, borderRadius:10, flexShrink:0,
              background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img src={tx.icon} alt="" style={{ width:16, height:16, filter:"invert(1)", opacity:0.5 }}/>
            </div>
            <span style={{ fontSize:13, fontWeight:500, color:couleurs.primary }}>{tx.label}</span>
          </div>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>{tx.sub}</span>
          <span style={{ fontSize:9, fontWeight:600, padding:"4px 12px", borderRadius:99,
            display:"inline-block", width:"fit-content", textTransform:"uppercase", letterSpacing:"0.1em",
            background:tx.type==="credit"?"rgba(232,255,90,0.08)":"rgba(255,255,255,0.05)",
            color:tx.type==="credit"?couleurs.accent:"rgba(255,255,255,0.3)" }}>
            {tx.type==="credit"?"Reçu":"Envoyé"}
          </span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.2)" }}>{tx.date}</span>
          <span style={{ fontSize:14, fontWeight:600, letterSpacing:"-0.01em",
            color:tx.type==="credit"?couleurs.accent:"rgba(255,255,255,0.5)" }}>
            {tx.type==="credit"?"+":""}{tx.amount.toLocaleString()} F
          </span>
          <button className="opacity-0 group-hover:opacity-100 transition-all w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background:"rgba(255,255,255,0.05)" }}>
            <MoreHorizontal size={13} color="rgba(255,255,255,0.4)"/>
          </button>
        </div>
      ))}
    </motion.div>
  </div>
);

const PageStatistiques: React.FC = () => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={styleCartte({ gridColumn:"1 / 3" })}>
      <div className="flex justify-between items-center mb-5">
        <p style={etiquette()}>Évolution annuelle — 2026</p>
        <span style={{ fontSize:9, fontWeight:600, padding:"4px 12px", borderRadius:99,
          background:`rgba(232,255,90,0.15)`, backdropFilter:"blur(8px)",
          border:`1px solid rgba(232,255,90,0.3)`,
          color:couleurs.accent, textTransform:"uppercase", letterSpacing:"0.1em" }}>
          Comparatif mensuel
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={donneesRevenu} margin={{ top:5, right:5, left:-20, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
          <XAxis dataKey="m" tick={{ fill:"rgba(255,255,255,0.2)", fontSize:10 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:"rgba(255,255,255,0.15)", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
          <Tooltip content={<BulleInfo/>}/>
          <Line type="monotone" dataKey="r" name="Revenus"  stroke={couleurs.accent} strokeWidth={2}
            dot={{ fill:couleurs.accent, r:3, strokeWidth:0 }} activeDot={{ r:5 }}/>
          <Line type="monotone" dataKey="d" name="Dépenses" stroke="rgba(255,255,255,0.35)" strokeWidth={2}
            dot={{ fill:"rgba(255,255,255,0.35)", r:3, strokeWidth:0 }} activeDot={{ r:5 }}/>
          <Line type="monotone" dataKey="e" name="Épargne"  stroke="#60a5fa" strokeWidth={2}
            dot={{ fill:"#60a5fa", r:3, strokeWidth:0 }} activeDot={{ r:5 }}/>
        </LineChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} style={styleCartte()}>
      <p style={etiquette()}>Répartition détaillée des dépenses</p>
      <div className="flex items-center gap-6 mt-2">
        <div style={{ position:"relative" }}>
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={donneesBeignet} cx={75} cy={75} innerRadius={48} outerRadius={72}
                paddingAngle={3} dataKey="value" strokeWidth={0}>
                {donneesBeignet.map((e,i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip content={<BulleInfo/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ textAlign:"center" }}>
              <p style={{ fontSize:18, fontWeight:700, color:couleurs.primary }}>124k</p>
              <p style={{ fontSize:8, color:couleurs.soft, textTransform:"uppercase", letterSpacing:"0.2em" }}>F CFA</p>
            </div>
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
          {donneesBeignet.map(item => (
            <div key={item.name}>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div style={{ width:6, height:6, borderRadius:99, background:item.color }}/>
                  <span style={{ fontSize:11, color:couleurs.secondary }}>{item.name}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:couleurs.primary }}>{item.value}%</span>
              </div>
              <div style={{ height:2, borderRadius:99, background:"rgba(255,255,255,0.07)" }}>
                <div style={{ width:`${item.value*3}%`, height:"100%", borderRadius:99, background:item.color }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }} style={styleCartte()}>
      <p style={etiquette()}>Croissance de l'épargne</p>
      <div className="flex items-baseline gap-2 mb-4">
        <span style={{ fontSize:28, fontWeight:700, color:couleurs.primary, letterSpacing:"-0.03em" }}>306k F</span>
        <span style={{ fontSize:11, color:couleurs.accent, fontWeight:600 }}>+512% depuis Jan</span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={croissanceEpargne} margin={{ top:5, right:5, left:-28, bottom:0 }}>
          <defs>
            <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="m" tick={{ fill:"rgba(255,255,255,0.2)", fontSize:9 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:"rgba(255,255,255,0.15)", fontSize:8 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
          <Tooltip content={<BulleInfo/>}/>
          <Area type="monotone" dataKey="s" name="Épargne" stroke="#60a5fa" strokeWidth={2} fill="url(#gS)" dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
      style={styleCartte({ gridColumn:"1 / 3" })}>
      <p style={etiquette()}>Indicateurs clés — Mars 2026</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        {[
          { label:"Taux d'épargne",    val:"22%",    delta:"+3%",    up:true  },
          { label:"Dépenses moy/jour", val:"4 133 F", delta:"-8%",   up:false },
          { label:"Revenus passifs",   val:"85k F",   delta:"+42%",  up:true  },
          { label:"Objectifs atteints",val:"1 / 3",   delta:"33%",   up:null  },
        ].map((k,i) => (
          <div key={i} style={{ padding:"20px 18px", borderRadius:16,
            background:"rgba(30,55,90,0.4)",
            backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
            border:`1px solid ${couleurs.border}`,
            boxShadow:"0 4px 16px rgba(0,10,30,0.2)" }}>
            <p style={{ fontSize:9, color:couleurs.soft, textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:10 }}>{k.label}</p>
            <p style={{ fontSize:22, fontWeight:700, color:couleurs.primary, letterSpacing:"-0.02em" }}>{k.val}</p>
            <div className="flex items-center gap-1 mt-2">
              {k.up !== null && (k.up
                ? <TrendingUp size={11} color={couleurs.accent}/>
                : <TrendingDown size={11} color="rgba(255,255,255,0.4)"/>)}
              <span style={{ fontSize:10, fontWeight:600,
                color: k.up===true?couleurs.accent:k.up===false?"rgba(255,255,255,0.4)":couleurs.muted }}>{k.delta}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const PageTransactions: React.FC = () => {
  const [filtre, setFiltre] = useState("Tous");
  const filtres = ["Tous","Revenus","Dépenses","Transferts","Épargne","Tontines"];
  const transacFiltrees = filtre === "Tous" ? toutesLesTransac
    : toutesLesTransac.filter(tx => tx.cat === filtre || (filtre==="Dépenses" && tx.type==="debit"));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={styleCartte()}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p style={etiquette()}>Historique des transactions</p>
            <p style={{ fontSize:22, fontWeight:600, color:couleurs.primary, letterSpacing:"-0.02em" }}>
              {toutesLesTransac.length} opérations
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
              style={{ background:"rgba(30,55,90,0.45)", backdropFilter:"blur(8px)",
                WebkitBackdropFilter:"blur(8px)", border:`1px solid ${couleurs.border}`,
                fontSize:11, color:couleurs.muted }}>
              <Filter size={12}/> Filtrer
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
              style={{ background:"rgba(30,55,90,0.45)", backdropFilter:"blur(8px)",
                WebkitBackdropFilter:"blur(8px)", border:`1px solid ${couleurs.border}`,
                fontSize:11, color:couleurs.muted }}>
              <Download size={12}/> Exporter
            </button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {filtres.map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              style={{
                padding:"6px 16px", borderRadius:99, fontSize:10, fontWeight:600,
                textTransform:"uppercase", letterSpacing:"0.1em", transition:"all 0.15s",
                background: filtre===f ? "rgba(232,255,90,0.85)" : "rgba(30,55,90,0.4)",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                color: filtre===f ? "#000" : couleurs.muted,
                border:`1px solid ${filtre===f?"transparent":couleurs.border}`,
              }}>{f}</button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} style={styleCartte()}>
        <div className="grid gap-4 pb-3 mb-2"
          style={{ gridTemplateColumns:"1fr 1fr 100px 120px 110px 40px",
            borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          {["Opération","Description","Catégorie","Date","Montant",""].map((h,i) => (
            <span key={i} style={{ fontSize:9, fontWeight:500, color:"rgba(255,255,255,0.2)",
              textTransform:"uppercase", letterSpacing:"0.2em" }}>{h}</span>
          ))}
        </div>
        {transacFiltrees.map((tx,i) => (
          <motion.div key={tx.id}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.03 }}
            className="grid gap-4 py-3.5 group items-center transition-all rounded-xl"
            style={{ gridTemplateColumns:"1fr 1fr 100px 120px 110px 40px",
              borderBottom:"1px solid rgba(255,255,255,0.03)" }}
            onMouseEnter={e => (e.currentTarget.style.background="rgba(255,255,255,0.02)")}
            onMouseLeave={e => (e.currentTarget.style.background="transparent")}>
            <div className="flex items-center gap-3">
              <div style={{ width:34, height:34, borderRadius:10, flexShrink:0,
                background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <img src={tx.icon} alt="" style={{ width:16, height:16, filter:"invert(1)", opacity:0.5 }}/>
              </div>
              <span style={{ fontSize:13, fontWeight:500, color:couleurs.primary }}>{tx.label}</span>
            </div>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>{tx.sub}</span>
            <span style={{ fontSize:9, padding:"3px 10px", borderRadius:99, display:"inline-block",
              background:"rgba(255,255,255,0.05)", color:couleurs.muted, fontWeight:600,
              textTransform:"uppercase", letterSpacing:"0.08em", width:"fit-content" }}>{tx.cat}</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.2)" }}>{tx.date}</span>
            <span style={{ fontSize:14, fontWeight:600,
              color:tx.type==="credit"?couleurs.accent:"rgba(255,255,255,0.5)" }}>
              {tx.type==="credit"?"+":""}{tx.amount.toLocaleString()} F
            </span>
            <button className="opacity-0 group-hover:opacity-100 transition-all w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:"rgba(255,255,255,0.05)" }}>
              <MoreHorizontal size={13} color="rgba(255,255,255,0.4)"/>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const PagePortfeuille: React.FC = () => {
  const [actif, setActif] = useState(0);
  const [afficher, setAfficher]     = useState(true);
  const cartePrecedente = () => setActif(i => (i - 1 + CARTES.length) % CARTES.length);
  const carteSuivante = () => setActif(i => (i + 1) % CARTES.length);

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:20, alignItems:"start" }}>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={styleCartte()}>
        <div className="flex items-center justify-between mb-5">
          <p style={etiquette()}>Mes cartes</p>
          <button style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px",
            borderRadius:99, background:"rgba(232,255,90,0.85)", backdropFilter:"blur(8px)",
            WebkitBackdropFilter:"blur(8px)", fontSize:11, fontWeight:600, color:"#000" }}>
            <Plus size={12}/> Ajouter
          </button>
        </div>

        <div style={{ position:"relative", marginBottom:12 }}>
          <AnimatePresence mode="wait">
            <motion.img key={actif} src={CARTES[actif].img} alt={CARTES[actif].label}
              initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-40 }} transition={{ duration:0.25, ease:"easeOut" }}
              style={{ width:"100%", height:"auto", borderRadius:20, display:"block",
                boxShadow:"0 20px 60px rgba(0,0,0,0.7)" }}/>
          </AnimatePresence>
          <button onClick={cartePrecedente} style={{
            position:"absolute", left:-12, top:"50%", transform:"translateY(-50%)",
            width:32, height:32, borderRadius:99,
            background:"rgba(15,30,60,0.75)", backdropFilter:"blur(14px)",
            WebkitBackdropFilter:"blur(14px)", border:`1px solid ${couleurs.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", zIndex:10, boxShadow:"0 4px 14px rgba(0,0,0,0.5)" }}>
            <ChevronRight size={14} color={couleurs.primary} style={{ transform:"rotate(180deg)" }}/>
          </button>
          <button onClick={carteSuivante} style={{
            position:"absolute", right:-12, top:"50%", transform:"translateY(-50%)",
            width:32, height:32, borderRadius:99,
            background:"rgba(15,30,60,0.75)", backdropFilter:"blur(14px)",
            WebkitBackdropFilter:"blur(14px)", border:`1px solid ${couleurs.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", zIndex:10, boxShadow:"0 4px 14px rgba(0,0,0,0.5)" }}>
            <ChevronRight size={14} color={couleurs.primary}/>
          </button>
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          {CARTES.map((c,i) => (
            <button key={i} onClick={() => setActif(i)} style={{
              flex:1, padding:0, border:"none", background:"none", cursor:"pointer",
              borderRadius:10, overflow:"hidden",
              opacity: actif===i ? 1 : 0.4,
              outline: actif===i ? `2px solid ${couleurs.accent}` : "2px solid transparent",
              outlineOffset:2, transition:"all 0.2s",
              boxShadow: actif===i ? `0 0 14px rgba(232,255,90,0.35)` : "none" }}>
              <img src={c.img} alt={c.label}
                style={{ width:"100%", height:"auto", display:"block", borderRadius:8 }}/>
            </button>
          ))}
        </div>

        <div style={{ padding:"20px", borderRadius:16, background:"rgba(30,55,90,0.45)",
          backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
          border:`1px solid ${couleurs.border}`, boxShadow:"0 4px 16px rgba(0,10,30,0.2)" }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p style={{ fontSize:9, color:couleurs.soft, textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:4 }}>
                {CARTES[actif].label}
              </p>
              <p style={{ fontSize:26, fontWeight:700, color:couleurs.primary, letterSpacing:"-0.02em" }}>
                {afficher ? CARTES[actif].balance : "•••••• F"}
              </p>
            </div>
            <button onClick={() => setAfficher(!afficher)} style={{ background:"rgba(30,55,90,0.5)",
              backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
              border:`1px solid ${couleurs.border}`, borderRadius:99, width:34, height:34,
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              {afficher ? <Eye size={14} color={couleurs.muted}/> : <EyeOff size={14} color={couleurs.muted}/>}
            </button>
          </div>
          <p style={{ fontSize:12, color:couleurs.soft, letterSpacing:"0.18em" }}>**** **** **** {CARTES[actif].number}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label:"Envoyer",   icon:<ArrowUpRight size={15}/>,  bg:"rgba(232,255,90,0.85)", color:"#000" },
            { label:"Recevoir",  icon:<ArrowDownLeft size={15}/>, bg:"rgba(30,55,90,0.55)",   color:couleurs.primary },
            { label:"Recharger", icon:<Plus size={15}/>,          bg:"rgba(30,55,90,0.55)",   color:couleurs.primary },
          ].map(a => (
            <button key={a.label}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl hover:scale-105 transition-all"
              style={{ background:a.bg, backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
                border:`1px solid ${couleurs.border}` }}>
              <span style={{ color:a.color }}>{a.icon}</span>
              <span style={{ fontSize:9, fontWeight:600, textTransform:"uppercase",
                letterSpacing:"0.15em", color:a.color, opacity:0.85 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} style={styleCartte()}>
          <p style={etiquette()}>Solde total — 3 comptes</p>
          <p style={{ fontSize:34, fontWeight:700, color:couleurs.primary, letterSpacing:"-0.04em" }}>369 700 F</p>
          <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:10 }}>
            {CARTES.map((c,i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={c.img} alt="" style={{ width:32, height:20, borderRadius:4, objectFit:"cover" }}/>
                  <span style={{ fontSize:12, color:couleurs.secondary }}>{c.label}</span>
                </div>
                <span style={{ fontSize:13, fontWeight:600, color:couleurs.primary }}>{c.balance}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }} style={styleCartte()}>
          <p style={etiquette()}>Transactions ce mois</p>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={donneesSemaine} margin={{ top:5, right:5, left:-28, bottom:0 }} barSize={10}>
              <XAxis dataKey="j" tick={{ fill:"rgba(255,255,255,0.2)", fontSize:9 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:"rgba(255,255,255,0.15)", fontSize:8 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
              <Tooltip content={<BulleInfo/>} cursor={{ fill:"rgba(255,255,255,0.02)" }}/>
              <Bar dataKey="v" name="Montant" radius={[4,4,0,0]}>
                {donneesSemaine.map((_,i) => <Cell key={i} fill={i===4?couleurs.accent:"rgba(255,255,255,0.12)"}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} style={styleCartte()}>
          <p style={etiquette()}>Limite mensuelle</p>
          <div className="flex justify-between mb-3">
            <span style={{ fontSize:13, color:couleurs.secondary }}>Dépenses / Budget</span>
            <span style={{ fontSize:13, fontWeight:600, color:couleurs.primary }}>124k / 200k F</span>
          </div>
          <div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,0.07)" }}>
            <motion.div initial={{ width:0 }} animate={{ width:"62%" }}
              transition={{ duration:1.2, ease:"easeOut" }}
              style={{ height:"100%", borderRadius:99, background:couleurs.accent }}/>
          </div>
          <p style={{ fontSize:10, color:couleurs.soft, marginTop:8 }}>62% utilisé — 76k F restants</p>
        </motion.div>
      </div>
    </div>
  );
};

const PageObjectifs: React.FC = () => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={styleCartte({ gridColumn:"1 / 3" })}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p style={etiquette()}>Mes objectifs d'épargne</p>
          <p style={{ fontSize:20, fontWeight:600, color:couleurs.primary }}>3 objectifs actifs</p>
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 20px",
          borderRadius:99, background:"rgba(232,255,90,0.85)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", fontSize:11, fontWeight:600, color:"#000" }}>
          <Plus size={13}/> Nouvel objectif
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {objectifs.map((obj,i) => {
          const pourcentage = Math.round((obj.current/obj.target)*100);
          return (
            <div key={i} style={{ padding:"24px", borderRadius:20,
              background:"rgba(30,55,90,0.38)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:`1px solid ${couleurs.border}`, boxShadow:"0 4px 16px rgba(0,10,30,0.2)" }}>
              <div className="flex items-center gap-3 mb-4">
                <img src={obj.icon} alt="" style={{ width:20, height:20, filter:"invert(1)", opacity:0.4 }}/>
                <span style={{ fontSize:13, fontWeight:600, color:couleurs.primary }}>{obj.title}</span>
              </div>
              <div style={{ position:"relative", margin:"0 auto 16px", width:100, height:100 }}>
                <ResponsiveContainer width={100} height={100}>
                  <PieChart>
                    <Pie data={[{ value:pourcentage },{ value:100-pourcentage }]}
                      cx={45} cy={45} innerRadius={36} outerRadius={46}
                      startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                      <Cell fill={obj.color}/>
                      <Cell fill="rgba(255,255,255,0.06)"/>
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position:"absolute", inset:0, display:"flex",
                  alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:18, fontWeight:700, color:obj.color }}>{pourcentage}%</span>
                </div>
              </div>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontSize:11, color:couleurs.secondary, marginBottom:4 }}>
                  {obj.current}k / {obj.target}k F
                </p>
                <p style={{ fontSize:9, color:couleurs.soft, textTransform:"uppercase",
                  letterSpacing:"0.15em" }}>{obj.deadline}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} style={styleCartte()}>
      <p style={etiquette()}>Progression épargne totale</p>
      <div className="flex items-baseline gap-2 mb-4">
        <span style={{ fontSize:28, fontWeight:700, color:couleurs.primary }}>306k F</span>
        <span style={{ fontSize:11, color:couleurs.accent, fontWeight:600 }}>+512% depuis Jan</span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={croissanceEpargne} margin={{ top:5, right:5, left:-28, bottom:0 }}>
          <defs>
            <linearGradient id="gS2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="m" tick={{ fill:"rgba(255,255,255,0.2)", fontSize:9 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill:"rgba(255,255,255,0.15)", fontSize:8 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
          <Tooltip content={<BulleInfo/>}/>
          <Area type="monotone" dataKey="s" name="Épargne" stroke="#60a5fa" strokeWidth={2} fill="url(#gS2)" dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }} style={styleCartte()}>
      <p style={etiquette()}>Conseils DEUREUM</p>
      <div style={{ display:"flex", flexDirection:"column", gap:14, marginTop:8 }}>
        {[
          { tip:"À ce rythme, vous atteindrez votre objectif Marrakech en Juin 2026. Continuez !",  color:couleurs.accent },
          { tip:"Votre taux d'épargne de 22% est excellent. La médiane mondiale est de 15%.",       color:"#60a5fa" },
          { tip:"Vos dépenses alimentation (+30%) sont légèrement élevées ce mois-ci.",            color:"rgba(255,255,255,0.5)" },
        ].map((c,i) => (
          <div key={i} style={{ padding:"14px 16px", borderRadius:14,
            background:"rgba(30,55,90,0.38)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:`1px solid ${couleurs.border}`, boxShadow:"0 4px 16px rgba(0,10,30,0.2)",
            borderLeft:`3px solid ${c.color}` }}>
            <p style={{ fontSize:12, color:couleurs.secondary, lineHeight:1.6 }}>{c.tip}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const PageTontines: React.FC = () => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={styleCartte({ gridColumn:"1 / 3" })}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p style={etiquette()}>Mes tontines</p>
          <p style={{ fontSize:20, fontWeight:600, color:couleurs.primary }}>3 groupes actifs</p>
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 20px",
          borderRadius:99, background:"rgba(232,255,90,0.85)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", fontSize:11, fontWeight:600, color:"#000" }}>
          <Plus size={13}/> Créer une tontine
        </button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {donneesTontine.map((t,i) => {
          const pourcentage = Math.round((t.collected/t.total)*100);
          return (
            <div key={i} style={{ padding:"20px 24px", borderRadius:18,
              background:"rgba(30,55,90,0.38)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:`1px solid ${couleurs.border}`, boxShadow:"0 4px 16px rgba(0,10,30,0.2)" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p style={{ fontSize:14, fontWeight:600, color:couleurs.primary }}>{t.name}</p>
                  <p style={{ fontSize:10, color:couleurs.soft, marginTop:2 }}>
                    {t.members} membres · Prochain tour: {t.next}
                  </p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:18, fontWeight:700, color:couleurs.primary }}>{t.collected}k F</p>
                  <p style={{ fontSize:9, color:couleurs.soft, textTransform:"uppercase",
                    letterSpacing:"0.15em" }}>/ {t.total}k F collectés</p>
                </div>
              </div>
              <div style={{ height:4, borderRadius:99, background:"rgba(255,255,255,0.07)" }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${pourcentage}%` }}
                  transition={{ duration:1.2, delay:i*0.15, ease:"easeOut" }}
                  style={{ height:"100%", borderRadius:99,
                    background: pourcentage===100?couleurs.accent:"rgba(255,255,255,0.35)" }}/>
              </div>
              <div className="flex justify-between mt-2">
                <span style={{ fontSize:9, color:couleurs.soft }}>{pourcentage}% collecté</span>
                <span style={{ fontSize:9, color:pourcentage===100?couleurs.accent:couleurs.soft, fontWeight:600 }}>
                  {pourcentage===100?"✓ Complété":"En cours"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} style={styleCartte()}>
      <p style={etiquette()}>Répartition par tontine</p>
      <div style={{ position:"relative" }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={donneesTontine.map(t => ({ name:t.name, value:t.total }))}
              cx="50%" cy="50%" outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
              {donneesTontine.map((_,i) => (
                <Cell key={i} fill={[couleurs.accent,"rgba(255,255,255,0.5)","rgba(255,255,255,0.2)"][i]}/>
              ))}
            </Pie>
            <Tooltip content={<BulleInfo/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:8 }}>
        {donneesTontine.map((t,i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div style={{ width:8, height:8, borderRadius:99, flexShrink:0,
                background:[couleurs.accent,"rgba(255,255,255,0.5)","rgba(255,255,255,0.2)"][i] }}/>
              <span style={{ fontSize:11, color:couleurs.secondary }}>{t.name}</span>
            </div>
            <span style={{ fontSize:11, fontWeight:600, color:couleurs.primary }}>{t.total}k F</span>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }} style={styleCartte()}>
      <p style={etiquette()}>Prochain versement</p>
      <div style={{ display:"flex", flexDirection:"column", gap:14, marginTop:8 }}>
        {donneesTontine.filter(t => t.next !== "Terminé").map((t,i) => (
          <div key={i} style={{ padding:"16px", borderRadius:14,
            background:"rgba(30,55,90,0.38)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:`1px solid ${couleurs.border}`, boxShadow:"0 4px 16px rgba(0,10,30,0.2)" }}>
            <div className="flex justify-between items-center">
              <div>
                <p style={{ fontSize:12, fontWeight:500, color:couleurs.primary }}>{t.name}</p>
                <p style={{ fontSize:10, color:couleurs.soft, marginTop:3 }}>Tour prévu le {t.next}</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontSize:16, fontWeight:700, color:couleurs.accent }}>
                  {Math.round(t.total/t.members)}k F
                </p>
                <p style={{ fontSize:9, color:couleurs.soft }}>par membre</p>
              </div>
            </div>
          </div>
        ))}
        <div style={{ padding:"14px 16px", borderRadius:14,
          background:`rgba(232,255,90,0.12)`, backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', border:`1px solid rgba(232,255,90,0.25)` }}>
          <p style={{ fontSize:11, color:couleurs.secondary, lineHeight:1.6 }}>
            💡 Configurez des rappels automatiques pour ne jamais manquer un versement.
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

export default function Dashboard() {
  const [pageCourante, changerPage] = useState("dashboard");

  const PAGES_APP: Record<string, React.ReactNode> = {
    dashboard:    <PageAccueil/>,
    stats:        <PageStatistiques/>,
    transactions: <PageTransactions/>,
    wallet:       <PagePortfeuille/>,
    objectifs:    <PageObjectifs/>,
    tontines:     <PageTontines/>,
  };

  const TITRES_PAGES: Record<string, string> = {
    dashboard: "Bonjour, ABDOULAYE !",
    stats: "Statistiques",
    transactions: "Transactions",
    wallet: "Mon Wallet",
    objectifs: "Objectifs d'épargne",
    tontines: "Tontines",
  };

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ fontFamily:"'Satoshi', sans-serif", color:couleurs.primary, background:"#0d1520" }}>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2 }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex:0,
          backgroundImage:`url(${dashboardBg})`,
          backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat" }}/>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex:0,
        background:"linear-gradient(135deg, rgba(8,18,35,0.60) 0%, rgba(12,25,45,0.50) 50%, rgba(5,15,30,0.65) 100%)" }}/>

      <div className="relative z-10 flex w-full h-full">
        <BarreNavigation actif={pageCourante} setActif={changerPage}/>

        <div className="flex-1 flex flex-col overflow-hidden">

          <div style={{
            position: "relative", flexShrink: 0,
            padding: "16px 24px 0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <h1 style={{ fontSize: 13, fontWeight: 500, color: couleurs.muted,
                letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {TITRES_PAGES[pageCourante]}
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                display: "flex", alignItems: "center", gap: 2,
                background: "rgba(120,160,220,0.12)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(180,210,255,0.22)",
                borderRadius: 99,
                padding: "6px 8px",
                boxShadow: "0 8px 32px rgba(0,10,40,0.35), 0 1px 0 rgba(255,255,255,0.15) inset",
              }}
            >
              <div style={{
                padding: "7px 14px", borderRadius: 99,
                fontSize: 10, fontWeight: 500,
                color: couleurs.muted, letterSpacing: "0.06em",
              }}>
                Ven. 20 Mars 2026
              </div>

              <div style={{ width: 1, height: 20, background: couleurs.border, margin: "0 2px" }} />

              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 14px", borderRadius: 99, cursor: "text",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <Search size={12} color={couleurs.muted} />
                <input type="text" placeholder="Rechercher..."
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    width: 100, fontSize: 11, color: couleurs.primary,
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 400,
                  }}
                />
              </div>

              <div style={{ width: 1, height: 20, background: couleurs.border, margin: "0 2px" }} />

              <button style={{
                position: "relative", width: 34, height: 34, borderRadius: 99,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <Bell size={13} color={couleurs.muted} />
                <span style={{
                  position: "absolute", top: 7, right: 7,
                  width: 5, height: 5, borderRadius: 99, background: couleurs.accent,
                }} />
              </button>

              <div style={{
                width: 34, height: 34, borderRadius: 99, marginLeft: 2,
                background: "rgba(232,255,90,0.85)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: "#000",
                boxShadow: "0 2px 8px rgba(232,255,90,0.3)",
                cursor: "pointer",
              }}>
                AB
              </div>
            </motion.div>
          </div>

          <main className="flex-1 overflow-y-auto px-8 py-5 pt-4" style={{ scrollbarWidth:"none" }}>
            <AnimatePresence mode="wait">
              <motion.div key={pageCourante}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.25 }}>
                {PAGES_APP[pageCourante]}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import logoFace from "../assets/LOGO_face.png";
import logoPile from "../assets/LOGO_pile.png";
import card1    from "../assets/card1.png";
import card2    from "../assets/card2.png";
import card3    from "../assets/card3.png";
import inscriptionBg   from "../assets/inscription.png";
import structuredVideo from "../assets/structured-video.D5TUEsqh.webm";

const TEXT_PRIMARY   = "#F6EFE4";
const TEXT_SECONDARY = "rgba(246,239,228,0.78)";
const TEXT_MUTED     = "rgba(246,239,228,0.62)";
const TEXT_SOFT      = "rgba(246,239,228,0.45)";

const StepDots: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div style={{ display: "flex", gap: 6 }}>
    {Array.from({ length: total }).map((_, i) => (
      <motion.div key={i}
        animate={{
          width:      i === current ? 24 : 6,
          background: i < current ? "#E8FF5A" : i === current ? "#fff" : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.3 }}
        style={{ height: 6, borderRadius: 99 }}
      />
    ))}
  </div>
);

const Field: React.FC<{
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}> = ({ label, type = "text", name, value, onChange, placeholder, prefix, suffix }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "block", fontSize: 9, fontWeight: 500,
        textTransform: "uppercase", letterSpacing: "0.25em",
        color: TEXT_MUTED, marginBottom: 8,
      }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        {prefix && (
          <div style={{
            padding: "0 14px", borderRadius: 14, display: "flex",
            alignItems: "center", flexShrink: 0,
            background: "rgba(0,0,0,0.38)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 12, color: TEXT_MUTED,
          }}>{prefix}</div>
        )}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type={type} name={name} value={value}
            onChange={onChange} placeholder={placeholder}
            required
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: suffix ? "13px 44px 13px 16px" : "13px 16px",
              borderRadius: 14, fontSize: 13, fontWeight: 400,
              color: TEXT_PRIMARY,
              background: focused ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.40)",
              border: `1px solid ${focused ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.09)"}`,
              outline: "none", transition: "all 0.2s",
            }}
          />
          {suffix && (
            <div style={{
              position: "absolute", right: 14, top: "50%",
              transform: "translateY(-50%)",
            }}>{suffix}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(0);
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", email:"", password:"", confirm:"" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 1) { setStep(s => s + 1); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1600);
  };

  const pwStrength = (() => {
    const p = form.password; if (!p.length) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthColors = ["#f87171","#fb923c","#E8FF5A","#4ade80"];
  const strengthLabels = ["Faible","Moyen","Bon","Fort"];

  const StepIdentity = (
    <motion.div key="s0"
      initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
      exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}
      style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Field label="Nom complet" name="name" value={form.name}
        onChange={onChange} placeholder="Moussa Ndiaye" />
      <Field label="Téléphone" name="phone" value={form.phone}
        onChange={onChange} placeholder="77 000 00 00" prefix="🇸🇳 +221" />
      <Field label="Email" type="email" name="email" value={form.email}
        onChange={onChange} placeholder="moussa@exemple.com" />
    </motion.div>
  );

  const StepSecurity = (
    <motion.div key="s1"
      initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
      exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}
      style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Field label="Mot de passe" type={showPw ? "text":"password"}
        name="password" value={form.password} onChange={onChange}
        placeholder="Minimum 8 caractères"
        suffix={
          <button type="button" onClick={() => setShowPw(!showPw)}
            style={{ background:"none", border:"none", cursor:"pointer",
              color:"rgba(255,255,255,0.3)", padding:0, display:"flex" }}>
            {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
          </button>
        }
      />
      {form.password.length > 0 && (
        <div>
          <div style={{ display:"flex", gap:4, marginBottom:5 }}>
            {[0,1,2,3].map(i => (
              <motion.div key={i}
                animate={{ background: i < pwStrength ? strengthColors[pwStrength-1] : "rgba(255,255,255,0.08)" }}
                style={{ flex:1, height:3, borderRadius:99 }} />
            ))}
          </div>
          <p style={{ fontSize:10, color: pwStrength > 0 ? strengthColors[pwStrength-1] : TEXT_MUTED,
            fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase" }}>
            {pwStrength > 0 ? strengthLabels[pwStrength-1] : ""}
          </p>
        </div>
      )}
      <Field label="Confirmer" type={showPw ? "text":"password"}
        name="confirm" value={form.confirm} onChange={onChange}
        placeholder="Répétez le mot de passe"
        suffix={form.confirm.length > 0 && form.confirm === form.password
          ? <Check size={15} color="#4ade80"/> : null}
      />
      <p style={{ fontSize:11, color:TEXT_SOFT, lineHeight:1.6, fontWeight:400 }}>
        En créant un compte vous acceptez nos{" "}
        <a href="#" style={{ color:TEXT_MUTED, textDecoration:"underline" }}>CGU</a>{" "}
        et notre{" "}
        <a href="#" style={{ color:TEXT_MUTED, textDecoration:"underline" }}>Politique de confidentialité</a>.
      </p>
    </motion.div>
  );

  const StepDone = (
    <motion.div key="s2"
      initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
      transition={{ duration:0.5 }}
      style={{ display:"flex", flexDirection:"column", alignItems:"center",
        textAlign:"center", gap:20, padding:"20px 0" }}>
      <motion.div
        initial={{ scale:0 }} animate={{ scale:1 }}
        transition={{ type:"spring", stiffness:200, damping:16, delay:0.1 }}
        style={{ width:72, height:72, borderRadius:99, background:"#E8FF5A",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Check size={32} color="#000" strokeWidth={2.5}/>
      </motion.div>
      <div>
        <h3 style={{ fontSize:24, fontWeight:600, letterSpacing:"-0.03em",
          color:TEXT_PRIMARY, marginBottom:8 }}>
          Bienvenue, {form.name.split(" ")[0] || "ami"} 👋
        </h3>
        <p style={{ fontSize:13, color:TEXT_MUTED, lineHeight:1.6 }}>
          Votre compte DEUREUM est prêt.<br/>Dalal ak jamm.
        </p>
      </div>
      <div style={{ display:"flex", marginTop:4 }}>
        {[card1, card2, card3].map((c,i) => (
          <motion.img key={i} src={c} alt=""
            initial={{ opacity:0, y:10, rotate:(i-1)*6 }}
            animate={{ opacity:1, y:0, rotate:(i-1)*6 }}
            transition={{ delay:0.3 + i*0.1 }}
            style={{ width:100, borderRadius:10,
              marginLeft: i > 0 ? -20 : 0, zIndex:i,
              boxShadow:"0 8px 24px rgba(0,0,0,0.6)" }} />
        ))}
      </div>
      <motion.button onClick={() => navigate("/dashboard")}
        whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
        style={{ marginTop:8, width:"100%", padding:"14px 0", borderRadius:14,
          border:"none", background:"#fff", color:"#000",
          fontSize:13, fontWeight:600, letterSpacing:"0.04em", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#E8FF5A")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
      >
        Accéder à mon dashboard <ArrowRight size={14}/>
      </motion.button>
    </motion.div>
  );

  return (
    <div style={{ minHeight:"100vh", display:"flex",
      color:"#fff", overflow:"hidden", position:"relative" }}>
      <style>{`
        input::placeholder { color: rgba(246,239,228,0.25); }
        * { font-family:'Satoshi',sans-serif; box-sizing:border-box; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url(${inscriptionBg})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }} />

      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        overflow: "hidden", pointerEvents: "none",
      }}>
        <video autoPlay muted loop playsInline
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:1 }}>
          <source src={structuredVideo} type="video/webm"/>
        </video>
        <div style={{
          position:"absolute", inset:0,
          background:"rgba(0,0,0,0.45)",
        }}/>
      </div>

      <style>{`@media (min-width:900px){ .reg-left{ display:flex !important; } }`}</style>
      <div className="reg-left" style={{
        display: "none", width: "48%", flexShrink: 0,
        position: "relative", zIndex: 0,
        flexDirection: "column", justifyContent: "space-between",
        padding: "60px 56px",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src={logoFace} style={{ width:32, height:32, objectFit:"contain" }} alt="" />
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.18em",
            textTransform:"uppercase", color:TEXT_PRIMARY }}>DEUREUM</span>
        </div>

        <div style={{ flex:1, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:36 }}>

          <div style={{ position:"relative", width:300, height:210 }}>
            {[card3, card2, card1].map((c, i) => (
              <motion.img key={i} src={c} alt=""
                initial={{ opacity:0, y:20 }}
                animate={{ opacity: 1 - i*0.14, y:0 }}
                transition={{ delay: 0.2 + i*0.12, duration:0.8 }}
                style={{
                  position:"absolute", width:"88%", left:"50%",
                  borderRadius:18,
                  boxShadow:"0 24px 60px rgba(0,0,0,0.8)",
                  transform:`translateX(-50%) translateY(${i*28}px) translateX(${i*-6}px) rotate(${i*-2.2}deg)`,
                  zIndex: 3 - i,
                }}
              />
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, width:"100%" }}>
            {[
              { val:"0 F",   label:"Frais d'inscription" },
              { val:"30s",   label:"Pour commencer"       },
              { val:"3",     label:"Comptes connectables"  },
              { val:"100%",  label:"Sécurisé"              },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:0.5 + i*0.08 }}
                style={{
                  background:"rgba(0,0,0,0.35)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  backdropFilter:"blur(12px)",
                  borderRadius:16, padding:"18px 20px",
                }}>
                <p style={{ fontSize:22, fontWeight:700, letterSpacing:"-0.03em",
                  color: i === 0 ? "#E8FF5A" : TEXT_PRIMARY, lineHeight:1 }}>{s.val}</p>
                <p style={{ fontSize:9, color:TEXT_MUTED, marginTop:6,
                  textTransform:"uppercase", letterSpacing:"0.18em", fontWeight:500 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src={logoPile} style={{ width:24, height:24, objectFit:"contain", opacity:0.3 }} alt="" />
          <span style={{ fontSize:10, color:TEXT_SOFT,
            textTransform:"uppercase", letterSpacing:"0.2em" }}>Made in Dakar 🇸🇳</span>
        </div>
      </div>

      <div style={{
        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", zIndex:3, padding:"40px 24px",
      }}>
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
          style={{ width:"100%", maxWidth:400 }}
        >
          {step < 2 && (
            <>
              <div style={{ marginBottom:36 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:26 }}>
                  <img src={logoFace} style={{ width:26, height:26, objectFit:"contain" }} alt="" />
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em",
                    textTransform:"uppercase", color:TEXT_MUTED }}>DEUREUM</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start",
                  justifyContent:"space-between", marginBottom:10 }}>
                  <h1 style={{ fontSize:32, fontWeight:600, letterSpacing:"-0.04em",
                    color:TEXT_PRIMARY, lineHeight:1 }}>
                    {step === 0 ? "Créer un compte." : "Sécurisez-le."}
                  </h1>
                  <StepDots current={step} total={2} />
                </div>
                <p style={{ fontSize:13, color:TEXT_SECONDARY, fontWeight:400, lineHeight:1.6 }}>
                  {step === 0
                    ? "Gratuit, pour toujours. Aucune carte requise."
                    : "Choisissez un mot de passe solide."}
                </p>
              </div>

              <form onSubmit={nextStep}>
                <AnimatePresence mode="wait">
                  {step === 0 ? StepIdentity : StepSecurity}
                </AnimatePresence>

                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    marginTop:22, width:"100%", padding:"14px 0",
                    borderRadius:14, border:"none",
                    cursor: loading ? "default" : "pointer",
                    background: loading ? "rgba(255,255,255,0.08)" : "#fff",
                    color: loading ? "rgba(255,255,255,0.3)" : "#000",
                    fontSize:13, fontWeight:600, letterSpacing:"0.04em",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    transition:"background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#E8FF5A"; }}
                  onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate:360 }}
                        transition={{ duration:0.8, repeat:Infinity, ease:"linear" }}
                        style={{ width:14, height:14, borderRadius:99,
                          border:"2px solid rgba(255,255,255,0.15)",
                          borderTopColor:"rgba(255,255,255,0.5)" }}
                      />
                      Création…
                    </>
                  ) : step === 0 ? (
                    <>Continuer <ArrowRight size={14}/></>
                  ) : (
                    <>Créer mon compte <ArrowRight size={14}/></>
                  )}
                </motion.button>
              </form>

              {step === 0 && (
                <>
                  <div style={{ display:"flex", alignItems:"center", gap:16, margin:"22px 0" }}>
                    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.08)" }}/>
                    <span style={{ fontSize:10, color:TEXT_SOFT,
                      textTransform:"uppercase", letterSpacing:"0.2em" }}>ou</span>
                    <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.08)" }}/>
                  </div>
                  <button onClick={() => navigate("/dashboard")}
                    style={{
                      width:"100%", padding:"13px 0", borderRadius:14,
                      border:"1px solid rgba(255,255,255,0.09)",
                      background:"rgba(0,0,0,0.35)",
                      backdropFilter:"blur(8px)",
                      color:TEXT_SECONDARY, fontSize:12, fontWeight:500,
                      cursor:"pointer", letterSpacing:"0.04em", transition:"all 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                      (e.currentTarget as HTMLElement).style.color = TEXT_SECONDARY;
                    }}
                  >
                    Accéder à la démo →
                  </button>
                </>
              )}

              <p style={{ textAlign:"center", marginTop:26, fontSize:12,
                color:TEXT_MUTED, fontWeight:400 }}>
                Déjà un compte ?{" "}
                <Link to="/login"
                  style={{ color:TEXT_PRIMARY, fontWeight:600, textDecoration:"none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#E8FF5A")}
                  onMouseLeave={e => (e.currentTarget.style.color = TEXT_PRIMARY)}>
                  Se connecter
                </Link>
              </p>
            </>
          )}

          <AnimatePresence>{step === 2 && StepDone}</AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

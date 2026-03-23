"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import logoFace from "../assets/LOGO_face.png";
import logoPile from "../assets/LOGO_pile.png";
import card1    from "../assets/card1.png";
import card2    from "../assets/card2.png";
import card3    from "../assets/card3.png";
import connexionBg from "../assets/Connexion.png";

const TEXT_PRIMARY = "#F6EFE4";
const TEXT_SECONDARY = "rgba(246,239,228,0.78)";
const TEXT_MUTED = "rgba(246,239,228,0.62)";
const TEXT_SOFT = "rgba(246,239,228,0.45)";

const FloatingCards: React.FC = () => (
  <div style={{ position: "relative", width: "100%", height: 320 }}>
    {[card3, card2, card1].map((c, i) => (
      <motion.img
        key={i} src={c} alt=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1 - i * 0.15, y: 0 }}
        transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: "82%",
          left: "50%",
          borderRadius: 18,
          boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
          transform: `translateX(-50%) translateY(${i * 28}px) translateX(${i * -8}px) rotate(${i * -2.5}deg)`,
          zIndex: 3 - i,
        }}
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
  suffix?: React.ReactNode;
}> = ({ label, type = "text", name, value, onChange, placeholder, suffix }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Satoshi', sans-serif",
        fontSize: 9, fontWeight: 500, textTransform: "uppercase",
        letterSpacing: "0.25em", color: TEXT_MUTED, marginBottom: 8 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type} name={name} value={value}
          onChange={onChange} placeholder={placeholder}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: suffix ? "13px 44px 13px 16px" : "13px 16px",
            borderRadius: 14, fontFamily: "'Satoshi', sans-serif",
            fontSize: 13, fontWeight: 400, color: TEXT_PRIMARY,
            background: focused ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.38)",
            border: `1px solid ${focused ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
            outline: "none", transition: "all 0.2s",
          }}
        />
        {suffix && (
          <div style={{ position: "absolute", right: 14, top: "50%",
            transform: "translateY(-50%)" }}>{suffix}</div>
        )}
      </div>
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ email: "", password: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1600);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Satoshi', sans-serif",
      background: "#030303", color: "#fff", overflow: "hidden" }}>
      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        * { font-family: 'Satoshi', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.68)), url(${connexionBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          display: "none",
          width: "48%", flexShrink: 0, position: "relative", zIndex: 1,
          padding: "60px 56px", flexDirection: "column", justifyContent: "space-between",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
        className="md-flex"
      >
        <style>{`
          @media (min-width: 900px) { .auth-left { display: flex !important; } }
        `}</style>
        <div className="auth-left" style={{ display: "none", position: "absolute", inset: 0,
          padding: "60px 56px", flexDirection: "column", justifyContent: "space-between" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logoFace} style={{ width: 32, height: 32, objectFit: "contain" }} alt="" />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: TEXT_PRIMARY }}>DEUREUM</span>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center",
            justifyContent: "center", padding: "40px 0" }}>
            <div style={{ width: "100%", maxWidth: 340 }}>
              <FloatingCards />
            </div>
          </div>

          <div>
            <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em",
              lineHeight: 1.35, color: TEXT_PRIMARY, marginBottom: 16 }}>
              "Dalal ak jamm —<br />
              <span style={{ color: TEXT_MUTED, fontStyle: "italic" }}>
                la paix financière commence ici.
              </span>"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={logoPile} style={{ width: 28, height: 28, objectFit: "contain", opacity: 0.4 }} alt="" />
              <span style={{ fontSize: 10, color: TEXT_SOFT,
                textTransform: "uppercase", letterSpacing: "0.2em" }}>Made in Dakar 🇸🇳</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 1, padding: "40px 24px" }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
              <img src={logoFace} style={{ width: 28, height: 28, objectFit: "contain" }} alt="" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: TEXT_MUTED }}>DEUREUM</span>
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.04em",
              color: TEXT_PRIMARY, lineHeight: 1, marginBottom: 10 }}>
              Bon retour.
            </h1>
            <p style={{ fontSize: 13, color: TEXT_SECONDARY, fontWeight: 400, lineHeight: 1.6 }}>
              Connectez-vous pour reprendre le contrôle de vos finances.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Email ou téléphone" name="email" value={form.email}
              onChange={onChange} placeholder="moussa@exemple.com" />

            <Field
              label="Mot de passe" type={showPw ? "text" : "password"}
              name="password" value={form.password}
              onChange={onChange} placeholder="••••••••"
              suffix={
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.3)", padding: 0, display: "flex" }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/reset" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)",
                textDecoration: "none", fontWeight: 500, letterSpacing: "0.06em",
                transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = TEXT_PRIMARY)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}>
                Mot de passe oublié ?
              </Link>
            </div>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                marginTop: 8, width: "100%", padding: "14px 0",
                borderRadius: 14, border: "none", cursor: loading ? "default" : "pointer",
                background: loading ? "rgba(255,255,255,0.1)" : "#fff",
                color: loading ? "rgba(255,255,255,0.4)" : "#000",
                fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.2s, color 0.2s",
                fontFamily: "'Satoshi', sans-serif",
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#E8FF5A"; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#fff"; }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ width: 14, height: 14, borderRadius: 99,
                      border: "2px solid rgba(255,255,255,0.2)",
                      borderTopColor: "rgba(255,255,255,0.6)" }}
                  />
                  Connexion…
                </>
              ) : (
                <>Se connecter <ArrowRight size={14} /></>
              )}
            </motion.button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase", letterSpacing: "0.2em" }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          </div>

          <button onClick={() => navigate("/dashboard")}
            style={{
              width: "100%", padding: "13px 0", borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.32)",
              color: TEXT_SECONDARY, fontSize: 12, fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.04em",
              fontFamily: "'Satoshi', sans-serif", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.color = TEXT_SECONDARY;
            }}
          >
            Accéder à la démo →
          </button>

          <p style={{ textAlign: "center", marginTop: 28, fontSize: 12,
            color: TEXT_MUTED, fontWeight: 400 }}>
            Pas encore de compte ?{" "}
            <Link to="/register"
              style={{ color: TEXT_PRIMARY, fontWeight: 600, textDecoration: "none",
                transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#E8FF5A")}
              onMouseLeave={e => (e.currentTarget.style.color = TEXT_PRIMARY)}>
              S'inscrire gratuitement
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

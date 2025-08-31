import React, { useState, useEffect } from "react";

export default function TatlongHilingWishTree() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [animatingNote, setAnimatingNote] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [treeSrc, setTreeSrc] = useState("/tree-illustration.png");
  const [triedFallback, setTriedFallback] = useState(false);

  const handleTreeError = () => {
    if (!triedFallback) {
      setTreeSrc("/Gemini_Generated_Image_pwmv3rpwmv3rpwmv.png");
      setTriedFallback(true);
    }
  };

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTreeSrc(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;
    const newWish = {
      id: `${Date.now()}`,
      name: name.trim(),
      color: "#d62828",
    };
    setAnimatingNote(newWish);
    setSubmitted(true);
    setTimeout(() => {
      setAnimatingNote(null);
      setWish("");
    }, 1600);
  };

  useEffect(() => {
    if (!document.getElementById("tiktok-embed-script")) {
      const s = document.createElement("script");
      s.id = "tiktok-embed-script";
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0b0f19] text-white relative overflow-hidden">
      <header className="px-6 pt-8 pb-2 flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">Tatlong Hiling — Wish Tree</h1>
        <label className="text-xs bg-white/10 hover:bg-white/15 px-3 py-1 rounded-lg cursor-pointer">
          Replace Tree Image
          <input type="file" accept="image/*" className="hidden" onChange={onPickFile} />
        </label>
      </header>
      <p className="px-6 text-xs text-white/60 mb-3">Tip: Put your tree image in your app's <code>public/</code> folder as <code>tree-illustration.png</code>, or click "Replace Tree Image" to preview a file.</p>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-24">
        {!submitted && (
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-white/10">
            <h2 className="text-lg md:text-xl font-medium mb-3">Leave your wish</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name or alias" className="w-full rounded-xl bg-white/90 text-black px-3 py-2 outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1">Your Wish</label>
                <textarea value={wish} onChange={(e) => setWish(e.target.value)} placeholder="Type your wish here… (kept private)" rows={5} className="w-full rounded-xl bg-white/90 text-black px-3 py-2 outline-none" />
              </div>
              <div className="flex items-center gap-3">
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400">Submit Wish</button>
                <button type="button" onClick={() => { setName(""); setWish(""); setSubmitted(false); }} className="px-3 py-2 rounded-xl bg-white/10">Clear</button>
              </div>
            </form>
          </section>
        )}

        {submitted && (
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col items-center justify-center text-center">
            <p className="text-lg mb-2">Thank you! ✨</p>
            <p className="text-sm text-white/70">Your wish has been sealed and placed on the tree.</p>

            <div className="mt-6">
              <h3 className="text-sm mb-2">Watch on TikTok</h3>
              <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@vvink_ph/video/7543960600209231112" data-video-id="7543960600209231112" style={{ maxWidth: 325, minWidth: 225 }}>
                <section> </section>
              </blockquote>
            </div>

            <button
              className="mt-4 text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15"
              onClick={() => { setSubmitted(false); setName(""); setWish(""); }}
            >Submit another wish</button>
          </section>
        )}

        <section className="relative bg-white/5 rounded-2xl p-0 overflow-hidden border border-white/10 shadow-inner flex items-center justify-center">
          <img src={treeSrc} onError={handleTreeError} alt="Wish Tree" className="w-full h-full object-contain" />
          {triedFallback && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 px-4 py-2 rounded-md text-center text-sm">Image not found. Place your tree artwork in <code>public/tree-illustration.png</code> or use the Replace button above.</div>
            </div>
          )}
          {animatingNote && <AngPaoNote name={animatingNote.name} color={animatingNote.color} />}
          {submitted && !animatingNote && <p className="absolute bottom-6 text-white/80 text-sm">Your wish is now hanging on the tree ✨</p>}
        </section>
      </main>

      <style>{`
        @keyframes floatUp {
          0%{ transform: translate(-50%,0) scale(1); opacity: 0 }
          20%{opacity:1}
          80%{ transform: translate(-50%,-120px) scale(1.05) }
          100%{ transform: translate(-50%,-150px) scale(1) }
        }
      `}</style>
    </div>
  );
}

function AngPaoNote({ name, color }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <div className="pointer-events-none fixed left-1/2 bottom-20 -translate-x-1/2 z-40 animate-[floatUp_1.6s_ease-out_forwards]">
      <div className="flex items-center justify-center text-black shadow-xl" style={{ backgroundColor: color, width: 60, height: 100, borderRadius: 6 }}>
        <div className="px-2 pt-2 text-[11px] font-bold text-[#ffd166]">{initials || '★'}</div>
      </div>
    </div>
  );
}
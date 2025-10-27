import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setPromptEvent(e);

      // Delay a bit to allow Tailwind animation to trigger properly
      setTimeout(() => setVisible(true), 200);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log(outcome === "accepted" ? "✅ Installed" : "❌ Dismissed");
    setPromptEvent(null);
    setVisible(false);
  };

  if (!promptEvent) return null;

  return (
    <button
      onClick={handleInstall}
      className={`fixed bottom-6 left-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg hover:shadow-blue-400/40 hover:from-blue-700 hover:to-blue-600 transition-all duration-700 transform
        ${visible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"}`}
    >
      📲 Install App
    </button>
  );
}
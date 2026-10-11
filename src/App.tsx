/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageSquare,
  Globe,
  Code2,
  BookOpen,
  Sparkles,
  ExternalLink,
  Bot,
  Heart,
} from 'lucide-react';
import { CHAT_ROLES } from './data/alicarData';
import { ChatRole } from './types/chat';
import { ChatWindow } from './components/ChatWindow';
import { WebSimulator } from './components/WebSimulator';
import { EmbedGuide } from './components/EmbedGuide';
import { CatalogExplorer } from './components/CatalogExplorer';
import { RoleSelectorModal } from './components/RoleSelectorModal';

type TabType = 'chat' | 'simulator' | 'install' | 'catalog';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [currentRole, setCurrentRole] = useState<ChatRole>(CHAT_ROLES[0]);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const handleSelectRole = (role: ChatRole) => {
    setCurrentRole(role);
  };

  const handleUpdateSystemInstruction = (newInstruction: string) => {
    setCurrentRole((prev) => ({
      ...prev,
      systemInstruction: newInstruction,
    }));
  };

  const handleAskAboutProduct = (prompt: string) => {
    setPendingPrompt(prompt);
    setActiveTab('chat');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-[#fff0f6] via-[#fcf8fc] to-[#f5eefb] text-slate-800 overflow-hidden font-sans">
      {/* Global Top Navbar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-pink-100 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 shadow-xs z-30">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-2xl shadow-md text-white border-2 border-white select-none">
            🐱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-[#4a1c5d] tracking-tight">
                Alicat AI
              </h1>
              <span className="text-[11px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full hidden sm:inline">
                Para yoinnerm.github.io
              </span>
            </div>
            <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <span>Chatbot inteligente de</span>
              <a
                href="https://yoinnerm.github.io/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-0.5 underline"
              >
                <span>Alicar TIENDA</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </p>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center gap-1 bg-pink-50/70 p-1 rounded-2xl border border-pink-100/80">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'text-gray-600 hover:text-pink-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chat con Alicat</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'text-gray-600 hover:text-pink-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulador en tu Web</span>
          </button>

          <button
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'install'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'text-gray-600 hover:text-pink-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Código para tu Web</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'text-gray-600 hover:text-pink-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catálogo Alicar</span>
          </button>
        </nav>

        {/* Right Status / Model pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-1.5 bg-white hover:bg-pink-50 text-gray-700 px-3 py-1.5 rounded-xl border border-pink-200 text-xs font-medium shadow-2xs transition cursor-pointer"
            title="Ajustar rol o modelo Gemini"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden md:inline font-mono text-[11px] text-pink-700">
              {selectedModel}
            </span>
            <Bot className="w-3.5 h-3.5 text-pink-600" />
          </button>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 overflow-hidden p-3 sm:p-5 relative">
        <div className="max-w-7xl mx-auto h-full">
          {activeTab === 'chat' && (
            <ChatWindow
              currentRole={currentRole}
              selectedModel={selectedModel}
              onOpenRoleModal={() => setIsRoleModalOpen(true)}
              onNavigateToSimulator={() => setActiveTab('simulator')}
              pendingPrompt={pendingPrompt}
              onClearPendingPrompt={() => setPendingPrompt(null)}
            />
          )}

          {activeTab === 'simulator' && (
            <WebSimulator onGoToInstall={() => setActiveTab('install')} />
          )}

          {activeTab === 'install' && <EmbedGuide />}

          {activeTab === 'catalog' && (
            <CatalogExplorer onAskAboutProduct={handleAskAboutProduct} />
          )}
        </div>
      </main>

      {/* Role / Model Settings Modal */}
      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        onUpdateSystemInstruction={handleUpdateSystemInstruction}
      />
    </div>
  );
}

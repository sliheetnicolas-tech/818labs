// ============================================
// 818 LABS - Chatbot Widget
// ============================================

(function() {
  // State
  let isOpen = false;
  let messages = [];
  let isTyping = false;

  // Create widget HTML
  const widget = document.createElement('div');
  widget.id = 'chatbot-widget';
  widget.innerHTML = `
    <button id="chatbot-toggle" aria-label="Chat with us">
      <svg id="chatbot-icon-open" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg id="chatbot-icon-close" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div id="chatbot-window">
      <div id="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">818</div>
          <div>
            <div class="chatbot-name">818 Labs Assistant</div>
            <div class="chatbot-status">Online • Ask me anything</div>
          </div>
        </div>
        <button id="chatbot-minimize" aria-label="Close chat">✕</button>
      </div>
      <div id="chatbot-messages">
        <div class="chatbot-msg bot">
          <div class="chatbot-msg-content">
            Hey! 👋 I'm the 818 Labs assistant. I can help with product info, research protocols, reconstitution guides, pricing, and more. What can I help you with?
          </div>
        </div>
      </div>
      <div id="chatbot-input-area">
        <div id="chatbot-typing" style="display:none;">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>
        <form id="chatbot-form">
          <input type="text" id="chatbot-input" placeholder="Ask about peptides, pricing, protocols..." autocomplete="off" maxlength="500">
          <button type="submit" id="chatbot-send" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    #chatbot-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d4a853, #b8923e);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0a0a0a;
      box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);
      transition: all 0.3s ease;
    }

    #chatbot-toggle:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(212, 168, 83, 0.5);
    }

    #chatbot-window {
      display: none;
      position: absolute;
      bottom: 76px;
      right: 0;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 520px;
      max-height: calc(100vh - 140px);
      background: #111111;
      border: 1px solid #2a2a2a;
      border-radius: 16px;
      overflow: hidden;
      flex-direction: column;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
      animation: chatbot-slide-up 0.3s ease;
    }

    #chatbot-window.open {
      display: flex;
    }

    @keyframes chatbot-slide-up {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    #chatbot-header {
      background: #1a1a1a;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #2a2a2a;
      flex-shrink: 0;
    }

    .chatbot-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chatbot-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d4a853, #b8923e);
      color: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.7rem;
      letter-spacing: 0.5px;
    }

    .chatbot-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #fff;
    }

    .chatbot-status {
      font-size: 0.75rem;
      color: #4caf50;
    }

    #chatbot-minimize {
      background: none;
      border: none;
      color: #777;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s;
    }

    #chatbot-minimize:hover {
      background: rgba(255,255,255,0.05);
      color: #fff;
    }

    #chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
    }

    #chatbot-messages::-webkit-scrollbar {
      width: 5px;
    }

    #chatbot-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    #chatbot-messages::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 3px;
    }

    .chatbot-msg {
      display: flex;
      max-width: 85%;
      animation: chatbot-fade-in 0.25s ease;
    }

    @keyframes chatbot-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbot-msg.bot {
      align-self: flex-start;
    }

    .chatbot-msg.user {
      align-self: flex-end;
    }

    .chatbot-msg-content {
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 0.9rem;
      line-height: 1.55;
      word-wrap: break-word;
    }

    .chatbot-msg.bot .chatbot-msg-content {
      background: #1a1a1a;
      color: #e0e0e0;
      border: 1px solid #2a2a2a;
      border-bottom-left-radius: 4px;
    }

    .chatbot-msg.user .chatbot-msg-content {
      background: linear-gradient(135deg, #d4a853, #b8923e);
      color: #0a0a0a;
      border-bottom-right-radius: 4px;
      font-weight: 500;
    }

    #chatbot-input-area {
      padding: 12px 16px;
      border-top: 1px solid #2a2a2a;
      background: #1a1a1a;
      flex-shrink: 0;
    }

    #chatbot-typing {
      padding: 4px 0 8px;
      display: flex;
      gap: 4px;
      align-items: center;
    }

    #chatbot-typing .dot {
      width: 7px;
      height: 7px;
      background: #d4a853;
      border-radius: 50%;
      animation: chatbot-bounce 1.4s infinite;
    }

    #chatbot-typing .dot:nth-child(2) { animation-delay: 0.2s; }
    #chatbot-typing .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes chatbot-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    #chatbot-form {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    #chatbot-input {
      flex: 1;
      background: #0a0a0a;
      border: 1px solid #2a2a2a;
      border-radius: 24px;
      padding: 12px 18px;
      color: #fff;
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }

    #chatbot-input:focus {
      border-color: #d4a853;
    }

    #chatbot-input::placeholder {
      color: #555;
    }

    #chatbot-send {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #d4a853;
      border: none;
      color: #0a0a0a;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    #chatbot-send:hover {
      background: #e6be6a;
      transform: scale(1.05);
    }

    #chatbot-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    /* Mobile responsive */
    @media (max-width: 480px) {
      #chatbot-widget {
        bottom: 16px;
        right: 16px;
      }

      #chatbot-window {
        width: calc(100vw - 32px);
        height: calc(100vh - 100px);
        bottom: 72px;
        right: -8px;
      }

      #chatbot-toggle {
        width: 54px;
        height: 54px;
      }
    }
  `;

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    document.head.appendChild(style);
    document.body.appendChild(widget);

    // Elements
    const toggle = document.getElementById('chatbot-toggle');
    const window_ = document.getElementById('chatbot-window');
    const minimize = document.getElementById('chatbot-minimize');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messagesEl = document.getElementById('chatbot-messages');
    const typingEl = document.getElementById('chatbot-typing');
    const sendBtn = document.getElementById('chatbot-send');
    const iconOpen = document.getElementById('chatbot-icon-open');
    const iconClose = document.getElementById('chatbot-icon-close');

    // Toggle chat
    function toggleChat() {
      isOpen = !isOpen;
      window_.classList.toggle('open', isOpen);
      iconOpen.style.display = isOpen ? 'none' : 'block';
      iconClose.style.display = isOpen ? 'block' : 'none';
      if (isOpen) {
        setTimeout(() => input.focus(), 100);
        scrollToBottom();
      }
    }

    toggle.addEventListener('click', toggleChat);
    minimize.addEventListener('click', toggleChat);

    // Scroll helper
    function scrollToBottom() {
      setTimeout(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }, 50);
    }

    // Add message to UI
    function addMessage(text, role) {
      // Simple markdown-ish formatting
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

      const msg = document.createElement('div');
      msg.className = `chatbot-msg ${role}`;
      msg.innerHTML = `<div class="chatbot-msg-content">${html}</div>`;
      messagesEl.appendChild(msg);
      scrollToBottom();
    }

    // Send message
    async function sendMessage(text) {
      if (!text.trim() || isTyping) return;

      // Add user message
      messages.push({ role: 'user', content: text });
      addMessage(text, 'user');

      // Show typing
      isTyping = true;
      typingEl.style.display = 'flex';
      sendBtn.disabled = true;
      input.value = '';
      scrollToBottom();

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        });

        const data = await res.json();

        if (data.error) {
          addMessage('Sorry, I\'m having trouble connecting right now. Please try again or email support.818labs@gmail.com for help.', 'bot');
        } else {
          messages.push({ role: 'assistant', content: data.reply });
          addMessage(data.reply, 'bot');
        }
      } catch (err) {
        addMessage('Sorry, I\'m having trouble connecting right now. Please try again or email support.818labs@gmail.com for help.', 'bot');
      } finally {
        isTyping = false;
        typingEl.style.display = 'none';
        sendBtn.disabled = false;
        input.focus();
      }
    }

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage(input.value);
    });

    // Enter key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });
  }
})();

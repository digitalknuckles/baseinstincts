// rulebook.js
class NaiveteRulebook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.pages = [
      `
      <h1>Naïveté: Base Instincts</h1>
      <p class="tagline">Broken is beautiful — Build your face.</p>
      <p>This tutorial explains setup, pipelines, duels, items & tactical identity formation.</p>
      `,

      `
      <h2>Setup</h2>
      <ul>
        <li>Each player selects an <strong>Avatar Core</strong>.</li>
        <li>Each places an <strong>Item</strong> directly behind their Avatar.</li>
        <li>Shuffle and draw 3 cards each (Player 1 draws 4).</li>
      </ul>
      `,

      `
      <h2>Turn Flow</h2>
      <ol>
        <li>Place a card adjacent to one you control.</li>
        <li>Connections must match Limb Types.</li>
        <li>Drawing a card may occur once per turn (max hand 5).</li>
        <li>If you touch the opponent’s pipeline → <strong>Duel!</strong></li>
      </ol>
      `,

      `
      <h2>Duel Rules</h2>
      <ul>
        <li>Compare Duel Values.</li>
        <li>Winner captures & flips the contested card.</li>
        <li>Winner gains a <strong>bonus action</strong> (may play or rotate again).</li>
      </ul>
      `,

      `
      <h2>Item Win Condition</h2>
      <p>If your pipeline reaches the opponent’s Item and you win the duel → you win the round.</p>
      <p>Field clears, hands remain.</p>
      `,

      `
      <h2>Dynamic Grid</h2>
      <p>The grid expands whenever a card is placed outside the current boundary.</p>
      <p>Territory matters — shape the field, shape the fight.</p>
      `,

`
<h2>How to Play — Video Walkthrough</h2>
<div class="video-wrapper">
  <iframe 
    src="https://www.youtube.com/embed/M6g_RdOoUoE"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<p class="mt-2" style="opacity:.75; font-size:.9rem;">
  If the video doesn't play: open in new tab → 
  <a href="https://www.youtube.com/watch?v=M6g_RdOoUoE" target="_blank" style="color:#ffd36a;text-decoration:underline;">
    Watch on YouTube
  </a>
</p>
`,

      `
      <h2>Full Rulebook (Printable)</h2>
      <p>You can view the full formatted rulebook here:</p>
      <a class="cid-link" target="_blank"
        href="https://ipfs.io/ipfs/bafkreifalsawwhrc4t6oo2bjcfj72cfzyw2xbfugq6hjofibuwse7upcbu">
        📄 View Full Rulebook (IPFS / CID)
      </a>
      `,

      `
      <h2>End of Tutorial</h2>
      <p>Return to the grid. Build yourself. Break each other open.</p>
      <button class="close-btn">Close Rulebook</button>
      `
    ];

    this.pageIndex = 0;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(18px);
          background: rgba(0,0,0,0.65);
          z-index: 9999;
          animation: fadeIn .3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } }
        .panel {
          width: min(650px, 90vw);
          max-height: 90vh;
          background: rgba(25, 25, 28, 0.92);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 18px;
          padding: 28px;
          overflow-y: auto;
          color: #fff;
          font-family: Inter, sans-serif;
        }
        h1, h2 { margin-bottom: 12px; font-weight: 700; }
        p, li { line-height: 1.45; font-size: 0.95rem; }
        ul,ol { margin-left: 18px; margin-bottom: 12px; }
        .nav { display:flex; justify-content:space-between; margin-top:18px; }
        button {
          background: linear-gradient(90deg,#ff6ad5,#ffd36a);
          border-radius:999px;
          border:none;
          padding:9px 18px;
          font-weight:600;
          cursor:pointer;
          color:#000;
        }
        .close-btn { width:100%; margin-top:18px; }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          margin-top: 12px;
        }
        .video-wrapper iframe {
          position: absolute;
          width:100%;
          height:100%;
          border-radius: 12px;
        }
        .cid-link {
          display:block;
          margin-top:12px;
          color:#ffd36a;
          text-decoration:underline;
        }
      </style>

      <div class="panel">
        <div class="content"></div>
        <div class="nav">
          <button id="prev">← Back</button>
          <button id="next">Next →</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.content = this.shadowRoot.querySelector(".content");
    this.prevBtn = this.shadowRoot.querySelector("#prev");
    this.nextBtn = this.shadowRoot.querySelector("#next");

    this.renderPage();

    this.prevBtn.addEventListener("click", () => this.changePage(-1));
    this.nextBtn.addEventListener("click", () => this.changePage(+1));

    // ✅ close when clicking outside panel
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target === this.shadowRoot.host) this.close();
    });

    // ✅ ESC closes
    window.addEventListener("keydown", this.keyHandler = (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this.keyHandler);
  }

  changePage(direction) {
    this.pageIndex = Math.max(0, Math.min(this.pageIndex + direction, this.pages.length - 1));
    this.renderPage();
  }

  renderPage() {
    this.content.innerHTML = this.pages[this.pageIndex];

    const closeBtn = this.shadowRoot.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
  }

  close() {
    this.remove();
  }
}

customElements.define("naivete-rulebook", NaiveteRulebook);

// rulebook.js
class NaiveteRulebook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.pages = [
      `
      <h1>Naïveté: Base Instincts</h1>
      <p class="tagline">Broken is beautiful — Build your face.</p>
      <p>This is a fast tactical card-placement dueling game. You assemble a
      living avatar from personality fragments, instincts & impulses. The grid
      grows dynamically as players build outward.</p>
      `,
      `
      <h2>Setup</h2>
      <ul>
        <li>Each player begins with 1 <strong>Avatar Core</strong>.</li>
        <li>Place Avatars adjacent, face-to-face — this is the first 2 tiles.</li>
        <li>Each player places 1 <strong>Item</strong> directly behind their Avatar.</li>
        <li>The board now begins as a <strong>4-tile cluster</strong>.</li>
      </ul>
      <p>The grid expands automatically as cards are placed.</p>
      `,
      `
      <h2>Turn Structure</h2>
      <ol>
        <li>Play a Card adjacent to one you control.</li>
        <li>Card must align by <strong>Limb Type</strong> connections.</li>
        <li>If your placement touches an opposing card → <strong>Duel!</strong></li>
        <li>If you capture the opponent’s Item, you win.</li>
      </ol>
      `,
      `
      <h2>Limb Connection Rules</h2>
      <p>Each card has directional limb endpoints. Only matching types may connect:</p>
      <ul>
        <li>Arm → Arm</li>
        <li>Leg → Leg</li>
        <li>Head → Head</li>
        <li>No diagonal linking.</li>
      </ul>
      <p>Cards may rotate <strong>180° only</strong> (no sideways).</p>
      `,
      `
      <h2>Duels</h2>
      <p>When a new card is placed adjacent to an opponent’s card:</p>
      <ul>
        <li>Compare printed Duel value.</li>
        <li>Higher value <strong>captures</strong> the target card.</li>
        <li>Captured cards flip to your control and maintain their connections.</li>
      </ul>
      <p>Attacking aggressively increases grid control.</p>
      `,
      `
      <h2>Item & Victory</h2>
      <ul>
        <li>Your Item sits behind your Avatar.</li>
        <li>If opponent captures your Item → <strong>You Lose</strong>.</li>
        <li>Item capture often requires a chain of duels and expansion.</li>
      </ul>
      <p>Defend, pressure, rotate, and extend your reach.</p>
      `,
      `
      <h2>Dynamic Grid</h2>
      <p>The grid is unbounded — it expands wherever you place new tiles.</p>
      <p>Play becomes a spatial push-and-pull of territory control and body-shape identity expression.</p>
      <p class="center">You are literally building who you are in conflict.</p>
      `,
      `
      <h2>End of Rulebook</h2>
      <p>Return to the field.<br>Break each other open.</p>
      <button class="close-btn">Close Rulebook</button>
      `
    ];

    this.pageIndex = 0;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(18px);
          background: rgba(0,0,0,0.65);
          animation: fadeIn 0.35s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } }
        .panel {
          width: min(640px, 90vw);
          max-height: 90vh;
          background: rgba(22,22,26,0.85);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 28px;
          overflow-y: auto;
          color: #fff;
          font-family: Inter, sans-serif;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          animation: slideUp 0.35s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0;} }
        h1,h2 { font-weight: 700; margin-bottom: 12px; }
        p, li { line-height: 1.45; font-size: 15px; }
        ul,ol { margin-left: 18px; margin-bottom: 12px; }
        .tagline { opacity: 0.75; margin-bottom: 18px; }
        .nav { display:flex; justify-content:space-between; margin-top:18px; }
        button {
          background: linear-gradient(90deg, #ff6ad5, #ffd36a);
          border: none;
          border-radius: 999px;
          padding: 10px 16px;
          font-weight: 600;
          cursor:pointer;
          color:#000;
        }
        .close-btn { width:100%; margin-top:18px; }
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

    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target === this.shadowRoot.host) this.remove();
    });

    window.addEventListener("keydown", this.keyHandler = (e) => {
      if (e.key === "Escape") this.remove();
    });
  }

  disconnectedCallback() { window.removeEventListener("keydown", this.keyHandler); }

  changePage(dir) {
    this.pageIndex = Math.max(0, Math.min(this.pageIndex + dir, this.pages.length - 1));
    this.renderPage();
  }

  renderPage() {
    this.content.innerHTML = this.pages[this.pageIndex];
  }
}

customElements.define("naivete-rulebook", NaiveteRulebook);

/* ============================================================================
   figures.js: the little technical drawings next to each featured project.
   Keyed by project id. A featured project without an entry here just shows
   without a figure. Drawn on a 360 × 270 grid; styles live in styles.css (.fg-*).
   ========================================================================== */
(function () {
  "use strict";

  // Arrowheads. Marker ids have to be unique on the page, so each figure gets its own.
  const arrows = id => `
    <defs>
      <marker id="ah-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 9 5 0 9z" class="fg-ink"/>
      </marker>
      <marker id="ahm-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 9 5 0 9z" class="fg-ink fg-mut"/>
      </marker>
    </defs>`;

  const svg = (title, body) =>
    `<svg viewBox="0 0 360 270" role="img" aria-label="${title}" focusable="false">${body}</svg>`;

  window.FIGURES = {

    /* ---- Anchor: phone, service worker, cache, server ---- */
    anchor: {
      caption: "Requests go through a service worker, which answers from its cache when there is no signal. The navy and gold come from the Garmin G3000.",
      svg: svg("Diagram: the Anchor app on a phone talks to a service worker, which uses a cache or reaches the Node and Express server on Render.", `
        ${arrows("anchor")}
        <rect class="fg-ln fg-box" x="30" y="34" width="92" height="178" rx="14"/>
        <line class="fg-ln fg-thin" x1="66" y1="43" x2="86" y2="43"/>
        <rect x="38" y="52" width="76" height="144" rx="3" fill="#1c2a49"/>
        <path d="M38 65V55a3 3 0 0 1 3-3h70a3 3 0 0 1 3 3v10z" fill="#27395f"/>
        <text x="44" y="61.5" fill="#d4ae5b" font-size="6.5" class="fg-font">ANCHOR</text>
        <g fill="none" stroke="#d4ae5b" stroke-width="1">
          <rect x="44" y="72" width="64" height="44" rx="2"/>
          <rect x="44" y="122" width="64" height="30" rx="2" stroke-opacity=".55"/>
          <rect x="44" y="176" width="13" height="10" rx="1"/><rect x="61" y="176" width="13" height="10" rx="1"/>
          <rect x="78" y="176" width="13" height="10" rx="1"/><rect x="95" y="176" width="13" height="10" rx="1"/>
        </g>
        <line x1="50" y1="83" x2="92" y2="83" stroke="#d4ae5b" stroke-width="2"/>
        <g stroke="#8d9ab8" stroke-width="1.5">
          <line x1="50" y1="93" x2="100" y2="93"/><line x1="50" y1="100" x2="96" y2="100"/>
          <line x1="50" y1="107" x2="80" y2="107"/><line x1="50" y1="132" x2="90" y2="132"/>
          <line x1="50" y1="140" x2="98" y2="140"/>
        </g>

        <line class="fg-ln" x1="124" y1="108" x2="157" y2="108" marker-end="url(#ah-anchor)"/>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="140" y="100">fetch</text>

        <rect class="fg-ln fg-box" x="160" y="86" width="84" height="44" rx="2"/>
        <text class="fg-tx fg-mid" x="202" y="104.5">service</text>
        <text class="fg-tx fg-mid" x="202" y="117.5">worker</text>

        <line class="fg-ln" x1="202" y1="133" x2="202" y2="151" marker-start="url(#ah-anchor)" marker-end="url(#ah-anchor)"/>
        <path class="fg-ln fg-box" d="M178 160v26a24 6 0 0 0 48 0v-26"/>
        <ellipse class="fg-ln fg-box" cx="202" cy="160" rx="24" ry="6"/>
        <text class="fg-tx fg-mid" x="202" y="182">cache</text>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="202" y="210">offline → cache</text>

        <line class="fg-ln fg-dash" x1="246" y1="108" x2="269" y2="108" marker-end="url(#ah-anchor)"/>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="257" y="100">net</text>

        <rect class="fg-ln fg-box" x="272" y="80" width="70" height="56" rx="2"/>
        <text class="fg-tx fg-b fg-mid" x="307" y="98">Render</text>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="307" y="113">Node +</text>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="307" y="124">Express</text>

        <rect x="272" y="166" width="16" height="16" fill="#1c2a49"/>
        <rect x="292" y="166" width="16" height="16" fill="#d4ae5b"/>
        <text class="fg-tx fg-sm fg-mut" x="272" y="198">G3000 colors</text>

        <text class="fg-tx fg-sm fg-mid fg-mut" x="76" y="230">installed PWA</text>
      `),
    },

    /* ---- EXPOSURE: the in-game viewfinder ---- */
    exposure: {
      caption: "The viewfinder HUD. Every shot is checked against the photo requirements, and the list ticks off as you go.",
      svg: svg("Drawing of a camera viewfinder with corner brackets, a framed subject, a long exposure indicator, lens controls and a checklist of shot requirements.", `
        <rect x="16" y="18" width="328" height="208" rx="8" fill="#17191c"/>
        <g stroke="#fff" stroke-opacity=".13" stroke-width="1">
          <line x1="131" y1="34" x2="131" y2="210"/><line x1="229" y1="34" x2="229" y2="210"/>
          <line x1="32" y1="93" x2="328" y2="93"/><line x1="32" y1="151" x2="328" y2="151"/>
        </g>
        <g fill="none" stroke="#e9e9e2" stroke-width="1.5" stroke-linecap="square">
          <path d="M32 50V34h16"/><path d="M312 34h16v16"/><path d="M328 194v16h-16"/><path d="M48 210H32v-16"/>
        </g>

        <g fill="#41454e">
          <ellipse cx="186" cy="105" rx="9" ry="11"/>
          <path d="M171 196l5-71q10-9 20 0l5 71z"/>
        </g>
        <rect x="159" y="86" width="54" height="118" fill="none" stroke="#ffc928" stroke-width="1.25" stroke-dasharray="4 3"/>
        <path d="M173 97v-5h5M194 92h5v5M199 113v5h-5M178 118h-5v-5" fill="none" stroke="#e9e9e2" stroke-width="1"/>
        <rect x="240" y="38" width="84" height="64" fill="#17191c"/>

        <rect x="40" y="41" width="7" height="7" fill="#ffc928"/>
        <text x="52" y="48" fill="#e9e9e2" class="fg-font" font-size="8.5">LONG EXP</text>

        <text x="40" y="203" fill="#e9e9e2" class="fg-font" font-size="8.5">LENS</text>
        <path d="M76 196.5l-5 3.5 5 3.5z M83 196.5l5 3.5-5 3.5z" fill="#e9e9e2"/>

        <text x="246" y="50" fill="#e9e9e2" class="fg-font" font-size="8.5" font-weight="700">SHOT LIST</text>
        <text x="246" y="66" fill="#ffc928" class="fg-font" font-size="8.5">✓</text><text x="258" y="66" fill="#e9e9e2" class="fg-font" font-size="8.5">req 1</text>
        <text x="246" y="80" fill="#ffc928" class="fg-font" font-size="8.5">✓</text><text x="258" y="80" fill="#e9e9e2" class="fg-font" font-size="8.5">req 2</text>
        <text x="246" y="94" fill="#8b8f98" class="fg-font" font-size="8.5">–</text><text x="258" y="94" fill="#8b8f98" class="fg-font" font-size="8.5">req 3</text>
      `),
    },

    /* ---- Pysino: provably fair rolls ---- */
    pysino: {
      caption: "Provably fair: every result comes from a server seed, a client seed and a nonce, so any roll can be recomputed and checked.",
      svg: svg("Flow diagram: server seed, client seed and nonce go into a hash, which produces the result. The result can be re-run to verify it.", `
        ${arrows("pysino")}
        <rect class="fg-ln fg-box" x="22" y="44" width="108" height="34" rx="2"/>
        <text class="fg-tx fg-mid" x="76" y="64.5">server seed</text>
        <rect class="fg-ln fg-box" x="22" y="100" width="108" height="34" rx="2"/>
        <text class="fg-tx fg-mid" x="76" y="120.5">client seed</text>
        <rect class="fg-ln fg-box" x="22" y="156" width="108" height="34" rx="2"/>
        <text class="fg-tx fg-mid" x="76" y="176.5">nonce</text>

        <path class="fg-ln" d="M130 61h20M130 117h20M130 173h20M150 61v112"/>
        <line class="fg-ln" x1="150" y1="117" x2="175" y2="117" marker-end="url(#ah-pysino)"/>

        <rect class="fg-ln fg-box" x="178" y="96" width="70" height="42" rx="2"/>
        <text class="fg-tx fg-mid" x="213" y="120.5">hash</text>
        <line class="fg-ln" x1="248" y1="117" x2="269" y2="117" marker-end="url(#ah-pysino)"/>

        <rect class="fg-ln fg-tint" x="272" y="96" width="68" height="42" rx="2"/>
        <text class="fg-tx fg-b fg-mid" x="306" y="120.5">result</text>

        <path class="fg-ln fg-dash fg-mut" d="M306 141v81H76v-29" marker-end="url(#ahm-pysino)"/>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="191" y="214">re-run it to verify</text>
      `),
    },

    /* ---- Multi-agent debate ---- */
    debate: {
      caption: "Two agents argue for a few rounds. The moderator only sees the transcript with the names taken out, and each debate is judged twice.",
      svg: svg("Diagram: agent A and agent B exchange rounds; their transcript has the names removed before a blinded moderator reads it and gives two verdicts.", `
        ${arrows("debate")}
        <rect class="fg-ln fg-box" x="18" y="44" width="82" height="36" rx="2"/>
        <text class="fg-tx fg-mid" x="59" y="65.5">agent A</text>
        <rect class="fg-ln fg-box" x="18" y="164" width="82" height="36" rx="2"/>
        <text class="fg-tx fg-mid" x="59" y="185.5">agent B</text>
        <line class="fg-ln" x1="59" y1="84" x2="59" y2="160" marker-start="url(#ah-debate)" marker-end="url(#ah-debate)"/>
        <text class="fg-tx fg-sm fg-mut" x="66" y="125">rounds</text>

        <path class="fg-ln" d="M100 62h18v40h16" marker-end="url(#ah-debate)"/>
        <path class="fg-ln" d="M100 182h18v-40h16" marker-end="url(#ah-debate)"/>

        <text class="fg-tx fg-sm fg-mid fg-mut" x="181" y="68">names hidden</text>
        <rect class="fg-ln fg-box" x="137" y="76" width="88" height="92" rx="2"/>
        <g class="fg-ink"><rect x="145" y="88" width="16" height="7"/><rect x="145" y="114" width="16" height="7"/><rect x="145" y="140" width="16" height="7"/></g>
        <g class="fg-ln fg-thin fg-mut">
          <line x1="166" y1="91.5" x2="216" y2="91.5"/><line x1="145" y1="103.5" x2="210" y2="103.5"/>
          <line x1="166" y1="117.5" x2="214" y2="117.5"/><line x1="145" y1="129.5" x2="200" y2="129.5"/>
          <line x1="166" y1="143.5" x2="212" y2="143.5"/><line x1="145" y1="155.5" x2="204" y2="155.5"/>
        </g>

        <line class="fg-ln" x1="225" y1="122" x2="245" y2="122" marker-end="url(#ah-debate)"/>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="295" y="88">bias checks</text>
        <rect class="fg-ln fg-box" x="246" y="98" width="98" height="48" rx="2"/>
        <text class="fg-tx fg-mid" x="295" y="118">moderator</text>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="295" y="133">blinded</text>

        <line class="fg-ln" x1="270" y1="146" x2="270" y2="171" marker-end="url(#ah-debate)"/>
        <line class="fg-ln" x1="320" y1="146" x2="320" y2="171" marker-end="url(#ah-debate)"/>
        <rect class="fg-ln fg-tint" x="246" y="174" width="48" height="28" rx="2"/>
        <text class="fg-tx fg-sm fg-mid" x="270" y="191.5">verdict</text>
        <rect class="fg-ln fg-tint" x="296" y="174" width="48" height="28" rx="2"/>
        <text class="fg-tx fg-sm fg-mid" x="320" y="191.5">verdict</text>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="295" y="222">judged twice</text>
      `),
    },

    /* ---- WALL·R: ultrasonic radar ---- */
    "wall-r": {
      caption: "The servo sweeps the HC-SR04 back and forth. Anything that gets too close sets off the buzzer, and every reading goes to the OLED and the WiFi dashboard.",
      svg: svg("Radar display: a half circle with range rings, a sweeping beam, two echoes further out and one close echo inside the buzzer zone.", `
        <path class="fg-yel" fill-opacity=".38" d="M124 236a56 56 0 0 1 112 0z"/>
        <g class="fg-ln fg-thin fg-mut">
          <path d="M12 236a168 168 0 0 1 336 0"/><path d="M68 236a112 112 0 0 1 224 0"/><path d="M124 236a56 56 0 0 1 112 0"/>
          <line x1="180" y1="236" x2="325.5" y2="152"/><line x1="180" y1="236" x2="264" y2="90.5"/>
          <line x1="180" y1="236" x2="180" y2="68"/><line x1="180" y1="236" x2="96" y2="90.5"/>
          <line x1="180" y1="236" x2="34.5" y2="152"/><line x1="6" y1="236" x2="354" y2="236"/>
        </g>

        <g class="fg-sweep">
          <path class="fg-tint-acc" d="M180 236 346.6 214.1a168 168 0 0 1 0 43.9z"/>
          <line class="fg-ln fg-acc" x1="180" y1="236" x2="348" y2="236" stroke-width="1.5"/>
        </g>

        <circle class="fg-ink" cx="271" cy="135" r="3.2"/>
        <circle class="fg-ink" cx="123.4" cy="163.5" r="3.2"/>
        <circle class="fg-ln fg-thin" cx="199" cy="203" r="8"/>
        <circle class="fg-ln fg-yel" cx="199" cy="203" r="3.8"/>
        <text class="fg-tx fg-sm fg-mid" x="144" y="226">buzzer</text>

        <rect class="fg-ln fg-box" x="164" y="229" width="32" height="12" rx="1.5"/>
        <circle class="fg-ln fg-thin" cx="173" cy="235" r="3.5"/><circle class="fg-ln fg-thin" cx="187" cy="235" r="3.5"/>
        <text class="fg-tx fg-sm fg-mid fg-mut" x="180" y="258">HC-SR04 on a servo</text>
      `),
    },

    /* ---- Plant monitor: calibration mapping ---- */
    "plant-monitor": {
      caption: "Dry and wet readings get saved to EEPROM as calibration points, and every raw 14-bit reading is mapped between them to get a moisture percentage.",
      svg: svg("Diagram: a raw 14-bit scale from 0 to 16383 with dry and wet calibration marks saved in EEPROM, mapped onto a 0 to 100 percent moisture scale. An example reading maps to 40 percent.", `
        <text class="fg-tx fg-sm fg-mid fg-mut" x="74" y="28">raw, 14-bit</text>
        <rect class="fg-ln fg-box" x="62" y="40" width="24" height="180"/>
        <text class="fg-tx fg-sm fg-end fg-mut" x="56" y="44">16383</text>
        <text class="fg-tx fg-sm fg-end fg-mut" x="56" y="223">0</text>

        <path class="fg-ln fg-thin fg-mut" d="M59 72h-4v96h4"/>
        <text class="fg-tx fg-sm fg-end fg-mut" x="51" y="117">saved</text>
        <text class="fg-tx fg-sm fg-end fg-mut" x="51" y="128">in</text>
        <text class="fg-tx fg-sm fg-end fg-mut" x="51" y="139">EEPROM</text>

        <text class="fg-tx fg-mid fg-mut" x="286" y="28">moisture</text>
        <rect class="fg-tint" x="274" y="148.7" width="24" height="71.3"/>
        <rect class="fg-ln" x="274" y="40" width="24" height="180"/>
        <text class="fg-tx fg-sm fg-mut" x="304" y="44">100%</text>
        <text class="fg-tx fg-sm fg-mut" x="304" y="223">0%</text>

        <line class="fg-ln fg-dash fg-mut" x1="86" y1="72" x2="274" y2="220"/>
        <line class="fg-ln fg-dash fg-mut" x1="86" y1="168" x2="274" y2="40"/>
        <line class="fg-ln" x1="58" y1="72" x2="90" y2="72" stroke-width="2"/>
        <line class="fg-ln" x1="58" y1="168" x2="90" y2="168" stroke-width="2"/>
        <text class="fg-tx fg-sm" x="94" y="66">dry</text>
        <text class="fg-tx fg-sm" x="94" y="183">wet</text>

        <line class="fg-ln fg-acc" x1="86" y1="110" x2="274" y2="148.7" stroke-width="1.5"/>
        <circle class="fg-dot-acc" cx="86" cy="110" r="3"/><circle class="fg-dot-acc" cx="274" cy="148.7" r="3"/>
        <text class="fg-tx fg-sm fg-acc-tx" x="95" y="128">reading</text>
        <text class="fg-tx fg-sm fg-b fg-acc-tx" x="304" y="152">40%</text>
      `),
    },
  };
})();

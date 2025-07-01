// UI generation and display functions
function initializeQuizForm() {
  const form = document.getElementById('quizForm');
  
  // Generate questions
  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <h3>Q${i+1}: ${q.question}</h3>
      <div class="options">
        ${q.options.map(opt => `
          <label>
            <input type="radio" name="q${i+1}" value="${opt.value}" required>
            ${opt.text}
          </label>
        `).join('')}
      </div>
    `;
    form.appendChild(div);
  });

  // Add submit button
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'submit-btn';
  button.innerText = 'See Your Elemental Mix';
  button.onclick = handleSubmit;
  form.appendChild(button);
}

function handleSubmit() {
  // Validate all questions are answered
  const unanswered = [];
  questions.forEach((_, i) => {
    if (!document.querySelector(`input[name="q${i+1}"]:checked`)) {
      unanswered.push(i+1);
    }
  });
  
  if (unanswered.length > 0) {
    alert(`Please answer all questions. Missing questions: ${unanswered.join(', ')}`);
    return;
  }
  
  // Calculate and display results
  const results = calculateResult();
  displayResults(results);
}

function displayResults(results) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h2>Your Debating Personality Mix</h2>
    ${generateBar("🔥 Fire", results.percentages.fire, "#e74c3c")}
    ${generateBar("🌊 Water", results.percentages.water, "#3498db")}
    ${generateBar("🌍 Earth", results.percentages.earth, "#2ecc71")}
    ${generateBar("🌬 Air", results.percentages.air, "#9b59b6")}
    <div style="margin-top:25px;">
      ${results.isBlended ? blendedDescription(results) : singleDescription(results.topElement)}
    </div>
    <button onclick="window.location.reload()" style="margin-top:20px; padding: 10px 20px; background:#555; color:white; border:none; border-radius:5px; cursor:pointer;">Retake Quiz</button>
  `;
  resultDiv.style.display = 'block';
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  
  // Export results
  exportToSheet(results);
}

function generateBar(label, percent, color) {
  return `
    <div><strong>${label}:</strong> ${percent}%</div>
    <div class="bar">
      <div class="bar-inner" style="width:${percent}%; background:${color};">
        ${percent > 10 ? percent + '%' : ''}
      </div>
    </div>
  `;
}

function singleDescription(elem) {
  return `<h3>${descriptions[elem].name}</h3><p>${descriptions[elem].text}</p>`;
}

function blendedDescription(results) {
  const elements = results.resultElements;
  const key = elements.join(',');
  
  const mixMap = {
    "air,fire": { 
      name: "⚡ Lightning", 
      desc: "You dazzle with sharp wit and wild creativity. You move fast, think even faster, and always keep your opponents guessing. You're bold, energetic, and can electrify the room when you're on fire." 
    },
    "air,earth": { 
      name: "🏜️ Sand", 
      desc: "You blend structure and abstraction effortlessly. Grounded in logic yet always flexible, you erode weak arguments grain by grain — subtle, strategic, and quietly powerful." 
    },
    "air,water": { 
      name: "🌫️ Mist", 
      desc: "Elusive but persuasive, you bring sensitivity and originality to every round. You often sway others with subtle but powerful insights. Gentle but never weak, you make complexity elegant." 
    },
    "earth,fire": { 
      name: "🐦‍🔥 Lava", 
      desc: "A grounded powerhouse. You use structured logic but erupt with fiery impact when needed. Calm under pressure, yet explosively persuasive. Your calm surface hides formidable force." 
    },
    "earth,water": { 
      name: "🌳 Wood", 
      desc: "Rooted yet flowing. You're adaptable like water but stand firm like earth — steady, dependable, and quietly resilient. You nurture ideas patiently, letting them grow strong and deep. Your words plant seeds that take root and flourish long after you've spoken" 
    },
    "fire,water": { 
      name: "♨️ Steam", 
      desc: "You are both passionate and empathetic — combining intensity with emotional insight. You're a speaker who brings both force and grace into the room. You press hard, but you listen deeply too." 
    },
    "air,earth,fire": { 
      name: "🔥🌪 Wildfire", 
      desc: "You're rapid, calculated chaos. Your arguments spread like wildfire — unpredictable, forceful, and impossible to ignore. You balance creativity with logic and intensity with finesse." 
    },
    "air,fire,water": { 
      name: "⛈ Storm", 
      desc: "You're a tempest of emotion, energy, and creativity — unpredictable and powerful. You blend rhetorical flair, emotional appeal, and visionary framing into an explosive mix." 
    },
    "air,earth,water": { 
      name: "🌫 Quicksand", 
      desc: "Slow, deliberate, and deadly effective. You subtly pull opponents off balance and drag them into deeply framed complexity. You excel at setting traps and reframing debates." 
    },
    "earth,fire,water": { 
      name: "🌋 Volcano", 
      desc: "Explosive yet grounded, you combine passion, empathy, and structure. You build arguments that simmer slowly before erupting in a dramatic finish." 
    },
    "air,earth,fire,water": { 
      name: "🌌 Avatar", 
      desc: "You are the master of all elements — the ultimate debater who seamlessly blends passion, logic, creativity, and empathy. You adapt to any situation with fluid mastery." 
    }
  };

  const mix = mixMap[key];

  if (mix) {
    const elementNames = elements.map(e => descriptions[e].name.split(' – ')[0]).join(' and ');
    return `<hr style="margin: 30px 0; border: none; border-top: 2px dashed #ccc;">
      <h3 style="font-size: 24px; color: #222;">${mix.name}</h3>
      <p style="font-size: 18px; color: #444; line-height: 1.6;">${mix.desc}</p>
      <p>Your debating style combines ${elementNames}. This unique blend makes you ${getBlendStrengthDescription(key)}.</p>`;
  }

  // Fallback for unexpected combinations
  const elementNames = elements.map(e => descriptions[e].name.split(' – ')[0]).join(' and ');
  return `<h3>🔀 ${getBlendName(elements)}</h3>
    <p>You're a unique combination of ${elementNames}. This rare blend means you approach debates with multiple strengths that make you highly adaptable and versatile across different debating styles.</p>`;
}
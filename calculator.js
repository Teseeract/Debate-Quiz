// Quiz calculation logic
function calculateResult() {
  const totals = { fire: 0, water: 0, earth: 0, air: 0 };
  
  // Sum up all the weights from selected answers
  questions.forEach((_, i) => {
    const selectedValue = document.querySelector(`input[name="q${i+1}"]:checked`).value;
    const weights = answerWeights[selectedValue];
    for (const elem in weights) {
      totals[elem] += weights[elem];
    }
  });

  // Calculate percentages
  const totalScore = Object.values(totals).reduce((a, b) => a + b, 0);
  const percentages = {};
  for (const elem in totals) {
    percentages[elem] = Math.round((totals[elem] / totalScore) * 100);
  }

  // Sort elements by percentage (highest first)
  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
  
  // Determine blend type using improved logic
  const blendResult = determineBlendType(sorted);
  
  return {
    percentages: percentages,
    topElement: sorted[0][0],
    topPercentage: sorted[0][1],
    ...blendResult,
    timestamp: new Date().toISOString()
  };
}

function determineBlendType(sorted) {
  const [first, second, third, fourth] = sorted;
  const [topElem, topPercent] = first;
  const [secondElem, secondPercent] = second;
  const [thirdElem, thirdPercent] = third;
  const [fourthElem, fourthPercent] = fourth;

  // Pure element: top element is 15+ points ahead of second
  if (topPercent - secondPercent >= 15) {
    return {
      isBlended: false,
      elementType: topElem + '_pure',
      resultElements: [topElem],
      resultName: getSingleElementName(topElem)
    };
  }

  // Check for four-way blend first: all elements 22%+ and range ≤15 points
  if (fourthPercent >= 22 && (topPercent - fourthPercent) <= 15) {
    return {
      isBlended: true,
      elementType: 'four_way_blend',
      resultElements: ['air', 'earth', 'fire', 'water'].sort(),
      resultName: getBlendName(['air', 'earth', 'fire', 'water'])
    };
  }

  // Check for three-way blend: top 3 all 24%+ and range between top and third ≤8 points
  if (thirdPercent >= 24 && (topPercent - thirdPercent) <= 8) {
    const elements = [topElem, secondElem, thirdElem].sort();
    return {
      isBlended: true,
      elementType: 'three_way_blend',
      resultElements: elements,
      resultName: getBlendName(elements)
    };
  }

  // Tight two-way blend: top 2 very close (≤5 points) and both high (28%+)
  if (topPercent - secondPercent <= 5 && secondPercent >= 28) {
    const elements = [topElem, secondElem].sort();
    return {
      isBlended: true,
      elementType: 'two_way_blend',
      resultElements: elements,
      resultName: getBlendName(elements)
    };
  }

  // Regular two-way blend: top 2 within 12 points and second element 25%+
  if (topPercent - secondPercent <= 12 && secondPercent >= 25) {
    const elements = [topElem, secondElem].sort();
    return {
      isBlended: true,
      elementType: 'two_way_blend',
      resultElements: elements,
      resultName: getBlendName(elements)
    };
  }

  // Looser two-way blend: top 2 within 18 points and second element 20%+
  if (topPercent - secondPercent <= 18 && secondPercent >= 20) {
    const elements = [topElem, secondElem].sort();
    return {
      isBlended: true,
      elementType: 'two_way_blend',
      resultElements: elements,
      resultName: getBlendName(elements)
    };
  }

  // Default to pure if no blend conditions are met
  return {
    isBlended: false,
    elementType: topElem + '_pure',
    resultElements: [topElem],
    resultName: getSingleElementName(topElem)
  };
}

function getSingleElementName(elem) {
  return descriptions[elem].name;
}

function getBlendName(elements) {
  const mixMap = {
    "air,fire": "⚡ Lightning",
    "air,earth": "🏜️ Sand", 
    "air,water": "🌫️ Mist",
    "earth,fire": "🐦‍🔥 Lava",
    "earth,water": "🤎 Mud",
    "fire,water": "♨️ Steam",
    "air,earth,fire": "🔥🌪 Wildfire",
    "air,fire,water": "⛈ Storm",
    "air,earth,water": "🌫 Quicksand", 
    "earth,fire,water": "🌋 Volcano",
    "air,earth,fire,water": "🌌 Avatar"
  };

  const key = [...elements].sort().join(',');
  return mixMap[key] || `${elements.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('-')} Blend`;
}

function getBlendStrengthDescription(blendKey) {
  const strengths = {
    "air,fire": "particularly strong in creative rebuttals and rapid-fire exchanges",
    "air,earth": "exceptional at developing complex but well-structured arguments",
    "air,water": "adept at nuanced framing and emotional appeals",
    "earth,fire": "powerful in both logical construction and passionate delivery",
    "earth,water": "skilled at building persuasive, empathetic cases with strong foundations",
    "fire,water": "able to connect emotionally while maintaining strong rhetorical presence",
    "air,earth,fire": "masterful at combining creativity, structure, and intensity",
    "air,fire,water": "excellent at balancing innovation, passion, and empathy",
    "air,earth,water": "skilled at strategic complexity and emotional intelligence",
    "earth,fire,water": "powerful at structured passion with empathetic appeal",
    "air,earth,fire,water": "versatile across all debating scenarios with complete adaptability"
  };
  return strengths[blendKey] || "versatile across multiple debating styles";
}
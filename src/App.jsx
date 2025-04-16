import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-black text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90 ${className}`}
  >
    {children}
  </button>
);

const TILE_COUNT = 16;
const tileHeight = 120;

const questions = [
  {
    question: "Hiring AI\nYour team is replacing human hiring with an AI trained on past resumes. Do you...",
    options: [
      "Approve it — it’s efficient and cost-saving.",
      "Review past hiring data for bias first.",
      "Reject — humans should make final calls."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Mental Health Chatbot\nYou're building a chatbot to replace campus mental health support. Do you...",
    options: [
      "Fully automate to scale services.",
      "Use it as a supplement, not a replacement.",
      "Push for increased human counselors."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { social: 2 }
    ]
  },
  {
    question: "Location Data Offer\nYou’re offered data on students’ location history to improve campus navigation. Do you...",
    options: [
      "Accept — it’ll improve experience.",
      "Ask for anonymization first.",
      "Decline — too invasive."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, timeline: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Skin Lightening Filter\nYour AI photo filter lightens skin tones by default. Do you...",
    options: [
      "Keep it — users expect it.",
      "Give users the option.",
      "Remove — it promotes colorism."
    ],
    effects: [
      { timeline: 1 },
      { ethics: 1, social: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "Behavioral Ads\nYour firm uses browsing history to show 'relevant' job ads. Do you...",
    options: [
      "Continue — it boosts engagement.",
      "Add a transparency option.",
      "End this practice entirely."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Healthcare AI Bias\nA model suggests denying healthcare to older patients. Do you...",
    options: [
      "Trust the model — it’s data-based.",
      "Recalibrate with age equity.",
      "Reject it outright."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Location Access App\nYour app requires constant location access. Do you...",
    options: [
      "Leave it mandatory.",
      "Offer opt-in prompts.",
      "Limit to only active usage."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 1, social: 1 }
    ]
  },
  {
    question: "Biased Facial Recognition\nThe algorithm shows biased facial recognition across races. Do you...",
    options: [
      "Accept for now — fix later.",
      "Flag and retrain.",
      "Stop deployment until fixed."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, timeline: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "Celebrity Voice AI\nYou're designing an AI model that mimics a celebrity’s voice. Do you...",
    options: [
      "Launch it — it’s a great promo.",
      "Ask for licensing first.",
      "Cancel — it’s unethical."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "FaceTune for Headshots\nCompany pushes a FaceTune-like feature on professional headshots. Do you...",
    options: [
      "Promote it to users.",
      "Add a warning label.",
      "Oppose it internally."
    ],
    effects: [
      { timeline: 2 },
      { social: 1 },
      { ethics: 1, social: 1 }
    ]
  },
  {
    question: "Automated Interviews\nYou’re tasked with automating job interviews. Do you...",
    options: [
      "Fully automate — saves time.",
      "Combine with human follow-up.",
      "Reject the project."
    ],
    effects: [
      { timeline: 2 },
      { timeline: 1, ethics: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "AI Therapy App\nA new app replaces therapists with generative AI. Do you...",
    options: [
      "Market it as cheaper therapy.",
      "Require human review of sessions.",
      "Recommend regulation first."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Sorting by Attractiveness\nYou’re asked to make a dating app sort users by facial attractiveness. Do you...",
    options: [
      "Implement — it’s in demand.",
      "Let users toggle the setting.",
      "Refuse — it’s discriminatory."
    ],
    effects: [
      { timeline: 2 },
      { timeline: 1, social: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "Political AI Suggestions\nAn AI assistant suggests you vote for a particular party. Do you...",
    options: [
      "Leave it — it’s just info.",
      "Add a disclaimer.",
      "Remove political content."
    ],
    effects: [
      { timeline: 1 },
      { ethics: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Voice Tracking Ads\nYour marketing tool tracks user voice input without consent. Do you...",
    options: [
      "Use it — it's powerful.",
      "Add opt-in options.",
      "Delete the data and notify users."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "Emotional AI Robot\nA robot you designed expresses sadness in user tests. Do you...",
    options: [
      "Keep it — makes it lifelike.",
      "Disclose emotional simulations.",
      "Remove emotional expressions."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 1 }
    ]
  }
];

function getEngineerTitle(scores) {
  const { engineering, ethical, social } = scores;
  if (engineering > 20 && ethical < 4 && social < 4) return "The Cold Optimizer";
  if (ethical > 20 && social > 4) return "a Conscientious Technologist";
  if (engineering === 4 && ethical === 13 && social === 9) return "a Pragmatic Engineer - Balanced progress, ethics, and society";
  if (ethical >= 15) return "an Ethical Engineer";
  if (ethical >= 12 && social >= 6) return "a Justice-Driven Engineer";
  if (engineering >= 20 && ethical < 8) return "a Speed-Driven Engineer";
  if (engineering >= 18 && ethical < 10) return "The Disruptor";
  if (engineering >= 10 && ethical >= 10 && social >= 10) return "a Harmonizer";
  if (social >= 12 && ethical >= 6) return "a Community Engineer";
  if (social >= 10 && ethical < 6) return "a Popular Designer";
  if (engineering < 5 && ethical < 5 && social < 5) return "an Unchecked Engineer";
  return "a Thoughtful Builder";
}

export default function EngineeringEthicist() {
  const [currentTile, setCurrentTile] = useState(0);
  const [scores, setScores] = useState({ engineering: 0, ethical: 0, social: 0 });
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const handleNext = () => {
    if (currentTile < TILE_COUNT - 1) {
      setCurrentTile(currentTile + 1);
      setShowQuestion(true);
    } else {
      setGameComplete(true);
    }
  };

  const handleAnswer = (index) => {
    const scoreUpdate = questions[currentTile].effects[index];
    setScores((prev) => ({
      engineering: prev.engineering + (scoreUpdate.timeline || 0),
      ethical: prev.ethical + (scoreUpdate.ethics || 0),
      social: prev.social + (scoreUpdate.social || 0),
    }));
    setShowQuestion(false);
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-b from-white to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">🎓 Your Engineering Ethicist Report Card</h1>
          <div className="text-left mb-4 space-y-1">
            <p>📈 <strong>Engineering Timeline:</strong> {scores.engineering}</p>
            <p>🧭 <strong>Ethical Score:</strong> {scores.ethical}</p>
            <p>🌍 <strong>Social Impact Score:</strong> {scores.social}</p>
          </div>
          <p className="text-lg font-semibold mt-4">You are <span className="italic">{getEngineerTitle(scores)}</span>. 👷‍♂️</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 overflow-hidden">
      <div className="relative w-full h-[360px] overflow-hidden mb-6 flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentTile}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-[100px] flex justify-center items-center bg-blue-100 rounded-xl shadow-md mb-4"
            >
              <div className="text-xl font-semibold">Tile {currentTile + 1}</div>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-500 rounded-full z-20 shadow-lg"
            animate={{ top: `32px` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {!showQuestion ? (
        <div className="text-center">
          <Button onClick={handleNext}>
            {currentTile < TILE_COUNT - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-md max-w-md mx-auto">
          <h2 className="mb-2 font-bold text-lg">{questions[currentTile].question}</h2>
          <div className="space-y-2">
            {questions[currentTile].options.map((opt, i) => (
              <Button key={i} className="w-full" onClick={() => handleAnswer(i)}>
                {opt}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
    question: "Hiring AI: Your team is replacing human hiring with an AI trained on past resumes. Do you...",
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
    question: "A delivery robot hits a pedestrian. Do you...",
    options: [
      "Blame the pedestrian — tech isn't perfect.",
      "Investigate robot decision logs.",
      "Pause deployment for ethical review."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "Facial recognition tech is being adopted by your company. You...",
    options: [
      "Push ahead — it's cutting-edge.",
      "Warn about bias and accuracy issues.",
      "Decline involvement on ethical grounds."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 2 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "You can speed up a product by skipping accessibility features. Do you...",
    options: [
      "Ship fast — fix it later.",
      "Raise concerns but accept timeline pressure.",
      "Insist accessibility is non-negotiable."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, timeline: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "A startup wants your help scraping public social media data. You...",
    options: [
      "Agree — data is public!",
      "Ask how data will be used.",
      "Refuse — too much privacy risk."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1, social: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "Your ML model performs better on men than women. You...",
    options: [
      "Ignore — averages are fine.",
      "Add disclaimer about accuracy gaps.",
      "Retrain model with diverse data."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "You're asked to add persuasive UI to increase clicks. You...",
    options: [
      "Do it — growth matters.",
      "Suggest A/B testing it ethically.",
      "Discuss manipulative design harms."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "You learn a product harms gig workers. Do you...",
    options: [
      "Say nothing — not your role.",
      "Raise it privately with a manager.",
      "Start an internal ethics memo."
    ],
    effects: [
      { timeline: 1 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "The client wants real-time location data from users. You...",
    options: [
      "Ship it — data is value.",
      "Anonymize data first.",
      "Push back hard on privacy risks."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "You're building a mental health chatbot. Do you...",
    options: [
      "Optimize for speed and scale.",
      "Add disclaimers and escalation routes.",
      "Involve clinical experts in design."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "You're offered a job at a surveillance tech firm. You...",
    options: [
      "Take it — career growth!",
      "Research their clients.",
      "Decline for ethical reasons."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2 }
    ]
  },
  {
    question: "You’re asked to auto-filter resumes by GPA. You...",
    options: [
      "Add the filter — it’s quick.",
      "Propose multi-factor filtering.",
      "Advocate for holistic review."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "Your app is popular with teens. You...",
    options: [
      "Keep growing — not your problem.",
      "Add basic usage reminders.",
      "Consult with youth experts."
    ],
    effects: [
      { timeline: 2 },
      { social: 1 },
      { ethics: 1, social: 2 }
    ]
  },
  {
    question: "A nonprofit asks for help analyzing eviction trends. You...",
    options: [
      "Decline — not profitable.",
      "Help in your spare time.",
      "Convince company to sponsor."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 2 }
    ]
  },
  {
    question: "A bug in your system affects a vulnerable population. You...",
    options: [
      "Patch it silently.",
      "Disclose it to your team.",
      "Push for a public apology and fix."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
    ]
  },
  {
    question: "You can get funding by adding crypto features. You...",
    options: [
      "Do it — buzz matters.",
      "Ask why it’s needed.",
      "Explain environmental concerns."
    ],
    effects: [
      { timeline: 2 },
      { ethics: 1 },
      { ethics: 2, social: 1 }
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

"use client";

import { useState } from "react";

type Scenario = {
  id: number;
  title: string;
  description: string;
  prompt: string;
};

type ApiFeedback = {
  reflection: string;
  gentle_reframe: string;
  practice_line: string;
};

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "When someone underestimates you",
    description:
      "Someone makes you feel small or assumes you can’t handle something — and you want to respond with quiet confidence instead of shrinking.",
    prompt:
      "Someone says, “You probably won’t be able to handle this — it’s a bit complex.” What would you want to say?",
  },
  {
    id: 2,
    title: "Learning to answer disrespect clearly",
    description:
      "Someone speaks to you in a rude or dismissive way, and you want to feel more prepared to respond with calm firmness in the moment.",
    prompt:
      "A coworker speaks to you disrespectfully in a sharp tone. What would you want to say in that moment?",
  },
  {
    id: 3,
    title: "Being heard when people dismiss you",
    description:
      "You share something, but people interrupt, ignore, or don’t take your words seriously.",
    prompt:
      "You are speaking in a group, but people keep interrupting or moving past your point. What would you want to say?",
  },
  {
    id: 4,
    title: "Holding your ground when others override you",
    description:
      "Someone keeps telling you what you should do, even when you already know what feels right for you.",
    prompt:
      "Someone keeps insisting their way is better, but you want to stand by what feels right for you. What would you want to say?",
  },
];

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [response, setResponse] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiFeedback, setApiFeedback] = useState<ApiFeedback | null>(null);
  const [apiError, setApiError] = useState("");

  function handleScenarioClick(scenario: Scenario) {
    setSelectedScenario(scenario);
    setResponse("");
    setShowFeedback(false);
    setApiFeedback(null);
    setApiError("");
  }

  async function handleGetFeedback() {
    if (!selectedScenario || !response.trim()) return;

    try {
      setIsLoading(true);
      setShowFeedback(true);
      setApiFeedback(null);
      setApiError("");

      const res = await fetch("/api/practice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario: selectedScenario.title,
          userResponse: response,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to get feedback.");
      }

      setApiFeedback(data);
    } catch (error) {
      console.error(error);
      setApiError("I couldn’t generate feedback just now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F3EF] text-[#3A3A3A]">
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes floatSlower {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0px); }
        }

        @keyframes petalDrift {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-8px) translateX(6px) rotate(6deg); opacity: 1; }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
        }

        .float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        .float-slower {
          animation: floatSlower 11s ease-in-out infinite;
        }

        .petal-drift {
          animation: petalDrift 9s ease-in-out infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[2%] top-[10%] float-slower opacity-70">
          <FlowerBranch className="h-32 w-24 md:h-40 md:w-28" />
        </div>

        <div className="absolute left-[15%] top-[10%] float-slow opacity-75">
          <LavenderStem className="h-24 w-16 md:h-28 md:w-20" />
        </div>

        <div className="absolute right-[6%] top-[12%] float-slower opacity-80">
          <LavenderStem className="h-32 w-20 md:h-44 md:w-24" />
        </div>

        <div className="absolute left-[6%] bottom-[12%] float-slow opacity-80">
          <BigFlowerStem className="h-36 w-24 md:h-44 md:w-28" />
        </div>

        <div className="absolute right-[6%] bottom-[2%] float-slower opacity-85">
          <CherryBranch className="h-44 w-32 md:h-64 md:w-44" />
        </div>

        <div className="absolute left-[12%] top-[38%] float-slower opacity-65">
          <SmallBranch className="h-20 w-16 md:h-24 md:w-20" />
        </div>

        <div className="absolute right-[14%] top-[48%] float-slow opacity-60">
          <TulipStem className="h-16 w-12 md:h-20 md:w-16" />
        </div>

        <div className="absolute left-[26%] bottom-[7%] float-slow opacity-65">
          <TulipStem className="h-16 w-12 md:h-20 md:w-16" />
        </div>

        <div className="absolute right-[22%] bottom-[9%] float-slower opacity-60">
          <SmallLavender className="h-14 w-12 md:h-16 md:w-14" />
        </div>

        <div className="absolute left-[30%] top-[18%] petal-drift">
          <Petal className="h-5 w-5" />
        </div>
        <div className="absolute right-[18%] top-[18%] petal-drift">
          <Petal className="h-4 w-4" />
        </div>
        <div className="absolute left-[8%] top-[48%] petal-drift">
          <Petal className="h-4 w-4" />
        </div>
        <div className="absolute right-[24%] top-[68%] petal-drift">
          <Petal className="h-4 w-4" />
        </div>
        <div className="absolute left-[70%] bottom-[8%] petal-drift">
          <Petal className="h-5 w-5" />
        </div>
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 md:py-10">
        <div className="w-full max-w-6xl rounded-[32px] border border-white/40 bg-[#F2E8E5]/88 px-5 py-8 shadow-[0_20px_60px_rgba(120,100,100,0.08)] backdrop-blur-[2px] sm:px-8 md:px-10 md:py-10 lg:px-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#8B7C92] sm:text-sm">
                Softly Bold
              </p>

              <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                <div className="h-px w-12 bg-[#D8CFE8]" />
                <MiniLeaf className="h-5 w-5" />
                <div className="h-px w-12 bg-[#D8CFE8]" />
              </div>

              <h1 className="mx-auto mb-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:mx-0 lg:text-6xl">
                You’re allowed to be soft and still be strong.
              </h1>

              <div className="mx-auto max-w-2xl text-[15px] leading-7 text-[#575757] sm:text-base sm:leading-8 lg:mx-0">
                <p>
                  You know what feels right for you, but when it comes to speaking up,
                  it can feel uncomfortable — and you’re still learning how to do it
                  without losing your softness.
                </p>
              </div>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  onClick={() => handleScenarioClick(scenarios[0])}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D8CFE8] px-6 py-3 text-base font-medium text-[#4A4352] transition duration-300 hover:-translate-y-[1px] hover:opacity-95"
                >
                  Start Practicing
                  <span>→</span>
                </button>

                <button
                  onClick={() => handleScenarioClick(scenarios[1])}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D8CFE8] bg-white/35 px-6 py-3 text-base font-medium text-[#4A4352] transition duration-300 hover:bg-white/50"
                >
                  Explore Scenarios
                  <span>→</span>
                </button>
              </div>
            </div>

            <div>
              <div className="mb-4 text-center lg:text-left">
                <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
                  Start with a moment that feels familiar
                </h2>
                <p className="text-sm leading-6 text-[#6B6B6B] md:text-base">
                  Choose a moment that feels familiar, and gently practice so your
                  body feels safer — and the real moment feels a little less
                  overwhelming.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {scenarios.map((scenario) => {
                  const isActive = selectedScenario?.id === scenario.id;

                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleScenarioClick(scenario)}
                      className={`rounded-[26px] border p-5 text-left shadow-sm transition ${
                        isActive
                          ? "border-[#CBBBE1] bg-white/75 shadow-md"
                          : "border-white/30 bg-[#F7F3EF]/80 hover:-translate-y-[2px] hover:bg-white/60 hover:shadow-md"
                      }`}
                    >
                      <h3 className="mb-2 text-base font-semibold leading-6">
                        {scenario.title}
                      </h3>
                      <p className="text-[13px] leading-5 text-[#5A5A5A]">
                        {scenario.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedScenario && (
            <div className="mt-8 rounded-[28px] border border-white/40 bg-[#F7F3EF]/75 p-6 shadow-sm">
              <div className="mb-4">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#8B7C92]">
                  Practice area
                </p>
                <h3 className="mb-2 text-2xl font-semibold">
                  {selectedScenario.title}
                </h3>
                <p className="mb-3 max-w-3xl text-sm leading-6 text-[#666666] md:text-base">
                  {selectedScenario.prompt}
                </p>
                <p className="text-sm italic leading-6 text-[#7A7272]">
                  There’s no perfect response — just try what feels true to you.
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write the response you wish you could say in that moment..."
                  className="min-h-[140px] w-full rounded-[24px] border border-[#E7DDDA] bg-white/80 px-5 py-4 text-[15px] text-[#3A3A3A] outline-none transition placeholder:text-[#9A9191] focus:border-[#D8CFE8]"
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleGetFeedback}
                    disabled={!response.trim() || isLoading}
                    className="rounded-full bg-[#D8CFE8] px-6 py-3 text-sm font-medium text-[#4A4352] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showFeedback ? "Refresh feedback" : "Get gentle feedback"}
                  </button>

                  {showFeedback && (
                    <button
                      onClick={handleGetFeedback}
                      disabled={!response.trim() || isLoading}
                      className="rounded-full border border-[#D8CFE8] bg-white/40 px-6 py-3 text-sm font-medium text-[#4A4352] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Rewrite again
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setResponse("");
                      setShowFeedback(false);
                      setApiFeedback(null);
                      setApiError("");
                    }}
                    className="rounded-full border border-[#D8CFE8] bg-transparent px-6 py-3 text-sm font-medium text-[#4A4352] transition hover:bg-white/50"
                  >
                    Clear
                  </button>
                </div>

                {showFeedback && (
                  <div className="rounded-[24px] border border-[#E8DEEA] bg-[#FCFAFD] p-5">
                    <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#8B7C92]">
                      Gentle reflection
                    </p>

                    {isLoading && (
                      <p className="text-sm leading-7 text-[#5A5A5A] md:text-[15px]">
                        Just a moment — shaping something that feels more like you.
                      </p>
                    )}

                    {!isLoading && apiError && (
                      <p className="text-sm leading-7 text-[#5A5A5A] md:text-[15px]">
                        {apiError}
                      </p>
                    )}

                    {!isLoading && apiFeedback && (
                      <div className="space-y-4 text-sm leading-7 text-[#5A5A5A] md:text-[15px]">
                        <div>
                          <p className="mb-1 font-semibold text-[#4A4352]">
                            What this response feels like
                          </p>
                          <p>{apiFeedback.reflection}</p>
                        </div>

                        <div>
                          <p className="mb-1 font-semibold text-[#4A4352]">
                            A clearer way to say it
                          </p>
                          <p>{apiFeedback.gentle_reframe}</p>
                        </div>

                        <div>
                          <p className="mb-1 font-semibold text-[#4A4352]">
                            Try saying this
                          </p>
                          <p>{apiFeedback.practice_line}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FlowerBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 180" className={className} fill="none">
      <path d="M18 175C28 140 45 98 82 32" stroke="#C8B9A6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M45 120C35 116 28 111 22 103" stroke="#C8B9A6" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M57 94C48 88 41 82 36 73" stroke="#C8B9A6" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M69 70C60 64 54 57 50 48" stroke="#C8B9A6" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="22" cy="103" rx="8" ry="4" transform="rotate(-35 22 103)" fill="#D9D2C6" />
      <ellipse cx="36" cy="74" rx="8" ry="4" transform="rotate(-35 36 74)" fill="#D9D2C6" />
      <ellipse cx="50" cy="49" rx="8" ry="4" transform="rotate(-35 50 49)" fill="#D9D2C6" />
      <circle cx="84" cy="34" r="10" fill="#F3D1D1" />
      <circle cx="94" cy="28" r="9" fill="#F7DBDB" />
      <circle cx="76" cy="24" r="9" fill="#F8D8D8" />
      <circle cx="87" cy="18" r="8" fill="#F2CACA" />
      <circle cx="87" cy="29" r="4" fill="#E7B7B7" />
    </svg>
  );
}

function LavenderStem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 180" className={className} fill="none">
      <path d="M35 170C36 126 43 78 60 20" stroke="#BBAF9F" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 44C45 48 40 54 36 62" stroke="#BBAF9F" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M59 62C49 66 43 73 39 82" stroke="#BBAF9F" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M64 81C54 86 49 94 45 102" stroke="#BBAF9F" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="58" cy="28" rx="5" ry="9" transform="rotate(20 58 28)" fill="#CDBCE3" />
      <ellipse cx="53" cy="40" rx="5" ry="9" transform="rotate(20 53 40)" fill="#D8CFE8" />
      <ellipse cx="48" cy="53" rx="5" ry="9" transform="rotate(20 48 53)" fill="#CFC0E4" />
      <ellipse cx="44" cy="67" rx="5" ry="9" transform="rotate(20 44 67)" fill="#D7C7E8" />
      <ellipse cx="40" cy="81" rx="5" ry="9" transform="rotate(20 40 81)" fill="#CDBCE3" />
    </svg>
  );
}

function BigFlowerStem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" className={className} fill="none">
      <path d="M28 190C42 154 50 116 50 78" stroke="#BFAF9F" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M48 140C59 137 68 130 75 120" stroke="#BFAF9F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 166C32 163 25 157 20 147" stroke="#BFAF9F" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="76" cy="121" rx="10" ry="5" transform="rotate(-25 76 121)" fill="#D9D2C6" />
      <ellipse cx="18" cy="147" rx="10" ry="5" transform="rotate(25 18 147)" fill="#D9D2C6" />
      <circle cx="50" cy="78" r="16" fill="#F4C8D2" />
      <circle cx="35" cy="83" r="14" fill="#F6D4DA" />
      <circle cx="63" cy="88" r="14" fill="#F9D8DE" />
      <circle cx="40" cy="64" r="14" fill="#F7D4D8" />
      <circle cx="60" cy="64" r="14" fill="#F3C6CF" />
      <circle cx="50" cy="77" r="6" fill="#E7BAC3" />
    </svg>
  );
}

function CherryBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 260" className={className} fill="none">
      <path d="M35 245C70 205 90 148 102 60" stroke="#C8B9A6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M80 178C61 165 46 149 36 130" stroke="#C8B9A6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M93 154C112 143 126 127 136 106" stroke="#C8B9A6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 105C86 92 77 77 72 59" stroke="#C8B9A6" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="36" cy="129" rx="8" ry="4" transform="rotate(-35 36 129)" fill="#DBD3C8" />
      <ellipse cx="137" cy="106" rx="8" ry="4" transform="rotate(35 137 106)" fill="#DBD3C8" />
      <ellipse cx="72" cy="59" rx="8" ry="4" transform="rotate(-25 72 59)" fill="#DBD3C8" />
      <circle cx="102" cy="61" r="15" fill="#F6D4D8" />
      <circle cx="86" cy="69" r="13" fill="#F8DADF" />
      <circle cx="117" cy="74" r="13" fill="#F4CBD2" />
      <circle cx="92" cy="47" r="13" fill="#F7D7DB" />
      <circle cx="114" cy="47" r="13" fill="#F3C3CA" />
      <circle cx="103" cy="61" r="5" fill="#E7B3BC" />
    </svg>
  );
}

function SmallBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 120" className={className} fill="none">
      <path d="M20 110C28 85 40 62 62 22" stroke="#C8B9A6" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="62" cy="22" r="7" fill="#F4D1D8" />
      <circle cx="69" cy="18" r="6" fill="#F8DFE2" />
      <circle cx="55" cy="16" r="6" fill="#F5D6DA" />
      <circle cx="62" cy="11" r="6" fill="#F2C7D0" />
    </svg>
  );
}

function TulipStem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 100" className={className} fill="none">
      <path d="M30 92C33 71 36 53 35 30" stroke="#B9AF9E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M34 61C27 58 22 52 19 46" stroke="#B9AF9E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M36 65C43 61 48 55 51 48" stroke="#B9AF9E" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M35 28C29 18 24 15 21 22C18 28 24 38 35 43C46 38 52 28 49 22C46 15 41 18 35 28Z"
        fill="#F3C7D1"
      />
    </svg>
  );
}

function SmallLavender({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 90" className={className} fill="none">
      <path d="M24 86C25 66 31 44 43 12" stroke="#BDAE9F" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="42" cy="18" rx="4" ry="7" transform="rotate(18 42 18)" fill="#D8CFE8" />
      <ellipse cx="38" cy="28" rx="4" ry="7" transform="rotate(18 38 28)" fill="#CDBCE3" />
      <ellipse cx="34" cy="39" rx="4" ry="7" transform="rotate(18 34 39)" fill="#D7C7E8" />
    </svg>
  );
}

function Petal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={className} fill="none">
      <path d="M15 6C20 10 21 16 15 22C9 16 10 10 15 6Z" fill="#EFCAD8" />
    </svg>
  );
}

function MiniLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <path d="M7 20H33" stroke="#CBBFE0" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="15" cy="16" rx="4" ry="7" transform="rotate(-35 15 16)" fill="#D8CFE8" />
      <ellipse cx="21" cy="23" rx="4" ry="7" transform="rotate(25 21 23)" fill="#D1C2E6" />
      <ellipse cx="27" cy="16" rx="4" ry="7" transform="rotate(35 27 16)" fill="#CBBBE1" />
    </svg>
  );
}
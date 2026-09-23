import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Cpu,
  Gauge,
  Headphones,
  LayoutDashboard,
  Mic,
  Mic2,
  MoreHorizontal,
  Network,
  Pause,
  Play,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  SlidersHorizontal,
  Sparkles,
  Square,
  UserRound,
  Users,
  Volume2,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const latencyData = [
  { time: "10:01", latency: 462 },
  { time: "10:02", latency: 438 },
  { time: "10:03", latency: 451 },
  { time: "10:04", latency: 425 },
  { time: "10:05", latency: 446 },
  { time: "10:06", latency: 418 },
  { time: "10:07", latency: 428 },
  { time: "10:08", latency: 411 },
  { time: "10:09", latency: 432 },
  { time: "10:10", latency: 406 },
];

const emotionData = [
  { time: "10:01", arousal: 62, valence: -30 },
  { time: "10:02", arousal: 69, valence: -42 },
  { time: "10:03", arousal: 74, valence: -51 },
  { time: "10:04", arousal: 81, valence: -63 },
  { time: "10:05", arousal: 87, valence: -72 },
  { time: "10:06", arousal: 82, valence: -66 },
  { time: "10:07", arousal: 76, valence: -57 },
  { time: "10:08", arousal: 71, valence: -48 },
];

const sessions = [
  {
    id: "SES-8F21",
    time: "Today, 10:42",
    duration: "08:42",
    emotion: "Panicked",
    latency: "428 ms",
    model: "Llama 3",
    status: "Active",
  },
  {
    id: "SES-8F20",
    time: "Today, 09:51",
    duration: "12:18",
    emotion: "Anxious",
    latency: "451 ms",
    model: "Llama 3",
    status: "Completed",
  },
  {
    id: "SES-8F19",
    time: "Today, 09:12",
    duration: "05:34",
    emotion: "Calm",
    latency: "392 ms",
    model: "Llama 3",
    status: "Completed",
  },
  {
    id: "SES-8F18",
    time: "Yesterday, 18:24",
    duration: "17:02",
    emotion: "Angry",
    latency: "518 ms",
    model: "Llama 3",
    status: "Completed",
  },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Live Session", icon: Radio },
  { label: "Conversations", icon: Headphones },
  { label: "Emotion Analytics", icon: Activity },
  { label: "Audio Pipeline", icon: Waves },
  { label: "Models", icon: Brain },
  { label: "Performance", icon: Gauge },
  { label: "Sessions", icon: Clock3 },
  { label: "Settings", icon: Settings },
];

const pipelineNodes = [
  { name: "Microphone", icon: Mic, latency: "—", status: "ready" },
  { name: "WebRTC", icon: Wifi, latency: "32 ms", status: "ready" },
  { name: "Silero VAD", icon: Signal, latency: "12 ms", status: "ready" },
  { name: "Faster-Whisper", icon: Waves, latency: "126 ms", status: "ready" },
  { name: "Wav2Vec2", icon: Activity, latency: "48 ms", status: "ready" },
  { name: "Context Engine", icon: Sparkles, latency: "—", status: "ready" },
  { name: "Llama 3", icon: Brain, latency: "184 ms", status: "ready" },
  { name: "XTTSv2", icon: Volume2, latency: "26 ms", status: "ready" },
  { name: "Audio Output", icon: Headphones, latency: "18 ms", status: "ready" },
];

function MetricCard({ icon: Icon, label, value, detail, accent = false }) {
  return (
    <div className={`metric-card ${accent ? "metric-card-accent" : ""}`}>
      <div className="metric-top">
        <div className="metric-icon">
          <Icon size={18} />
        </div>
        <span className="metric-label">{label}</span>
        <MoreHorizontal size={17} className="muted-icon" />
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{detail}</div>
    </div>
  );
}

function StatusDot({ status = "online" }) {
  return <span className={`status-dot ${status}`} />;
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Overview");
  const [sessionState, setSessionState] = useState("IDLE");
  const [muted, setMuted] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [sessionFilter, setSessionFilter] = useState("All");

  const isLive = sessionState !== "IDLE" && sessionState !== "ENDED";

  const filteredSessions = useMemo(() => {
    if (sessionFilter === "All") return sessions;
    return sessions.filter((session) => session.status === sessionFilter);
  }, [sessionFilter]);

  const startSession = () => {
    setSessionState("CONNECTING");

    setTimeout(() => {
      setSessionState("LISTENING");
    }, 900);
  };

  const pauseSession = () => {
    setSessionState((current) =>
      current === "LISTENING" ? "PROCESSING" : "LISTENING",
    );
  };

  const endSession = () => {
    setSessionState("ENDED");
  };

  const renderPage = () => {
    switch (activePage) {
      case "Live Session":
        return <LiveSessionPage />;
      case "Emotion Analytics":
        return <EmotionAnalyticsPage />;
      case "Audio Pipeline":
        return <AudioPipelinePage />;
      case "Models":
        return <ModelsPage />;
      case "Performance":
        return <PerformancePage />;
      case "Sessions":
        return <SessionsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return (
          <OverviewPage
            isLive={isLive}
            sessionState={sessionState}
            startSession={startSession}
            pauseSession={pauseSession}
            endSession={endSession}
            latencyData={latencyData}
            filteredSessions={filteredSessions}
            sessionFilter={sessionFilter}
            setSessionFilter={setSessionFilter}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Waves size={22} />
          </div>

          {!collapsed && (
            <div className="brand-copy">
              <strong>Auralis</strong>
              <span>Voice Intelligence</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">
            {!collapsed && "COMMAND CENTER"}
          </div>

          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => setActivePage(label)}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && label === "Live Session" && (
                <span className="nav-live-dot" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <StatusDot />
            {!collapsed && (
              <div>
                <strong>System Online</strong>
                <span>Auralis Engine v0.1</span>
              </div>
            )}
          </div>

          <button
            className="collapse-button"
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      <main className={`main-content ${collapsed ? "expanded" : ""}`}>
        <header className="topbar">
          <div className="breadcrumb">
            <span>Overview</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={17} />
              <input placeholder="Search..." />
              <kbd>⌘ K</kbd>
            </div>

            <button
              className="icon-button notification-button"
              onClick={() => setNotifications(0)}
            >
              <Bell size={18} />
              {notifications > 0 && <span>{notifications}</span>}
            </button>

            <div className="connection-pill">
              <StatusDot />
              <span>WebRTC Connected</span>
            </div>

            <button className="user-avatar">
              <UserRound size={17} />
            </button>
          </div>
        </header>

        <div className="page-content">{renderPage()}</div>
      </main>
    </div>
  );
}

function OverviewPage({
  isLive,
  sessionState,
  startSession,
  pauseSession,
  endSession,
  latencyData,
  filteredSessions,
  sessionFilter,
  setSessionFilter,
}) {
  return (
    <>
      <section className="hero-section">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" />
            REAL-TIME AI INFRASTRUCTURE
          </div>
          <h1>Real-Time Voice Intelligence</h1>
          <p>
            Emotion-aware voice-to-voice intelligence built for low-latency,
            full-duplex conversations.
          </p>
        </div>

        <div className="hero-actions">
          <button className="button primary" onClick={startSession}>
            <Play size={16} />
            Start Live Session
          </button>
          <button className="button secondary">
            <Clock3 size={16} />
            View Sessions
          </button>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard
          icon={Radio}
          label="Active Sessions"
          value="04"
          detail="↑ 2 from last hour"
          accent
        />
        <MetricCard
          icon={Zap}
          label="Average Latency"
          value="428 ms"
          detail="↓ 8.2% vs previous"
        />
        <MetricCard
          icon={Activity}
          label="Emotion Confidence"
          value="91.4%"
          detail="Wav2Vec2 acoustic model"
        />
        <MetricCard
          icon={Wifi}
          label="WebRTC Quality"
          value="Excellent"
          detail="RTT 18 ms · 0.2% loss"
        />
        <MetricCard
          icon={Volume2}
          label="Audio Processing"
          value="48 kHz"
          detail="Stereo · Opus 128 kbps"
        />
        <MetricCard
          icon={Brain}
          label="AI Model"
          value="Llama 3"
          detail="Local runtime · Ollama"
        />
      </section>

      <section className="main-grid">
        <div className="panel live-panel">
          <PanelHeader
            title="Live Voice Session"
            subtitle="Full-duplex real-time monitoring"
            icon={Radio}
            live={isLive}
          />

          <div className={`live-session-card ${isLive ? "active" : ""}`}>
            {!isLive && sessionState !== "ENDED" ? (
              <EmptySessionState startSession={startSession} />
            ) : (
              <ActiveSession
                sessionState={sessionState}
                pauseSession={pauseSession}
                endSession={endSession}
              />
            )}
          </div>
        </div>

        <div className="panel emotion-panel">
          <PanelHeader
            title="Emotion Intelligence"
            subtitle="Acoustic emotion classification"
            icon={Activity}
          />

          <div className="emotion-main">
            <div className="emotion-badge">PANICKED</div>
            <div className="emotion-description">
              High arousal <span>•</span> Negative valence
            </div>

            <div className="emotion-bars">
              <ProgressRow label="Arousal" value="87%" progress={87} />
              <ProgressRow label="Valence" value="-72%" progress={72} negative />
              <ProgressRow label="Confidence" value="91%" progress={91} />
            </div>
          </div>

          <div className="probabilities">
            {[
              ["Panicked", 0.74],
              ["Anxious", 0.14],
              ["Angry", 0.07],
              ["Neutral", 0.03],
              ["Calm", 0.02],
            ].map(([name, value]) => (
              <div className="probability-row" key={name}>
                <span>{name}</span>
                <div className="probability-track">
                  <span style={{ width: `${value * 100}%` }} />
                </div>
                <strong>{Math.round(value * 100)}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="main-grid">
        <div className="panel">
          <PanelHeader
            title="Context Engine"
            subtitle="Reasoning context for the current turn"
            icon={Sparkles}
            status="Streaming"
          />

          <div className="context-card">
            <div className="context-row">
              <span>Model</span>
              <strong>Llama 3</strong>
            </div>
            <div className="context-row">
              <span>Runtime</span>
              <strong>Ollama · Local</strong>
            </div>
            <div className="context-row">
              <span>Scenario</span>
              <strong>Crisis Negotiation Training</strong>
            </div>
            <div className="context-row">
              <span>Emotion Context</span>
              <span className="tag negative">High arousal / Negative</span>
            </div>
            <div className="context-row">
              <span>Turn</span>
              <strong>#14</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <PanelHeader
            title="AI Response"
            subtitle="Streaming response generation"
            icon={Brain}
            status="Streaming"
          />

          <div className="response-box">
            <div className="response-text">
              “I hear you. Take a breath with me. You don't need to make any
              decisions right now. Let's take this one step at a time.”
            </div>

            <div className="response-meta">
              <span>LLAMA 3</span>
              <span>TTFT 184 ms</span>
              <span>42 tokens</span>
            </div>

            <div className="mini-waveform">
              {Array.from({ length: 54 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    height: `${12 + ((index * 17) % 28)}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel voice-panel">
        <PanelHeader
          title="Voice Generation"
          subtitle="XTTSv2 streaming synthesis"
          icon={Volume2}
          status="Ready"
        />

        <div className="voice-grid">
          <div>
            <span className="field-label">VOICE</span>
            <strong>Calm Assistant</strong>
          </div>
          <div>
            <span className="field-label">STYLE</span>
            <strong>Reassuring</strong>
          </div>
          <div>
            <span className="field-label">EMOTION</span>
            <strong>Calm · Low intensity</strong>
          </div>
          <div>
            <span className="field-label">CHUNKS</span>
            <strong>08 generated</strong>
          </div>
          <div>
            <span className="field-label">LATENCY</span>
            <strong>26 ms</strong>
          </div>
          <div className="voice-progress">
            <div className="progress-header">
              <span>Generation progress</span>
              <strong>76%</strong>
            </div>
            <div className="progress-track">
              <span style={{ width: "76%" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="panel pipeline-panel">
        <PanelHeader
          title="Real-Time Processing Pipeline"
          subtitle="Streaming data path from microphone to generated voice"
          icon={Network}
          live={isLive}
        />

        <div className="pipeline">
          {pipelineNodes.map((node, index) => {
            const Icon = node.icon;

            return (
              <div className="pipeline-wrapper" key={node.name}>
                <div className={`pipeline-node ${isLive ? "processing" : ""}`}>
                  <div className="pipeline-icon">
                    <Icon size={17} />
                  </div>
                  <strong>{node.name}</strong>
                  <span>{node.latency}</span>
                  <div className="pipeline-status">
                    <StatusDot />
                    Ready
                  </div>
                </div>

                {index < pipelineNodes.length - 1 && (
                  <div className={`pipeline-connector ${isLive ? "flow" : ""}`}>
                    <ChevronRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="main-grid">
        <div className="panel chart-panel">
          <PanelHeader
            title="End-to-End Latency"
            subtitle="Last 10 minutes · target under 800 ms"
            icon={Activity}
            value="428 ms"
          />

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity={0.3} />
                    <stop offset="100%" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis domain={[350, 850]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="latency"
                  strokeWidth={2}
                  fill="url(#latencyGradient)"
                />
                <Line
                  type="monotone"
                  dataKey={() => 800}
                  strokeDasharray="5 5"
                  dot={false}
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel breakdown-panel">
          <PanelHeader
            title="Processing Breakdown"
            subtitle="Current session"
            icon={BarChart3}
            value="446 ms"
          />

          <div className="breakdown-list">
            {[
              ["WebRTC", "32 ms"],
              ["Silero VAD", "12 ms"],
              ["Whisper", "126 ms"],
              ["Emotion", "48 ms"],
              ["LLM TTFT", "184 ms"],
              ["XTTS", "26 ms"],
              ["Network", "18 ms"],
            ].map(([name, value]) => (
              <div className="breakdown-row" key={name}>
                <span>{name}</span>
                <div className="breakdown-track">
                  <span
                    style={{
                      width: `${Math.min((parseInt(value) / 184) * 100, 100)}%`,
                    }}
                  />
                </div>
                <strong>{value}</strong>
              </div>
            ))}

            <div className="breakdown-total">
              <span>Total</span>
              <strong>446 ms</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel sessions-panel">
        <PanelHeader
          title="Recent Sessions"
          subtitle="Latest voice intelligence sessions"
          icon={Clock3}
          action="View all"
        />

        <div className="filter-row">
          {["All", "Active", "Completed", "Failed"].map((filter) => (
            <button
              key={filter}
              className={`filter-button ${
                sessionFilter === filter ? "selected" : ""
              }`}
              onClick={() => setSessionFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <SessionTable sessions={filteredSessions} />
      </section>

      <section className="main-grid">
        <SystemHealth />
        <LiveEvents />
      </section>
    </>
  );
}

function EmptySessionState({ startSession }) {
  return (
    <div className="empty-session">
      <div className="empty-orb">
        <Mic2 size={34} />
      </div>
      <h3>No active voice session</h3>
      <p>
        Start a live session to monitor voice, emotion, reasoning, and generated
        audio in real time.
      </p>
      <button className="button primary" onClick={startSession}>
        <Mic size={16} />
        Start Session
      </button>
    </div>
  );
}

function ActiveSession({ sessionState, pauseSession, endSession }) {
  const statusText = {
    CONNECTING: "Connecting to WebRTC gateway...",
    LISTENING: "Listening for speech",
    PROCESSING: "Processing audio",
    AI_THINKING: "AI generating response",
    AI_SPEAKING: "AI speaking",
    INTERRUPTED: "AI interrupted",
    ERROR: "Session error",
    ENDED: "Session ended",
  };

  return (
    <div className="active-session">
      <div className="session-live-header">
        <div>
          <div className="live-indicator">
            <StatusDot />
            LIVE
          </div>
          <h3>{statusText[sessionState]}</h3>
        </div>

        <span className="session-id">SES-8F21</span>
      </div>

      <div className="big-waveform">
        {Array.from({ length: 76 }).map((_, index) => (
          <span
            key={index}
            style={{
              height: `${15 + Math.abs(Math.sin(index * 0.55)) * 65}px`,
            }}
          />
        ))}
      </div>

      <div className="session-stats">
        <div>
          <span>INPUT RMS</span>
          <strong>-18.4 dB</strong>
        </div>
        <div>
          <span>SAMPLE RATE</span>
          <strong>48 kHz</strong>
        </div>
        <div>
          <span>MICROPHONE</span>
          <strong>Connected</strong>
        </div>
        <div>
          <span>LATENCY</span>
          <strong>428 ms</strong>
        </div>
      </div>

      <div className="session-controls">
        <button className="button secondary" onClick={pauseSession}>
          {sessionState === "PROCESSING" ? <Play size={16} /> : <Pause size={16} />}
          {sessionState === "PROCESSING" ? "Resume" : "Pause"}
        </button>
        <button className="button danger" onClick={endSession}>
          <Square size={15} />
          End Session
        </button>
      </div>
    </div>
  );
}

function LiveSessionPage() {
  return (
    <div>
      <PageHeading
        eyebrow="LIVE SESSION"
        title="Voice Command Center"
        subtitle="Monitor full-duplex voice intelligence in real time."
      />

      <div className="live-page-grid">
        <div className="panel live-monitor">
          <PanelHeader title="Audio Monitor" subtitle="Microphone input" icon={Mic} live />

          <div className="huge-waveform">
            {Array.from({ length: 100 }).map((_, index) => (
              <span
                key={index}
                style={{
                  height: `${10 + Math.abs(Math.sin(index * 0.31)) * 90}px`,
                }}
              />
            ))}
          </div>

          <div className="monitor-footer">
            <span>48 kHz</span>
            <span>STEREO</span>
            <span>OPUS</span>
            <span>128 KBPS</span>
          </div>
        </div>

        <div className="panel transcript-panel">
          <PanelHeader title="Live Transcription" subtitle="Faster-Whisper" icon={Waves} live />

          <div className="transcript">
            <div className="transcript-time">10:42:18</div>
            <p>
              I don't know what I'm supposed to do anymore. Everything is
              happening too fast.
            </p>
            <span className="partial">partial · 96% confidence</span>

            <div className="transcript-time">10:42:21</div>
            <p>
              Please just tell me what I should do next.
            </p>
            <span className="final">final · 98% confidence</span>
          </div>
        </div>

        <div className="panel live-emotion">
          <PanelHeader title="Emotion" subtitle="Wav2Vec2" icon={Activity} />

          <div className="large-emotion">
            <div className="emotion-badge">PANICKED</div>
            <strong>91%</strong>
            <span>confidence</span>
          </div>

          <ProgressRow label="Arousal" value="87%" progress={87} />
          <ProgressRow label="Valence" value="-72%" progress={72} negative />
        </div>

        <div className="panel ai-response-live">
          <PanelHeader title="AI Response" subtitle="Llama 3 · Streaming" icon={Brain} live />

          <p>
            “I hear you. Take a breath with me. You don't need to make any
            decisions right now. Let's take this one step at a time.”
          </p>

          <div className="mini-waveform">
            {Array.from({ length: 70 }).map((_, index) => (
              <span
                key={index}
                style={{
                  height: `${10 + ((index * 13) % 34)}px`,
                }}
              />
            ))}
          </div>

          <div className="response-meta">
            <span>TTFT 184 ms</span>
            <span>42 TOKENS</span>
            <span>XTTSv2</span>
          </div>
        </div>
      </div>

      <div className="session-command-bar">
        <button className="button secondary">
          <Pause size={16} />
          Pause
        </button>
        <button className="button secondary">
          <Mic size={16} />
          Mute
        </button>
        <button className="button secondary">
          <AlertCircle size={16} />
          Interrupt AI
        </button>
        <button className="button danger">
          <Square size={15} />
          End Session
        </button>
      </div>
    </div>
  );
}

function EmotionAnalyticsPage() {
  return (
    <>
      <PageHeading
        eyebrow="EMOTION ANALYTICS"
        title="Emotion Intelligence"
        subtitle="Track acoustic emotion, arousal, valence, and confidence over time."
      />

      <section className="metrics-grid four">
        <MetricCard icon={Activity} label="Dominant Emotion" value="Panicked" detail="74% probability" accent />
        <MetricCard icon={Zap} label="Avg Arousal" value="76%" detail="Last 10 sessions" />
        <MetricCard icon={SlidersHorizontal} label="Avg Valence" value="-48" detail="Negative range" />
        <MetricCard icon={ShieldCheck} label="Confidence" value="91.4%" detail="Wav2Vec2" />
      </section>

      <section className="panel chart-panel large-chart">
        <PanelHeader title="Arousal & Valence Timeline" subtitle="Current session · last 8 minutes" icon={Activity} />
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={emotionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[-100, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="arousal" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="valence" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="panel">
        <PanelHeader title="Emotion Distribution" subtitle="Across recent sessions" icon={BarChart3} />

        <div className="emotion-distribution">
          {[
            ["Panicked", 34],
            ["Anxious", 27],
            ["Calm", 18],
            ["Angry", 12],
            ["Neutral", 9],
          ].map(([name, value]) => (
            <div className="distribution-item" key={name}>
              <div className="distribution-head">
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>
              <div className="distribution-track">
                <span style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AudioPipelinePage() {
  return (
    <>
      <PageHeading
        eyebrow="AUDIO PIPELINE"
        title="Real-Time Audio Pipeline"
        subtitle="Inspect every stage of the voice processing path."
      />

      <section className="metrics-grid">
        <MetricCard icon={Volume2} label="Sample Rate" value="48 kHz" detail="Stereo PCM" />
        <MetricCard icon={Radio} label="Codec" value="Opus" detail="128 kbps" />
        <MetricCard icon={Signal} label="Packet Loss" value="0.2%" detail="WebRTC" />
        <MetricCard icon={Wifi} label="RTT" value="18 ms" detail="Gateway" />
        <MetricCard icon={Activity} label="Jitter" value="4.2 ms" detail="Stable" />
        <MetricCard icon={Mic} label="VAD" value="Active" detail="Silero" accent />
      </section>

      <section className="panel pipeline-large">
        <PanelHeader title="Signal Flow" subtitle="Audio processing architecture" icon={Network} />

        <div className="signal-flow">
          {pipelineNodes.map((node, index) => {
            const Icon = node.icon;

            return (
              <div className="signal-wrapper" key={node.name}>
                <div className="signal-node">
                  <Icon size={22} />
                  <strong>{node.name}</strong>
                  <span>{node.latency}</span>
                </div>
                {index < pipelineNodes.length - 1 && (
                  <div className="signal-arrow">
                    <ChevronRight />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="main-grid">
        <SystemHealth />
        <div className="panel">
          <PanelHeader title="Audio Configuration" subtitle="Current gateway settings" icon={Settings} />
          <div className="settings-list">
            <div><span>Input device</span><strong>Default Microphone</strong></div>
            <div><span>Channels</span><strong>2 · Stereo</strong></div>
            <div><span>Sample format</span><strong>Float32</strong></div>
            <div><span>Frame size</span><strong>20 ms</strong></div>
            <div><span>Buffer</span><strong>128 frames</strong></div>
          </div>
        </div>
      </section>
    </>
  );
}

function ModelsPage() {
  const models = [
    ["STT", "Faster-Whisper", "Streaming", "CPU", "126 ms", "ready", Waves],
    ["Emotion", "Wav2Vec2", "Acoustic", "CPU", "48 ms", "ready", Activity],
    ["Reasoning", "Llama 3", "Ollama", "Local", "184 ms", "ready", Brain],
    ["Voice", "XTTSv2", "Streaming TTS", "CPU", "26 ms", "ready", Volume2],
  ];

  return (
    <>
      <PageHeading
        eyebrow="MODEL REGISTRY"
        title="AI Models"
        subtitle="Runtime status and inference characteristics for the Auralis stack."
      />

      <div className="model-grid">
        {models.map(([type, name, runtime, device, latency, status, Icon]) => (
          <div className="panel model-card" key={type}>
            <div className="model-icon">
              <Icon size={22} />
            </div>
            <span className="model-type">{type}</span>
            <h3>{name}</h3>
            <div className="model-status">
              <StatusDot />
              Operational
            </div>
            <div className="model-details">
              <div><span>Runtime</span><strong>{runtime}</strong></div>
              <div><span>Device</span><strong>{device}</strong></div>
              <div><span>Latency</span><strong>{latency}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PerformancePage() {
  return (
    <>
      <PageHeading
        eyebrow="PERFORMANCE"
        title="System Performance"
        subtitle="Observe end-to-end streaming performance and resource utilization."
      />

      <div className="time-tabs">
        {["5m", "15m", "1h", "24h"].map((item, index) => (
          <button className={index === 0 ? "selected" : ""} key={item}>
            {item}
          </button>
        ))}
      </div>

      <section className="panel large-chart">
        <PanelHeader title="End-to-End Latency" subtitle="Target: < 800 ms" icon={Gauge} />
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={latencyData}>
            <defs>
              <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopOpacity={0.3} />
                <stop offset="100%" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="latency"
              strokeWidth={2}
              fill="url(#performanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <section className="metrics-grid">
        <MetricCard icon={Cpu} label="CPU" value="38%" detail="Average utilization" />
        <MetricCard icon={Activity} label="RAM" value="5.2 GB" detail="64% allocated" />
        <MetricCard icon={Zap} label="GPU" value="42%" detail="Inference workload" />
        <MetricCard icon={Network} label="Network" value="18 Mbps" detail="Current throughput" />
      </section>
    </>
  );
}

function SessionsPage() {
  return (
    <>
      <PageHeading
        eyebrow="SESSION HISTORY"
        title="Sessions"
        subtitle="Review recent real-time voice intelligence sessions."
      />
      <section className="panel sessions-panel">
        <PanelHeader title="All Sessions" subtitle="Session history" icon={Clock3} />
        <SessionTable sessions={sessions} />
      </section>
    </>
  );
}

function SettingsPage() {
  const groups = [
    ["Audio", "Microphone, sample rate, channels, codec"],
    ["AI", "LLM runtime, context window, streaming behavior"],
    ["Emotion", "Emotion model, confidence threshold, smoothing"],
    ["Voice", "XTTSv2 voice, style, emotion intensity"],
    ["WebRTC", "Gateway, ICE servers, bitrate, connection policy"],
  ];

  return (
    <>
      <PageHeading
        eyebrow="SYSTEM SETTINGS"
        title="Settings"
        subtitle="Configure the Auralis real-time intelligence stack."
      />

      <section className="settings-grid">
        {groups.map(([title, description], index) => (
          <div className="panel setting-card" key={title}>
            <div className="setting-icon">
              {index === 0 && <Volume2 size={20} />}
              {index === 1 && <Brain size={20} />}
              {index === 2 && <Activity size={20} />}
              {index === 3 && <Mic size={20} />}
              {index === 4 && <Wifi size={20} />}
            </div>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <ChevronRight size={18} className="muted-icon" />
          </div>
        ))}
      </section>
    </>
  );
}

function SystemHealth() {
  const systems = [
    ["WebRTC Gateway", "Operational", "18 ms"],
    ["Faster-Whisper", "Operational", "126 ms"],
    ["Silero VAD", "Operational", "12 ms"],
    ["Wav2Vec2", "Operational", "48 ms"],
    ["Ollama / Llama 3", "Operational", "184 ms"],
    ["XTTSv2", "Operational", "26 ms"],
  ];

  return (
    <div className="panel">
      <PanelHeader title="System Health" subtitle="Auralis infrastructure" icon={ShieldCheck} />

      <div className="health-list">
        {systems.map(([name, status, latency]) => (
          <div className="health-row" key={name}>
            <StatusDot />
            <span>{name}</span>
            <strong>{status}</strong>
            <small>{latency}</small>
          </div>
        ))}
      </div>

      <div className="resource-grid">
        <div>
          <span>CPU</span>
          <strong>38%</strong>
        </div>
        <div>
          <span>RAM</span>
          <strong>5.2 GB</strong>
        </div>
        <div>
          <span>GPU</span>
          <strong>42%</strong>
        </div>
      </div>
    </div>
  );
}

function LiveEvents() {
  const events = [
    ["10:42:21", "Final transcript received", "STT"],
    ["10:42:21", "Emotion updated: Panicked", "EMOTION"],
    ["10:42:22", "LLM response streaming", "LLM"],
    ["10:42:22", "XTTS chunk 08 generated", "TTS"],
    ["10:42:23", "Audio packet delivered", "WEBRTC"],
  ];

  return (
    <div className="panel">
      <PanelHeader title="Live Events" subtitle="Latest processing events" icon={Activity} />

      <div className="events-list">
        {events.map(([time, event, type]) => (
          <div className="event-row" key={`${time}-${event}`}>
            <span className="event-time">{time}</span>
            <span className="event-line" />
            <div>
              <strong>{event}</strong>
              <span>{type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionTable({ sessions: sessionRows }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>SESSION</th>
            <th>TIME</th>
            <th>DURATION</th>
            <th>EMOTION</th>
            <th>AVG LATENCY</th>
            <th>MODEL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {sessionRows.map((session) => (
            <tr key={session.id}>
              <td>
                <strong>{session.id}</strong>
              </td>
              <td>{session.time}</td>
              <td>{session.duration}</td>
              <td>
                <span className="emotion-chip">{session.emotion}</span>
              </td>
              <td>{session.latency}</td>
              <td>{session.model}</td>
              <td>
                <span className={`status-chip ${session.status.toLowerCase()}`}>
                  <StatusDot />
                  {session.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProgressRow({ label, value, progress, negative = false }) {
  return (
    <div className="progress-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className={`progress-track ${negative ? "negative" : ""}`}>
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function PanelHeader({
  title,
  subtitle,
  icon: Icon,
  status,
  live,
  value,
  action,
}) {
  return (
    <div className="panel-header">
      <div className="panel-heading">
        <div className="panel-icon">
          <Icon size={17} />
        </div>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="panel-header-right">
        {live && (
          <span className="streaming-indicator">
            <StatusDot />
            LIVE
          </span>
        )}
        {status && <span className="header-status">{status}</span>}
        {value && <strong className="header-value">{value}</strong>}
        {action && <button className="text-button">{action}</button>}
      </div>
    </div>
  );
}

function PageHeading({ eyebrow, title, subtitle }) {
  return (
    <section className="page-heading">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

export default App;
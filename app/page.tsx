import Link from "next/link"
import { cookies } from "next/headers"
import { AppLogo } from "@/components/shared/app-logo"

const clients = [
  { initial: "M", name: "Maeve O'Sullivan", id: "CLI-00142", visit: "May 04, 2026", treatment: "Microneedling", status: "Active" },
  { initial: "J", name: "Jamila Rahman", id: "CLI-00141", visit: "Apr 28, 2026", treatment: "Glycolic 30%", status: "Follow-up" },
  { initial: "T", name: "Theo Larsson", id: "CLI-00140", visit: "Apr 22, 2026", treatment: "Hydrafacial", status: "Active" },
  { initial: "P", name: "Priya Venkatesan", id: "CLI-00139", visit: "Apr 18, 2026", treatment: "LED Therapy", status: "Active" },
  { initial: "R", name: "Renée Brouillard", id: "CLI-00138", visit: "Apr 11, 2026", treatment: "TCA 15% Peel", status: "Follow-up" },
  { initial: "S", name: "Sade Adeyemi", id: "CLI-00137", visit: "Apr 09, 2026", treatment: "Consultation", status: "New" },
]

const faqItems = [
  {
    question: "Is Skincare Dossier compliant with HIPAA?",
    answer:
      "Yes. All records are encrypted at rest with per-practice keys, transmitted over TLS 1.3, and our infrastructure provider signs a BAA. Audit logging is included on every plan.",
    open: true,
  },
  {
    question: "Can I import existing client records?",
    answer:
      "Of course. Drag in a CSV, connect Mindbody or Vagaro for one-click sync, or let us help with a free assisted migration if your records live somewhere stranger. Most practices are fully ported in under an hour.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "You own it. One click produces a PDF dossier per client and a full JSON archive of your account. We hold a soft-delete copy for 30 days in case you change your mind, then it's gone for good.",
  },
  {
    question: "Do you charge per client?",
    answer: "Never. Every plan includes unlimited clients and unlimited cases. You're paying for practitioner seats, not the size of your book.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Skincare Dossier is a progressive web app — it installs to your phone or iPad home screen and works the way a native app does, including offline access to recent client cards. Native iOS and Android apps are on the roadmap for late 2026.",
  },
]

function AppSidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-1 bg-lp-bg-soft border-r border-lp-rule-soft py-[22px] px-4">
      <div className="flex items-center gap-2.5 px-2 pb-[18px] font-serif text-lg border-b border-lp-rule-soft mb-3">
        <span className="lp-brand-mark-sm" />
        Dossier
      </div>
      <a className="flex items-center gap-2.5 py-2 px-2.5 rounded-[7px] bg-lp-bg-card text-lp-ink font-medium" href="#">
        <span className="lp-icon lp-icon-active" />
        Clients
      </a>
      <a className="flex items-center gap-2.5 py-2 px-2.5 rounded-[7px] text-lp-ink-3" href="#">
        <span className="lp-icon lp-icon-circle" />
        Calendar
      </a>
      <a className="flex items-center gap-2.5 py-2 px-2.5 rounded-[7px] text-lp-ink-3" href="#">
        <span className="lp-icon lp-icon-line" />
        Notes
      </a>
      <a className="flex items-center gap-2.5 py-2 px-2.5 rounded-[7px] text-lp-ink-3" href="#">
        <span className="lp-icon" />
        Inventory
      </a>
      <a className="flex items-center gap-2.5 py-2 px-2.5 rounded-[7px] text-lp-ink-3" href="#">
        <span className="lp-icon lp-icon-circle" />
        Reports
      </a>
      <a className="flex items-center gap-2.5 py-2 px-2.5 rounded-[7px] text-lp-ink-3" href="#">
        <span className="lp-icon" />
        Settings
      </a>
    </aside>
  )
}

export default async function HomePage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("better-auth.session_token")

  return (
    <div className="landing scroll-smooth bg-lp-bg text-lp-ink leading-[1.55]">
      {/* === NAV === */}
      <header className="lp-nav-bg sticky top-0 z-50 backdrop-blur-[14px] border-b border-transparent">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8 flex items-center justify-between h-[68px]">
          <Link href="/" className="flex items-center gap-2.5 font-serif text-[22px] tracking-tight">
            <AppLogo />
          </Link>
          <nav className="hidden min-[820px]:flex items-center gap-9 text-sm text-lp-ink-2" aria-label="Main">
            <a href="#features" className="transition-colors hover:text-lp-ink">
              Features
            </a>
            <a href="#workflow" className="transition-colors hover:text-lp-ink">
              Workflow
            </a>
            <a href="#pricing" className="transition-colors hover:text-lp-ink">
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-lp-ink">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none whitespace-nowrap bg-lp-ink text-lp-bg hover:bg-lp-accent-ink transition-all duration-150"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none whitespace-nowrap text-lp-ink-2 hover:text-lp-ink transition-all duration-150"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none whitespace-nowrap bg-lp-ink text-lp-bg hover:bg-lp-accent-ink transition-all duration-150"
                >
                  Start free trial <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* === HERO === */}
      <section className="pt-12 pb-6 md:pt-[72px] md:pb-10 relative">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 py-2 px-3.5 border border-lp-rule rounded-full bg-lp-bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-lp-accent" />
            Now in private beta — Spring 2026
          </span>

          <h1 className="lp-text-hero font-serif mt-7 font-normal max-w-[1000px] text-balance">
            The dossier <em className="italic text-lp-accent-ink">your practice</em>
            <br />
            has always deserved.
          </h1>

          <p className="mt-7 text-[19px] leading-[1.5] text-lp-ink-2 max-w-[560px] text-pretty">
            Skincare Dossier turns scattered notes, printouts, and inherited spreadsheets into a single, calm record of every client and every
            treatment. Built for cosmetologists and medical-spa practitioners who care about the details.
          </p>

          <div className="mt-9 flex items-center gap-3.5 flex-wrap">
            <a
              className="group inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none whitespace-nowrap bg-lp-ink text-lp-bg hover:bg-lp-accent-ink transition-all duration-150"
              href="#cta"
            >
              Start 30-day trial <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              className="inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none whitespace-nowrap border border-lp-rule text-lp-ink bg-lp-bg-card hover:border-lp-ink transition-all duration-150"
              href="#preview"
            >
              Watch a 90-second tour
            </a>
          </div>

          <div className="mt-[18px] text-[13px] text-lp-ink-3 flex items-center gap-4 flex-wrap">
            <span>No credit card required</span>
            <span className="w-[3px] h-[3px] rounded-full bg-lp-ink-4" />
            <span>HIPAA-ready</span>
            <span className="w-[3px] h-[3px] rounded-full bg-lp-ink-4" />
            <span>Imports from CSV, Mindbody, Vagaro</span>
          </div>

          {/* Product Preview */}
          <div className="mt-[72px] max-md:mt-12 relative" id="preview">
            <div className="lp-preview-shadow rounded-[18px] bg-lp-bg-card border border-lp-rule overflow-hidden">
              {/* Titlebar */}
              <div className="flex items-center py-3.5 px-[18px] border-b border-lp-rule-soft gap-4">
                <div className="flex gap-[7px]">
                  <span className="w-[11px] h-[11px] rounded-full bg-lp-rule" />
                  <span className="w-[11px] h-[11px] rounded-full bg-lp-rule" />
                  <span className="w-[11px] h-[11px] rounded-full bg-lp-rule" />
                </div>
                <div className="flex-1 text-center font-mono text-xs text-lp-ink-3 tracking-wide">dossier.app / dr-mira-chen</div>
                <div className="w-[46px]" />
              </div>

              {/* Tabs */}
              <div className="flex gap-1 py-3 px-[18px] border-b border-lp-rule-soft bg-lp-bg-soft">
                <button className="py-2 px-3.5 text-[13px] text-lp-ink font-medium rounded-lg bg-lp-bg-card shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                  Client Directory
                </button>
                <button className="py-2 px-3.5 text-[13px] text-lp-ink-3 font-medium rounded-lg hover:text-lp-ink transition-colors">
                  Treatment Timeline
                </button>
                <button className="py-2 px-3.5 text-[13px] text-lp-ink-3 font-medium rounded-lg hover:text-lp-ink transition-colors">Add Case</button>
              </div>

              {/* Stage */}
              <div className="h-[620px] max-md:h-[480px] overflow-hidden relative">
                {/* DIRECTORY PANE (active) */}
                <div className="absolute inset-0 opacity-100 transition-opacity duration-350">
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] h-full text-[13px]">
                    <AppSidebar />
                    <main className="py-7 px-8 overflow-hidden">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-serif text-[28px] tracking-tight font-normal m-0">
                          Clients <span className="text-lp-ink-4 text-lg">— 142</span>
                        </h2>
                        <div className="flex items-center gap-2 py-2 px-3.5 bg-lp-bg-soft border border-lp-rule-soft rounded-full text-xs text-lp-ink-3 min-w-[220px]">
                          <span className="lp-search-icon" />
                          Search clients, treatments…
                        </div>
                      </div>
                      <div className="grid grid-cols-2 min-[920px]:grid-cols-3 gap-4">
                        {clients.map((c) => (
                          <article
                            key={c.id}
                            className="bg-lp-bg-card border border-lp-rule-soft rounded-xl p-5 transition-all duration-200 hover:border-lp-ink-4 hover:-translate-y-px"
                          >
                            <div className="flex items-center gap-3 mb-3.5">
                              <div className="w-10 h-10 rounded-full bg-lp-accent-soft text-lp-accent-ink grid place-items-center font-serif text-base">
                                {c.initial}
                              </div>
                              <div>
                                <p className="font-medium text-lp-ink text-sm leading-tight m-0">{c.name}</p>
                                <p className="font-mono text-[11px] text-lp-ink-3 tracking-wide mt-0.5 m-0">{c.id}</p>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs py-1.5">
                              <span className="text-lp-ink-3">Last visit</span>
                              <span className="text-lp-ink-2 tabular-nums">{c.visit}</span>
                            </div>
                            <div className="flex justify-between text-xs py-1.5 border-t border-lp-rule-soft">
                              <span className="text-lp-ink-3">Last treatment</span>
                              <span className="text-lp-ink-2 tabular-nums">{c.treatment}</span>
                            </div>
                            <div className="flex justify-between text-xs py-1.5 border-t border-lp-rule-soft">
                              <span className="text-lp-ink-3">Status</span>
                              <span className="inline-block py-0.5 px-2 rounded-full text-[11px] bg-lp-accent-soft text-lp-accent-ink font-medium">
                                {c.status}
                              </span>
                            </div>
                          </article>
                        ))}
                      </div>
                    </main>
                  </div>
                </div>

                {/* TIMELINE PANE (hidden) */}
                <div className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-350">
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] h-full text-[13px]">
                    <AppSidebar />
                    <main className="py-7 px-8 overflow-y-auto">
                      <div className="flex items-start gap-5 pb-[22px] mb-[26px] border-b border-lp-rule-soft">
                        <div className="w-14 h-14 rounded-full bg-lp-accent-soft text-lp-accent-ink grid place-items-center font-serif text-[22px]">
                          M
                        </div>
                        <div>
                          <h2 className="font-serif text-[32px] tracking-tight font-normal m-0">Maeve O&apos;Sullivan</h2>
                          <div className="text-lp-ink-3 text-xs mt-1 font-mono tracking-wide">CLI-00142 · 8 sessions · Onboarded Jan 2025</div>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <button className="inline-flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-medium border border-lp-rule text-lp-ink bg-lp-bg-card hover:border-lp-ink transition-all">
                            Export PDF
                          </button>
                          <button className="inline-flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-medium bg-lp-ink text-lp-bg hover:bg-lp-accent-ink transition-all">
                            + Add Case
                          </button>
                        </div>
                      </div>
                      <div className="lp-timeline">
                        <div className="lp-timeline-item lp-timeline-item-recent">
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-lp-ink-3">May 04, 2026 — Session 8</div>
                          <div className="mt-2 bg-lp-bg-card border border-lp-rule-soft rounded-[10px] py-4 px-[18px]">
                            <h3 className="m-0 mb-1.5 text-sm font-medium">Microneedling, 0.75mm depth — cheeks &amp; jawline</h3>
                            <p className="m-0 text-[13px] text-lp-ink-2 leading-[1.55]">
                              Skin tolerated treatment well; minimal erythema post-session. Continued improvement in fine textural concerns along
                              zygomatic region. Discussed gradual depth progression for next visit.
                            </p>
                            <div className="flex gap-1.5 mt-2.5 flex-wrap">
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                Microneedling
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                0.75mm
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                Follow-up 21d
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="lp-timeline-item">
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-lp-ink-3">Apr 06, 2026 — Session 7</div>
                          <div className="mt-2 bg-lp-bg-card border border-lp-rule-soft rounded-[10px] py-4 px-[18px]">
                            <h3 className="m-0 mb-1.5 text-sm font-medium">Glycolic acid 30% — full face</h3>
                            <p className="m-0 text-[13px] text-lp-ink-2 leading-[1.55]">
                              Standard 4-minute neutralization. Slight frosting on perioral region; client reports mild peeling on day 3. Sunscreen
                              compliance excellent.
                            </p>
                            <div className="flex gap-1.5 mt-2.5 flex-wrap">
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                Chemical Peel
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                Glycolic 30%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="lp-timeline-item">
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-lp-ink-3">Mar 11, 2026 — Session 6</div>
                          <div className="mt-2 bg-lp-bg-card border border-lp-rule-soft rounded-[10px] py-4 px-[18px]">
                            <h3 className="m-0 mb-1.5 text-sm font-medium">Hydrafacial — Signature protocol</h3>
                            <p className="m-0 text-[13px] text-lp-ink-2 leading-[1.55]">
                              Three-step cleanse, extract, hydrate. Notable improvement in pore congestion along T-zone. Recommended at-home
                              niacinamide 5%.
                            </p>
                            <div className="flex gap-1.5 mt-2.5 flex-wrap">
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                Hydrafacial
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.06em] py-[3px] px-2 rounded bg-lp-bg-soft text-lp-ink-2 border border-lp-rule-soft">
                                Maintenance
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>

                {/* ADD CASE PANE (hidden) */}
                <div className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-350">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] h-full">
                    <div className="hidden md:block bg-lp-bg-soft py-7 px-8 relative opacity-55">
                      <div className="flex items-start gap-5 pb-[22px] mb-[26px] border-b border-lp-rule-soft">
                        <div className="w-14 h-14 rounded-full bg-lp-accent-soft text-lp-accent-ink grid place-items-center font-serif text-[22px]">
                          M
                        </div>
                        <div>
                          <h2 className="font-serif text-[32px] tracking-tight font-normal m-0">Maeve O&apos;Sullivan</h2>
                          <div className="text-lp-ink-3 text-xs mt-1 font-mono tracking-wide">CLI-00142 · 7 sessions</div>
                        </div>
                      </div>
                      <div className="lp-timeline">
                        <div className="lp-timeline-item">
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-lp-ink-3">Apr 06, 2026 — Session 7</div>
                          <div className="mt-2 bg-lp-bg-card border border-lp-rule-soft rounded-[10px] py-4 px-[18px]">
                            <h3 className="m-0 mb-1.5 text-sm font-medium">Glycolic acid 30% — full face</h3>
                            <p className="m-0 text-[13px] text-lp-ink-2 leading-[1.55]">
                              Standard 4-minute neutralization. Slight frosting on perioral region; client reports mild peeling on day 3.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <aside className="bg-lp-bg-card border-l border-lp-rule py-6 px-6 overflow-y-auto">
                      <h3 className="font-serif text-[22px] tracking-tight font-normal m-0 mb-1">New case</h3>
                      <p className="text-xs text-lp-ink-3 mb-[22px]">Logging for Maeve O&apos;Sullivan · May 11, 2026</p>
                      <label className="block mb-3.5">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-lp-ink-3 mb-1.5">Treatment</span>
                        <input
                          className="w-full py-[9px] px-3 border border-lp-rule bg-lp-bg rounded-[7px] text-[13px] text-lp-ink font-sans focus:outline-2 focus:outline-lp-accent focus:-outline-offset-1 focus:border-transparent"
                          defaultValue="Microneedling — 0.75mm depth"
                        />
                      </label>
                      <label className="block mb-3.5">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-lp-ink-3 mb-1.5">Area</span>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="py-1.5 px-[11px] rounded-full text-xs bg-lp-ink text-lp-bg border border-lp-ink cursor-pointer">
                            Cheeks
                          </span>
                          <span className="py-1.5 px-[11px] rounded-full text-xs bg-lp-ink text-lp-bg border border-lp-ink cursor-pointer">
                            Jawline
                          </span>
                          <span className="py-1.5 px-[11px] rounded-full text-xs text-lp-ink-2 bg-lp-bg border border-lp-rule cursor-pointer">
                            Forehead
                          </span>
                          <span className="py-1.5 px-[11px] rounded-full text-xs text-lp-ink-2 bg-lp-bg border border-lp-rule cursor-pointer">
                            Neck
                          </span>
                          <span className="py-1.5 px-[11px] rounded-full text-xs text-lp-ink-2 bg-lp-bg border border-lp-rule cursor-pointer">
                            Décolleté
                          </span>
                        </div>
                      </label>
                      <label className="block mb-3.5">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-lp-ink-3 mb-1.5">Observations</span>
                        <textarea
                          className="w-full py-[9px] px-3 border border-lp-rule bg-lp-bg rounded-[7px] text-[13px] text-lp-ink font-sans min-h-[70px] resize-y focus:outline-2 focus:outline-lp-accent focus:-outline-offset-1 focus:border-transparent"
                          defaultValue="Skin tolerated treatment well; minimal erythema post-session. Continued improvement in fine textural concerns along zygomatic region."
                        />
                      </label>
                      <label className="block mb-3.5">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-lp-ink-3 mb-1.5">Follow-up</span>
                        <input
                          className="w-full py-[9px] px-3 border border-lp-rule bg-lp-bg rounded-[7px] text-[13px] text-lp-ink font-sans focus:outline-2 focus:outline-lp-accent focus:-outline-offset-1 focus:border-transparent"
                          defaultValue="21 days · Consultation"
                        />
                      </label>
                      <div className="flex justify-between mt-5 pt-4 border-t border-lp-rule-soft">
                        <button className="inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none text-lp-ink-2 hover:text-lp-ink transition-all duration-150">
                          Cancel
                        </button>
                        <button className="inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none bg-lp-ink text-lp-bg hover:bg-lp-accent-ink transition-all duration-150">
                          Save case
                        </button>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TRUST === */}
      <section className="py-14 border-t border-b border-lp-rule-soft bg-lp-bg-soft">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <div className="text-center font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 mb-8">
            Trusted at independent practices and modern medi-spas
          </div>
          <div className="flex items-center justify-between gap-6 flex-wrap opacity-70">
            <div className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-lp-ink-2">
              <span className="lp-logo-circle" />
              Maison Lumière
            </div>
            <div className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-lp-ink-2">
              <span className="lp-logo-square" />
              Atelier Derma
            </div>
            <div className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-lp-ink-2">
              <span className="lp-logo-triangle" />
              Northglow Spa
            </div>
            <div className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-lp-ink-2">
              <span className="lp-logo-circle" />
              Vellichor Skin
            </div>
            <div className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-lp-ink-2">
              <span className="lp-logo-square" />
              Praxis &amp; Co.
            </div>
            <div className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-lp-ink-2">
              <span className="lp-logo-circle" />
              The Esthetics Room
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="features" className="py-20 md:py-[110px] relative">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 flex items-center gap-2.5 mb-[26px]">
            <span className="text-lp-ink-4">01 ——</span>What&apos;s inside
          </div>
          <h2 className="lp-text-section font-serif font-normal m-0 text-balance">
            Every tool a practitioner needs.
            <br />
            <em className="italic text-lp-accent-ink">Nothing they don&apos;t.</em>
          </h2>
          <p className="mt-[22px] text-lg text-lp-ink-2 max-w-[600px] leading-[1.55] text-pretty">
            Four focused surfaces, each doing one thing exceptionally well. No bloated calendars, no aggressive upsells — just the quiet workhorse
            your bookings deserve.
          </p>

          {/* Feature grid */}
          <div className="mt-16 grid grid-cols-1 min-[800px]:grid-cols-2 gap-px bg-lp-rule border border-lp-rule rounded-2xl overflow-hidden">
            <article className="bg-lp-bg-card py-11 px-10">
              <div className="lp-feature-num-line font-mono text-[11px] tracking-[0.1em] text-lp-ink-4 mb-7">
                FEATURE 01<span className="text-lp-ink-3 font-medium">Authentication</span>
              </div>
              <div className="h-[110px] mb-7 flex items-center">
                <div className="lp-glyph-auth" />
              </div>
              <h3 className="font-serif text-[30px] tracking-tight font-normal m-0 mb-3.5 leading-[1.1]">Elegant, unobtrusive sign-in</h3>
              <p className="m-0 text-lp-ink-2 text-[15px] leading-[1.55] max-w-[420px]">
                SSO with Apple, Google, and Microsoft. Optional WebAuthn for shared workstations. Treatments are encrypted at rest with per-practice
                keys — your records, your custody.
              </p>
            </article>
            <article className="bg-lp-bg-card py-11 px-10">
              <div className="lp-feature-num-line font-mono text-[11px] tracking-[0.1em] text-lp-ink-4 mb-7">
                FEATURE 02<span className="text-lp-ink-3 font-medium">Directory</span>
              </div>
              <div className="h-[110px] mb-7 flex items-center">
                <div className="lp-glyph-grid">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              <h3 className="font-serif text-[30px] tracking-tight font-normal m-0 mb-3.5 leading-[1.1]">A searchable grid of client cards</h3>
              <p className="m-0 text-lp-ink-2 text-[15px] leading-[1.55] max-w-[420px]">
                Instant filter by treatment, contraindication, or last-visit window. Smart tags surface clients due for follow-up. Bulk imports from
                Mindbody, Vagaro, or plain CSV.
              </p>
            </article>
            <article className="bg-lp-bg-card py-11 px-10">
              <div className="lp-feature-num-line font-mono text-[11px] tracking-[0.1em] text-lp-ink-4 mb-7">
                FEATURE 03<span className="text-lp-ink-3 font-medium">Timeline</span>
              </div>
              <div className="h-[110px] mb-7 flex items-center">
                <div className="lp-glyph-timeline">
                  <span />
                  <span />
                  <span />
                  <em />
                  <em />
                  <em />
                </div>
              </div>
              <h3 className="font-serif text-[30px] tracking-tight font-normal m-0 mb-3.5 leading-[1.1]">A vertical feed of every visit</h3>
              <p className="m-0 text-lp-ink-2 text-[15px] leading-[1.55] max-w-[420px]">
                Observations, products used, depths, durations, and post-care notes — all on one continuous thread. Attach before/after imagery.
                Compare any two sessions side by side.
              </p>
            </article>
            <article className="bg-lp-bg-card py-11 px-10">
              <div className="lp-feature-num-line font-mono text-[11px] tracking-[0.1em] text-lp-ink-4 mb-7">
                FEATURE 04<span className="text-lp-ink-3 font-medium">Add Case</span>
              </div>
              <div className="h-[110px] mb-7 flex items-center">
                <div className="lp-glyph-add" />
              </div>
              <h3 className="font-serif text-[30px] tracking-tight font-normal m-0 mb-3.5 leading-[1.1]">Log a case without losing context</h3>
              <p className="m-0 text-lp-ink-2 text-[15px] leading-[1.55] max-w-[420px]">
                A focused slide-out keeps the client&apos;s history visible behind. Saved drafts persist per device. Voice-to-note transcription means
                you can log between treatments.
              </p>
            </article>
          </div>

          {/* Numbers */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-lp-rule border border-lp-rule rounded-2xl overflow-hidden">
            <div className="bg-lp-bg-card py-[30px] px-7">
              <div className="font-serif text-[52px] leading-none tracking-tight lining-nums tabular-nums">3:42</div>
              <div className="text-[13px] text-lp-ink-3 mt-2">Average time to log a complete case</div>
            </div>
            <div className="bg-lp-bg-card py-[30px] px-7">
              <div className="font-serif text-[52px] leading-none tracking-tight lining-nums tabular-nums">
                94<span className="text-[32px] text-lp-ink-3">%</span>
              </div>
              <div className="text-[13px] text-lp-ink-3 mt-2">Practitioners reporting fewer missed follow-ups</div>
            </div>
            <div className="bg-lp-bg-card py-[30px] px-7">
              <div className="font-serif text-[52px] leading-none tracking-tight lining-nums tabular-nums">12k+</div>
              <div className="text-[13px] text-lp-ink-3 mt-2">Treatment cases logged in beta</div>
            </div>
            <div className="bg-lp-bg-card py-[30px] px-7">
              <div className="font-serif text-[52px] leading-none tracking-tight lining-nums tabular-nums">0</div>
              <div className="text-[13px] text-lp-ink-3 mt-2">Per-client charges, ever</div>
            </div>
          </div>
        </div>
      </section>

      {/* === WORKFLOW === */}
      <section id="workflow" className="py-20 md:py-[110px] bg-lp-bg-soft border-t border-b border-lp-rule-soft">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 flex items-center gap-2.5 mb-[26px]">
            <span className="text-lp-ink-4">02 ——</span>A workflow that disappears
          </div>
          <h2 className="lp-text-section font-serif font-normal m-0 text-balance">
            From greeting to chart,
            <br />
            <em className="italic text-lp-accent-ink">in three deliberate steps.</em>
          </h2>
          <p className="mt-[22px] text-lg text-lp-ink-2 max-w-[600px] leading-[1.55] text-pretty">
            Most CRMs ask you to learn them. Skincare Dossier asks how you already work — then gets out of your way.
          </p>

          <div className="mt-16 grid">
            {/* Step 1 */}
            <div className="grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr_1fr] gap-10 py-9 border-t border-lp-rule items-start">
              <div className="font-serif text-[48px] leading-none text-lp-accent-ink italic">i</div>
              <div>
                <h3 className="font-serif text-[30px] font-normal tracking-tight mt-1.5 mb-3 m-0">Find them in a keystroke</h3>
                <p className="text-lp-ink-2 text-[15px] m-0 max-w-[380px]">
                  Open the directory, start typing. Fuzzy search across names, phone, treatment notes, and contraindications surfaces the right card
                  before you finish the first syllable.
                </p>
              </div>
              <div className="max-md:col-span-full bg-lp-bg-card border border-lp-rule rounded-xl p-[18px] font-mono text-xs text-lp-ink-3 min-h-[130px]">
                <div className="py-1 border-b border-dashed border-lp-rule-soft">
                  <span className="text-lp-ink-4">query</span> · <span className="text-lp-ink">&quot;maeve&quot;</span>
                </div>
                <div className="py-1 border-b border-dashed border-lp-rule-soft">
                  <span className="text-lp-ink-4">match</span> · <span className="text-lp-ink">Maeve O&apos;Sullivan · CLI-00142</span>
                </div>
                <div className="py-1">
                  <span className="text-lp-ink-4">load</span> · <span className="text-lp-ink">8 sessions · &lt; 80ms</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr_1fr] gap-10 py-9 border-t border-lp-rule items-start">
              <div className="font-serif text-[48px] leading-none text-lp-accent-ink italic">ii</div>
              <div>
                <h3 className="font-serif text-[30px] font-normal tracking-tight mt-1.5 mb-3 m-0">Open the timeline, glance the history</h3>
                <p className="text-lp-ink-2 text-[15px] m-0 max-w-[380px]">
                  One scroll covers a year. See last treatments, depths, peels, products, photos, and follow-up status — without clicking into
                  anything.
                </p>
              </div>
              <div className="max-md:col-span-full bg-lp-bg-card border border-lp-rule rounded-xl p-[18px] font-mono text-xs text-lp-ink-3 min-h-[130px]">
                <div className="py-1 border-b border-dashed border-lp-rule-soft">
                  <span className="text-lp-ink-4">recent</span> · <span className="text-lp-ink">Microneedling 0.75mm · 21d ago</span>
                </div>
                <div className="py-1 border-b border-dashed border-lp-rule-soft">
                  <span className="text-lp-ink-4">prior</span> · <span className="text-lp-ink">Glycolic 30% · 56d ago</span>
                </div>
                <div className="py-1">
                  <span className="text-lp-ink-4">contraindications</span> · <span className="text-lp-ink">None on file</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr_1fr] gap-10 py-9 border-t border-b border-lp-rule items-start">
              <div className="font-serif text-[48px] leading-none text-lp-accent-ink italic">iii</div>
              <div>
                <h3 className="font-serif text-[30px] font-normal tracking-tight mt-1.5 mb-3 m-0">Log the new case beside the old</h3>
                <p className="text-lp-ink-2 text-[15px] m-0 max-w-[380px]">
                  Pop the side panel, dictate observations, tag treatments, schedule the next follow-up. The client&apos;s history stays right next to
                  your hand the entire time.
                </p>
              </div>
              <div className="max-md:col-span-full bg-lp-bg-card border border-lp-rule rounded-xl p-[18px] font-mono text-xs text-lp-ink-3 min-h-[130px]">
                <div className="py-1 border-b border-dashed border-lp-rule-soft">
                  <span className="text-lp-ink-4">case</span> · <span className="text-lp-ink">Draft saved · 11:42</span>
                </div>
                <div className="py-1 border-b border-dashed border-lp-rule-soft">
                  <span className="text-lp-ink-4">treatment</span> · <span className="text-lp-ink">Microneedling · 0.75mm</span>
                </div>
                <div className="py-1">
                  <span className="text-lp-ink-4">follow-up</span> · <span className="text-lp-ink">Jun 01, 2026 · 21d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === QUOTE === */}
      <section className="py-20 md:py-[110px] bg-lp-ink text-lp-bg">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-bg/55 flex items-center gap-2.5 mb-[26px]">
            <span className="text-lp-bg/35">03 ——</span>From practitioners
          </div>
          <blockquote className="lp-text-quote font-serif font-normal m-0 text-balance max-w-[1000px]">
            &ldquo;I left a thousand-dollar booking suite for this.{" "}
            <em className="italic" style={{ color: "oklch(0.75 0.06 35)" }}>
              Dossier reads the way I think
            </em>{" "}
            — one client, one thread, every treatment in its proper place. My evenings are quieter now.&rdquo;
          </blockquote>
          <div className="mt-11 flex items-center gap-4 text-sm text-lp-bg/65">
            <div className="w-10 h-10 rounded-full bg-lp-bg/10 text-lp-bg grid place-items-center font-serif text-base">A</div>
            <div>
              <div className="text-lp-bg font-medium">Dr. Amara Okafor</div>
              <div>Owner · Vellichor Skin · Portland, OR</div>
            </div>
          </div>
        </div>
      </section>

      {/* === PRICING === */}
      <section id="pricing" className="py-20 md:py-[110px] relative">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 flex items-center gap-2.5 mb-[26px]">
            <span className="text-lp-ink-4">04 ——</span>Pricing
          </div>
          <h2 className="lp-text-section font-serif font-normal m-0 text-balance">
            Per practice, not per client.
            <br />
            <em className="italic text-lp-accent-ink">Predictable as a standing appointment.</em>
          </h2>
          <p className="mt-[22px] text-lg text-lp-ink-2 max-w-[600px] leading-[1.55] text-pretty">
            Flat monthly pricing. Unlimited clients on every plan. Cancel anytime — your dossier exports as PDF or JSON with one click.
          </p>

          <div className="mt-16 grid grid-cols-1 min-[800px]:grid-cols-3 gap-[18px]">
            {/* Solo */}
            <article className="bg-lp-bg-card border border-lp-rule rounded-[14px] py-8 px-7 pb-9 flex flex-col min-h-[460px]">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 mb-4">Solo</div>
              <div className="font-serif text-[64px] leading-none tracking-tight lining-nums tabular-nums">
                $24<span className="font-sans text-sm text-lp-ink-3 ml-1">/mo</span>
              </div>
              <div className="mt-3 text-sm text-lp-ink-3 min-h-[42px]">For independent cosmetologists running their own book.</div>
              <ul className="list-none pt-6 mt-6 border-t border-lp-rule-soft flex flex-col gap-3 flex-1 text-sm p-0">
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Unlimited clients &amp; cases
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Timeline &amp; case archive
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  CSV import / export
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Email follow-up reminders
                </li>
              </ul>
              <div className="mt-6">
                <a
                  className="w-full justify-center inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none border border-lp-rule text-lp-ink bg-lp-bg-card hover:border-lp-ink transition-all duration-150"
                  href="#cta"
                >
                  Start free trial
                </a>
              </div>
            </article>

            {/* Practice (featured) */}
            <article className="bg-lp-ink text-lp-bg border border-lp-ink rounded-[14px] py-8 px-7 pb-9 flex flex-col min-h-[460px] relative">
              <div className="absolute -top-3 left-7 bg-lp-accent text-lp-bg py-[5px] px-3 rounded-full font-mono text-[10px] uppercase tracking-[0.12em]">
                Most chosen
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-bg mb-4">Practice</div>
              <div className="font-serif text-[64px] leading-none tracking-tight lining-nums tabular-nums">
                $58<span className="font-sans text-sm text-lp-bg/55 ml-1">/mo</span>
              </div>
              <div className="mt-3 text-sm text-lp-bg/65 min-h-[42px]">For small studios with up to four practitioners on the floor.</div>
              <ul className="list-none pt-6 mt-6 border-t border-lp-bg/15 flex flex-col gap-3 flex-1 text-sm p-0">
                <li className="flex items-start gap-2.5 text-lp-bg/85">
                  <span className="lp-check" />
                  Everything in Solo
                </li>
                <li className="flex items-start gap-2.5 text-lp-bg/85">
                  <span className="lp-check" />
                  Up to 4 practitioner seats
                </li>
                <li className="flex items-start gap-2.5 text-lp-bg/85">
                  <span className="lp-check" />
                  Photo attachments &amp; comparisons
                </li>
                <li className="flex items-start gap-2.5 text-lp-bg/85">
                  <span className="lp-check" />
                  Voice-to-note transcription
                </li>
              </ul>
              <div className="mt-6">
                <a
                  className="group w-full justify-center inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none bg-lp-bg text-lp-ink hover:bg-lp-accent-soft transition-all duration-150"
                  href="#cta"
                >
                  Start free trial <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </article>

            {/* Clinic */}
            <article
              data-state="disabled"
              className="bg-lp-bg-card border border-lp-rule rounded-[14px] py-8 px-7 pb-9 flex flex-col min-h-[460px] data-[state=disabled]:opacity-40 data-[state=disabled]:pointer-events-none"
            >
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 mb-4">Clinic</div>
              <div className="font-serif text-[64px] leading-none tracking-tight lining-nums tabular-nums">
                $148<span className="font-sans text-sm text-lp-ink-3 ml-1">/mo</span>
              </div>
              <div className="mt-3 text-sm text-lp-ink-3 min-h-[42px]">For larger medi-spas with custom auth, audit, and reporting needs.</div>
              <ul className="list-none pt-6 mt-6 border-t border-lp-rule-soft flex flex-col gap-3 flex-1 text-sm p-0">
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Everything in Practice
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Unlimited practitioner seats
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  SSO &amp; audit log
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Custom intake forms
                </li>
                <li className="flex items-start gap-2.5 text-lp-ink-2">
                  <span className="lp-check" />
                  Priority support, 4h SLA
                </li>
              </ul>
              <div className="mt-6">
                <a
                  className="w-full justify-center inline-flex items-center gap-2 px-[18px] py-[11px] rounded-full text-sm font-medium leading-none border border-lp-rule text-lp-ink bg-lp-bg-card hover:border-lp-ink transition-all duration-150"
                  href="#cta"
                >
                  Talk to founders
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section id="faq" className="py-20 md:py-[110px] bg-lp-bg-soft border-t border-lp-rule-soft">
        <div className="max-w-[920px] mx-auto px-[22px] md:px-8">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-lp-ink-3 flex items-center gap-2.5 mb-[26px]">
            <span className="text-lp-ink-4">05 ——</span>Frequently asked
          </div>
          <h2 className="lp-text-section font-serif font-normal m-0">
            Answers, <em className="italic text-lp-accent-ink">quietly.</em>
          </h2>

          <div className="mt-12 border-t border-lp-rule">
            {faqItems.map((item) => (
              <div key={item.question} className={`border-b border-lp-rule ${item.open ? "lp-faq-open" : ""}`}>
                <button className="w-full text-left py-[26px] flex justify-between items-center gap-8 font-serif text-2xl tracking-tight leading-[1.2]">
                  <span>{item.question}</span>
                  <span className="lp-faq-ind" />
                </button>
                <div className="lp-faq-answer text-lp-ink-2 text-[15px] leading-relaxed max-w-[700px]">
                  <p className="m-0">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-[140px] text-center" id="cta">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <h2 className="lp-text-final font-serif font-normal m-0">
            A calmer
            <br />
            <em className="italic text-lp-accent-ink">practice</em> starts today.
          </h2>
          <p className="mt-7 mx-auto mb-9 text-lg text-lp-ink-2 max-w-[500px]">
            Thirty days, every feature, no credit card. Your dossier is waiting.
          </p>
          <div className="flex justify-center gap-3.5 flex-wrap">
            <a
              className="group inline-flex items-center gap-2 px-[22px] py-3.5 rounded-full text-[15px] font-medium leading-none bg-lp-ink text-lp-bg hover:bg-lp-accent-ink transition-all duration-150"
              href="#"
            >
              Create your account <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              className="inline-flex items-center gap-2 px-[22px] py-3.5 rounded-full text-[15px] font-medium leading-none border border-lp-rule text-lp-ink bg-lp-bg-card hover:border-lp-ink transition-all duration-150"
              href="#"
            >
              Book a 15-min demo
            </a>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-lp-rule pt-16 pb-12 bg-lp-bg-soft">
        <div className="max-w-[1240px] mx-auto px-[22px] md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">
            <div>
              <a href="#" className="flex items-center gap-2.5 font-serif text-[22px] tracking-tight">
                <span className="lp-brand-mark" />
                <span>Skincare Dossier</span>
              </a>
              <p className="font-serif text-xl tracking-tight text-lp-ink-2 mt-4 max-w-[320px] leading-[1.4]">
                A minimalist CRM for modern cosmetologists.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-lp-ink-3 font-medium m-0 mb-[18px]">Product</h4>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#features">
                Features
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#workflow">
                Workflow
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#pricing">
                Pricing
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                Changelog
              </a>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-lp-ink-3 font-medium m-0 mb-[18px]">Practice</h4>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                For solo
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                For medi-spa
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                Migration
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                Templates
              </a>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-lp-ink-3 font-medium m-0 mb-[18px]">Company</h4>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                About
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                Security
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                Contact
              </a>
              <a className="block py-[5px] text-sm text-lp-ink-2 hover:text-lp-ink" href="#">
                Press
              </a>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-lp-rule text-xs text-lp-ink-3 font-mono tracking-wide">
            <span>© 2026 Skincare Dossier, Inc.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-lp-ink">
                Privacy
              </a>
              <a href="#" className="hover:text-lp-ink">
                Terms
              </a>
              <a href="#" className="hover:text-lp-ink">
                BAA
              </a>
              <a href="#" className="hover:text-lp-ink">
                Status · all systems normal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

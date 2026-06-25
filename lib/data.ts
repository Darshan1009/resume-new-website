export const profile = {
  name: "DARSHAN SHINDE",
  title: "SOC Analyst & Aspiring Web-Application Pentester",
  location: "Mumbai, India",
  phone: "+91 8668541511",
  email: "Darshanshinde1009@gmail.com",
  linkedin: "https://www.linkedin.com/in/darshan-s-018259258/",
  github: "https://github.com/Darshan1009",
  portswigger: "https://portswigger.net/web-security/dashboard",
  tryhackme: "https://tryhackme.com/p/darshanshinde06032002",
  hackthebox:
    "https://profile.hackthebox.com/profile/019dde6a-4444-71c2-8b12-4a6330ed9705",
  resume: "/Darshan_Shinde_Resume.pdf",
  notice: "Immediate Joiner",
  summary:
    "Cybersecurity enthusiast with practical experience in SOC operations, SIEM monitoring, and vulnerability assessment. Skilled in log analysis, threat detection, and incident response using tools like CrowdStrike, Securonix, Wireshark, and Burp Suite. Active practitioner of web-app pentesting on PortSwigger labs and real-world scenarios.",
};

export type SectionId = "overview" | "breach-logs" | "cyber-labs" | "arsenal";

export interface NavItem {
  id: SectionId;
  code: string;
  label: string;
  slug: string;
  video: string;
  start?: number;
  loopEnd?: number;
}

export const navItems: NavItem[] = [
  {
    id: "overview",
    code: "01",
    label: "OVERVIEW",
    slug: "OPERATOR_ID.SYS",
    video: "/videos/1.mp4",
  },
  {
    id: "breach-logs",
    code: "02",
    label: "EXPERIENCE",
    slug: "EXPERIENCE.LOG",
    video: "/videos/2.mp4",
    start: 0,
    loopEnd: 6,
  },
  {
    id: "cyber-labs",
    code: "03",
    label: "CYBER LABS",
    slug: "PROJECTS.REPO",
    video: "/videos/3.mp4",
  },
  {
    id: "arsenal",
    code: "04",
    label: "SKILLS",
    slug: "SKILLS.CFG",
    video: "/videos/4.mp4",
  },
];

/* ============================================================
   EXPERIENCE — every internship, role, and simulation
   ============================================================ */
export const experience = [
  {
    role: "SOC Analyst Intern",
    company: "Orient Technologies",
    period: "Nov 2025 — May 2026",
    location: "On-site, Mumbai",
    tag: "INTERNSHIP",
    severity: "CRITICAL",
    summary:
      "Hands-on SOC operations internship — triaged alerts across Securonix & Seceon, learned CrowdStrike EDR workflows, and shadowed senior analysts on real incident response.",
    bullets: [
      "Triaged 300+ security alerts across SIEM platforms (Securonix, Seceon, Microsoft Sentinel) under senior analyst supervision.",
      "Assisted incident investigation, escalation, and ticket documentation throughout the Tier-1 workflow.",
      "Built hands-on exposure to CrowdStrike EDR for endpoint detection & response.",
      "Contributed to log analysis, threat-intel enrichment, and SOC playbook refinement.",
    ],
  },
  {
    role: "Cybersecurity Intern",
    company: "RD Infro Technology",
    period: "Dec 2024 — Jan 2025",
    location: "Remote",
    tag: "INTERNSHIP",
    severity: "HIGH",
    summary:
      "Analyzed 5+ GB of security logs, identified 15+ vulnerabilities, and contributed to threat analysis & incident response work.",
    bullets: [
      "Developed and uploaded a Cybersecurity project on GitHub as part of the internship.",
      "Analyzed 5+ GB of logs and identified 15+ vulnerabilities.",
      "Worked on network security solutions — threat analysis & incident response.",
      "Contributed to vulnerability assessment & penetration testing tasks.",
    ],
  },
  {
    role: "Business Development Executive",
    company: "Tanz Corp.",
    period: "Jun 2024 — Oct 2024",
    location: "Thane",
    tag: "INTERNSHIP",
    severity: "MEDIUM",
    summary:
      "Drove client engagement +20% and supervised the Thane division project end-to-end.",
    bullets: [
      "Increased client engagement by 20% through strategic negotiations and relationship management.",
      "Executed 3+ Memorandums of Understanding (MoUs), streamlining business partnerships.",
      "Closed 2+ high-value deals, driving revenue growth.",
      "Supervised and coordinated the Thane division project.",
    ],
  },
  {
    role: "Cyber Job Simulation",
    company: "Deloitte Australia (Forage)",
    period: "May 2024",
    location: "Virtual",
    tag: "SIMULATION",
    severity: "INFO",
    summary:
      "Read web activity logs and supported a client through a cyber security breach scenario.",
    bullets: [
      "Completed a job simulation involving reading web activity logs.",
      "Supported a client in a cyber security breach.",
      "Answered questions to identify suspicious user activity.",
    ],
  },
  {
    role: "Security Analyst Simulation",
    company: "Tata Consultancy Services (Forage)",
    period: "Jun 2025",
    location: "Virtual",
    tag: "SIMULATION",
    severity: "INFO",
    summary:
      "IAM-focused simulation with a Cybersecurity Consulting team — IAM principles and strategic alignment with business objectives.",
    bullets: [
      "Completed an IAM job simulation for Tata Consultancy Services.",
      "Acquired expertise in IAM principles, cybersecurity best practices, and strategic alignment.",
      "Delivered documentation and presentations on complex technical concepts.",
    ],
  },
];

/* ============================================================
   PROJECTS — featured first, then chronological
   ============================================================ */
export const projects = [
  {
    name: "Veridect XDR Intelligence Platform",
    repo: "shinde/veridect-xdr",
    period: "2025",
    stack: ["python", "flask", "llm/nlp", "osint", "elastic", "neo4j"],
    desc: "Cognitive security platform fusing misinformation detection, OSINT, and threat intelligence for SOC / CTI teams. Full intelligence lifecycle — collect, enrich, analyze, correlate, score, operationalize.",
    featured: true,
  },
  {
    name: "AI Phishing URL Detection",
    repo: "shinde/phish-detect-ai",
    period: "Dec 2024",
    stack: ["python", "flask", "scikit-learn", "bs4"],
    desc: "ML-powered system that analyzes URLs and classifies phishing vs. benign. Cyber threat intelligence applied to live URLs.",
  },
  {
    name: "Keylogger Detection System",
    repo: "shinde/keylogger-detect",
    period: "Dec 2024",
    stack: ["python", "pyhook", "pygetwindow", "tkinter"],
    desc: "Python-based detection engine that monitors processes and alerts the user when keylogger-like behavior is observed.",
  },
  {
    name: "AI-based Password Strength Predictor",
    repo: "shinde/password-strength-predictor",
    period: "Dec 2024",
    stack: ["python", "flask", "scikit-learn", "tf-idf"],
    desc: "ML-powered evaluator using Logistic Regression + TF-IDF. Real-time strength meter with actionable hardening tips — fully local, no data leaves the box.",
  },
  {
    name: "AI-Powered Cybersecurity Chatbot",
    repo: "shinde/cyber-chatbot",
    period: "May 2024",
    stack: ["python", "dialogflow", "flask", "nlp"],
    desc: "Interactive assistant delivering 100+ cybersecurity tips and instant answers to security-related questions.",
  },
  {
    name: "API Security Checker",
    repo: "shinde/api-sec-checker",
    period: "2025",
    stack: ["python", "requests", "owasp-api-top10"],
    desc: "Scanner identifying common API vulnerabilities — broken auth, BOLA, mass assignment, misconfiguration — mapped to OWASP API Top 10.",
  },
];

/* ============================================================
   ARSENAL — full SOC + VAPT toolchain a professional would carry
   (some hands-on, some studied / familiar — same as any real CV)
   ============================================================ */
export const arsenal = [
  {
    group: "SIEM / SOC PLATFORMS",
    items: [
      "Securonix",
      "Microsoft Sentinel",
      "Seceon",
      "Splunk Enterprise",
      "Elastic SIEM",
      "IBM QRadar",
    ],
  },
  {
    group: "EDR / XDR",
    items: [
      "CrowdStrike Falcon",
      "Microsoft Defender for Endpoint",
      "SentinelOne",
      "Carbon Black",
      "Trellix",
    ],
  },
  {
    group: "SOAR & INCIDENT MGMT",
    items: [
      "Splunk SOAR",
      "Cortex XSOAR",
      "IBM Resilient",
      "ServiceNow SIR",
      "JIRA",
    ],
  },
  {
    group: "DETECTION ENGINEERING",
    items: [
      "Sigma Rules",
      "YARA",
      "KQL (Kusto)",
      "SPL (Splunk)",
      "Sysmon",
      "Windows Event Logs",
    ],
  },
  {
    group: "VULNERABILITY MGMT & SCANNING",
    items: [
      "Tenable Nessus",
      "OpenVAS",
      "Qualys",
      "Rapid7 InsightVM",
      "Acunetix",
    ],
  },
  {
    group: "WEB APP PENTESTING (VAPT)",
    items: [
      "Burp Suite Pro",
      "OWASP ZAP",
      "sqlmap",
      "Nikto",
      "Nuclei",
      "Postman (API)",
      "Wfuzz",
      "ffuf",
    ],
  },
  {
    group: "NETWORK & RECON",
    items: ["Nmap", "Wireshark", "Masscan", "Zeek", "Suricata", "tcpdump"],
  },
  {
    group: "EXPLOITATION / POST-EXPLOITATION",
    items: [
      "Metasploit",
      "Mimikatz",
      "BloodHound",
      "Impacket",
      "CrackMapExec",
      "PowerSploit",
      "Empire C2",
    ],
  },
  {
    group: "OSINT & THREAT INTEL",
    items: [
      "Maltego",
      "Shodan",
      "VirusTotal",
      "URLscan.io",
      "AbuseIPDB",
      "AnyRun",
      "Hybrid Analysis",
      "MISP",
    ],
  },
  {
    group: "DFIR / FORENSICS",
    items: [
      "Volatility",
      "Autopsy",
      "FTK Imager",
      "Velociraptor",
      "Kibana",
      "Wireshark IR",
    ],
  },
  {
    group: "FRAMEWORKS & STANDARDS",
    items: [
      "MITRE ATT&CK",
      "MITRE D3FEND",
      "Cyber Kill Chain",
      "OWASP Top 10",
      "OWASP API Top 10",
      "OWASP ASVS",
      "NIST CSF",
      "ISO 27001",
    ],
  },
  {
    group: "CLOUD SECURITY",
    items: [
      "AWS Security",
      "Azure Sentinel",
      "GCP Security Center",
      "Prowler",
      "ScoutSuite",
    ],
  },
  {
    group: "LANGUAGES & SCRIPTING",
    items: ["Python", "JavaScript", "Bash", "PowerShell", "SQL", "HTML / CSS"],
  },
  { group: "DATABASES", items: ["MySQL", "PostgreSQL", "Elasticsearch"] },
  {
    group: "PRACTICE / CTF LABS",
    items: [
      "PortSwigger Web Security Academy",
      "HackTheBox",
      "TryHackMe",
      "VulnHub",
      "Root-Me",
    ],
  },
];

/* ============================================================
   EDUCATION, CERTIFICATIONS, ACHIEVEMENTS, HOBBIES
   ============================================================ */
export const education = [
  {
    degree: "B.E. Computer Science & Engineering (Cybersecurity)",
    org: "Mumbai University",
    period: "2022 — 2026",
    specialization: "Cybersecurity",
    focus: [
      "SOC Operations",
      "Web App Pentesting",
      "Threat Intel",
      "Network Security",
    ],
    featured: true,
  },
  {
    degree: "H.S.C — Maharashtra Board",
    org: "82.2%",
    period: "2020 — 2021",
  },
  {
    degree: "S.S.C — C.B.S.E Board",
    org: "83%",
    period: "2018 — 2019",
  },
];

export const certifications = [
  {
    name: "CEH v13",
    issuer: "EC-Council",
    note: "Certified Ethical Hacker",
  },
];

export const achievements = [
  "3rd Rank — MUTICON Research Paper Competition",
  "National & State-Level Chess Tournament Winner",
  "ISTE Working Committee — PR & Technical Domain",
  "TCET-TSDW Hospitality Working Team Member",
];

export const hobbies = [
  "Books",
  "Chess",
  "Table Tennis",
  "Carrom",
  "Tech Blogs",
  "Cyber News",
  "Travel",
  "Fitness",
];

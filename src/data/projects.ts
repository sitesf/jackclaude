export interface ProjectPlan {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface ProjectData {
  slug: string;
  number: string;
  name: string;
  category: string;
  accent: string;
  accentSoft: string;
  tagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroText: string;
  badge: string;
  features: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  plans?: ProjectPlan[];
  ctaTitle: string;
  ctaText: string;
}

export const projects: ProjectData[] = [
  {
    slug: 'niro',
    number: '01',
    name: 'NIRO Agent',
    category: 'Agent AI · WhatsApp',
    accent: '#8F5CFF',
    accentSoft: 'rgba(143,92,255,0.14)',
    tagline: 'Recepționerul AI care preia programări pe WhatsApp pentru service-uri auto, nonstop.',
    heroTitle: 'Agentul care face',
    heroHighlight: 'programări automat',
    heroText:
      'NIRO răspunde instant clienților pe WhatsApp, explică serviciile, preia cereri de programare și salvează automat toate datele într-un dashboard centralizat. Fără apeluri pierdute. Fără timp pierdut.',
    badge: 'Activ 24/7 pe WhatsApp',
    features: [
      { title: 'Răspuns instant', text: 'Clienții primesc răspuns imediat pe WhatsApp, indiferent de oră — ziua, noaptea sau în weekend.' },
      { title: 'Programări automate', text: 'Agentul colectează datele clientului, propune intervale libere și confirmă programarea automat.' },
      { title: 'Date centralizate', text: 'Toate programările sunt salvate automat în Google Sheets sau în CRM-ul service-ului.' },
      { title: 'Conversații naturale', text: 'NIRO folosește AI pentru a răspunde natural și profesionist, ca un coleg de echipă real.' },
      { title: 'Timp recuperat', text: 'Echipa nu mai pierde ore întregi cu apeluri repetitive și mesaje cu aceleași întrebări.' },
      { title: 'Zero aplicații noi', text: 'Clienții comunică direct pe aplicația pe care o folosesc deja — fără conturi, fără descărcări.' },
    ],
    steps: [
      { title: 'Clientul scrie pe WhatsApp', text: 'NIRO preia automat conversația imediat după primul mesaj.' },
      { title: 'Agentul colectează datele', text: 'Nume, mașină, problemă, data dorită — totul în mod conversațional.' },
      { title: 'Programarea este salvată', text: 'Informațiile ajung automat în Google Sheets sau în CRM.' },
      { title: 'Service-ul confirmă rapid', text: 'Echipa vede instant toate programările într-un singur loc.' },
    ],
    ctaTitle: 'Construiește-ți propriul recepționer AI',
    ctaText: 'Automatizează programările pe WhatsApp și transformă modul în care interacționezi cu clienții.',
  },
  {
    slug: 'neo',
    number: '02',
    name: 'NEO — Audit SEO',
    category: 'Unealtă AI · SEO',
    accent: '#3B82F6',
    accentSoft: 'rgba(59,130,246,0.14)',
    tagline: 'Auditul SEO gratuit care analizează orice site în câteva secunde și livrează un raport complet.',
    heroTitle: 'Audit SEO complet,',
    heroHighlight: 'gratuit și instant',
    heroText:
      'Introduci URL-ul site-ului, iar NEO analizează tot: viteză, structură, meta tags, cuvinte cheie și probleme tehnice. Primești un raport detaliat cu recomandări prioritizate, generat de AI, direct în browser.',
    badge: 'Raport generat în sub 60 de secunde',
    features: [
      { title: 'Scor SEO general', text: 'O notă clară de la 0 la 100 care îți arată instant starea site-ului tău.' },
      { title: 'Performanță reală', text: 'Analiză PageSpeed pe mobil și desktop: FCP, LCP, CLS și toate metricile care contează.' },
      { title: 'Probleme prioritizate', text: 'Fiecare problemă identificată primește o prioritate: critică, medie sau scăzută.' },
      { title: 'Recomandări AI', text: 'NEO interpretează datele și generează recomandări concrete, cu dificultate estimată.' },
      { title: 'Cuvinte cheie', text: 'Sugestii de cuvinte cheie relevante pentru domeniul și conținutul site-ului tău.' },
      { title: 'Pași următori', text: 'Un plan de acțiune clar, în ordine logică, pe care îl poți implementa imediat.' },
    ],
    steps: [
      { title: 'Introduci URL-ul', text: 'Orice site public poate fi analizat — al tău sau al concurenței.' },
      { title: 'NEO analizează', text: 'Performanță mobil + desktop, SEO tehnic, accesibilitate, bune practici.' },
      { title: 'AI interpretează', text: 'Datele brute devin un raport în limba română, ușor de înțeles.' },
      { title: 'Primești planul', text: 'Recomandări prioritizate și pașii următori, gata de implementat.' },
    ],
    ctaTitle: 'Vrei un raport complet și o strategie personalizată?',
    ctaText: 'Auditul automat este doar începutul. Pentru strategie SEO completă, hai să discutăm.',
  },
  {
    slug: 'hr',
    number: '03',
    name: 'HR Dashboard',
    category: 'Aplicație web · Recrutare AI',
    accent: '#5DA9FF',
    accentSoft: 'rgba(93,169,255,0.14)',
    tagline: 'Platformă de recrutare cu AI: candidați evaluați automat, interviuri programate, statistici live.',
    heroTitle: 'Recrutare modernă,',
    heroHighlight: 'condusă de AI',
    heroText:
      'Un dashboard complet pentru echipele de HR: candidații sunt evaluați și punctați automat de AI, interviurile se programează într-un calendar integrat, iar statisticile arată în timp real starea fiecărui post deschis.',
    badge: 'Evaluare automată a candidaților',
    features: [
      { title: 'Scoring AI', text: 'Fiecare CV primește automat un scor de potrivire pentru fiecare post deschis.' },
      { title: 'Listă de candidați', text: 'Filtrare, căutare și acțiuni rapide pe toți candidații, dintr-un singur ecran.' },
      { title: 'Calendar de interviuri', text: 'Programare pe zile și ore, cu vedere săptămânală pe desktop și zilnică pe mobil.' },
      { title: 'Statistici live', text: 'KPI-uri în timp real: candidați noi, interviuri programate, posturi active, rată de conversie.' },
      { title: 'Gestiune posturi', text: 'Creezi și administrezi posturile deschise, cu link public de aplicare pentru candidați.' },
      { title: '100% responsive', text: 'Interfață optimizată dedicat pentru mobil: navigare jos, carduri în loc de tabele.' },
    ],
    steps: [
      { title: 'Candidatul aplică', text: 'Prin link-ul public al postului, CV-ul intră direct în platformă.' },
      { title: 'AI evaluează', text: 'CV-ul este analizat și punctat automat față de cerințele postului.' },
      { title: 'HR decide rapid', text: 'Echipa vede top candidați, sumarele AI și programează interviul.' },
      { title: 'Totul măsurat', text: 'Statisticile arată live ce funcționează și unde se blochează procesul.' },
    ],
    ctaTitle: 'Vrei o aplicație internă construită pentru echipa ta?',
    ctaText: 'Dashboard-uri, automatizări și unelte interne — proiectate exact pe fluxul tău de lucru.',
  },
  {
    slug: 'stiri',
    number: '04',
    name: 'Știri AI',
    category: 'Platformă · Conținut automat',
    accent: '#B600A8',
    accentSoft: 'rgba(182,0,168,0.14)',
    tagline: 'Portal de știri actualizat zilnic, complet automat: AI-ul citește, traduce și publică singur.',
    heroTitle: 'Perspectivă globală,',
    heroHighlight: 'selecție inteligentă',
    heroText:
      'INA, redactorul AI, caută prin surse sigure, selectează cele mai importante știri din România și din lume, le traduce și le publică automat pe site, zi de zi — fără nicio intervenție umană.',
    badge: 'Actualizat zilnic, automat',
    features: [
      { title: 'Redactor AI', text: 'INA citește sute de surse, alege ce contează și scrie rezumate clare în română.' },
      { title: '8 categorii', text: 'Politică, economie, tehnologie, sport și altele — organizate și filtrabile.' },
      { title: 'Căutare instant', text: 'Caută în toate știrile publicate, cu rezultate filtrate în timp real.' },
      { title: 'Publicare automată', text: 'Pipeline complet automat: de la sursă la articol publicat, fără om în buclă.' },
      { title: 'Surse verificate', text: 'Fiecare știre păstrează linkul către sursa originală, pentru transparență.' },
      { title: 'Mereu proaspăt', text: 'Conținut nou în fiecare zi înseamnă vizitatori care revin și SEO care crește.' },
    ],
    steps: [
      { title: 'AI-ul scanează sursele', text: 'Sute de publicații verificate, monitorizate continuu.' },
      { title: 'Selectează esențialul', text: 'Doar știrile cu adevărat importante trec de filtru.' },
      { title: 'Traduce și rezumă', text: 'Conținut clar, în română, optimizat pentru citire rapidă.' },
      { title: 'Publică automat', text: 'Articolele apar pe site zilnic, fără intervenție manuală.' },
    ],
    ctaTitle: 'Vrei conținut care se scrie singur?',
    ctaText: 'Platforme de conținut automatizat cu AI — pentru publisheri, bloguri și branduri.',
  },
  {
    slug: 'alex',
    number: '05',
    name: 'Alex AI',
    category: 'Asistent AI · Automatizare',
    accent: '#6C63FF',
    accentSoft: 'rgba(108,99,255,0.14)',
    tagline: 'Asistentul AI care gestionează sarcini, răspunde clienților și învață fluxul tău de lucru.',
    heroTitle: 'El este Alex.',
    heroHighlight: 'Agentul tău AI, mereu disponibil',
    heroText:
      'Alex gestionează sarcini, răspunde la întrebări și învață fluxul tău de lucru — nonstop, fără efort. Se conectează la uneltele pe care le folosești deja și execută în timp ce tu te concentrezi pe ce contează.',
    badge: 'Online · Răspuns în sub 1 secundă',
    features: [
      { title: 'Conversație naturală', text: 'Alex înțelege contextul, memorează preferințele și răspunde ca un coechipier real.' },
      { title: 'Automatizare sarcini', text: 'De la programări la cercetare și introducere de date — Alex execută pentru tine.' },
      { title: 'Integrare perfectă', text: 'Notion, Slack, Gmail, Calendar și altele — un singur workflow unificat.' },
      { title: 'Memorie personalizată', text: 'Cu cât lucrezi mai mult cu Alex, cu atât devine mai bun pe stilul tău.' },
      { title: 'Demo interactiv', text: 'Testezi conversația direct pe pagină, înainte de orice angajament.' },
      { title: 'Personalizat pe afacere', text: 'Alex e configurat pe serviciile, tonul și clienții afacerii tale.' },
    ],
    steps: [
      { title: 'Discutăm nevoile', text: 'Înțelegem fluxul tău de lucru și ce vrei să automatizezi.' },
      { title: 'Configurăm Alex', text: 'Personalitate, cunoștințe și integrări — totul pe afacerea ta.' },
      { title: 'Testezi live', text: 'Rulezi conversații reale și ajustăm până e perfect.' },
      { title: 'Alex lucrează', text: 'Nonstop, fără pauze, fără concedii — și raportează tot.' },
    ],
    ctaTitle: 'Gata să-l angajezi pe Alex?',
    ctaText: 'Scrie-mi și configurăm Alex pentru afacerea ta, în mai puțin de o săptămână.',
  },
  {
    slug: 'sport',
    number: '06',
    name: 'Sport AI',
    category: 'Platformă · Predicții sportive AI',
    accent: '#22C55E',
    accentSoft: 'rgba(34,197,94,0.14)',
    tagline: 'Platformă de știri și predicții sportive, generate și validate 100% de AI.',
    heroTitle: 'Sursa ta de sport,',
    heroHighlight: 'validată de AI',
    heroText:
      'Un agent AI analizează meciuri, statistici și forma echipelor, generează predicții și un bilet zilnic, și publică automat știri sportive — totul actualizat continuu, fără intervenție umană.',
    badge: 'Predicții generate automat',
    features: [
      { title: 'Predicții AI', text: 'Agentul analizează zeci de meciuri și propune predicții cu nivel de risc estimat.' },
      { title: 'Bilet generat automat', text: 'Primești un bilet zilnic construit de AI, pe baza cotelor și a formei echipelor.' },
      { title: 'Știri sportive live', text: 'Articole sportive actualizate automat, organizate pe competiții și echipe.' },
      { title: 'Analiză de risc', text: 'Fiecare predicție primește o etichetă clară: risc scăzut, mediu sau ridicat.' },
      { title: 'Meciuri și cote', text: 'Listă de meciuri cu cote actualizate și context relevant pentru fiecare partidă.' },
      { title: 'Actualizat non-stop', text: 'Conținut nou zilnic înseamnă utilizatori care revin și SEO care crește.' },
    ],
    steps: [
      { title: 'AI-ul colectează datele', text: 'Meciuri, statistici, cote și formă recentă, din surse verificate.' },
      { title: 'Analizează și prezice', text: 'Modelul evaluează probabilitățile și construiește predicțiile.' },
      { title: 'Generează biletul', text: 'Un bilet zilnic, cu nivel de risc, gata de consultat.' },
      { title: 'Publică automat', text: 'Predicțiile și știrile apar pe site, fără intervenție manuală.' },
    ],
    ctaTitle: 'Vrei o platformă care se actualizează singură?',
    ctaText: 'Platforme de conținut și predicții automate cu AI — pentru sport, media sau nișa ta.',
  },
  {
    slug: 'logistik',
    number: '07',
    name: 'Logistik Auto',
    category: 'Site de prezentare · Service auto',
    accent: '#EF4444',
    accentSoft: 'rgba(239,68,68,0.14)',
    tagline: 'Site de prezentare pentru service auto, cu programări rapide prin telefon și WhatsApp.',
    heroTitle: 'Mașina ta,',
    heroHighlight: 'în mâini sigure',
    heroText:
      'Servicii complete de service auto în București: mecanică generală, diagnoză computerizată, tinichigerie și vopsitorie. Site rapid, orientat spre conversie, cu butoane de programare directă pe telefon și WhatsApp.',
    badge: 'Programări rapide prin WhatsApp',
    features: [
      { title: 'Programare directă', text: 'Butoane de apel și WhatsApp la îndemână — clientul programează în câteva secunde.' },
      { title: 'Servicii clare', text: 'Revizie, mecanică, diagnoză și tractări — fiecare serviciu prezentat clar.' },
      { title: 'Galerie de lucrări', text: 'Fotografii reale ale lucrărilor, pentru încredere și dovadă a calității.' },
      { title: 'Locație și Waze', text: 'Integrare cu harta și navigare directă cu Waze către service.' },
      { title: 'Recenzii Google', text: 'Buton de recenzie care trimite clienții direct către Google.' },
      { title: '100% responsive', text: 'Arată impecabil pe telefon — acolo unde caută majoritatea clienților.' },
    ],
    steps: [
      { title: 'Clientul intră pe site', text: 'Vede instant serviciile și butoanele de contact rapid.' },
      { title: 'Programează rapid', text: 'Un apel sau un mesaj WhatsApp, fără formulare complicate.' },
      { title: 'Confirmare directă', text: 'Service-ul răspunde și stabilește ora — prin canalul preferat.' },
      { title: 'Revine și recomandă', text: 'Experiență simplă = clienți care revin și lasă recenzii.' },
    ],
    ctaTitle: 'Vrei un site care aduce programări?',
    ctaText: 'Site-uri de prezentare rapide și orientate spre conversie — pentru service-uri și afaceri locale.',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

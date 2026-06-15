import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { PageLayout } from '../components/PageLayout';

/*
 * Pagini legale NEXAS — conținut conform GDPR / ePrivacy, adaptat din
 * documentația juridică a nexas.ro, în varianta premium a site-ului.
 */

const LegalShell: React.FC<{
  kicker: string;
  title: string;
  children: React.ReactNode;
}> = ({ kicker, title, children }) => (
  <PageLayout>
    <section className="px-5 sm:px-8 md:px-10 pt-14 sm:pt-20 pb-24">
      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0} duration={0.7} y={30} as="div" className="mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B600A8]">{kicker}</span>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(2.2rem,7vw,4.5rem)] mt-4">
            {title}
          </h1>
          <p className="text-[#D7E2EA]/50 text-sm mt-4">Ultima actualizare: 12 iunie 2026 · Versiunea 2.0</p>
          <div className="mt-6 rounded-2xl border border-[rgba(215,226,234,0.12)] bg-[#141414] p-5 text-[#D7E2EA]/70 font-light text-sm leading-relaxed">
            <strong className="text-[#D7E2EA] font-medium">Operator:</strong> NEXAS · București, România ·{' '}
            <a href="mailto:contact@nexas.ro" className="underline hover:text-[#D7E2EA]">contact@nexas.ro</a> ·{' '}
            <a href="tel:+40730858640" className="underline hover:text-[#D7E2EA]">+40 730 858 640</a>
          </div>
        </FadeIn>
        <div className="legal-content flex flex-col gap-8">{children}</div>
      </div>
    </section>
  </PageLayout>
);

const Sec: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <FadeIn delay={0} duration={0.6} y={20} as="section">
    <h2 className="text-[#D7E2EA] font-bold text-lg sm:text-xl mb-3">{title}</h2>
    <div className="text-[#D7E2EA]/65 font-light text-sm sm:text-base leading-relaxed flex flex-col gap-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_strong]:text-[#D7E2EA] [&_strong]:font-medium [&_a]:underline">
      {children}
    </div>
  </FadeIn>
);

export const PrivacyPage: React.FC = () => (
  <LegalShell kicker="GDPR · Art. 13 & 14" title="Politică de Confidențialitate">
    <Sec title="1. Ce date colectăm și de ce">
      <p>
        NEXAS colectează date cu caracter personal exclusiv atunci când ni le furnizezi în mod voluntar, prin
        formularul de contact sau prin comunicare directă (telefon, email, WhatsApp).
      </p>
      <p>
        <strong>Important:</strong> nu introduce în formularele site-ului sau în mesajele trimise către NEXAS date
        sensibile, precum CNP, date bancare, parole, date medicale sau informații confidențiale.
      </p>
      <ul>
        <li><strong>Nume și prenume</strong> — pentru a te adresa personalizat</li>
        <li><strong>Adresă de email</strong> — pentru a-ți răspunde la solicitare</li>
        <li><strong>Număr de telefon</strong> (opțional) — pentru contact rapid</li>
        <li><strong>Conținutul mesajului</strong> — pentru a înțelege solicitarea ta</li>
        <li><strong>Serviciul de interes</strong> — pentru a direcționa corect cererea</li>
      </ul>
      <p>
        Automat pot fi colectate: adresa IP (securitate), tipul de browser și sistemul de operare (optimizare
        tehnică) și paginile vizitate — prin cookie-uri analitice, doar cu consimțământul tău.
      </p>
    </Sec>
    <Sec title="2. Baza legală a prelucrării (Art. 6 GDPR)">
      <ul>
        <li><strong>Consimțământ [Art. 6(1)(a)]</strong> — pentru datele din formularul de contact și cookie-urile non-esențiale. Îl poți retrage oricând.</li>
        <li><strong>Interes legitim [Art. 6(1)(f)]</strong> — pentru securitatea site-ului și prevenirea fraudelor.</li>
        <li><strong>Executarea unui contract [Art. 6(1)(b)]</strong> — dacă devenim parteneri de afaceri.</li>
      </ul>
    </Sec>
    <Sec title="3. Cum folosim datele">
      <ul>
        <li>Răspundem la solicitările și întrebările tale</li>
        <li>Elaborăm oferte și estimări de preț</li>
        <li>Gestionăm relația contractuală (dacă există)</li>
        <li>Îmbunătățim serviciile și site-ul nostru</li>
        <li>Respectăm obligații legale</li>
      </ul>
      <p>
        <strong>Nu</strong> folosim datele tale pentru marketing fără consimțământ explicit separat. <strong>Nu</strong> vindem,
        nu închiriem și nu cedăm datele tale unor terțe părți în scopuri comerciale.
      </p>
    </Sec>
    <Sec title="4. Cui transmitem datele (destinatari)">
      <ul>
        <li><strong>Servicii de email</strong> — pentru trimiterea mesajelor din formularul de contact; transfer acoperit de Clauze Contractuale Standard (SCC), dacă serverele sunt în afara SEE.</li>
        <li><strong>Google Analytics / Google Ireland Limited</strong> — analiză de trafic, folosită doar după acceptarea cookie-urilor de analiză.</li>
        <li><strong>Google Apps Script / Google LLC</strong> — serviciu tehnic pentru procesarea unor cereri trimise prin formulare sau agenți AI.</li>
        <li><strong>Agenți AI integrați</strong> — mesajele introduse pot fi procesate prin servicii tehnice externe pentru generarea răspunsurilor.</li>
        <li><strong>WhatsApp / Meta Platforms</strong> — atunci când alegi să ne contactezi prin WhatsApp.</li>
        <li><strong>Echipa NEXAS</strong> implicată în gestionarea proiectelor.</li>
        <li><strong>Autorități publice</strong> — doar dacă suntem obligați legal.</li>
      </ul>
    </Sec>
    <Sec title="5. Transferuri internaționale">
      <p>
        Unele servicii tehnice (Google Apps Script, Google Analytics, WhatsApp sau alte servicii conectate) pot
        implica transferuri sau acces tehnic din afara Spațiului Economic European. În aceste cazuri folosim
        furnizori care declară mecanisme de protecție precum Clauzele Contractuale Standard adoptate de Comisia
        Europeană (Art. 46 GDPR), măsuri tehnice de securitate și politici proprii de confidențialitate.
      </p>
    </Sec>
    <Sec title="6. Cât timp păstrăm datele">
      <ul>
        <li><strong>Date din formularul de contact:</strong> maximum 24 de luni de la ultima interacțiune, dacă nu a rezultat un contract</li>
        <li><strong>Date contractuale:</strong> 5 ani de la finalizarea contractului (obligație legală fiscală)</li>
        <li><strong>Loguri de securitate (IP):</strong> 90 de zile</li>
        <li><strong>Cookie-uri analitice:</strong> conform Politicii de Cookies</li>
      </ul>
    </Sec>
    <Sec title="7. Drepturile tale (Art. 15–22 GDPR)">
      <ul>
        <li><strong>Dreptul de acces (Art. 15)</strong> — poți solicita o copie a datelor pe care le deținem despre tine</li>
        <li><strong>Dreptul la rectificare (Art. 16)</strong> — poți cere corectarea datelor inexacte</li>
        <li><strong>Dreptul la ștergere (Art. 17)</strong> — „dreptul de a fi uitat"</li>
        <li><strong>Dreptul la restricționarea prelucrării (Art. 18)</strong></li>
        <li><strong>Dreptul la portabilitatea datelor (Art. 20)</strong> — primești datele într-un format structurat</li>
        <li><strong>Dreptul la opoziție (Art. 21)</strong> — te poți opune prelucrării bazate pe interes legitim</li>
        <li><strong>Dreptul de a retrage consimțământul</strong> — oricând, la fel de ușor cum l-ai acordat</li>
      </ul>
      <p>
        Pentru exercitarea acestor drepturi, scrie-ne la{' '}
        <a href="mailto:contact@nexas.ro">contact@nexas.ro</a>. Răspundem în maximum 30 de zile. Ai și dreptul de a
        depune o plângere la ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>).
      </p>
    </Sec>
    <Sec title="8. Securitatea datelor">
      <p>
        Folosim conexiuni criptate (HTTPS/SSL), acces restricționat la date și furnizori cu standarde recunoscute de
        securitate. Nicio metodă de transmitere pe internet nu este însă 100% sigură; ne angajăm să te notificăm
        conform legii în cazul unui incident de securitate care îți afectează datele.
      </p>
    </Sec>
    <Sec title="9. Modificări ale politicii">
      <p>
        Putem actualiza această politică atunci când adăugăm sau eliminăm servicii. Data ultimei modificări este
        afișată în partea de sus a paginii. Modificările semnificative vor fi semnalate vizibil pe site.
      </p>
    </Sec>
  </LegalShell>
);

export const TermsPage: React.FC = () => (
  <LegalShell kicker="Termeni legali" title="Termeni și Condiții">
    <Sec title="1. Acceptarea termenilor">
      <p>
        Prin accesarea și utilizarea acestui site și a serviciilor NEXAS, confirmi că ai citit, înțeles și ești de
        acord cu acești Termeni și Condiții. Dacă nu ești de acord, te rugăm să nu utilizezi serviciile noastre.
      </p>
    </Sec>
    <Sec title="2. Serviciile oferite">
      <ul>
        <li>Creare și dezvoltare site-uri web de prezentare și magazine online</li>
        <li>Agenți AI, chatbot-uri și automatizări personalizate</li>
        <li>Integrări API între sisteme software</li>
        <li>Optimizare SEO și performanță web</li>
        <li>Gestionare Social Media și consultanță tehnică digitală</li>
      </ul>
      <p>
        Specificul fiecărui serviciu, livrabilele, termenele și prețul sunt stabilite prin ofertă scrisă acceptată de
        ambele părți înaintea începerii lucrărilor.
      </p>
    </Sec>
    <Sec title="3. Servicii AI și automatizări">
      <p>
        Răspunsurile generate de sistemele AI pot necesita verificare umană. Clientul înțelege că soluțiile AI pot
        produce răspunsuri incomplete, inexacte sau dependente de datele introduse, de configurările tehnice și de
        serviciile externe folosite. NEXAS nu garantează rezultate comerciale fixe, vânzări garantate, poziții
        garantate în Google sau funcționare neîntreruptă a serviciilor externe conectate.
      </p>
    </Sec>
    <Sec title="4. Conținut furnizat de client">
      <p>
        Clientul este responsabil pentru textele, imaginile, logo-urile, datele de firmă și orice alte materiale
        furnizate către NEXAS pentru realizarea proiectului și confirmă că are dreptul să le folosească, fără a
        încălca drepturile altor persoane sau companii.
      </p>
    </Sec>
    <Sec title="5. Ofertare și contractare">
      <ul>
        <li>Discuția inițială de evaluare este <strong>gratuită</strong></li>
        <li>Orice ofertă transmisă are o valabilitate de <strong>14 zile calendaristice</strong></li>
        <li>Lucrările încep doar după acceptarea scrisă a ofertei și achitarea avansului</li>
        <li>Orice modificare de scop față de oferta agreată face obiectul unei note suplimentare de preț</li>
      </ul>
    </Sec>
    <Sec title="6. Plăți">
      <ul>
        <li><strong>50% avans</strong> la acceptarea ofertei / semnarea contractului</li>
        <li><strong>50% final</strong> la livrarea produsului finit, înainte de predarea acceselor</li>
        <li>Pentru proiecte mari (peste 5.000 EUR), plățile pot fi structurate în etape definite în contract</li>
        <li>Facturile sunt emise în lei (RON) la cursul BNR din ziua emiterii; termen de plată: <strong>5 zile lucrătoare</strong></li>
      </ul>
      <p>
        Întârzierea plăților poate duce la suspendarea lucrărilor. NEXAS nu răspunde pentru prejudiciile cauzate de
        suspendarea serviciilor din cauza plăților restante.
      </p>
    </Sec>
    <Sec title="7. Livrare și aprobare">
      <ul>
        <li>Termenele de livrare sunt estimate și pot varia în funcție de rapiditatea furnizării materialelor de către client</li>
        <li>Clientul are <strong>5 zile lucrătoare</strong> pentru a aproba sau a solicita modificări la fiecare livrabil</li>
        <li>Lipsa unui răspuns în acest termen constituie aprobare tacită</li>
        <li>Sunt incluse maximum <strong>2 runde de revizuiri</strong> per livrabil; revizuirile suplimentare se facturează separat</li>
      </ul>
    </Sec>
    <Sec title="8. Proprietate intelectuală">
      <ul>
        <li>După achitarea integrală, clientul dobândește drepturile de utilizare asupra produsului finit livrat</li>
        <li>NEXAS păstrează dreptul de a include proiectul în portofoliu (cu acordul clientului pentru proiecte confidențiale)</li>
        <li>Codul sursă, design-urile și materialele create rămân proprietatea NEXAS până la plata integrală</li>
      </ul>
    </Sec>
    <Sec title="9. Confidențialitate">
      <p>
        Ambele părți se angajează să păstreze confidențialitatea informațiilor comerciale și tehnice schimbate pe
        parcursul colaborării. Această obligație se menține <strong>3 ani</strong> după finalizarea proiectului.
      </p>
    </Sec>
    <Sec title="10. Limitarea răspunderii">
      <ul>
        <li>NEXAS nu răspunde pentru daune indirecte, pierdere de profit sau de date cauzate de utilizarea sau imposibilitatea utilizării serviciilor</li>
        <li>Răspunderea maximă a NEXAS este limitată la valoarea contractului aferent</li>
        <li>NEXAS nu garantează rezultate specifice de business în absența unui angajament explicit în contract</li>
      </ul>
    </Sec>
    <Sec title="11. Forță majoră">
      <p>
        Niciuna dintre părți nu răspunde pentru neexecutarea obligațiilor cauzată de evenimente de forță majoră
        (dezastre naturale, conflicte, pene majore de infrastructură, decizii ale autorităților), notificate în
        termen de 5 zile de la apariție.
      </p>
    </Sec>
    <Sec title="12. Reclamații și soluționarea disputelor">
      <p>
        Pentru reclamații, scrie-ne la <a href="mailto:contact@nexas.ro">contact@nexas.ro</a> — analizăm și răspundem
        într-un termen rezonabil. Dacă ești consumator, ai la dispoziție și următoarele mecanisme:
      </p>
      <ul>
        <li>
          <strong>ANPC</strong> — Autoritatea Națională pentru Protecția Consumatorilor:{' '}
          <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">anpc.ro</a>
        </li>
        <li>
          <strong>SAL</strong> — Soluționarea Alternativă a Litigiilor:{' '}
          <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">anpc.ro/ce-este-sal</a>
        </li>
        <li>
          <strong>SOL / ODR</strong> — platforma europeană de soluționare online a litigiilor:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>
        </li>
      </ul>
      <p>
        Acești termeni sunt guvernați de legea română; litigiile se soluționează pe cale amiabilă sau de instanțele
        competente din România.
      </p>
    </Sec>
  </LegalShell>
);

export const CookiesPage: React.FC = () => (
  <LegalShell kicker="ePrivacy Directive · GDPR" title="Politică de Cookies">
    <Sec title="1. Ce sunt cookie-urile?">
      <p>
        Cookie-urile sunt fișiere text mici stocate în browserul tău când vizitezi un site web. Permit site-ului să-ți
        rețină preferințele, să analizeze traficul și să funcționeze corect. Unele sunt esențiale (fără ele site-ul
        nu funcționează), altele sunt opționale și necesită consimțământul tău explicit.
      </p>
    </Sec>
    <Sec title="2. Cookie-uri esențiale (nu necesită consimțământ)">
      <p>
        <strong>nexas_cookie_consent</strong> (localStorage, 365 de zile) — reține preferința ta de cookies
        (accept / doar esențiale), pentru a nu afișa bannerul la fiecare vizită. Nu poate fi dezactivat fără a
        afecta funcționalitatea.
      </p>
    </Sec>
    <Sec title="3. Cookie-uri de analiză (necesită consimțământ)">
      <p>
        <strong>Google Analytics</strong> (dacă este activat, durată până la 2 ani) — analiză de trafic: pagini
        vizitate, timp petrecut, locație geografică anonimizată. Datele sunt agregate și nu sunt folosite pentru
        publicitate. Se încarcă <strong>doar</strong> după ce accepți cookie-urile de analiză din banner.
      </p>
    </Sec>
    <Sec title="4. Fără cookie-uri terțe de urmărire">
      <p>
        Site-ul NEXAS <strong>nu încarcă resurse de la terți care să-ți urmărească activitatea</strong>. Fonturile,
        imaginile, animațiile și elementele 3D sunt găzduite local pe serverul nostru — nu se trimit cereri către
        Google Fonts, rețele de publicitate sau alte servicii externe de tracking la simpla vizitare a site-ului.
      </p>
      <p>
        Servicii externe pot fi implicate <strong>doar la acțiunea ta explicită</strong> — de exemplu, când alegi să
        ne scrii pe WhatsApp (Meta) sau să trimiți formularul prin propriul client de email.
      </p>
    </Sec>
    <Sec title="5. Cum îți gestionezi cookie-urile">
      <p>
        La prima vizită afișăm un banner prin care poți accepta sau refuza cookie-urile non-esențiale. Îți poți
        schimba sau retrage consimțământul oricând ștergând cheia <strong>nexas_cookie_consent</strong> din
        localStorage (bannerul va reapărea la următoarea vizită) sau din setările browserului:
      </p>
      <ul>
        <li><strong>Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri</li>
        <li><strong>Firefox:</strong> Setări → Confidențialitate și securitate → Cookie-uri și date</li>
        <li><strong>Safari:</strong> Preferințe → Confidențialitate → Gestionare date site-uri</li>
        <li><strong>Edge:</strong> Setări → Cookie-uri și permisiuni ale site-urilor</li>
      </ul>
      <p>
        Poți dezactiva Google Analytics și prin extensia oficială{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a>.
      </p>
    </Sec>
    <Sec title="6. Modificări și contact">
      <p>
        Putem actualiza această politică atunci când adăugăm sau eliminăm servicii. Pentru orice întrebare legată de
        cookie-uri sau date personale, scrie la <a href="mailto:contact@nexas.ro">contact@nexas.ro</a> sau consultă{' '}
        <a href="/confidentialitate">Politica de confidențialitate</a>.
      </p>
    </Sec>
  </LegalShell>
);


    // Language toggle (EN/ES)
    (function(){
      const toggle = document.getElementById('langToggle');
      const html = document.documentElement;
      const titleEl = document.getElementById('docTitle');
      const descEl  = document.getElementById('docDesc');

      const texts = {
        en: {
          title: 'Titan Ops Marketing | SEO, Ads & Conversion for Local Businesses',
          desc:  'Performance SEO, Google Ads and conversion design for local businesses. Bilingual EN/ES. The $49 strategy call is credited to your plan.',
          button: 'ES'
        },
        es: {
          title: 'Titan Ops Marketing | Más clientes para tu negocio local (ES/EN)',
          desc:  'Titan Ops Marketing impulsa negocios locales con SEO, Google Ads y diseño de conversión. Equipo bilingüe. La llamada de $49 se acredita a tu plan.',
          button: 'EN'
        }
      };

      function setLang(lang){
        html.setAttribute('data-lang', lang);
        html.setAttribute('lang', lang);
        const showEn = lang === 'en';
        document.querySelectorAll('.t-en').forEach(el=>el.style.display = showEn ? '' : 'none');
        document.querySelectorAll('.t-es').forEach(el=>el.style.display = showEn ? 'none' : '');
        if(titleEl) titleEl.textContent = texts[lang].title;
        if(descEl)  descEl.setAttribute('content', texts[lang].desc);
        if(toggle){
          toggle.setAttribute('aria-label', `Switch language (${texts[lang].button})`);
          toggle.textContent = texts[lang].button;
        }
        try{ localStorage.setItem('lang', lang); }catch(e){}
      }

      toggle?.addEventListener('click', ()=>{
        const next = (html.getAttribute('data-lang') === 'en') ? 'es' : 'en';
        setLang(next);
      });
      const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || html.getAttribute('data-lang') || 'en';
      setLang(saved);
    })();

    // Reveal on scroll
    (function(){
      const io = new IntersectionObserver((entries)=>{
        for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } }
      },{threshold:.08});
      document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    })();

    // Testimonials: duplicate items for seamless marquee
    (function(){
      const row = document.getElementById('testiRow');
      if(!row) return;
      const items = Array.from(row.children);
      items.forEach(el=> row.appendChild(el.cloneNode(true)));
    })();

    // GA4: events on CTAs (Calendly, WhatsApp, Stripe)
    (function(){
      function track(evt, params){ try{ gtag('event', evt, params); }catch(e){} }
      const map = [
        ['a[href*="calendly.com/administration-titanopsagency/30min"]', 'calendly_click'],
        ['a[href^="https://wa.me/"]', 'whatsapp_click'],
        ['a[data-plan="monthly-997"]', 'stripe_click_monthly'],
        ['a[data-plan="setup-349"]', 'stripe_click_setup']
      ];
      map.forEach(([sel, name])=>{
        document.querySelectorAll(sel).forEach(a=>{
          a.addEventListener('click', ()=> track(name, {link_url:a.href, link_text:a.textContent.trim()}));
        });
      });
    })();
 

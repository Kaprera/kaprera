/* ── kaprera · contact band behaviour · shared by every page but the landing pages ──
   The one-question-at-a-time enquiry form, posted to Netlify Forms. The
   landing pages run the same logic inline; this is the copy for /work/, the
   case studies, careers and the privacy policy. Those pages swap their text
   between data-en / data-ar themselves; this file reads the current language
   off <html lang> when it needs it, and keeps the field placeholders in step
   (the pages' own language code only swaps text). */
(function () {
  if (!document.getElementById('contactForm')) return;
  var root = document.documentElement;
  // read at the moment it's needed, so a toggle mid-form is respected
  var lang = function () { return root.lang === 'ar' ? 'ar' : 'en'; };

  var syncPlaceholders = function () {
    var ar = root.lang === 'ar';
    document.querySelectorAll('#contact [data-en-ph]').forEach(function (el) {
      var t = el.getAttribute(ar ? 'data-ar-ph' : 'data-en-ph');
      if (t != null) el.placeholder = t;
    });
  };
  syncPlaceholders();
  new MutationObserver(syncPlaceholders).observe(root, { attributes: true, attributeFilter: ['lang'] });

  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.querySelector('span');
  const backBtn = document.getElementById('stepBack');
  const steps = [...contactForm.querySelectorAll('.form-step')];
  const stepNum = document.getElementById('stepNum');
  const stepBar = document.getElementById('stepBar');
  let stepIndex = 0;
  const setSubmitLabel = (en, arText) => {
    submitLabel.setAttribute('data-en', en);
    submitLabel.setAttribute('data-ar', arText);
    submitLabel.textContent = lang() === 'ar' ? arText : en;
  };
  const isLastStep = () => stepIndex === steps.length - 1;
  const showStep = (i, focus = true) => {
    stepIndex = i;
    steps.forEach((s, n) => { s.hidden = n !== i; });
    stepNum.textContent = i + 1;
    stepBar.style.width = ((i + 1) / steps.length * 100) + '%';
    backBtn.hidden = i === 0;
    if (isLastStep()) setSubmitLabel('Send', 'إرسال');
    else setSubmitLabel('Next', 'التالي');
    if (focus) {
      const q = steps[i].querySelector(isLastStep() ? 'input' : '.step-q');
      q.focus({ preventScroll: true });
    }
  };
  // say what is wrong under the field itself, in the page's language, instead
  // of the browser's own bubble ("Please match the requested format.")
  const fieldMsg = (el) => {
    if (el.type === 'radio') return ['Pick one to continue.', 'اختر إجابة للمتابعة.'];
    if (el.validity.valueMissing) {
      if (el.name === 'name') return ['Enter your name so we know who to reply to.', 'أدخل اسمك لنعرف لمن نردّ.'];
      if (el.name === 'email') return ['Enter your email so we can reply.', 'أدخل بريدك الإلكتروني لنتمكّن من الرد.'];
      return ['This field is required.', 'هذا الحقل مطلوب.'];
    }
    if (el.type === 'email') return ['Check the email address, e.g. you@company.com.', 'تحقّق من البريد الإلكتروني، مثل you@company.com.'];
    if (el.type === 'tel') return ['Use 6 to 20 digits, spaces or dashes, e.g. 03 123 456.', 'استخدم من 6 إلى 20 رقمًا أو مسافة أو شرطة، مثل 03 123 456.'];
    return ['Check this field.', 'تحقّق من هذا الحقل.'];
  };
  const setErr = (el, on) => {
    const host = el.type === 'radio' ? el.closest('.form-step') : el.closest('.field');
    if (!host) return;
    let p = host.querySelector(':scope > .field-err');
    if (!p) {
      p = document.createElement('p');
      p.className = 'field-err';
      p.id = 'err-' + el.name;
      p.hidden = true;
      host.appendChild(p);
    }
    const group = el.type === 'radio' ? [...contactForm.querySelectorAll('input[name="' + el.name + '"]')] : [el];
    if (on) {
      const [en, arText] = fieldMsg(el);
      p.setAttribute('data-en', en);
      p.setAttribute('data-ar', arText);
      p.textContent = lang() === 'ar' ? arText : en;
      p.hidden = false;
      group.forEach(g => { g.setAttribute('aria-invalid', 'true'); g.setAttribute('aria-describedby', p.id); });
    } else {
      p.hidden = true;
      group.forEach(g => { g.removeAttribute('aria-invalid'); g.removeAttribute('aria-describedby'); });
    }
  };
  const checkField = (el) => { const ok = el.checkValidity(); setErr(el, !ok); return ok; };
  const stepValid = () => {
    const seen = new Set();
    let first = null;
    steps[stepIndex].querySelectorAll('input, select').forEach(el => {
      if (el.type === 'radio') { if (seen.has(el.name)) return; seen.add(el.name); }
      if (!checkField(el) && !first) first = el;
    });
    if (first) { first.focus(); return false; }
    return true;
  };
  // check a field as the visitor leaves it (only once they've typed something,
  // so tabbing past doesn't nag), and clear the message the moment it's fixed
  contactForm.addEventListener('focusout', (e) => {
    if (e.target.matches('.field input') && e.target.value.trim()) checkField(e.target);
  });
  contactForm.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) setErr(e.target, false);
  });
  backBtn.addEventListener('click', () => showStep(stepIndex - 1));
  // the languages question reads differently when the job is search, not a build
  const langQ = contactForm.querySelector('[data-step="2"] .step-q');
  contactForm.addEventListener('change', (e) => {
    if (e.target.name !== 'service' || !langQ) return;
    const [en, arText] = e.target.value === 'seo'
      ? ['Which languages do your customers search in?', 'بأي لغة يبحث عملاؤك؟']
      : ['Which languages should it speak?', 'بأي لغة يجب أن يتحدث؟'];
    langQ.setAttribute('data-en', en);
    langQ.setAttribute('data-ar', arText);
    langQ.textContent = lang() === 'ar' ? arText : en;
  });
  // a pointer click on an answer moves straight on; keyboard users confirm
  // with Enter or the Next button so arrow keys can still move between answers
  contactForm.addEventListener('click', (e) => {
    const opt = e.target.closest('.step-opt input');
    if (!opt || e.detail === 0) return;
    setTimeout(() => { if (steps[stepIndex].contains(opt)) showStep(stepIndex + 1); }, 180);
  });
  // each answer as it reads inside the enquiry email
  const emailPhrases = {
    service: {
      'custom-system': 'a custom system to replace our spreadsheets and WhatsApp orders',
      'website': 'a new website',
      'ecommerce': 'an online store on Shopify',
      'seo': 'SEO and growing our traffic'
    },
    timeline: {
      'asap': "We'd like to launch as soon as possible",
      '1-3-months': "We're aiming to launch in the next one to three months",
      '3-plus-months': "We're planning to launch in three months or more",
      'exploring': "We're still exploring, so the timing is open"
    },
    language: {
      'en': 'in English',
      'ar': 'in Arabic',
      'both': 'in both English and Arabic'
    },
    budget: {
      'under-2k': 'our budget is under $2,000',
      '2k-5k': 'our budget is between $2,000 and $5,000',
      '5k-15k': 'our budget is between $5,000 and $15,000',
      '15k-plus': 'our budget is $15,000 or more',
      'unsure': "we haven't settled on a budget yet"
    }
  };
  const phrase = (f, name) => emailPhrases[name][f.elements[name].value] || '';
  // the same enquiry as an email, for the manual fallback when the POST fails
  const mailtoHref = (f) => {
    const els = f.elements;
    const name = els.name.value.trim();
    const email = els.email.value.trim();
    const tel = els.phone.value.trim();
    const reach = tel
      ? "You can reach me on " + els['phone-code'].value + ' ' + tel + " or at " + email + "."
      : "You can reach me at " + email + ".";
    const business = els.business.value.trim();
    const city = els.city.value.trim();
    const site = els.website.value.trim();
    const context = (business ? " from " + business : "") + (city ? ", based in " + city : "");
    const siteLine = site
      ? "Our website at the moment is " + site + ". "
      : "We don't have a website yet. ";
    const visitLine = els.physical && els.physical.checked
      ? "We have a physical location customers can visit. "
      : "";
    const body = "Hi kaprera,\n\n" +
      "My name is " + name + context + ", and I'd like to work with you on " +
      phrase(f, 'service') + " " + phrase(f, 'language') + ". " +
      phrase(f, 'timeline') + ", and " + phrase(f, 'budget') + ".\n\n" +
      siteLine + visitLine + "\n\n" +
      reach + " I look forward to hearing from you.\n\n" +
      "Best regards,\n" + name;
    return "mailto:info@kaprera.com?subject=New%20project%20enquiry%20from%20" +
      encodeURIComponent(name) + "&body=" + encodeURIComponent(body);
  };

  const formError = document.getElementById('formError');
  const formErrorMail = document.getElementById('formErrorMail');
  const formRetry = document.getElementById('formRetry');
  const formSent = document.getElementById('formSent');
  const formAgain = document.getElementById('formAgain');
  const formStatus = document.getElementById('formStatus');
  const say = (en, arText) => {
    if (formStatus) formStatus.textContent = lang() === 'ar' ? arText : en;
  };

  // what the visitor told us, echoed back so the confirmation is a receipt
  const recapRows = (f) => {
    const L = lang() === 'ar' ? 'ar' : 'en';
    const labels = {
      service:  { en: 'Project',   ar: 'المشروع' },
      language: { en: 'Languages', ar: 'اللغات' },
      timeline: { en: 'Timeline',  ar: 'الجدول الزمني' },
      budget:   { en: 'Budget',    ar: 'الميزانية' },
      business: { en: 'Business',  ar: 'الشركة' },
      city:     { en: 'Based in',  ar: 'المقر' },
      website:  { en: 'Website',   ar: 'الموقع' },
      contact:  { en: 'Reply to',  ar: 'الرد إلى' }
    };
    const chosen = (name) => {
      const el = f.elements[name];
      const opt = el && [...f.querySelectorAll('input[name="' + name + '"]')]
        .find(r => r.checked);
      const span = opt && opt.parentElement.querySelector('span');
      return span ? span.getAttribute(L === 'ar' ? 'data-ar' : 'data-en') || span.textContent : '';
    };
    const tel = f.elements.phone.value.trim();
    return [
      [labels.service[L],  chosen('service')],
      [labels.language[L], chosen('language')],
      [labels.timeline[L], chosen('timeline')],
      [labels.budget[L],   chosen('budget')],
      [labels.business[L], f.elements.business.value.trim()],
      [labels.city[L],     f.elements.city.value.trim()],
      [labels.website[L],  f.elements.website.value.trim()],
      [labels.contact[L],  f.elements.email.value.trim() +
        (tel ? ' · ' + f.elements['phone-code'].value + ' ' + tel : '')]
    ];
  };

  const showSent = (f) => {
    const recap = document.getElementById('formSentRecap');
    if (recap) {
      recap.textContent = '';
      recapRows(f).filter(r => r[1]).forEach(([k, v]) => {
        const row = document.createElement('div');
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = k; dd.textContent = v;      // textContent: never inject user input
        row.append(dt, dd);
        recap.appendChild(row);
      });
    }
    contactForm.hidden = true;
    formSent.hidden = false;
    formSent.classList.add('in');   // .reveal starts transparent; it never scrolled into view while hidden
    say('Your enquiry has been sent. We reply within one business day.',
        'تم إرسال طلبك. نردّ خلال يوم عمل واحد.');
    // land the reader on the confirmation rather than leaving it below the fold
    formSent.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => formSent.focus({ preventScroll: false }));
  };

  const showError = (f) => {
    formErrorMail.href = mailtoHref(f);
    formError.hidden = false;
    setSubmitLabel('Send', 'إرسال');
    submitBtn.disabled = false;
    backBtn.disabled = false;
    say("We couldn't send that — nothing has been submitted yet.",
        'تعذّر الإرسال — لم يُرسل شيء بعد.');
  };

  const postForm = (f) => {
    formError.hidden = true;
    submitBtn.disabled = true;
    backBtn.disabled = true;
    setSubmitLabel('Sending…', 'جارٍ الإرسال…');
    say('Sending your enquiry…', 'جارٍ إرسال طلبك…');
    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(f)).toString()
    }).then((res) => {
      if (!res.ok) throw new Error('form endpoint unavailable');
      showSent(f);
    }).catch(() => showError(f));
  };

  if (formRetry) formRetry.addEventListener('click', () => postForm(contactForm));
  if (formAgain) formAgain.addEventListener('click', () => {
    contactForm.reset();
    formSent.hidden = true;
    contactForm.hidden = false;
    formError.hidden = true;
    submitBtn.disabled = false;
    backBtn.disabled = false;
    say('', '');
    showStep(0);
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (!stepValid()) return;
    if (!isLastStep()) { showStep(stepIndex + 1); return; }
    postForm(f);
  });

})();

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
    if (isLastStep()) { setSubmitLabel('Send', 'إرسال'); renderReview(); }
    else setSubmitLabel('Next', 'التالي');
    if (focus) {
      const q = steps[i].querySelector(isLastStep() ? 'input' : '.step-q');
      q.focus({ preventScroll: true });
    }
  };
  // forward goes to the next unanswered question, or straight to the last step:
  // after a "Change" from the review, one new answer brings the visitor back
  const nextStep = () => {
    const n = steps.findIndex((s, k) => k > stepIndex &&
      s.querySelector('input[type="radio"]') && !s.querySelector('input[type="radio"]:checked'));
    return n === -1 ? steps.length - 1 : n;
  };
  // the last step lists the earlier answers with a "Change" beside each. An
  // answer picked by a stray click moves the form on at once, so this is the
  // one place a slip can be seen before it is sent
  const REVIEW = [
    [0, 'service',  'Project',   'المشروع'],
    [1, 'language', 'Languages', 'اللغات'],
    [2, 'timeline', 'Launch',    'الإطلاق'],
    [3, 'budget',   'Budget',    'الميزانية']
  ];
  const renderReview = () => {
    const last = steps[steps.length - 1];
    let box = last.querySelector(':scope > .step-review');
    if (!box) {
      box = document.createElement('dl');
      box.className = 'step-review';
      last.querySelector('.step-q').after(box);
    }
    box.textContent = '';
    REVIEW.forEach(([k, name, en, arText]) => {
      const r = contactForm.querySelector('input[name="' + name + '"]:checked');
      const span = r && r.parentElement.querySelector('span');
      if (!span) return;
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      const edit = document.createElement('button');
      dt.append(bi(en, arText));
      dd.append(bi(span.getAttribute('data-en') || span.textContent, span.getAttribute('data-ar') || span.textContent));
      edit.type = 'button';
      edit.className = 'review-edit';
      const what = bi(' ' + en.toLowerCase(), ' ' + arText);
      what.className = 'sr-only';
      edit.append(bi('Change', 'تغيير'), what);
      edit.addEventListener('click', () => showStep(k));
      dd.append(edit);
      row.append(dt, dd);
      box.append(row);
    });
    box.hidden = !box.children.length;
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
  const checkField = (el) => { refine(el); const ok = el.checkValidity(); setErr(el, !ok); return ok; };
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
    shapeEmail(e.target);
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) setErr(e.target, false);
  });

  // ── error prevention: stop the mistakes that cost a reply before they need
  //    an error message ──
  // an email needs a real domain: "you@company" passes the browser's own check
  // but can never be answered
  const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;
  const shapeEmail = (el) => {
    if (el.type === 'email') el.setCustomValidity(!el.value || EMAIL_RE.test(el.value.trim()) ? '' : 'domain');
  };
  // trim before checking, so an answer of only spaces counts as empty
  const refine = (el) => {
    if (el.type === 'text' || el.type === 'email' || el.type === 'tel') {
      const v = el.value.trim();
      if (v !== el.value) el.value = v;
    }
    // "+961 3 123 456" sent with Enter never blurs the field, so mend it here
    // too, before the digits-only pattern rejects the "+"
    if (el.type === 'tel') phoneCode(el);
    shapeEmail(el);
  };
  const bi = (en, arText) => {
    const s = document.createElement('span');
    s.setAttribute('data-en', en);
    s.setAttribute('data-ar', arText);
    s.textContent = lang() === 'ar' ? arText : en;
    return s;
  };
  // a quiet hint under a field: a suggestion, never a blocker
  const hintFor = (el) => {
    const host = el.closest('.field');
    let h = host.querySelector(':scope > .field-hint');
    if (!h) {
      h = document.createElement('p');
      h.className = 'field-hint';
      h.setAttribute('aria-live', 'polite');
      h.hidden = true;
      host.insertBefore(h, host.querySelector(':scope > .field-err'));
    }
    return h;
  };
  const clearHint = (el) => {
    const h = el.closest('.field') && el.closest('.field').querySelector(':scope > .field-hint');
    if (h) { h.textContent = ''; h.hidden = true; }
  };

  // "gmail.con", "hotmial.com": offer the likely address, one tap to accept
  const MAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'protonmail.com'];
  // real providers that sit one letter away from the list above: never "correct" these
  const REAL_DOMAINS = ['mail.com', 'email.com', 'ymail.com', 'gmx.com', 'live.com', 'me.com', 'mac.com', 'msn.com', 'aol.com', 'proton.me', 'pm.me', 'zoho.com', 'yandex.com', 'hotmail.fr', 'yahoo.fr', 'outlook.fr'];
  const TLD_FIX = { con: 'com', cmo: 'com', comm: 'com', ocm: 'com', vom: 'com', xom: 'com', cpm: 'com', coom: 'com', nte: 'net', nett: 'net', ogr: 'org', orgg: 'org' };
  const editDist = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      // two swapped letters ("gmial") are one slip, not two
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  };
  const suggestEmail = (v) => {
    const at = v.lastIndexOf('@');
    if (at < 1) return null;
    const user = v.slice(0, at), typed = v.slice(at + 1).toLowerCase();
    if (REAL_DOMAINS.includes(typed)) return null;
    // mend the ending first ("x.con" → "x.com"), then look for a near-miss provider
    const dot = typed.lastIndexOf('.');
    const tld = dot > 0 ? TLD_FIX[typed.slice(dot + 1)] : null;
    const dom = tld ? typed.slice(0, dot + 1) + tld : typed;
    let best = null, bestD = 3;
    MAIL_DOMAINS.forEach(c => { const dd = editDist(dom, c); if (dd < bestD) { bestD = dd; best = c; } });
    const fixed = best || dom;
    return fixed !== typed ? user + '@' + fixed : null;
  };
  const emailHint = (el, atSend) => {
    const s = suggestEmail(el.value.trim());
    if (!s) { clearHint(el); return false; }
    const h = hintFor(el);
    h.textContent = '';
    const fix = document.createElement('button');
    fix.type = 'button';
    fix.className = 'hint-fix';
    fix.dir = 'ltr';
    fix.textContent = s;
    fix.addEventListener('click', () => { el.value = s; clearHint(el); checkField(el); el.focus(); });
    h.append(bi('Did you mean ', 'هل تقصد '), fix, bi('?', '؟'));
    if (atSend) h.append(bi(' If yours is right, press Send again.', ' إذا كان بريدك صحيحًا، اضغط إرسال مرة أخرى.'));
    h.hidden = false;
    return true;
  };
  // the suggestion above appears on blur, but clicking Send blurs and sends in
  // one move, so a likely typo would go out unseen. Hold the first Send for a
  // suspect address; a second Send with the same address goes through
  let emailAsked = '';
  const emailNeedsLook = (el) => {
    const v = el.value.trim();
    if (!v || v === emailAsked || !suggestEmail(v)) return false;
    emailAsked = v;
    emailHint(el, true);
    el.focus();
    return true;
  };

  // the website box: an email pasted in, or words with no address, are slips
  // worth a word; it stays optional, so this only hints and never blocks
  const websiteHint = (el) => {
    const v = el.value.trim();
    clearHint(el);
    if (!v || /^@/.test(v)) return;           // an "@handle" is a fair answer
    let en = '', arText = '';
    if (EMAIL_RE.test(v)) {
      en = 'That looks like an email address. This box is for your website, e.g. yoursite.com.';
      arText = 'يبدو هذا عنوان بريد إلكتروني. هذا الحقل لموقعك، مثل yoursite.com.';
    } else if (/\s/.test(v) || !/\.[a-z]{2,}(?:[/:?#]|$)/i.test(v.replace(/^https?:\/\//i, ''))) {
      en = 'Check the address, e.g. yoursite.com, or leave it blank.';
      arText = 'تحقّق من العنوان، مثل yoursite.com، أو اتركه فارغًا.';
    }
    if (!en) return;
    const h = hintFor(el);
    h.append(bi(en, arText));
    h.hidden = false;
  };

  // "+961 3 123 456" typed into the number: move the code into the code box,
  // so it doesn't end up in the number twice
  const codeSel = contactForm.querySelector('select[name="phone-code"]');
  const phoneCode = (el) => {
    if (!codeSel) return;
    const m = el.value.trim().match(/^(?:\+|00)\s*(\d[\d\s\-()]*)$/);
    if (!m) return;
    const digits = m[1].replace(/\D/g, '');
    const code = [...new Set([...codeSel.options].map(o => o.value))]
      .filter(c => digits.startsWith(c.slice(1)))
      .sort((a, b) => b.length - a.length)[0];
    if (!code) return;
    const opt = [...codeSel.options].find(o => o.value === code && (code !== '+1' || /^US/.test(o.text))) ||
                [...codeSel.options].find(o => o.value === code);
    opt.selected = true;
    el.value = digits.slice(code.length - 1);
    const h = hintFor(el);
    h.textContent = '';
    h.append(bi('Moved ' + code + ' to the country code.', 'نقلنا ' + code + ' إلى رمز البلد.'));
    h.hidden = false;
  };
  contactForm.addEventListener('focusout', (e) => {
    if (e.target.type === 'email') emailHint(e.target);
    if (e.target.type === 'tel') phoneCode(e.target);
    if (e.target.name === 'website') websiteHint(e.target);
  });
  contactForm.addEventListener('input', (e) => {
    if (e.target.type === 'email' || e.target.type === 'tel' || e.target.name === 'website') clearHint(e.target);
  });

  // Enter in a field of the last step goes to the next empty required field
  // rather than trying to send and flashing errors at fields not reached yet;
  // once those are filled, Enter sends as usual
  contactForm.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !isLastStep() || !e.target.matches('.field input')) return;
    const need = [...steps[stepIndex].querySelectorAll('.field input[required]')].find(i => i !== e.target && !i.value.trim());
    if (need) { e.preventDefault(); need.focus(); }
  });

  // keep the answers through a reload or a trip to another page (this tab only,
  // cleared once the enquiry is sent)
  const DRAFT = 'kaprera-enquiry-draft';
  const saveDraft = () => {
    try {
      const d = {};
      new FormData(contactForm).forEach((v, k) => { if (k !== 'form-name' && k !== 'bot-field') d[k] = v; });
      sessionStorage.setItem(DRAFT, JSON.stringify(d));
    } catch (err) {}
  };
  const clearDraft = () => { try { sessionStorage.removeItem(DRAFT); } catch (err) {} };
  contactForm.addEventListener('input', saveDraft);
  contactForm.addEventListener('change', saveDraft);
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
    setTimeout(() => { if (steps[stepIndex].contains(opt)) showStep(nextStep()); }, 180);
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
    clearDraft();
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
    clearDraft();
    formSent.hidden = true;
    contactForm.hidden = false;
    formError.hidden = true;
    submitBtn.disabled = false;
    backBtn.disabled = false;
    say('', '');
    showStep(0);
  });

  // pick up a draft from earlier in this tab, at the first unanswered question
  (function restoreDraft() {
    let d = null;
    try { d = JSON.parse(sessionStorage.getItem(DRAFT) || 'null'); } catch (err) {}
    if (!d || typeof d !== 'object') return;
    Object.keys(d).forEach((k) => {
      contactForm.querySelectorAll('[name="' + k.replace(/"/g, '') + '"]').forEach((el) => {
        if (el.type === 'radio' || el.type === 'checkbox') {
          if (el.value === d[k]) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }
        } else {
          el.value = d[k];
        }
      });
    });
    const open = steps.findIndex(s => s.querySelector('input[type="radio"]') && !s.querySelector('input[type="radio"]:checked'));
    showStep(open === -1 ? steps.length - 1 : open, false);
  })();

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (!stepValid()) return;
    if (!isLastStep()) { showStep(nextStep()); return; }
    if (emailNeedsLook(f.elements.email)) {
      say('Check your email address, then press Send again.', 'تحقّق من بريدك الإلكتروني، ثم اضغط إرسال مرة أخرى.');
      return;
    }
    postForm(f);
  });

})();

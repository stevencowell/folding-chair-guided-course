(function () {
  'use strict';

  const config = window.LESSON_CONFIG || {};
  const mcQuestions = window.MC_QUESTIONS || [];
  const writtenQuestions = window.WRITTEN_QUESTIONS || [];
  const STORAGE_KEY = config.storageKey || 'folding-chair-guided-lesson';

  const defaultState = {
    studentName: '',
    studentFirstName: '',
    studentLastName: '',
    studentClass: '',
    mc: {},
    written: {}
  };

  function freshState() {
    return JSON.parse(JSON.stringify(defaultState));
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return freshState();
      return {
        studentName: parsed.studentName || '',
        studentFirstName: parsed.studentFirstName || String(parsed.studentName || '').trim().split(/\s+/)[0] || '',
        studentLastName: parsed.studentLastName || String(parsed.studentName || '').trim().split(/\s+/).slice(1).join(' ') || '',
        studentClass: parsed.studentClass || '',
        mc: parsed.mc || {},
        written: parsed.written || {}
      };
    } catch (error) {
      return freshState();
    }
  }

  let state = loadState();
  // Replace guidance saved by older versions of the lesson before rendering it again.
  let migratedLegacyGuidance = false;
  Object.values(state.written).forEach((saved) => {
    if (typeof saved.guidance === 'string' && /genuine attempt first|at least 55 words|check your response twice/i.test(saved.guidance)) {
      saved.guidance = '<strong>Start with a short attempt.</strong> Write about 15 words, or use Check my response once, then compare your ideas with the model response.';
      migratedLegacyGuidance = true;
    }
  });
  if (migratedLegacyGuidance) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* Browser storage may be unavailable. */ }
  }
  let saveTimer = null;

  function saveState(message = 'Saved') {
    window.clearTimeout(saveTimer);
    const status = document.getElementById('save-status');
    if (status) status.textContent = 'Saving…';
    saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (status) status.textContent = message;
      } catch (error) {
        if (status) status.textContent = 'Browser save unavailable';
      }
      updateSummary();
    }, 180);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function wordCount(text) {
    return String(text || '').trim().split(/\s+/).filter(Boolean).length;
  }

  function pdfText(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[–—]/g, '-')
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[^\x20-\x7E]/g, '?')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  function wrapPdfText(value, width = 92) {
    const words = String(value || '').replace(/\s+/g, ' ').trim().split(' ');
    const lines = [];
    let line = '';
    words.forEach(word => {
      const next = line ? `${line} ${word}` : word;
      if (next.length > width && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  function downloadPdf() {
    const lines = [];
    const add = (text = '', style = 'body') => lines.push({ text, style });
    add(config.title || document.title, 'title');
    add(`Student: ${state.studentName || 'Not provided'}`);
    add(`Class: ${state.studentClass || 'Not provided'}`);
    add(`Downloaded: ${new Date().toLocaleDateString('en-AU')}`);
    add('');
    add('Knowledge checks', 'heading');
    mcQuestions.forEach((item, index) => {
      const saved = state.mc[index] || {};
      const answer = Number.isInteger(saved.selected) ? item.options[saved.selected] : 'No answer recorded';
      add(`${index + 1}. ${item.question}`, 'label');
      wrapPdfText(`Response: ${answer}`).forEach(text => add(text));
    });
    add('');
    add('Extended responses', 'heading');
    writtenQuestions.forEach((item, index) => {
      const saved = state.written[index] || {};
      add(`${index + 1}. ${item.title}`, 'label');
      wrapPdfText(item.prompt).forEach(text => add(text));
      wrapPdfText(`Student response: ${saved.response || 'No response recorded.'}`).forEach(text => add(text));
      add(`Self-assessment: ${Number.isInteger(saved.selfScore) ? `${saved.selfScore}/3` : 'Not selected'}`);
      add('');
    });

    const pages = [[]];
    let lineCount = 0;
    lines.forEach(line => {
      const cost = line.style === 'title' ? 2 : 1;
      if (lineCount + cost > 48) {
        pages.push([]);
        lineCount = 0;
      }
      pages[pages.length - 1].push(line);
      lineCount += cost;
    });

    const objects = [null, '<< /Type /Catalog /Pages 2 0 R >>', ''];
    const pageIds = [];
    pages.forEach((page, index) => {
      const pageId = 3 + index * 2;
      const contentId = pageId + 1;
      pageIds.push(pageId);
      let y = 792;
      const content = page.map(line => {
        const size = line.style === 'title' ? 18 : line.style === 'heading' ? 13 : line.style === 'label' ? 10 : 9;
        const leading = line.style === 'title' ? 24 : 14;
        y -= leading;
        return `BT /F1 ${size} Tf 50 ${y} Td (${pdfText(line.text)}) Tj ET`;
      }).join('\n');
      objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${3 + pages.length * 2} 0 R >> >> /Contents ${contentId} 0 R >>`;
      objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
    });
    const fontId = 3 + pages.length * 2;
    objects[2] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pages.length} >>`;
    objects[fontId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    for (let i = 1; i < objects.length; i += 1) {
      offsets[i] = pdf.length;
      pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
    }
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let i = 1; i < objects.length; i += 1) pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    const fileName = `${(state.studentName || 'student').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}-${(config.title || 'folding-chair').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}.pdf`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  function autoGrowTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(175, textarea.scrollHeight + 2)}px`;
  }

  function autoGrowAllTextareas() {
    document.querySelectorAll('textarea[data-action="written-input"]').forEach(autoGrowTextarea);
  }

  function renderMcQuestions() {
    const container = document.getElementById('mc-questions');
    if (!container) return;
    container.innerHTML = mcQuestions.map((item, index) => {
      const saved = state.mc[index] || {};
      const selected = Number.isInteger(saved.selected) ? saved.selected : null;
      const mastered = Boolean(saved.mastered);
      const attempts = saved.attempts || 0;
      const hintVisible = Boolean(saved.hintVisible);
      const feedbackClass = saved.feedbackType || '';
      const feedback = saved.feedback || '';

      const options = item.options.map((option, optionIndex) => {
        const checked = selected === optionIndex ? 'checked' : '';
        let optionClass = '';
        if (mastered && optionIndex === item.correct) optionClass = 'option-correct';
        else if (!mastered && saved.lastWrong === optionIndex) optionClass = 'option-wrong';
        return `
          <label class="option-label ${optionClass}">
            <input type="radio" name="mc-${index}" value="${optionIndex}" ${checked}>
            <span>${escapeHtml(option)}</span>
          </label>`;
      }).join('');

      return `
        <article class="question-card ${mastered ? 'mastered' : ''}" data-mc-index="${index}">
          <h3 class="question-title"><span class="question-number">${index + 1}</span>${escapeHtml(item.question)}</h3>
          <div class="options">${options}</div>
          <div class="question-actions screen-only">
            <button class="check-button" type="button" data-action="check-mc">${mastered ? 'Check again' : 'Check answer'}</button>
            <button class="hint-button" type="button" data-action="hint-mc">${hintVisible ? 'Hide hint' : 'Need a hint?'}</button>
            <span class="mastery-badge">Mastered</span>
            <span class="attempts">Attempts: ${attempts}</span>
          </div>
          <div class="hint-panel ${hintVisible ? 'show' : ''}"><strong>Hint:</strong> ${escapeHtml(attempts >= 2 ? item.strongHint : item.hint)}</div>
          <div class="feedback ${feedbackClass} ${feedback ? 'show' : ''}" role="status" aria-live="polite">${feedback}</div>
        </article>`;
    }).join('');
  }

  function renderWrittenQuestions() {
    const container = document.getElementById('written-questions');
    if (!container) return;
    container.innerHTML = writtenQuestions.map((item, index) => {
      const saved = state.written[index] || {};
      const response = saved.response || '';
      const checked = Boolean(saved.checked);
      const modelVisible = Boolean(saved.modelVisible);
      const selfScore = Number.isInteger(saved.selfScore) ? saved.selfScore : null;
      const wc = wordCount(response);
      const met = conceptMatches(response, item.concepts);

      return `
        <article class="written-card ${checked ? 'reviewed' : ''}" data-written-index="${index}">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.prompt)}</p>
          <div class="scaffold">
            <strong>Sentence starters</strong>
            <ul>${item.scaffold.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
          </div>
          <label class="visually-hidden" for="written-${index}">Response to ${escapeHtml(item.title)}</label>
          <textarea id="written-${index}" data-action="written-input" placeholder="Write your response here before viewing the model answer…">${escapeHtml(response)}</textarea>
          <div class="response-meta">
            <span data-word-count>Word count: ${wc} words</span>
            <span>${checked ? 'Guidance reviewed' : 'Not yet reviewed'}</span>
          </div>
          <div class="written-actions screen-only">
            <button class="check-button" type="button" data-action="check-written">Check my response</button>
            <button class="model-button" type="button" data-action="model-written">${modelVisible ? 'Hide model response' : 'Compare with model response'}</button>
          </div>
          <div class="response-guidance ${saved.guidance ? 'show' : ''} ${saved.ready ? 'ready' : ''}" role="status" aria-live="polite">${saved.guidance || ''}</div>
          <div class="model-panel ${modelVisible ? 'show' : ''}"><strong>Model response:</strong> ${escapeHtml(item.model)}</div>
          <div class="self-score ${modelVisible ? 'show' : ''}">
            <strong>Self-assess after comparing:</strong>
            <div class="score-buttons screen-only">
              ${[
                [3, '3 – Fully explained'],
                [2, '2 – Mostly explained'],
                [1, '1 – Partly explained'],
                [0, '0 – Not yet']
              ].map(([score, label]) => `<button class="score-button ${selfScore === score ? 'selected' : ''}" type="button" data-action="score-written" data-score="${score}">${label}</button>`).join('')}
            </div>
            <p>${selfScore === null ? 'No self-assessment selected.' : `Self-assessment: ${selfScore}/3`}</p>
          </div>
        </article>`;
    }).join('');
    window.requestAnimationFrame(autoGrowAllTextareas);
  }

  function conceptMatches(text, concepts) {
    const normalised = String(text || '').toLowerCase();
    return concepts.map(concept => concept.terms.some(term => normalised.includes(term.toLowerCase())));
  }

  function handleMcClick(event) {
    const card = event.target.closest('[data-mc-index]');
    if (!card) return;
    const index = Number(card.dataset.mcIndex);
    const item = mcQuestions[index];
    const saved = state.mc[index] || { attempts: 0 };
    const action = event.target.dataset.action;

    if (action === 'hint-mc') {
      saved.hintVisible = !saved.hintVisible;
      state.mc[index] = saved;
      saveState();
      renderMcQuestions();
      return;
    }

    if (action === 'check-mc') {
      const selectedInput = card.querySelector('input[type="radio"]:checked');
      if (!selectedInput) {
        saved.feedback = '<strong>Choose an answer first.</strong> Then check it and use the feedback to improve.';
        saved.feedbackType = 'error';
        state.mc[index] = saved;
        saveState();
        renderMcQuestions();
        return;
      }

      const selected = Number(selectedInput.value);
      saved.selected = selected;
      saved.attempts = (saved.attempts || 0) + 1;
      if (selected === item.correct) {
        saved.mastered = true;
        saved.lastWrong = null;
        saved.feedbackType = 'correct';
        saved.feedback = `<strong>Correct.</strong> ${escapeHtml(item.feedback[selected])}`;
      } else {
        saved.mastered = false;
        saved.lastWrong = selected;
        saved.hintVisible = true;
        saved.feedbackType = 'not-yet';
        const nextStep = saved.attempts >= 2
          ? 'Use the stronger clue, rule out the options that do not match the theory, then try again.'
          : 'Read the hint and try again.';
        saved.feedback = `<strong>Not yet.</strong> ${escapeHtml(item.feedback[selected])} ${escapeHtml(nextStep)}`;
      }
      state.mc[index] = saved;
      saveState();
      renderMcQuestions();
    }
  }

  function handleMcChange(event) {
    if (!event.target.matches('input[type="radio"]')) return;
    const card = event.target.closest('[data-mc-index]');
    if (!card) return;
    const index = Number(card.dataset.mcIndex);
    const saved = state.mc[index] || { attempts: 0 };
    saved.selected = Number(event.target.value);
    state.mc[index] = saved;
    saveState('Draft saved');
  }

  function handleWrittenInput(event) {
    if (event.target.dataset.action !== 'written-input') return;
    const card = event.target.closest('[data-written-index]');
    const index = Number(card.dataset.writtenIndex);
    const saved = state.written[index] || {};
    saved.response = event.target.value;
    saved.checked = false;
    saved.ready = false;
    saved.guidance = '';
    state.written[index] = saved;
    saveState('Draft saved');

    autoGrowTextarea(event.target);
    const item = writtenQuestions[index];
    const wc = wordCount(saved.response);
    const countEl = card.querySelector('[data-word-count]');
    if (countEl) countEl.textContent = `Word count: ${wc} words`;
    const matches = conceptMatches(saved.response, item.concepts);
    card.querySelectorAll('.concept-chip').forEach((chip, conceptIndex) => {
      chip.classList.toggle('met', matches[conceptIndex]);
      chip.textContent = `${matches[conceptIndex] ? '✓ ' : ''}${item.concepts[conceptIndex].label}`;
    });
  }

  function handleWrittenClick(event) {
    const card = event.target.closest('[data-written-index]');
    if (!card) return;
    const index = Number(card.dataset.writtenIndex);
    const item = writtenQuestions[index];
    const saved = state.written[index] || {};
    const action = event.target.dataset.action;

    if (action === 'check-written') {
      const response = saved.response || '';
      const wc = wordCount(response);
      const matches = conceptMatches(response, item.concepts);
      const missingIndexes = matches.map((isMet, i) => isMet ? -1 : i).filter(i => i >= 0);
      saved.checkCount = (saved.checkCount || 0) + 1;
      saved.checked = true;

      if (wc < 15) {
        const remaining = 15 - wc;
        saved.ready = false;
        saved.guidance = `<strong>Good start.</strong> Add about ${remaining} more word${remaining === 1 ? '' : 's'} for a short attempt. You can then compare your ideas with the model response.`;
      } else if (missingIndexes.length) {
        saved.ready = false;
        const prompts = missingIndexes.map(i => `<li>${escapeHtml(item.prompts[i])}</li>`).join('');
        saved.guidance = `<strong>You have part of the answer.</strong> Strengthen it by adding:<ul>${prompts}</ul>`;
      } else {
        saved.ready = true;
        saved.guidance = '<strong>Strong response.</strong> You have included the main concepts. Compare it with the model, improve any unclear wording, then self-assess honestly.';
      }
      state.written[index] = saved;
      saveState();
      renderWrittenQuestions();
      return;
    }

    if (action === 'model-written') {
      const wc = wordCount(saved.response || '');
      const canReveal = wc >= 15 || (saved.checkCount || 0) >= 1;
      if (!saved.modelVisible && !canReveal) {
        saved.checked = true;
        saved.ready = false;
        saved.guidance = '<strong>Start with a short attempt.</strong> Write about 15 words, or use Check my response once, then compare your ideas with the model response.';
      } else {
        saved.modelVisible = !saved.modelVisible;
        if (saved.modelVisible) saved.checked = true;
      }
      state.written[index] = saved;
      saveState();
      renderWrittenQuestions();
      return;
    }

    if (action === 'score-written') {
      saved.selfScore = Number(event.target.dataset.score);
      saved.checked = true;
      state.written[index] = saved;
      saveState();
      renderWrittenQuestions();
    }
  }

  function updateSummary() {
    const mcMastered = mcQuestions.filter((_, index) => state.mc[index] && state.mc[index].mastered).length;
    const writtenReviewed = writtenQuestions.filter((_, index) => state.written[index] && state.written[index].checked).length;
    const detailsComplete = Boolean(state.studentFirstName.trim() && state.studentLastName.trim() && state.studentClass.trim());

    const values = {
      'mc-progress-number': `${mcMastered}/${mcQuestions.length}`,
      'written-progress-number': `${writtenReviewed}/${writtenQuestions.length}`,
      'summary-mc': `${mcMastered}/${mcQuestions.length}`,
      'summary-written': `${writtenReviewed}/${writtenQuestions.length}`,
      'summary-details': detailsComplete ? 'Complete' : 'Incomplete'
    };
    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
  }

  function bindStudentFields() {
    const firstNameInput = document.getElementById('student-first-name');
    const lastNameInput = document.getElementById('student-last-name');
    const classInput = document.getElementById('student-class');
    if (!firstNameInput || !lastNameInput || !classInput) return;
    firstNameInput.value = state.studentFirstName;
    lastNameInput.value = state.studentLastName;
    classInput.value = state.studentClass;

    const saveName = () => {
      state.studentFirstName = firstNameInput.value;
      state.studentLastName = lastNameInput.value;
      state.studentName = `${state.studentFirstName} ${state.studentLastName}`.trim();
      saveState('Details saved');
    };
    firstNameInput.addEventListener('input', saveName);
    lastNameInput.addEventListener('input', saveName);
    classInput.addEventListener('input', () => {
      state.studentClass = classInput.value;
      saveState('Details saved');
    });
  }

  function bindGlobalActions() {
    const mc = document.getElementById('mc-questions');
    const written = document.getElementById('written-questions');
    if (mc) {
      mc.addEventListener('click', handleMcClick);
      mc.addEventListener('change', handleMcChange);
    }
    if (written) {
      written.addEventListener('input', handleWrittenInput);
      written.addEventListener('click', handleWrittenClick);
    }

    const printButton = document.getElementById('print-button');
    if (printButton) {
      printButton.textContent = 'Download PDF';
      printButton.addEventListener('click', () => {
      autoGrowAllTextareas();
      saveState('Saved – opening print view');
      downloadPdf();
      });
    }

    const resetButton = document.getElementById('reset-button');
    if (resetButton) resetButton.addEventListener('click', () => {
      const label = config.resetLabel || 'this lesson';
      const confirmed = window.confirm(`Reset all ${label} answers and student details on this browser? This cannot be undone.`);
      if (!confirmed) return;
      localStorage.removeItem(STORAGE_KEY);
      state = freshState();
      bindInitialValues();
      renderMcQuestions();
      renderWrittenQuestions();
      updateSummary();
      const status = document.getElementById('save-status');
      if (status) status.textContent = 'Lesson reset';
    });
  }

  function bindInitialValues() {
    const firstNameInput = document.getElementById('student-first-name');
    const lastNameInput = document.getElementById('student-last-name');
    const classInput = document.getElementById('student-class');
    if (firstNameInput) firstNameInput.value = state.studentFirstName;
    if (lastNameInput) lastNameInput.value = state.studentLastName;
    if (classInput) classInput.value = state.studentClass;
  }

  function initialise() {
    bindStudentFields();
    renderMcQuestions();
    renderWrittenQuestions();
    bindGlobalActions();
    updateSummary();
  }

  document.addEventListener('DOMContentLoaded', initialise);
}());

(function(){
  const el = (id)=>document.getElementById(id);
  const problemListEl = el('problemList');
  const problemTitleEl = el('problemTitle');
  const problemPromptEl = el('problemPrompt');
  const submissionsEl = el('submissions');
  const submissionDetailEl = el('submissionDetail');
  const commentsEl = el('comments');
  const commentForm = el('commentForm');
  const commentText = el('commentText');
  const commentSubmit = el('commentSubmit');
  const submitBtn = el('submitBtn');
  const runBtn = el('runBtn');
  const runLogEl = el('runLog');
  const langSel = el('language');
  const insertTplBtn = el('insertTplBtn');

  // Feature flags
  const ENABLE_EDIT_DELETE = false; // 임시로 수정/삭제 UI 비활성화

  let currentProblem = null;
  let currentSubmissionId = null;
  let currentReplyParentId = null;
  let currentExamples = [];
  let lastRunOk = false;
  let currentUser = null;

  const editor = ace.edit('editor');
  editor.setTheme('ace/theme/tomorrow_night');
  editor.session.setMode('ace/mode/javascript');

  // Utilities
  function formatDateWithWeekday(value){
    try{
      const d = value instanceof Date ? value : new Date(value);
      return d.toLocaleDateString('ko-KR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    }catch{ return String(value); }
  }
  function formatRelativeKorean(value){
    try{
      const now = Date.now();
      const t = (value instanceof Date ? value : new Date(value)).getTime();
      const diff = Math.max(0, now - t);
      const m = Math.floor(diff / 60000);
      if (m < 1) return '방금 전';
      if (m < 60) return `${m}분 전`;
      const h = Math.floor(m / 60);
      if (h < 24) return `${h}시간 전`;
      const d = Math.floor(h / 24);
      if (d < 7) return `${d}일 전`;
      // 1주 이상은 요일 포함된 날짜로
      return formatDateWithWeekday(value);
    } catch { return String(value); }
  }
  const jsTemplate = `// 문제 설명을 읽고 solve 함수를 구현하세요.
function solve(input){
  // input을 활용해 정답을 계산하여 반환하세요.
  // 예: return input;
  return input;
}

// 필요 시 아래에 보조 함수를 작성할 수 있습니다.
`;
  editor.setValue(jsTemplate, -1);
  window.aceEditor = editor; // ensure resize() usage elsewhere works

  const invalidateRun = () => {
    lastRunOk = false;
    if (submitBtn) submitBtn.disabled = true;
  };
  editor.session.on('change', invalidateRun);

  langSel.addEventListener('change', ()=>{
    const lang = langSel.value;
    editor.session.setMode('ace/mode/' + (lang === 'python' ? 'python' : 'javascript'));
    // JS만 실행 지원
    if (runBtn) runBtn.disabled = (lang !== 'javascript');
    invalidateRun();
  });

  if (insertTplBtn){
    insertTplBtn.addEventListener('click', ()=>{
      if (langSel.value === 'javascript'){
        editor.setValue(jsTemplate, -1);
        editor.focus();
        invalidateRun();
      } else {
        alert('현재는 JavaScript 템플릿만 제공합니다');
      }
    });
  }

  async function fetchJSON(url, opts){
    const res = await fetch(url, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts));
    if(!res.ok) throw new Error(await res.text());
    return res.json();
  }

  function renderProblems(list){
    problemListEl.innerHTML = '';
    list.forEach(p=>{
      const li = document.createElement('li');
      li.textContent = `[${p.difficulty}] ${p.title}`;
      li.setAttribute('data-id', String(p.id));
      li.addEventListener('click', ()=> selectProblem(p));
      problemListEl.appendChild(li);
    });

    // apply selected class if currentProblem already set
    if(currentProblem){
      [...problemListEl.children].forEach(li=>{
        li.classList.toggle('selected', Number(li.getAttribute('data-id')) === currentProblem.id);
      });
    }
  }

  // Render problem detail with friendly sections
  function renderProblemDetail(p){
    const examples = Array.isArray(p.examples) ? p.examples : [];
    // derive simple input/output hints from first example
    let inputHint = '';
    let outputHint = '';
    let resultDesc = '';
    let answerCriteria = '';
    if (examples[0]){
      const keys = examples[0].input && typeof examples[0].input === 'object' ? Object.keys(examples[0].input) : [];
      if (keys.length) inputHint = `입력은 다음 필드를 포함합니다: ${keys.join(', ')}`;
      const out = examples[0].output;
      // output type hint
      outputHint = `출력 타입 예시: ${Array.isArray(out) ? '배열' : typeof out}`;
      // describe result more concretely
      if (Array.isArray(out)){
        const allNumbers = out.every(v => typeof v === 'number');
        if (allNumbers && out.length === 2) {
          resultDesc = '길이 2의 정수 배열 [i, j]를 반환합니다 (예: 합이 target이 되는 두 인덱스)';
        } else if (allNumbers) {
          resultDesc = '정수 배열을 반환합니다.';
        } else {
          resultDesc = `배열 형태의 결과를 반환합니다${typeof out.length === 'number' ? ` (예: 길이 ${out.length})` : ''}.`;
        }
      } else if (out !== null && typeof out === 'object'){
        resultDesc = `객체 형태의 결과를 반환합니다 (필드: ${Object.keys(out).join(', ')}).`;
      } else if (typeof out === 'number'){
        resultDesc = '정수(또는 실수) 결과를 반환합니다.';
      } else if (typeof out === 'string'){
        resultDesc = '문자열 결과를 반환합니다.';
      } else if (typeof out === 'boolean'){
        resultDesc = '불리언(true/false) 결과를 반환합니다.';
      }

      // answer criteria description (generic but explicit)
      const outPreview = escapeHtml(JSON.stringify(out));
      answerCriteria = `함수 solve(input)의 반환값이 요구되는 결과 타입/구조를 만족하고, 동일한 입력에 대해 예시 출력과 동일한 규칙을 따를 때 정답으로 처리됩니다. (예시 출력 예: ${outPreview})`;
    }
    let html = '';
    html += `<section style="margin-bottom:10px">`
          +  `<h4 style="margin:0 0 6px">문제 설명</h4>`
          +  `<div style="white-space:pre-wrap">${escapeHtml(p.prompt || '')}</div>`
          + `</section>`;
    if (inputHint){
      html += `<section style="margin-bottom:10px">`
           +   `<h4 style="margin:0 0 6px">입력</h4>`
           +   `<div>${escapeHtml(inputHint)}</div>`
           + `</section>`;
    }
    if (outputHint){
      html += `<section style="margin-bottom:10px">`
           +   `<h4 style="margin:0 0 6px">출력</h4>`
           +   `<div>${escapeHtml(outputHint)}</div>`
           + `</section>`;
    }
    if (resultDesc){
      html += `<section style="margin-bottom:10px">`
           +   `<h4 style="margin:0 0 6px">결과값</h4>`
           +   `<div>${escapeHtml(resultDesc)}</div>`
           + `</section>`;
    }
    if (answerCriteria){
      html += `<section style="margin-bottom:10px">`
           +   `<h4 style="margin:0 0 6px">정답 기준</h4>`
           +   `<div class="muted" style="white-space:pre-wrap">${answerCriteria}</div>`
           + `</section>`;
    }
    if (examples.length){
      html += `<section>`
           +   `<h4 style="margin:0 0 6px">예시</h4>`
           +   examples.map((ex, i)=>
                 `<div style="padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:6px">`
               +   `<div style="opacity:.8;margin-bottom:4px">예시 #${i+1}</div>`
               +   `<pre class="code-block" style="margin:0 0 6px">입력: ${escapeHtml(JSON.stringify(ex.input, null, 2))}</pre>`
               +   `<pre class="code-block" style="margin:0">출력: ${escapeHtml(JSON.stringify(ex.output, null, 2))}</pre>`
               + `</div>`
               ).join('')
           + `</section>`;
    }
    problemPromptEl.innerHTML = html;
  }

  function selectProblem(p){
    currentProblem = p;
    problemTitleEl.textContent = `[${p.difficulty}] ${p.title}`;
    // Render immediately with basic daily info so 설명이 비지 않음
    renderProblemDetail(p);
    // load full problem for examples
    fetchJSON(`/api/algos/problems/${p.id}`).then(full => {
      currentExamples = Array.isArray(full.examples) ? full.examples : [];
      renderProblemDetail(full);
      invalidateRun();
      // optionally show example count
      if (runLogEl) runLogEl.textContent = currentExamples.length
        ? `예시 ${currentExamples.length}건이 준비되었습니다. 실행으로 검증하세요.`
        : `예시가 없어 자동 검증이 제한됩니다. 실행 시 결과가 생성되면 제출할 수 있습니다.`;
    }).catch(()=>{
      // fallback: keep daily item detail
      currentExamples = Array.isArray(p.examples) ? p.examples : [];
      invalidateRun();
      renderProblemDetail(p);
    });
    // highlight in list
    [...problemListEl.children].forEach(li=>{
      li.classList.toggle('selected', Number(li.getAttribute('data-id')) === p.id);
    });
    // After DOM updates, force Ace to recalc dimensions so the viewport height stays identical
    if (window.aceEditor) {
      // next tick to allow layout pass
      setTimeout(() => { try { window.aceEditor.resize(); } catch(_){} }, 0);
    }
    loadSubmissions(p.id);
  }

  function renderSubmissions(list){
    submissionsEl.innerHTML = '';
    list.forEach((s, idx)=>{
      const row = document.createElement('div');
      row.style.display='flex';
      row.style.alignItems='center';
      row.style.gap='8px';
      row.style.borderBottom='1px solid var(--border)';
      row.style.padding='8px 6px';

      const num = document.createElement('span');
      num.textContent = String(idx + 1);
      num.style.minWidth = '24px';
      num.style.opacity = '0.7';

      const link = document.createElement('div');
      link.style.flex='1';
      link.style.display='flex';
      link.style.alignItems='center';
      link.style.gap='10px';
      link.style.cursor='pointer';
      link.title = ENABLE_EDIT_DELETE ? '클릭: 상세 보기, 더블클릭: 수정' : '클릭: 상세 보기';

      const userEl = document.createElement('span');
      userEl.textContent = s.userName ? `@${s.userName}` : (s.userId ? `user#${s.userId}` : '익명');
      userEl.className = 'muted';

      const titleEl = document.createElement('span');
      titleEl.textContent = s.title || '제목 없음';
      titleEl.style.flex = '0 1 auto';

      const langEl = document.createElement('span');
      langEl.textContent = s.language;
      langEl.className = 'muted';

      const dateEl = document.createElement('span');
      dateEl.textContent = formatRelativeKorean(s.createdAt);
      dateEl.title = formatDateWithWeekday(s.createdAt);
      dateEl.className = 'muted';
      dateEl.style.marginLeft = 'auto';

      link.appendChild(titleEl);
      link.appendChild(userEl);
      link.appendChild(langEl);
      link.appendChild(dateEl);

      const del = document.createElement('button');
      del.textContent = '✕';
      del.className = 'btn btn-danger';
      del.style.padding='4px 8px';
      del.title = '삭제';

      link.addEventListener('click', ()=> loadSubmissionDetail(s.id));
      if (ENABLE_EDIT_DELETE){
        link.addEventListener('dblclick', ()=> loadSubmissionDetail(s.id, true));
      }

      row.appendChild(num);
      row.appendChild(link);
      if (ENABLE_EDIT_DELETE){
        del.addEventListener('click', (e)=>{ e.stopPropagation(); performDelete(s.id); });
        row.appendChild(del);
      }
      submissionsEl.appendChild(row);
    });
  }

  // Shared delete logic with POST fallback
  async function performDelete(id){
    if (!confirm('정말 삭제하시겠습니까? 관련 댓글도 삭제됩니다.')) return;
    try{
      try{
        await fetchJSON(`/api/algos/submissions/${id}`, { method:'DELETE' });
      }catch(e1){
        const msg = String(e1.message||'');
        const lmsg = msg.toLowerCase();
        // Some environments block DELETE and return an HTML error page
        if (lmsg.includes('cannot delete') || lmsg.startsWith('<!doctype html')){
          await fetchJSON(`/api/algos/submissions/${id}/delete`, { method:'POST' });
        } else if (lmsg.includes('not found')){
          alert('이미 삭제된 제출입니다. 목록을 새로고침합니다.');
          if (currentProblem) loadSubmissions(currentProblem.id);
          if (currentSubmissionId === id){ submissionDetailEl.innerHTML = ''; currentSubmissionId = null; }
          return;
        } else {
          throw e1;
        }
      }
      alert('삭제되었습니다');
      if (currentSubmissionId === id){ submissionDetailEl.innerHTML = ''; currentSubmissionId = null; }
      if (currentProblem) loadSubmissions(currentProblem.id);
    }catch(e){
      alert('삭제 실패: ' + e.message);
    }
  }

  async function loadProblems(){
    const data = await fetchJSON('/api/algos/daily');
    renderProblems(data);
    if(data[0]) selectProblem(data[0]);
  }

  async function loadSubmissions(problemId){
    const data = await fetchJSON(`/api/algos/submissions?problemId=${problemId}`);
    renderSubmissions(data);
  }

  // Render flat list as threaded comments (parentId links)
  function renderComments(list, parentId=null, depth=0){
    const container = document.createElement('div');
    (list.filter(c=>c.parentId===parentId)).forEach(c=>{
      const div = document.createElement('div');
      div.className = 'comment' + (depth>0 ? ' reply' : '');
      div.style.marginLeft = depth>0 ? '16px' : '0';
      div.innerHTML = `<div><b>${c.userName || '익명'}</b> • ${new Date(c.createdAt).toLocaleString()}</div>`+
                      `<div style="white-space:pre-wrap">${c.content}</div>`+
                      `<div><button data-id="${c.id}" class="replyBtn">답글</button></div>`;
      container.appendChild(div);
      const children = renderComments(list, c.id, depth+1);
      if (children) container.appendChild(children);
    });
    return container;
  }

  async function loadSubmissionDetail(id, startEdit=false){
    currentSubmissionId = id;
    // loading state
    submissionDetailEl.innerHTML = `<div class="spinner"></div> 불러오는 중...`;
    commentsEl.innerHTML = '';
    let s;
    try{
      s = await fetchJSON(`/api/algos/submissions/${id}`);
    }catch(err){
      showToast('제출 상세를 불러오지 못했습니다.', 'error');
      submissionDetailEl.innerHTML = '<div class="muted">불러오기 실패</div>';
      return;
    }
    const canEdit = currentUser && (currentUser.role === 'admin' || Number(currentUser.id) === Number(s.userId));
    const handle = s.userName ? `@${s.userName}` : (s.userId ? `user#${s.userId}` : '익명');
    const account = s.userId ? ` (id:${s.userId})` : '';
    submissionDetailEl.innerHTML = `<h4>${s.title}</h4>`+
      `<div class="muted"><i>${handle}${account} • ${s.language} • ${formatRelativeKorean(s.createdAt)}</i></div>`+
      `<pre id="submissionCode" class="code-block">${escapeHtml(s.code)}</pre>`+
      (canEdit && ENABLE_EDIT_DELETE ? `
        <div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap">
          <button id="editSubmissionBtn">수정</button>
          <button id="deleteSubmissionBtn" style="background:#a33;color:#fff">삭제</button>
        </div>
      ` : '');

    let comments = [];
    try{
      comments = await fetchJSON(`/api/algos/submissions/${id}/comments`);
    }catch{
      showToast('댓글을 불러오지 못했습니다.', 'warn');
    }
    commentsEl.innerHTML = '';
    const tree = renderComments(comments);
    if (tree) commentsEl.appendChild(tree);
    commentForm.style.display = 'block';

    // wire reply buttons
    commentsEl.querySelectorAll('.replyBtn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        currentReplyParentId = Number(btn.getAttribute('data-id'));
        commentText.placeholder = '답글 달기... (ESC로 취소)';
        commentText.focus();
      });
    });

    // edit/delete handlers
    const editBtn = document.getElementById('editSubmissionBtn');
    const delBtn = document.getElementById('deleteSubmissionBtn');
    if (ENABLE_EDIT_DELETE && editBtn){
      editBtn.addEventListener('click', ()=>{
        // replace pre with textarea and language selector + save/cancel
        const pre = document.getElementById('submissionCode');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
          <div style="margin-top:8px">
            <label>언어
              <select id="editLang">
                <option value="javascript" ${s.language==='javascript'?'selected':''}>JavaScript</option>
                <option value="python" ${s.language==='python'?'selected':''}>Python</option>
              </select>
            </label>
          </div>
          <textarea id="editCode" rows="12" style="width:100%; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; margin-top:6px"></textarea>
          <div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap">
            <button id="saveSubmissionBtn" class="btn btn-primary">저장</button>
            <button id="cancelEditBtn" class="btn">취소</button>
          </div>
        `;
        pre.replaceWith(wrapper);
        const editCode = document.getElementById('editCode');
        editCode.value = s.code;
        document.getElementById('cancelEditBtn').addEventListener('click', ()=>{
          loadSubmissionDetail(id);
        });
        document.getElementById('saveSubmissionBtn').addEventListener('click', async ()=>{
          const codeNew = editCode.value;
          const langNew = document.getElementById('editLang').value;
          if (!codeNew || !codeNew.trim()) { alert('코드를 입력하세요'); return; }
          try{
            try{
              await fetchJSON(`/api/algos/submissions/${id}`, { method:'PUT', body: JSON.stringify({ code: codeNew, language: langNew }) });
            }catch(e1){
            // Fallback to POST /update if upstream blocks PUT
            const msg = String(e1.message||'');
            const lmsg = msg.toLowerCase();
            if (lmsg.includes('cannot put') || lmsg.startsWith('<!doctype html')){
              await fetchJSON(`/api/algos/submissions/${id}/update`, { method:'POST', body: JSON.stringify({ code: codeNew, language: langNew }) });
            } else { throw e1; }
          }
            alert('저장되었습니다');
            loadSubmissionDetail(id);
            // refresh list
            if (currentProblem) loadSubmissions(currentProblem.id);
          }catch(e){
            alert('수정 실패: ' + e.message);
          }
        });
      });
    }
    if (ENABLE_EDIT_DELETE && delBtn){
      delBtn.addEventListener('click', ()=> performDelete(id));
    }

    // auto enter edit mode when requested
    if (ENABLE_EDIT_DELETE && startEdit && editBtn) editBtn.click();
  }

  submitBtn.addEventListener('click', async ()=>{
    if(!currentProblem) return alert('문제를 먼저 선택하세요');
    const codeVal = editor.getValue();
    if (!codeVal || !codeVal.trim()) return alert('코드를 입력하세요');
    if (!lastRunOk) return alert('먼저 실행을 통해 결과를 확인하고 통과해야 제출할 수 있습니다');
    const payload = {
      problemId: currentProblem.id,
      language: langSel.value,
      code: codeVal
    };
    try{
      await fetchJSON('/api/algos/submissions', { method:'POST', body: JSON.stringify(payload) });
      alert('제출 완료');
      loadSubmissions(currentProblem.id);
    }catch(e){
      alert('제출 실패: ' + e.message);
    }
  });

  // Deep equal for outputs
  function deepEqual(a, b){
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a && b && typeof a === 'object'){
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Array.isArray(a)){
        if (a.length !== b.length) return false;
        for (let i=0;i<a.length;i++){ if (!deepEqual(a[i], b[i])) return false; }
        return true;
      }
      const ka = Object.keys(a).sort();
      const kb = Object.keys(b).sort();
      if (!deepEqual(ka, kb)) return false;
      for (const k of ka){ if (!deepEqual(a[k], b[k])) return false; }
      return true;
    }
    return false;
  }

  // Run handler (JS only)
  if (runBtn){
    runBtn.addEventListener('click', () => {
      if (!currentProblem) { alert('문제를 먼저 선택하세요'); return; }
      if (langSel.value !== 'javascript') { alert('현재는 JavaScript 실행만 지원합니다'); return; }
      const code = editor.getValue();
      if (!code || !code.trim()) { 
        const template = `function solve(input) {
  // your code here
  return ;
}`;
        editor.setValue(template);
        alert('solve 함수를 정의하세요');
        return; 
      }
      let log = [];
      const logLine = (s)=>{ log.push(s); };
      let allPass = true;
      try{
        const runner = new Function('input', `${code}\n; if (typeof solve !== 'function') { throw new Error('solve 함수가 없습니다'); } return solve(input);`);
        const examples = currentExamples && currentExamples.length ? currentExamples : [{ input: {}, output: undefined }];
        for (let i=0;i<examples.length;i++){
          const ex = examples[i];
          try{
            const out = runner(structuredClone ? structuredClone(ex.input) : JSON.parse(JSON.stringify(ex.input)));
            if (ex.output === undefined && currentExamples.length === 0){
              // No official expected. Consider any defined result as pass
              const ok = (out !== undefined);
              allPass = allPass && ok;
              logLine(`#${i+1} 결과: ${ok ? 'PASS' : 'FAIL'}\n input: ${JSON.stringify(ex.input)}\n output: ${JSON.stringify(out)}`);
            } else {
              const ok = deepEqual(out, ex.output);
              allPass = allPass && ok;
              logLine(`#${i+1} ${ok ? 'PASS' : 'FAIL'}\n input: ${JSON.stringify(ex.input)}\n expected: ${JSON.stringify(ex.output)}\n actual:   ${JSON.stringify(out)}`);
            }
          } catch(err){
            allPass = false;
            logLine(`#${i+1} ERROR: ${err.message}`);
          }
        }
      } catch(e){
        allPass = false;
        logLine(`실행 준비 오류: ${e.message}`);
      }
      if (runLogEl) runLogEl.textContent = log.join('\n\n');
      lastRunOk = !!allPass;
      submitBtn.disabled = !lastRunOk;
    });
  }

  // Escape HTML for safe code preview
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[s]));
  }

  commentSubmit.addEventListener('click', async ()=>{
    if(!currentSubmissionId) return alert('제출을 먼저 선택하세요');
    const content = commentText.value.trim();
    if(!content) return;
    try{
      await fetchJSON(`/api/algos/submissions/${currentSubmissionId}/comments`, {
        method:'POST',
        body: JSON.stringify({ content, parentId: currentReplyParentId })
      });
      commentText.value='';
      currentReplyParentId = null;
      commentText.placeholder = '댓글을 입력하세요...';
      loadSubmissionDetail(currentSubmissionId);
    }catch(e){
      alert('댓글 실패: ' + e.message);
    }
  });

  // allow ESC to cancel reply mode
  commentText.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      currentReplyParentId = null;
      commentText.placeholder = '댓글을 입력하세요...';
      commentText.blur();
    }
  });

  // fetch current user (optional)
  fetch('/api/auth/me').then(r=> r.ok ? r.json() : null).then(u=>{ currentUser = u; }).catch(()=>{}).finally(()=>{
    loadProblems();
  });
})();

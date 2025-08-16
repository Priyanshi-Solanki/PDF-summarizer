// Sidebar collapse logic
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
sidebarToggle.onclick = () => {
  sidebar.classList.toggle('collapsed');
};
// Sidebar collapse logic
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
sidebarToggle.onclick = () => {
  sidebar.classList.toggle('collapsed');
};
// Sidebar summary history (localStorage for demo)
const summaryList = document.getElementById('summaryList');
const summaryOutput = document.getElementById('summaryOutput');
const summaryText = document.getElementById('summaryText');
const loader = document.getElementById('loader');
const generateBtn = document.getElementById('generateBtn');
const pdfInput = document.getElementById('pdfInput');
const uploadZone = document.getElementById('uploadZone');
const allPages = document.getElementById('allPages');
const pageRange = document.getElementById('pageRange');
const customInstructions = document.getElementById('customInstructions');
const summStyleRadios = document.getElementsByName('summStyle');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Drag & drop PDF
uploadZone.addEventListener('click', () => pdfInput.click());
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('hover'); });
uploadZone.addEventListener('dragleave', e => { e.preventDefault(); uploadZone.classList.remove('hover'); });
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('hover');
  const file = e.dataTransfer.files[0];
  if (file && file.type === 'application/pdf') {
    pdfInput.files = e.dataTransfer.files;
    showPreview(file);
  }
});
pdfInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) showPreview(file);
});
function showPreview(file) {
  document.getElementById('uploadPreview').innerHTML = `<span>${file.name} (${(file.size/1024/1024).toFixed(2)} MB)</span>`;
}

// Page selection logic
allPages.addEventListener('change', () => {
  pageRange.style.display = allPages.checked ? 'none' : 'block';
});

// Summarization style logic
summStyleRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    customInstructions.style.display = document.getElementById('custom').checked ? 'block' : 'none';
  });
});

// Generate summary (demo: fake loader & output)
generateBtn.addEventListener('click', () => {
  loader.style.display = 'block';
  summaryOutput.style.display = 'none';
  setTimeout(() => {
    loader.style.display = 'none';
    summaryOutput.style.display = 'block';
    const style = document.querySelector('input[name="summStyle"]:checked').value;
    let summary = '';
    if (style === 'pointwise') {
      summary = `<ul><li>Key point 1 from PDF...</li><li>Key point 2...</li></ul>`;
    } else if (style === 'paragraph') {
      summary = `This is a concise summary of your PDF document, highlighting the main ideas and findings.`;
    } else {
      summary = customInstructions.value || 'Custom summary generated.';
    }
    summaryText.innerHTML = summary;
    saveSummary(summary);
  }, 2000); // Simulate processing
});

// Save summary to sidebar (localStorage for demo)
function saveSummary(text) {
  let summaries = JSON.parse(localStorage.getItem('summaries') || '[]');
  summaries.unshift({ text, time: new Date().toLocaleString() });
  localStorage.setItem('summaries', JSON.stringify(summaries));
  renderSummaryList();
}
function renderSummaryList() {
  let summaries = JSON.parse(localStorage.getItem('summaries') || '[]');
  summaryList.innerHTML = '';
  summaries.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'sidebar-summary';
    li.innerHTML = `<a href="#" class="text-accent">${s.time}</a>`;
    li.onclick = () => {
      summaryText.innerHTML = s.text;
      summaryOutput.style.display = 'block';
    };
    summaryList.appendChild(li);
  });
}
renderSummaryList();

// Copy/download summary
copyBtn.onclick = () => {
  navigator.clipboard.writeText(summaryText.innerText);
};
downloadBtn.onclick = () => {
  const blob = new Blob([summaryText.innerText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'summary.txt';
  link.click();
};

// Auth modal logic (demo only)
document.getElementById('loginBtn').onclick = () => {
  new bootstrap.Modal(document.getElementById('authModal')).show();
};
document.getElementById('authForm').onsubmit = e => {
  e.preventDefault();
  // Validate and save user (demo)
  new bootstrap.Modal(document.getElementById('authModal')).hide();
};

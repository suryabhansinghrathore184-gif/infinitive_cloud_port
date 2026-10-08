// Infinitive Cloud Interactive Script Engine

document.addEventListener('DOMContentLoaded', () => {
  initHeroCloudCanvas();
  initDashboardChart();
  initCalculators();
  initDatacenterNodes();
  initModals();
  initMobileMenu();
});

/* -------------------------------------------------------------
   1. HERO CANVAS - Cyber Cloud Particle Matrix Visualizer
   ------------------------------------------------------------- */
function initHeroCloudCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 450;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 65;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.5 ? '#00f0ff' : '#0072ff'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw central glowing cloud orb
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const radialGradient = ctx.createRadialGradient(
      centerX, centerY, 10,
      centerX, centerY, 180
    );
    radialGradient.addColorStop(0, 'rgba(0, 150, 255, 0.25)');
    radialGradient.addColorStop(0.5, 'rgba(0, 100, 255, 0.08)');
    radialGradient.addColorStop(1, 'rgba(5, 8, 20, 0)');

    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
    ctx.fill();

    // Draw particle network connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 200, 255, ${0.25 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------
   2. DASHBOARD RESOURCE USAGE CHART (Canvas Live Waveform)
   ------------------------------------------------------------- */
function initDashboardChart() {
  const chartCanvas = document.getElementById('resourceChart');
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext('2d');

  let pointsCPU = [25, 30, 45, 35, 60, 50, 65, 40, 55, 70, 60, 48];
  let pointsMem = [40, 42, 45, 48, 52, 50, 55, 58, 62, 60, 64, 65];

  function drawChart() {
    const width = chartCanvas.width = chartCanvas.parentElement.clientWidth;
    const height = chartCanvas.height = 140;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Function to draw smooth line
    function drawLine(data, color, fillGradient) {
      const step = width / (data.length - 1);
      ctx.beginPath();
      ctx.moveTo(0, height - (data[0] / 100) * height);

      for (let i = 1; i < data.length; i++) {
        const x = i * step;
        const y = height - (data[i] / 100) * (height - 20) - 10;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill area under line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();
    }

    // Gradients
    const gradCPU = ctx.createLinearGradient(0, 0, 0, height);
    gradCPU.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
    gradCPU.addColorStop(1, 'rgba(0, 240, 255, 0)');

    const gradMem = ctx.createLinearGradient(0, 0, 0, height);
    gradMem.addColorStop(0, 'rgba(147, 51, 234, 0.25)');
    gradMem.addColorStop(1, 'rgba(147, 51, 234, 0)');

    drawLine(pointsCPU, '#00f0ff', gradCPU);
    drawLine(pointsMem, '#a855f7', gradMem);
  }

  drawChart();
  window.addEventListener('resize', drawChart);

  // Live real-time update simulation
  setInterval(() => {
    pointsCPU.shift();
    pointsCPU.push(Math.floor(Math.random() * 40) + 35);

    pointsMem.shift();
    pointsMem.push(Math.floor(Math.random() * 20) + 50);

    drawChart();

    // Update server status ping timers randomly
    const latencyEl = document.getElementById('dbLatency');
    if (latencyEl) {
      latencyEl.textContent = (Math.floor(Math.random() * 4) + 2) + ' ms';
    }
  }, 2500);
}

/* -------------------------------------------------------------
   3. CLOUD COST CALCULATOR / CUSTOMIZER
   ------------------------------------------------------------- */
function initCalculators() {
  const cpuSlider = document.getElementById('calcCpu');
  const ramSlider = document.getElementById('calcRam');
  const storageSlider = document.getElementById('calcStorage');

  const cpuVal = document.getElementById('valCpu');
  const ramVal = document.getElementById('valRam');
  const storageVal = document.getElementById('valStorage');
  const priceVal = document.getElementById('valPrice');

  if (!cpuSlider || !priceVal) return;

  function updatePrice() {
    const cpu = parseInt(cpuSlider.value);
    const ram = parseInt(ramSlider.value);
    const storage = parseInt(storageSlider.value);

    cpuVal.textContent = cpu + (cpu === 1 ? ' Core vCPU' : ' Cores vCPU');
    ramVal.textContent = ram + ' GB RAM';
    storageVal.textContent = storage + ' GB NVMe SSD';

    // Base formula: $4 base + $6/vCPU + $3/GB RAM + $0.15/GB NVMe
    const total = 4 + (cpu * 6) + (ram * 3) + Math.round(storage * 0.15);
    priceVal.textContent = '$' + total + '/mo';
  }

  cpuSlider.addEventListener('input', updatePrice);
  ramSlider.addEventListener('input', updatePrice);
  storageSlider.addEventListener('input', updatePrice);

  updatePrice();
}

/* -------------------------------------------------------------
   4. DATACENTER REGION SELECTOR
   ------------------------------------------------------------- */
function initDatacenterNodes() {
  const regionBtns = document.querySelectorAll('.region-btn');
  const pingDisplay = document.getElementById('regionPing');
  const regionNameDisplay = document.getElementById('regionName');

  const pings = {
    'Europe': '14 ms',
    'India': '4 ms',
    'USA': '38 ms'
  };

  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      regionBtns.forEach(b => b.classList.remove('bg-blue-600', 'text-white', 'border-blue-400'));
      regionBtns.forEach(b => b.classList.add('bg-slate-900/60', 'text-slate-400', 'border-slate-800'));

      btn.classList.remove('bg-slate-900/60', 'text-slate-400', 'border-slate-800');
      btn.classList.add('bg-blue-600', 'text-white', 'border-blue-400');

      const region = btn.getAttribute('data-region');
      if (regionNameDisplay) regionNameDisplay.textContent = region + ' Data Center';
      if (pingDisplay) pingDisplay.textContent = pings[region] || '12 ms';
    });
  });
}

/* -------------------------------------------------------------
   5. MODAL MANAGEMENT
   ------------------------------------------------------------- */
function initModals() {
  const portalModal = document.getElementById('portalModal');
  const openBtns = document.querySelectorAll('.open-portal-btn');
  const closeBtns = document.querySelectorAll('.close-modal-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (portalModal) portalModal.classList.remove('hidden');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (portalModal) portalModal.classList.add('hidden');
    });
  });

  if (portalModal) {
    portalModal.addEventListener('click', (e) => {
      if (e.target === portalModal) {
        portalModal.classList.add('hidden');
      }
    });
  }
}

/* -------------------------------------------------------------
   6. MOBILE NAVIGATION MENU
   ------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

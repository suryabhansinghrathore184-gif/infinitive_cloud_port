// INFINITIVE CLOUD - MASTER INTERACTIVE ENGINE

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroCloudCanvas();
  initDashboardChart();
  initCalculators();
  initDatacenterNodes();
  initModals();
  initMobileMenu();
});

/* -------------------------------------------------------------
   1. NAVBAR SCROLL TRANSFORMATION
   ------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------
   2. HERO CANVAS - 3D LAYERED NETWORK PARTICLE ENGINE
   ------------------------------------------------------------- */
function initHeroCloudCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 500;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 85;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 2.2 + 1,
      color: Math.random() > 0.4 ? '#00c8ff' : '#1683ff'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Atmospheric Core Glow
    const radialGrad = ctx.createRadialGradient(
      centerX, centerY, 15,
      centerX, centerY, 240
    );
    radialGrad.addColorStop(0, 'rgba(0, 200, 255, 0.24)');
    radialGrad.addColorStop(0.5, 'rgba(22, 131, 255, 0.09)');
    radialGrad.addColorStop(1, 'rgba(2, 8, 23, 0)');

    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 250, 0, Math.PI * 2);
    ctx.fill();

    // Draw connecting network lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 200, 255, ${0.28 * (1 - dist / 125)})`;
          ctx.lineWidth = 0.95;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update & draw particle nodes
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
   3. DASHBOARD REALTIME RESOURCE USAGE GRAPH
   ------------------------------------------------------------- */
function initDashboardChart() {
  const chartCanvas = document.getElementById('resourceChart');
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext('2d');

  let pointsCPU = [28, 35, 48, 40, 62, 54, 70, 45, 58, 75, 65, 52];
  let pointsMem = [42, 44, 46, 50, 55, 53, 58, 60, 65, 62, 68, 66];

  function drawChart() {
    const width = chartCanvas.width = chartCanvas.parentElement.clientWidth;
    const height = chartCanvas.height = 135;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    function drawLine(data, color, fillGradient) {
      const step = width / (data.length - 1);
      ctx.beginPath();
      ctx.moveTo(0, height - (data[0] / 100) * (height - 20) - 10);

      for (let i = 1; i < data.length; i++) {
        const x = i * step;
        const y = height - (data[i] / 100) * (height - 20) - 10;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();
    }

    const gradCPU = ctx.createLinearGradient(0, 0, 0, height);
    gradCPU.addColorStop(0, 'rgba(0, 200, 255, 0.35)');
    gradCPU.addColorStop(1, 'rgba(0, 200, 255, 0)');

    const gradMem = ctx.createLinearGradient(0, 0, 0, height);
    gradMem.addColorStop(0, 'rgba(168, 85, 247, 0.28)');
    gradMem.addColorStop(1, 'rgba(168, 85, 247, 0)');

    drawLine(pointsCPU, '#00c8ff', gradCPU);
    drawLine(pointsMem, '#a855f7', gradMem);
  }

  drawChart();
  window.addEventListener('resize', drawChart);

  setInterval(() => {
    pointsCPU.shift();
    pointsCPU.push(Math.floor(Math.random() * 40) + 38);

    pointsMem.shift();
    pointsMem.push(Math.floor(Math.random() * 18) + 52);

    drawChart();
  }, 2400);
}

/* -------------------------------------------------------------
   4. CLOUD COST CALCULATOR
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

    const total = 4 + (cpu * 6) + (ram * 3) + Math.round(storage * 0.15);
    priceVal.textContent = '$' + total + '/mo';
  }

  cpuSlider.addEventListener('input', updatePrice);
  ramSlider.addEventListener('input', updatePrice);
  storageSlider.addEventListener('input', updatePrice);

  updatePrice();
}

/* -------------------------------------------------------------
   5. DATACENTER REGION SWITCHER
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
      regionBtns.forEach(b => {
        b.classList.remove('bg-[#1683FF]', 'text-white', 'border-[#00C8FF]');
        b.classList.add('bg-[#061329]', 'text-[#7189A6]', 'border-slate-800');
      });

      btn.classList.remove('bg-[#061329]', 'text-[#7189A6]', 'border-slate-800');
      btn.classList.add('bg-[#1683FF]', 'text-white', 'border-[#00C8FF]');

      const region = btn.getAttribute('data-region');
      if (regionNameDisplay) regionNameDisplay.textContent = region + ' Data Center';
      if (pingDisplay) pingDisplay.textContent = pings[region] || '10 ms';
    });
  });
}

/* -------------------------------------------------------------
   6. MODAL MANAGEMENT
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
   7. MOBILE NAVIGATION MENU
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

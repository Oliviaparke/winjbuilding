/**
 * WIN-J BUILDING SOLUTION LLP - Interactive Scripts
 * Handles Lightbox (Images & Video), Filter Tabs, Mobile Nav, WhatsApp Integration, and Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------
  // 1. PROJECT DATA REPOSITORY (For Modal Lightbox)
  // --------------------------------------------------
  const projectsData = [
    {
      id: 0,
      title: "The Stonecrest Modern Villa",
      category: "Two-Storey Villa (On Going)",
      image: "assets/images/project-1.jpg",
      summary: "A modern dual-level residence defined by dramatic textured stone veneer accents, cantilevered rooflines, glass-paneled balconies, and warm ambient illumination. Currently under active turnkey construction.",
      specs: [
        { label: "Status", value: "On Going Construction" },
        { label: "Built-up Area", value: "3,450 sq.ft" },
        { label: "Configuration", value: "4 BHK + Home Theatre" },
        { label: "Floors", value: "Ground + First Floor" }
      ],
      highlights: [
        "Natural Slate Cladding",
        "Toughened Glass Balustrades",
        "Teak Wood Entryway",
        "Smart Facade Lighting",
        "Rainwater Harvesting"
      ]
    },
    {
      id: 1,
      title: "Recently Completed Project",
      category: "Completed Residential Walkthrough",
      video: "assets/videos/recent-project.mp4",
      summary: "On-site video walkthrough of our recently completed residential project, showcasing the finished exterior architecture, contemporary detailing, and interior spaces.",
      specs: [
        { label: "Status", value: "Completed & Handed Over" },
        { label: "Project Type", value: "Custom Turnkey Residence" },
        { label: "Location", value: "Kannur, Kerala" },
        { label: "Finish", value: "Premium Architectural Finish" }
      ],
      highlights: [
        "Completed Turnkey Handover",
        "Custom Interior Joinery",
        "Modern Exterior Elevation",
        "Architectural Ambient Lighting"
      ]
    },
    {
      id: 2,
      title: "The Terracotta Modern Bungalow",
      category: "Single-Storey Contemporary Villa (Completed)",
      image: "assets/images/project-3.jpg",
      summary: "A single-floor villa harmonizing exposed natural laterite brick masonry with clean horizontal roof profiles, landscaped boundary gardens, and a polished reflection driveway.",
      specs: [
        { label: "Status", value: "Completed Project" },
        { label: "Built-up Area", value: "2,650 sq.ft" },
        { label: "Configuration", value: "3 BHK + Courtyard" },
        { label: "Structure", value: "Climate-Responsive Brick Masonry" }
      ],
      highlights: [
        "Exposed Laterite Masonry",
        "Deep Shaded Verandas",
        "Internal Zen Courtyard",
        "Thermal Insulation Roofing",
        "Low-Maintenance Landscape"
      ]
    }
  ];

  let currentProjectIndex = 0;

  // --------------------------------------------------
  // 2. LIGHTBOX / PROJECT MODAL CONTROLLER (Image & Video)
  // --------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalVideo = document.getElementById('modalVideo');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalInquireBtn = document.getElementById('modalInquireBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');

  window.openLightbox = function(index) {
    currentProjectIndex = index;
    renderProjectModal(currentProjectIndex);
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
  }

  function renderProjectModal(index) {
    const p = projectsData[index];
    if (!p) return;

    modalCategory.textContent = p.category;
    modalTitle.textContent = p.title;
    modalDescription.textContent = p.summary;

    // Handle Video vs Image
    if (p.video) {
      if (modalImg) modalImg.style.display = 'none';
      if (modalVideo) {
        modalVideo.style.display = 'block';
        modalVideo.src = p.video;
        modalVideo.load();
      }
    } else {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.style.display = 'none';
        modalVideo.src = '';
      }
      if (modalImg) {
        modalImg.style.display = 'block';
        modalImg.src = p.image;
        modalImg.alt = p.title;
      }
    }

    // Render Specs
    modalSpecs.innerHTML = p.specs.map(spec => `
      <div class="modal-spec-row">
        <span>${spec.label}</span>
        <strong>${spec.value}</strong>
      </div>
    `).join('');

    // Render Highlights
    modalHighlights.innerHTML = p.highlights.map(tag => `
      <span class="tag-chip">${tag}</span>
    `).join('');

    // Bind inquire button
    modalInquireBtn.onclick = () => {
      closeLightbox();
      prefillProject(p.title);
    };
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeLightbox);
  if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    renderProjectModal(currentProjectIndex);
  });
  if (modalNextBtn) modalNextBtn.addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    renderProjectModal(currentProjectIndex);
  });

  // Close modal when clicking backdrop
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeLightbox();
    }
  });


  // --------------------------------------------------
  // 3. KEYBOARD ESCAPE LISTENER
  // --------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) closeLightbox();
    } else if (e.key === 'ArrowLeft' && projectModal.classList.contains('active')) {
      currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
      renderProjectModal(currentProjectIndex);
    } else if (e.key === 'ArrowRight' && projectModal.classList.contains('active')) {
      currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
      renderProjectModal(currentProjectIndex);
    }
  });


  // --------------------------------------------------
  // 4. PORTFOLIO FILTER TABS
  // --------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });


  // --------------------------------------------------
  // 5. PROJECT INQUIRY VIA WHATSAPP (INSTANT DIRECT CHAT)
  // --------------------------------------------------
  window.prefillProject = function(projectName) {
    const text = `Hi WIN-J Building Solution LLP, I am interested in discussing: ${projectName}. Please share details and consultation availability.`;
    const waUrl = `https://wa.me/919632326130?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };


  // --------------------------------------------------
  // 7. HEADER SCROLL EFFECT & ACTIVE NAVIGATION
  // --------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background toggle
    if (scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Scroll spy for active link
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // --------------------------------------------------
  // 8. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-footer a[href^="#"]');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

});

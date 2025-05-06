// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Close mobile menu if open
    mobileMenu.classList.remove("open");

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 3D Animation
function init3DAnimation() {
  const container = document.getElementById("animation-container");

  // Set container size
  container.style.width = "100%";
  container.style.height = "100%";

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Create geometry
  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);

  // Create material
  const material = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });

  // Create mesh
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.005;
    torus.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });

  animate();
}

// Initialize 3D animation when the page loads
window.addEventListener("load", init3DAnimation);

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const galleryItems = document.querySelectorAll(".gallery-item");

// Gallery data
const galleryData = [
  {
    img: "assets/tkj-1.png",
    title: "Absensi Foto",
    desc: "Kebiasaan yang rutin dilaksanakan setelah shalat dhuzur.",
  },
  {
    img: "assets/tkj-7.png",
    title: "Kunjungan Alumni TKJ",
    desc: "Belajar bersama dengan alumni angkatan 2020.",
  },
  {
    img: "assets/tkj-2.png",
    title: "Praktek Sejarah",
    desc: "Membuat scrapbook serta melakukan praktek kunjungan informasi.",
  },
  {
    img: "assets/tkj-4.png",
    title: "Belajar Dengan Guru PL",
    desc: "Materi baru dengan guru praktek lapangan yang menyenangkan.",
  },
  {
    img: "assets/tkj-9.png",
    title: "Foto Pertama Kali",
    desc: "Foto awal yang diambil dan akan segera genap satu tahun.",
  },
  {
    img: "assets/tkj-3.png",
    title: "H-1 Bersama Guru PL",
    desc: "Hari terakhir praktek lapangan bersama guru yang menyenangkan.",
  },
  {
    img: "assets/tkj-5.png",
    title: "Hari Guru",
    desc: "Merayakan hari guru sebelum memotong kue bersama walikelas.",
  },
  {
    img: "assets/tkj-8.png",
    title: "H-1 Dengan Alumni 2020",
    desc: "Kunjungan terakhir dari alumni yang menyenangkan.",
  },
  {
    img: "assets/tkj-10.png",
    title: "Belajar Sejarah Sebelum Puasa",
    desc: "Foto yang diambil tepat sehari sebelum berpuasa dengan mapel yang penuh cerita",
  },
  // {
  //   img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  //   title: "Perayaan Kelulusan",
  //   desc: "Momen bahagia setelah menyelesaikan ujian akhir dan merayakan keberhasilan bersama.",
  // },
];

let currentIndex = 0;

// Open lightbox
function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Update lightbox content
function updateLightbox() {
  const item = galleryData[currentIndex];
  lightboxImg.src = item.img;
  lightboxImg.alt = item.title;
  lightboxCaption.innerHTML = `<strong>${item.title}</strong><br>${item.desc}`;
}

// Navigate to previous image
function prevImage() {
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
  updateLightbox();
}

// Navigate to next image
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryData.length;
  updateLightbox();
}

// Add click event to gallery items
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Add event listeners for lightbox controls
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

// Close lightbox when clicking on the background
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  }
});

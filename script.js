// Musik: browser butuh satu sentuhan sebelum boleh bersuara.
const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');

function perbaruiTombolMusik() {
  const sedangMain = !music.paused;
  musicToggle.classList.toggle('playing', sedangMain);
  musicToggle.setAttribute('aria-label', sedangMain ? 'Matikan musik' : 'Nyalakan musik');
  musicToggle.setAttribute('title', sedangMain ? 'Matikan musik' : 'Nyalakan musik');
}

function cobaPutarMusik() {
  const hasil = music.play();
  if (hasil && hasil.then) {
    hasil.then(perbaruiTombolMusik).catch(perbaruiTombolMusik);
  } else {
    perbaruiTombolMusik();
  }
}

music.addEventListener('play', perbaruiTombolMusik);
music.addEventListener('pause', perbaruiTombolMusik);

musicToggle.addEventListener('click', function () {
  if (music.paused) {
    cobaPutarMusik();
  } else {
    music.pause();
  }
});

perbaruiTombolMusik();

const intro = document.getElementById('intro');
const mulai = document.getElementById('mulai');

let sudahMulai = false;

function mulaiSekarang() {
  if (sudahMulai) return;
  sudahMulai = true;
  intro.classList.add('d-none');
  musicToggle.classList.remove('d-none');
  cobaPutarMusik();
  confetti();
  _slideSatu();
}

mulai.addEventListener('click', mulaiSekarang);

let sudahSatu = false,
  sudahDua = false,
  sudahTiga = false,
  sudahEmpat = false,
  sudahLima = false;

const LEMBUT_MS = 1050;

function tampilkan(el) {
  el.classList.remove('d-none', 'fade-keluar');
  el.classList.add('fade-masuk');
}

function sembunyikan(el, selesai) {
  el.classList.remove('fade-masuk');
  el.classList.add('fade-keluar');
  if (selesai) setTimeout(selesai, LEMBUT_MS);
}

const _slideSatu = function () {
  if (sudahSatu) return;
  sudahSatu = true;
  tampilkan(document.getElementById('slideSatu'));
  setTimeout(_slideDua, 5500);
};

const _slideDua = function () {
  if (sudahDua) return;
  sudahDua = true;

  const slideSatu = document.getElementById('slideSatu');
  const slideDua = document.getElementById('slideDua');

  sembunyikan(slideSatu, function () {
    slideSatu.classList.add('d-none');
    tampilkan(slideDua);
    teks1Typer.go();
  });
};

const _slideTiga = function () {
  if (sudahTiga) return;
  sudahTiga = true;

  const slideDua = document.getElementById('slideDua');
  const slideTiga = document.getElementById('slideTiga');

  sembunyikan(slideDua, function () {
    slideDua.remove();
    tampilkan(slideTiga);
    teks2Typer.go();
  });
};

const _slideEmpat = function () {
  if (sudahEmpat) return;
  sudahEmpat = true;

  const slideTiga = document.getElementById('slideTiga');
  const slideEmpat = document.getElementById('slideEmpat');

  sembunyikan(slideTiga, function () {
    slideTiga.remove();
    tampilkan(slideEmpat);

    const gifGak = document.getElementById('gif-gak');
    let selesai = false;
    let timerLanjut = null;
    let intervalPindah = null;

    const lanjut = function () {
      if (selesai) return;
      selesai = true;
      clearTimeout(timerLanjut);
      clearInterval(intervalPindah);
      sembunyikan(slideEmpat, function () {
        slideEmpat.remove();
        _slideLima();
      });
    };

    const jadwalkanLanjut = function (ms) {
      clearTimeout(timerLanjut);
      timerLanjut = setTimeout(lanjut, ms);
    };

    const pindahKotak = function () {
      const lebar = slideEmpat.offsetWidth;
      const tinggi = slideEmpat.offsetHeight;
      const maxKiri = Math.max(0, (window.innerWidth - lebar) / 2 - 12);
      const maxAtas = Math.max(10, window.innerHeight - tinggi - 20);
      const minAtas = Math.min(150, maxAtas);
      let atas = 300;
      let kiri = 0;
      let percobaan = 0;

      do {
        atas = minAtas + Math.random() * Math.max(0, maxAtas - minAtas);
        kiri = (Math.random() * 2 - 1) * maxKiri;
        percobaan++;
      } while (
        Math.hypot(
          atas - (parseFloat(slideEmpat.style.top) || 300),
          kiri - (parseFloat(slideEmpat.style.left) || 0)
        ) < 90 && percobaan < 12
      );

      slideEmpat.style.top = atas + 'px';
      slideEmpat.style.left = kiri + 'px';
    };

    const mulaiPindah = function () {
      if (intervalPindah) return;
      intervalPindah = setInterval(pindahKotak, 1400);
    };

    document.getElementById('gak').addEventListener('click', function () {
      gifGak.classList.remove('d-none');
      mulaiPindah();
      pindahKotak();
      jadwalkanLanjut(8000);
    });

    document.getElementById('suka').addEventListener('click', lanjut);
    jadwalkanLanjut(8000);
  });
};

const _slideLima = function () {
  if (sudahLima) return;
  sudahLima = true;

  const slideLima = document.getElementById('slideLima');
  const trims = document.getElementById('trims');

  tampilkan(slideLima);
  setTimeout(function () {
    tampilkan(trims);
    trimsTyper.go();
  }, 900);

  setTimeout(function () {
    sembunyikan(slideLima);
    sembunyikan(trims);
    setTimeout(function () {
      slideLima.remove();
      trims.remove();
      _slideEnam();
    }, LEMBUT_MS);
  }, 6000);
};

const _slideEnam = function () {
  const slideEnam = document.getElementById('slideEnam');
  tampilkan(slideEnam);
  const gallery = slideEnam.querySelector('.gallery');
  setTimeout(function () {
    gallery.classList.add('aktif');
  }, 150);
};

const teks1Typer = new TypeIt("#teks1", {
  strings: [
    "Selamat ulang tahun, ya sayangkuu. 🎂💐",
    "Makasih sudah bertahan sampai hari ini, dan makasih sudah milih aku buat nemenin kamu.",
    "Aku bersyukur banget punya kamu. Doaku, semoga tahun ini lebih ringan buat kamu, sehat terus, dan semua yang kamu usahakan dimudahkan jalannya."
  ],
  startDelay: 700,
  speed: 55,
  lifeLike: false,
  afterComplete: function () {
    setTimeout(_slideTiga, 2000);
  }
});

const teks2Typer = new TypeIt("#teks2", {
  strings: [
    "Untuk kita: semoga kita terus bareng, saling jaga, dan kalau ada masalah kita hadapi berdua. 💙",
    "Untuk masa depan kamu: semoga semua yang kamu cita-citakan tercapai, dan aku masih di sini buat lihat itu.",
    "Panjang umur, bahagia terus. Aku sayang banget sama kamu🫰🏻."
  ],
  startDelay: 700,
  speed: 55,
  lifeLike: false,
  afterComplete: function () {
    setTimeout(_slideEmpat, 2200);
  }
});

const trimsTyper = new TypeIt("#trims", {
  strings: ["selamat ulang tahun cantikk. 🤍🫶🏻"],
  startDelay: 300,
  speed: 140
});



'use strict';

var onlyOnKonami = false;

function confetti() {
  // Globals
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000
  var isRunning = true

  setTimeout(() => {
    isRunning = false
  }, runFor);

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = .13,
    dyMax = .18,
    dThetaMin = .4,
    dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
    },
    function () {
      var black = 200 * random() | 0;
      return color(200, black, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, 200, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, 200 * random() | 0);
    },
    function () {
      return color(200 * random() | 0, 200, 200);
    },
    function () {
      var black = 256 * random() | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < .5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < .5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < .5 ? 2 : 4]();
    }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i, l, interval, a, b, c, d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2); // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = this.frame % 7777 / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }


  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti

      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
        count = 0;

      (function addConfetto() {

        if (onlyOnKonami && ++count > particles)
          return timer = undefined;

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);


      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer = konami[pointer] === event.which ?
      pointer + 1 :
      +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
};

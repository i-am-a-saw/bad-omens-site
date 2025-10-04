document.addEventListener('DOMContentLoaded', function() {
  const navBurger = document.querySelector('.nav__burger');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const navLogo = document.querySelector('.nav__logo');
  const playButton = document.getElementById('playButton');
  const musicModal = document.getElementById('musicModal');
  const closeModal = document.getElementById('closeModal');
  const playPauseBtn = document.getElementById('playPause');
  const prevTrackBtn = document.getElementById('prevTrack');
  const nextTrackBtn = document.getElementById('nextTrack');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const currentTimeDisplay = document.getElementById('currentTime');
  const totalTimeDisplay = document.getElementById('totalTime');
  const currentTrackTitle = document.getElementById('currentTrackTitle');
  const currentTrackArtist = document.getElementById('currentTrackArtist');
  const volumeSlider = document.getElementById('volumeSlider');
  const pages = document.querySelectorAll('.page');
  const breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');
  const highlightCards = document.querySelectorAll('.highlight__card');
  const tourTicketBtns = document.querySelectorAll('.tour__ticket');
  const newsReadMoreBtns = document.querySelectorAll('.news__read-more');
  const trackBtns = document.querySelectorAll('.track-btn');
  const hitPlayBtns = document.querySelectorAll('.hit__play');
  const albumPlayBtns = document.querySelectorAll('.album__play-btn');

  // State variables
  let currentPage = 'home';
  let currentTrackIndex = 0;
  let isPlaying = false;
  let currentAudio = null;
  let progressUpdateInterval = null;
  let currentTime = 0;
  let duration = 0;

  const tracks = [
      { 
          title: 'Just Pretend', 
          artist: 'Bad Omens', 
          album: 'The Death of Peace of Mind', 
          filename: 'Bad_Omens_-_Just_Pretend_73862271.mp3',
          demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-03.mp3',
          duration: 258,
          durationText: '4:18'
      },
      { 
          title: 'Like a Villain', 
          artist: 'Bad Omens', 
          album: 'The Death of Peace of Mind', 
          filename: 'BAD_OMENS_-_Like_A_Villain_74771096.mp3',
          demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-04.mp3',
          duration: 225,
          durationText: '3:45'
      },
      { 
          title: 'The Death of Peace of Mind', 
          artist: 'Bad Omens', 
          album: 'The Death of Peace of Mind', 
          filename: 'Bad_Omens_-_THE_DEATH_OF_PEACE_OF_MIND_73333767.mp3',
          demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-05.mp3',
          duration: 242,
          durationText: '4:02'
      },
      { 
          title: 'Glass Houses', 
          artist: 'Bad Omens', 
          album: 'Bad Omens (2016)', 
          filename: 'Bad_Omens_-_Glass_Houses_65367197.mp3',
          demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-06.mp3',
          duration: 222,
          durationText: '3:42'
      },
      { 
          title: 'Careful What You Wish For', 
          artist: 'Bad Omens', 
          album: 'Finding God Before God Finds Me', 
          filename: 'BAD_OMENS_-_Careful_What_You_Wish_For_73254762.mp3',
          demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-07.mp3',
          duration: 208,
          durationText: '3:28'
      },
      { 
          title: 'V.A.N.', 
          artist: 'Bad Omens ft. Poppy', 
          album: 'Concrete Jungle [The OST]', 
          filename: 'Bad_Omens_Poppy_-_VAN_77348502.mp3',
          demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
          duration: 238,
          durationText: '3:58'
      },
  {
    title: 'Dethrone',
    artist: 'Bad Omens',
    album: 'Finding God Before God Finds Me',
    filename: 'Bad_Omens_-_Dethrone.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 209,
    durationText: '3:29',
  },
  {
    title: 'Exit Wounds',
    artist: 'Bad Omens',
    album: 'Bad Omens (2016)',
    filename: 'Exit_Wounds.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 206,
    durationText: '3:26',
  },
  {
    title: 'The worst in me',
    artist: 'Bad Omens',
    album: 'Bad Omens (2016)',
    filename: 'The_worst_in_me.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 229,
    durationText: '3:49',
  },
  {
    title: 'The fountain',
    artist: 'Bad Omens',
    album: 'Bad Omens (2016)',
    filename: 'The_fountain.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 239,
    durationText: '3:59',
  },
  {
    title: 'What do you want from me?',
    artist: 'Bad Omens',
    album: 'Finding God Before God Finds Me',
    filename: 'WDYWFM.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 175,
    durationText: '2:55',
  },
  {
    title: 'Said & Done',
    artist: 'Bad Omens',
    album: 'Finding God Before God Finds Me',
    filename: 'Said_and_done.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 204,
    durationText: '3:24',
  },
  {
    title: 'Burning Out',
    artist: 'Bad Omens',
    album: 'Finding God Before God Finds Me',
    filename: 'Burning_out.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 265,
    durationText: '4:25',
  },
  {
    title: 'Specter',
    artist: 'Bad Omens',
    album: 'single',
    filename: 'Specter.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 274,
    durationText: '4:34',
  },
  {
    title: 'Impose',
    artist: 'Bad Omens',
    album: 'single',
    filename: 'Impose.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 263,
    durationText: '4:23',
  },
  {
    title: 'Anything > Human',
    artist: 'Bad Omens',
    album: 'The Death of Peace of Mind',
    filename: 'Anything.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 235,
    durationText: '3:55',
  },
  {
    title: 'The Drain',
    artist: 'Bad Omens',
    album: 'The Death of Peace of Mind',
    filename: 'Drain.mp3',
    demoUrl: 'https://www.soundjay.com/misc/sounds-relax/relax-08.mp3',
    duration: 225,
    durationText: '3:45',
  }
  ];

  console.log('Initializing Bad Omens multi-page website with working audio...');
  console.log('Pages found:', pages.length);
  console.log('Play button found:', !!playButton);
  console.log('Music modal found:', !!musicModal);

  // Audio Management with Fallback Demo System
  function createDemoAudio(trackIndex) {
      const track = tracks[trackIndex];
      
      let audio = new Audio();
      
      let hasTriedDemo = false;
      
      audio.addEventListener('error', function(e) {
          console.log(`Failed to load ${track.filename}, using demo simulation...`);
          if (!hasTriedDemo) {
              hasTriedDemo = true;
              startDemoPlayback(track);
          }
      });

      audio.addEventListener('loadstart', function() {
          console.log(`Loading ${track.filename}...`);
      });

      audio.src = track.filename;
      audio.preload = 'metadata';

      setTimeout(() => {
          if (audio.readyState === 0 && !hasTriedDemo) {
              console.log(`Timeout loading ${track.filename}, using demo simulation...`);
              hasTriedDemo = true;
              startDemoPlayback(track);
          }
      }, 2000);

      return audio;
  }

  function startDemoPlayback(track) {
      currentTime = 0;
      duration = track.duration;
      
      showNotification(`🎵 Демо воспроизведение: ${track.title}`, 'success');
      
      if (totalTimeDisplay) {
          totalTimeDisplay.textContent = track.durationText;
      }
      
      // Start demo progress simulation
      startProgressSimulation();
  }

  function startProgressSimulation() {
      stopProgressSimulation();
      
      progressUpdateInterval = setInterval(() => {
          if (isPlaying && currentTime < duration) {
              currentTime += 1;
              updateProgressDisplay();
          } else if (currentTime >= duration) {
              nextTrack();
          }
      }, 1000);
  }

  function stopProgressSimulation() {
      if (progressUpdateInterval) {
          clearInterval(progressUpdateInterval);
          progressUpdateInterval = null;
      }
  }

  function updateProgressDisplay() {
      if (progressFill && currentTimeDisplay && duration > 0) {
          const percentage = (currentTime / duration) * 100;
          progressFill.style.width = percentage + '%';
          currentTimeDisplay.textContent = formatTime(currentTime);
      }
  }

  function initializeAudio() {
      if (currentAudio) {
          currentAudio.pause();
          currentAudio.src = '';
          currentAudio = null;
      }
      
      stopProgressSimulation();
      
      const track = tracks[currentTrackIndex];
      if (track) {
          currentAudio = createDemoAudio(currentTrackIndex);
          
          // Set up real audio event listeners
          currentAudio.addEventListener('loadedmetadata', function() {
              console.log('Real audio metadata loaded:', track.title);
              duration = Math.floor(currentAudio.duration);
              if (totalTimeDisplay) {
                  totalTimeDisplay.textContent = formatTime(duration);
              }
              stopProgressSimulation(); // Stop demo, use real audio
          });

          currentAudio.addEventListener('timeupdate', function() {
              if (currentAudio && !currentAudio.paused) {
                  currentTime = Math.floor(currentAudio.currentTime);
                  duration = Math.floor(currentAudio.duration);
                  updateProgressDisplay();
              }
          });

          currentAudio.addEventListener('ended', function() {
              console.log('Real audio track ended, playing next...');
              nextTrack();
          });

          currentAudio.addEventListener('canplay', function() {
              console.log('Real audio can play:', track.title);
              showNotification(`✅ Загружен: ${track.title}`, 'success');
              stopProgressSimulation(); // Use real audio instead of demo
          });

          currentAudio.volume = (volumeSlider ? volumeSlider.value : 75) / 100;
      }
  }

  function formatTime(seconds) {
      if (isNaN(seconds) || seconds < 0) return '0:00';
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  // Page navigation system
  function showPage(pageName) {
      console.log('Navigating to page:', pageName);
      
      pages.forEach(page => {
          page.classList.remove('active');
      });
      
      const targetPage = document.getElementById(`page-${pageName}`);
      if (targetPage) {
          targetPage.classList.add('active');
          currentPage = pageName;
          
          navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.dataset.page === pageName) {
                  link.classList.add('active');
              }
          });
          
          if (navBurger && navMenu) {
              navBurger.classList.remove('active');
              navMenu.classList.remove('active');
              document.body.style.overflow = '';
          }
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          showNotification(`Переход на страницу: ${getPageTitle(pageName)}`, 'info');
      } else {
          console.error('Page not found:', pageName);
      }
  }

  function getPageTitle(pageName) {
      const titles = {
          home: 'Главная',
          about: 'О группе',
          discography: 'Дискография',
          tours: 'Туры',
          news: 'Новости'
      };
      return titles[pageName] || pageName;
  }

  // Navigation event listeners
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const pageName = this.dataset.page;
          if (pageName) {
              showPage(pageName);
          }
      });
  });

  // Logo click - go to home
  if (navLogo) {
      navLogo.addEventListener('click', function(e) {
          e.preventDefault();
          showPage('home');
      });
  }

  breadcrumbLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const pageName = this.dataset.page;
          if (pageName) {
              showPage(pageName);
          }
      });
  });

  highlightCards.forEach(card => {
      card.addEventListener('click', function() {
          const pageName = this.dataset.page;
          if (pageName) {
              showPage(pageName);
          }
      });
  });

  const heroOutlineBtn = document.querySelector('.hero__btn[data-page]');
  if (heroOutlineBtn) {
      heroOutlineBtn.addEventListener('click', function() {
          const pageName = this.dataset.page;
          if (pageName) {
              showPage(pageName);
          }
      });
  }

  // Burger menu functionality
  function toggleMobileMenu() {
      if (navBurger && navMenu) {
          navBurger.classList.toggle('active');
          navMenu.classList.toggle('active');
          document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      }
  }

  if (navBurger) {
      navBurger.addEventListener('click', toggleMobileMenu);
  }

  function openMusicModal() {
      console.log('Opening music modal...');
      if (musicModal) {
          musicModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          loadCurrentTrack();
          showNotification('🎵 Запуск музыкального плеера', 'success');
      } else {
          console.error('Music modal not found!');
          showNotification('Ошибка: музыкальный плеер не найден', 'error');
      }
  }

  function closeMusicModal() {
      console.log('Closing music modal...');
      if (musicModal) {
          musicModal.classList.add('hidden');
          document.body.style.overflow = '';
          pauseMusic();
      }
  }

  function loadCurrentTrack() {
      const track = tracks[currentTrackIndex];
      if (track && currentTrackTitle && currentTrackArtist && totalTimeDisplay) {
          currentTrackTitle.textContent = track.title;
          currentTrackArtist.textContent = `${track.artist} • ${track.album}`;
          totalTimeDisplay.textContent = track.durationText;
          
          // Reset progress
          currentTime = 0;
          updateProgressDisplay();
          
          // Initialize audio for this track
          initializeAudio();
          
          console.log('Loaded track:', track.title);
      }
  }

  function playTrackByName(trackName, durationStr) {
      console.log('Looking for track:', trackName);
      
      const trackIndex = tracks.findIndex(track => 
          track.title.toLowerCase().includes(trackName.toLowerCase()) ||
          trackName.toLowerCase().includes(track.title.toLowerCase())
      );
      
      if (trackIndex !== -1) {
          console.log('Found track at index:', trackIndex);
          currentTrackIndex = trackIndex;
          loadCurrentTrack();
          openMusicModal();
          // Small delay to ensure audio is initialized
          setTimeout(() => playMusic(), 200);
      } else {
          console.log('Track not found, available tracks:', tracks.map(t => t.title));
          showNotification(`Трек "${trackName}" не найден, воспроизводится демо`, 'warning');
  
          openMusicModal();
          setTimeout(() => playMusic(), 200);
      }
  }

  function togglePlayPause() {
      if (isPlaying) {
          pauseMusic();
      } else {
          playMusic();
      }
  }

  function playMusic() {
      isPlaying = true;
      
      // Update button states
      if (playPauseBtn) {
          playPauseBtn.textContent = '⏸';
      }
      if (playButton) {
          playButton.innerHTML = '<span class="play-icon">⏸</span>Пауза';
      }

      const track = tracks[currentTrackIndex];
      
      // Try to play real audio first
      if (currentAudio && currentAudio.readyState >= 2) {
          const playPromise = currentAudio.play();
          
          if (playPromise !== undefined) {
              playPromise.then(() => {
                  console.log('Real audio playing:', track.title);
                  showNotification(`▶ Воспроизводится: ${track.title}`, 'success');
              }).catch((error) => {
                  console.log('Real audio failed, using demo:', error);
                  startProgressSimulation();
                  showNotification(`🎵 Демо воспроизведение: ${track.title}`, 'warning');
              });
          }
      } else {
          // Fall back to demo simulation
          console.log('Using demo playback for:', track.title);
          startProgressSimulation();
          showNotification(`🎵 Демо воспроизведение: ${track.title}`, 'warning');
      }
  }

  function pauseMusic() {
      isPlaying = false;
      
      // Update button states
      if (playPauseBtn) {
          playPauseBtn.textContent = '▶';
      }
      if (playButton) {
          playButton.innerHTML = '<span class="play-icon">▶</span>Слушать сейчас';
      }


      if (currentAudio && !currentAudio.paused) {
          currentAudio.pause();
      }
      
      // Stop demo simulation
      stopProgressSimulation();
      
      showNotification('⏸ Воспроизведение приостановлено', 'info');
  }

  function stopPlaying() {
      isPlaying = false;
      
      if (playPauseBtn) {
          playPauseBtn.textContent = '▶';
      }
      if (playButton) {
          playButton.innerHTML = '<span class="play-icon">▶</span>Слушать сейчас';
      }

      if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
      }
      
      stopProgressSimulation();
      currentTime = 0;
      updateProgressDisplay();
  }

  function nextTrack() {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      const wasPlaying = isPlaying;
      loadCurrentTrack();
      if (wasPlaying) {
          setTimeout(() => playMusic(), 200);
      }
      showNotification(`⏭ Следующий трек: ${tracks[currentTrackIndex]?.title}`, 'info');
  }

  function previousTrack() {
      currentTrackIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
      const wasPlaying = isPlaying;
      loadCurrentTrack();
      if (wasPlaying) {
          setTimeout(() => playMusic(), 200);
      }
      showNotification(`⏮ Предыдущий трек: ${tracks[currentTrackIndex]?.title}`, 'info');
  }

  // Event listeners for music player
  if (playButton) {
      playButton.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Main play button clicked!');
          openMusicModal();
      });
  }

  if (closeModal) {
      closeModal.addEventListener('click', closeMusicModal);
  }

  if (playPauseBtn) {
      playPauseBtn.addEventListener('click', togglePlayPause);
  }

  if (prevTrackBtn) {
      prevTrackBtn.addEventListener('click', previousTrack);
  }
  
  if (nextTrackBtn) {
      nextTrackBtn.addEventListener('click', nextTrack);
  }

  if (progressBar) {
      progressBar.addEventListener('click', function(e) {
          const rect = this.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          const clickPercent = clickX / width;
          
          if (currentAudio && currentAudio.duration) {
              // Real audio
              const newTime = clickPercent * currentAudio.duration;
              currentAudio.currentTime = newTime;
              currentTime = Math.floor(newTime);
          } else {
              // Demo simulation
              currentTime = Math.floor(clickPercent * duration);
          }
          
          updateProgressDisplay();
          showNotification(`Перемотка на ${formatTime(currentTime)}`, 'info');
      });
  }

  if (volumeSlider) {
      volumeSlider.addEventListener('input', function() {
          const volume = parseInt(this.value) / 100;
          if (currentAudio) {
              currentAudio.volume = volume;
          }
          showNotification(`Громкость: ${this.value}%`, 'info');
      });
  }


  if (musicModal) {
      musicModal.addEventListener('click', function(e) {
          if (e.target === musicModal) {
              closeMusicModal();
          }
      });
  }

  // Escape key to close modal
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && musicModal && !musicModal.classList.contains('hidden')) {
          closeMusicModal();
      }
  });

  trackBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const trackName = this.dataset.track;
          const duration = this.dataset.duration;
          
          console.log('Track button clicked:', trackName);
          
          if (trackName) {
              playTrackByName(trackName, duration);
          }
      });
  });

  // Hit play buttons
  hitPlayBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const trackName = this.dataset.track;
          const duration = this.dataset.duration;
          
          console.log('Hit play button clicked:', trackName);
          
          if (trackName) {
              playTrackByName(trackName, duration);
          }
      });
  });

  // Album play buttons
  albumPlayBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const albumName = this.dataset.album;
          console.log('Album play button clicked:', albumName);
          
          showNotification(`🎵 Воспроизводится альбом: ${albumName}`, 'success');
          
          const albumTrack = tracks.find(track => 
              track.album.toLowerCase().includes(albumName.toLowerCase()) ||
              albumName.toLowerCase().includes(track.album.toLowerCase())
          );
          
          if (albumTrack) {
              const trackIndex = tracks.findIndex(track => track === albumTrack);
              currentTrackIndex = trackIndex;
              loadCurrentTrack();
              openMusicModal();
              setTimeout(() => playMusic(), 200);
          } else {
              // Default to first track
              currentTrackIndex = 0;
              loadCurrentTrack();
              openMusicModal();
              setTimeout(() => playMusic(), 200);
          }
      });
  });

  tourTicketBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const venue = this.dataset.venue;
          const city = this.dataset.city;
          
          showNotification(`🎫 Переход к покупке билетов: ${venue}, ${city}`, 'success');
          
          // Add loading state
          const originalText = this.textContent;
          this.textContent = 'Загрузка...';
          this.disabled = true;
          
          setTimeout(() => {
              this.textContent = originalText;
              this.disabled = false;
              showNotification('🎟️ Билеты можно приобрести на официальных сайтах площадок', 'info');
          }, 2000);
      });
  });

  // News read more functionality
  newsReadMoreBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const articleId = this.dataset.article;
          
          showNotification('📰 Открытие полной статьи...', 'info');
          
          // Simulate loading
          const originalText = this.textContent;
          this.textContent = 'Загрузка...';
          this.disabled = true;
          
          setTimeout(() => {
              this.textContent = originalText;
              this.disabled = false;
              showArticlePreview(articleId);
          }, 1500);
      });
  });

  function showArticlePreview(articleId) {
      const articles = {
          impose: {
              title: 'Bad Omens выпустили новый сингл "Impose"',
              content: 'Группа Bad Omens представила свой новый сингл "Impose" вместе с захватывающим музыкальным видео. Трек демонстрирует эволюцию звучания группы и продолжает традицию создания мощных и эмоциональных композиций.'
          },
          specter: {
              title: 'Новый сингл "Specter" дебютировал на #1',
              content: '"Specter" мгновенно завоевал чарты, достигнув первого места в Billboard Hot Hard Rock Songs. За первый месяц трек набрал более 13 миллионов прослушиваний по всему миру.'
          },
          tour: {
              title: 'Объявлен европейский тур',
              content: 'Bad Omens отправятся в масштабный европейский тур "Do You Feel Love" в конце 2025 года. Тур охватит крупнейшие арены Великобритании и континентальной Европы.'
          },
          milestone: {
              title: 'Группа достигла 250 миллионов прослушиваний',
              content: 'Bad Omens официально превысили отметку в 250 миллионов прослушиваний на всех стриминговых платформах, подтвердив свой статус одной из ведущих групп современного металкора.'
          },
          interview: {
              title: 'Noah Sebastian о будущем металкора',
              content: 'В эксклюзивном интервью вокалист группы поделился своим видением развития жанра и рассказал о влиянии современных технологий на создание музыки.'
          },
          awards: {
              title: 'Номинация на Heavy Music Awards',
              content: 'Bad Omens номинированы в категории "Лучшая международная группа" на Heavy Music Awards 2025. Церемония награждения пройдет в декабре в Лондоне.'
          }
      };

      const article = articles[articleId];
      if (article) {
          showNotification(`📖 ${article.title}`, 'success');
          setTimeout(() => {
              showNotification(`📝 ${article.content}`, 'info');
          }, 1000);
      }
  }

  // Notification system
  function showNotification(message, type = 'info') {
      // Remove existing notifications
      const existingNotifications = document.querySelectorAll('.notification');
      existingNotifications.forEach(notification => notification.remove());

      const notification = document.createElement('div');
      notification.className = `notification notification--${type}`;
      notification.textContent = message;
      
      // Styles for notification
      Object.assign(notification.style, {
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: type === 'success' ? '#22c55e' : 
                     type === 'error' ? '#ef4444' : 
                     type === 'warning' ? '#f59e0b' :
                     'var(--color-red-accent)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: '10001',
          transform: 'translateX(100%)',
          transition: 'transform 0.3s ease',
          maxWidth: '350px',
          wordWrap: 'break-word',
          fontSize: '14px',
          fontWeight: '500'
      });

      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
          notification.style.transform = 'translateX(0)';
      }, 100);

      // Remove after delay
      setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
              notification.remove();
          }, 300);
      }, 4000);
  }

  // Scroll effects for header
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.header');

  function updateHeaderOnScroll() {
      const currentScrollY = window.scrollY;
      
      if (header) {
          if (currentScrollY > 100) {
              header.style.background = 'rgba(10, 10, 10, 0.98)';
              header.style.backdropFilter = 'blur(20px)';
          } else {
              header.style.background = 'rgba(10, 10, 10, 0.95)';
              header.style.backdropFilter = 'blur(10px)';
          }
      }
      
      lastScrollY = currentScrollY;
  }

  function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              clearTimeout(timeout);
              func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
      };
  }

  const debouncedScrollHandler = debounce(updateHeaderOnScroll, 10);
  window.addEventListener('scroll', debouncedScrollHandler);

  // Intersection Observer for fade-in animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.album__card, .member__card, .hit__card, .tour__date, .news__card, .highlight__card, .achievement__item');
  animateElements.forEach(el => {
      observer.observe(el);
  });

  // Social media links tracking
  const socialLinks = document.querySelectorAll('.social__link');
  socialLinks.forEach(link => {
      link.addEventListener('click', function() {
          const platform = this.textContent.trim();
          showNotification(`🔗 Переход на ${platform}`, 'info');
      });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
      if (!musicModal || musicModal.classList.contains('hidden')) {
          switch(e.key) {
              case '1':
                  showPage('home');
                  break;
              case '2':
                  showPage('about');
                  break;
              case '3':
                  showPage('discography');
                  break;
              case '4':
                  showPage('tours');
                  break;
              case '5':
                  showPage('news');
                  break;
          }
      }
      
      // Music player controls (work globally)
      if (e.ctrlKey || e.metaKey) {
          switch(e.key) {
              case ' ':
                  e.preventDefault();
                  togglePlayPause();
                  break;
              case 'ArrowRight':
                  e.preventDefault();
                  nextTrack();
                  break;
              case 'ArrowLeft':
                  e.preventDefault();
                  previousTrack();
                  break;
          }
      }
  });

  // Easter egg - Konami code
  let konami = [];
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

  document.addEventListener('keydown', function(e) {
      konami.push(e.keyCode);
      
      if (konami.length > konamiCode.length) {
          konami.shift();
      }
      
      if (konami.length === konamiCode.length && konami.every((code, index) => code === konamiCode[index])) {
          showNotification('🎸 Секретный режим активирован! Bad Omens forever! 🎸', 'success');
          document.body.style.filter = 'hue-rotate(180deg)';
          
          // Play a special track
          currentTrackIndex = 0;
          loadCurrentTrack();
          openMusicModal();
          setTimeout(() => playMusic(), 200);
          
          setTimeout(() => {
              document.body.style.filter = '';
          }, 10000);
          konami = [];
      }
  });

  function initialize() {
      console.log('Bad Omens website initialized with working audio! 🎸');

      loadCurrentTrack();
      
      showPage('home');
      
      showNotification('🎸 Добро пожаловать на сайт Bad Omens!', 'success');
  }

  // Start the application
  initialize();

  // Console easter egg
  console.log(`
  ██████╗  █████╗ ██████╗      ██████╗ ███╗   ███╗███████╗███╗   ██╗███████╗
  ██╔══██╗██╔══██╗██╔══██╗    ██╔═══██╗████╗ ████║██╔════╝████╗  ██║██╔════╝
  ██████╔╝███████║██║  ██║    ██║   ██║██╔████╔██║█████╗  ██╔██╗ ██║███████╗
  ██╔══██╗██╔══██║██║  ██║    ██║   ██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║╚════██║
  ██████╔╝██║  ██║██████╔╝    ╚██████╔╝██║ ╚═╝ ██║███████╗██║ ╚████║███████║
  ╚═════╝ ╚═╝  ╚═╝╚═════╝      ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝
  `);
});

window.BadOmensApp = {
  playTrack: function(trackName) {
      const event = new CustomEvent('playTrack', { detail: { trackName } });
      document.dispatchEvent(event);
  },
  
  navigateTo: function(pageName) {
      const event = new CustomEvent('navigateTo', { detail: { pageName } });
      document.dispatchEvent(event);
  },
  
  showNotification: function(message, type = 'info') {
      const event = new CustomEvent('showNotification', { detail: { message, type } });
      document.dispatchEvent(event);
  }
};
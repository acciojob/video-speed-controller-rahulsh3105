  const video = document.querySelector('.flex');
  const speed = document.querySelector('.speed');
  const speedBar = document.querySelector('.speed-bar');

  function handlePlay() {
    const playButton = document.querySelector('.play-button');
    if (video.paused) {
      video.play();
      playButton.textContent = '❚❚';
    } else {
      video.pause();
      playButton.textContent = '►';
    }
  }

  function handleSpeedUpdate() {
    video.playbackRate = parseFloat(this.value);
    speedBar.textContent = `${video.playbackRate.toFixed(2)}×`;
  }

  function handleSkip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    const progressBar = document.querySelector('.progress-filled');
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / speed.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  video.addEventListener('click', handlePlay);
  video.addEventListener('timeupdate', handleProgress);

  const playButton = document.querySelector('.play-button');
  playButton.addEventListener('click', handlePlay);

  const skipButtons = document.querySelectorAll('[data-skip]');
  skipButtons.forEach(button => button.addEventListener('click', handleSkip));

  const playbackSpeed = document.querySelector('.playback-speed');
  playbackSpeed.addEventListener('input', handleSpeedUpdate);

  let isScrubbing = false;
  speed.addEventListener('mousedown', () => isScrubbing = true);
  speed.addEventListener('mousemove', (e) => isScrubbing && scrub(e));
  speed.addEventListener('mouseup', () => isScrubbing = false);
  speed.addEventListener('mouseleave', () => isScrubbing = false);
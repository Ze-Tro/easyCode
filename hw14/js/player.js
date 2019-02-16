class VideoPlayer {
	constructor(settings) {
		this._settings = Object.assign(VideoPlayer.DefaultSettings, settings);
		
	}

	init() {
		if (!this._settings.videoUrl) return console.error('Provide video Url');
		if (!this._settings.videoPlayerContainer) return console.error('Please provide video player container');
		
		// Создаем разметку для video
		this._addTemplate();
		
		// Найти все элементы управления
		this._setElements();
		

		// Установить обработчики событий
		this._setEvents();

		// Устанавливаем начальную величину громкости 
		this._video.volume = this._settings.volume;

		// Величина (default) перемотки по двойному клику
		if(!this._settings.doubleJumpValue) {
			this._settings.doubleJumpValue = this._settings.jumpValue * 2;
		}
	}

	toggle() {
		const method = this._video.paused ? 'play' : 'pause';
		this._toggleBtn.textContent = this._video.paused ? '❚❚' :  '►';
		this._video[method]();
	}

	_videoProgressHandler() {
		const percent = (this._video.currentTime / this._video.duration) * 100;
		this._progress.style.flexBasis = `${percent}%`;
	}

	_peremotka(event) {
		this._video.currentTime = (event.offsetX / this._progressContainer.offsetWidth) * this._video.duration;
	}
	
	/** Перемотка по клавишам блока player_control
	 * 
	 * @param {String} direction 
	 */
	_jump(direction) {
		if (direction === 'forward') {
			this._video.currentTime += this._settings.jumpValue;
		} else {
			this._video.currentTime -= this._settings.jumpValue;
		}
	}

	/** Установка величины громкости
	 * 
	 */
	_volume() {
		this._video.volume = +this._volumeLevel.value;
	}
	
	/** Установка скорости воспроизведения
	 * 
	 */
	_playbackSpeed() {
		this._video.playbackRate = +this._playbackRate.value;
	}
	
	/** Перемотка видео по двойному клику в блоке воспроизведения
	 * 
	 * @param {} event 
	 */
	_doubleJump(event) {
		const playerWidth = this._doubleClickJump.videoWidth;
		if (event.offsetX >= (playerWidth / 2)) {
			this._video.currentTime += this._settings.doubleJumpValue;
		} else {
			this._video.currentTime -= this._settings.doubleJumpValue;
		}
	}

	_addTemplate() {
		const template = this._createVideoTemplate();
		const container = document.querySelector(this._settings.videoPlayerContainer);
		container ? container.insertAdjacentHTML('afterbegin', template) : console.error('Video container was not found');
	}

	_setElements() {
		this._videoContainer = document.querySelector(this._settings.videoPlayerContainer);
		this._video = this._videoContainer.querySelector('video');
		this._toggleBtn = this._videoContainer.querySelector('.toggle');
		this._progress = this._videoContainer.querySelector('.progress__filled');
		this._progressContainer = this._videoContainer.querySelector('.progress');
		this._backwardButton = this._videoContainer.querySelector('[data-skip="backward"]');
		this._forwardButton = this._videoContainer.querySelector('[data-skip="forward"]');
		this._volumeLevel = this._videoContainer.querySelector('[name="volume"]');
		this._playbackRate = this._videoContainer.querySelector('[name="playbackRate"]');
		this._doubleClickJump = this._videoContainer.querySelector('.player__video');
	}

	_setEvents() {
		this._video.addEventListener('click', () => this.toggle());
		this._toggleBtn.addEventListener('click', () => this.toggle());
		this._video.addEventListener('timeupdate', () => this._videoProgressHandler());
		this._progressContainer.addEventListener('click', (e) => this._peremotka(e));
		this._backwardButton.addEventListener('click', () => this._jump('backward'));
		this._forwardButton.addEventListener('click', () => this._jump('forward'));
		this._volumeLevel.addEventListener('click', () => this._volume());
		this._playbackRate.addEventListener('click', () => this._playbackSpeed());
		this._doubleClickJump.addEventListener('dblclick', (e) => this._doubleJump(e));
	}

	_createVideoTemplate() {
		return `
		<div class="player">
			<video class="player__video viewer" src="${this._settings.videoUrl}"> </video>
			<div class="player__controls">
			  <div class="progress">
			  <div class="progress__filled"></div>
			  </div>
			  <button class="player__button toggle" title="Toggle Play">►</button>
			  <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="${this._settings.volume}">
			  <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="${this._settings.playbackRate}">
			  <button data-skip="backward" class="player__button">« ${this._settings.jumpValue}s</button>
			  <button data-skip="forward" class="player__button">${this._settings.jumpValue}s »</button>
			</div>
	  </div>
		`;
	}

	static get DefaultSettings() {
		return {
			videoUrl: '',
			videoPlayerContainer: 'body',
			volume: 0,
			playbackRate: 1,
			jumpValue: 1,
		};
	}
}


const playerInstance = new VideoPlayer({
	videoUrl: 'video/mov_bbb.mp4',
	jumpValue: 1,
	volume: 0.5
});

playerInstance.init();

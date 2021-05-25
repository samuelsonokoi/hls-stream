import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
declare let fluidPlayer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  videoSrc = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      title: 'Big Buck Bunny'
    },
    {
      src: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
      title: 'Live Akamai'
    },
    {
      src: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
      title: 'Apple'
    },
    {
      src: 'http://playertest.longtailvideo.com/adaptive/captions/playlist.m3u8',
      title: 'Purina Cat'
    },
    {
      src: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
      title: 'Sample from Apple'
    },
    // {
    //   src: 'http://media.developer.dolby.com/DolbyVision_Atmos/profile5_HLS/master.m3u8',
    //   title: 'Dolby Vision Profile 5'
    // },
  ];
  player: any;
  src: any;
  title = '';
  current = 0;
  options = {
    layoutControls: {
      fillToContainer: true,
      subtitlesEnabled: true,
      allowDownload: true,
      playbackRateEnabled: true,
      title: this.title ? this.title : '',
      controlForwardBackward: {
        show: true
      },
      autoPlay: true,
      captions: {
        play: 'Play',
        pause: 'Pause',
        mute: 'Mute',
        unmute: 'Unmute',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen'
      }
    }
  }
  loading = false;
  selectedIndex = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.src = this.videoSrc[0].src;
    this.title = this.videoSrc[0].title;
  }
  
  ngAfterViewInit() {
    this.initPlayer();
  }
  
  next = () => {
    this.loading = true;
    if (this.current < this.videoSrc.length - 1) {
      this.current += 1;
      this.setPlayer();
    }
  }

  previous = () => {
    this.loading = true;
    if (this.current !== 0) {
      this.current -= 1;
      this.setPlayer();
    }
  }

  initPlayer = () => {
    this.player = fluidPlayer('hls-video', this.options);
  }

  setPlayer = () => {
    this.src = this.videoSrc[this.current].src;
    this.title = this.videoSrc[this.current].title;
    this.loading = false;
    setTimeout(() => {
      this.initPlayer();
      this.player.play();
    }, 1000);
  }

  selected = () => {
    this.loading = true;
    this.current = this.selectedIndex;
    this.setPlayer();
  }
}

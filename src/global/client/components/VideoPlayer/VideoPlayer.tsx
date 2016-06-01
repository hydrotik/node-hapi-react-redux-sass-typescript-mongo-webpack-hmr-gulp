/// <reference path='../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';

const ReactPlayer = require('react-player');




// Styles
import './_VideoPlayer.scss';

// Page Components
import { DurationDisplay } from './components/DurationDisplay/DurationDisplay';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { PlayBackToggleButton } from './components/PlayBackToggleButton/PlayBackToggleButton';
import { VolumeButton } from './components/VolumeButton/VolumeButton';
import { FullScreenToggleButton } from './components/FullScreenToggleButton/FullScreenToggleButton';
// Behaviors and Actions

// Interfaces
interface IVideoPlayerProps {
    onPlayerEvent?: (event: IVideoPlayerEvent) => void;
}



export interface IVideoPlayerState {
    url?: string;
    playing?: boolean;
    volume?: number;
    played?: number;
    loaded?: number;
    muted?: boolean;
    duration?: number;
    seeking?: boolean;
    soundcloudConfig?: any;
    vimeoConfig?: any;
    youtubeConfig?: any;
    fullScreen?: boolean;
    width?: number;
    height?: number;
    hovered?: boolean;
}

interface IVideoPlayerEvent {
    url: string;
    playing: boolean;
    volume: number;
    muted: boolean;
    seeking: boolean;
    fullScreen: boolean;
    width: number;
    height: number;
    hovered: boolean;
    timetotal: string;
    timeremaining: string;
    timecompleted: string;
    percentloaded: number;
    percentcomplete: number;
}

let canvas, context;

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
            playing: true,
            volume: 0.8,
            played: 0,
            loaded: 0,
            duration: 0,
            muted: false,
            fullScreen: false,
            width: 0,
            height: 0,
            hovered: false
        };
    }

    refs: {
        [key: string]: (Element);
        player: any;
        videoWrapper: any;
        videoControls: any;
        progressBar: any;
        config: any;
        url: any;
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    public load = (url) => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        })
    };

    public handleMouseOver: any = (e: any): void => {
        this.setState({ hovered: true });
    };

    public handleMouseOut: any = (e: any): void => {
        this.setState({ hovered: false });
    };

    public playPause = () => {
        this.setState({ playing: !this.state.playing })
    };

    public stop = () => {
        this.setState({ url: null, playing: false })
    };

    public setVolume = (e) => {
        this.setState({ muted: (parseFloat(e.target.value) == 0) ? true : false, volume: parseFloat(e.target.value) })
    };

    public toggleMute = (e) => {
        this.setState({ muted: true, volume: 0 })
    };

    public onSeekMouseDown = (e) => {
        this.setState({ seeking: true })
    };

    public onSeekChange = (e) => {
        this.setState({ played: parseFloat(e.target.value) })
    };

    public onSeekMouseUp = (e) => {
        this.setState({ seeking: false })
        this.refs.player.seekTo(parseFloat(e.target.value))
    };

    public onProgress = (state) => {
        if (!this.state.seeking) {
            this.setState(state)
        }
    };

    public onPlayerEvent = (state) => {
        let { url, playing, volume, muted, seeking, fullScreen, width, height, hovered, played, duration, loaded }: IVideoPlayerState = state;
        let e: IVideoPlayerEvent = {
            url,
            playing,
            volume,
            muted,
            seeking,
            fullScreen,
            width,
            height,
            hovered,
            timetotal: this.getTimeTotal(duration),
            timeremaining: this.getTimeRemaining(duration, played),
            timecompleted: this.getTimeCompleted(duration, played),
            percentloaded: Math.round(loaded * 100),
            percentcomplete: Math.round(played * 100)
        };
        this.props.onPlayerEvent(e);
    };

    public getTimeTotal = (duration: number) => {
        return this.fromMilliseconds(duration);
    }

    public getTimeCompleted = (duration: number, played: number) => {
        return this.fromMilliseconds(duration * played);
    }

    public getTimeRemaining = (duration: number, played: number) => {
        return this.fromMilliseconds(duration * (1 - played));
    }

    public fromMilliseconds(ms: number): string {

        let hours, minutes, seconds, group;
        group = []

        hours = Math.floor(ms / 3600);
        minutes = Math.floor(ms % 3600 / 60);
        seconds = Math.floor(ms % 3600 % 60);

        //if (hours > 0) {
        group.push((hours > 9) ? hours : '0' + hours);
        //}
        group.push((minutes > 9) ? minutes : '0' + minutes);
        group.push((seconds > 9) ? seconds : '0' + seconds);

        return group.join(':');

    }

    public toggleFullscreen = () => {
        console.error('implementation needed!');
        // let d: any = document;

        // this.setState({
        //     fullScreen: !this.state.fullScreen
        // }, function() {
        //     if (this.state.fullScreen) {

        //         let docElm: any = d.documentElement;
        //         if (docElm.requestFullscreen) {
        //             this.getDOMNode().requestFullscreen();
        //         }
        //         if (docElm.webkitRequestFullScreen) {
        //             this.getDOMNode().webkitRequestFullScreen();
        //         }
        //         if (docElm.mozRequestFullScreen) {
        //             this.getDOMNode().mozRequestFullScreen();
        //         }
        //         if (docElm.msRequestFullscreen) {
        //             this.getDOMNode().msRequestFullscreen();
        //         }
        //     } else {
        //         if (d.exitFullscreen) {
        //             d.exitFullscreen();
        //         }
        //         if (d.mozCancelFullScreen) {
        //             d.mozCancelFullScreen();
        //         }
        //         if (d.webkitCancelFullScreen) {
        //             d.webkitCancelFullScreen();
        //         }
        //         if (d.msExitFullscreen) {
        //             d.msExitFullscreen();
        //         }
        //     }
        // });
    }

    public onConfigSubmit = () => {
        let config;
        try {
            config = JSON.parse(this.refs.config.value);
        } catch (error) {
            config = {};
            console.error('Error setting config:', error);
        }
        this.setState(config);
    };

    public renderLoadButton = (url, label) => {
        return (
            <button className="btn bg-teal btn-sm" onClick={() => this.load(url) }>
                {label}
            </button>
        )
    };


    public render(): React.ReactElement<{}> {


        const { hovered, url, muted, playing, volume, played, loaded, duration, soundcloudConfig, vimeoConfig, youtubeConfig, width, height} = this.state;

        let controlsClass = ClassNames({
            'video_controls': true,
            'hovered': hovered
        });

        const elapsed: string = this.getTimeCompleted(duration, played);
        const remaining: string = this.getTimeRemaining(duration, played);

        console.log(elapsed, remaining);


        return (
            <div className="video-player" ref="videoWrapper" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>

                <ReactPlayer
                    ref='player'
                    className='react-player'
                    width={640}
                    url={url}
                    playing={playing}
                    volume={volume}
                    soundcloudConfig={soundcloudConfig}
                    vimeoConfig={vimeoConfig}
                    youtubeConfig={youtubeConfig}
                    onPlay={() => this.setState({ playing: true }) }
                    onPause={() => this.setState({ playing: false }) }
                    onBuffer={() => console.log('onBuffer') }
                    onEnded={() => this.setState({ playing: false }) }
                    onError={(e) => console.log('onError', e) }
                    onProgress={this.onProgress}
                    onDuration={(duration) => this.setState({ duration }) }

                    />

                <div className={controlsClass} ref="videoControls">
                    <ProgressBar
                        handleProgressClick={this.onSeekChange}
                        percentBuffered={Math.floor(loaded * 100) }
                        played={played}
                        handleMouseDown={this.onSeekMouseDown}
                        handleChange={this.onSeekChange}
                        handleMouseUp={this.onSeekMouseUp}
                        ref="progressBar"
                        hovered={hovered}
                        />
                    <PlayBackToggleButton className="toggle_playback" handleTogglePlayback={this.playPause} playing={this.state.playing} />


                    <div className="rhs">
                        <FullScreenToggleButton onToggleFullscreen={this.toggleFullscreen} />
                    </div>
                    <div className="time">
                        <DurationDisplay time={this.getTimeCompleted(duration, played) } className="elapsed" /> | <DurationDisplay time={this.getTimeTotal(duration) } className="duration" />
                    </div>
                    <VolumeButton className="volume" muted={this.state.muted} level={volume} toggleVolume={this.toggleMute} changeVolume={this.setVolume} />
                </div>
            </div>
        );
    }
}
/// <reference path='../../../../../typings/main.d.ts' />

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

}

interface IVideoPlayerState {
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


        const elapsed: number = duration * played;
        const remaining: number = duration * (1 - played);

        let controlsClass = ClassNames({
            'video_controls': true,
            'hovered': hovered
        });

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
                        <DurationDisplay ms={elapsed} className="elapsed" /> | <DurationDisplay ms={duration} className="duration" />
                    </div>
                    <VolumeButton className="volume" muted={this.state.muted} level={volume} toggleVolume={this.toggleMute} changeVolume={this.setVolume} />
                </div>
            </div>
        );

        /*
                    <table width="100%"><tbody>
                        <tr>
                        <th>Controls</th>
                        <td>
                        <button onClick={this.stop}>Stop</button>
                        <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                        </td>
                        </tr>
                        <tr>
                        <th>Seek</th>
                        <td>
                        <input
                        type='range' min={0} max={1} step='any'
                        value={played}
                        onMouseDown={this.onSeekMouseDown}
                        onChange={this.onSeekChange}
                        onMouseUp={this.onSeekMouseUp}
                        className="seek_slider-demo"
                        />
                        </td>
                        </tr>
                        <tr>
                        <th>Volume</th>
                        <td>
                                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} className="volume_slider-demo" />
                        </td>
                        </tr>
                        <tr>
                        <th>Played</th>
                        <td><progress max={1} value={played} /></td>
                        </tr>
                        <tr>
                        <th>Loaded</th>
                        <td><progress max={1} value={loaded} /></td>
                        </tr>
                    </tbody></table>
                </section>
                <section className='section'>
                    <table><tbody>
                        <tr>
                        <th>YouTube</th>
                        <td>
                        {this.renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
                        {this.renderLoadButton('https://www.youtube.com/watch?v=jNgP6d9HraI', 'Test B')}
                        </td>
                        </tr>
                        <tr>
                        <th>SoundCloud</th>
                        <td>
                        {this.renderLoadButton('https://soundcloud.com/miami-nights-1984/accelerated', 'Test A')}
                        {this.renderLoadButton('https://soundcloud.com/bonobo/flashlight', 'Test B')}
                        </td>
                        </tr>
                        <tr>
                        <th>Vimeo</th>
                        <td>
                        {this.renderLoadButton('https://vimeo.com/90509568', 'Test A')}
                        {this.renderLoadButton('https://vimeo.com/94502406', 'Test B')}
                        </td>
                        </tr>
                        <tr>
                        <th>Files</th>
                        <td>
                        {this.renderLoadButton('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', 'MP4')}
                        {this.renderLoadButton('http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', 'OGV')}
                        {this.renderLoadButton('http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', 'WEBM')}
                        </td>
                        </tr>
                        <tr>
                        <th>Custom URL</th>
                        <td>
                        <input ref='url' type='text' placeholder='Enter URL' />
                        <button onClick={() => this.setState({ url: this.refs.url.value })}>Load</button>
                        </td>
                        </tr>
                        <tr>
                        <th>Custom config</th>
                        <td>
                        <textarea ref='config' placeholder='Enter JSON'></textarea>
                        <button onClick={this.onConfigSubmit}>Update Config</button>
                        </td>
                        </tr>
                    </tbody></table>

                    <h2>State</h2>

                    <table><tbody>
                        <tr>
                        <th>url</th>
                        <td className={!url ? 'faded' : ''}>{url || 'null'}</td>
                        </tr>
                        <tr>
                        <th>playing</th>
                        <td>{playing ? 'true' : 'false'}</td>
                        </tr>
                        <tr>
                        <th>volume</th>
                        <td>{volume.toFixed(3)}</td>
                        </tr>
                        <tr>
                        <th>played</th>
                        <td>{played.toFixed(3)}</td>
                        </tr>
                        <tr>
                        <th>loaded</th>
                        <td>{loaded.toFixed(3)}</td>
                        </tr>
                        <tr>
                        <th>duration</th>
                        <td><DurationDisplay ms={duration} className="duration" /></td>
                        </tr>
                        <tr>
                        <th>elapsed</th>
                        <td><DurationDisplay ms={elapsed} className="elapsed" /></td>
                        </tr>
                        <tr>
                        <th>remaining</th>
                        <td><DurationDisplay ms={remaining} className="remaining" /></td>
                        </tr>
                    </tbody></table>*/
    }
}
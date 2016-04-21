/// <reference path='../../../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_TimelineGui.scss';

// Page Components


// Interfaces
interface ITimelineGuiProps {
    // rotation?: number;
}

interface ITimelineGuiState {
    width?: number;
    height?: number;
}

interface ITimelineGuiSettings {
    trackLabelWidth: number;
    trackLabelHeight: number;
    tracksScrollWidth: number;
    tracksScrollHeight: number;
    tracksScrollThumbPos: number;
    tracksScrollThumbHeight: number;
    tracksScrollY: number;
    timeScrollWidth: number;
    timeScrollHeight: number;
    timeScrollThumbPos: number;
    timeScrollThumbWidth: number;
    timeScrollX: number;
    headerHeight: number;
    canvasHeight: number;
    draggingTime: boolean;
    draggingTracksScrollThumb: boolean;
    draggingTimeScrollThumb: boolean;
    draggingKeys: boolean;
    draggingTimeScale: boolean;
    selectedKeys: any[];
    timeScale: number;
    trackNameCounter: number;
    tracksScrollThumbDragOffset: number;
    cancelKeyClick: boolean;
    timeScrollThumbDragOffset: number;
    totalTime: number;
}

interface IContainerProps {
    height: string | number;
}

interface ISplitterProps {
    bottom: string | number;
}

// Settings
let settings: ITimelineGuiSettings = {
    trackLabelWidth: 108,
    trackLabelHeight: 20,
    tracksScrollWidth: 16,
    tracksScrollHeight: 0,
    tracksScrollThumbPos: 0,
    tracksScrollThumbHeight: 0,
    tracksScrollY: 0,
    timeScrollWidth: 0,
    timeScrollHeight: 16,
    timeScrollThumbPos: 0,
    timeScrollThumbWidth: 0,
    timeScrollX: 0,
    headerHeight: 30,
    canvasHeight: 200,
    draggingTime: false,
    draggingTracksScrollThumb: false,
    draggingTimeScrollThumb: false,
    draggingKeys: false,
    draggingTimeScale: false,
    selectedKeys: [],
    timeScale: 1,
    trackNameCounter: 0,
    tracksScrollThumbDragOffset: 0,
    cancelKeyClick: false,
    timeScrollThumbDragOffset: 0,
    totalTime: 0
}

let containerProps: IContainerProps = {
    height: settings.canvasHeight + 'px'
}

let splitterProps: ISplitterProps = {
    bottom: (settings.canvasHeight - 2) + 'px'
}

let width: number = 0;
let height: number = 0;

// TODO Properly Type!
let canvas: any;
// TODO Properly Type!
let c: any;
// TODO Properly Type!
let tracks: any[];

let time: number;

// TEMP!!
let anims: any[] = [
    { type: 'object', endTime: 1 },
    { type: 'property', endTime: 2.5 }
];

// https://github.com/dalisoft/timeline.js/blob/master/src/timeline-gui.js

export class TimelineGui extends React.Component<ITimelineGuiProps, ITimelineGuiState> {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            width: width,
            height: height
        };
    }

    refs: {
        [key: string]: (Element);
        canv: Element;
        wrapper: Element;
        container: Element;
    }

    public componentDidMount(): void {

        canvas = this.refs.canv;
        c = canvas.getContext('2d');

        window.addEventListener('resize', this.updateSize);


        this.initTracks();

        //TODO
        // this.buildInputDialog();

        setTimeout(this.updateSize, 100);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateSize);
    }

    public componentDidUpdate(): void {

    }

    public updateSize: any = (e: any): void => {
        width = this.refs.wrapper.clientWidth;
        height = this.refs.wrapper.clientHeight;
        this.setState({ width: width, height: height });

        this.updateGUI();
    };

    public updateGUI(): void {

        let w = this.state.width;
        let h = this.state.height;

        this.drawRect(0, 0, w, h, '#FF0000');


        // if (!this.canvas) {
        //     this.initGUI();
        // }

        // this.state.width = window.innerWidth;
        // this.state.height = this.canvasHeight;
        // let w = this.state.width;
        // let h = this.state.height;

        settings.tracksScrollHeight = this.state.height - settings.headerHeight - settings.timeScrollHeight;
        let totalTracksHeight: number = tracks.length * settings.trackLabelHeight;
        let tracksScrollRatio: number = settings.tracksScrollHeight / totalTracksHeight;
        settings.tracksScrollThumbHeight = Math.min(Math.max(20, settings.tracksScrollHeight * tracksScrollRatio), settings.tracksScrollHeight);

        settings.timeScrollWidth = this.state.width - settings.trackLabelWidth - settings.tracksScrollWidth;
        let animationEnd = this.findAnimationEnd();
        let visibleTime = this.xToTime(this.state.width - settings.trackLabelWidth - settings.tracksScrollWidth) - this.xToTime(0); //100 to get some space after lask key
        let timeScrollRatio = Math.max(0, Math.min(visibleTime / animationEnd, 1));
        settings.timeScrollThumbWidth = timeScrollRatio * settings.timeScrollWidth;
        if (settings.timeScrollThumbPos + settings.timeScrollThumbWidth > settings.timeScrollWidth) {
            settings.timeScrollThumbPos = Math.max(0, settings.timeScrollWidth - settings.timeScrollThumbWidth);
        }


        c.clearRect(0, 0, w, h);

        //buttons
        this.drawRect(0 * settings.headerHeight - 4 * -1, 5, settings.headerHeight - 8, settings.headerHeight - 8, "#DDDDDD");
        this.drawRect(1 * settings.headerHeight - 4 * 0, 5, settings.headerHeight - 8, settings.headerHeight - 8, "#DDDDDD");
        this.drawRect(2 * settings.headerHeight - 4 * 1, 5, settings.headerHeight - 8, settings.headerHeight - 8, "#DDDDDD");
        this.drawRect(3 * settings.headerHeight - 4 * 2, 5, settings.headerHeight - 8, settings.headerHeight - 8, "#DDDDDD");

        //play
        c.strokeStyle = "#777777";
        c.beginPath();
        c.moveTo(4 + 6.5, 5 + 5);
        c.lineTo(settings.headerHeight - 8, settings.headerHeight / 2 + 1.5);
        c.lineTo(4 + 6.5, settings.headerHeight - 8);
        c.lineTo(4 + 6.5, 5 + 5);
        c.stroke();

        //pause
        c.strokeRect(settings.headerHeight + 5.5, 5 + 5.5, settings.headerHeight / 6, settings.headerHeight - 8 - 11);
        c.strokeRect(settings.headerHeight + 5.5 + settings.headerHeight / 6 + 2, 5 + 5.5, settings.headerHeight / 6, settings.headerHeight - 8 - 11);

        //stop
        c.strokeRect(2 * settings.headerHeight - 4 + 5.5, 5 + 5.5, settings.headerHeight - 8 - 11, settings.headerHeight - 8 - 11);

        //export
        c.beginPath();
        c.moveTo(3 * settings.headerHeight - 4 * 2 + 5.5, settings.headerHeight - 9.5);
        c.lineTo(3 * settings.headerHeight - 4 * 2 + 11.5, settings.headerHeight - 9.5);
        c.moveTo(3 * settings.headerHeight - 4 * 2 + 5.5, settings.headerHeight - 13.5);
        c.lineTo(3 * settings.headerHeight - 4 * 2 + 13.5, settings.headerHeight - 13.5);
        c.moveTo(3 * settings.headerHeight - 4 * 2 + 5.5, settings.headerHeight - 17.5);
        c.lineTo(3 * settings.headerHeight - 4 * 2 + 15.5, settings.headerHeight - 17.5);
        c.stroke();

        //tracks area clipping path
        c.save();
        c.beginPath();
        c.moveTo(0, settings.headerHeight + 1);
        c.lineTo(this.state.width, settings.headerHeight + 1);
        c.lineTo(this.state.width, this.state.height - settings.timeScrollHeight);
        c.lineTo(0, this.state.height - settings.timeScrollHeight);
        c.clip();

        for (let i = 0; i < tracks.length; i++) {
            let yshift = settings.headerHeight + settings.trackLabelHeight * (i + 1);
            let scrollY = settings.tracksScrollY * (tracks.length * settings.trackLabelHeight - this.state.height + settings.headerHeight);
            yshift -= scrollY;
            if (yshift < settings.headerHeight) continue;
            this.drawTrack(tracks[i], yshift);
        }

        c.restore();

        //end of label panel
        this.drawLine(settings.trackLabelWidth, 0, settings.trackLabelWidth, h, "#000000");

        //timeline

        let timelineStart = 0;
        let timelineEnd = 10;
        let lastTimeLabelX = 0;

        c.fillStyle = "#666666";
        let x = this.timeToX(0);
        //for(let sec=timelineStart; sec<timelineEnd; sec++) {
        let sec = timelineStart;
        while (x < this.state.width) {
            x = this.timeToX(sec);
            this.drawLine(x, 0, x, settings.headerHeight * 0.3, "#999999");

            let minutes = Math.floor(sec / 60);
            let seconds = sec % 60;
            let time = minutes + ":" + ((seconds < 10) ? "0" : "") + seconds;

            if (x - lastTimeLabelX > 30) {
                c.fillText(time, x - 6, settings.headerHeight * 0.8);
                lastTimeLabelX = x;
            }
            sec += 1;
        }

        //time ticker
        this.drawLine(this.timeToX(time), 0, this.timeToX(time), h, "#FF0000");

        //time scale

        for (let j = 2; j < 20; j++) {
            let f = 1.0 - (j * j) / 361;
            this.drawLine(7 + f * (settings.trackLabelWidth - 10), h - settings.timeScrollHeight + 4, 7 + f * (settings.trackLabelWidth - 10), h - 3, "#999999");
        }

        c.fillStyle = "#666666";
        c.beginPath();
        c.moveTo(7 + (1.0 - settings.timeScale) * (settings.trackLabelWidth - 10), h - 7);
        c.lineTo(11 + (1.0 - settings.timeScale) * (settings.trackLabelWidth - 10), h - 1);
        c.lineTo(3 + (1.0 - settings.timeScale) * (settings.trackLabelWidth - 10), h - 1);
        c.fill();

        //tracks scrollbar
        this.drawRect(this.state.width - settings.tracksScrollWidth, settings.headerHeight + 1, settings.tracksScrollWidth, settings.tracksScrollHeight, "#DDDDDD");
        if (settings.tracksScrollThumbHeight < settings.tracksScrollHeight) {
            this.drawRect(this.state.width - settings.tracksScrollWidth, settings.headerHeight + 1 + settings.tracksScrollThumbPos, settings.tracksScrollWidth, settings.tracksScrollThumbHeight, "#999999");
        }

        //time scrollbar
        this.drawRect(settings.trackLabelWidth, h - settings.timeScrollHeight, w - settings.trackLabelWidth - settings.tracksScrollWidth, settings.timeScrollHeight, "#DDDDDD");
        if (settings.timeScrollThumbWidth < settings.timeScrollWidth) {
            this.drawRect(settings.trackLabelWidth + 1 + settings.timeScrollThumbPos, h - settings.timeScrollHeight, settings.timeScrollThumbWidth, settings.timeScrollHeight, "#999999");
        }

        //header borders
        this.drawLine(0, 0, w, 0, "#000000");
        this.drawLine(0, settings.headerHeight, w, settings.headerHeight, "#000000");
        this.drawLine(0, h - settings.timeScrollHeight, settings.trackLabelWidth, h - settings.timeScrollHeight, "#000000");
        this.drawLine(settings.trackLabelWidth, h - settings.timeScrollHeight - 1, settings.trackLabelWidth, h, "#000000");
    };

    public drawTrack(track, y) {
        let xshift = 5;
        if (track.type == "object") {
            //object track header background
            this.drawRect(0, y - settings.trackLabelHeight + 1, settings.trackLabelWidth, settings.trackLabelHeight - 1, "#FFFFFF");
            //label color
            c.fillStyle = "#000000";
        }
        else {
            xshift += 10;
            //label color
            c.fillStyle = "#555555";
        }

        //bottom track line
        this.drawLine(0, y, this.state.width, y, "#FFFFFF");
        //draw track label
        c.fillText(track.name, xshift, y - settings.trackLabelHeight / 4);

        //if it's property track then draw anims
        if (track.type == "property") {
            for (let i = 0; i < track.keys.length; i++) {
                let key = track.keys[i];
                let selected = false;
                if (settings.selectedKeys.indexOf(key) > -1) {
                    selected = true;
                }
                let first = (i === 0);
                let last = (i == track.keys.length - 1);
                this.drawRombus(this.timeToX(key.time), y - settings.trackLabelHeight * 0.5, settings.trackLabelHeight * 0.5, settings.trackLabelHeight * 0.5, "#999999", true, true, selected ? "#FF0000" : "#666666");
                this.drawRombus(this.timeToX(key.time), y - settings.trackLabelHeight * 0.5, settings.trackLabelHeight * 0.5, settings.trackLabelHeight * 0.5, "#DDDDDD", !first, !last);
            }
        }
    };


    public drawLine(x1: number, y1: number, x2: number, y2: number, color: string): void {
        c.strokeStyle = color;
        c.beginPath();
        c.moveTo(x1 + 0.5, y1 + 0.5);
        c.lineTo(x2 + 0.5, y2 + 0.5);
        c.stroke();
    };

    public drawRect(x: number, y: number, w: number, h: number, color: string): void {
        c.save();
        c.fillStyle = color;
        c.fillRect(x, y, w, h);
        c.restore();
    };

    public drawRectStroke(x: number, y: number, w: number, h: number, color: string, strokeColor: string): void {
        c.save();
        c.strokeStyle = strokeColor;
        c.fillStyle = color;
        c.strokeRect(x + .5, .5, w - 1, h - 1);
        c.restore();
    };

    public drawCenteredRect(x: number, y: number, w: number, h: number, color: string): void {
        c.fillStyle = color;
        c.fillRect(x - w / 2, y - h / 2, w, h);
    };

    public drawRombus(x: number, y: number, w: number, h: number, color: string, drawLeft?: boolean, drawRight?: boolean, strokeColor?: string): void {
        c.fillStyle = color;
        if (strokeColor) {
            c.lineWidth = 2;
            c.strokeStyle = strokeColor;
            c.beginPath();
            c.moveTo(x, y - h / 2);
            c.lineTo(x + w / 2, y);
            c.lineTo(x, y + h / 2);
            c.lineTo(x - w / 2, y);
            c.lineTo(x, y - h / 2);
            c.stroke();
            c.lineWidth = 1;
        }

        if (drawLeft) {
            c.beginPath();
            c.moveTo(x, y - h / 2);
            c.lineTo(x - w / 2, y);
            c.lineTo(x, y + h / 2);
            c.fill();
        }

        if (drawRight) {
            c.beginPath();
            c.moveTo(x, y - h / 2);
            c.lineTo(x + w / 2, y);
            c.lineTo(x, y + h / 2);
            c.fill();
        }
    };

    public timeToX(time: number): number {
        let animationEnd = this.findAnimationEnd();
        let visibleTime = this.xToTime(this.state.width - settings.trackLabelWidth - settings.tracksScrollWidth) - this.xToTime(20); //50 to get some additional space
        if (visibleTime < animationEnd) {
            time -= (animationEnd - visibleTime) * settings.timeScrollX;
        }

        return settings.trackLabelWidth + time * (settings.timeScale * 200) + 10;
    };

    public xToTime(x: number): number {
        let animationEnd = this.findAnimationEnd();
        let visibleTime = (this.state.width - settings.trackLabelWidth - settings.tracksScrollWidth - 20) / (settings.timeScale * 200);
        let timeShift = Math.max(0, (animationEnd - visibleTime) * settings.timeScrollX);
        return (x - settings.trackLabelWidth - 10) / (settings.timeScale * 200) + timeShift;
    };


    public initTracks(): void {
        tracks = [];
        let i, j;
        let anim;
        for (i = 0; i < anims.length; i++) {
            anim = anims[i];
            let objectTrack = null;
            let propertyTrack = null;
            for (j = 0; j < tracks.length; j++) {
                if (tracks[j].type == "object" && tracks[j].target == anim.target) {
                    objectTrack = tracks[j];
                }
                if (tracks[j].type == "property" && tracks[j].target == anim.target && tracks[j].propertyName == anim.propertyName) {
                    propertyTrack = tracks[j];
                }
            }
            if (!objectTrack) {
                objectTrack = {
                    type: "object",
                    id: anim.targetName,
                    name: anim.targetName,
                    target: anim.target,
                    propertyTracks: []
                };
                if (!objectTrack.name) {
                    objectTrack.name = "Object" + settings.trackNameCounter++;
                }
                tracks.push(objectTrack);
            }

            if (!propertyTrack) {
                propertyTrack = {
                    type: "property",
                    id: objectTrack.name + "." + anim.propertyName,
                    name: anim.propertyName,
                    propertyName: anim.propertyName,
                    target: anim.target,
                    parent: objectTrack,
                    anims: []
                };

                //find place to insert
                let parentObjectTrack = null;
                let nextObjectTrack = null;
                for (let k = 0; k < tracks.length; k++) {
                    if (tracks[k].type == "object") {
                        if (parentObjectTrack && !nextObjectTrack) {
                            nextObjectTrack = tracks[k];
                        }
                        if (tracks[k].target == propertyTrack.target) {
                            parentObjectTrack = tracks[k];
                        }
                    }
                }

                if (nextObjectTrack) {
                    //add ad the end of this object property tracks, just before next one
                    let nextTrackIndex = tracks.indexOf(nextObjectTrack);
                    tracks.splice(nextTrackIndex, 0, propertyTrack);
                }
                else {
                    //add to end of all track
                    tracks.push(propertyTrack);
                }

                parentObjectTrack.propertyTracks.push(propertyTrack);

            }

            propertyTrack.anims.push(anim);
        }
        //convert anims to keys
        for (i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.keys = [];
            if (track.type == "object") continue;
            for (j = 0; j < track.anims.length; j++) {
                anim = track.anims[j];
                if (anim.delay > 0) {
                    let startValue = 0;
                    let easing = anim.easing;
                    if (j === 0) {
                        startValue = track.target[track.propertyName];
                    }
                    else {
                        startValue = track.anims[j - 1].endValue;
                    }
                    track.keys.push({
                        time: anim.startTime,
                        value: startValue,
                        easing: easing,
                        track: track
                    });
                }
                let easingFunc = this.EaseNone;
                if (j < track.anims.length - 1) {
                    if (track.anims[j + 1].delay === 0) {
                        easingFunc = track.anims[j + 1].easing;
                    }
                }
                track.keys.push({
                    time: anim.endTime,
                    value: anim.endValue,
                    easing: easingFunc,
                    track: track
                });
            }
        }
    };

    public onMouseDown(event): void {
        settings.selectedKeys = [];

        var x = event.layerX;
        var y = event.layerY;

        if (x > settings.trackLabelWidth && y < settings.headerHeight) {
            //timeline
            settings.draggingTime = true;
            this.onCanvasMouseMove(event);
        }
        else if (x > this.state.width - settings.tracksScrollWidth && y > settings.headerHeight) {
            //tracks scroll
            if (y >= settings.headerHeight + settings.tracksScrollThumbPos && y <= settings.headerHeight + settings.tracksScrollThumbPos + settings.tracksScrollThumbHeight) {
                settings.tracksScrollThumbDragOffset = y - settings.headerHeight - settings.tracksScrollThumbPos;
                settings.draggingTracksScrollThumb = true;
            }
        }
        else if (x > settings.trackLabelWidth && y > settings.headerHeight && y < settings.canvasHeight - settings.timeScrollHeight) {
            //keys
            this.selectKeys(event.layerX, event.layerY);
            if (settings.selectedKeys.length > 0) {
                settings.draggingKeys = true;
            }
            settings.cancelKeyClick = false;
        }
        else if (x < settings.trackLabelWidth && y > settings.canvasHeight - settings.timeScrollHeight) {
            //time scale
            settings.timeScale = Math.max(0.01, Math.min((settings.trackLabelWidth - x) / settings.trackLabelWidth, 1));
            settings.draggingTimeScale = true;
            // this.save();
        }
        else if (x > settings.trackLabelWidth && y > settings.canvasHeight - settings.timeScrollHeight) {
            //time scroll
            if (x >= settings.trackLabelWidth + settings.timeScrollThumbPos && x <= settings.trackLabelWidth + settings.timeScrollThumbPos + settings.timeScrollThumbWidth) {
                settings.timeScrollThumbDragOffset = x - settings.trackLabelWidth - settings.timeScrollThumbPos;
                settings.draggingTimeScrollThumb = true;
            }
        }
    };

    public onDocumentMouseMove(event: any): void {
        var x = event.layerX;
        var y = event.layerY;

        if (settings.draggingTime) {
            time = this.xToTime(x);
            var animationEnd = this.findAnimationEnd();
            if (time < 0) time = 0;
            if (time > animationEnd) time = animationEnd;
        }
        if (settings.draggingKeys) {
            for (var i = 0; i < settings.selectedKeys.length; i++) {
                var draggedKey = settings.selectedKeys[i];
                draggedKey.time = Math.max(0, this.xToTime(x));
                this.sortTrackKeys(draggedKey.track);
                this.rebuildSelectedTracks();
            }
            settings.cancelKeyClick = true;
            settings.timeScrollThumbPos = settings.timeScrollX * (settings.timeScrollWidth - settings.timeScrollThumbWidth);
        }
        if (settings.draggingTimeScale) {
            settings.timeScale = Math.max(0.01, Math.min((settings.trackLabelWidth - x) / settings.trackLabelWidth, 1));
            // this.save();
        }
    };

    public onCanvasMouseMove(event: any): void {
        var x = event.layerX;
        var y = event.layerY;

        if (settings.draggingTracksScrollThumb) {
            settings.tracksScrollThumbPos = y - settings.headerHeight - settings.tracksScrollThumbDragOffset;
            if (settings.tracksScrollThumbPos < 0) {
                settings.tracksScrollThumbPos = 0;
            }
            if (settings.tracksScrollThumbPos + settings.tracksScrollThumbHeight > settings.tracksScrollHeight) {
                settings.tracksScrollThumbPos = Math.max(0, settings.tracksScrollHeight - settings.tracksScrollThumbHeight);
            }
            if (settings.tracksScrollHeight - settings.tracksScrollThumbHeight > 0) {
                settings.tracksScrollY = settings.tracksScrollThumbPos / (settings.tracksScrollHeight - settings.tracksScrollThumbHeight);
            }
            else {
                settings.tracksScrollY = 0;
            }
        }
        if (settings.draggingTimeScrollThumb) {
            settings.timeScrollThumbPos = x - settings.trackLabelWidth - settings.timeScrollThumbDragOffset;
            if (settings.timeScrollThumbPos < 0) {
                settings.timeScrollThumbPos = 0;
            }
            if (settings.timeScrollThumbPos + settings.timeScrollThumbWidth > settings.timeScrollWidth) {
                settings.timeScrollThumbPos = Math.max(0, settings.timeScrollWidth - settings.timeScrollThumbWidth);
            }
            if (settings.timeScrollWidth - settings.timeScrollThumbWidth > 0) {
                settings.timeScrollX = settings.timeScrollThumbPos / (settings.timeScrollWidth - settings.timeScrollThumbWidth);
            }
            else {
                settings.timeScrollX = 0;
            }
        }
    };

    public onMouseUp(event: any): void {
        if (settings.draggingTime) {
            settings.draggingTime = false;
        }
        if (settings.draggingKeys) {
            settings.draggingKeys = false;
        }
        if (settings.draggingTracksScrollThumb) {
            settings.draggingTracksScrollThumb = false;
        }
        if (settings.draggingTimeScale) {
            settings.draggingTimeScale = false;
        }
        if (settings.draggingTimeScrollThumb) {
            settings.draggingTimeScrollThumb = false;
        }
    };

    public onMouseClick(event: any): void {
        if (event.layerX < 1 * settings.headerHeight - 4 * 0 && event.layerY < settings.headerHeight) {
            console.warn('play()');
            // this.play();
        }
        if (event.layerX > 1 * settings.headerHeight - 4 * 0 && event.layerX < 2 * settings.headerHeight - 4 * 1 && event.layerY < settings.headerHeight) {
            console.warn('pause()');
            // this.pause();
        }

        if (event.layerX > 2 * settings.headerHeight - 4 * 1 && event.layerX < 3 * settings.headerHeight - 4 * 2 && event.layerY < settings.headerHeight) {
            console.warn('stop()');
            // this.stop();
        }

        if (event.layerX > 3 * settings.headerHeight - 4 * 2 && event.layerX < 4 * settings.headerHeight - 4 * 3 && event.layerY < settings.headerHeight) {
            console.warn('exportCode()');
            // this.exportCode();
        }

        if (settings.selectedKeys.length > 0 && !settings.cancelKeyClick) {
            console.warn('showKeyEditDialog()');
            // this.showKeyEditDialog(event.pageX, event.pageY);
        }
    };

    public onMouseDoubleClick(event: any): void {
        var x = event.layerX;
        var y = event.layerY;

        if (x > settings.trackLabelWidth && y < settings.headerHeight) {
            //timeline
            var timeStr = prompt("Enter time") || "0:0:0";
            var timeArr = timeStr.split(":");
            var seconds = 0;
            var minutes = 0;
            var hours = 0;
            if (timeArr.length > 0) seconds = parseInt(timeArr[timeArr.length - 1], 10);
            if (timeArr.length > 1) minutes = parseInt(timeArr[timeArr.length - 2], 10);
            if (timeArr.length > 2) hours = parseInt(timeArr[timeArr.length - 3], 10);
            time = settings.totalTime = hours * 60 * 60 + minutes * 60 + seconds;
        }
        else if (x > settings.trackLabelWidth && settings.selectedKeys.length === 0 && y > settings.headerHeight && y < settings.canvasHeight - settings.timeScrollHeight) {
            this.addKeyAt(x, y);
        }
    };

    public selectKeys(mouseX: number, mouseY: number): void {
        settings.selectedKeys = [];

        var selectedTrack = this.getTrackAt(mouseX, mouseY);

        if (!selectedTrack) {
            return;
        }

        for (var i = 0; i < selectedTrack.keys.length; i++) {
            var key = selectedTrack.keys[i];
            var x = this.timeToX(key.time);

            if (x >= mouseX - settings.trackLabelHeight * 0.3 && x <= mouseX + settings.trackLabelHeight * 0.3) {
                settings.selectedKeys.push(key);
                break;
            }
        }
    };

    public addKeyAt(mouseX: number, mouseY: number): void {
        var selectedTrack = this.getTrackAt(mouseX, mouseY);

        if (!selectedTrack) {
            return;
        }

        var newKey = {
            time: this.xToTime(mouseX),
            value: selectedTrack.target[selectedTrack.propertyName],
            easing: this.EaseNone,
            track: selectedTrack
        };
        if (selectedTrack.keys.length === 0) {
            selectedTrack.keys.push(newKey);
        }
        else if (newKey.time < selectedTrack.keys[0].time) {
            newKey.value = selectedTrack.keys[0].value;
            selectedTrack.keys.unshift(newKey);
        }
        else if (newKey.time > selectedTrack.keys[selectedTrack.keys.length - 1].time) {
            newKey.value = selectedTrack.keys[selectedTrack.keys.length - 1].value;
            selectedTrack.keys.push(newKey);
        }
        else for (var i = 1; i < selectedTrack.keys.length; i++) {
            if (selectedTrack.keys[i].time > newKey.time) {
                var k = (selectedTrack.keys[i].time - newKey.time) / (selectedTrack.keys[i].time - selectedTrack.keys[i - 1].time);
                var delta = selectedTrack.keys[i].value - selectedTrack.keys[i - 1].value;
                newKey.easing = selectedTrack.keys[i - 1].easing;
                newKey.value = selectedTrack.keys[i - 1].value + delta * newKey.easing(k);
                selectedTrack.keys.splice(i, 0, newKey);
                break;
            }
        }
        settings.selectedKeys = [newKey];
        this.rebuildSelectedTracks();
    };

    public getTrackAt(mouseX: number, mouseY: number): any {
        var scrollY = settings.tracksScrollY * (tracks.length * settings.trackLabelHeight - this.state.height + settings.headerHeight);
        var clickedTrackNumber = Math.floor((mouseY - settings.headerHeight + scrollY) / settings.trackLabelHeight);

        if (clickedTrackNumber >= 0 && clickedTrackNumber >= tracks.length || tracks[clickedTrackNumber].type == "object") {
            return null;
        }

        return tracks[clickedTrackNumber];
    };

    public sortTrackKeys(track: any): void {
        track.keys.sort(function(a, b) { return a.time - b.time; });

        var result = "";
        for (var i = 0; i < track.keys.length; i++) {
            result += track.keys[i].time + " ";
        }
    };

    public rebuildSelectedTracks(): void {
        for (var i = 0; i < settings.selectedKeys.length; i++) {
            this.rebuildTrackAnimsFromKeys(settings.selectedKeys[i].track);
        }
        // this.save();
    };

    public rebuildTrackAnimsFromKeys(track: any): void {
        var deletedAnims = [];
        var j;

        //remove all track's anims from the timeline
        for (j = 0; j < track.anims.length; j++) {
            var index = anims.indexOf(track.anims[j]);
            deletedAnims.push(track.anims[j]);
            anims.splice(index, 1);
        }

        //remove all anims from the track
        track.anims.splice(0, track.anims.length);

        if (track.keys.length === 0) {
            return;
        }

        var delay = track.keys[0].time;
        var prevKeyTime = track.keys[0].time;
        var prevKeyValue = track.keys[0].value;
        var prevKeyEasing = this.EaseNone;
        //create new anims based on keys
        for (j = 0; j < track.keys.length; j++) {
            var key = track.keys[j];
            var anim = {
                timeline: this,
                target: track.target,
                propertyName: track.propertyName,
                startValue: prevKeyValue,
                endValue: key.value,
                delay: delay,
                startTime: prevKeyTime,
                endTime: key.time,
                easing: prevKeyEasing
            };
            track.anims.push(anim);
            anims.push(anim);
            delay = 0;
            prevKeyTime = key.time;
            prevKeyValue = key.value;
            prevKeyEasing = key.easing;
        }
    };


    // From Timeline

    public findAnimationEnd(): number {
        let endTime = 0;
        for (let i = 0; i < anims.length; i++) {
            if (anims[i].endTime > endTime) {
                endTime = anims[i].endTime;
            }
        }
        return endTime;
    };

    public EaseNone = function(k: number): number {
        return k;
    };
    
    public render(): React.ReactElement<{}> {

        return (
            <div ref="wrapper" className="timeline-gui">
                <div ref="container" style={{ height: this.state.height }} className="timeline-gui-container">
                    <canvas ref="canv" width={this.state.width} height={this.state.height} />
                </div>
                <div ref="splitter" style={{ bottom: this.state.height - 2 }} className="timeline-gui-splitter">

                </div>
            </div>
        );
    }
}

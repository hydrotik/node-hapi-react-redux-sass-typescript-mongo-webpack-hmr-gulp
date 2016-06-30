import * as React from 'react';

//const VIDEO_CONTAINER_ID = 'flashContent';
/*
export interface IVideoPageProps {
    videoURL:string;
    fullyQualifiedSwfDIR:string;
    cuePoints:any;
}

export interface IVideoPageState {

}
*/

export class VideoEditor extends React.Component<any, any> {
    private VIDEO_CONTAINER_ID = 'flashContent';

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        alert('insallah');
        //this.load();
    }

  
  render(): React.ReactElement<{}> { 
    return (
        <div id={this.VIDEO_CONTAINER_ID}></div>
    )
  }
}


/*

    public load = () => {
        //
        this.addExternalInterface();

        //
        window["containerID"] = this.VIDEO_CONTAINER_ID;

        //
        window["swfDIR"] = this.props["fullyQualifiedSwfDIR"];

        //
        let script = document.createElement('script');
        script.src = this.props["fullyQualifiedSwfDIR"]+"swfobject.js";//"src/videoeditor/swfobject.js";   //TODO: config
        script.onload = function () {
            console.log('swfobject loaded ');
        };
        document.head.appendChild(script);   
    }

  
    public addExternalInterface = () => {
        window["getInitialEditorState"]=()=>
        {
            let obj = {};  
            obj["videoURL"] = this.props["videoURL"];

            //{
            //obj.cuePoints= '{ "cuePoints_arr": [{"timecode": 3.5, "products":"1, 12, 13"}, {"timecode": 9.5, "products":"21, 212, 213"}, {"timecode": 13.5, "products":"31, 312, 13"}] }';
            //obj.cuePoints= '{ "cuePoints_arr":'+this.props.cuePoints+ '}';
            const cuePoints = this.props["cuePoints"];
            const total = cuePoints.length;
            let str = '{ "cuePoints_arr":[';
            for ( let i=0; i<total; ++i ){
            str += ' {"timecode":' + cuePoints[i].timecode+',"products": '+ ' "'+cuePoints[i].products+ '"}';
            if( i+1 != total )
                str += ",";
            }
            str += '] }';
            obj["cuePoints"]=str;
            //}

            return obj;
        }
  }
  */
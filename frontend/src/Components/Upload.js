import React, {Component} from 'react';
import Dashboard from '@uppy/react/lib/Dashboard';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/xhr-upload';
import XHRUpload from '@uppy/xhr-upload';
import {Spring} from 'react-spring/renderprops';

class Upload extends Component {

    constructor(props, context){
        super(props);
          this.uppy = Uppy({
              restrictions: {
                  maxNumberOfFiles: 1
              }
                
          });
          this.uppy.use(XHRUpload, {
              endpoint: 'http://localhost:3001/upload',
              method: 'post',
              formData: 'true',
              fieldName: 'file',
              animateOpenClose: true
          });
          
    }
  
        render(){
        return (
          <Spring from={{opacity: 0}} to={{opacity: 1}} className="col-md-8">
            {props => (
              <div style={props}>
                <Dashboard uppy={this.uppy} />
              </div>
            )}
          </Spring>
        )};
}


export default Upload;
    


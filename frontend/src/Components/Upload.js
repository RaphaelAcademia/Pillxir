import React, {Component} from 'react';
import Dashboard from '@uppy/react/lib/Dashboard';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/xhr-upload';
import XHRUpload from '@uppy/xhr-upload';

class Upload extends Component {

    constructor(props, context){
        super(props);
          this.uppy = Uppy();
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
            <Dashboard uppy={this.uppy} />
          );
        }
            
       
    }

export default Upload;
    
import React, {Component} from 'react';
import {Card, Container} from 'react-bootstrap';
import Upload from './Upload';

function UploadReceipt() {

    return (
        <Container>
            <div class="row h-100 justify-content-center align-items-center mt-5" >
            <Upload/>
            </div>
        </Container>
    );
}


export default UploadReceipt;

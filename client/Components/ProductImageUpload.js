import React, { Component } from 'react';
import axios from 'axios';
import { updateProductImage } from '../store'
import { connect } from 'react-redux';

class ImageUploader extends Component {
    constructor() {
        super()
        this.state = {
            data_uri: '',
            filename: '',
            filetype: '',
            processing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const _this = this;

        this.setState({
            processing: true
        });

        axios.post('/api/FileUpload',
            {
                data_uri: this.state.data_uri,
                filename: this.state.filename,
                filetype: this.state.filetype
            })
            .then(res => res.data)
            .then(function (res) {
                _this.props.dispatch(updateProductImage(_this.props.productId, res.uri))
                _this.setState({
                    processing: false
                });
            });
    }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
    }

    render() {
        let processing;
        let uploaded;

        if (this.state.uploaded_uri) {
            uploaded = (
                <div>
                    <h4>Image uploaded!</h4>
                </div>
            );
        }

        if (this.state.processing) {
            processing = "Processing image, hang tight";
        }

        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <label>Upload an image</label>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input type="file" onChange={this.handleFile} />
                        <input disabled={processing ? "disabled" : false} className='btn btn-primary' type="submit" value="Upload" />
                        {processing}
                    </form>
                    {uploaded}
                </div>
            </div>
        );
    }
}

export default connect()(ImageUploader);
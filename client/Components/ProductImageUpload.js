import React, { Component } from 'react';
import axios from 'axios';
import { updateProductImage } from '../store'
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

class ImageUploader extends Component {
    constructor() {
        super()
        this.state = {
            data_uri: '',
            filename: '',
            processing: false,
            files: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const _this = this;

        this.setState({
            processing: true
        });

        axios.post('/api/FileUpload', { files: this.state.files })
            .then(res => res.data)
            .then(function (res) {
                console.log
                _this.props.dispatch(updateProductImage(_this.props.productId, res.fileUrls))
                _this.setState({
                    processing: false
                });
            });
    }

    handleOnDrop(files) {
        files.map(function (file) {
            const reader = new FileReader();

            reader.onload = (upload) => {
                const uploadedFile = {
                    data_uri: upload.target.result,
                    filename: file.name,
                    filetype: file.type
                }
                this.setState(prevState => ({ files: [...prevState.files, uploadedFile] }))
            };

            reader.readAsDataURL(file);
        }, this);
    }

    render() {
        let processing;
        let uploaded;
        const { handleSubmit, handleOnDrop } = this

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
            <div className='row' >
                <div className='col-sm-12'>
                    <label>Upload an image</label>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Dropzone disabled={processing ? true : false} onDrop={handleOnDrop}>
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        </Dropzone>
                        <input disabled={processing ? "disabled" : false} className='btn btn-primary' type="submit" value="Upload" />
                        {processing}
                        {uploaded}
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(ImageUploader);
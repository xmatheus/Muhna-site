import React, { Component } from 'react';

import FileList from './FileList';

import { uniqueId } from 'lodash';

import filesize from 'filesize';

import { Content, Button } from './styles';

/*
	apartir daqui estou usando styledComponents para facilitar o upload de arquivos
*/
import Upload from './upload';

import api from '../../../services/api';

export default class UploadFilesGallery extends Component {
	state = {
	    uploadFiles: []
	};

	componentWillUnmount = () => {
	    this.state.uploadFiles.forEach(file =>
	        URL.revokeObjectURL(file.preview)
	    );
	};

	handleUpload = files => {
	    let uploadFiles = files.map(file => ({
	        file,
	        idFake: uniqueId(),
	        name: file.name,
	        readbleSize: filesize(file.size),
	        preview: URL.createObjectURL(file),
	        value: 0,
	        uploaded: false,
	        error: false,
	        url: null,
	        id: null
	    }));

	    this.setState({
	        uploadFiles: this.state.uploadFiles.concat(uploadFiles)
	    });

	    uploadFiles.forEach(element => {
	        this.processUpload(element);
	    });
	};

	updateFile = (idFake, data) => {
	    this.setState({
	        uploadFiles: this.state.uploadFiles.map(uploadFile => {
	            return idFake === uploadFile.idFake
	                ? { ...uploadFile, ...data }
	                : uploadFile;
	        })
	    });
	};

	verifyMimetype = (mimetype = '', filename = '') => {
	    if (mimetype.split('/')[0] === 'image') {
	        return api.defaults.baseURL + '/galery/image?filename=' + filename;
	    }
	};

	handleDelete = async (idFake, id) => {
	    console.log(idFake, id);
	    await api.delete(`/galery?idfile=${id}`);

	    this.setState({
	        uploadFiles: this.state.uploadFiles.filter(
	            file => file.idFake !== idFake
	        )
	    });
	};

	processUpload = uploadFile => {
	    const data = new FormData();

	    data.append('file', uploadFile.file, uploadFile.name);

	    const config = {
	        onUploadProgress: progressEvent => {
	            let percentCompleted = Math.round(
	                (progressEvent.loaded * 100) / progressEvent.total
	            );
	            this.updateFile(uploadFile.idFake, {
	                value: percentCompleted
	            });
	        }
	    };
	    api.post('/galery', data, config)
	        .then(response => {
	            console.log(response);
	            if (response.status === 200) {
	                let { mimetype, filename, id } = response.data.file;
	                this.updateFile(uploadFile.idFake, {
	                    uploaded: true,
	                    id: id,
	                    url: this.verifyMimetype(mimetype, filename)
	                });
	            } else {
	                this.updateFile(uploadFile.idFake, { error: true });
	            }
	        })
	        .catch(() => {
	            this.updateFile(uploadFile.idFake, { error: true });
	        });
	};

	render() {
	    const { uploadFiles } = this.state;
	    return (
	        <Content>
	            <Upload onUpload={this.handleUpload}></Upload>
	            {!!uploadFiles.length && (
	                <FileList
	                    files={uploadFiles}
	                    onDelete={this.handleDelete}
	                />
	            )}
	            <Button onClick={this.props.closeModal}>Fechar</Button>
	        </Content>
	    );
	}
}

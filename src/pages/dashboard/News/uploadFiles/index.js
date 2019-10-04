import React, { Component } from 'react';

import FileList from './FileList';

import { uniqueId } from 'lodash';

import filesize from 'filesize';

import { Content } from './styles';

/*
	apartir daqui estou usando styledComponents para facilitar o upload de arquivos
*/
import Upload from './upload';

import api from '../../../services/api';

import yt from '../../../../assets/yt.jpg';

export default class UploadFiles extends Component {
	state = {
	    uploadFiles: []
	};

	componentWillUnmount = () => {
	    this.state.uploadFiles.forEach(file =>
	        URL.revokeObjectURL(file.preview)
	    );
	};

	componentDidMount = async () => {
	    const { newsid } = this.props;
	    console.log(this.props);
	    if (newsid) {
	        const response = await api.get(`/fileNews/news?newsid=${newsid}`);

	        const { image, video } = response.data;

	        console.log(response.data);

	        if (image !== undefined) {
	            const uploadedImage = image.map(file => ({
	                id: file.fileid,
	                idFake: file.fileid,
	                name: file.originalname,
	                readbleSize: filesize(file.size),
	                uploaded: true,
	                url:
						api.defaults.baseURL +
						`/fileNews/image?filename=${file.filename}`,
	                preview:
						api.defaults.baseURL +
						`/fileNews/image?filename=${file.filename}`
	            }));

	            this.setState({ uploadFiles: uploadedImage });
	        }
	        if (video !== undefined) {
	            const uploadedVideo = video.map(file => ({
	                id: file.fileid,
	                idFake: file.fileid,
	                name: file.originalname,
	                readbleSize: filesize(file.size),
	                uploaded: true,
	                url:
						api.defaults.baseURL +
						`/fileNews/video?filename=${file.filename}`,
	                preview: yt
	            }));

	            this.setState({
	                uploadFiles: this.state.uploadFiles.concat(uploadedVideo)
	            });
	        }
	    }
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
	    console.log(filename);
	    if (mimetype.split('/')[0] === 'image') {
	        return (
	            api.defaults.baseURL + '/fileNews/image?filename=' + filename
	        );
	    } else {
	        return (
	            api.defaults.baseURL + '/fileNews/video?filename=' + filename
	        );
	    }
	};

	verifyifVideo = mimetype => {
	    if (mimetype.split('/')[0] === 'video') {
	        return yt;
	    }
	};

	handleDelete = async (idFake, id) => {
	    console.log(idFake, id);
	    await api.delete(`/fileNews/?idfile=${id}`);

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
	    api.post(`/fileNews?newsid=${this.props.newsid}`, data, config)
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
	        </Content>
	    );
	}
}

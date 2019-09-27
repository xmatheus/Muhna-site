import React, { Component } from 'react';

// import { Container } from './styles';

import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class EditorText extends Component {
	componentDidMount = () => {
	    ClassicEditor.create(document.querySelector('#editor'), {
	        removePlugins: ['ImageUpload', 'Table']
	    }).catch(error => {
	        console.log(error);
	    });
	};

	render() {
	    return (
	        <CKEditor
	            id="editor"
	            editor={ClassicEditor}
	            data="<p>Digite o texto da notícia</p><p/><p/><p/><p/><p/><p/>"
	            onInit={editor => {
	                // You can store the "editor" and use when it is needed.
	                // console.log('Editor is ready to use!', editor);
	            }}
	            onChange={this.props.onChange}
	        />
	    );
	}
}

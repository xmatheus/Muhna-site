import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import './styles.css';

const defaultText =
	'<p>Escreva o texto da <strong>notícia</strong> aqui 😀</p>';
export default class EditorText extends Component {
    constructor(props) {
        super(props);
        this.changeTextEditor();
    }

	changeTextEditor = texto => {
	    const html = texto || this.props.html || defaultText;
	    const contentBlock = htmlToDraft(html);
	    if (contentBlock) {
	        const contentState = ContentState.createFromBlockArray(
	            contentBlock.contentBlocks
	        );
	        const editorState = EditorState.createWithContent(contentState);
	        this.state = {
	            editorState
	        };
	    }
	};
	onEditorStateChange: Function = editorState => {
	    this.setState({
	        editorState
	    });
	    this.props.onChange(
	        draftToHtml(convertToRaw(editorState.getCurrentContent()))
	    );
	};

	render() {
	    const { editorState } = this.state;
	    return (
	        <div className="editor-main-div">
	            <Editor
	                editorState={editorState}
	                wrapperClassName="demo-wrapper"
	                editorClassName="demo-editor"
	                toolbarClassName="toolbar-class"
	                onEditorStateChange={this.onEditorStateChange}
	            />
	        </div>
	    );
	}
}

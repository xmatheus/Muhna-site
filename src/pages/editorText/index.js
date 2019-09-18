import React, { Component } from 'react';

// import { Container } from './styles';

import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class EditorText extends Component {
    render() {
        return (
            <div className="editor-main-div">
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Editor de texto mega bolado</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        console.log(data);
                    }}
                />
            </div>
        );
    }
}

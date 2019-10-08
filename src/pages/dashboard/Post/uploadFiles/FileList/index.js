import React from 'react';

import { Container, FileInfo, Preview } from './styles';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

const FileList = ({ files, onDelete }) => (
    <Container>
        {files.map(uploadfile => (
            <li key={uploadfile.idFake}>
                <FileInfo>
                    <div>
                        <Preview src={uploadfile.preview}></Preview>
                        <span>{uploadfile.readbleSize}</span>
                    </div>

                    <div>
                        <strong>
                            {uploadfile.name.length > 15
                                ? uploadfile.name.substring(0, 15) + '...'
                                : uploadfile.name}
                        </strong>
                    </div>
                </FileInfo>
                <div>
                    {!!uploadfile.uploaded && (
                        <button
                            onClick={() => {
                                onDelete(uploadfile.idFake, uploadfile.id);
                            }}
                        >
							Excluir
                        </button>
                    )}
                    {!uploadfile.uploaded && !uploadfile.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: '#7159c1' }
                            }}
                            strokeWidth={10}
                            value={uploadfile.value}
                        />
                    )}
                    {uploadfile.url && (
                        <a
                            href={uploadfile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink
                                style={{ marginRight: 8 }}
                                size={24}
                                color="#222"
                            />
                            {uploadfile.uploaded && (
                                <MdCheckCircle size={24} color="#00e600" />
                            )}
                        </a>
                    )}
                    {uploadfile.error && (
                        <MdError
                            size={24}
                            color="#da3e3e"
                            title="Deu erro no upload. O arquivo tem menos de 15mb?"
                        />
                    )}
                </div>
            </li>
        ))}
    </Container>
);

export default FileList;

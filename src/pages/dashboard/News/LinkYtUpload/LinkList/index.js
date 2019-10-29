import React from 'react';

import { Container, FileInfo, Preview } from './styles';

import 'react-circular-progressbar/dist/styles.css';

import { MdCheckCircle, MdLink } from 'react-icons/md';

const LinkList = ({ urls, onDelete }) => (
    <Container>
        {urls.map(link => (
            <li key={link.id}>
                <FileInfo>
                    <div>
                        <Preview src={link.preview}></Preview>
                    </div>

                    <div>
                        <strong>Youtube video</strong>
                    </div>
                </FileInfo>
                <div>
                    {!!link.link && (
                        <button
                            onClick={() => {
                                onDelete(link.id);
                            }}
                        >
							Excluir
                        </button>
                    )}

                    {link.link && (
                        <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink
                                style={{ marginRight: 8 }}
                                size={24}
                                color="#fafafa"
                            />
                            {link.link && (
                                <MdCheckCircle size={24} color="#00e600" />
                            )}
                        </a>
                    )}
                </div>
            </li>
        ))}
    </Container>
);

export default LinkList;

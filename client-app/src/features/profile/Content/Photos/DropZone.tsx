import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../../../../app/stores/store';

export const DropZone = observer(() => {
    const { profileStore } = useStore();
    const { addPhoto } = profileStore;
    const onDrop = useCallback((acceptedFiles: object[]) => {
        acceptedFiles.forEach((file: any) => {
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            });
        });
        console.log('acceptedFiles', acceptedFiles);
        addPhoto(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        onDrop
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button onClick={() => open()}>Add Photo</Button>
        </div>
    );
});

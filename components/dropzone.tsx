/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { app, db, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage';

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

const Dropzone = () => {
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  };

  const focusedStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const captionRef = useRef(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedImages(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const uploadRef = async () => {
    const docRef = await addDoc(collection(db, 'posts'), {
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    await Promise.all(
      selectedImages.map(async (image: any) => {
        const imageRef = ref(
          storage,
          `posts/${docRef.id}/${image.path}`
        );
        uploadBytes(imageRef, image, 'data_url').then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'posts', docRef.id), {
            images: arrayUnion(downloadURL),
          });
        });
      })
    );
    captionRef.current.value = '';
    setSelectedImages([]);
  };

  const selected_images = selectedImages?.map(
    (file: any, id: number) => (
      <div key={id}>
        <img
          src={file.preview}
          alt={file.preview}
          style={{ width: '200px' }}
        />
      </div>
    )
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
      <input
        ref={captionRef}
        type="text"
        placeholder="Enter Caption..."
      />
      <button onClick={uploadRef}>Submit</button>
      {selected_images}
    </div>
  );
};

export default Dropzone;

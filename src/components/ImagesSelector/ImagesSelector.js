import { useState, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import ShowThumbnails from './ShowThumbnails'
// import AcceptedFiles from './AcceptedFiles'
// import RejectedFiles from './RejectedFiles'

import * as styles from './ImagesSelector.module.css'

const ImagesSelector = ({ title, images = [], maxFiles = 1, selectFiles, disabled }) => {
  const [selectedFiles, setSelectedFiles] = useState([])

  // TO DO: Allow user to remove individual images from the list

  const onDrop = useCallback(acceptedFiles => {
    let selectingFilesStatuses = acceptedFiles.reduce((acc, cur, i) => ({ ...acc, [i]: undefined }), {})
    setSelectedFiles(selectingFilesStatuses)
    acceptedFiles.forEach((file, i) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        selectingFilesStatuses = {
          ...selectingFilesStatuses,
          [i]: {
            file,
            preview: reader.result,
          }
        }
        if (i + 1 === acceptedFiles.length) {
          setSelectedFiles(selectingFilesStatuses)
        }
      }
    })
    selectFiles(acceptedFiles)
  }, [selectFiles])

  const {
    // acceptedFiles,
    // fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles,
    maxSize: 4000000, // 4Mb
    disabled,
  })

  const dropzoneClassNames = useMemo(() => ([
    styles.dropzone,
    isFocused ? styles.dropzoneFocused : '',
    isDragAccept ? styles.dropzoneAccept : '',
    isDragReject ? styles.dropzoneReject : '',
  ].join(' ')), [isFocused, isDragAccept, isDragReject])

  const thumbnails = [
    ...Object.keys(selectedFiles).map(key => selectedFiles[key]),
    ...images,
  ].reduce((acc, cur, i) => {
    if (i < maxFiles) {
      return {
        ...acc,
        [i]: cur
      }
    }
    return acc
  }, {})

  return (
    <div className={styles.component}>
      {title && (
        <div className={styles.title}>
          {title}
        </div>
      )}
      <div {...getRootProps({ className: dropzoneClassNames })}>
        <input {...getInputProps()} />
        {isDragAccept && (
          <div>All files will be accepted!</div>
        )}
        {isDragReject && (
          <div>Some files will be rejected!</div>
        )}
        {!isDragActive && (
          <div>Drag and drop files here, or click to select files...</div>
        )}
        <ShowThumbnails images={thumbnails} />
      </div>
      {/* <AcceptedFiles files={acceptedFiles} /> */}
      {/* <RejectedFiles files={fileRejections} /> */}
    </div>
  )
}

export default ImagesSelector

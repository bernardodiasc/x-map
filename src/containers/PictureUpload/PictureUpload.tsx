import React, { useRef } from 'react'
import EXIF from 'exif-js'

import Button from '@components/generic/Button'
import Svg from '@components/generic/Svg'

import { parseDMS } from '@lib/geo'

/**
 * Get Geo Data
 */
function getData (file, callback) {
  EXIF.getData(file, function() {
    const { GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef } = EXIF.getAllTags(this);
    if (GPSLatitude && GPSLatitudeRef && GPSLongitude && GPSLongitudeRef) {
      const { lat, lng } = parseDMS(GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef);
      callback({ lat, lng })
    } else {
      const options = {
        msg: `None EXIF Geo tags found in the file <strong>${file.name}</strong>.<br/>Please check EXIF tags on that image is correct or try another one.`,
        type: 'error',
        container: document.querySelectorAll('body')[0]
      }
    }
  })
}

/**
 * Read image file
 */
function readURL (file) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise(resolve => { reader.onload = resolve })
}

const ProfileForm = (): JSX.Element => {
  const hiddenFileInput = useRef(null)

  const handleOnClick = () => {
    hiddenFileInput.current.click()
  }

  const handleOnChange = (event) => {
    const fileUploaded = event.target.files[0]

    getData(fileUploaded, geoData => {
      console.log(geoData);
      // readURL(fileUploaded)
      //   .then(response => {
      //     console.log(response?.target?.result, geoData)
      //     // Map.placeMarker(response.target.result, geoData.lat, geoData.lng);
      //   })
    })
  }

  return (
    <>
      <Button
        link
        wide
        onClick={handleOnClick}
      >
        <Svg name="editcalendar" width="24" height="24" />
        Claim a bounty!
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleOnChange}
        style={{display: 'none'}}
      />
    </>
  )
}

export default ProfileForm

import * as styles from './LocationForm.module.css'

const LocationForm = ({ location }) => {
  return (
    <div className={styles.component}>
      {location ? `Editing ${location.id}...` : 'Adding new location...'}
      <br/>
      <i>TO DO: add the form with a map here</i>
    </div>
  )
}

export default LocationForm

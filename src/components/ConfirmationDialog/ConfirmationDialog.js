import Button from '@components/generic/Button'

import * as styles from './ConfirmationDialog.module.css'

const ConfirmationDialog = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className={styles.component}>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className={styles.buttons}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  )
}

export default ConfirmationDialog

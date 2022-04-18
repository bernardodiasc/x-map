import Button from '@components/generic/Button'

import styles from './ConfirmationDialog.module.css'

type Props = {
  title?: string,
  message?: string,
  onCancel?: () => void,
  onConfirm?: () => void,
}

const ConfirmationDialog = ({
  title,
  message,
  onCancel,
  onConfirm,
}: Props): JSX.Element => {
  if ((!title || !message) || (!onConfirm || !onCancel)) {
    return null
  }

  return (
    <div
      data-testid="ConfirmationDialog"
      className={styles.component}
    >
      {title && (
        <h1>{title}</h1>
      )}
      {message && (
        <p>{message}</p>
      )}
      <div className={styles.buttons}>
        {onCancel && (
          <Button data-testid="ConfirmationDialog-onCancel" onClick={onCancel}>Cancel</Button>
        )}
        {onConfirm && (
          <Button data-testid="ConfirmationDialog-onConfirm" onClick={onConfirm}>Confirm</Button>
        )}
      </div>
    </div>
  )
}

export default ConfirmationDialog

import { createPortal } from 'react-dom'

import Svg from '@components/generic/Svg'

import styles from './Modal.module.css'

type Props = {
  children?: React.ReactNode,
  onClose?: () => void,
  defaultPadding?: boolean,
  defaultWidth?: boolean,
}

const Modal = ({
  children,
  onClose,
  defaultPadding = true,
  defaultWidth = true,
}: Props): JSX.Element => {
  const noClick = event => {
    event.stopPropagation()
  }

  const handleClose = () => {
    onClose && onClose()
  }

  const handleKeyPress = event => {
    event.stopPropagation()

    // Esc
    if (event.keyCode === 27) {
      handleClose()
    }
  }

  if (!children) {
    return null
  }

  return createPortal(
    <div
      data-testid="Modal"
      className={styles.component}
    >
      <div
        className={styles.modal}
        onKeyDown={handleKeyPress}
        onClick={handleClose}
        tabIndex={0}
      >
        <section
          className={[
            styles.frame,
            onClose ? styles.frameWithMinHeight : '',
          ].join(' ')}
          onClick={noClick}
        >
          {onClose && (
            <button className={styles.close} onClick={handleClose}>
              <Svg name="x" width="24" height="24" />
            </button>
          )}
          <div
            className={[
              styles.content,
              defaultPadding ? styles.defaultPadding : '',
              defaultWidth ? styles.defaultWidth : '',
            ].join(' ')}
          >
            {children}
          </div>
        </section>
      </div>
    </div>,
    document.body
  )
}

export default Modal


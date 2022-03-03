import { createPortal } from 'react-dom'

import * as styles from './Modal.module.css'

const Modal = ({ children, onClose }) => {
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

  return children
    ? createPortal(
      <div className={styles.component}>
        <div
          className={styles.modal}
          onKeyDown={handleKeyPress}
          onClick={handleClose}
          tabIndex={0}
        >
          <section className={styles.frame} onClick={noClick}>
            {onClose && (
              <button className={styles.close} onClick={handleClose}>
                <svg viewBox="0 0 40 40">
                  <path className={styles.path} d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
              </button>
            )}
            <div
              className={styles.content}
            >
              {children}
            </div>
          </section>
        </div>
      </div>,
      document.body
    )
    : null
}

export default Modal

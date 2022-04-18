import { createPortal } from 'react-dom'

import Svg from '@components/generic/Svg'

import styles from './Modal.module.css'

type Props = {
  children?: React.ReactNode,
  onClose?: () => void,
  defaultPadding?: boolean,
  defaultWitdh?: boolean,
}

const Modal = ({
  children,
  onClose,
  defaultPadding = true,
  defaultWitdh = true,
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
                <Svg name="x" width="24" height="24" />
              </button>
            )}
            <div
              className={[
                styles.content,
                defaultPadding ? styles.defaultPadding : '',
                defaultWitdh ? styles.defaultWitdh : '',
              ].join(' ')}
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

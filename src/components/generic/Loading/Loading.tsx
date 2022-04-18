import Image from 'next/image'

import loader from '@public/static/x-loader.gif'

import styles from './Loading.module.css'

type Props = {
  inModal?: boolean,
}

const Loading = ({ inModal }: Props): JSX.Element => {
  return (
    <div
      className={[
        styles.component,
        inModal ? styles.modal : ''
      ].join(' ')}
    >
      <Image
        src={loader}
        alt="Loading..."
        width="100"
        height="100"
      />
    </div>
  )
}

export default Loading

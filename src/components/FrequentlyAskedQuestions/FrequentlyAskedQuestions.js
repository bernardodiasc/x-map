import Markdown from 'markdown-to-jsx'

import Loading from '@components/Loading'

import useFrequentlyAskedQuestions from '@hooks/useFrequentlyAskedQuestions'

import * as styles from './FrequentlyAskedQuestions.module.css'

const FrequentlyAskedQuestions = () => {
  const { data, isLoading } = useFrequentlyAskedQuestions()
  console.log(data, isLoading)

  if (isLoading) {
    return (
      <div className={styles.component}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={styles.component}>
      {data.map(item => (
        <div key={`faq-${item.id}`}>
          <h1>{item.attributes.question}</h1>
          <Markdown>{item.attributes.answer}</Markdown>
        </div>
      ))}
    </div>
  )
}

export default FrequentlyAskedQuestions

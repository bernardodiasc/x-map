import Markdown from 'markdown-to-jsx'

import Loading from '@components/generic/Loading'

import useFrequentlyAskedQuestions from '@hooks/useFrequentlyAskedQuestions'

import * as styles from './FrequentlyAskedQuestions.module.css'

const FrequentlyAskedQuestions = () => {
  const { data, isLoading } = useFrequentlyAskedQuestions()

  if (isLoading) {
    return (
      <Loading inModal />
    )
  }

  return (
    <div>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      {data.map(item => (
        <div key={`faq-${item.id}`}>
          <h2 className={styles.question}>{item.attributes.question}</h2>
          <Markdown>{item.attributes.answer}</Markdown>
        </div>
      ))}
    </div>
  )
}

export default FrequentlyAskedQuestions

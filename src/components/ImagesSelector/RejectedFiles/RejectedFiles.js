import * as styles from './RejectedFiles.module.css'

const RejectedFiles = ({ files }) => files.length > 0 ? (
  <div>
    <h4>Rejected files</h4>
    <ul>
      {files.map(({ file , errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
) : null

export default RejectedFiles

import * as styles from './AcceptedFiles.module.css'

const AcceptedFiles = ({ files }) => files.length > 0 ? (
  <div>
    <h4>Accepted files</h4>
    <ul>
      {files.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ))}
    </ul>
  </div>
) : null

export default AcceptedFiles

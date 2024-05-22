import { Alert } from 'antd'

export default function Errors({ errors, error }) {
  return (
    <>
      {errors ? (
        <Alert message={`Error ${errors.error.status}`} type="warning" showIcon description={errors.message} />
      ) : null}
      {error ? <Alert message={`Error: ${error.name}`} type="error" showIcon description={error.message} /> : null}
    </>
  )
}

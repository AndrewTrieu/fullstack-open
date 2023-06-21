const errorNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return <div style={{ color: 'red' }}>{message}</div>
  }
}

const successNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return <div style={{ color: 'green' }}>{message}</div>
  }
}

const Notification = ({ errorMessage, successMessage }) => {
  return (
    <div>
      {errorNotification({ message: errorMessage })}
      {successNotification({ message: successMessage })}
    </div>
  )
}

export default Notification

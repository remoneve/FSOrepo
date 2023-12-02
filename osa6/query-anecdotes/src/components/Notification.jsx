import { useNotificationValue, useNotificationDispatch } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  if (notification.length > 1) {
    setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
  }
  
  if (notification.length < 1) {
    return (
      <div></div>
    )
  }

  return (
    <div style={style}>
      <div>{notification}</div>
    </div>
  )
}

export default Notification

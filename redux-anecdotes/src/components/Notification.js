import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification.message)
  const timeout = useSelector(state => state.notification.timeout)
  if (timeout !== null) {
    setTimeout(() => {
      dispatch(setNotification(''))
    }, timeout * 1000)
  }
  if (message === '') {
    return null
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
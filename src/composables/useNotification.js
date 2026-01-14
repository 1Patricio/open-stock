import { ref } from "vue"

const show = ref(false)
const message = ref('')
const color = ref('success')
const timeOut = ref(5000)
export function useNotification() {
  const success = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'success',
    timeOut.value = duration
    show.value = true
  }

  const warning = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'warning',
    timeOut.value = duration
    show.value = true
  }

  const error = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'error',
    timeOut.value = duration
    show.value = true
  }

  const info = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'info',
    timeOut.value = duration
    show.value = true
  }

  return {
    success,
    warning,
    error,
    info,
    show,
    color,
    timeOut,
    message
  }
}

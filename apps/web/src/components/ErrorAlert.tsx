import Alert, { type AlertProps } from './Alert'

export interface ErrorAlertProps extends Omit<AlertProps, 'variant'> {}

export default function ErrorAlert({
  title = "Employee code or password doesn't match",
  message = (
    <>
      Check both and try again. Still stuck?{' '}
      <a href="#hr" className="underline hover:opacity-80">
        Contact HR
      </a>
      .
    </>
  ),
  className = '',
}: ErrorAlertProps) {
  return (
    <Alert
      variant="error"
      title={title}
      message={message}
      className={className}
    />
  )
}

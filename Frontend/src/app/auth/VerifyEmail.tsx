import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

const API = 'http://localhost:3000/api/auth'

export function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Token no proporcionado.')
      return
    }

    fetch(`${API}/verify-email/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success')
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.message)
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Error al verificar. Intenta de nuevo.')
      })
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          {status === 'loading' && (
            <>
              <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-bold mb-2">Verificando...</h2>
              <p className="text-muted-foreground">
                Estamos verificando tu cuenta.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">¡Verificado!</h2>
              <p className="text-muted-foreground mb-6">{message}</p>
              <Link
                to="/login"
                className="inline-block py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90"
              >
                Iniciar Sesión
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Error</h2>
              <p className="text-muted-foreground mb-6">{message}</p>
              <Link
                to="/register"
                className="inline-block py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90"
              >
                Registrarse de nuevo
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
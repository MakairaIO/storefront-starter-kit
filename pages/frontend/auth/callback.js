import { ShopifyAuthProvider } from '../../../utils'

function AuthCallbackLoading() {
  return (
    <>
      <style>{`
        .auth-spinner {
          width: 3rem;
          height: 3rem;
          border: 4px solid #e5e5e5;
          border-top: 4px solid #000;
          border-radius: 50%;
          animation: auth-spin 1s linear infinite;
        }

        @keyframes auth-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <main>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="auth-spinner"></div>
        </div>
      </main>
    </>
  )
}

export default function AuthCallback() {
  return (
    <ShopifyAuthProvider>
      <AuthCallbackLoading />
    </ShopifyAuthProvider>
  )
}

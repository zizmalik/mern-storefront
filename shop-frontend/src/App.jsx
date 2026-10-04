import { useState, useEffect } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')

  const fetchProducts = () => {
    fetch('https://loca.lt')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    fetch('https://loca.lt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          setMessage('Login Successful! Welcome to your Dashboard.')
        } else {
          setMessage(data.message || 'Login failed. Check your credentials.')
        }
      })
      .catch(err => console.error(err))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    fetch('https://loca.lt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, password: regPassword })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || 'Registration request sent!')
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2">MERN Secure Storefront</h1>
        <p className="text-gray-400">Connected to Cloud Database Instance</p>
      </header>

      <main className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        {message && (
          <div className="mb-4 p-3 bg-blue-900/50 border border-blue-500 text-blue-300 rounded-lg text-sm text-center">
            {message}
          </div>
        )}

        {!isRegisterMode ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Account Login</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" 
                placeholder="developer@example.com"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" 
                placeholder="••••••••"
                required 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-bold text-white shadow-md">
              Sign In
            </button>
            <p className="text-sm text-gray-400 text-center mt-4">
              New owner?{' '}
              <button type="button" onClick={() => setIsRegisterMode(true)} className="text-blue-400 hover:underline">
                Create an account
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Register Shop Profile</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Admin Email</label>
              <input 
                type="email" 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" 
                placeholder="new-admin@example.com"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Security Password</label>
              <input 
                type="password" 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" 
                placeholder="••••••••"
                required 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 transition rounded-lg font-bold text-white shadow-md">
              Register Shop
            </button>
            <p className="text-sm text-gray-400 text-center mt-4">
              Already configured?{' '}
              <button type="button" onClick={() => setIsRegisterMode(false)} className="text-blue-400 hover:underline">
                Return to Login
              </button>
            </p>
          </form>
        )}
      </main>

      {products.length > 0 && (
        <section className="w-full max-w-4xl mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Live Inventory Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description || 'No description provided.'}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-400 font-bold text-lg">${product.price}</span>
                  <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">Stock: {product.stock || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App

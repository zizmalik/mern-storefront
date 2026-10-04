/* eslint-disable */
import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [isRegisterMode, setIsRegisterMode] = useState(false)

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
        setIsLoggedIn(true)
        setUsername(data.username)
        alert('Welcome back, ' + data.username + '! 👋')
        setEmail(''); setPassword('');
      } else {
        alert(data.message || 'Login failed')
      }
    })
    .catch(err => console.error(err))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    fetch('https://loca.lt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Registration successful!')
      if (data.message.includes('successfully')) {
        setIsRegisterMode(false) // Toggle back to login form
        setRegUsername(''); setRegEmail(''); setRegPassword('');
      }
    })
    .catch(err => console.error(err))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-600 text-center mb-8">🚀 MERN Secure Store</h1>
        
        {/* Toggle Form Framework Panels */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            {!isRegisterMode ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">🔒 Secure Login</h3>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-xl text-sm" />
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-xl text-sm" />
                  <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl text-sm cursor-pointer hover:bg-indigo-700 transition">Sign In</button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Don't have an account? <button onClick={() => setIsRegisterMode(true)} className="text-indigo-600 font-bold underline cursor-pointer">Register here</button>
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">📝 Create Account</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                  <input type="text" placeholder="Username" value={regUsername} onChange={e => setRegUsername(e.target.value)} required className="w-full px-4 py-2 border rounded-xl text-sm" />
                  <input type="email" placeholder="email@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-xl text-sm" />
                  <input type="password" placeholder="••••••••" value={regPassword} onChange={e => setRegPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-xl text-sm" />
                  <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-sm cursor-pointer hover:bg-emerald-700 transition">Register Account</button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Already have an account? <button onClick={() => setIsRegisterMode(false)} className="text-indigo-600 font-bold underline cursor-pointer">Login here</button>
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between font-bold mb-6">
            <span>✅ Admin Access Granted! Welcome, {username}.</span>
            <button onClick={handleLogout} className="bg-rose-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow hover:bg-rose-600 transition cursor-pointer">
              🚪 Logout
            </button>
          </div>
        )}

        {/* Storefront Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {products.map(p => (
            <div key={p._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{p.category}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-2">📦 {p.name}</h3>
              <p className="text-2xl font-extrabold text-gray-950 mt-4">${p.price} USD</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App

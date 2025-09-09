import { useState, ChangeEvent, FormEvent } from 'react'
import './Signup.css'

interface FormState {
  name: string
  email: string
  password: string
  confirm: string
}

function Signup() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', password: '', confirm: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Placeholder for submission logic
    console.log('User registered:', form)
  }

  return (
    <div className="signup-container">
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          名前
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          メールアドレス
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          パスワード
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          パスワード確認
          <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
        </label>
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default Signup

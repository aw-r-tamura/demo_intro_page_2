import { useState, ChangeEvent, FormEvent } from 'react'
import './Signup.css'

interface FormState {
  name: string
  email: string
  postalCode: string
  address: string
  password: string
  confirm: string
}

function Signup() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    postalCode: '',
    address: '',
    password: '',
    confirm: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Placeholder for submission logic
    console.log('User registered:', form)
  }

  const handleZipSearch = async () => {
    if (!form.postalCode) return
    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${form.postalCode}`
      )
      const data = await res.json()
      if (data.results && data.results[0]) {
        const result = data.results[0]
        const fullAddress = `${result.address1}${result.address2}${result.address3}`
        setForm((prev) => ({ ...prev, address: fullAddress }))
      } else {
        alert('住所が見つかりませんでした')
      }
    } catch (error) {
      console.error('Error fetching address:', error)
    }
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
          郵便番号
          <div className="zipcode-field">
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleZipSearch}>
              住所検索
            </button>
          </div>
        </label>
        <label>
          住所
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
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

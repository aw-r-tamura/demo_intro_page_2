import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material'

interface FormState {
  name: string
  email: string
  birthdate: string
  postalCode: string
  address: string
  password: string
  confirm: string
}

function Signup() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    birthdate: '',
    postalCode: '',
    address: '',
    password: '',
    confirm: '',
  })
  const [passwordError, setPasswordError] = useState('')

  const validatePassword = (password: string, birthdate: string) => {
    const baseValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
    if (!baseValid) return false
    if (!birthdate) return true
    const normalizedBirth = birthdate.replace(/-/g, '')
    return (
      !password.includes(birthdate) &&
      !password.includes(normalizedBirth)
    )
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'password' || name === 'birthdate') {
        setPasswordError(
          validatePassword(updated.password, updated.birthdate)
            ? ''
            : 'パスワードは英字と数字を含む8文字以上で、生年月日を含まないものを入力してください'
        )
      }
      return updated
    })
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        新規登録
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="名前"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="メールアドレス"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="生年月日"
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Box display="flex" gap={1}>
            <TextField
              label="郵便番号"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button variant="outlined" onClick={handleZipSearch}>
              住所検索
            </Button>
          </Box>
          <TextField
            label="住所"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <TextField
            label="パスワード"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            error={Boolean(passwordError)}
            helperText={
              passwordError || '英字と数字を含む8文字以上、生年月日を含まない'
            }
          />
          <TextField
            label="パスワード確認"
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            登録
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default Signup

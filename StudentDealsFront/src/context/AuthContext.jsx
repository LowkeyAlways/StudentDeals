import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext({
  user: null,
  isAuth: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const value = useMemo(() => ({
    user,
    isAuth: !!user,
    login: (nextUser) => setUser(nextUser || null),
    logout: () => setUser(null),
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


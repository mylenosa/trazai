import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
        />
      </div>
    </div>
  )
}

export default SignupPage

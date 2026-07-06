'use client'

import { useActionState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

const initialState = { success: undefined as boolean | undefined, message: '' }

export function useNewsletterSubscribe() {
  return useActionState(subscribeToNewsletter, initialState)
}

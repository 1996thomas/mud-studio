'use server'

type ActionState = {
  success?: boolean
  message?: string
}

async function findNewsletterGroupId(): Promise<string | null> {
  const res = await fetch(
    'https://connect.mailerlite.com/api/groups?filter[name]=Newsletter&limit=25',
    {
      headers: {
        Authorization: `Bearer ${process.env.MAILER_LITE_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )
  if (!res.ok) return null
  const data = await res.json()
  const group = (data.data as { id: string; name: string }[] | undefined)?.find(
    (g) => g.name.toLowerCase() === 'newsletter'
  )
  return group?.id ?? null
}

export async function subscribeToNewsletter(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email')?.toString().trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Adresse email invalide.' }
  }

  const groupId = await findNewsletterGroupId()
  if (!groupId) {
    return { success: false, message: 'Erreur de configuration. Veuillez réessayer.' }
  }

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAILER_LITE_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, groups: [groupId] }),
  })

  if (!res.ok) {
    if (res.status === 422) {
      return { success: false, message: 'Cette adresse est déjà inscrite.' }
    }
    return { success: false, message: "Une erreur s'est produite. Veuillez réessayer." }
  }

  return { success: true, message: 'Merci ! Vous êtes maintenant inscrit à notre newsletter.' }
}

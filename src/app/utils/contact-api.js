const CONTACT_ENDPOINT = 'https://dsdpremiumgaming.com/api/v1/contact';

export async function submitContactForm(payload) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || 'Failed to submit contact form';
    throw new Error(message);
  }

  return data || { message: 'Contact form submitted successfully' };
}

export { CONTACT_ENDPOINT };

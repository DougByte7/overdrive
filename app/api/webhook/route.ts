import type { EmailAddressJSON } from '@clerk/backend'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { randomInt } from 'crypto'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

import { prisma } from '@/server/db'

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
        )
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', { status: 400 })
    }

    console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp)
    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response(JSON.stringify(err), { status: 400 })
    }

    // Get the ID and type
    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    const getUserEmail = (
        email_addresses: EmailAddressJSON[],
        primary_email_address_id: string
    ) => {
        const userEmail = email_addresses.find(
            (email) => email.id === primary_email_address_id
        )?.email_address

        return userEmail
    }

    switch (eventType) {
        case 'user.created':
            const { data: userData } = evt
            const userEmail = getUserEmail(
                userData.email_addresses,
                userData.primary_email_address_id ?? ''
            )
            if (!userEmail) {
                console.error('Error user email not found')
                return new Response('Error user email not found', {
                    status: 400,
                })
            }

            await prisma.user.create({
                data: {
                    id: userData.id,
                    email: userEmail,
                    name: userData.username ?? userData.first_name ?? '',
                    nameTag: randomInt(0, 10_000),
                    imageUrl: userData.image_url,
                },
            })
            break
        case 'user.updated': {
            const { data: userData } = evt
            const userEmail = getUserEmail(
                userData.email_addresses,
                userData.primary_email_address_id ?? ''
            )
            if (!userEmail) {
                console.error('Error user email not found')
                return new Response('Error user email not found', {
                    status: 400,
                })
            }

            await prisma.user.update({
                where: { id: userData.id },
                data: {
                    email: userEmail,
                    name: userData.username ?? userData.first_name ?? '',
                    nameTag: randomInt(0, 10_000),
                    imageUrl: userData.image_url,
                },
            })
            break
        }
        case 'user.deleted': {
            const { data: userData } = evt

            await prisma.user.delete({
                where: { id: userData.id },
            })
            break
        }
    }

    return new Response('', {
        status: 201,
    })
}

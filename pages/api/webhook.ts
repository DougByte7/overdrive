import { EmailAddressJSON, WebhookEvent } from '@clerk/nextjs/server'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'
import dotenv from 'dotenv'
import { buffer } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'
import { Webhook } from 'svix'
import ws from 'ws'

dotenv.config()
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405)
    }
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
        )
    }

    // Get the headers
    const svix_id = req.headers['svix-id'] as string
    const svix_timestamp = req.headers['svix-timestamp'] as string
    const svix_signature = req.headers['svix-signature'] as string

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res
            .status(400)
            .json({ error: 'Error occured -- no svix headers' })
    }

    console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp)
    // Get the body
    const body = (await buffer(req)).toString()

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
        return res.status(400).json({ Error: err })
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
                userData.primary_email_address_id
            )
            if (!userEmail) {
                console.error('Error user email not found')
                return res
                    .status(400)
                    .json({ Error: new Error('Error user email not found') })
            }

            await prisma.user.create({
                data: {
                    id: userData.id,
                    email: userEmail,
                    name: userData.username ?? userData.first_name,
                    nameTag: randomInt(0, 10_000),
                    imageUrl: userData.image_url,
                },
            })
            break
        case 'user.updated': {
            const { data: userData } = evt
            const userEmail = getUserEmail(
                userData.email_addresses,
                userData.primary_email_address_id
            )
            if (!userEmail) {
                console.error('Error user email not found')
                return res
                    .status(400)
                    .json({ Error: new Error('Error user email not found') })
            }

            await prisma.user.update({
                where: { id: userData.id },
                data: {
                    email: userEmail,
                    name: userData.username ?? userData.first_name,
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

    return res.status(200).json({ response: 'Success' })
}

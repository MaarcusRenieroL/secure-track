import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
	appId: "1773274",
	key: "2e4273a2832ef9f6ff26",
	secret: "8884140c60a167972323",
	cluster: 'ap2',
	useTLS: true,
})

/**
 * The following pusher client uses auth, not neccessary for the video chatroom example
 * Only the cluster would be important for that
 * These values can be found after creating a pusher app under
 * @see https://dashboard.pusher.com/apps/<YOUR_APP_ID>/keys
 */

export const pusherClient = new PusherClient("2e4273a2832ef9f6ff26", {
	cluster: 'ap2',
	authEndpoint: '/api/pusher-auth',
	authTransport: 'ajax',
	auth: {
		headers: {
			'Content-Type': 'application/json',
		},
	},
})

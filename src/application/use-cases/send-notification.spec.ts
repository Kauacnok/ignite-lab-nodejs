import { SendNotification } from './send-notification'
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository'

describe('Send notification', () => {
	it('should be able to send a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const sendNotification = new SendNotification(notificationsRepository)

		const { notification } = await sendNotification.execute({
			recipientId: 'dasdasdasdsads',
			content: 'Novo pedido de amizade',
			category: 'Social'
		})

		expect(notificationsRepository.notifications).toHaveLength(1)
		expect(notificationsRepository.notifications[0]).toEqual(notification)
	})
})
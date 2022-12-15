import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { CountRecipientNotification } from './count-recipient-notifications'
import { makeNotification } from '@test/factories/notification-factory'

describe('Count recipients notifications', () => {
	it('should be able to count the notifications', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const countRecipientNotifications = new CountRecipientNotification(notificationsRepository)

		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

		await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }))

		const { count } = await countRecipientNotifications.execute({
			recipientId: 'recipient-1'
		})

		expect(count).toEqual(2)
	})
})
import { CancelNotification } from './cancel-notification'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notification-factory'
import { NotificationNotFound } from './errors/notification-not-found'

describe('cancel-notification.spec.ts notification', () => {
	it('should be able to cancel a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new CancelNotification(notificationsRepository)

		const notification = makeNotification()

		await notificationsRepository.create(notification)

		await cancelNotification.execute({
			notificationId: notification.id
		})

		expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
	})

	it('should be not able to cancel a notification when it does not exist', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new CancelNotification(notificationsRepository)

		expect(() => {
			return cancelNotification.execute({
				notificationId: 'fake-notification-id'
			})
		}).rejects.toThrow(NotificationNotFound)
	})
})
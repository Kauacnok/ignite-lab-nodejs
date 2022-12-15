import { Notification, NotificationProps } from '@application/entities/notification'
import { Content } from '@application/entities/content'

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {} ) {
	return new Notification({
			category: 'Social',
			content: new Content('Nova solicitação de amizade'),
			recipientId: 'recipient-2',
			...override
	})
}
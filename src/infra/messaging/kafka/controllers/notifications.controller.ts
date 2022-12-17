import { Controller } from "@nestjs/common"
import { EventPattern, Payload } from '@nestjs/microservices'
import { SendNotification } from '@application/use-cases/send-notification'

interface SendNotificationPayload {
	content: string,
	category: string,
	recipientId: string
}

@Controller()
export class NotificationsController {
	constructor(private sendNotification: SendNotification) {

	}

	@EventPattern('notifications.send-notification')
	async handleSendNotification(@Payload() { category, content, recipientId }: SendNotificationPayload) {
		await this.sendNotification.execute({
			content,
			category,
			recipientId
		})
	}
}
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification'
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnReadNotification } from '@application/use-cases/unread-notification'
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'

import { DatabaseModule } from '../database/database.module'

@Module({
	imports: [DatabaseModule],
	controllers: [NotificationsController],
	providers: [
		SendNotification,
		CancelNotification,
		ReadNotification,
		UnReadNotification,
		CountRecipientNotification,
		GetRecipientNotifications
	]
})

export class HttpModule {}

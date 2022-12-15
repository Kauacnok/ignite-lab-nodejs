import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Notification } from '@application/entities/notification'
import { PrismaService } from '../prisma.service'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
	constructor(
		private prismaService: PrismaService
	) {

	}

	async create(notification: Notification): Promise<void> {
		const raw = PrismaNotificationMapper.toPrisma(notification)
		await this.prismaService.notification.create({
			data: raw
		})
	}

	async countManyByRecipientId(recipientId: string): Promise<number> {
		const count = await this.prismaService.notification.count({
			where: {
				recipientId
			}
		})

		return count
	}

	async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
		const notifications = await this.prismaService.notification.findMany({
			where: {
				recipientId
			}
		})

		return notifications.map((notification) => {
			return PrismaNotificationMapper.toDomain(notification)
		})
	}

	async findById(notificationId: string): Promise<Notification | null> {
		const notification = await this.prismaService.notification.findUnique({
			where: {
				id: notificationId
			}
		})

		if (!notification) {
			return null
		}


		return PrismaNotificationMapper.toDomain(notification)
	}

	async save(notification: Notification): Promise<void> {
		const raw = PrismaNotificationMapper.toPrisma(notification)

		await this.prismaService.notification.update({
			where: {
				id: raw.id
			},
			data: raw
		})
	}
}
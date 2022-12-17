import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ServerKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
	constructor() {
		super({
			client: {
				clientId: 'notifications',
				brokers: ['wise-bear-5044-us1-kafka.upstash.io:9092'],
				sasl: {
					mechanism: 'scram-sha-256',
					username: 'd2lzZS1iZWFyLTUwNDQkUj7s3h2ONMtk7l_bIN_M26pO7AE811DAX9Kwi_HnIBs',
					password: process.env.PASSWORD || '',
				},

				ssl: true,
			}
		})
	}

	async onModuleDestroy() {
		await this.close()
		
	}


}
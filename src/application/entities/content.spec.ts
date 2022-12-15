import { Content } from './content'

describe("notification content", () => {
	it("should be able to create a notification content", () => {
		const content = new Content("Você recebeu uma nova notificação")

		expect(content).toBeTruthy()
	})

	it("not should be able to create a notification content with less than than 5 characters", () => {
		expect(() => new Content("ddd")).toThrow()
	})

	it("not should be able to create a notification content with more than than 240 characters", () => {
		expect(() => new Content("d".repeat(241))).toThrow()
	})
})
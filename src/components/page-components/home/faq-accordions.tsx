import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'

const FaqAccordions = ({
	items
}: {
	items: {
		title: string
		content: string
	}[]
}) => {
	return (
		<Accordion type="single" collapsible className="w-full space-y-5">
			{items.map((item, idx) => {
				return (
					<AccordionItem value={`${idx}`} key={idx}>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default FaqAccordions

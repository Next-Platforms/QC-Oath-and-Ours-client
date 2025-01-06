import { ReactGoogleReviews } from 'react-google-reviews'
import 'react-google-reviews/dist/index.css'

const featurableWidgetId = import.meta.env.PUBLIC_FEATURABLE_REVIEWS_WIDGET_ID

export const GoogleReviews = () => {
	return <ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} />
}

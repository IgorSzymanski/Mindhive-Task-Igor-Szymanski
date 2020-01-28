import Axios from 'axios'

export const GeoService = token => url => {
	const searchLocation = async searchString => {
		return (
			await Axios.get(url, {
				params: {
					format: 'json',
					q: searchString,
					key: token,
				},
			})
		).data
	}

	return {
		searchLocation,
	}
}
